const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");
const { execFile } = require("child_process");

const PORT = 3000;
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Files to watch — relative to PROJECT_ROOT
const WATCH_FILES = [
  ".htmlcraft.md",
  "design-tokens.css",
  "design-tokens.json",
  "design-spec.md",
  "html-handoff.md",
  "index.html",
  "audit-log.json",
];

const AUDIT_TRIGGER_FILES = new Set([
  ".htmlcraft.md",
  "design-tokens.css",
  "design-tokens.json",
  "design-spec.md",
  "html-handoff.md",
  "index.html",
]);

const DELIVERABLE_FILES = [
  ".htmlcraft.md",
  "design-spec.md",
  "design-tokens.css",
  "design-tokens.json",
  "html-handoff.md",
  "index.html",
];

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

// ─── HTTP Static Server ───

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

// ─── WebSocket Server ───

const wss = new WebSocketServer({ server });


function scanArtifacts() {
  const present = [];
  const missing = [];
  for (const file of DELIVERABLE_FILES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(fullPath)) present.push(file);
    else missing.push(file);
  }
  const core = [".htmlcraft.md", "design-spec.md", "design-tokens.css", "html-handoff.md", "index.html"];
  const coreComplete = core.every((f) => present.includes(f));
  return {
    present,
    missing,
    coreComplete,
    mode: coreComplete ? "audit-revision" : (present.length ? "partial-audit" : "system-build"),
    primaryArtifact: "design-tokens.css",
    auditLogPresent: present.includes("audit-log.json"),
  };
}


function readFileContent(filename) {
  const fullPath = path.join(PROJECT_ROOT, filename);
  try {
    return fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
}

function getAllFileContents() {
  const result = {};
  for (const file of WATCH_FILES) {
    const content = readFileContent(file);
    if (content !== null) {
      result[file] = content;
    }
  }
  return result;
}

function runPythonAudit(callback) {
  const htmlPath = path.join(PROJECT_ROOT, "index.html");
  const scriptPath = path.join(PROJECT_ROOT, "scripts", "html_design_report.py");

  if (!fs.existsSync(htmlPath) || !fs.existsSync(scriptPath)) {
    callback(null);
    return;
  }

  execFile(
    "python3",
    [scriptPath, "audit", htmlPath, "--json"],
    { timeout: 10000 },
    (err, stdout) => {
      if (err) {
        callback(null);
        return;
      }
      try {
        callback(JSON.parse(stdout));
      } catch {
        callback(null);
      }
    }
  );
}

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
}

// Send initial state on connection
wss.on("connection", (ws) => {
  const files = getAllFileContents();
  const artifacts = scanArtifacts();
  ws.send(JSON.stringify({ type: "init", files }));
  ws.send(JSON.stringify({ type: "artifact_scan", data: artifacts }));

  // Also send audit if index.html exists
  runPythonAudit((audit) => {
    if (audit && ws.readyState === 1) {
      ws.send(JSON.stringify({
        type: "audit",
        data: {
          ...audit,
          trigger: "initial-load",
          artifacts: scanArtifacts(),
          timestamp: new Date().toISOString(),
        }
      }));
    }
  });
});

// ─── File Watching ───

const watchers = new Map();
const debounceTimers = new Map();

function setupWatcher(filename) {
  const fullPath = path.join(PROJECT_ROOT, filename);
  const dir = path.dirname(fullPath);

  // Watch the directory if file doesn't exist yet
  const watchTarget = fs.existsSync(fullPath) ? fullPath : dir;

  try {
    const watcher = fs.watch(watchTarget, (eventType, changedFile) => {
      // For directory watches, check if it's our file
      if (watchTarget === dir && changedFile !== path.basename(fullPath)) {
        // But check if our file was just created
        if (fs.existsSync(fullPath) && !watchers.has(filename + "_direct")) {
          setupWatcher(filename);
        }
        return;
      }

      // Debounce: ignore rapid successive events
      if (debounceTimers.has(filename)) {
        clearTimeout(debounceTimers.get(filename));
      }

      debounceTimers.set(
        filename,
        setTimeout(() => {
          debounceTimers.delete(filename);
          const content = readFileContent(filename);
          if (content !== null) {
            broadcast({ type: "update", file: filename, content });
            broadcast({ type: "artifact_scan", data: scanArtifacts() });

            // If any audit-trigger file changed, also run audit
            if (AUDIT_TRIGGER_FILES.has(filename)) {
              runPythonAudit((audit) => {
                if (audit) {
                  broadcast({
                    type: "audit",
                    data: {
                      ...audit,
                      trigger: filename,
                      artifacts: scanArtifacts(),
                      timestamp: new Date().toISOString(),
                    },
                  });
                }
              });
            }
          }
        }, 300)
      );
    });

    watchers.set(filename, watcher);
  } catch (err) {
    // Directory might not exist — that's OK, we'll try again on next check
    console.log(`  [skip] Cannot watch ${filename} yet`);
  }
}

// Start watching
console.log(`\n  HTMLCraft Dashboard`);
console.log(`  ─────────────────────────────`);
console.log(`  Project:  ${PROJECT_ROOT}`);
console.log(`  Watching:`);
for (const file of WATCH_FILES) {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, file));
  console.log(`    ${exists ? "●" : "○"} ${file}`);
  setupWatcher(file);
}

// Periodically check for new files that didn't exist at startup
setInterval(() => {
  for (const file of WATCH_FILES) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(fullPath) && !watchers.has(file)) {
      console.log(`  [new] ${file} detected, starting watch`);
      setupWatcher(file);
      const content = readFileContent(file);
      if (content !== null) {
        broadcast({ type: "update", file, content });
      }
    }
  }
}, 2000);

server.listen(PORT, () => {
  console.log(`\n  → http://localhost:${PORT}\n`);

  // Auto-open if --open flag
  if (process.argv.includes("--open")) {
    const { exec } = require("child_process");
    exec(`open http://localhost:${PORT}`);
  }
});
