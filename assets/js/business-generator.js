window.BUSINESS_GENERATOR = window.BUSINESS_GENERATOR || {};

BUSINESS_GENERATOR.IDEAS = {
  "digital-gov": {
    title: "Offline-first civic service kiosk network",
    country: "Extends e-gov reach to rural and low-connectivity areas without new datacenter spend.",
    gov: "Higher service delivery scores, EU digital readiness metrics, reduced walk-in queue pressure.",
    people: "Shorter waits for IDs, benefits, permits; access in native language.",
    starter: "SaaS + deployment contracts to municipalities; maintenance retainers; grant-funded rollouts.",
    between: "Local telcos provide connectivity; NGOs train users; EU pays implementation grants; municipal staff operate kiosks."
  },
  "health-welfare": {
    title: "Free clinic ops platform (Health Portal model)",
    country: "Better health coverage metrics; fewer stock-outs reported nationally.",
    gov: "Donor-reportable indicators without hiring large IT teams; epidemic signal visibility.",
    people: "Shorter clinic waits, reliable vaccine fridges, fairer queueing in underserved zones.",
    starter: "Funded by NGO/gov contracts to customize and host; zero cost to clinics builds goodwill and referrals.",
    between: "Clinics get free tools; donors fund customization; logistics firms supply cold chain; CHWs enter data offline."
  },
  "climate-resilience": {
    title: "Community early-warning + micro-insurance bundle",
    country: "Reduced disaster losses; climate finance eligibility; SDG reporting.",
    gov: "Civil defense drill compliance; satellite/weather API integration; donor co-financing.",
    people: "SMS/voice alerts; faster evacuation; post-disaster cash transfers.",
    starter: "Premium from cooperatives; gov disaster grants; NGO implementation fees.",
    between: "Farmers join coops; insurers reinsure; NGOs verify claims; gov subsidizes premiums for poor households."
  },
  "refugee-resettlement": {
    title: "Integration employer matching platform",
    country: "Faster refugee employment = lower social spend; demographic/workforce fill.",
    gov: "EU migration fund reporting; integration KPIs; tax base growth.",
    people: "Dignified work; language on-the-job; housing stability.",
    starter: "B2G contracts with municipalities; employer placement fees (ethical cap); training partners.",
    between: "Employers get vetted workers; NGOs certify skills; landlords get referral pipeline; language schools get students."
  },
  "business-ecosystem": {
    title: "Export-ready SME compliance dashboard",
    country: "More export revenue; trade balance improvement; EU single market access for candidates.",
    gov: "Customs modernization; SME formalization; anti-corruption transparency.",
    people: "Stable factory/co-op jobs; skills upgrade; rural income.",
    starter: "Per-SME subscription; chamber of commerce bulk licenses; USAID/EU implementation grants.",
    between: "Banks lend against export orders; customs clears faster; freight forwarders integrate API; mentors from diaspora."
  },
  "logistics-supply": {
    title: "Humanitarian last-mile routing co-op",
    country: "Aid reaches remote areas faster; less spoilage; better donor confidence.",
    gov: "National disaster stock visibility; border delay analytics.",
    people: "Relief arrives before critical window closes; local drivers earn income.",
    starter: "NGO/UN contract fees; % of saved logistics cost shared; fleet leasing.",
    between: "Drivers join co-op; warehouses rent space; UN books manifests; local gov clears road access."
  },
  "education-youth": {
    title: "Vocational skills + job pipeline for youth",
    country: "Youth unemployment down; brain drain slowed; innovation pipeline.",
    gov: "EU accession human capital criteria; school completion rates up.",
    people: "Paid apprenticeships; digital literacy; entrepreneurship paths.",
    starter: "Corporate CSR sponsors cohorts; gov pays outcome bonuses; ed-tech licensing.",
    between: "Schools provide space; companies hire grads; NGOs mentor; donors fund equipment."
  },
  "rural-livelihood": {
    title: "Farmer co-op market linkage platform",
    country: "Rural poverty reduction; food security; export quality up.",
    gov: "Agricultural ministry data; EU CAP-aligned reporting where applicable.",
    people: "Fair prices; reduced middleman loss; seasonal cash flow.",
    starter: "Transaction fee on verified sales; donor-funded pilot; input supplier ads (ethical).",
    between: "Coops aggregate supply; buyers commit forward contracts; microfinance covers inputs; extension agents verify quality."
  }
};

BUSINESS_GENERATOR.generate = function (country, sector) {
  if (sector) {
    return formatIdea(country, BUSINESS_GENERATOR.IDEAS[sector] || BUSINESS_GENERATOR.IDEAS["health-welfare"], sector);
  }
  let key = "health-welfare";
  const f = country.focus.join(" ").toLowerCase();
  if (/digital|e-gov|cyber|fintech/.test(f)) key = "digital-gov";
  else if (/refugee|border|idp|transnistria/.test(f)) key = "refugee-resettlement";
  else if (/climate|arctic|sea level|cyclone|typhoon|geothermal/.test(f)) key = "climate-resilience";
  else if (/business|manufactur|tech|automotive|startup|semiconductor/.test(f)) key = "business-ecosystem";
  else if (/logistics|transit|archipelago|shipping|nat/.test(f)) key = "logistics-supply";
  else if (/education|youth|aging/.test(f)) key = "education-youth";
  else if (/agri|wine|tea|fisher|forestry|palm|rural/.test(f)) key = "rural-livelihood";
  return formatIdea(country, BUSINESS_GENERATOR.IDEAS[key], key);
};

function formatIdea(country, base, sector) {
  return {
    title: base.title + " — " + country.name,
    country: base.country,
    gov: base.gov,
    people: base.people,
    starter: base.starter,
    between: base.between,
    sector: sector,
    relocNote: country.priority
      ? `Pitch this free to NGOs/gov in ${country.name} in exchange for sponsored relocation — high viability for ops roles.`
      : `Offer pro-bono customization to implementing partners in ${country.capital} for visa sponsorship path.`
  };
}

BUSINESS_GENERATOR.allCountries = function () {
  return [...CIVIC_PORTAL.EUROPE, ...CIVIC_PORTAL.ASIA].filter(c => !c.sanctionsOnly);
};
