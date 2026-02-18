import Link from "next/link";

const SECTIONS = [
  {
    id: "getting-started",
    label: "Getting Started",
    items: [
      {
        title: "What is GitCheck?",
        content: `GitCheck is a professional developer credibility auditing tool. Enter any public GitHub username and GitCheck fetches live profile metadata via the GitHub API, filters noise (forked repos, tutorial clones), and generates an authoritative audit report in under 2 seconds.

The engine specifically solves the "Developer Credibility Gap" by validating original contributions against professional standards.`,
      },
      {
        title: "Running your first audit",
        content: `Maps to the terminal-style homepage and enter a GitHub handle. GitCheck will redirect to a dynamic audit route to fetch and analyze real-time registry data.`,
        code: `# Automated audit sequence
GET /audit/atharv-shawrikar
FETCH_SIGNAL: ORIGINAL_REPOS_ONLY
CALCULATE_HEALTH: DOCUMENTATION + HYGIENE`,
      },
      {
        title: "The Audit Algorithm",
        content: `The credibility score (0–100) is a weighted calculation of repository hygiene and professional documentation standards:`,
        table: [
          { signal: "Documentation", weight: "30%", notes: "README & Description coverage" },
          { signal: "Legal Compliance", weight: "30%", notes: "Valid OSS Licensing" },
          { signal: "Cyber Hygiene", weight: "40%", notes: "Reporting channels & Integrity" },
        ],
      },
    ],
  },
  {
    id: "security-audit",
    label: "Security Audit",
    items: [
      {
        title: "Vulnerability Channel",
        content: `Verifies if the developer has established a public interface for reporting security vulnerabilities.

Logic: Checks if 'Issues' are enabled across all original repositories. This ensures a proactive stance where the developer allows public feedback and vulnerability disclosure.`,
      },
      {
        title: "Branch Integrity",
        content: `Identifies 'Legacy Risk' by auditing the maintenance status of the codebase.

Logic: Scans for the 'archived' flag. Integrity is flagged as 'High' when work is currently active, whereas 'Legacy Risk' indicates code that is no longer receiving security patches or dependency updates.`,
      },
      {
        title: "Compliance Tier",
        content: `A high-level categorization of the developer's professional standards based on the aggregate Health Score:`,
        table: [
          { signal: "Secure Tier", weight: "81–100", notes: "Proactive documentation & hygiene" },
          { signal: "Basic Tier", weight: "0–80", notes: "Limited licensing or metadata" },
        ],
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    items: [
      {
        title: "Why are forked repositories excluded?",
        content: "Forks represent someone else's work. Including them distorts signal quality. GitCheck specifically filters for non-forked repositories to surface only your original contributions.",
      },
      {
        title: "How often is data refreshed?",
        content: "Every audit is a live request to the GitHub API. GitCheck does not cache profile data, ensuring your report reflects the current state of the GitHub registry.",
      },
      {
        title: "Can I audit private repositories?",
        content: "No. GitCheck only reads public metadata via the authenticated GitHub REST API. Private repositories and activity are never accessed or visible.",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');
        :root { --accent:#00d4aa; --bg:#080c10; --card:#111820; --border:#1e2d3d; --text:#e6edf3; --muted:#7d8590; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'JetBrains Mono', monospace !important; background: var(--bg) !important; }
        .gc-grid-bg {
          background-image: linear-gradient(rgba(0,212,170,.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,212,170,.025) 1px,transparent 1px);
          background-size: 44px 44px;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
        .gc-fade { animation: fadeUp .5s ease both; }
        .gc-pulse { animation: pulseDot 2s ease-in-out infinite; }
        .back-link { transition: color .15s; text-decoration: none; }
        .back-link:hover { color: var(--accent) !important; }
        .back-link:hover .back-arrow { transform: translateX(-3px); }
        .back-arrow { display: inline-block; transition: transform .2s; }
        .sidebar-link { transition: color .15s, background .15s, border-color .15s; text-decoration: none; cursor: pointer; }
        .sidebar-link:hover { color: var(--accent) !important; }
        .sidebar-link.active { color: var(--accent) !important; border-left-color: var(--accent) !important; background: rgba(0,212,170,.04) !important; }
        .doc-section { scroll-margin-top: 90px; }
        .code-block {
          background: #010409; border: 1px solid var(--border);
          border-radius: 10px; padding: 1.2rem 1.4rem;
          font-family: 'JetBrains Mono', monospace; font-size: .78rem;
          color: var(--muted); line-height: 1.8; white-space: pre; overflow-x: auto;
          position: relative;
        }
        .code-block::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,212,170,.2), transparent);
        }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: .7rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: .75rem; border-bottom: 1px solid var(--border); }
        th { color: var(--muted); font-size: .65rem; letter-spacing: .08em; text-transform: uppercase; }
        td:first-child { color: var(--accent); }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,.015); }
      `}</style>

      <div className="gc-grid-bg min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2" style={{ width: 800, height: 300, zIndex: 0, background: "radial-gradient(ellipse, rgba(0,212,170,.05) 0%, transparent 70%)" }} />

        {/* NAV */}
        <nav
          className="sticky top-0 flex items-center justify-between px-6 md:px-10"
          style={{
            height: 58, zIndex: 50,
            background: "rgba(8,12,16,.9)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
            <Link
            href="/"
            className="back-link flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "var(--muted)" }}
          >
            <span className="back-arrow">←</span>
            gitcheck
          </Link>
         <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 100,
              background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.18)",
              color: "#00d4aa",
            }}
          >
            <span
              className="gc-pulse rounded-full"
              style={{ width: 6, height: 6, background: "#00d4aa", display: "inline-block" }}
            />
            Docs
          </div>
        </nav>

        <div className="relative" style={{ zIndex: 1, maxWidth: 1060, margin: "0 auto", padding: "3rem 1.5rem 6rem", display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", alignItems: "start" }}>

          {/* SIDEBAR */}
          <aside className="hidden md:block sticky" style={{ top: 80 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.2rem", opacity: .8 }}>Contents</div>
            {SECTIONS.map(s => (
              <div key={s.id} style={{ marginBottom: "1.4rem" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".8rem", color: "var(--text)", marginBottom: ".5rem" }}>{s.label}</div>
                {s.items.map((item, i) => (
                  <a key={i} href={`#${s.id}-${i}`} className="sidebar-link block" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", color: "var(--muted)", padding: ".3rem .7rem", borderLeft: "2px solid var(--border)", marginBottom: ".2rem" }}>
                    {item.title}
                  </a>
                ))}
              </div>
            ))}
          </aside>

          {/* CONTENT */}
          <main>
            {/* Page header */}
            <div className="gc-fade" style={{ marginBottom: "3rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: ".8rem" }}>Documentation</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-.03em", lineHeight: .95, marginBottom: "1rem" }}>
                GitCheck<br /><span style={{ color: "var(--muted)", fontWeight: 600, fontSize: ".6em" }}>Reference & Guide</span>
              </h1>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: 520 }}>
                Everything you need to understand how the GitCheck auditing engine works, how scores are calculated, and how to verify professional signal.
              </p>
            </div>

            {SECTIONS.map(section => (
              <div key={section.id} className="doc-section" id={section.id} style={{ marginBottom: "4rem" }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)" }}>{section.label}</span>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                {section.items.map((item, i) => (
                  <div key={i} id={`${section.id}-${i}`} className="doc-section" style={{ marginBottom: "2.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.8rem", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,170,.15), transparent)" }} />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text)" }}>{item.title}</h2>
                    {item.content && (
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: item.code || item.table ? "1.2rem" : 0, whiteSpace: "pre-line" }}>{item.content}</p>
                    )}
                    {item.code && <div className="code-block">{item.code}</div>}
                    {item.table && (
                      <div style={{ background: "#010409", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginTop: "1rem" }}>
                        <table>
                          <thead><tr><th>Signal / Module</th><th>Weight / Logic</th><th>Notes</th></tr></thead>
                          <tbody>
                            {item.table.map((row, j) => (
                              <tr key={j}><td>{row.signal}</td><td style={{ color: "var(--text)" }}>{row.weight}</td><td style={{ color: "var(--muted)" }}>{row.notes}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}