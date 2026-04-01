import { useState } from "react";

/*
  Vibe Design System Dashboard
  
  Three-layer visualization:
  1. TRACKER — Which stage is active, what's done, what's pending
  2. DECISIONS — Locked design values, visual thesis, tokens
  3. VERIFICATION — Does the generated code comply with the spec
  
  USAGE: The model generates this artifact and fills in the STATE object
  with real session data. The dashboard updates as decisions are confirmed.
*/

// ===== SESSION STATE — Model fills this from the actual session =====
const STATE = {
  project_name: "Your Project",
  skill_active: true,
  
  // Layer 1: Stage Tracker
  stages: [
    { id: "warmup", label: "Warm-up", status: "done", note: "Page type and goal identified" },
    { id: "intake", label: "Intake", status: "done", note: "Audience, CTA, constraints locked" },
    { id: "references", label: "References", status: "done", note: "2 screenshots analyzed" },
    { id: "direction", label: "Direction", status: "done", note: "Chose: Minimal Editorial" },
    { id: "rhythm", label: "Rhythm", status: "done", note: "5-beat structure confirmed" },
    { id: "typography", label: "Typography", status: "active", note: "Confirming font pairing" },
    { id: "color", label: "Color", status: "pending", note: "" },
    { id: "components", label: "Components", status: "pending", note: "" },
    { id: "motion", label: "Motion", status: "pending", note: "" },
    { id: "spec_gen", label: "Spec Generation", status: "pending", note: "" },
    { id: "review_gate", label: "Review Gate", status: "pending", note: "" },
    { id: "implementation", label: "Implementation", status: "pending", note: "" },
    { id: "verification", label: "Verification", status: "pending", note: "" },
    { id: "polish", label: "Polish Pass", status: "pending", note: "" },
  ],

  // Layer 2: Locked Decisions
  visual_thesis: "An architect's portfolio: white walls, sharp edges, typography carries the entire weight",
  hero_archetype: "Manifesto Stack",
  page_type: "SaaS / Tool",
  audience: "Developer teams",
  primary_cta: "Start Free Trial",
  
  tokens: {
    colors: {
      primary: { value: "#000000", locked: true },
      accent: { value: "#555555", locked: true },
      bg: { value: "#ffffff", locked: true },
      fg: { value: "#111111", locked: true },
      muted: { value: "#8a8a8a", locked: true },
    },
    typography: {
      display_font: { value: "Instrument Serif, Georgia, serif", locked: true },
      body_font: { value: "Instrument Sans, Helvetica Neue, sans-serif", locked: false },
      hero_size: { value: "72px", locked: true },
      body_size: { value: "17px", locked: true },
      hero_weight: { value: "700", locked: true },
      line_height_body: { value: "1.7", locked: false },
    },
    spacing: {
      section: { value: "112px", locked: true },
      lg: { value: "32px", locked: true },
      md: { value: "16px", locked: true },
      max_width: { value: "1280px", locked: true },
    },
    components: {
      button_height: { value: "40px", locked: false },
      button_radius: { value: "0px", locked: true },
      card_radius: { value: "0px", locked: true },
      nav_height: { value: "64px", locked: false },
      heading_align: { value: "left", locked: true },
    },
  },

  // Layer 3: Verification Results (filled after code generation)
  verification: {
    run: true,
    timestamp: "2026-03-30 14:30",
    checks: [
      { id: "no_hardcoded_colors", label: "No hardcoded color values", pass: true, detail: "All colors reference CSS variables" },
      { id: "no_hardcoded_spacing", label: "No hardcoded spacing", pass: false, detail: "Found padding: 24px in .feature-card (should be var(--space-lg))" },
      { id: "no_hardcoded_fonts", label: "No hardcoded font families", pass: true, detail: "All font-family declarations use variables" },
      { id: "component_consistency", label: "Component consistency", pass: true, detail: "All buttons share same height/radius" },
      { id: "heading_hierarchy", label: "Heading hierarchy (no skips)", pass: true, detail: "h1→h2→h3 in correct order" },
      { id: "contrast_ratio", label: "Color contrast ≥ 4.5:1", pass: true, detail: "Body text: 15.3:1, muted text: 5.1:1" },
      { id: "focus_states", label: "Focus states on interactives", pass: false, detail: "Missing focus outline on .nav-link" },
      { id: "reduced_motion", label: "prefers-reduced-motion handled", pass: true, detail: "@media rule present" },
      { id: "semantic_html", label: "ARIA landmarks present", pass: true, detail: "header, nav, main, footer found" },
      { id: "touch_targets", label: "Touch targets ≥ 44px", pass: true, detail: "All buttons and links meet minimum" },
      { id: "cta_repetition", label: "CTA appears ≥ 2 times", pass: true, detail: "Found in hero and final section" },
      { id: "visual_thesis_alignment", label: "First viewport matches thesis", pass: true, detail: "Sharp edges, minimal color, type-led" },
      { id: "anti_slop", label: "No anti-slop violations", pass: false, detail: "Section 4 uses same card grid as Section 3 — needs rhythm break" },
    ],
  },

  // Artifacts
  artifacts: [
    { name: "design-spec.md", status: "ready" },
    { name: "design-tokens.json", status: "ready" },
    { name: "design-tokens.css", status: "ready" },
    { name: "html-handoff.md", status: "ready" },
  ],
};
// ===== END STATE =====

const COLORS = {
  bg: "#fafaf9",
  surface: "#ffffff",
  border: "#e7e5e2",
  text: "#1c1917",
  muted: "#78716c",
  accent: "#0c0a09",
  done: "#15803d",
  doneBg: "#f0fdf4",
  active: "#1d4ed8",
  activeBg: "#eff6ff",
  pending: "#a8a29e",
  pendingBg: "#fafaf9",
  fail: "#dc2626",
  failBg: "#fef2f2",
  pass: "#15803d",
  passBg: "#f0fdf4",
  warn: "#d97706",
};

function Pill({ type, label }) {
  const map = {
    done: { bg: COLORS.doneBg, fg: COLORS.done, border: "#bbf7d0" },
    active: { bg: COLORS.activeBg, fg: COLORS.active, border: "#bfdbfe" },
    pending: { bg: COLORS.pendingBg, fg: COLORS.pending, border: COLORS.border },
    ready: { bg: COLORS.doneBg, fg: COLORS.done, border: "#bbf7d0" },
    pass: { bg: COLORS.passBg, fg: COLORS.pass, border: "#bbf7d0" },
    fail: { bg: COLORS.failBg, fg: COLORS.fail, border: "#fecaca" },
    locked: { bg: "#f5f5f4", fg: "#292524", border: "#d6d3d1" },
    unlocked: { bg: "#fffbeb", fg: COLORS.warn, border: "#fde68a" },
  };
  const s = map[type] || map.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "3px 10px",
      borderRadius: 999, fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
    }}>{label}</span>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div style={{
      background: COLORS.surface, borderRadius: 12,
      border: `1px solid ${COLORS.border}`, padding: 20, marginBottom: 12,
    }}>
      {title && <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: subtitle ? 2 : 12 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>{subtitle}</div>}
      {children}
    </div>
  );
}

// === TAB 1: Stage Tracker ===
function StageTracker() {
  const { stages } = STATE;
  const done = stages.filter(s => s.status === "done").length;
  const total = stages.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <Card title="Skill Status">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 5,
            background: STATE.skill_active ? COLORS.done : COLORS.fail,
          }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            {STATE.skill_active ? "Skill Active — guided-html-design" : "Skill Not Detected"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#f5f5f4" }}>
            <div style={{
              width: `${pct}%`, height: 6, borderRadius: 3,
              background: COLORS.active, transition: "width 0.3s ease",
            }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>{done}/{total}</span>
        </div>
      </Card>

      <Card title="Stage Progress">
        {stages.map((stage, i) => (
          <div key={stage.id} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            padding: "10px 0",
            borderBottom: i < stages.length - 1 ? `1px solid ${COLORS.border}` : "none",
            opacity: stage.status === "pending" ? 0.5 : 1,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, marginTop: 1,
              background: stage.status === "done" ? COLORS.doneBg
                : stage.status === "active" ? COLORS.activeBg
                : "#f5f5f4",
              color: stage.status === "done" ? COLORS.done
                : stage.status === "active" ? COLORS.active
                : COLORS.pending,
              border: `1.5px solid ${
                stage.status === "done" ? "#bbf7d0"
                : stage.status === "active" ? "#bfdbfe"
                : "#e7e5e2"
              }`,
            }}>
              {stage.status === "done" ? "✓" : stage.status === "active" ? "→" : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{stage.label}</div>
              {stage.note && (
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{stage.note}</div>
              )}
            </div>
            <Pill type={stage.status} label={stage.status === "done" ? "Done" : stage.status === "active" ? "Active" : "Pending"} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// === TAB 2: Decisions ===
function Decisions() {
  const { tokens } = STATE;
  
  const renderTokenGroup = (label, group) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{label}</div>
      {Object.entries(group).map(([key, { value, locked }]) => (
        <div key={key} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {label === "Colors" && (
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                background: value, border: `1px solid ${COLORS.border}`,
              }} />
            )}
            <span style={{ fontSize: 12, color: COLORS.muted }}>{key.replace(/_/g, " ")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <code style={{
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
              background: "#f5f5f4", padding: "2px 6px", borderRadius: 4,
            }}>{value}</code>
            <Pill type={locked ? "locked" : "unlocked"} label={locked ? "Locked" : "Pending"} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Card title="Visual Identity">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>Visual Thesis</div>
          <div style={{ fontSize: 14, fontWeight: 600, fontStyle: "italic", color: COLORS.text, lineHeight: 1.5 }}>
            "{STATE.visual_thesis}"
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["Page Type", STATE.page_type],
            ["Hero Archetype", STATE.hero_archetype],
            ["Audience", STATE.audience],
            ["Primary CTA", STATE.primary_cta],
          ].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Design Tokens" subtitle="Values from design-tokens.css">
        {renderTokenGroup("Colors", tokens.colors)}
        {renderTokenGroup("Typography", tokens.typography)}
        {renderTokenGroup("Spacing", tokens.spacing)}
        {renderTokenGroup("Components", tokens.components)}
      </Card>

      <Card title="Artifacts">
        {STATE.artifacts.map((a) => (
          <div key={a.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
          }}>
            <code style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{a.name}</code>
            <Pill type={a.status} label={a.status === "ready" ? "Ready" : "Pending"} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// === TAB 3: Verification ===
function Verification() {
  const { verification } = STATE;
  
  if (!verification.run) {
    return (
      <Card title="Verification" subtitle="Run after code generation">
        <div style={{ textAlign: "center", padding: 32, color: COLORS.muted, fontSize: 13 }}>
          No verification run yet. This tab activates after implementation.
        </div>
      </Card>
    );
  }

  const passed = verification.checks.filter(c => c.pass).length;
  const total = verification.checks.length;
  const allPass = passed === total;

  return (
    <div>
      <Card title="Compliance Summary" subtitle={`Last run: ${verification.timestamp}`}>
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: 16,
          background: allPass ? COLORS.passBg : COLORS.failBg,
          borderRadius: 8, marginBottom: 4,
          border: `1px solid ${allPass ? "#bbf7d0" : "#fecaca"}`,
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: allPass ? COLORS.pass : COLORS.fail }}>
            {passed}/{total}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: allPass ? COLORS.pass : COLORS.fail }}>
              {allPass ? "All Checks Passed" : `${total - passed} Issue${total - passed > 1 ? "s" : ""} Found`}
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>
              {allPass ? "Generated code complies with the design spec" : "Fix issues before finalizing"}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Check Results">
        {verification.checks.map((check, i) => (
          <div key={check.id} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "10px 0",
            borderBottom: i < verification.checks.length - 1 ? `1px solid ${COLORS.border}` : "none",
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 10, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, marginTop: 1,
              background: check.pass ? COLORS.passBg : COLORS.failBg,
              color: check.pass ? COLORS.pass : COLORS.fail,
              border: `1.5px solid ${check.pass ? "#bbf7d0" : "#fecaca"}`,
            }}>
              {check.pass ? "✓" : "✗"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{check.label}</div>
              <div style={{ fontSize: 11, color: check.pass ? COLORS.muted : COLORS.fail, marginTop: 2 }}>
                {check.detail}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// === MAIN DASHBOARD ===
export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const tabs = ["Tracker", "Decisions", "Verification"];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.bg, color: COLORS.text,
      minHeight: "100%", padding: "20px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 4,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: COLORS.muted,
          }}>Design System Dashboard</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: 4,
              background: STATE.skill_active ? COLORS.done : COLORS.fail,
            }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.muted }}>
              {STATE.skill_active ? "SKILL ACTIVE" : "SKILL NOT FOUND"}
            </span>
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
          {STATE.project_name}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 2, marginBottom: 16,
        background: "#f5f5f4", borderRadius: 10, padding: 3,
      }}>
        {tabs.map((t, i) => {
          const isActive = tab === i;
          const count = i === 2 && STATE.verification.run
            ? STATE.verification.checks.filter(c => !c.pass).length
            : null;
          return (
            <button key={t} onClick={() => setTab(i)} style={{
              flex: 1, padding: "8px 0", border: "none", borderRadius: 8,
              background: isActive ? COLORS.surface : "transparent",
              boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              color: isActive ? COLORS.text : COLORS.muted,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              {t}
              {count > 0 && (
                <span style={{
                  width: 18, height: 18, borderRadius: 9,
                  background: COLORS.fail, color: "#fff",
                  fontSize: 10, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {tab === 0 && <StageTracker />}
      {tab === 1 && <Decisions />}
      {tab === 2 && <Verification />}

      {/* Footer */}
      <div style={{
        marginTop: 16, padding: "10px 14px",
        background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: 8, fontSize: 11, color: COLORS.muted, lineHeight: 1.5,
      }}>
        This dashboard is generated by the guided-html-design skill. Token values are read from design-tokens.json. Verification checks run against generated HTML. To update, regenerate this artifact after spec or code changes.
      </div>
    </div>
  );
}
