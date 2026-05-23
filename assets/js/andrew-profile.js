/**
 * Andrew Elston — unified profile for all portal tools and email templates.
 */
window.ANDREW_PROFILE = {
  name: "Andrew Elston",
  email: "andrew.elston.relocation@gmail.com",
  phone: "(660) 498-5534",
  phoneRaw: "6604985534",
  address: "204 S Ault St, Moberly, MO 65270",
  city: "Moberly, Missouri, USA",
  linkedin: "linkedin.com/in/andrew-elston",
  signal: "Signal: +1 660 498 5534",
  portfolioUrl: "file:///projects/dashboards/hub.html",
  household: "Andrew Elston + father (dependent) + dog + cat — full relocation package required",
  availability: "Immediate — 48–72 hr notice once visa and housing confirmed",
  offer: "Pro-bono or local stipend acceptable in exchange for full sponsored relocation (visa, employer-arranged travel, pet-friendly housing)",
  travelFlex: "Flexible on lawful employer-arranged transport: commercial direct, org charter, UNHAS/manifested humanitarian air, or contractor rotator — not requiring luxury travel",
  skillsShort: "4 yrs coding · AI/Stable Diffusion · algo trading · blockchain · web design · 2 yrs agentic AI · 5 yrs business development",
  skillsBlock: `TECHNICAL & PROFESSIONAL BACKGROUND
• 4 years: software development, Stable Diffusion, AI systems, algorithmic trading, cryptocurrencies, blockchain, web design
• 2 years: agentic AI development (offline-capable field agents, automation pipelines)
• 1 year: rapid full-stack delivery ("vibe coding" — ship production tools fast)
• 5 years: business development, partnerships, and client acquisition
• Built solo: Civic Portal (32-country gov/NGO dashboards) + Health Portal (free clinic tools, $0 forever)`,
  builtHighlight: "Sole builder of Civic Portal (32 countries, 480+ dashboard views, offline-capable) and Health Portal (free for underserved clinics worldwide).",
  signature: `Andrew Elston
(660) 498-5534
204 S Ault St, Moberly, MO 65270
andrew.elston.relocation@gmail.com`
};

if (window.OUTREACH) {
  OUTREACH.defaultProfile = { ...OUTREACH.defaultProfile, ...ANDREW_PROFILE };
}
