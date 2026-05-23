/**
 * Live public data feeds with offline/static fallbacks.
 * Sources: REST Countries, UN OCHA HDX (where CORS allows), static NGO reference data.
 */
window.CIVIC_LIVE = window.CIVIC_LIVE || {};

CIVIC_LIVE.CACHE_KEY = "civic-portal-live-cache-v1";

CIVIC_LIVE.FALLBACK = {
  ukraine: {
    population: 37000000,
    region: "Europe",
    capital: "Kyiv",
    recoveryBudget: "€50B+ EU Facility",
    activeNGOs: 847,
    deminingHa: 174000,
    source: "Static reference (May 2026)"
  },
  grants: [
    { name: "EU Ukraine Facility", donor: "European Commission", max: "€50B program", status: "Active", url: "https://neighbourhood-enlargement.ec.europa.eu/index_en" },
    { name: "Central Emergency Response Fund", donor: "UN OCHA CERF", max: "$500M/yr pool", status: "Active", url: "https://cerf.un.org" },
    { name: "Humanitarian Response Plans", donor: "UN OCHA", max: "Country HRPs", status: "Active", url: "https://www.unocha.org/publications" }
  ],
  humanitarian: [
    { country: "Ukraine", plan: "2026 HRP", requirement: "$3.1B", funded: "42%", source: "UN OCHA FTS (reference)" },
    { country: "Syria", plan: "2026 HRP", requirement: "$4.2B", funded: "18%", source: "UN OCHA FTS (reference)" },
    { country: "Sudan", plan: "2026 HRP", requirement: "$2.7B", funded: "22%", source: "UN OCHA FTS (reference)" }
  ],
  governance: {
    russia: {
      civilLibertiesIndex: 9,
      pressFreedomRank: 164,
      corruptionIndex: 141,
      ruleOfLaw: 0.32,
      notes: "Aggregated from publicly published governance indices (Freedom House, RSF, TI). For academic/NGO research only.",
      indicators: [
        { label: "Civil liberties (0–100)", value: 9, max: 100 },
        { label: "Press freedom rank (lower=worse)", value: 164, max: 180 },
        { label: "Corruption perception rank", value: 141, max: 180 },
        { label: "Rule of law index", value: 0.32, max: 1 }
      ]
    }
  }
};

CIVIC_LIVE.cache = function (key, data) {
  try {
    const all = JSON.parse(localStorage.getItem(CIVIC_LIVE.CACHE_KEY) || "{}");
    all[key] = { data, ts: Date.now() };
    localStorage.setItem(CIVIC_LIVE.CACHE_KEY, JSON.stringify(all));
  } catch (_) {}
};

CIVIC_LIVE.getCache = function (key, maxAgeMs) {
  try {
    const all = JSON.parse(localStorage.getItem(CIVIC_LIVE.CACHE_KEY) || "{}");
    const entry = all[key];
    if (entry && Date.now() - entry.ts < maxAgeMs) return entry.data;
  } catch (_) {}
  return null;
};

CIVIC_LIVE.fetchCountry = async function (name) {
  const cacheKey = "country-" + name.toLowerCase();
  const cached = CIVIC_LIVE.getCache(cacheKey, 86400000);
  if (cached) return { ...cached, fromCache: true };

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,capital,population,region,subregion,flags,languages,currencies`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const c = data[0];
    const result = {
      name: c.name.common,
      capital: c.capital?.[0] || "—",
      population: c.population,
      region: c.region,
      subregion: c.subregion,
      flag: c.flags?.emoji || "",
      languages: Object.values(c.languages || {}).join(", "),
      currency: Object.keys(c.currencies || {}).join(", "),
      source: "REST Countries API",
      live: true
    };
    CIVIC_LIVE.cache(cacheKey, result);
    return result;
  } catch (e) {
    const fb = CIVIC_LIVE.FALLBACK[name.toLowerCase()] || {};
    return {
      name: name,
      capital: fb.capital || "—",
      population: fb.population || null,
      region: fb.region || "—",
      source: "Offline fallback",
      live: false,
      error: e.message
    };
  }
};

CIVIC_LIVE.fetchHumanitarianSummary = async function () {
  const cached = CIVIC_LIVE.getCache("humanitarian", 3600000);
  if (cached) return { rows: cached, fromCache: true, live: false };

  // UN OCHA FTS has CORS restrictions from browser; use reference data + cache pattern
  const rows = CIVIC_LIVE.FALLBACK.humanitarian;
  CIVIC_LIVE.cache("humanitarian", rows);
  return { rows, live: false, source: "Reference data — wire FTS API server-side in production" };
};

CIVIC_LIVE.fetchGrants = async function () {
  const cached = CIVIC_LIVE.getCache("grants", 3600000);
  if (cached) return { rows: cached, fromCache: true };

  const rows = CIVIC_LIVE.FALLBACK.grants;
  CIVIC_LIVE.cache("grants", rows);
  return { rows, live: false, source: "EU/UN public program references" };
};

CIVIC_LIVE.renderStatus = function (el, result) {
  if (!el) return;
  const badge = result.live
    ? '<span class="badge badge-green">Live API</span>'
    : result.fromCache
      ? '<span class="badge badge-amber">Cached</span>'
      : '<span class="badge badge-blue">Reference</span>';
  el.innerHTML = `${badge} <span style="color:var(--muted);margin-left:8px;">${result.source || ""}</span>`;
};
