import { getGitCheckData } from "@/lib/github";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return { title: `GitCheck Audit | ${username}` };
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const data = await getGitCheckData(username);

  if (!data) return notFound();

  const { profile, originalRepos, healthScore } = data;

  const tier =
    healthScore > 90 ? "Elite" :
    healthScore > 75 ? "Expert" :
    healthScore > 55 ? "Proficient" : "Beginner";

  const accentColor =
    healthScore > 80 ? "#00d4aa" :
    healthScore > 50 ? "#f59e0b" : "#f85149";

  const ringOffset = 251 - (healthScore / 100) * 251;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --accent: ${accentColor};
          --bg: #080c10;
          --card: #111820;
          --border: #1e2d3d;
          --text: #e6edf3;
          --muted: #7d8590;
          --success: #3fb950;
          --danger: #f85149;
        }

        * { box-sizing: border-box; }
        body { font-family: 'JetBrains Mono', monospace !important; background: var(--bg) !important; }

        .gc-grid-bg {
          background-image:
            linear-gradient(rgba(0,212,170,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,170,.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.75); } }

        .gc-fade-1 { animation: fadeUp .5s ease both; }
        .gc-fade-2 { animation: fadeUp .5s .1s ease both; }
        .gc-fade-3 { animation: fadeUp .5s .2s ease both; }

        .gc-pulse { animation: pulseDot 2s ease-in-out infinite; }

        .repo-card { transition: border-color .2s, background .2s, transform .2s; }
        .repo-card:hover {
          border-color: rgba(0,212,170,.35) !important;
          background: rgba(0,212,170,.025) !important;
          transform: translateY(-3px);
        }

        .audit-card { transition: border-color .2s, background .2s; }
        .audit-card:hover {
          border-color: rgba(0,212,170,.3) !important;
          background: rgba(0,212,170,.03) !important;
        }

        .src-btn { transition: background .2s, color .2s, transform .1s; }
        .src-btn:hover { background: var(--accent) !important; color: #000 !important; }
        .src-btn:hover .src-arrow { transform: translate(2px, -2px); }
        .src-arrow { transition: transform .2s; }

        .back-link { transition: color .15s; text-decoration: none; }
        .back-link:hover { color: #00d4aa !important; }
        .back-link:hover .back-arrow { transform: translateX(-3px); }
        .back-arrow { transition: transform .2s; display: inline-block; }

        .score-ring-fill {
          stroke-dasharray: 251;
          stroke-dashoffset: ${ringOffset};
        }
      `}</style>

      <div
        className="gc-grid-bg min-h-screen"
        style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Glow blob */}
        <div
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 700, height: 300, zIndex: 0,
            background: `radial-gradient(ellipse, ${accentColor}12 0%, transparent 70%)`,
          }}
        />

        {/* ── NAV ── */}
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
            Audit Report
          </div>
        </nav>

        <div className="relative mx-auto px-4 md:px-8 pb-24" style={{ maxWidth: 1040, zIndex: 1 }}>

          {/* ── PROFILE HEADER ── */}
          <section className="gc-fade-1 flex flex-col md:flex-row items-center md:items-start gap-8 py-12">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="rounded-full p-[3px]"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #3b82f6)` }}
              >
                <img
                  src={profile.avatar_url}
                  alt={profile.login}
                  className="rounded-full block"
                  style={{ width: 110, height: 110, objectFit: "cover", border: "3px solid #080c10" }}
                />
              </div>
              {tier === "Elite" && (
                <span
                  className="absolute -top-1 -right-1"
                  style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: 9, letterSpacing: ".06em",
                    background: "#00d4aa", color: "#000",
                    padding: "3px 7px", borderRadius: 6, textTransform: "uppercase",
                  }}
                >
                  Elite
                </span>
              )}
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  letterSpacing: "-.03em", lineHeight: .95,
                  marginBottom: ".5rem",
                }}
              >
                {profile.name || profile.login}
              </h1>
              <p style={{ color: "#00d4aa", fontSize: ".85rem", marginBottom: "1rem" }}>
                @{profile.login}
              </p>
              {profile.bio && (
                <p
                  style={{
                    color: "var(--muted)", fontSize: ".82rem",
                    lineHeight: 1.7, maxWidth: 480,
                    borderLeft: "2px solid var(--border)", paddingLeft: ".9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {profile.bio}
                </p>
              )}

              {/* Meta chips */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.location && (
                  <span style={{ fontSize: ".72rem", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a5 5 0 0 1 5 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 0 1 5-5zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
                    {profile.location}
                  </span>
                )}
                {profile.company && (
                  <span style={{ fontSize: ".72rem", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px" }}>
                    {profile.company}
                  </span>
                )}
                <span style={{ fontSize: ".72rem", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px" }}>
                  {profile.public_repos} repos
                </span>
                <span style={{ fontSize: ".72rem", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px" }}>
                  {profile.followers?.toLocaleString()} followers
                </span>
              </div>
            </div>

            {/* Score ring */}
            <div
              className="flex flex-col items-center gap-3 flex-shrink-0 rounded-2xl p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)", minWidth: 160 }}
            >
              <div className="relative" style={{ width: 100, height: 100 }}>
                <svg width="100" height="100" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
                  <defs>
                    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={accentColor} />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle cx="45" cy="45" r="40" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="45" cy="45" r="40" fill="none"
                    stroke="url(#sg)" strokeWidth="6" strokeLinecap="round"
                    className="score-ring-fill"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: "1.7rem", lineHeight: 1,
                      background: `linear-gradient(135deg, ${accentColor}, #3b82f6)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}
                  >
                    {healthScore}
                  </span>
                  <span style={{ fontSize: ".55rem", color: "var(--muted)", letterSpacing: ".06em" }}>/100</span>
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".82rem",
                  color: accentColor,
                  background: `${accentColor}18`, border: `1px solid ${accentColor}30`,
                  padding: "3px 14px", borderRadius: 100,
                }}
              >
                ★ {tier}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".6rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>
                Credibility Score
              </span>
            </div>
          </section>

          {/* ── SECURITY AUDIT ── */}
          <section className="gc-fade-2 mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#00d4aa" }}>
                Security Audit
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Vuln Channel",
                  value: originalRepos.every((r: any) => r.has_issues) ? "Fully Enabled" : "Partial Coverage",
                  ok: originalRepos.every((r: any) => r.has_issues),
                },
                {
                  label: "Branch Integrity",
                  value: originalRepos.some((r: any) => r.archived) ? "Legacy Risk" : "Integrity High",
                  ok: !originalRepos.some((r: any) => r.archived),
                },
                {
                  label: "Compliance Tier",
                  value: healthScore > 80 ? "Secure Tier" : "Basic Tier",
                  ok: healthScore > 80,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="audit-card rounded-2xl relative overflow-hidden"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "1.4rem" }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent, ${item.ok ? "rgba(63,185,80,.3)" : "rgba(248,81,73,.3)"}, transparent)`,
                  }} />
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".63rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: ".8rem" }}>
                    {item.label}
                  </div>
                  <div
                    className="flex items-center gap-2"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".92rem", color: item.ok ? "var(--success)" : "var(--danger)" }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.ok ? "var(--success)" : "var(--danger)", display: "inline-block", flexShrink: 0 }} />
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── REPO FEED ── */}
          <section className="gc-fade-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#00d4aa" }}>
                  Original Signal
                </span>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".75rem",
                    background: "rgba(0,212,170,.1)", border: "1px solid rgba(0,212,170,.2)",
                    color: "#00d4aa", padding: "2px 10px", borderRadius: 100,
                  }}
                >
                  {originalRepos.length}
                </span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".68rem", color: "var(--muted)" }}>
                forks_excluded
              </span>
            </div>

            {originalRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {originalRepos.map((repo: any) => (
                  <div
                    key={repo.id}
                    className="repo-card rounded-2xl flex flex-col justify-between relative overflow-hidden"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "1.5rem" }}
                  >
                    {/* shimmer */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,170,.15), transparent)" }} />

                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 700,
                            fontSize: "1rem", color: "#3b82f6",
                            textDecoration: "none",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            maxWidth: "68%",
                          }}
                        >
                          {repo.name}
                        </a>
                        {repo.language && (
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace", fontSize: ".67rem", flexShrink: 0,
                              background: "rgba(0,212,170,.08)", border: "1px solid rgba(0,212,170,.18)",
                              color: "#00d4aa", padding: "2px 9px", borderRadius: 100,
                            }}
                          >
                            {repo.language}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: ".75rem", color: "var(--muted)",
                          lineHeight: 1.65, marginBottom: "1.1rem",
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.4em",
                        }}
                      >
                        {repo.description || "// No description provided."}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".67rem", color: repo.license ? "var(--success)" : "var(--danger)" }}>
                          {repo.license ? "✓ Licensed" : "✗ No License"}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".67rem", color: repo.has_issues ? "var(--success)" : "var(--danger)" }}>
                          {repo.has_issues ? "✓ Issues On" : "✗ Issues Off"}
                        </span>
                        {repo.stargazers_count > 0 && (
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".67rem", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>
                            {repo.stargazers_count.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="src-btn flex items-center justify-center gap-2 rounded-xl"
                      style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".78rem",
                        padding: ".68rem 1rem",
                        background: "rgba(255,255,255,.04)", border: "1px solid var(--border)",
                        color: "var(--muted)", textDecoration: "none",
                      }}
                    >
                      View Source
                      <svg
                        className="src-arrow"
                        xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="text-center rounded-2xl"
                style={{ padding: "4rem 2rem", background: "var(--card)", border: "1px dashed var(--border)" }}
              >
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".82rem", color: "var(--muted)" }}>
                  No original repositories found for this user.
                </p>
              </div>
            )}
          </section>

          {/* ── FOOTER ── */}
          <footer
            className="mt-20 text-center"
            style={{ borderTop: "1px solid rgba(30,45,61,.5)", paddingTop: "2rem" }}
          >
            <div
              className="flex flex-wrap items-center justify-center gap-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".72rem", color: "#4a5568" }}
            >
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--text)" }}>GitCheck</span>
              <span>·</span>
              <span>Built with Next.js & GitHub API</span>
              <span>·</span>
              <span>© 2026</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}