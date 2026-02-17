import Link from "next/link";

const TIMELINE = [
  { date: "Jan 2026", event: "Idea born", desc: "Frustrated by inflated GitHub profiles in job applications, the idea for a signal-over-noise audit tool was sketched out." },
  { date: "Feb 2026", event: "v0.1 shipped", desc: "First working prototype: a raw GitHub API call and a basic score formula. Ugly, but functional." },
  { date: "Feb 2026", event: "Beta launch", desc: "GitCheck v1.0 goes live. Score algorithm refined, UI rebuilt from scratch with the terminal aesthetic." },
];

const STACK = [
  { name: "Next.js 14", role: "Framework", color: "#e6edf3" },
  { name: "TypeScript", role: "Language", color: "#2b7489" },
  { name: "GitHub REST API v3", role: "Data source", color: "#00d4aa" },
  { name: "Tailwind CSS", role: "Styling", color: "#06b6d4" },
  { name: "Vercel", role: "Deployment", color: "#e6edf3" },
];

const VALUES = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>,
    label: "Signal over noise",
    desc: "Every feature decision is filtered through one question: does this surface better signal about a developer's real work?",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>,
    label: "Privacy first",
    desc: "GitCheck only reads public data. We never store profiles, never track users, and never sell data. An audit leaves no footprint.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>,
    label: "Transparent scoring",
    desc: "The score formula is documented openly. No black boxes — every point in the 0–100 score traces back to a specific, explainable signal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');
        :root { --accent:#00d4aa; --accent2:#3b82f6; --bg:#080c10; --card:#111820; --border:#1e2d3d; --text:#e6edf3; --muted:#7d8590; }
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'JetBrains Mono',monospace !important; background:var(--bg) !important; }
        .gc-grid-bg {
          background-image:linear-gradient(rgba(0,212,170,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,.025) 1px,transparent 1px);
          background-size:44px 44px;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .gc-fade-1 { animation:fadeUp .55s ease both; }
        .gc-fade-2 { animation:fadeUp .55s .08s ease both; }
        .gc-fade-3 { animation:fadeUp .55s .16s ease both; }
        .gc-fade-4 { animation:fadeUp .55s .24s ease both; }
        .gc-pulse { animation:pulseDot 2s ease-in-out infinite; }
        .back-link { transition:color .15s; text-decoration:none; }
        .back-link:hover { color:var(--accent) !important; }
        .back-link:hover .back-arrow { transform:translateX(-3px); }
        .back-arrow { display:inline-block; transition:transform .2s; }
        .value-card { transition:border-color .2s, transform .2s; }
        .value-card:hover { border-color:rgba(0,212,170,.3) !important; transform:translateY(-3px); }
        .stack-item { transition:border-color .2s, background .2s; }
        .stack-item:hover { border-color:rgba(0,212,170,.3) !important; background:rgba(0,212,170,.03) !important; }
        .section-divider { display:flex; align-items:center; gap:.75rem; margin-bottom:2.5rem; }
        .section-divider-label { font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); }
        .section-divider-line { flex:1; height:1px; background:linear-gradient(90deg, var(--border), transparent); }
        .timeline-item::before {
          content:'';
          position:absolute;
          left:-1.55rem;
          top:.4rem;
          width:8px; height:8px;
          border-radius:50%;
          background:var(--accent);
          border:2px solid var(--bg);
        }
        .cta-btn { transition:background .2s, color .2s, transform .12s, box-shadow .2s; text-decoration:none; }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,212,170,.2); }
        .cta-btn-outline:hover { background:rgba(0,212,170,.06) !important; border-color:rgba(0,212,170,.4) !important; }
      `}</style>

      <div className="gc-grid-bg min-h-screen" style={{ background:"var(--bg)", color:"var(--text)" }}>
        <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2" style={{ width:800, height:320, zIndex:0, background:"radial-gradient(ellipse, rgba(0,212,170,.055) 0%, transparent 70%)" }} />
        <div className="pointer-events-none fixed bottom-0 right-0" style={{ width:500, height:500, zIndex:0, background:"radial-gradient(ellipse, rgba(59,130,246,.03) 0%, transparent 70%)" }} />

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
            About
          </div>
        </nav>

        <div className="relative" style={{ zIndex:1, maxWidth:860, margin:"0 auto", padding:"3rem 1.5rem 6rem" }}>

          {/* ── HERO ── */}
          <section style={{ marginBottom:"5rem" }}>
            <div className="gc-fade-1" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)", marginBottom:".8rem" }}>About</div>
            <h1 className="gc-fade-2" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.4rem, 5vw, 3.8rem)", letterSpacing:"-.04em", lineHeight:.92, marginBottom:"1.4rem" }}>
              Built to surface the<br />
              <span style={{ background:"linear-gradient(140deg, #00d4aa 0%, #3b82f6 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                developers who ship.
              </span>
            </h1>
            <p className="gc-fade-3" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".85rem", color:"var(--muted)", lineHeight:1.85, maxWidth:560 }}>
              GitCheck was born from a simple frustration: GitHub profiles are full of noise. Forked repos, cloned tutorials, and bloated contribution graphs make it nearly impossible to quickly assess a developer's real output.

              We built GitCheck to cut through all of that — and surface the signal that actually matters.
            </p>
          </section>

          {/* ── VALUES ── */}
          <section style={{ marginBottom:"5rem" }}>
            <div className="section-divider">
              <span className="section-divider-label">Principles</span>
              <div className="section-divider-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VALUES.map((v, i) => (
                <div key={i} className="value-card rounded-2xl relative overflow-hidden" style={{ background:"var(--card)", border:"1px solid var(--border)", padding:"1.6rem" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(0,212,170,.2), transparent)" }} />
                  <div style={{ width:42, height:42, background:"rgba(0,212,170,.08)", border:"1px solid rgba(0,212,170,.15)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", marginBottom:"1.1rem" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", marginBottom:".6rem", color:"var(--text)" }}>{v.label}</h3>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".75rem", color:"var(--muted)", lineHeight:1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIMELINE ── */}
          <section style={{ marginBottom:"5rem" }}>
            <div className="section-divider">
              <span className="section-divider-label">Timeline</span>
              <div className="section-divider-line" />
            </div>
            <div style={{ borderLeft:"1px solid var(--border)", paddingLeft:"2rem", position:"relative" }}>
              {TIMELINE.map((t, i) => (
                <div key={i} className="timeline-item relative" style={{ marginBottom: i < TIMELINE.length - 1 ? "2.2rem" : 0 }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem", color:"var(--accent)", letterSpacing:".08em", marginBottom:".35rem", opacity:.8 }}>{t.date}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--text)", marginBottom:".5rem" }}>{t.event}</div>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".77rem", color:"var(--muted)", lineHeight:1.75, maxWidth:520 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TECH STACK ── */}
          <section style={{ marginBottom:"5rem" }}>
            <div className="section-divider">
              <span className="section-divider-label">Tech Stack</span>
              <div className="section-divider-line" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {STACK.map((s, i) => (
                <div key={i} className="stack-item rounded-xl text-center relative overflow-hidden" style={{ background:"var(--card)", border:"1px solid var(--border)", padding:"1.2rem .8rem" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${s.color}30, transparent)` }} />
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem", color:s.color, marginBottom:".35rem" }}>{s.name}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", color:"var(--muted)", letterSpacing:".06em", textTransform:"uppercase" }}>{s.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section>
            <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:20, padding:"3rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(0,212,170,.3), transparent)" }} />
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, rgba(0,212,170,.04) 0%, transparent 60%)", pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)", marginBottom:".8rem" }}>Try it now</div>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.6rem, 3vw, 2.4rem)", letterSpacing:"-.03em", marginBottom:"1rem" }}>Audit your profile.</h2>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".8rem", color:"var(--muted)", lineHeight:1.75, maxWidth:400, margin:"0 auto 2rem" }}>
                  See what hiring managers see when they look at your GitHub. Free, instant, no sign-up required.
                </p>
                <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                  <Link href="/" className="cta-btn" style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".85rem", padding:".85rem 2rem", borderRadius:12, background:"var(--accent)", color:"#000", display:"inline-flex", alignItems:"center", gap:".5rem" }}>
                    Start Auditing →
                  </Link>
                  <Link href="/docs" className="cta-btn cta-btn-outline" style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".85rem", padding:".85rem 2rem", borderRadius:12, background:"transparent", color:"var(--text)", border:"1px solid var(--border)", display:"inline-flex", alignItems:"center", gap:".5rem" }}>
                    Read the Docs
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <footer className="relative text-center" style={{ zIndex:1, borderTop:"1px solid rgba(30,45,61,.6)", padding:"2rem 1rem" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:"1rem", fontFamily:"'JetBrains Mono',monospace", fontSize:".7rem", color:"var(--muted)" }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".9rem", color:"var(--text)" }}>GitCheck</span>
            <span style={{ color:"var(--border)" }}>|</span>
            <span>Built with Next.js & GitHub API</span>
            <span style={{ color:"var(--border)" }}>|</span>
            <span>© 2026</span>
          </div>
        </footer>
      </div>
    </>
  );
}
