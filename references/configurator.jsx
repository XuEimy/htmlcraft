import { useMemo, useState } from "react";

const STAGES = [
  { id: "warmup", label: "Warm-up", prompt: "What is this page really trying to do?" },
  { id: "references", label: "References", prompt: "What should we borrow, and what should we refuse?" },
  { id: "direction", label: "Direction", prompt: "Which visual thesis deserves to win?" },
  { id: "review", label: "Review Gate", prompt: "What do we lock before any HTML gets written?" },
];

const PAGE_TYPES = [
  { id: "product", label: "Product landing", desc: "For demos, evaluation, and conversion." },
  { id: "brand", label: "Brand site", desc: "For positioning, identity, and trust." },
  { id: "portfolio", label: "Portfolio", desc: "For work, proof, and personal signal." },
  { id: "launch", label: "Launch page", desc: "For waitlists, announcements, and momentum." },
];

const GOALS = [
  { id: "trust", label: "Signal trust", desc: "Make the team feel credible and deliberate." },
  { id: "convert", label: "Drive conversion", desc: "Push toward demos, signups, or contact." },
  { id: "category", label: "Shape the category", desc: "Make the product feel distinct and memorable." },
];

const DIRECTIONS = [
  {
    id: "premium-calm",
    label: "Premium Calm",
    thesis: "A composed product monument with restraint, breathable spacing, and strong material contrast.",
    colors: ["#f4efe8", "#171411", "#8f6b46"],
  },
  {
    id: "editorial-precision",
    label: "Editorial Precision",
    thesis: "Type-led, asymmetrical, and deliberate, like a strategy notebook rather than a startup template.",
    colors: ["#f7f1e8", "#201914", "#bc6c35"],
  },
  {
    id: "technical-restraint",
    label: "Technical Restraint",
    thesis: "Controlled, dark, and exact, but calmer than the usual AI startup interface.",
    colors: ["#12100f", "#f2eadf", "#b17d4e"],
  },
];

const DENSITIES = ["Spacious", "Balanced", "Dense"];
const MOTION_MODES = ["Quiet", "Crisp", "Editorial", "Cinematic"];
const REFERENCE_TYPES = ["Screenshots", "URLs", "Figma", "Existing HTML"];
const ANTI_PATTERNS = [
  "Centered hero plus card grid boilerplate",
  "Purple or blue gradient blob",
  "Inter-only with weak hierarchy",
  "Glassmorphism without purpose",
];

function StageItem({ index, label, active, complete }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr",
        gap: 12,
        alignItems: "center",
        opacity: active || complete ? 1 : 0.48,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          fontSize: 11,
          fontWeight: 700,
          background: complete ? "#171411" : active ? "#d9c5af" : "rgba(23,20,17,0.08)",
          color: complete ? "#f7f1e8" : "#171411",
          border: active ? "1px solid rgba(23,20,17,0.14)" : "none",
        }}
      >
        {index + 1}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

function ChoiceCard({ label, desc, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "16px 18px",
        borderRadius: 18,
        border: active ? "1.5px solid #171411" : "1px solid rgba(23,20,17,0.1)",
        background: active ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.48)",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: "#6b6259" }}>{desc}</div>
    </button>
  );
}

function ToggleChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: active ? "1px solid #171411" : "1px solid rgba(23,20,17,0.1)",
        background: active ? "#171411" : "rgba(255,255,255,0.48)",
        color: active ? "#f7f1e8" : "#171411",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function DirectionCard({ direction, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: 18,
        textAlign: "left",
        borderRadius: 22,
        border: active ? "1.5px solid #171411" : "1px solid rgba(23,20,17,0.1)",
        background: active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.52)",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {direction.colors.map((color) => (
          <span
            key={color}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: color,
              border: "1px solid rgba(23,20,17,0.12)",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{direction.label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "#5d544a" }}>{direction.thesis}</div>
    </button>
  );
}

export default function DesignConfigurator() {
  const [stage, setStage] = useState(0);
  const [sent, setSent] = useState(false);
  const [state, setState] = useState({
    projectName: "",
    pageType: "product",
    pageGoal: "trust",
    audience: "",
    primaryCta: "",
    referenceTypes: ["Screenshots", "URLs"],
    referenceNotes: "",
    borrowSignals: "",
    avoidSignals: "",
    antiPatterns: ["Centered hero plus card grid boilerplate", "Purple or blue gradient blob"],
    direction: "premium-calm",
    density: "Balanced",
    motion: "Quiet",
    customNotes: "",
  });

  const currentStage = STAGES[stage];

  const summary = useMemo(() => {
    const direction = DIRECTIONS.find((item) => item.id === state.direction)?.label;
    const goal = GOALS.find((item) => item.id === state.pageGoal)?.label;
    const pageType = PAGE_TYPES.find((item) => item.id === state.pageType)?.label;
    return { direction, goal, pageType };
  }, [state.direction, state.pageGoal, state.pageType]);

  const canAdvance = () => {
    if (stage === 0) {
      return Boolean(state.pageType && state.pageGoal);
    }
    if (stage === 1) {
      return Boolean(state.borrowSignals || state.avoidSignals || state.referenceNotes);
    }
    if (stage === 2) {
      return Boolean(state.direction);
    }
    return true;
  };

  const toggleArrayItem = (key, value) => {
    setState((current) => {
      const set = new Set(current[key]);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      return { ...current, [key]: Array.from(set) };
    });
  };

  const update = (key, value) => setState((current) => ({ ...current, [key]: value }));

  const sendConfig = () => {
    setSent(true);
    if (!window.sendPrompt) return;

    const payload = JSON.stringify(state, null, 2);
    window.sendPrompt(
      `Use the guided-html-design workflow with the following warm-up state:\n\n\`\`\`json\n${payload}\n\`\`\`\n\nContinue from this intake state instead of starting from zero.\nPlease do all of the following:\n1. Restate the working assumptions.\n2. Identify the next design question as if this were a Superpower-style design session.\n3. Generate design-spec.md, design-tokens.json, design-tokens.css, and html-handoff.md.\n4. Generate the Design Panel artifact as a review checkpoint.\n5. Do not skip the review gate before implementation.`
    );
  };

  return (
    <div
      style={{
        minHeight: "100%",
        background:
          "radial-gradient(circle at top left, rgba(196,123,57,0.14), transparent 28%), linear-gradient(180deg, #f7f1e8 0%, #efe3d4 100%)",
        color: "#171411",
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(1180px, 100%)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 18,
        }}
      >
        <aside
          style={{
            padding: 22,
            borderRadius: 28,
            background: "rgba(255,255,255,0.58)",
            border: "1px solid rgba(23,20,17,0.08)",
            boxShadow: "0 18px 50px rgba(49,31,11,0.06)",
            alignSelf: "start",
            position: "sticky",
            top: 24,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6259", marginBottom: 10 }}>
            Guided HTML Design
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 34, lineHeight: 0.98, letterSpacing: "-0.04em" }}>
            Warm-up window before the page exists.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5d544a", margin: "14px 0 20px" }}>
            This configurator is not the design system itself. It is the intake layer that helps the skill behave like a Superpower-style design kickoff.
          </p>

          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {STAGES.map((item, index) => (
              <StageItem key={item.id} index={index} label={item.label} active={index === stage} complete={index < stage} />
            ))}
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 20,
              background: "linear-gradient(180deg, rgba(228,214,198,0.72), rgba(255,255,255,0.52))",
              border: "1px solid rgba(23,20,17,0.08)",
              marginBottom: 18,
            }}
          >
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b6259", marginBottom: 8 }}>
              Next question
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>{currentStage.prompt}</div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b6259" }}>Current assumptions</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5d544a" }}>
              <strong style={{ color: "#171411" }}>Type:</strong> {summary.pageType || "Not chosen"}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5d544a" }}>
              <strong style={{ color: "#171411" }}>Goal:</strong> {summary.goal || "Not chosen"}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5d544a" }}>
              <strong style={{ color: "#171411" }}>Direction:</strong> {summary.direction || "Not chosen"}
            </div>
          </div>
        </aside>

        <section
          style={{
            padding: 22,
            borderRadius: 28,
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(23,20,17,0.08)",
            boxShadow: "0 18px 50px rgba(49,31,11,0.06)",
          }}
        >
          {stage === 0 && (
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b6259", marginBottom: 10 }}>
                Stage 1 · Warm-up
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 42, lineHeight: 0.96, letterSpacing: "-0.04em" }}>
                Start with the page goal, not the CSS.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5d544a", margin: "12px 0 24px" }}>
                The point of this step is to establish what the page is trying to do before we talk about style. A good guided session should feel like a kickoff, not a prompt dump.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Project name</div>
                  <input
                    value={state.projectName}
                    onChange={(event) => update("projectName", event.target.value)}
                    placeholder="Lantern, Acme, Studio One..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 14,
                      border: "1px solid rgba(23,20,17,0.12)",
                      background: "rgba(255,255,255,0.72)",
                      fontSize: 14,
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Primary CTA</div>
                  <input
                    value={state.primaryCta}
                    onChange={(event) => update("primaryCta", event.target.value)}
                    placeholder="Book a demo, Start a trial..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 14,
                      border: "1px solid rgba(23,20,17,0.12)",
                      background: "rgba(255,255,255,0.72)",
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Page type</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {PAGE_TYPES.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      label={item.label}
                      desc={item.desc}
                      active={state.pageType === item.id}
                      onClick={() => update("pageType", item.id)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Which outcome matters most?</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {GOALS.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      label={item.label}
                      desc={item.desc}
                      active={state.pageGoal === item.id}
                      onClick={() => update("pageGoal", item.id)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Audience note</div>
                <textarea
                  value={state.audience}
                  onChange={(event) => update("audience", event.target.value)}
                  placeholder="Who is this page really written for?"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    border: "1px solid rgba(23,20,17,0.12)",
                    background: "rgba(255,255,255,0.72)",
                    fontSize: 14,
                    resize: "vertical",
                    lineHeight: 1.7,
                  }}
                />
              </div>
            </div>
          )}

          {stage === 1 && (
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b6259", marginBottom: 10 }}>
                Stage 2 · References
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 42, lineHeight: 0.96, letterSpacing: "-0.04em" }}>
                Absorb the reference world before choosing a style.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5d544a", margin: "12px 0 24px" }}>
                This is where the skill should behave like a visual companion. It should make room for screenshots, URLs, and concrete signals rather than pretending “modern” is enough.
              </p>

              <div
                style={{
                  padding: 20,
                  borderRadius: 22,
                  border: "1px dashed rgba(23,20,17,0.18)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.68), rgba(244,239,232,0.8))",
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Reference drop zone</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5d544a" }}>
                  In a host with upload support, this is where screenshots, URLs, Figma exports, or existing HTML should be attached. In text-only environments, this panel still tells the user exactly what kind of references are useful.
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  {REFERENCE_TYPES.map((item) => (
                    <ToggleChip
                      key={item}
                      label={item}
                      active={state.referenceTypes.includes(item)}
                      onClick={() => toggleArrayItem("referenceTypes", item)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Reference notes</div>
                  <textarea
                    value={state.referenceNotes}
                    onChange={(event) => update("referenceNotes", event.target.value)}
                    placeholder="Paste URLs, describe screenshots, or note what the visual companion should compare."
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 18,
                      border: "1px solid rgba(23,20,17,0.12)",
                      background: "rgba(255,255,255,0.72)",
                      fontSize: 14,
                      resize: "vertical",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Borrow these signals</div>
                  <textarea
                    value={state.borrowSignals}
                    onChange={(event) => update("borrowSignals", event.target.value)}
                    placeholder="Examples: asymmetrical hero, serif headline, warm paper surfaces, quiet nav."
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 18,
                      border: "1px solid rgba(23,20,17,0.12)",
                      background: "rgba(255,255,255,0.72)",
                      fontSize: 14,
                      resize: "vertical",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Explicit anti-patterns</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {ANTI_PATTERNS.map((item) => (
                    <ToggleChip
                      key={item}
                      label={item}
                      active={state.antiPatterns.includes(item)}
                      onClick={() => toggleArrayItem("antiPatterns", item)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Avoid these signals</div>
                <textarea
                  value={state.avoidSignals}
                  onChange={(event) => update("avoidSignals", event.target.value)}
                  placeholder="Examples: fake testimonials, pill-nav SaaS clone, purple gradient blobs."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    border: "1px solid rgba(23,20,17,0.12)",
                    background: "rgba(255,255,255,0.72)",
                    fontSize: 14,
                    resize: "vertical",
                    lineHeight: 1.7,
                  }}
                />
              </div>
            </div>
          )}

          {stage === 2 && (
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b6259", marginBottom: 10 }}>
                Stage 3 · Direction
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 42, lineHeight: 0.96, letterSpacing: "-0.04em" }}>
                Pick the design thesis before the tokens.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5d544a", margin: "12px 0 24px" }}>
                The strongest guided sessions do not ask for “a nice website.” They ask which world the page belongs to, then let type, rhythm, color, and motion fall out of that choice.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 22 }}>
                {DIRECTIONS.map((item) => (
                  <DirectionCard
                    key={item.id}
                    direction={item}
                    active={state.direction === item.id}
                    onClick={() => update("direction", item.id)}
                  />
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Spacing density</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {DENSITIES.map((item) => (
                      <ToggleChip key={item} label={item} active={state.density === item} onClick={() => update("density", item)} />
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Motion posture</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {MOTION_MODES.map((item) => (
                      <ToggleChip key={item} label={item} active={state.motion === item} onClick={() => update("motion", item)} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Direction notes</div>
                <textarea
                  value={state.customNotes}
                  onChange={(event) => update("customNotes", event.target.value)}
                  placeholder="What should the skill ask or confirm next?"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    border: "1px solid rgba(23,20,17,0.12)",
                    background: "rgba(255,255,255,0.72)",
                    fontSize: 14,
                    resize: "vertical",
                    lineHeight: 1.7,
                  }}
                />
              </div>
            </div>
          )}

          {stage === 3 && (
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b6259", marginBottom: 10 }}>
                Stage 4 · Review Gate
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 42, lineHeight: 0.96, letterSpacing: "-0.04em" }}>
                Lock the decisions before the HTML handoff.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5d544a", margin: "12px 0 24px" }}>
                This stage exists so the skill cannot silently slide from mood words into implementation. The output here should become the seed for the design spec, tokens, and the review-oriented panel.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                {[
                  ["Page type", summary.pageType],
                  ["Primary goal", summary.goal],
                  ["Direction", summary.direction],
                  ["Density", state.density],
                  ["Motion", state.motion],
                  ["Reference modes", state.referenceTypes.join(", ")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 18,
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(23,20,17,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b6259", marginBottom: 6 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{value || "Not set"}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 18,
                  borderRadius: 22,
                  background: "linear-gradient(180deg, rgba(228,214,198,0.72), rgba(255,255,255,0.6))",
                  border: "1px solid rgba(23,20,17,0.08)",
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>What this should generate next</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#5d544a", lineHeight: 1.8, fontSize: 14 }}>
                  <li>Restated assumptions</li>
                  <li>Next design question</li>
                  <li>Design spec and tokens</li>
                  <li>HTML handoff</li>
                  <li>Review-oriented design panel</li>
                </ul>
              </div>

              <button
                onClick={sendConfig}
                style={{
                  width: "100%",
                  height: 54,
                  borderRadius: 18,
                  border: "none",
                  background: sent ? "#675847" : "#171411",
                  color: "#f7f1e8",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {sent ? "Configuration sent to guided-html-design" : "Send to guided-html-design"}
              </button>
            </div>
          )}

          {!sent && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(23,20,17,0.08)",
              }}
            >
              <button
                onClick={() => setStage((value) => Math.max(0, value - 1))}
                disabled={stage === 0}
                style={{
                  minWidth: 112,
                  height: 46,
                  borderRadius: 16,
                  border: "1px solid rgba(23,20,17,0.12)",
                  background: "rgba(255,255,255,0.56)",
                  color: "#171411",
                  fontWeight: 700,
                  cursor: stage === 0 ? "default" : "pointer",
                  opacity: stage === 0 ? 0.4 : 1,
                }}
              >
                Back
              </button>
              {stage < STAGES.length - 1 && (
                <button
                  onClick={() => canAdvance() && setStage((value) => value + 1)}
                  disabled={!canAdvance()}
                  style={{
                    minWidth: 140,
                    height: 46,
                    borderRadius: 16,
                    border: "none",
                    background: canAdvance() ? "#171411" : "#a89c8f",
                    color: "#f7f1e8",
                    fontWeight: 700,
                    cursor: canAdvance() ? "pointer" : "default",
                  }}
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
