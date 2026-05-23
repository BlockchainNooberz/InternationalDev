window.CIVIC_PORTAL = window.CIVIC_PORTAL || {};

CIVIC_PORTAL.MODULES = [
  { id: "humanitarian-ops", name: "Humanitarian Operations", icon: "🆘", sectors: ["NGO", "Gov", "UN"] },
  { id: "refugee-resettlement", name: "Refugee & Resettlement", icon: "🏠", sectors: ["NGO", "Gov", "Charity"] },
  { id: "ngo-volunteer", name: "NGO Volunteer Coordination", icon: "🤝", sectors: ["NGO", "Volunteer"] },
  { id: "community-dev", name: "Community Development", icon: "🏘️", sectors: ["Local Gov", "NGO", "Community"] },
  { id: "business-ecosystem", name: "Business & SME Ecosystem", icon: "📈", sectors: ["Economic Dev", "For-Profit"] },
  { id: "digital-gov", name: "Digital Government Services", icon: "🏛️", sectors: ["Gov", "Civic Tech"] },
  { id: "climate-resilience", name: "Climate & Resilience", icon: "🌍", sectors: ["Gov", "NGO", "Env"] },
  { id: "health-welfare", name: "Health & Social Welfare", icon: "🏥", sectors: ["Gov", "NGO", "Health"] },
  { id: "relocation-sponsorship", name: "Relocation & Sponsorship", icon: "✈️", sectors: ["HR", "NGO", "Employer"] },
  { id: "logistics-supply", name: "Logistics & Supply Chain", icon: "📦", sectors: ["NGO", "Gov", "Logistics"] },
  { id: "sanctions-compliance", name: "US Sanctions Compliance Desk", icon: "⚖️", sectors: ["Legal", "Gov", "Compliance"], restricted: true },
  { id: "grant-funding", name: "Grant & Funding Pipeline", icon: "💰", sectors: ["NGO", "Non-Profit", "Research"] },
  { id: "education-youth", name: "Education & Youth Programs", icon: "🎓", sectors: ["NGO", "Gov", "Schools"] },
  { id: "disaster-preparedness", name: "Disaster Preparedness", icon: "🚨", sectors: ["Gov", "NGO", "Civil Defense"] },
  { id: "rural-livelihood", name: "Rural Livelihood & Agriculture", icon: "🌾", sectors: ["NGO", "FAO", "Coops"] }
];

CIVIC_PORTAL.TOOLS = [
  { id: "relocation-command-center", name: "Relocation Command Center", desc: "Track visa pathways, sponsors, housing, and family relocation packages.", path: "../tools/relocation-command-center.html" },
  { id: "grant-funding-radar", name: "Grant & Funding Radar", desc: "Scan EU, UN, bilateral, and foundation funding aligned to your sector.", path: "../tools/grant-funding-radar.html" },
  { id: "volunteer-deployment", name: "Volunteer Deployment Planner", desc: "Match skills to field deployments with logistics and safety checklists.", path: "../tools/volunteer-deployment.html" },
  { id: "sanctions-screening-desk", name: "Sanctions Screening Desk", desc: "OFAC/EU screening workflows for permitted humanitarian corridors only.", path: "../tools/sanctions-screening-desk.html" },
  { id: "pet-family-relocation", name: "Pet & Family Relocation Kit", desc: "Pet import rules, quarantine, housing filters for families with dependents.", path: "../tools/pet-family-relocation.html" },
  { id: "offline-field-agent", name: "Offline Field Agent", desc: "Browser-based offline assistant for low-connectivity humanitarian zones.", path: "../tools/offline-field-agent.html" },
  { id: "ngo-partnership-map", name: "NGO Partnership Map", desc: "Discover implementing partners, co-funding, and referral networks.", path: "../tools/ngo-partnership-map.html" },
  { id: "sponsorship-pipeline", name: "Sponsorship Pipeline CRM", desc: "Manage employer/NGO sponsors offering relocation + housing packages.", path: "../tools/sponsorship-pipeline.html" },
  { id: "live-data-console", name: "Live Data Console", desc: "Public API feeds (REST Countries, UN/EU references) with offline cache.", path: "../tools/live-data-console.html" },
  { id: "deployment-outreach", name: "Deployment Outreach Hub", desc: "50+ UN/EU/NGO/prime contractor targets, authority map, email templates.", path: "../tools/deployment-outreach.html" },
  { id: "business-idea-generator", name: "Business Idea Generator", desc: "Country → gov → people → starter benefit stack for pitches.", path: "../tools/business-idea-generator.html" },
  { id: "usajobs-relocation", name: "USAJOBS Overseas Paths", desc: "Federal careers with PCS, housing, and international relocation.", path: "../tools/usajobs-relocation.html" },
  { id: "ngo-relocation-deal", name: "NGO Relocation Deal Pack", desc: "Free portal deployment in exchange for sponsored relocation — $0 from you.", path: "../tools/ngo-relocation-deal.html" }
];

CIVIC_PORTAL.EUROPE = [
  { slug: "ukraine", name: "Ukraine", flag: "🇺🇦", capital: "Kyiv", region: "Eastern Europe", focus: ["Humanitarian", "Recovery", "Demining", "Digital Gov"], priority: true },
  { slug: "romania", name: "Romania", flag: "🇷🇴", capital: "Bucharest", region: "Southeastern Europe", focus: ["Border Aid", "EU Funds", "Roma Inclusion", "Tech Outsourcing"], priority: true },
  { slug: "russia", name: "Russia", flag: "🇷🇺", capital: "Moscow", region: "Eastern Europe", focus: ["Sanctions Compliance", "Governance Research", "Permitted Aid Corridors"], priority: true, sanctionsOnly: true },
  { slug: "estonia", name: "Estonia", flag: "🇪🇪", capital: "Tallinn", region: "Baltic", focus: ["E-Gov", "Cyber", "Startup Visa", "NATO Support"], priority: true },
  { slug: "finland", name: "Finland", flag: "🇫🇮", capital: "Helsinki", region: "Nordic", focus: ["Arctic Policy", "Education", "Wellbeing", "UN Agencies"], priority: true },
  { slug: "iceland", name: "Iceland", flag: "🇮🇸", capital: "Reykjavik", region: "Nordic", focus: ["Geothermal", "Fisheries", "Gender Equality", "Tourism Recovery"], priority: true },
  { slug: "greenland", name: "Greenland", flag: "🇬🇱", capital: "Nuuk", region: "Arctic", focus: ["Indigenous Governance", "Climate Adaptation", "Remote Logistics"], priority: true },
  { slug: "poland", name: "Poland", flag: "🇵🇱", capital: "Warsaw", region: "Central Europe", focus: ["Refugee Integration", "Manufacturing", "EU Presidency", "Defense Industry"], priority: true },
  { slug: "latvia", name: "Latvia", flag: "🇱🇻", capital: "Riga", region: "Baltic", focus: ["Transit Hub", "Diaspora Return", "Forestry", "NATO Logistics"] },
  { slug: "lithuania", name: "Lithuania", flag: "🇱🇹", capital: "Vilnius", region: "Baltic", focus: ["Fintech", "Belarus Border", "Energy Independence", "Innovation"] },
  { slug: "moldova", name: "Moldova", flag: "🇲🇩", capital: "Chișinău", region: "Eastern Europe", focus: ["EU Accession", "Wine/Agriculture", "Transnistria Aid", "Energy"] },
  { slug: "georgia", name: "Georgia", flag: "🇬🇪", capital: "Tbilisi", region: "Caucasus", focus: ["EU Candidate", "Tourism", "Wine", "IDP Support"] },
  { slug: "czech-republic", name: "Czech Republic", flag: "🇨🇿", capital: "Prague", region: "Central Europe", focus: ["Manufacturing", "Ukraine Support", "V4 Coordination", "Automotive"] },
  { slug: "slovakia", name: "Slovakia", flag: "🇸🇰", capital: "Bratislava", region: "Central Europe", focus: ["Automotive", "Cross-Border Aid", "EU Funds", "Energy"] },
  { slug: "hungary", name: "Hungary", flag: "🇭🇺", capital: "Budapest", region: "Central Europe", focus: ["Transit Aid", "Thermal Health", "Manufacturing", "Diaspora"] },
  { slug: "bulgaria", name: "Bulgaria", flag: "🇧🇬", capital: "Sofia", region: "Southeastern Europe", focus: ["Black Sea Security", "IT Outsourcing", "Roma Programs", "Tourism"] }
];

CIVIC_PORTAL.ASIA = [
  { slug: "china", name: "China", flag: "🇨🇳", capital: "Beijing", region: "East Asia", focus: ["Rural Poverty", "Green Energy", "Public Health", "BRI Logistics"], priority: true },
  { slug: "singapore", name: "Singapore", flag: "🇸🇬", capital: "Singapore", region: "Southeast Asia", focus: ["Smart City", "Multilateral Hub", "Water Tech", "Finance for Impact"], priority: true },
  { slug: "vietnam", name: "Vietnam", flag: "🇻🇳", capital: "Hanoi", region: "Southeast Asia", focus: ["Manufacturing", "Climate Coast", "Agent Orange Legacy", "Startup Ecosystem"], priority: true },
  { slug: "south-korea", name: "South Korea", flag: "🇰🇷", capital: "Seoul", region: "East Asia", focus: ["ODA Programs", "Tech for Good", "Aging Society", "Peace Initiatives"], priority: true },
  { slug: "nepal", name: "Nepal", flag: "🇳🇵", capital: "Kathmandu", region: "South Asia", focus: ["Earthquake Recovery", "Tourism", "Himalayan Climate", "Community Health"], priority: true },
  { slug: "japan", name: "Japan", flag: "🇯🇵", capital: "Tokyo", region: "East Asia", focus: ["JICA Projects", "Disaster Resilience", "Aging Care", "Pacific Islands"] },
  { slug: "taiwan", name: "Taiwan", flag: "🇹🇼", capital: "Taipei", region: "East Asia", focus: ["Semiconductor Ecosystem", "Digital Democracy", "Medical Diplomacy", "Typhoon Prep"] },
  { slug: "thailand", name: "Thailand", flag: "🇹🇭", capital: "Bangkok", region: "Southeast Asia", focus: ["Refugee Camps", "Tourism Recovery", "Public Health", "Mekong Basin"] },
  { slug: "philippines", name: "Philippines", flag: "🇵🇭", capital: "Manila", region: "Southeast Asia", focus: ["Typhoon Response", "Overseas Workers", "Island Logistics", "Health"] },
  { slug: "indonesia", name: "Indonesia", flag: "🇮🇩", capital: "Jakarta", region: "Southeast Asia", focus: ["Archipelago Logistics", "Volcanic Risk", "Islamic Finance for Good", "Palm Transition"] },
  { slug: "malaysia", name: "Malaysia", flag: "🇲🇾", capital: "Kuala Lumpur", region: "Southeast Asia", focus: ["Migrant Worker Rights", "Biodiversity", "Halal Economy", "Urban Poverty"] },
  { slug: "sri-lanka", name: "Sri Lanka", flag: "🇱🇰", capital: "Colombo", region: "South Asia", focus: ["Debt Recovery", "Tea Cooperatives", "Tourism", "Reconciliation"] },
  { slug: "maldives", name: "Maldives", flag: "🇲🇻", capital: "Malé", region: "Indian Ocean", focus: ["Sea Level Rise", "Tourism Diversification", "Fisheries", "Island Health"], island: true },
  { slug: "fiji", name: "Fiji", flag: "🇫🇯", capital: "Suva", region: "Pacific", focus: ["Cyclone Recovery", "Pacific Forum", "Tourism", "Kava Cooperatives"], island: true },
  { slug: "samoa", name: "Samoa", flag: "🇼🇸", capital: "Apia", region: "Pacific", focus: ["Small Island States", "Climate Finance", "Community Fisheries", "Youth"], island: true },
  { slug: "palau", name: "Palau", flag: "🇵🇼", capital: "Ngerulmud", region: "Pacific", focus: ["Marine Protected Areas", "Tourism", "US Compact", "Climate"], island: true }
];

CIVIC_PORTAL.getCountry = function (region, slug) {
  const list = region === "europe" ? CIVIC_PORTAL.EUROPE : CIVIC_PORTAL.ASIA;
  return list.find((c) => c.slug === slug);
};

CIVIC_PORTAL.getModulesForCountry = function (country) {
  if (country.sanctionsOnly) {
    return CIVIC_PORTAL.MODULES.filter((m) =>
      ["sanctions-compliance", "humanitarian-ops", "logistics-supply", "grant-funding"].includes(m.id)
    );
  }
  return CIVIC_PORTAL.MODULES.filter((m) => m.id !== "sanctions-compliance" || country.slug === "russia");
};
