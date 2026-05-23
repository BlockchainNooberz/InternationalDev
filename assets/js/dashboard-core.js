(function () {
  "use strict";

  function hashSeed(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function seededRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }

  function fmt(n) {
    return n.toLocaleString("en-US");
  }

  function pct(n) {
    return (n * 100).toFixed(1) + "%";
  }

  function buildStats(country, module) {
    const rnd = seededRandom(hashSeed(country.slug + module.id));
    const base = 1000 + Math.floor(rnd() * 9000);
    return [
      { label: "Active Programs", value: fmt(Math.floor(base * (0.4 + rnd()))), delta: "+" + Math.floor(rnd() * 18) + "%", up: true },
      { label: "Beneficiaries (MTD)", value: fmt(Math.floor(base * 12 * rnd())), delta: "+" + Math.floor(rnd() * 12) + "%", up: rnd() > 0.2 },
      { label: "Field Teams", value: fmt(Math.floor(20 + rnd() * 180)), delta: rnd() > 0.5 ? "+" + Math.floor(rnd() * 8) : "-" + Math.floor(rnd() * 3), up: rnd() > 0.5 },
      { label: "Budget Utilization", value: pct(0.55 + rnd() * 0.35), delta: "on track", up: true },
      { label: "Open Requests", value: fmt(Math.floor(rnd() * 420)), delta: "-" + Math.floor(rnd() * 15) + "%", up: true },
      { label: "Avg Response (hrs)", value: (4 + rnd() * 20).toFixed(1), delta: "-" + Math.floor(rnd() * 10) + "%", up: true }
    ];
  }

  function buildChart(country, module) {
    const rnd = seededRandom(hashSeed(country.slug + module.id + "chart"));
    const labels = module.id.includes("climate")
      ? ["Coastal", "Urban Heat", "Flood Plain", "Drought", "Wildfire"]
      : module.id.includes("business")
        ? ["Micro-SME", "Co-op", "Social Ent.", "Export", "Incubator"]
        : ["North", "Central", "East", "West", "South"];
    return labels.map((label) => ({
      label,
      value: Math.floor(30 + rnd() * 70)
    }));
  }

  function buildTable(country, module) {
    const rnd = seededRandom(hashSeed(country.slug + module.id + "table"));
    const statuses = ["Active", "Pending", "Monitoring", "Escalated", "Closed"];
    const partners = ["UNHCR", "Red Cross", "Local Municipality", "EU Delegation", "USAID", "GIZ", "JICA", "World Bank"];
    const rows = [];
    for (let i = 0; i < 8; i++) {
      rows.push({
        id: country.slug.toUpperCase().slice(0, 2) + "-" + (1000 + i),
        project: module.name.split(" ")[0] + " Initiative " + (i + 1),
        partner: partners[Math.floor(rnd() * partners.length)],
        status: statuses[Math.floor(rnd() * statuses.length)],
        budget: "$" + fmt(Math.floor(50000 + rnd() * 950000))
      });
    }
    return rows;
  }

  function buildAlerts(country, module) {
    const rnd = seededRandom(hashSeed(country.slug + module.id + "alerts"));
    const templates = [
      "Border crossing wait times elevated near " + country.capital,
      "Funding tranche approval pending for Q2 programs",
      "Volunteer surge capacity needed for weekend shifts",
      "New EU grant window opens — eligibility review recommended",
      "Supply route weather delay — reroute via alternate hub",
      "Pet-friendly housing inventory low in capital region"
    ];
    return templates.slice(0, 3 + Math.floor(rnd() * 3)).map((t, i) => ({
      level: i === 0 ? "warning" : rnd() > 0.7 ? "danger" : "info",
      text: t
    }));
  }

  function renderStats(container, stats) {
    container.innerHTML = stats
      .map(
        (s) => `
      <div class="stat">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-delta ${s.up ? "delta-up" : "delta-down"}">${s.delta}</div>
      </div>`
      )
      .join("");
  }

  function renderChart(container, data) {
    const max = Math.max(...data.map((d) => d.value));
    container.innerHTML = data
      .map(
        (d) => `
      <div class="chart-row">
        <span>${d.label}</span>
        <div class="chart-bar"><div class="chart-fill" style="width:${(d.value / max) * 100}%"></div></div>
        <span>${d.value}</span>
      </div>`
      )
      .join("");
  }

  function renderTable(container, rows) {
    container.innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>Project</th><th>Partner</th><th>Status</th><th>Budget</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (r) => `<tr>
              <td>${r.id}</td><td>${r.project}</td><td>${r.partner}</td>
              <td><span class="badge badge-${r.status === "Active" ? "green" : r.status === "Escalated" ? "red" : "amber"}">${r.status}</span></td>
              <td>${r.budget}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>`;
  }

  function renderAlerts(container, alerts) {
    container.innerHTML = alerts
      .map(
        (a) => `
      <div class="card" style="margin-bottom:8px;border-left:3px solid var(--${a.level === "danger" ? "danger" : a.level === "warning" ? "warning" : "accent"});">
        <span class="badge badge-${a.level === "danger" ? "red" : a.level === "warning" ? "amber" : "blue"}">${a.level.toUpperCase()}</span>
        <p style="margin-top:8px;color:var(--text);">${a.text}</p>
      </div>`
      )
      .join("");
  }

  function initDashboard(options) {
    const { region, slug, moduleId } = options;
    const country = CIVIC_PORTAL.getCountry(region, slug);
    const modules = CIVIC_PORTAL.getModulesForCountry(country);
    const module = modules.find((m) => m.id === moduleId) || modules[0];
    const enrich = typeof COUNTRY_ENRICHMENT !== "undefined" ? COUNTRY_ENRICHMENT.get(country, module) : null;

    document.title = `${module.name} — ${country.name} | Civic Portal`;
    document.getElementById("country-name").textContent = country.name;
    document.getElementById("country-flag").textContent = country.flag;
    document.getElementById("module-title").textContent = module.name;
    document.getElementById("module-desc").textContent =
      `${module.name} for ${country.name} (${country.capital}). Sectors: ${module.sectors.join(", ")}.`;

    const nav = document.getElementById("module-nav");
    nav.innerHTML = modules
      .map(
        (m) =>
          `<a href="dashboard.html?module=${m.id}" class="${m.id === module.id ? "active" : ""}">${m.icon} ${m.name}</a>`
      )
      .join("");

    renderStats(document.getElementById("stats-row"), buildStats(country, module));
    if (enrich && enrich.kpis) {
      renderStats(document.getElementById("stats-row"), enrich.kpis.map(k => ({
        label: k.label, value: k.value, delta: "live estimate", up: true
      })));
    }
    renderChart(document.getElementById("region-chart"), buildChart(country, module));
    renderTable(document.getElementById("projects-table"), buildTable(country, module));
    renderAlerts(document.getElementById("alerts-panel"), buildAlerts(country, module));

    if (enrich) renderEnrichment(enrich, country, module, region);

    document.getElementById("export-btn").addEventListener("click", () => window.print());
    document.getElementById("refresh-btn").addEventListener("click", () => location.reload());

    const mapEl = document.getElementById("map-panel");
    if (mapEl) {
      mapEl.innerHTML = `<strong>${country.capital}</strong> · ${country.region}<br><span style="font-size:0.85rem;color:var(--muted);">${module.name} — ${enrich ? enrich.overview.humanitarianPriority + " priority" : "operational view"}</span>`;
    }
  }

  function renderEnrichment(enrich, country, module, region) {
    const ctx = document.getElementById("country-context");
    if (ctx) {
      ctx.innerHTML = `<div class="stats-row">${[
        { l: "Population", v: enrich.overview.population },
        { l: "Economic context", v: enrich.overview.economicContext },
        { l: "Humanitarian priority", v: enrich.overview.humanitarianPriority },
        { l: "Relocation viability", v: enrich.overview.relocationViability }
      ].map((x) => `<div class="stat"><div class="stat-label">${x.l}</div><div class="stat-value" style="font-size:1rem;">${x.v}</div></div>`).join("")}</div>
      <p style="color:var(--muted);font-size:0.88rem;margin-top:8px;">Focus: ${enrich.overview.focusSectors.join(" · ")} · Key donors/partners: ${enrich.keyPartners.join(", ")}</p>`;
    }
    const uses = document.getElementById("module-uses");
    if (uses) {
      uses.innerHTML = `<ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">${enrich.uses.map((u) =>
        `<li><span class="badge badge-${u.priority === "Primary" ? "green" : "blue"}">${u.priority}</span> ${u.text}</li>`
      ).join("")}</ul>`;
    }
    const feat = document.getElementById("module-features");
    if (feat) {
      feat.innerHTML = enrich.features.map((f) => `<span class="tag" style="margin:4px;">${f}</span>`).join("");
    }
    const ins = document.getElementById("module-insights");
    if (ins) {
      let html = enrich.insights.map((i) => `<div class="card" style="margin-bottom:8px;padding:12px;"><p style="font-size:0.9rem;">💡 ${i}</p></div>`).join("");
      if (enrich.relocNote) html += `<div class="card" style="padding:12px;border-left:3px solid var(--success);"><p style="font-size:0.9rem;">✈ ${enrich.relocNote}</p></div>`;
      ins.innerHTML = html;
    }
    const biz = document.getElementById("business-link");
    if (biz) {
      biz.innerHTML = `<a class="btn btn-secondary" href="../../../tools/business-idea-generator.html?country=${country.slug}&region=${region}">Business ideas · ${country.name}</a>
        <a class="btn btn-secondary" href="../../../hub.html" style="margin-left:8px;">Andrew Hub</a>`;
    }
  }

  window.CIVIC_DASHBOARD = { initDashboard, buildStats, buildChart, buildTable, renderEnrichment };
})();
