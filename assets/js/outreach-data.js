window.OUTREACH = window.OUTREACH || {};

OUTREACH.PROFILE_KEY = "deployment-profile-v1";

OUTREACH.loadProfile = function () {
  try {
    return JSON.parse(localStorage.getItem(OUTREACH.PROFILE_KEY) || "{}");
  } catch (_) {
    return {};
  }
};

OUTREACH.saveProfile = function (p) {
  localStorage.setItem(OUTREACH.PROFILE_KEY, JSON.stringify(p));
};

OUTREACH.defaultProfile = {
  name: "Andrew Elston",
  email: "andrew.elston.relocation@gmail.com",
  linkedin: "linkedin.com/in/andrew-elston",
  signal: "Signal: +1 660 498 5534",
  phone: "(660) 498-5534",
  phoneRaw: "6604985534",
  address: "204 S Ault St, Moberly, MO 65270",
  city: "Moberly, Missouri, USA",
  portfolioUrl: "hub.html — deploy to Netlify/GitHub Pages and update this link",
  availability: "Immediate — 48–72 hr notice once visa and housing confirmed",
  household: "Andrew Elston + father (dependent) + dog + cat — full relocation package required",
  offer: "Pro-bono or local stipend acceptable in exchange for full sponsored relocation (visa, employer-arranged travel, pet-friendly housing)",
  travelFlex: "Flexible on lawful employer-arranged transport: commercial direct, org charter, UNHAS/manifested humanitarian air, or contractor rotator",
  skillsShort: "4 yrs coding · AI/Stable Diffusion · algo trading · blockchain · web design · 2 yrs agentic AI · 5 yrs business development",
  skillsBlock: `TECHNICAL & PROFESSIONAL BACKGROUND
• 4 years: software development, Stable Diffusion, AI systems, algorithmic trading, cryptocurrencies, blockchain, web design
• 2 years: agentic AI development (offline-capable field agents, automation pipelines)
• 1 year: rapid full-stack delivery (production tools shipped fast)
• 5 years: business development, partnerships, and client acquisition
• Built solo: Civic Portal (32-country gov/NGO dashboards) + Health Portal (free clinic tools worldwide)`,
  builtHighlight: "Sole builder of Civic Portal (32 countries, 480+ dashboard views, offline-capable) and Health Portal (free for underserved clinics, $0 forever).",
  signature: "Andrew Elston\n(660) 498-5534\n204 S Ault St, Moberly, MO 65270\nandrew.elston.relocation@gmail.com"
};

OUTREACH.AUTHORITY_MAP = [
  {
    id: "un-system",
    name: "United Nations System",
    leverage: "High — visa support, duty station housing, DSA, home leave travel",
    reality: "Competitive. UNV fastest for newcomers; P-2/D-1 need years. UNHCR/WFP/UNICEF deploy field staff with relocation.",
    fit: "Strong",
    myth: null
  },
  {
    id: "eu-solidarity",
    name: "EU Solidarity Corps",
    leverage: "Medium — EU-funded volunteer placement, some travel/accommodation covered",
    reality: "Usually ages 18–30; often requires EU citizenship or legal residency. US citizens rarely qualify unless already in EU.",
    fit: "Low for US-based unless eligible",
    myth: null
  },
  {
    id: "eu-institutions",
    name: "EU Institutions (EPSO, Frontex, EACEA)",
    leverage: "Very high — EU staff status, relocation allowance, expat benefits",
    reality: "Long competitive exams (EPSO). Frontex hires operational staff. Timeline: months to years.",
    fit: "Medium-long term"
  },
  {
    id: "usaid-contractors",
    name: "USAID Implementers & Prime Contractors",
    leverage: "High — field deploy, housing, R&R flights to region",
    reality: "Chemonics, DAI, RTI, Palladium hire for 6–24 month field posts. Often require prior development experience.",
    fit: "Strong if you pitch ops/tech"
  },
  {
    id: "private-primes",
    name: "Defense / Infrastructure Primes (KBR, Fluor, Bechtel, Amentum)",
    leverage: "Very high — full expat packages in conflict/post-conflict zones",
    reality: "Iraq, Kuwait, Poland support roles. Often need security clearance or niche trade. Fast once hired.",
    fit: "Strong for logistics/IT/security-adjacent"
  },
  {
    id: "consulting",
    name: "Global Consulting (Accenture, Deloitte, McKinsey Development)",
    leverage: "High word-weight with governments — but hire selectively",
    reality: "Referral from partner can open doors. Cold apply slow. Development practice deploys to client countries.",
    fit: "Medium — need sharp pitch"
  },
  {
    id: "ingo-emergency",
    name: "Emergency INGOs (MSF, IRC, NRC, ICRC)",
    leverage: "High operational credibility — field letter helps NGO network, not automatic gov visa",
    reality: "Fastest legitimate deploy lane for 'any work anywhere.' MSF/NRC often move staff in weeks.",
    fit: "Best immediate bet"
  },
  {
    id: "org-charter",
    name: "Org-Arranged Charter & Humanitarian Air",
    leverage: "High for enrolled staff — not for self-booking",
    reality: "UNHAS, WFP Aviation, ICRC, MSF, and defense primes move authorized staff on chartered/direct flights (sometimes cargo-config aircraft with passenger seats). You must be on payroll/roster first — then org books travel.",
    fit: "Best path to non-commercial flights",
    myth: "You cannot legally hitch cargo flights without employer manifest. Get hired first — travel follows."
  },
  {
    id: "usajobs",
    name: "USAJOBS — Federal Overseas Civilian",
    leverage: "High — PCS, housing allowance, R&R, diplomatic paths",
    reality: "USAID, DOD civilians, Foreign Service, 2210 IT overseas. Slow but real relocation packages. See USAJOBS Relocation tool.",
    fit: "Strong parallel track"
  },
  {
    id: "ngo-deal",
    name: "NGO Free-Tools-for-Relocation Deal",
    leverage: "High if you deliver value first — your Civic + Health Portal",
    reality: "Offer pro-bono dashboard deployment in exchange for visa + housing + travel. Fastest creative path with no cash from you.",
    fit: "Best custom strategy"
  }
];

OUTREACH.TRAVEL_PATHS = [
  {
    mode: "UN Humanitarian Air Service (UNHAS)",
    who: "UN agencies, NGO partners on approved manifests",
    speed: "Fast once on roster",
    notes: "Common in Sudan, Sahel, Afghanistan, disaster zones. WFP manages. Apply via UN/NGO employer — not direct.",
    fit: "Strong"
  },
  {
    mode: "WFP Aviation / Logistics",
    who: "WFP staff and contracted logistics personnel",
    speed: "Medium",
    notes: "Field logistics hires often rotate via organizational air assets or booked charters to duty stations.",
    fit: "Strong"
  },
  {
    mode: "INGO emergency charter",
    who: "MSF, ICRC, NRC surge staff",
    speed: "Fast in emergencies",
    notes: "Emergency deploys sometimes use chartered turboprop/jet to nearest airfield — economy irrelevant, org-paid.",
    fit: "Best bet"
  },
  {
    mode: "Defense contractor rotator flights",
    who: "KBR, Amentum, Fluor employees on active contracts",
    speed: "Fast once cleared/hired",
    notes: "Middle East, CENTCOM support bases — rotator from hub cities, often chartered or gov contract air.",
    fit: "Strong if qualified"
  },
  {
    mode: "Direct commercial (employer-booked)",
    who: "Most UN int'l staff, USAID primes, schools",
    speed: "Medium",
    notes: "Not charter — but direct routes, no layovers, org-paid. Say yes to this equally.",
    fit: "Very common"
  },
  {
    mode: "Medical / security evacuation charter",
    who: "International SOS, employer duty-of-care",
    speed: "Emergency only",
    notes: "Medevac charter if health crisis — not a relocation strategy.",
    fit: "Edge case"
  },
  {
    mode: "Unauthorized cargo travel",
    who: "None — illegal",
    speed: "N/A",
    notes: "Do NOT attempt to fly as stowaway or undocumented on freight aircraft. Criminal, dangerous, no visa path.",
    fit: "Never"
  }
];

OUTREACH.ORGANIZATIONS = [
  { cat: "UN", name: "UN Volunteers (UNV)", country: "Global", url: "https://www.unv.org/become-volunteer", apply: "https://vmam.unv.org/", package: "VLA + travel + DSA", speed: "Fast (weeks–months)", leverage: "UN visa/status", notes: "Best UN entry. Online volunteering + overseas placements." },
  { cat: "UN", name: "UN Careers (All agencies)", country: "Global", url: "https://careers.un.org", apply: "https://careers.un.org/lbw/home.aspx", package: "Full UN contract", speed: "Slow", leverage: "Very high", notes: "P-1/P-2 need experience. G-level admin faster." },
  { cat: "UN", name: "UNHCR Talent Pool", country: "Global", url: "https://www.unhcr.org/careers.html", apply: "https://unhcr.tal.net/vx/appcentre-ext/candidate/so/pm/1/pl/1/ls/1", package: "International staff package", speed: "Medium", leverage: "High", notes: "Refugee ops — Poland, Moldova, Middle East, Asia." },
  { cat: "UN", name: "UNICEF Careers", country: "Global", url: "https://www.unicef.org/careers", apply: "https://jobs.unicef.org/en-us/listing/", package: "UNICEF contract + relocation", speed: "Medium", leverage: "High", notes: "Programme, ops, ICT roles." },
  { cat: "UN", name: "UNHAS — UN Humanitarian Air Service", country: "Global crisis zones", url: "https://www.unhas.org", apply: "Via UN/NGO employer manifest", package: "Org-arranged air + DSA", speed: "Fast once rostered", leverage: "High", notes: "Charter/seat on humanitarian flights — must be staff of participating org. WFP-run." },
  { cat: "UN", name: "WFP Aviation / Logistics", country: "Global", url: "https://www.wfp.org/aviation", apply: "https://career5.successfactors.eu/career?company=WFP", package: "Int'l staff + field air", speed: "Medium", leverage: "High", notes: "Logistics hires — frequent org-booked charter/direct to field hubs." },
  { cat: "UN", name: "WFP Careers (all roles)", country: "Global", url: "https://www.wfp.org/careers", apply: "https://career5.successfactors.eu/career?company=WFP", package: "International hire package", speed: "Medium", leverage: "High", notes: "Programme, IT, logistics — Ukraine, Sahel, Asia." },
  { cat: "UN", name: "UN OCHA", country: "Global", url: "https://www.unocha.org/careers", apply: "https://careers.un.org", package: "UN package", speed: "Medium", leverage: "High", notes: "Humanitarian coordination — field posts." },
  { cat: "UN", name: "IOM — International Organization for Migration", country: "Global", url: "https://www.iom.int/careers", apply: "https://recruitment.iom.int/", package: "IOM staff benefits", speed: "Medium", leverage: "High", notes: "Migration, resettlement, border programmes." },
  { cat: "UN", name: "UNDP Jobs", country: "Global", url: "https://jobs.undp.org", apply: "https://jobs.undp.org/cj_view_jobs.cfm", package: "IC/IPS contracts", speed: "Medium", leverage: "High", notes: "Country office roles worldwide." },
  { cat: "UN", name: "UNOPS Jobs", country: "Global", url: "https://jobs.unops.org", apply: "https://jobs.unops.org/Pages/ViewJob.aspx", package: "LICA/IICA + benefits", speed: "Medium–Fast", leverage: "High", notes: "Project-based — infrastructure, procurement." },
  { cat: "UN", name: "WHO Careers", country: "Global", url: "https://www.who.int/careers", apply: "https://careers.who.int/careersection/ex/jobsearch.ftl", package: "WHO international", speed: "Slow–Medium", leverage: "Very high", notes: "Health emergencies, country offices." },
  { cat: "EU", name: "EU Solidarity Corps", country: "EU", url: "https://youth.europa.eu/solidarity_en", apply: "https://youth.europa.eu/solidarity/young-people_en", package: "Accommodation + travel + allowance", speed: "Medium", leverage: "EU programme", notes: "Check age/nationality eligibility. US citizens usually need EU residency first." },
  { cat: "EU", name: "EPSO (EU Civil Service Exams)", country: "EU", url: "https://epso.europa.eu", apply: "https://epso.europa.eu/en/open-competitions", package: "EU official — full expat", speed: "Very slow", leverage: "Maximum EU weight", notes: "Long game but ultimate EU advocacy credential." },
  { cat: "EU", name: "Frontex", country: "EU", url: "https://frontex.europa.eu/en/careers/", apply: "https://frontex.europa.eu/en/careers/vacancies/", package: "EU agency staff", speed: "Medium", leverage: "High", notes: "Border/coast guard support — Poland, Greece, Mediterranean." },
  { cat: "EU", name: "EACEA (Erasmus+ / EU programmes)", country: "EU", url: "https://www.eacea.ec.europa.eu", apply: "Via implementing orgs", package: "Project-based", speed: "Varies", leverage: "Medium", notes: "Partner with NGOs running EU-funded projects." },
  { cat: "EU", name: "GIZ (Germany — EU bilateral)", country: "Germany/Global", url: "https://www.giz.de/en/html/index.html", apply: "https://jobs.giz.de/", package: "Expat package common", speed: "Medium", leverage: "Very high in EU/dev", notes: "Ukraine, Moldova, Georgia, Asia, Africa." },
  { cat: "EU", name: "Polish Humanitarian Action (PAH)", country: "Poland", url: "https://pah.org.pl/en/", apply: "https://pah.org.pl/en/join-us/", package: "NGO field terms", speed: "Fast", leverage: "Medium", notes: "Ukraine border ops — high volume hiring." },
  { cat: "US Gov", name: "USAJOBS — Overseas Federal (all agencies)", country: "Global", url: "https://www.usajobs.gov", apply: "https://www.usajobs.gov/Search/Results?l=Overseas", package: "PCS + housing + R&R", speed: "Medium–Slow", leverage: "Very high", notes: "Filter Location: Overseas. DOD, USAID, State, 2210 IT, 0343 analyst." },
  { cat: "US Gov", name: "USAID Direct Hire & Fellows", country: "Global", url: "https://www.usaid.gov/careers", apply: "https://www.usaid.gov/work-usaid/careers", package: "Foreign Service civil servant", speed: "Slow", leverage: "Very high", notes: "Development Leadership Initiative, FSN paths abroad." },
  { cat: "US Gov", name: "State Dept Foreign Service", country: "Global", url: "https://www.state.gov/careers", apply: "https://careers.state.gov", package: "Full diplomatic relocation", speed: "Very slow (1+ yr)", leverage: "Maximum", notes: "FSOT exam required. Long game." },
  { cat: "NATO", name: "NATO International Staff", country: "Belgium/Europe", url: "https://www.nato.int/cps/en/natohq/jobs.htm", apply: "https://www.nato.int/cps/en/natohq/jobs.htm", package: "NATO expat package", speed: "Slow–Medium", leverage: "Very high", notes: "Brussels + some field liaison roles." },
  { cat: "INGO", name: "MSF — Médecins Sans Frontières", country: "Global", url: "https://www.msf.org/join-us", apply: "https://www.msf.org/join-us/work-overseas", package: "Field per diem + travel", speed: "Fast", leverage: "High in humanitarian", notes: "Non-medical: logistics, HR, finance, IT. Emergency deploy." },
  { cat: "INGO", name: "IRC — International Rescue Committee", country: "Global", url: "https://www.rescue.org/careers", apply: "https://careers-rescue.icims.com/", package: "Expat package field", speed: "Fast–Medium", leverage: "High", notes: "Ukraine, Poland, US R&P, Middle East." },
  { cat: "INGO", name: "ICRC", country: "Global", url: "https://careers.icrc.org", apply: "https://careers.icrc.org/job-opportunities", package: "Delegate package", speed: "Medium", leverage: "Very high", notes: "Field delegate pipeline — rigorous selection." },
  { cat: "INGO", name: "NRC — Norwegian Refugee Council", country: "Global", url: "https://www.nrc.no/careers", apply: "https://candidate.hr-manager.net/vacancies/list.aspx?customer=nrc", package: "International terms", speed: "Fast", leverage: "High", notes: "Ukraine, Middle East, Africa — frequent hiring." },
  { cat: "INGO", name: "Danish Refugee Council (DRC)", country: "Global", url: "https://drc.ngo/careers", apply: "https://candidate.hr-manager.net/vacancies/list.aspx?customer=drc", package: "International contract", speed: "Fast", leverage: "High", notes: "Large Ukraine/Middle East footprint." },
  { cat: "INGO", name: "Save the Children International", country: "Global", url: "https://www.savethechildren.net/careers", apply: "https://www.savethechildren.net/careers", package: "International hire", speed: "Medium", leverage: "High", notes: "Programme, MEAL, ops roles globally." },
  { cat: "INGO", name: "CARE International", country: "Global", url: "https://www.care-international.org/careers", apply: "https://careers.care.org/", package: "Field contract", speed: "Medium", leverage: "High", notes: "Emergency response roster." },
  { cat: "INGO", name: "Mercy Corps", country: "Global", url: "https://www.mercycorps.org/careers", apply: "https://careers.mercycorps.org/", package: "Expat terms", speed: "Medium", leverage: "High", notes: "Ukraine, Middle East, Asia." },
  { cat: "INGO", name: "Oxfam International", country: "Global", url: "https://www.oxfam.org/en/jobs", apply: "https://jobs.oxfam.org.uk/", package: "Varies", speed: "Medium", leverage: "Medium–High", notes: "Advocacy + field programme roles." },
  { cat: "INGO", name: "HI — Humanity & Inclusion", country: "Global", url: "https://hi.org/en/join-us", apply: "https://hi.org/en/join-us", package: "International", speed: "Medium", leverage: "High", notes: "Ukraine demining/rehabilitation." },
  { cat: "Private", name: "Chemonics International", country: "Global", url: "https://chemonics.com/careers/", apply: "https://chemonics.com/careers/current-openings/", package: "Full expat field", speed: "Medium", leverage: "High USAID", notes: "USAID prime — rapid field scaling." },
  { cat: "Private", name: "DAI Global", country: "Global", url: "https://www.dai.com/careers", apply: "https://jobs.dai.com/", package: "Expat package", speed: "Medium", leverage: "High", notes: "Governance, economic growth projects." },
  { cat: "Private", name: "RTI International", country: "Global", url: "https://www.rti.org/careers", apply: "https://rti.wd1.myworkdayjobs.com/RTI", package: "Field deploy", speed: "Medium", leverage: "High", notes: "USAID, health, governance." },
  { cat: "Private", name: "KBR — Government Solutions", country: "Global", url: "https://www.kbr.com/en/careers", apply: "https://jobs.kbr.com/", package: "Full expat + danger pay", speed: "Fast once cleared", leverage: "Very high", notes: "Base ops, logistics — Middle East, Europe support." },
  { cat: "Private", name: "Fluor Corporation", country: "Global", url: "https://www.fluor.com/careers", apply: "https://jobs.fluor.com/", package: "Expat rotation", speed: "Medium", leverage: "High", notes: "Infrastructure, energy, government contracts." },
  { cat: "Private", name: "Bechtel", country: "Global", url: "https://www.bechtel.com/careers/", apply: "https://jobs.bechtel.com/", package: "Full expat", speed: "Medium", leverage: "Very high", notes: "Mega-projects — Middle East, Asia, mining." },
  { cat: "Private", name: "Amentum (formerly PAE)", country: "Global", url: "https://www.amentum.com/careers/", apply: "https://jobs.amentum.com/", package: "Expat + housing", speed: "Medium–Fast", leverage: "Very high", notes: "US gov contract support worldwide." },
  { cat: "Private", name: "Accenture Development Partnerships", country: "Global", url: "https://www.accenture.com/us-en/careers", apply: "https://www.accenture.com/us-en/careers/jobsearch", package: "Consulting deploy", speed: "Slow–Medium", leverage: "Very high corporate", notes: "Word carries weight with gov clients." },
  { cat: "Private", name: "Deloitte — GPS / Humanitarian", country: "Global", url: "https://apply.deloitte.com", apply: "https://apply.deloitte.com", package: "Consulting secondment", speed: "Slow", leverage: "Very high", notes: "Government & public services practice." },
  { cat: "Private", name: "Palantir", country: "Global", url: "https://www.palantir.com/careers/", apply: "https://jobs.lever.co/palantir", package: "Tech expat", speed: "Medium", leverage: "High gov/intel", notes: "Controversial but connected. Forward Deployed roles." },
  { cat: "Private", name: "International SOS", country: "Global", url: "https://www.internationalsos.com/careers", apply: "https://careers.internationalsos.com/", package: "Medical/security deploy", speed: "Medium", leverage: "High", notes: "Medical, security, evacuation services for corps/gov." },
  { cat: "Private", name: "Control Risks", country: "Global", url: "https://www.controlrisks.com/careers", apply: "https://www.controlrisks.com/careers", package: "Consulting travel", speed: "Medium", leverage: "High", notes: "Risk consulting — corporate/gov clients." },
  { cat: "Private", name: "ISS — International Schools", country: "Global", url: "https://www.iss.edu/services/recruitment/", apply: "https://www.iss.edu/services/recruitment/", package: "Housing + visa + flights", speed: "Medium (annual cycle)", leverage: "Medium", notes: "Teaching/admin — Asia, Europe, Middle East schools." },
  { cat: "Asia", name: "KOICA — Korea International Cooperation", country: "South Korea", url: "https://www.koica.go.kr", apply: "https://koica.or.kr/en/sub/cs_volunteer/index.do", package: "Volunteer + placement", speed: "Medium", leverage: "High ROK gov", notes: "KOICA WFK volunteer programs." },
  { cat: "Asia", name: "JICA — Japan International Cooperation", country: "Japan", url: "https://www.jica.go.jp/english/", apply: "https://www.jica.go.jp/english/our_work/types_of_cooperation/career/index.html", package: "JICA expert/volunteer", speed: "Medium", leverage: "Very high Japan gov", notes: "Senior Volunteer, Expert positions." },
  { cat: "Asia", name: "EPIK — English in Korea", country: "South Korea", url: "https://www.epik.go.kr", apply: "Via provincial offices", package: "Visa + housing + flight", speed: "Medium (6 mo cycle)", leverage: "Medium", notes: "Requires bachelor's degree. Flights reimbursed." },
  { cat: "Asia", name: "JET Programme — Japan", country: "Japan", url: "https://jetprogramme.org", apply: "https://jetprogramme.org/en/application/", package: "Flight + visa + salary", speed: "Annual cycle", leverage: "High", notes: "ALT/CIR roles — Oct start." },
  { cat: "EU Visa", name: "Startup Estonia / e-Residency ecosystem", country: "Estonia", url: "https://startupestonia.ee", apply: "https://startupestonia.ee/visa/", package: "Startup visa path", speed: "Medium (2–4 mo)", leverage: "Medium EU", notes: "Need startup sponsor or qualifying company." },
  { cat: "EU Visa", name: "Poland Work Permit — NGO route", country: "Poland", url: "https://www.gov.pl/web/diplomacy", apply: "Via employer", package: "Employer-sponsored", speed: "Medium", leverage: "Medium", notes: "NGO employment = work permit sponsor." },
  { cat: "Platform", name: "Devex — Development Jobs", country: "Global", url: "https://www.devex.com/jobs", apply: "https://www.devex.com/jobs", package: "Varies", speed: "Aggregator", leverage: "Discovery", notes: "Filter: relocation, visa sponsorship, housing." },
  { cat: "Platform", name: "Idealist.org", country: "Global", url: "https://www.idealist.org", apply: "https://www.idealist.org/en/jobs", package: "Varies", speed: "Aggregator", leverage: "Discovery", notes: "NGO/nonprofit jobs with mission focus." },
  { cat: "Platform", name: "ReliefWeb Jobs", country: "Global", url: "https://reliefweb.int/jobs", apply: "https://reliefweb.int/jobs", package: "Varies", speed: "Aggregator", leverage: "Discovery", notes: "Humanitarian emergency jobs — check daily." }
];

OUTREACH.getByCategory = function (cat) {
  if (!cat || cat === "all") return OUTREACH.ORGANIZATIONS;
  return OUTREACH.ORGANIZATIONS.filter((o) => o.cat === cat);
};

OUTREACH.CATEGORIES = ["all", "UN", "EU", "US Gov", "NATO", "INGO", "Private", "Asia", "EU Visa", "Platform", "Charter"];
