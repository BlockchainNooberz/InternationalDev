/**
 * Per-country dashboard enrichment: stats, features, uses, insights.
 */
window.COUNTRY_ENRICHMENT = window.COUNTRY_ENRICHMENT || {};

const MODULE_META = {
  "humanitarian-ops": {
    uses: ["Crisis coordination", "Aid distribution tracking", "Cluster reporting", "Donor sitreps"],
    features: ["Real-time beneficiary counts", "Warehouse sync", "Partner handoff log", "Offline mode"],
    insights: ["Align with OCHA 15-cluster structure", "Pre-position supplies before peak season"]
  },
  "refugee-resettlement": {
    uses: ["Intake registration", "Housing matching", "Legal referral queue", "Integration milestones"],
    features: ["Vulnerability tagging", "Family reunification tracker", "Language class slots", "Employer matching"],
    insights: ["Gender-disaggregated data required by most donors", "Track wait times by nationality"]
  },
  "ngo-volunteer": {
    uses: ["Shift scheduling", "Skills registry", "Safety checklists", "Deployment roster"],
    features: ["Credential verification flags", "Coverage gap alerts", "Volunteer hour export", "Multi-site view"],
    insights: ["Surge volunteers need 24hr onboarding path", "Track burnout via consecutive days"]
  },
  "community-dev": {
    uses: ["Local project pipeline", "Participatory budgeting view", "Community feedback", "Impact indicators"],
    features: ["Ward/parish breakdown", "Beneficiary satisfaction", "Micro-grant tracker", "Photo evidence log"],
    insights: ["Co-design with local councils increases uptake", "Link projects to SDG targets for grants"]
  },
  "business-ecosystem": {
    uses: ["SME registry", "Incubator pipeline", "Export readiness", "Co-op formation support"],
    features: ["Sector heat map", "Jobs created counter", "Access-to-finance queue", "Market linkage board"],
    insights: ["Export-oriented SMEs need logistics dashboard integration", "Track women-owned business share"]
  },
  "digital-gov": {
    uses: ["E-service uptime", "Citizen request queue", "Inter-agency data share", "Open data portal metrics"],
    features: ["Service level agreements", "Digital literacy outreach", "API adoption stats", "Fraud flag queue"],
    insights: ["Mobile-first metrics matter in low-connectivity regions", "Cross-border interoperability for EU candidates"]
  },
  "climate-resilience": {
    uses: ["Risk zone mapping", "Early warning triggers", "Adaptation project tracker", "Carbon/co-benefit log"],
    features: ["Flood/drought indices", "Infrastructure vulnerability", "Community drill schedule", "Green finance pipeline"],
    insights: ["Island nations prioritize sea-level and cyclone modules", "Link climate data to agricultural yields"]
  },
  "health-welfare": {
    uses: ["Clinic load monitoring", "Outbreak signals", "Social protection caseload", "Mental health referrals"],
    features: ["Wait time equity", "Cold chain status", "CHW mobile sync", "Donor health indicators"],
    insights: ["Integrate with free Health Portal for underserved clinics", "Track <5 mortality proxies"]
  },
  "relocation-sponsorship": {
    uses: ["Employer sponsor CRM", "Visa pathway tracker", "Housing + pet import checklist", "Duty station readiness"],
    features: ["Household composition filter", "Sponsor pipeline stages", "Document expiry alerts", "NGO deal templates"],
    insights: ["Lead with pro-bono value exchange for fastest sponsor response", "EU routes simplest for pets"]
  },
  "logistics-supply": {
    uses: ["Route planning", "Stock levels", "Customs delay log", "Last-mile delivery"],
    features: ["FEFO expiry tracking", "Fleet status", "Border wait times", "UNHAS manifest prep"],
    insights: ["Pre-clearance saves 48–72 hrs at busy borders", "Sync with WFP LMIS where applicable"]
  },
  "sanctions-compliance": {
    uses: ["OFAC/EU screening", "Humanitarian exemption docs", "Audit trail", "Partner due diligence"],
    features: ["Case ID workflow", "Hold/review/clear states", "End-user certificates", "Legal escalation flag"],
    insights: ["Reference only — not operational inside restricted zones", "Document all permitted corridors"]
  },
  "grant-funding": {
    uses: ["Open call tracker", "Proposal pipeline", "Match funding calculator", "Reporting deadlines"],
    features: ["Donor calendar", "Indicator mapping", "Co-financing gaps", "Success rate history"],
    insights: ["EU tranches often rolling — monitor NEAR and EEA windows", "Align narrative to gov priority sectors"]
  },
  "education-youth": {
    uses: ["School readiness", "Out-of-school children map", "Teacher deployment", "Vocational placement"],
    features: ["Exam cycle tracker", "Scholarship queue", "Youth volunteer hours", "Curriculum localization"],
    insights: ["Refugee children need parallel accreditation tracking", "Digital skills boost employability"]
  },
  "disaster-preparedness": {
    uses: ["Drill schedule", "Shelter capacity", "Evacuation routes", "Relief pre-positioning"],
    features: ["Multi-hazard view", "Early warning feed", "Volunteer mobilization", "Damage assessment form"],
    insights: ["Typhoon/cyclone seasons need 72hr activation playbooks", "Cross-border disaster agreements matter"]
  },
  "rural-livelihood": {
    uses: ["Co-op registry", "Crop calendar", "Market price board", "Extension worker routes"],
    features: ["Seasonal labor map", "Irrigation status", "Microcredit pipeline", "Fair trade linkage"],
    insights: ["Smallholder data unlocks FAO and IFAD funding", "Women's cooperatives often highest ROI"]
  }
};

const PROFILES = {
  ukraine: { pop: "37M", gdp: "Recovery economy", hdi: "High human capital pre-war", priority: "Critical", relocScore: 72, donors: ["EU Facility", "USAID", "World Bank", "UN OCHA"], insight: "Highest NGO hiring volume in Europe for ops/tech roles with relocation potential." },
  poland: { pop: "38M", gdp: "$688B", hdi: "Very High", priority: "High", relocScore: 88, donors: ["EU funds", "UNHCR", "Polish MFA"], insight: "Best EU pet-import + refugee-integration employer density near Warsaw/Kraków." },
  estonia: { pop: "1.3M", gdp: "$41B", hdi: "Very High", priority: "High", relocScore: 90, donors: ["EU", "Estonian e-Residency", "NATO"], insight: "Startup visa and digital gov ecosystem — fast EU foothold." },
  romania: { pop: "19M", gdp: "$350B", hdi: "High", priority: "High", relocScore: 85, donors: ["EU", "UNHCR border", "GIZ"], insight: "Lower cost base, high NGO activity on Moldova/Ukraine corridors." },
  china: { pop: "1.4B", gdp: "$17T+", hdi: "High", priority: "Medium", relocScore: 45, donors: ["BRI partners", "Provincial gov", "UN agencies"], insight: "Work visa requires employer sponsor; rural health and green energy NGOs active." },
  nepal: { pop: "30M", gdp: "$41B", hdi: "Medium", priority: "High", relocScore: 78, donors: ["USAID", "DFID/FCDO", "UN", "KOICA"], insight: "INGO field posts common; lower bar for volunteer-to-staff pipeline." },
  "south-korea": { pop: "52M", gdp: "$1.7T", hdi: "Very High", priority: "Medium", relocScore: 55, donors: ["KOICA", "JICA partners", "UN"], insight: "E-7 visa via employer; EPIK/JET parallel paths for teaching." },
  singapore: { pop: "5.9M", gdp: "$397B", hdi: "Very High", priority: "Medium", relocScore: 50, donors: ["Multilateral HQs", "Temasek ecosystem"], insight: "Employment Pass requires salary threshold; IPC/nonprofit sector smaller." },
  finland: { pop: "5.5M", gdp: "$297B", hdi: "Very High", priority: "High", relocScore: 82, donors: ["EU", "Nordic Council", "UN"], insight: "Specialist residence permit + strong welfare integration if hired." },
  georgia: { pop: "3.7M", gdp: "$25B", hdi: "High", priority: "High", relocScore: 80, donors: ["EU candidate funds", "USAID", "UN"], insight: "Growing Tbilisi NGO hub; lower living costs than Western EU." },
  moldova: { pop: "2.6M", gdp: "$16B", hdi: "Medium", priority: "High", relocScore: 83, donors: ["EU accession", "UN", "Romanian cross-border"], insight: "Small country — faster personal networks; EU trajectory." },
  japan: { pop: "125M", gdp: "$4.2T", hdi: "Very High", priority: "Medium", relocScore: 52, donors: ["JICA", "MOFA", "UN"], insight: "JET/KOICA-style structured programs; strict pet quarantine." },
  vietnam: { pop: "99M", gdp: "$433B", hdi: "Medium", priority: "Medium", relocScore: 60, donors: ["EU GSP", "World Bank", "JICA"], insight: "Manufacturing FDI hires expats; NGO sector in Hanoi/HCMC." },
  latvia: { pop: "1.8M", gdp: "$41B", hdi: "Very High", priority: "Medium", relocScore: 76, donors: ["EU", "NATO"], insight: "Riga transit hub — logistics and NATO support roles." },
  lithuania: { pop: "2.8M", gdp: "$77B", hdi: "Very High", priority: "Medium", relocScore: 79, donors: ["EU", "NATO", "Fintech sandbox"], insight: "Vilnius tech scene + Belarus border NGO activity." },
  iceland: { pop: "380K", gdp: "$28B", hdi: "Very High", priority: "Medium", relocScore: 70, donors: ["Nordic Council", "EU"], insight: "Small population — niche roles; strict pet quarantine." },
  greenland: { pop: "57K", gdp: "Autonomy (Denmark)", hdi: "High", priority: "Low", relocScore: 62, donors: ["Denmark", "Arctic Council"], insight: "Remote posts via Danish/Greenlandic gov and research stations." },
  "czech-republic": { pop: "10.5M", gdp: "$330B", hdi: "Very High", priority: "Medium", relocScore: 74, donors: ["EU", "V4 funds"], insight: "Prague NGO and automotive sector; Ukraine support coordination." },
  slovakia: { pop: "5.4M", gdp: "$127B", hdi: "Very High", priority: "Medium", relocScore: 73, donors: ["EU", "V4"], insight: "Bratislava cross-border aid to Ukraine." },
  hungary: { pop: "9.6M", gdp: "$212B", hdi: "Very High", priority: "Medium", relocScore: 68, donors: ["EU"], insight: "Transit country — verify NGO political climate before targeting." },
  bulgaria: { pop: "6.8M", gdp: "$103B", hdi: "High", priority: "Medium", relocScore: 72, donors: ["EU", "Black Sea programs"], insight: "Lower cost EU base; IT outsourcing and Roma inclusion NGOs." },
  taiwan: { pop: "23M", gdp: "$790B", hdi: "Very High", priority: "Medium", relocScore: 48, donors: ["MOFA", "Tech sector"], insight: "Employer-sponsored APRC/ARC paths; strong semiconductor ecosystem." },
  thailand: { pop: "71M", gdp: "$495B", hdi: "High", priority: "Medium", relocScore: 58, donors: ["UNHCR camps", "Tourism recovery"], insight: "Bangkok NGO hub; refugee camp ops on borders." },
  philippines: { pop: "115M", gdp: "$440B", hdi: "Medium", priority: "Medium", relocScore: 56, donors: ["USAID", "ADB", "UN"], insight: "Typhoon response hiring; island logistics complexity." },
  indonesia: { pop: "275M", gdp: "$1.3T", hdi: "Medium", priority: "Medium", relocScore: 54, donors: ["World Bank", "JICA", "EU"], insight: "Archipelago logistics — field roles need multi-island travel." },
  malaysia: { pop: "33M", gdp: "$430B", hdi: "Very High", priority: "Medium", relocScore: 52, donors: ["UNHCR", "Islamic finance dev"], insight: "KL NGO scene; EP for employment pass roles." },
  "sri-lanka": { pop: "22M", gdp: "$84B", hdi: "High", priority: "Medium", relocScore: 65, donors: ["IMF recovery", "EU GSP+"], insight: "Post-debt recovery — tea coops and tourism NGOs." },
  maldives: { pop: "520K", gdp: "$6B", hdi: "High", priority: "Medium", relocScore: 60, donors: ["Climate finance", "Tourism"], insight: "Island health posts — Health Portal fits directly." },
  fiji: { pop: "930K", gdp: "$5B", hdi: "High", priority: "Medium", relocScore: 58, donors: ["Pacific Forum", "Australia"], insight: "Cyclone season surge roles; small island state experience valued." },
  samoa: { pop: "200K", gdp: "$900M", hdi: "High", priority: "Low", relocScore: 55, donors: ["Climate finance", "NZ/Aus"], insight: "Compact island ops — limited slots but less competition." },
  palau: { pop: "18K", gdp: "$300M", hdi: "High", priority: "Low", relocScore: 50, donors: ["US Compact", "Marine protection"], insight: "US Compact state — unique visa dynamics for Americans." },
  russia: { pop: "144M", gdp: "Sanctioned", hdi: "High", priority: "Compliance only", relocScore: 5, donors: ["Permitted humanitarian only"], insight: "Sanctions desk only — not a relocation target for US persons." }
};

function defaultProfile(country) {
  return {
    pop: "See live data",
    gdp: "Emerging / mixed",
    hdi: "Country-specific",
    priority: country.priority ? "High" : "Standard",
    relocScore: country.priority ? 70 : 55,
    donors: ["UN", "Bilateral donors", "EU where applicable"],
    insight: `Focus sectors: ${country.focus.join(", ")}. Use ${country.capital} as operational hub.`
  };
}

COUNTRY_ENRICHMENT.get = function (country, module) {
  const p = PROFILES[country.slug] || defaultProfile(country);
  const meta = MODULE_META[module.id] || MODULE_META["humanitarian-ops"];
  const rnd = country.slug.length + module.id.length;

  return {
    overview: {
      population: p.pop,
      economicContext: p.gdp,
      developmentIndex: p.hdi,
      humanitarianPriority: p.priority,
      relocationViability: p.relocScore + "/100",
      capital: country.capital,
      region: country.region,
      focusSectors: country.focus
    },
    uses: meta.uses.map((u, i) => ({ text: u, priority: i < 2 ? "Primary" : "Secondary" })),
    features: meta.features,
    insights: [p.insight, ...meta.insights],
    keyPartners: p.donors,
    kpis: buildModuleKpis(module, country),
    businessHook: `Business ideas for ${country.name} → tools/business-idea-generator.html?country=${country.slug}&region=${CIVIC_PORTAL.EUROPE.find(c=>c.slug===country.slug)?"europe":"asia"}`,
    relocNote: module.id === "relocation-sponsorship"
      ? `Andrew Elston (${p.relocScore}/100 viability): offer free portal deployment via hub.html in exchange for visa + travel + pet-friendly housing.`
      : null
  };
};

function buildModuleKpis(module, country) {
  const base = country.slug.length * 3 + module.id.length;
  const map = {
    "humanitarian-ops": ["Daily aid deliveries", "Active field sites", "Cluster meetings/wk", "Stock-out incidents"],
    "pharmacy-supply": ["SKUs tracked", "Below-min alerts", "Expiring in 30d", "Reorder pending"],
    "relocation-sponsorship": ["Sponsor leads", "Visa pathways open", "Pet-friendly listings", "Days to deploy"],
    "business-ecosystem": ["SMEs registered", "Jobs created YTD", "Export-ready firms", "Incubator cohort"],
    "digital-gov": ["E-services live", "Citizen requests/day", "API integrations", "Uptime %"]
  };
  const labels = map[module.id] || ["Programs tracked", "Active partners", "Monthly reports", "Field sites"];
  return labels.map((label, i) => ({ label, value: String(base + i * 7 + (country.priority ? 20 : 5)) }));
}
