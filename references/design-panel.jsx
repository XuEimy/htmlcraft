import { useState } from "react";

const PANEL = {
  project_name: "Lantern",
  current_stage: "Review Gate",
  direction: "Premium Calm with Editorial Warmth",
  page_type: "Product landing",
  page_goal: "Drive qualified demo requests",
  audience: "Startup product teams with 5 to 50 people",
  visual_thesis:
    "A strategy notebook left open on a studio table: warm paper tones, strong hierarchy, and evidence-led persuasion.",
  references: ["Screenshots", "URLs", "Existing HTML"],
  open_question: "Should the next iteration increase proof density or keep the page more literary?",
  confirmed_steps: [
    {
      label: "Warm-up",
      status: "confirmed",
      note: "Page type, audience, and primary goal are locked.",
    },
    {
      label: "Reference Intake",
      status: "confirmed",
      note: "Borrowed asymmetry, serif hierarchy, and warm paper surfaces.",
    },
    {
      label: "Direction",
      status: "confirmed",
      note: "Premium Calm won, with editorial warmth layered in.",
    },
    {
      label: "Rhythm + Components",
      status: "in_review",
      note: "Proof placement and CTA energy are being checked before implementation.",
    },
    {
      label: "Implementation",
      status: "upcoming",
      note: "HTML should not begin until the review gate is passed.",
    },
  ],
  artifacts: [
    { name: "design-spec.md", status: "ready", desc: "Narrative spec for the direction and review trail." },
    { name: "design-tokens.json", status: "ready", desc: "Machine-readable values for typography, color, spacing, and motion." },
    { name: "design-tokens.css", status: "ready", desc: "CSS custom properties for actual implementation." },
    { name: "html-handoff.md", status: "ready", desc: "Section order, hierarchy notes, and anti-drift rules." },
  ],
  tokens: {
    colors: {
      bg: "#f4efe8",
      surface: "#fbf7f1",
      ink: "#151311",
      muted: "#6b6259",
      accent: "#8f6b46",
      accentStrong: "#c47b39",
      dark: "#1f1b17",
    },
    typography: {
      display: "Newsreader, Georgia, serif",
      body: "Manrope, system sans",
      hero: "clamp(4rem, 7vw, 7rem)",
      h1: "clamp(3rem, 5vw, 4.6rem)",
      bodySize: "1rem",
      heroWeight: "600",
      bodyLineHeight: "1.65",
    },
    spacing: {
      container: "min(1180px, calc(100vw - 48px))",
      section: "clamp(4.5rem, 8vw, 8rem)",
      gapLg: "2rem",
      gapMd: "1.25rem",
      radius: "18px",
      buttonRadius: "999px",
    },
    components: {
      hero: "Asymmetrical with a right-side evidence rail",
      nav: "Slim, quiet, CTA isolated at the edge",
      cards: "Paper surfaces with thin borders, not heavy SaaS shadows",
      cta: "Compact, high-intent, and late in the rhythm",
    },
  },
};

const TABS = ["Overview", "Decisions", "Tokens", "Outputs"];

function StatusPill({ status }) {
  const styles = {
    confirmed: { bg: "#171411", fg: "#f7f1e8", label: "Confirmed" },
    in_review: { bg: "#d7c1a8", fg: "#171411", label: "In Review" },
    upcoming: { bg: "rgba(23,20,17,0.08)", fg: "#6b6259", label: "Upcoming" },
    ready: { bg: "#2d5a3d", fg: "#eef6f0", label: "Ready" },
  }[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        background: styles.bg,
        color: styles.fg,
      }}
    >
      {styles.label}
    </span>
  );
}

function SectionCard({ title, children }) {
  return (
    <div
      style={{
        borderRadius: 24,
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(23,20,17,0.08)",
        padding: 18,
      }}
    >
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#6b6259", marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function TokenRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid rgba(23,20,17,0.08)",
      }}
    >
      <span style={{ fontSize: 13, color: "#5d544a" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function ColorSwatch({ name, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr",
        gap: 12,
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          background: value,
          border: "1px solid rgba(23,20,17,0.1)",
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#6b6259", fontFamily: "monospace" }}>{value}</div>
      </div>
    </div>
  );
}

export default function DesignPanel() {
  const [tab, setTab] = useState(0);
  const data = PANEL;

  return (
    <div
      style={{
        minHeight: "100%",
        padding: 24,
        color: "#171411",
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background:
          "radial-gradient(circle at top left, rgba(196,123,57,0.14), transparent 26%), linear-gradient(180deg, #f7f1e8 0%, #efe3d4 100%)",
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
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(23,20,17,0.08)",
            alignSelf: "start",
            position: "sticky",
            top: 24,
            boxShadow: "0 18px 50px rgba(49,31,11,0.06)",
          }}
        >
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#6b6259", marginBottom: 8 }}>
            Design Panel
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 36, lineHeight: 0.96, letterSpacing: "-0.04em" }}>
            Decision tracker before implementation.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a", margin: "14px 0 18px" }}>
            This panel is not only for tokens. It exists to show what the session has already locked, what is still in review, and where the HTML handoff is allowed to start.
          </p>

          <div
            style={{
              padding: 16,
              borderRadius: 20,
              background: "linear-gradient(180deg, rgba(228,214,198,0.72), rgba(255,255,255,0.56))",
              border: "1px solid rgba(23,20,17,0.08)",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b6259" }}>Current stage</div>
              <StatusPill status="in_review" />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{data.current_stage}</div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: "#5d544a" }}>{data.open_question}</div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {data.confirmed_steps.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "30px 1fr auto",
                  gap: 12,
                  alignItems: "start",
                  opacity: item.status === "upcoming" ? 0.7 : 1,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: item.status === "confirmed" ? "#171411" : item.status === "in_review" ? "#d7c1a8" : "rgba(23,20,17,0.08)",
                    color: item.status === "confirmed" ? "#f7f1e8" : "#171411",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.6, color: "#5d544a" }}>{item.note}</div>
                </div>
                <StatusPill status={item.status} />
              </div>
            ))}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 18, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#6b6259", marginBottom: 8 }}>
                {data.project_name}
              </div>
              <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 46, lineHeight: 0.94, letterSpacing: "-0.04em" }}>
                {data.direction}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <StatusPill status="confirmed" />
              <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(23,20,17,0.08)", fontSize: 11, fontWeight: 700 }}>
                {data.page_type}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            {TABS.map((item, index) => (
              <button
                key={item}
                onClick={() => setTab(index)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(23,20,17,0.08)",
                  background: tab === index ? "#171411" : "rgba(255,255,255,0.58)",
                  color: tab === index ? "#f7f1e8" : "#171411",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SectionCard title="Visual thesis">
                <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 28, lineHeight: 1.05, marginBottom: 10 }}>
                  {data.visual_thesis}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a" }}>
                  The page should feel deliberate, warm, and evidence-led. This is the sentence every downstream decision should be traceable back to.
                </div>
              </SectionCard>

              <SectionCard title="Core project signals">
                <TokenRow label="Page goal" value={data.page_goal} />
                <TokenRow label="Audience" value={data.audience} />
                <TokenRow label="Reference modes" value={data.references.join(", ")} />
              </SectionCard>

              <SectionCard title="Review gate">
                <div style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a" }}>
                  Implementation should only begin once rhythm, components, and CTA energy are approved. Artifact generation is not the same thing as final approval.
                </div>
              </SectionCard>

              <SectionCard title="What should happen next">
                <div style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a" }}>
                  The next reviewer should decide whether the proof section is strong enough and whether the CTA is firm without becoming generic.
                </div>
              </SectionCard>
            </div>
          )}

          {tab === 1 && (
            <div style={{ display: "grid", gap: 14 }}>
              {data.confirmed_steps.map((item) => (
                <SectionCard key={item.label} title={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start" }}>
                    <div style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a" }}>{item.note}</div>
                    <StatusPill status={item.status} />
                  </div>
                </SectionCard>
              ))}
            </div>
          )}

          {tab === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <SectionCard title="Color system">
                {Object.entries(data.tokens.colors).map(([key, value]) => (
                  <ColorSwatch key={key} name={key} value={value} />
                ))}
              </SectionCard>

              <SectionCard title="Typography">
                <TokenRow label="Display" value={data.tokens.typography.display} />
                <TokenRow label="Body" value={data.tokens.typography.body} />
                <TokenRow label="Hero size" value={data.tokens.typography.hero} />
                <TokenRow label="H1 size" value={data.tokens.typography.h1} />
                <TokenRow label="Body size" value={data.tokens.typography.bodySize} />
                <TokenRow label="Body line height" value={data.tokens.typography.bodyLineHeight} />
              </SectionCard>

              <SectionCard title="Spacing">
                <TokenRow label="Container" value={data.tokens.spacing.container} />
                <TokenRow label="Section gap" value={data.tokens.spacing.section} />
                <TokenRow label="Large gap" value={data.tokens.spacing.gapLg} />
                <TokenRow label="Medium gap" value={data.tokens.spacing.gapMd} />
                <TokenRow label="Radius" value={data.tokens.spacing.radius} />
                <TokenRow label="Button radius" value={data.tokens.spacing.buttonRadius} />
              </SectionCard>

              <SectionCard title="Component notes">
                {Object.entries(data.tokens.components).map(([key, value]) => (
                  <TokenRow key={key} label={key} value={value} />
                ))}
              </SectionCard>
            </div>
          )}

          {tab === 3 && (
            <div style={{ display: "grid", gap: 14 }}>
              {data.artifacts.map((item) => (
                <SectionCard key={item.name} title={item.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start" }}>
                    <div style={{ fontSize: 14, lineHeight: 1.75, color: "#5d544a" }}>{item.desc}</div>
                    <StatusPill status={item.status} />
                  </div>
                </SectionCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
