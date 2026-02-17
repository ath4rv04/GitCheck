export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');

        :root {
          --bg: #080c10;
          --card: #111820;
          --border: #1e2d3d;
          --text: #e6edf3;
          --muted: #7d8590;
          --accent: #00d4aa;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'JetBrains Mono', monospace !important; background: var(--bg) !important; }

        .gc-grid-bg {
          background-image:
            linear-gradient(rgba(0,212,170,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,170,.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Shimmer skeleton */
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .skel {
          background: linear-gradient(
            90deg,
            #111820 0px,
            #1a2535 200px,
            #111820 400px
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 6px;
        }

        /* Pulse dot */
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.75); } }
        .gc-pulse { animation: pulseDot 2s ease-in-out infinite; }

        /* Ping */
        @keyframes ping {
          0%    { transform: scale(1);  opacity: .9; }
          75%,100% { transform: scale(2.2); opacity: 0; }
        }
        .gc-ping { animation: ping 1.2s cubic-bezier(0,0,.2,1) infinite; }

        /* Scanning bar that sweeps across skeleton cards */
        @keyframes scanRight {
          0%   { left: -40%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        .scan-bar {
          position: absolute;
          top: 0; bottom: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(0,212,170,.06), transparent);
          animation: scanRight 2s ease-in-out infinite;
          pointer-events: none;
        }

        /* Fade in page */
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .gc-fadein { animation: fadeIn .4s ease both; }

        /* Back link skeleton bar */
        .back-link:hover { color: var(--accent) !important; }
      `}</style>

      <div
        className="gc-grid-bg gc-fadein min-h-screen"
        style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 700, height: 300, zIndex: 0,
            background: "radial-gradient(ellipse, rgba(0,212,170,.05) 0%, transparent 70%)",
          }}
        />

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
          {/* Skeleton back link */}
          <div className="skel" style={{ width: 80, height: 12 }} />

          <div
            className="flex items-center gap-2"
            style={{
              fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 100,
              background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.18)",
              color: "var(--accent)",
            }}
          >
            <span
              className="gc-pulse rounded-full"
              style={{ width: 6, height: 6, background: "var(--accent)", display: "inline-block" }}
            />
            Scanning…
          </div>
        </nav>

        <div
          className="relative px-4 md:px-8 pb-24"
          style={{ maxWidth: 1040, width: "100%", margin: "0 auto", zIndex: 1 }}
        >

          {/* ── PROFILE HEADER SKELETON ── */}
          <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">

            {/* Avatar circle */}
            <div
              className="skel flex-shrink-0 rounded-full"
              style={{ width: 116, height: 116 }}
            />

            {/* Bio lines */}
            <div className="flex-1 flex flex-col gap-3 w-full">
              <div className="skel" style={{ width: "55%", height: 36 }} />
              <div className="skel" style={{ width: 120, height: 14 }} />
              <div style={{ height: 8 }} />
              <div className="skel" style={{ width: "90%", height: 12 }} />
              <div className="skel" style={{ width: "70%", height: 12 }} />
              <div style={{ height: 8 }} />
              <div className="flex gap-2 flex-wrap">
                {[80, 96, 72, 88].map((w, i) => (
                  <div key={i} className="skel rounded-full" style={{ width: w, height: 24 }} />
                ))}
              </div>
            </div>

            {/* Score ring placeholder */}
            <div
              className="skel flex-shrink-0 rounded-2xl"
              style={{ width: 160, height: 168 }}
            />
          </section>

          {/* ── SECURITY AUDIT SKELETON ── */}
          <section style={{ marginBottom: "2.5rem" }}>
            {/* Section label */}
            <div className="flex items-center gap-3" style={{ marginBottom: "1.2rem" }}>
              <div className="skel rounded-full" style={{ width: 110, height: 10 }} />
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "1.4rem" }}
                >
                  <div className="scan-bar" />
                  <div className="skel rounded-full" style={{ width: 72, height: 9, marginBottom: "1rem" }} />
                  <div className="skel" style={{ width: "65%", height: 18 }} />
                </div>
              ))}
            </div>
          </section>

          {/* ── REPO FEED SKELETON ── */}
          <section>
            {/* Section label */}
            <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
              <div className="flex items-center gap-3">
                <div className="skel rounded-full" style={{ width: 110, height: 10 }} />
                <div className="skel rounded-full" style={{ width: 28, height: 20 }} />
              </div>
              <div className="skel rounded-full" style={{ width: 90, height: 10 }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl flex flex-col gap-4"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    padding: "1.5rem",
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="scan-bar" style={{ animationDelay: `${i * 0.4}s` }} />

                  {/* Repo name + lang badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="skel" style={{ width: "55%", height: 18 }} />
                    <div className="skel rounded-full" style={{ width: 60, height: 22 }} />
                  </div>

                  {/* Description lines */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="skel" style={{ width: "100%", height: 11 }} />
                    <div className="skel" style={{ width: "75%", height: 11 }} />
                  </div>

                  {/* Badges */}
                  <div style={{ display: "flex", gap: 12 }}>
                    <div className="skel rounded-full" style={{ width: 76, height: 12 }} />
                    <div className="skel rounded-full" style={{ width: 68, height: 12 }} />
                  </div>

                  {/* CTA button */}
                  <div className="skel rounded-xl" style={{ width: "100%", height: 40, marginTop: "auto" }} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── FLOATING STATUS PILL ── */}
        <div
          className="fixed bottom-8 right-8 flex items-center gap-3"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(0,212,170,.2)",
            padding: "10px 20px",
            borderRadius: 100,
            boxShadow: "0 0 32px rgba(0,212,170,.06)",
            zIndex: 100,
          }}
        >
          {/* Ping rings */}
          <div className="relative" style={{ width: 10, height: 10 }}>
            <span
              className="gc-ping absolute inline-block rounded-full"
              style={{ width: 10, height: 10, background: "rgba(0,212,170,.4)" }}
            />
            <span
              className="gc-pulse absolute inline-block rounded-full"
              style={{ width: 10, height: 10, background: "var(--accent)" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: ".1em",
              textTransform: "uppercase", color: "var(--accent)",
            }}
          >
            Scanning Registry…
          </span>
        </div>
      </div>
    </>
  );
}
