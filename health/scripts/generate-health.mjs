import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const FACILITIES = [
  "rural-clinic", "refugee-clinic", "island-post", "urban-clinic", "mobile-unit", "maternal-post"
];

function facilityIndex(slug) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facility Hub | Health Portal</title>
  <link rel="stylesheet" href="../../../assets/css/portal.css">
  <link rel="stylesheet" href="../../assets/css/health.css">
</head>
<body>
  <div class="shell">
    <div class="topbar">
      <div class="brand"><div class="brand-mark" style="background:linear-gradient(135deg,var(--health-accent),var(--health-accent-2));">HP</div>
        <div><h1 id="facility-title">Facility Hub</h1><p id="facility-sub">Free forever · No cost to facilities</p></div>
      </div>
      <nav class="nav-pills">
        <a class="pill" href="../../index.html">Health Portal</a>
        <a class="pill" href="../../agents/index.html">Agents</a>
      </nav>
    </div>
    <div class="disclaimer"><strong>Operational tools only.</strong> Not medical advice. Clinical decisions remain with licensed staff per national protocols.</div>
    <div class="hero health-hero" id="facility-hero"></div>
    <h2 class="section-title">Dashboard Modules <span id="mod-count"></span></h2>
    <div class="grid grid-3" id="module-grid"></div>
    <h2 class="section-title">Facility Agents <span>free · offline</span></h2>
    <div class="grid grid-2" id="agent-grid"></div>
  </div>
  <script src="../../assets/js/health-data.js"></script>
  <script>
    const slug = "${slug}";
    const f = HEALTH_PORTAL.getFacility(slug);
    document.getElementById("facility-title").textContent = f.icon + " " + f.name;
    document.getElementById("facility-sub").textContent = f.setting + " · " + f.capacity;
    document.getElementById("mod-count").textContent = HEALTH_PORTAL.MODULES.length + " modules";
    document.getElementById("facility-hero").innerHTML = \`
      <h2>\${f.name}</h2>
      <p>Common challenges: \${f.challenges.join(", ")}. Typical settings: \${f.regions.join(", ")}.</p>
      <div class="hero-tags"><span class="tag tag-free">FREE FOREVER — $0</span>\${f.challenges.map(c => '<span class="tag">'+c+'</span>').join('')}</div>\`;
    document.getElementById("module-grid").innerHTML = HEALTH_PORTAL.MODULES.map(m => \`
      <a class="card-link" href="dashboard.html?module=\${m.id}"><div class="card">
        <h3>\${m.icon} \${m.name}</h3><p>\${m.desc}</p></div></a>\`).join("");
    document.getElementById("agent-grid").innerHTML = HEALTH_PORTAL.AGENTS.slice(0,4).map(a => \`
      <a class="card-link agent-card" href="../../agents/index.html?agent=\${a.id}&facility=\${slug}"><div class="card">
        <h3>\${a.icon} \${a.name}</h3><p>\${a.desc}</p></div></a>\`).join("");
  </script>
</body>
</html>`;
}

function facilityDashboard(slug) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Health Portal</title>
  <link rel="stylesheet" href="../../../assets/css/portal.css">
  <link rel="stylesheet" href="../../assets/css/health.css">
</head>
<body>
  <div class="shell dashboard-layout">
    <aside class="sidebar no-print">
      <h2 id="facility-name"></h2>
      <p style="color:var(--muted);font-size:0.82rem;">Free for underserved facilities</p>
      <nav id="module-nav"></nav>
      <a class="pill" href="index.html" style="display:inline-block;margin-top:12px;">← Facility Hub</a>
    </aside>
    <main class="main-panel">
      <div class="disclaimer no-print"><strong>Not medical advice.</strong> Operations dashboard for clinic staff and administrators.</div>
      <div class="topbar no-print" style="margin-bottom:0;">
        <div><h2 id="module-title"></h2><p id="module-desc" style="color:var(--muted);font-size:0.9rem;"></p></div>
        <button class="btn btn-primary" id="export-btn">Print / Export</button>
      </div>
      <div class="stats-row" id="stats-row"></div>
      <div class="grid grid-2">
        <div class="panel"><div class="panel-header"><h3>Activity Distribution</h3></div><div class="chart-bar-wrap" id="module-chart"></div></div>
        <div class="panel"><div class="panel-header"><h3>Alerts</h3></div><div id="alerts-panel"></div></div>
      </div>
      <div class="panel"><div class="panel-header"><h3>Today's Items</h3></div><div id="module-table"></div></div>
    </main>
  </div>
  <script src="../../assets/js/health-data.js"></script>
  <script src="../../assets/js/health-dashboard.js"></script>
  <script>
    const params = new URLSearchParams(location.search);
    HEALTH_DASHBOARD.initDashboard({ slug: "${slug}", moduleId: params.get("module") || "patient-flow" });
  </script>
</body>
</html>`;
}

for (const slug of FACILITIES) {
  const dir = path.join(root, "facilities", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), facilityIndex(slug));
  fs.writeFileSync(path.join(dir, "dashboard.html"), facilityDashboard(slug));
}

console.log("Generated", FACILITIES.length, "health facility hubs");
