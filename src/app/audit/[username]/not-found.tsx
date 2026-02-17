import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --bg: #080c10;
          --card: #111820;
          --border: #1e2d3d;
          --text: #e6edf3;
          --muted: #7d8590;
          --danger: #f85149;
          --accent: #00d4aa;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'JetBrains Mono', monospace !important; background: var(--bg) !important; }

        .gc-grid-bg {
          background-image:
            linear-gradient(rgba(248,81,73,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,81,73,.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.75); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes glitch1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-3px, 0); }
          20%      { clip-path: inset(30% 0 50% 0); transform: translate(3px, 0); }
          40%      { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
          60%      { clip-path: inset(10% 0 80% 0); transform: translate(2px, 0); }
          80%      { clip-path: inset(50% 0 30% 0); transform: translate(-3px, 0); }
        }
        @keyframes glitch2 {
          0%,100% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 0); }
          20%      { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }
          40%      { clip-path: inset(50% 0 20% 0); transform: translate(2px, 0); }
          60%      { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }
          80%      { clip-path: inset(60% 0 30% 0); transform: translate(3px, 0); }
        }
        @keyframes scanDown {
          0%   { top: 0; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flicker {
          0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; }
          20%,22%,24%,55% { opacity: .3; }
        }

        .gc-fade-1 { animation: fadeUp .5s ease both; }
        .gc-fade-2 { animation: fadeUp .5s .1s ease both; }
        .gc-fade-3 { animation: fadeUp .5s .2s ease both; }
        .gc-fade-4 { animation: fadeUp .5s .3s ease both; }

        .gc-pulse { animation: pulseDot 2s ease-in-out infinite; }
        .gc-blink { animation: blink 1s step-end infinite; }
        .gc-flicker { animation: flicker 4s linear infinite; }

        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-family: inherit;
          font-weight: inherit;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
        }
        .glitch-wrap::before {
          color: #f85149;
          animation: glitch1 3s infinite;
          animation-play-state: paused;
        }
        .glitch-wrap::after {
          color: #c0392b;
          animation: glitch2 3s infinite;
          animation-play-state: paused;
        }
        .glitch-wrap:hover::before,
        .glitch-wrap:hover::after {
          animation-play-state: running;
        }

        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(248,81,73,.4), transparent);
          animation: scanDown 5s linear infinite;
          pointer-events: none;
        }

        .back-btn { transition: background .2s, color .2s, border-color .2s, transform .1s; }
        .back-btn:hover {
          background: var(--accent) !important;
          color: #000 !important;
          border-color: var(--accent) !important;
          transform: scale(1.02);
        }

        .back-link { transition: color .15s; text-decoration: none; }
        .back-link:hover { color: var(--accent) !important; }
        .back-link:hover .back-arrow { transform: translateX(-3px); }
        .back-arrow { display: inline-block; transition: transform .2s; }
      `}</style>

      <div
        className="gc-grid-bg min-h-screen flex flex-col"
        style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Danger glow */}
        <div
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 600, height: 300, zIndex: 0,
            background: "radial-gradient(ellipse, rgba(248,81,73,.06) 0%, transparent 70%)",
          }}
        />

        {/* NAV */}
        <nav
          className="flex items-center justify-between px-6 md:px-10"
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
            style={{ fontSize: ".78rem", color: "var(--muted)" }}
          >
            <span className="back-arrow">←</span>
            gitcheck
          </Link>

          <div
            className="flex items-center gap-2"
            style={{
              fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 100,
              background: "rgba(248,81,73,.08)", border: "1px solid rgba(248,81,73,.22)",
              color: "var(--danger)",
            }}
          >
            <span
              className="gc-pulse rounded-full"
              style={{ width: 6, height: 6, background: "var(--danger)", display: "inline-block" }}
            />
            Error 404
          </div>
        </nav>

        {/* MAIN */}
        <main
          className="relative flex flex-col items-center justify-center flex-1 text-center px-4"
          style={{ zIndex: 1, paddingBottom: 80 }}
        >
          <div className="scan-line" />

          {/* Giant ghost 404 */}
          <div
            className="gc-fade-1 glitch-wrap gc-flicker select-none"
            data-text="404"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(7rem, 22vw, 16rem)",
              lineHeight: .9,
              letterSpacing: "-.06em",
              color: "rgba(248,81,73,.1)",
              marginBottom: "-.5em",
              pointerEvents: "none",
            }}
          >
            404
          </div>

          {/* Error badge */}
          <div
            className="gc-fade-2 inline-flex items-center gap-2 rounded-full mb-6"
            style={{
              padding: "5px 14px",
              fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
              border: "1px solid rgba(248,81,73,.25)",
              background: "rgba(248,81,73,.07)",
              color: "var(--danger)",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
            Query Failure
          </div>

          {/* Headline */}
          <h1
            className="gc-fade-3"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              lineHeight: 1.05, letterSpacing: "-.03em",
              marginBottom: "1rem",
            }}
          >
            User{" "}
            <span style={{ color: "var(--danger)" }}>not recognized</span>
            <br />in the registry.
          </h1>

          <p
            className="gc-fade-3"
            style={{
              fontSize: ".85rem", color: "var(--muted)", lineHeight: 1.75,
              maxWidth: 440, marginBottom: "2.5rem",
            }}
          >
            The requested entity does not exist on GitHub. Verify the handle
            and re-initiate the audit sequence.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="gc-fade-4 back-btn inline-flex items-center gap-2 rounded-xl"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: ".85rem",
              padding: ".85rem 2rem",
              background: "var(--card)", border: "1px solid var(--border)",
              color: "var(--text)", textDecoration: "none",
            }}
          >
            ← Return to Terminal
          </Link>
        </main>

        {/* Terminal debug block — bottom left */}
        <div
          className="fixed bottom-8 left-8 hidden md:block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: ".68rem", lineHeight: 1.9,
            color: "rgba(248,81,73,.22)",
          }}
        >
          <div>ERROR_CODE: 404_DATA_NULL</div>
          <div>SYSTEM_STATUS: ACTIVE</div>
          <div>REGISTRY: GITHUB_V3_API</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <span>WAITING_FOR_INPUT</span>
            <span
              className="gc-blink inline-block"
              style={{ width: 6, height: "1em", background: "rgba(248,81,73,.35)", verticalAlign: "text-bottom" }}
            />
          </div>
        </div>

        {/* Bottom-right watermark */}
        <div
          className="fixed bottom-8 right-8 hidden md:block text-right"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".68rem", color: "rgba(255,255,255,.04)" }}
        >
          GITCHECK<br />v1.0.0
        </div>
      </div>
    </>
  );
}
