window.HEALTH_PORTAL = window.HEALTH_PORTAL || {};

HEALTH_PORTAL.PLEDGE = {
  price: "$0",
  term: "forever",
  text: "Free for underserved health facilities — no subscription, no trial, no upsell, ever."
};

HEALTH_PORTAL.MODULES = [
  { id: "patient-flow", name: "Patient Flow & Wait Times", icon: "🚶", desc: "Queue management, daily visits, peak hours" },
  { id: "pharmacy-supply", name: "Pharmacy & Supply Inventory", icon: "💊", desc: "Stock levels, reorder alerts, expiry tracking" },
  { id: "staff-scheduling", name: "Staff & Volunteer Scheduling", icon: "📅", desc: "Shifts, coverage gaps, on-call roster" },
  { id: "equipment-maintenance", name: "Equipment Maintenance", icon: "🔧", desc: "Device status, service dates, breakdown log" },
  { id: "referral-network", name: "Referral & Transfer Tracking", icon: "🏥", desc: "Outbound referrals, follow-up status" },
  { id: "immunization-coldchain", name: "Immunization & Cold Chain", icon: "❄️", desc: "Vaccine fridge temps, stock, session planning" },
  { id: "maternal-child", name: "Maternal & Child Health", icon: "👶", desc: "ANC visits, deliveries, growth monitoring slots" },
  { id: "outbreak-surveillance", name: "Outbreak Surveillance", icon: "📋", desc: "Syndromic counts, alert thresholds (ops only)" },
  { id: "donor-reporting", name: "Donor & Grant Reporting", icon: "📊", desc: "Output indicators for NGO/gov funders" },
  { id: "volunteer-coordination", name: "Volunteer Coordination", icon: "🤝", desc: "Visiting clinicians, community health workers" },
  { id: "equity-access", name: "Access & Equity Metrics", icon: "⚖️", desc: "Reach by zone, vulnerable group coverage" },
  { id: "mental-health-referrals", name: "Mental Health Referrals", icon: "🧠", desc: "Counseling waitlist, external partner routing" }
];

HEALTH_PORTAL.FACILITIES = [
  {
    slug: "rural-clinic",
    name: "Rural Primary Health Center",
    icon: "🏘️",
    setting: "Low-resource rural district",
    capacity: "5–30 beds / day clinic",
    challenges: ["Transport delays", "Drug stockouts", "Staff shortages", "Power outages"],
    regions: ["Nepal", "Romania rural", "Moldova", "Indonesia", "Philippines"]
  },
  {
    slug: "refugee-clinic",
    name: "Refugee Camp / IDP Clinic",
    icon: "⛺",
    setting: "Displacement camp or transit center",
    capacity: "200–2000 daily contacts",
    challenges: ["High patient volume", "Multilingual intake", "Outbreak risk", "Referral bottlenecks"],
    regions: ["Poland border", "Romania", "Thailand camps", "Georgia IDPs"]
  },
  {
    slug: "island-post",
    name: "Remote Island Health Post",
    icon: "🏝️",
    setting: "Small island or archipelago",
    capacity: "1–5 staff, boat/supply dependent",
    challenges: ["Supply boat schedules", "Cold chain", "Emergency evacuation", "Connectivity"],
    regions: ["Maldives", "Fiji", "Samoa", "Palau", "Philippines"]
  },
  {
    slug: "urban-clinic",
    name: "Urban Underserved Community Clinic",
    icon: "🏙️",
    setting: "Informal settlement or low-income urban zone",
    capacity: "50–300 daily visits",
    challenges: ["Overcrowding", "Chronic disease load", "Insurance gaps", "Staff burnout"],
    regions: ["Vietnam", "Nepal Kathmandu", "Bulgaria", "Georgia", "Sri Lanka"]
  },
  {
    slug: "mobile-unit",
    name: "Mobile Clinic Unit",
    icon: "🚐",
    setting: "Roving outreach to unreachable villages",
    capacity: "1 vehicle, 2–8 staff",
    challenges: ["Route planning", "Perishable supplies", "Data sync offline", "Fuel/logistics"],
    regions: ["Ukraine frontline areas", "Nepal hills", "Romania Roma communities", "Indonesia"]
  },
  {
    slug: "maternal-post",
    name: "Maternal & Child Health Post",
    icon: "🤰",
    setting: "Dedicated MNCH focus facility",
    capacity: "ANC, delivery referral, immunization",
    challenges: ["Referral for complications", "Nutrition", "Immunization dropout", "Midwife coverage"],
    regions: ["Global — WHO priority settings"]
  }
];

HEALTH_PORTAL.AGENTS = [
  {
    id: "supply-advisor",
    name: "Supply Reorder Advisor",
    icon: "📦",
    desc: "Flags low stock, suggests reorder quantities from usage patterns. Operational only — not clinical.",
    topics: ["supply", "pharmacy", "stock", "inventory", "reorder"]
  },
  {
    id: "staff-scheduler",
    name: "Staff Shift Planner",
    icon: "📅",
    desc: "Builds fair shift rosters, flags coverage gaps, handles volunteer slots.",
    topics: ["staff", "shift", "schedule", "volunteer", "roster", "coverage"]
  },
  {
    id: "intake-helper",
    name: "Patient Intake Assistant",
    icon: "📝",
    desc: "Guides clerks through registration fields, duplicate checks, and daily tally — not diagnosis.",
    topics: ["intake", "register", "patient", "form", "queue"]
  },
  {
    id: "referral-router",
    name: "Referral Routing Agent",
    icon: "🔄",
    desc: "Matches case type to referral facility tier and tracks follow-up checklist.",
    topics: ["referral", "transfer", "hospital", "follow-up"]
  },
  {
    id: "equipment-agent",
    name: "Equipment Maintenance Agent",
    icon: "🔧",
    desc: "Service reminders, breakdown logging, spare parts priority list.",
    topics: ["equipment", "maintenance", "repair", "device", "fridge"]
  },
  {
    id: "donor-report-agent",
    name: "Donor Report Generator",
    icon: "📊",
    desc: "Drafts monthly output summaries from dashboard stats for NGO/gov donors.",
    topics: ["donor", "report", "grant", "indicator", "funder"]
  }
];

HEALTH_PORTAL.getFacility = function (slug) {
  return HEALTH_PORTAL.FACILITIES.find((f) => f.slug === slug);
};

HEALTH_PORTAL.getModule = function (id) {
  return HEALTH_PORTAL.MODULES.find((m) => m.id === id);
};

HEALTH_PORTAL.getAgent = function (id) {
  return HEALTH_PORTAL.AGENTS.find((a) => a.id === id);
};

HEALTH_PORTAL.storageKey = function (facility, key) {
  return "health-" + facility + "-" + key;
};

HEALTH_PORTAL.loadFacilityProfile = function () {
  try {
    return JSON.parse(localStorage.getItem("health-facility-profile") || "{}");
  } catch (_) {
    return {};
  }
};

HEALTH_PORTAL.saveFacilityProfile = function (profile) {
  localStorage.setItem("health-facility-profile", JSON.stringify(profile));
};
