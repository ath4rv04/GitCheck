"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ActivityGrid() {
  const cells = Array.from({ length: 364 }, () => {
    const r = Math.random();
    return r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4;
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ opacity: 0.13 }}>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(52, 1fr)", gridTemplateRows: "repeat(7, 1fr)", width: "min(95vw, 1100px)" }}>
        {cells.map((level, i) => (
          <div key={i} className="rounded-sm" style={{
            aspectRatio: "1",
            background: level === 0 ? "rgba(255,255,255,0.05)" : level === 1 ? "rgba(0,212,170,0.2)" : level === 2 ? "rgba(0,212,170,0.4)" : level === 3 ? "rgba(0,212,170,0.65)" : "rgba(0,212,170,0.95)",
          }} />
        ))}
      </div>
    </div>
  );
}

const TICKER_ITEMS = ["Noise Filtered", "Stack Detected", "Score: 94", "Tier: Elite", "Commits: 12k", "Original Repos: 47", "Security: Pass", "Score: 71", "Tier: Expert", "Forks Excluded", "Bio Parsed", "Languages: 6"];

const FEATURES = [
  {
    num: "01",
    icon: <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/><path d="M0 0h1v15h15v1H0V0Z"/></svg>,
    label: "Noise Cancellation",
    desc: "Filters forked repos and tutorial clones to surface only your original work — the signal that actually matters.",
    tag: "SIGNAL",
  },
  {
    num: "02",
    icon: <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .201 0c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524z"/></svg>,
    label: "Security Snapshot",
    desc: "Scans repos for license coverage, issue tracking, and hygiene markers that separate professionals from hobbyists.",
    tag: "SECURITY",
  },
  {
    num: "03",
    icon: <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M9.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 6 9.293 2.707a1 1 0 0 1 0-1.414zM6.707 2.707a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L3.414 7l3.293-3.293a1 1 0 0 0 0-1.414z"/></svg>,
    label: "Stack Visualization",
    desc: "Aggregates language usage across all public repos to build an accurate picture of your real-world tech stack.",
    tag: "ANALYTICS",
  },
];

const STATS = [
  { num: "50k+", label: "Profiles Audited", delta: "+12% this month" },
  { num: "3.2M", label: "Repos Analyzed", delta: "+8% this month" },
  { num: "98%", label: "Signal Accuracy", delta: "Verified" },
  { num: "<2s", label: "Audit Time", delta: "Live API" },
];

export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      router.push(`/audit/${username.trim().toLowerCase()}`);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --accent: #00d4aa;
          --accent2: #3b82f6;
          --bg: #080c10;
          --card: #0d1520;
          --card2: #111820;
          --border: #1e2d3d;
          --border2: #243347;
          --text: #e6edf3;
          --muted: #7d8590;
          --muted2: #4a5568;
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'JetBrains Mono', monospace !important;
          background: var(--bg) !important;
          cursor: default;
        }

        /* Grid bg */
        .gc-grid-bg {
          background-image:
            linear-gradient(rgba(0,212,170,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,170,.028) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Animations */
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulseDot { 0%, 100% { opacity:1; transform:scale(1); } 50% { opacity:.35; transform:scale(.7); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-8px) rotate(.5deg); }
          66%       { transform: translateY(-4px) rotate(-.3deg); }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(0,212,170,.15), 0 0 20px rgba(0,212,170,.03); }
          50%       { box-shadow: 0 0 0 1px rgba(0,212,170,.3),  0 0 40px rgba(0,212,170,.08); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gc-fade-1 { animation: fadeUp .6s ease both; }
        .gc-fade-2 { animation: fadeUp .6s .08s ease both; }
        .gc-fade-3 { animation: fadeUp .6s .16s ease both; }
        .gc-fade-4 { animation: fadeUp .6s .24s ease both; }
        .gc-fade-5 { animation: fadeUp .6s .32s ease both; }
        .gc-fade-6 { animation: fadeUp .6s .40s ease both; }

        .gc-pulse  { animation: pulseDot 2s ease-in-out infinite; }
        .gc-blink  { animation: blink 1s step-end infinite; }
        .gc-float  { animation: float 6s ease-in-out infinite; }
        .gc-fadein { animation: fadeIn .8s ease both; }

        /* Ticker */
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }

        /* Input */
        .gc-input {
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .gc-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(0,212,170,.1), 0 8px 32px rgba(0,212,170,.06);
        }
        .gc-input::placeholder { color: var(--muted2); }

        /* Search wrapper glow on focus */
        .search-active {
          animation: borderGlow 2s ease-in-out infinite;
        }

        /* Buttons */
        .gc-btn-primary {
          transition: opacity .15s, transform .12s, box-shadow .2s;
        }
        .gc-btn-primary:hover:not(:disabled) {
          opacity: .92;
          transform: scale(1.02) translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,212,170,.25);
        }
        .gc-btn-primary:active:not(:disabled) { transform: scale(.98); }

        .gc-chip {
          transition: color .15s, border-color .15s, background .15s;
          cursor: pointer;
        }
        .gc-chip:hover {
          color: var(--accent) !important;
          border-color: rgba(0,212,170,.4) !important;
          background: rgba(0,212,170,.04) !important;
        }

        /* Feature cards */
        .gc-feature {
          transition: border-color .25s, transform .25s, box-shadow .25s;
          cursor: default;
        }
        .gc-feature:hover {
          border-color: rgba(0,212,170,.3) !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,.3), 0 0 0 1px rgba(0,212,170,.1);
        }
        .gc-feature:hover .feature-icon-box {
          background: rgba(0,212,170,.12) !important;
          border-color: rgba(0,212,170,.3) !important;
        }
        .gc-feature:hover .feature-num {
          color: rgba(0,212,170,.08) !important;
        }

        /* Stat cards */
        .gc-stat {
          transition: background .2s, border-color .2s, transform .2s;
          cursor: default;
        }
        .gc-stat:hover {
          background: rgba(0,212,170,.03) !important;
          border-color: rgba(0,212,170,.2) !important;
          transform: translateY(-2px);
        }

        /* Preview card */
        .preview-card {
          animation: float 7s ease-in-out infinite;
        }

        /* Shimmer on preview */
        .shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(0,212,170,.06) 50%, transparent 100%);
          background-size: 400px 100%;
          animation: shimmerSlide 2.5s ease-in-out infinite;
        }

        /* Divider line */
        .section-divider {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: 2.5rem;
        }
        .section-divider-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--accent);
          white-space: nowrap;
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }

        /* Nav link */
        .nav-link {
          transition: color .15s;
          text-decoration: none;
        }
        .nav-link:hover { color: var(--accent) !important; }

        /* Scroll indicator */
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        .scroll-bob { animation: scrollBob 1.8s ease-in-out infinite; }

        /* Terminal line hover */
        .term-line { transition: background .15s; }
        .term-line:hover { background: rgba(255,255,255,.02); border-radius: 4px; }
      `}</style>

      <main
        className="gc-grid-bg relative min-h-screen overflow-x-hidden"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {/* ── TOP GLOW ── */}
        <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2" style={{ width: 1000, height: 420, zIndex: 0, background: "radial-gradient(ellipse, rgba(0,212,170,.065) 0%, transparent 65%)" }} />
        {/* Secondary blue glow */}
        <div className="pointer-events-none fixed top-20 right-0" style={{ width: 500, height: 500, zIndex: 0, background: "radial-gradient(ellipse, rgba(59,130,246,.03) 0%, transparent 70%)" }} />

        {/* ── NAV ── */}
        <nav
          className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10"
          style={{ height: 58, zIndex: 100, background: "rgba(8,12,16,.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="gc-pulse rounded-full" style={{ width: 8, height: 8, background: "var(--accent)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.08rem", letterSpacing: "-.025em" }}>GitCheck</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
          {[
            { name: "Docs", path: "/docs" },
            { name: "API", path: "/api" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="nav-link" 
              style={{ 
                fontFamily: "'JetBrains Mono', monospace", 
                fontSize: ".72rem", 
                letterSpacing: ".05em", 
                color: "var(--muted)", 
                cursor: "pointer",
                textDecoration: "none" 
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

          <div className="flex items-center gap-2" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.18)", color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="gc-pulse rounded-full" style={{ width: 6, height: 6, background: "var(--accent)", display: "inline-block" }} />
            Beta v1.0
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-4" style={{ paddingTop: 168, paddingBottom: 80, zIndex: 1, minHeight: "100vh" }}>
          {mounted && <ActivityGrid />}

          {/* Scan line */}
          <div className="absolute left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,170,.45), transparent)", animation: "scanline 5s linear infinite" }} />

          {/* Badge */}
          <div className="gc-fade-1 inline-flex items-center gap-2 rounded-full mb-7" style={{ padding: "5px 14px", color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid rgba(0,212,170,.22)", background: "rgba(0,212,170,.055)" }}>
            <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
            Developer Audit Engine
          </div>

          {/* H1 — bigger, bolder */}
          <h1 className="gc-fade-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(3.2rem, 10vw, 7rem)", lineHeight: .9, letterSpacing: "-.05em", marginBottom: "1.4rem" }}>
            Instant{" "}
            <span style={{ background: "linear-gradient(140deg, #00d4aa 0%, #00b8d9 45%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              credibility
            </span>
            <br />
            <span className="gc-fade-2">for developers.</span>
          </h1>

          {/* Subhead */}
          <p className="gc-fade-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.85, maxWidth: 480, marginBottom: "2.8rem" }}>
            The Lighthouse for your professional presence. Audit any GitHub profile, strip the noise, and surface real signal — in under 2 seconds.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className={`gc-fade-4 relative w-full ${inputFocused ? "search-active" : ""}`} style={{ maxWidth: 560, borderRadius: 15 }}>
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: "var(--accent)", zIndex: 2 }}>@</span>
            <input
              type="text"
              placeholder="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              className="gc-input w-full"
              style={{ padding: "1.15rem 10rem 1.15rem 2.9rem", fontFamily: "'JetBrains Mono', monospace", fontSize: ".95rem", color: "var(--text)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, transition: "border-color .2s, box-shadow .2s" }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="gc-btn-primary absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".82rem", padding: ".65rem 1.35rem", borderRadius: 11, background: "var(--accent)", color: "#000", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? .5 : 1 }}
            >
              {isLoading ? (
                <><span style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid rgba(0,0,0,.25)", borderTopColor: "#000", animation: "spin .8s linear infinite", display: "inline-block" }} />Auditing…</>
              ) : <>Audit →</>}
            </button>
          </form>

          {/* Try chips */}
          <div className="gc-fade-5 flex flex-wrap items-center justify-center gap-2 mt-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".7rem", color: "var(--muted)" }}>
            <span style={{ opacity: .6 }}>Quick audit:</span>
            {["torvalds", "gaearon", "sindresorhus", "addyosmani"].map((u) => (
              <button key={u} onClick={() => setUsername(u)} className="gc-chip rounded-full" style={{ fontFamily: "inherit", fontSize: ".7rem", padding: "3px 10px", background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>
                {u}
              </button>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="gc-fade-6 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bob" style={{ opacity: .3 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>scroll</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,.3)", overflow: "hidden", zIndex: 2, position: "relative" }}>
          <div className="ticker-track py-3">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-2 px-6" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".7rem", letterSpacing: ".08em", color: "var(--muted)", whiteSpace: "nowrap" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", opacity: .5, display: "inline-block", flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        {/* <section className="relative" style={{ zIndex: 1 }}>
          <div style={{ margin: "0 auto", maxWidth: 960 }}>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={i} className="gc-stat text-center" style={{ padding: "2.2rem 1rem", borderRight: i < 3 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.2rem", lineHeight: 1, marginBottom: ".45rem", background: "linear-gradient(135deg, var(--text) 0%, rgba(230,237,243,.5) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: ".35rem" }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".62rem", color: "var(--accent)", opacity: .7 }}>
                    {s.delta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── FEATURES ── */}
        <section className="relative" style={{ zIndex: 1, padding: "6rem 1.5rem" }}>
          <div style={{ margin: "0 auto", maxWidth: 1020 }}>
            <div className="section-divider">
              <span className="section-divider-label">What we audit</span>
              <div className="section-divider-line" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".62rem", color: "var(--muted2)", letterSpacing: ".06em", whiteSpace: "nowrap" }}>3 modules</span>
            </div>

            {/* Asymmetric layout: big card left, two stacked right */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Big featured card */}
              <div className="gc-feature md:col-span-2 rounded-2xl relative overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "2rem" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,170,.3), transparent)" }} />
                <div className="feature-num" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "6rem", color: "rgba(255,255,255,.025)", lineHeight: 1, position: "absolute", bottom: "1rem", right: "1.5rem", transition: "color .25s" }}>
                  {FEATURES[0].num}
                </div>
                <div className="feature-icon-box flex items-center justify-center rounded-xl mb-6" style={{ width: 48, height: 48, background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.15)", color: "var(--accent)", transition: "background .25s, border-color .25s" }}>
                  {FEATURES[0].icon}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", opacity: .7, marginBottom: ".6rem" }}>{FEATURES[0].tag}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: ".8rem", color: "var(--text)" }}>{FEATURES[0].label}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.75 }}>{FEATURES[0].desc}</p>
              </div>

              {/* Two smaller cards */}
              <div className="md:col-span-3 grid grid-rows-2 gap-4">
                {FEATURES.slice(1).map((f, i) => (
                  <div key={i} className="gc-feature rounded-2xl relative overflow-hidden flex gap-5 items-start" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "1.6rem" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,170,.18), transparent)" }} />
                    <div className="feature-icon-box flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 44, height: 44, background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.15)", color: "var(--accent)", transition: "background .25s, border-color .25s" }}>
                      {f.icon}
                    </div>
                    <div className="flex-1">
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", opacity: .7, marginBottom: ".4rem" }}>{f.tag}</div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: ".5rem", color: "var(--text)" }}>{f.label}</h3>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".75rem", color: "var(--muted)", lineHeight: 1.7 }}>{f.desc}</p>
                    </div>
                    <div className="feature-num hidden md:block flex-shrink-0" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "3rem", color: "rgba(255,255,255,.025)", lineHeight: 1, transition: "color .25s" }}>{f.num}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TERMINAL CTA ── */}
        <section className="relative" style={{ zIndex: 1, padding: "0 1.5rem 6rem" }}>
          <div style={{ margin: "0 auto", maxWidth: 700 }}>
            <div className="section-divider" style={{ marginBottom: "2rem" }}>
              <span className="section-divider-label">Live preview</span>
              <div className="section-divider-line" />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: "#010409", border: "1px solid var(--border)", boxShadow: "0 32px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(0,212,170,.05)" }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4" style={{ height: 44, background: "rgba(255,255,255,.02)", borderBottom: "1px solid var(--border)" }}>
                {[{ bg: "#ff5f57" }, { bg: "#febc2e" }, { bg: "#28c840" }].map((d, i) => (
                  <div key={i} className="rounded-full" style={{ width: 11, height: 11, background: d.bg }} />
                ))}
                <span className="flex-1 text-center" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".7rem", color: "var(--muted)" }}>
                  gitcheck — live audit
                </span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: .6 }} className="gc-pulse" />
              </div>

              {/* Body */}
              <div className="px-6 py-5" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".8rem", lineHeight: 2 }}>
                <div className="term-line flex gap-3 px-1"><span style={{ color: "var(--accent)" }}>$</span><span style={{ color: "var(--text)" }}>gitcheck audit @your-username --verbose</span></div>
                <div style={{ height: ".2rem" }} />
                {[
                  { icon: "✓", text: "GitHub API connected", col: "#3fb950" },
                  { icon: "✓", text: "Profile fetched successfully", col: "#3fb950" },
                  { icon: "✓", text: "Commit graph analyzed (364 days)", col: "#3fb950" },
                  { icon: "✓", text: "Original repos identified (forks excluded)", col: "#3fb950" },
                  { icon: "✓", text: "Security hygiene scan complete", col: "#3fb950" },
                ].map((l, i) => (
                  <div key={i} className="term-line flex gap-3 px-1" style={{ color: l.col, animationDelay: `${i * 0.1}s` }}>
                    <span>{l.icon}</span><span>{l.text}</span>
                  </div>
                ))}
                <div style={{ height: ".5rem" }} />
                {/* Result block */}
                <div style={{ background: "rgba(0,212,170,.04)", border: "1px solid rgba(0,212,170,.12)", borderRadius: 8, padding: ".6rem 1rem", marginBottom: ".4rem" }}>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span><span style={{ color: "var(--muted)" }}>score    </span><span style={{ color: "var(--accent)", fontWeight: 700 }}>94</span></span>
                    <span><span style={{ color: "var(--muted)" }}>tier     </span><span style={{ color: "#f59e0b", fontWeight: 700 }}>"Elite"</span></span>
                    <span><span style={{ color: "var(--muted)" }}>repos    </span><span style={{ color: "var(--text)" }}>47</span></span>
                    <span><span style={{ color: "var(--muted)" }}>languages</span><span style={{ color: "var(--text)" }}>["TypeScript","Rust","Go"]</span></span>
                  </div>
                </div>
                <div className="term-line flex gap-3 px-1 mt-1">
                  <span style={{ color: "var(--accent)" }}>$</span>
                  <span className="gc-blink inline-block" style={{ width: 8, height: "1em", background: "var(--accent)", verticalAlign: "text-bottom" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative text-center" style={{ zIndex: 1, borderTop: "1px solid rgba(30,45,61,.6)", padding: "2rem 1rem" }}>
          <div className="flex flex-wrap items-center justify-center gap-4" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".7rem", color: "var(--muted2)" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".9rem", color: "var(--text)" }}>GitCheck</span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span>Built with Next.js & GitHub API</span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span>© 2026</span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span style={{ color: "var(--accent)", opacity: .6 }}>v1.0.0-beta</span>
          </div>
        </footer>
      </main>
    </>
  );
}
