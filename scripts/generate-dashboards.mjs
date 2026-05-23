import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const REGIONS = {
  europe: [
    "ukraine", "romania", "russia", "estonia", "finland", "iceland", "greenland", "poland",
    "latvia", "lithuania", "moldova", "georgia", "czech-republic", "slovakia", "hungary", "bulgaria"
  ],
  asia: [
    "china", "singapore", "vietnam", "south-korea", "nepal", "japan", "taiwan", "thailand",
    "philippines", "indonesia", "malaysia", "sri-lanka", "maldives", "fiji", "samoa", "palau"
  ]
};

function countryIndexHtml(region, slug) {
  const depth = region === "europe" || region === "asia" ? "../.." : "..";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Country Hub | Civic Portal</title>
  <link rel="stylesheet" href="${depth}/assets/css/portal.css">
</head>
<body>
  <div class="shell">
    <div class="topbar">
      <div class="brand">
        <div class="brand-mark">CP</div>
        <div>
          <h1 id="country-title">Country Hub</h1>
          <p id="country-subtitle">Operational dashboards & field tools</p>
        </div>
      </div>
      <nav class="nav-pills">
        <a class="pill" href="${depth}/index.html">Global Portal</a>
        <a class="pill" href="../index.html">${region.charAt(0).toUpperCase() + region.slice(1)}</a>
      </nav>
    </div>
    <div class="hero" id="country-hero"></div>
    <h2 class="section-title">Dashboard Modules <span id="module-count"></span></h2>
    <div class="grid grid-3" id="module-grid"></div>
    <h2 class="section-title">Cross-Region Tools</h2>
    <div class="grid grid-2" id="tools-grid"></div>
    <div class="footer">Civic Portal — portfolio demo for gov, NGO, and humanitarian operations</div>
  </div>
  <script src="${depth}/assets/js/country-data.js"></script>
  <script>
    const region = "${region}";
    const slug = "${slug}";
    const country = CIVIC_PORTAL.getCountry(region, slug);
    const modules = CIVIC_PORTAL.getModulesForCountry(country);
    document.getElementById("country-title").textContent = country.flag + " " + country.name;
    document.getElementById("country-subtitle").textContent = country.capital + " · " + country.region;
    document.getElementById("module-count").textContent = modules.length + " modules";
    document.getElementById("country-hero").innerHTML = \`
      <h2>\${country.name} Operations Center</h2>
      <p>Priority sectors: \${country.focus.join(", ")}. Select a module below or use cross-region tools for relocation, grants, and field deployment.</p>
      <div class="hero-tags">\${country.focus.map(f => '<span class="tag">' + f + '</span>').join("")}\${country.sanctionsOnly ? '<span class="tag">US Sanctions Reference Only</span>' : ''}</div>\`;
    document.getElementById("module-grid").innerHTML = modules.map(m => \`
      <a class="card-link" href="dashboard.html?module=\${m.id}">
        <div class="card">
          <h3>\${m.icon} \${m.name}</h3>
          <p>Sectors: \${m.sectors.join(", ")}</p>
          <div class="card-meta"><span class="badge badge-blue">\${m.sectors[0]}</span><span>Open →</span></div>
        </div>
      </a>\`).join("");
    document.getElementById("tools-grid").innerHTML = CIVIC_PORTAL.TOOLS.slice(0, 4).map(t => \`
      <a class="card-link" href="${depth}/\${t.path.replace('../', '')}">
        <div class="card"><h3>\${t.name}</h3><p>\${t.desc}</p></div>
      </a>\`).join("");
  </script>
</body>
</html>`;
}

function dashboardHtml(region, slug) {
  const depth = "../..";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Civic Portal</title>
  <link rel="stylesheet" href="${depth}/assets/css/portal.css">
</head>
<body>
  <div class="shell dashboard-layout">
    <aside class="sidebar no-print">
      <h2><span class="country-flag" id="country-flag"></span><span id="country-name"></span></h2>
      <p style="color:var(--muted);font-size:0.85rem;margin-top:6px;">Module navigation</p>
      <nav id="module-nav"></nav>
      <div style="margin-top:16px;">
        <a class="pill" href="index.html">← Country Hub</a>
      </div>
    </aside>
    <main class="main-panel">
      <div class="topbar no-print" style="margin-bottom:0;">
        <div>
          <h2 id="module-title" style="font-size:1.3rem;"></h2>
          <p id="module-desc" style="color:var(--muted);font-size:0.9rem;max-width:720px;"></p>
        </div>
        <div class="toolbar">
          <button class="btn btn-secondary" id="refresh-btn">Refresh</button>
          <button class="btn btn-primary" id="export-btn">Export / Print</button>
        </div>
      </div>
      <div class="print-only"><h2>Civic Portal — Field Report</h2></div>
      <div class="panel">
        <div class="panel-header"><h3>Country Context</h3></div>
        <div id="country-context"></div>
      </div>
      <div class="stats-row" id="stats-row"></div>
      <div class="grid grid-2">
        <div class="panel">
          <div class="panel-header"><h3>Regional Distribution</h3></div>
          <div class="chart-bar-wrap" id="region-chart"></div>
        </div>
        <div class="panel">
          <div class="panel-header"><h3>Operational Map</h3></div>
          <div class="map-placeholder" id="map-panel"></div>
        </div>
      </div>
      <div class="grid grid-2">
        <div class="panel">
          <div class="panel-header"><h3>Primary Uses</h3></div>
          <div id="module-uses"></div>
        </div>
        <div class="panel">
          <div class="panel-header"><h3>Dashboard Features</h3></div>
          <div id="module-features"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Strategic Insights</h3><div id="business-link"></div></div>
        <div id="module-insights"></div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Active Projects & Partners</h3></div>
        <div id="projects-table"></div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Alerts & Actions</h3></div>
        <div id="alerts-panel"></div>
      </div>
    </main>
  </div>
  <script src="${depth}/assets/js/country-data.js"></script>
  <script src="${depth}/assets/js/country-enrichment.js"></script>
  <script src="${depth}/assets/js/dashboard-core.js"></script>
  <script>
    const params = new URLSearchParams(location.search);
    CIVIC_DASHBOARD.initDashboard({
      region: "${region}",
      slug: "${slug}",
      moduleId: params.get("module") || "humanitarian-ops"
    });
  </script>
</body>
</html>`;
}

function regionIndexHtml(region) {
  const listName = region === "europe" ? "EUROPE" : "ASIA";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${region.charAt(0).toUpperCase() + region.slice(1)} | Civic Portal</title>
  <link rel="stylesheet" href="../assets/css/portal.css">
</head>
<body>
  <div class="shell">
    <div class="topbar">
      <div class="brand">
        <div class="brand-mark">CP</div>
        <div><h1>${region.charAt(0).toUpperCase() + region.slice(1)} Operations</h1><p>Country hubs & regional dashboards</p></div>
      </div>
      <nav class="nav-pills">
        <a class="pill" href="../index.html">Global Portal</a>
        <a class="pill" href="../tools/relocation-command-center.html">Relocation Center</a>
      </nav>
    </div>
    <div class="hero">
      <h2>${region === "europe" ? "European" : "Asian"} Country Dashboards</h2>
      <p>Gov, NGO, humanitarian, business development, and relocation sponsorship modules per country. Priority countries highlighted.</p>
    </div>
    <div class="grid grid-3" id="country-grid"></div>
    <div class="footer">Civic Portal — ${region} region</div>
  </div>
  <script src="../assets/js/country-data.js"></script>
  <script>
    const countries = CIVIC_PORTAL.${listName};
    document.getElementById("country-grid").innerHTML = countries.map(c => \`
      <a class="card-link" href="\${c.slug}/index.html">
        <div class="card">
          <h3>\${c.flag} \${c.name}</h3>
          <p>\${c.capital} · \${c.region}</p>
          <p>\${c.focus.slice(0,3).join(" · ")}</p>
          <div class="card-meta">
            <span class="badge \${c.priority ? 'badge-green' : 'badge-blue'}">\${c.priority ? 'Priority' : 'Available'}</span>
            <span>\${CIVIC_PORTAL.getModulesForCountry(c).length} modules</span>
          </div>
        </div>
      </a>\`).join("");
  </script>
</body>
</html>`;
}

for (const [region, slugs] of Object.entries(REGIONS)) {
  const regionDir = path.join(root, region);
  fs.mkdirSync(regionDir, { recursive: true });
  fs.writeFileSync(path.join(regionDir, "index.html"), regionIndexHtml(region));

  for (const slug of slugs) {
    const dir = path.join(regionDir, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), countryIndexHtml(region, slug));
    fs.writeFileSync(path.join(dir, "dashboard.html"), dashboardHtml(region, slug));
  }
}

console.log("Generated", Object.values(REGIONS).flat().length, "country hubs across europe + asia");
