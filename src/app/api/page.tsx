// import Link from "next/link";

// const ENDPOINTS = [
//   {
//     method: "GET",
//     path: "/api/audit/:username",
//     desc: "Fetch a full audit report for a GitHub user.",
//     params: [
//       { name: "username", type: "string", required: true, desc: "GitHub username to audit" },
//     ],
//     response: `{
//   "profile": {
//     "login": "torvalds",
//     "name": "Linus Torvalds",
//     "avatar_url": "https://avatars.githubusercontent.com/...",
//     "bio": "Creator of Linux and Git.",
//     "location": "Portland, OR",
//     "public_repos": 6,
//     "followers": 178000,
//     "following": 0
//   },
//   "originalRepos": [
//     {
//       "id": 2325298,
//       "name": "linux",
//       "description": "Linux kernel source tree",
//       "html_url": "https://github.com/torvalds/linux",
//       "language": "C",
//       "stargazers_count": 214000,
//       "has_issues": true,
//       "license": { "key": "gpl-2.0" },
//       "archived": false,
//       "fork": false
//     }
//   ],
//   "healthScore": 97,
//   "tier": "Elite"
// }`,
//     errors: [
//       { code: "404", message: "User not found on GitHub" },
//       { code: "422", message: "Invalid username format" },
//       { code: "503", message: "GitHub API rate limit exceeded" },
//     ],
//   },
//   {
//     method: "GET",
//     path: "/api/score/:username",
//     desc: "Fetch only the numerical credibility score and tier for a user — lightweight alternative to the full audit.",
//     params: [
//       { name: "username", type: "string", required: true, desc: "GitHub username to score" },
//     ],
//     response: `{
//   "login": "gaearon",
//   "healthScore": 92,
//   "tier": "Expert"
// }`,
//     errors: [
//       { code: "404", message: "User not found on GitHub" },
//       { code: "503", message: "GitHub API rate limit exceeded" },
//     ],
//   },
// ];

// const METHOD_COLOR: Record<string, string> = {
//   GET: "#3fb950",
//   POST: "#3b82f6",
//   DELETE: "#f85149",
// };

// export default function ApiPage() {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');
//         :root { --accent:#00d4aa; --bg:#080c10; --card:#111820; --border:#1e2d3d; --text:#e6edf3; --muted:#7d8590; }
//         *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
//         body { font-family:'JetBrains Mono',monospace !important; background:var(--bg) !important; }
//         .gc-grid-bg {
//           background-image:linear-gradient(rgba(0,212,170,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,.025) 1px,transparent 1px);
//           background-size:44px 44px;
//         }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
//         @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
//         .gc-fade { animation: fadeUp .5s ease both; }
//         .gc-pulse { animation: pulseDot 2s ease-in-out infinite; }
//         .gc-blink { animation: blink 1s step-end infinite; }
//         .back-link { transition:color .15s; text-decoration:none; }
//         .back-link:hover { color:var(--accent) !important; }
//         .back-link:hover .back-arrow { transform:translateX(-3px); }
//         .back-arrow { display:inline-block; transition:transform .2s; }
//         .endpoint-card { transition:border-color .2s; }
//         .endpoint-card:hover { border-color:rgba(0,212,170,.3) !important; }
//         .code-block {
//           background:#010409; border:1px solid var(--border);
//           border-radius:10px; padding:1.2rem 1.4rem;
//           font-family:'JetBrains Mono',monospace; font-size:.75rem;
//           color:#a8b8cc; line-height:1.85; white-space:pre; overflow-x:auto;
//         }
//         .code-block .key { color:#79c0ff; }
//         .code-block .str { color:#a5d6a7; }
//         .code-block .num { color:#f59e0b; }
//         .code-block .bool { color:#f85149; }
//         .param-row { display:grid; grid-template-columns:140px 80px 80px 1fr; gap:1rem; align-items:baseline; padding:.6rem 0; border-bottom:1px solid rgba(30,45,61,.6); font-size:.75rem; font-family:'JetBrains Mono',monospace; }
//         .param-row:last-child { border-bottom:none; }
//         table { width:100%; border-collapse:collapse; }
//         th, td { text-align:left; padding:.6rem .9rem; font-family:'JetBrains Mono',monospace; font-size:.72rem; border-bottom:1px solid var(--border); }
//         th { color:var(--muted); font-size:.62rem; letter-spacing:.08em; text-transform:uppercase; }
//         tr:last-child td { border-bottom:none; }
//         tr:hover td { background:rgba(255,255,255,.015); }
//       `}</style>

//       <div className="gc-grid-bg min-h-screen" style={{ background:"var(--bg)", color:"var(--text)" }}>
//         <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2" style={{ width:800, height:300, zIndex:0, background:"radial-gradient(ellipse, rgba(0,212,170,.05) 0%, transparent 70%)" }} />

//         {/* NAV */}
//         <nav
//           className="sticky top-0 flex items-center justify-between px-6 md:px-10"
//           style={{
//             height: 58, zIndex: 50,
//             background: "rgba(8,12,16,.9)",
//             backdropFilter: "blur(16px)",
//             borderBottom: "1px solid var(--border)",
//           }}
//         >
//             <Link
//             href="/"
//             className="back-link flex items-center gap-2"
//             style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".78rem", color: "var(--muted)" }}
//           >
//             <span className="back-arrow">←</span>
//             gitcheck
//           </Link>
//          <div
//             className="flex items-center gap-2"
//             style={{
//               fontFamily: "'JetBrains Mono', monospace",
//               fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
//               padding: "4px 12px", borderRadius: 100,
//               background: "rgba(0,212,170,.07)", border: "1px solid rgba(0,212,170,.18)",
//               color: "#00d4aa",
//             }}
//           >
//             <span
//               className="gc-pulse rounded-full"
//               style={{ width: 6, height: 6, background: "#00d4aa", display: "inline-block" }}
//             />
//             Api Reference
//           </div>
//         </nav>

//         <div className="relative" style={{ zIndex:1, maxWidth:860, margin:"0 auto", padding:"3rem 1.5rem 6rem" }}>

//           {/* Header */}
//           <div className="gc-fade" style={{ marginBottom:"3.5rem" }}>
//             <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)", marginBottom:".8rem" }}>API Reference</div>
//             <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2rem, 4vw, 3rem)", letterSpacing:"-.03em", lineHeight:.95, marginBottom:"1rem" }}>
//               GitCheck API<br /><span style={{ color:"var(--muted)", fontWeight:600, fontSize:".6em" }}>REST Endpoints</span>
//             </h1>
//             <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".82rem", color:"var(--muted)", lineHeight:1.75, maxWidth:520, marginBottom:"2rem" }}>
//               GitCheck wraps the GitHub public REST API (v3) to fetch, filter, and score developer profiles. All endpoints are server-side — no auth token required from the client.
//             </p>

//             {/* Base URL box */}
//             <div style={{ display:"flex", alignItems:"center", gap:"1rem", background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"1rem 1.4rem" }}>
//               <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--muted)", flexShrink:0 }}>Base URL</span>
//               <div style={{ flex:1, height:1, background:"var(--border)" }} />
//               <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".82rem", color:"var(--accent)" }}>https://gitcheck.dev</code>
//             </div>
//           </div>

//           {/* Rate limit notice */}
//           <div style={{ background:"rgba(245,158,11,.05)", border:"1px solid rgba(245,158,11,.2)", borderRadius:12, padding:"1rem 1.4rem", marginBottom:"3rem", display:"flex", gap:"1rem", alignItems:"flex-start" }}>
//             <span style={{ fontSize:"1rem", flexShrink:0 }}>⚠</span>
//             <div>
//               <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".85rem", color:"#f59e0b", marginBottom:".3rem" }}>Rate Limits</div>
//               <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".75rem", color:"var(--muted)", lineHeight:1.7 }}>
//                 GitCheck forwards requests to the GitHub unauthenticated API, which is limited to <span style={{ color:"var(--text)" }}>60 requests/hour per IP</span>. Authenticated requests (via GitHub token on the server) raise this to 5,000/hour. Production deployments should configure a <code style={{ color:"var(--accent)" }}>GITHUB_TOKEN</code> env var.
//               </p>
//             </div>
//           </div>

//           {/* Section divider */}
//           <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"2rem" }}>
//             <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)" }}>Endpoints</span>
//             <div style={{ flex:1, height:1, background:"var(--border)" }} />
//             <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", color:"var(--muted)" }}>{ENDPOINTS.length} routes</span>
//           </div>

//           {/* Endpoints */}
//           {ENDPOINTS.map((ep, idx) => (
//             <div key={idx} className="endpoint-card" style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, marginBottom:"2rem", overflow:"hidden", position:"relative" }}>
//               <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(0,212,170,.18), transparent)" }} />

//               {/* Endpoint header */}
//               <div style={{ padding:"1.4rem 1.6rem", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
//                 <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:".72rem", color:METHOD_COLOR[ep.method], background:`${METHOD_COLOR[ep.method]}15`, border:`1px solid ${METHOD_COLOR[ep.method]}30`, padding:"3px 10px", borderRadius:6, letterSpacing:".06em" }}>
//                   {ep.method}
//                 </span>
//                 <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".88rem", color:"var(--text)", flex:1 }}>{ep.path}</code>
//               </div>

//               <div style={{ padding:"1.4rem 1.6rem" }}>
//                 <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".78rem", color:"var(--muted)", lineHeight:1.7, marginBottom:"1.6rem" }}>{ep.desc}</p>

//                 {/* Parameters */}
//                 <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:".8rem" }}>Parameters</div>
//                 <div style={{ background:"#010409", border:"1px solid var(--border)", borderRadius:10, padding:".4rem 1rem", marginBottom:"1.6rem" }}>
//                   <div style={{ display:"grid", gridTemplateColumns:"140px 80px 80px 1fr", gap:"1rem", padding:".4rem 0 .6rem", fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", letterSpacing:".08em", textTransform:"uppercase", color:"var(--muted)", borderBottom:"1px solid var(--border)", marginBottom:".2rem" }}>
//                     <span>Name</span><span>Type</span><span>Required</span><span>Description</span>
//                   </div>
//                   {ep.params.map((p, j) => (
//                     <div key={j} className="param-row">
//                       <code style={{ color:"var(--accent)" }}>{p.name}</code>
//                       <span style={{ color:"#79c0ff" }}>{p.type}</span>
//                       <span style={{ color: p.required ? "#3fb950" : "var(--muted)" }}>{p.required ? "yes" : "no"}</span>
//                       <span style={{ color:"var(--muted)" }}>{p.desc}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Response */}
//                 <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:".8rem" }}>Example Response</div>
//                 <div className="code-block" style={{ marginBottom:"1.6rem" }}>{ep.response}</div>

//                 {/* Errors */}
//                 <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:".8rem" }}>Error Codes</div>
//                 <div style={{ background:"#010409", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden" }}>
//                   <table>
//                     <thead><tr><th>Code</th><th>Message</th></tr></thead>
//                     <tbody>
//                       {ep.errors.map((e, j) => (
//                         <tr key={j}>
//                           <td style={{ color: e.code === "404" ? "#f85149" : e.code === "503" ? "#f59e0b" : "var(--accent)" }}>{e.code}</td>
//                           <td style={{ color:"var(--muted)" }}>{e.message}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Environment vars */}
//           <div style={{ display:"flex", alignItems:"center", gap:".75rem", margin:"3rem 0 2rem" }}>
//             <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)" }}>Environment</span>
//             <div style={{ flex:1, height:1, background:"var(--border)" }} />
//           </div>

//           <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", position:"relative" }}>
//             <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(0,212,170,.18), transparent)" }} />
//             <table>
//               <thead><tr><th>Variable</th><th>Required</th><th>Description</th></tr></thead>
//               <tbody>
//                 {[
//                   { v:"GITHUB_TOKEN", r:"Recommended", d:"GitHub personal access token to raise API rate limits from 60 to 5,000 req/hour" },
//                   { v:"NEXT_PUBLIC_BASE_URL", r:"Optional", d:"Base URL for canonical metadata (default: http://localhost:3000)" },
//                 ].map((row, i) => (
//                   <tr key={i}>
//                     <td><code style={{ color:"var(--accent)" }}>{row.v}</code></td>
//                     <td style={{ color: row.r === "Recommended" ? "#f59e0b" : "var(--muted)" }}>{row.r}</td>
//                     <td style={{ color:"var(--muted)" }}>{row.d}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Link from "next/link";

export default function ApiPage() {
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
            Coming Soon
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
            Coming Soon
          </div>

          {/* Error badge
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
          {/* <h1
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
          </p> */}

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
        {/* <div
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
        </div> */}

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
