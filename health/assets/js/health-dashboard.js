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

  function buildStats(facility, module) {
    const rnd = seededRandom(hashSeed(facility.slug + module.id));
    const visits = Math.floor(40 + rnd() * 260);
    return [
      { label: "Visits Today", value: fmt(visits), delta: "+" + Math.floor(rnd() * 15) + "% vs avg", up: rnd() > 0.3 },
      { label: "Avg Wait (min)", value: Math.floor(15 + rnd() * 90), delta: rnd() > 0.5 ? "improving" : "elevated", up: rnd() > 0.5 },
      { label: "Staff On Duty", value: fmt(Math.floor(2 + rnd() * 12)), delta: rnd() > 0.6 ? "full coverage" : "1 gap", up: rnd() > 0.6 },
      { label: "Stock Alerts", value: fmt(Math.floor(rnd() * 8)), delta: "reorder needed", up: false },
      { label: "Open Referrals", value: fmt(Math.floor(rnd() * 24)), delta: Math.floor(rnd() * 5) + " pending follow-up", up: true },
      { label: "Report Status", value: rnd() > 0.5 ? "Current" : "Due", delta: "donor monthly", up: rnd() > 0.5 }
    ];
  }

  function buildChart(facility, module) {
    const rnd = seededRandom(hashSeed(facility.slug + module.id + "c"));
    const labels =
      module.id === "pharmacy-supply"
        ? ["Antibiotics", "Analgesics", "IV fluids", "Maternal", "Vaccines"]
        : module.id === "patient-flow"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          : ["Zone A", "Zone B", "Zone C", "Zone D", "Outreach"];
    return labels.map((label) => ({ label, value: Math.floor(20 + rnd() * 80) }));
  }

  function buildTable(facility, module) {
    const rnd = seededRandom(hashSeed(facility.slug + module.id + "t"));
    const items =
      module.id === "pharmacy-supply"
        ? ["Paracetamol 500mg", "Amoxicillin 250mg", "ORS sachets", "Gloves (box)", "Malaria RDT", "Iron/folate"]
        : module.id === "equipment-maintenance"
          ? ["Solar fridge", "BP monitor", "Pulse oximeter", "Autoclave", "Generator"]
          : ["ANC visit", "Child immunization", "Wound care", "TB screening", "Mental health intake", "Referral out"];
    return items.slice(0, 6).map((item, i) => ({
      item,
      status: rnd() > 0.75 ? "Alert" : rnd() > 0.4 ? "OK" : "Monitor",
      detail: module.id === "pharmacy-supply" ? Math.floor(rnd() * 500) + " units" : rnd() > 0.5 ? "Scheduled" : "Pending"
    }));
  }

  function buildAlerts(facility, module) {
    return [
      { level: "warning", text: facility.challenges[0] + " — review today's ops plan" },
      { level: "info", text: "Donor indicator snapshot ready for export" },
      { level: module.id === "pharmacy-supply" ? "danger" : "info", text: module.id === "pharmacy-supply" ? "3 items below minimum stock level" : "Volunteer clinician arriving Friday" }
    ];
  }

  function renderStats(el, stats) {
    el.innerHTML = stats
      .map(
        (s) => `<div class="stat"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div>
        <div class="stat-delta ${s.up ? "delta-up" : "delta-down"}">${s.delta}</div></div>`
      )
      .join("");
  }

  function renderChart(el, data) {
    const max = Math.max(...data.map((d) => d.value));
    el.innerHTML = data
      .map(
        (d) => `<div class="chart-row"><span>${d.label}</span>
        <div class="chart-bar"><div class="chart-fill" style="width:${(d.value / max) * 100}%;background:linear-gradient(90deg,var(--health-accent),var(--health-accent-2))"></div></div>
        <span>${d.value}</span></div>`
      )
      .join("");
  }

  function renderTable(el, rows, module) {
    const cols = module.id === "pharmacy-supply" ? ["Item", "Stock", "Status"] : ["Activity", "Detail", "Status"];
    el.innerHTML = `<table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows
      .map(
        (r) => `<tr><td>${r.item}</td><td>${r.detail}</td><td><span class="badge badge-${r.status === "Alert" ? "red" : r.status === "OK" ? "green" : "amber"}">${r.status}</span></td></tr>`
      )
      .join("")}</tbody></table>`;
  }

  function renderAlerts(el, alerts) {
    el.innerHTML = alerts
      .map(
        (a) => `<div class="card" style="margin-bottom:8px;border-left:3px solid var(--${a.level === "danger" ? "danger" : a.level === "warning" ? "warning" : "accent"});">
        <span class="badge badge-${a.level === "danger" ? "red" : a.level === "warning" ? "amber" : "blue"}">${a.level.toUpperCase()}</span>
        <p style="margin-top:8px;color:var(--text);">${a.text}</p></div>`
      )
      .join("");
  }

  function initDashboard(opts) {
    const facility = HEALTH_PORTAL.getFacility(opts.slug);
    const module = HEALTH_PORTAL.getModule(opts.moduleId) || HEALTH_PORTAL.MODULES[0];
    const profile = HEALTH_PORTAL.loadFacilityProfile();

    document.title = `${module.name} — ${facility.name} | Health Portal`;
    document.getElementById("facility-name").textContent = facility.icon + " " + (profile.name || facility.name);
    document.getElementById("module-title").textContent = module.name;
    document.getElementById("module-desc").textContent = module.desc + " · " + facility.setting;

    document.getElementById("module-nav").innerHTML = HEALTH_PORTAL.MODULES.map(
      (m) => `<a href="dashboard.html?module=${m.id}" class="${m.id === module.id ? "active" : ""}">${m.icon} ${m.name}</a>`
    ).join("");

    renderStats(document.getElementById("stats-row"), buildStats(facility, module));
    renderChart(document.getElementById("module-chart"), buildChart(facility, module));
    renderTable(document.getElementById("module-table"), buildTable(facility, module), module);
    renderAlerts(document.getElementById("alerts-panel"), buildAlerts(facility, module));

    const exportBtn = document.getElementById("export-btn");
    if (exportBtn) exportBtn.addEventListener("click", () => window.print());
  }

  window.HEALTH_DASHBOARD = { initDashboard, buildStats, buildTable };
})();
