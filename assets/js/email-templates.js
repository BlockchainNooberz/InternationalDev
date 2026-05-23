window.OUTREACH_TEMPLATES = {
  coldEmail: {
    subject: "Andrew Elston — immediate deploy, pro-bono civic tech — full relocation (household + pets)",
    body: `Dear {{org}} Recruitment Team,

My name is Andrew Elston. I am offering immediate deployment to any field or country office — pro-bono or local stipend acceptable in exchange for a full sponsored relocation package.

{{skillsBlock}}

WHAT I BRING TO {{org}}
• Custom Civic Portal + Health Portal deployment for your priority countries ($0 cost to you)
• Offline field dashboards, clinic ops tools, grant reporting, logistics coordination
• Agentic AI assistants for low-connectivity humanitarian zones
• {{builtHighlight}}

WHAT I NEED
• Visa/work permit sponsorship + pet-friendly housing + employer-arranged travel for: {{household}}
• Timeline: {{availability}}
• Travel: {{travelFlex}}

I can mobilize on 48–72 hours' notice once paperwork is confirmed. Portfolio and PDF brief available on request.

Thank you for considering an urgent roster addition.

{{signature}}`
  },

  followUp7: {
    subject: "Follow-up — Andrew Elston / immediate deployment + free portal deployment ({{org}})",
    body: `Dear {{org}} Team,

Following up on my outreach from {{lastContactDate}}.

I remain immediately available for field, HQ, IT, logistics, or volunteer coordination roles with sponsored relocation for {{household}}.

Reminder: I will customize Civic Portal and Health Portal for {{org}} at no cost as part of a relocation arrangement.

{{skillsShort}}

Portfolio: {{portfolioUrl}}

Best regards,
{{signature}}`
  },

  followUp14: {
    subject: "Second follow-up — surge roster / Andrew Elston ({{org}})",
    body: `Dear {{org}} Team,

Brief second follow-up — still available for immediate deployment with full relocation support (visa, travel, pet-friendly housing) for {{household}}.

Happy to join a surge roster or be referred to an implementing partner. 30-minute demo of country dashboards available.

{{name}} | {{phone}} | {{email}}`
  },

  unvSpecific: {
    subject: "UNV — Andrew Elston — on-site assignment + household relocation (VMAM registered)",
    body: `Dear UNV Recruitment,

I am Andrew Elston (US citizen, Moberly MO), registering on VMAM and seeking an on-site UN Volunteer assignment — not online-only.

{{skillsBlock}}

Seeking: overseas placement with VLA/DSA covering visa, duty station housing, and employer-arranged travel for {{household}}.

Relevant deliverable: operational dashboards and offline tools for UN country offices and partner clinics — already built and deployable.

Availability: {{availability}}
Portfolio: {{portfolioUrl}}

{{signature}}`
  },

  euSolidarity: {
    subject: "EU Solidarity Corps eligibility — US citizen, immediate availability — Andrew Elston",
    body: `Dear EU Solidarity Corps Team,

I am Andrew Elston, a US citizen based in Missouri, inquiring about on-site placement eligibility via a partner NGO sponsor.

Background: civic tech, agentic AI, humanitarian dashboards (32 countries). Available immediately.

Please advise eligible routes for non-EU nationals with partner organization sponsorship.

{{signature}}`
  },

  contractorPrime: {
    subject: "Andrew Elston — field IT/ops deploy — expat package inquiry ({{org}})",
    body: `Dear {{org}} Talent Acquisition,

I am applying for immediate field deployment (logistics, ops coordination, IT specialist, admin).

{{skillsBlock}}

Open to: {{offer}}
Relocation required: {{household}} — {{address}}
Travel: {{travelFlex}}

Prior experience includes algorithmic systems, blockchain infrastructure, and 5 years business development — applicable to contract logistics and donor reporting environments.

Please advise roles with expat package, rotator flights, or surge roster.

{{signature}}
Portfolio: {{portfolioUrl}}`
  },

  charterDeploy: {
    subject: "Immediate surge deploy — Andrew Elston — flexible org-arranged travel ({{org}})",
    body: `Dear {{org}} Team,

Andrew Elston here — available for immediate field deployment. Flexible on travel: commercial direct, org charter, UNHAS/manifested air, or contractor rotator.

Not requesting luxury travel — only lawful employer-arranged transport as part of relocation for {{household}}.

{{skillsShort}}
{{builtHighlight}}

Compensation: {{offer}}
Availability: {{availability}}

{{signature}}`
  },

  ngoDeal: {
    subject: "Andrew Elston — free Civic + Health Portal forever ↔ sponsored relocation — {{org}}",
    body: `Dear {{org}} Leadership,

I am Andrew Elston. I will deploy and maintain Civic Portal + Health Portal for {{org}} at NO COST — permanently free for your field offices and partner clinics.

YOU GET ($0 TO YOU)
• 32-country operational dashboards customized to your programmes
• Free clinic tools (patient flow, pharmacy, referrals, donor reports)
• Offline agentic AI for field zones without reliable internet
• 90 days pro-bono setup, training, and customization — I maintain it as my humanitarian portfolio

{{skillsBlock}}

I NEED FROM YOU
• Work visa / permit sponsorship
• Employer-arranged travel (any lawful mode) for {{household}}
• Pet-friendly housing (dog + cat) + dependent inclusion for my father
• Any ops role: field, HQ, IT, logistics, volunteer coordination
• Compensation: pro-bono or local stipend until stable

I can demo your priority country dashboard this week (30 minutes).

{{signature}}`
  },

  usajobsCover: {
    subject: "Application — Andrew Elston — Overseas / OCONUS — {{org}}",
    body: `Dear Hiring Manager,

I am applying for overseas/OCONUS positions with {{org}} via USAJOBS.

{{skillsBlock}}

I am willing to relocate immediately with authorized dependents and pets where policy allows. Current address: {{address}}.

Core competencies aligned to federal overseas roles:
• IT specialist (2210-equivalent): web systems, offline-capable apps, AI automation
• Program support (0343-equivalent): dashboards, grant indicators, field reporting
• Business development: 5 years partnership and stakeholder management

Availability: {{availability}}

Respectfully,
{{signature}}`
  },

  linkedinConnect: {
    subject: "LinkedIn note",
    body: `Hi — Andrew Elston, civic/AI builder (32-country humanitarian portal). Immediate deploy anywhere. Pro-bono OK for sponsored relocation (visa + housing + travel, household + pets). Can offer free portal deployment for {{org}}. 10 min advice on fastest path? (660) 498-5534`
  }
};

OUTREACH_TEMPLATES.fill = function (templateKey, profile, extras) {
  const t = OUTREACH_TEMPLATES[templateKey];
  if (!t) return { subject: "", body: "" };
  const data = { ...OUTREACH.defaultProfile, ...(window.ANDREW_PROFILE || {}), ...OUTREACH.loadProfile(), ...extras };
  let subject = t.subject;
  let body = t.body;
  Object.keys(data).forEach((k) => {
    const val = data[k] || "";
    subject = subject.split("{{" + k + "}}").join(val);
    body = body.split("{{" + k + "}}").join(val);
  });
  return { subject, body };
};

OUTREACH_TEMPLATES.copyToClipboard = function (text) {
  navigator.clipboard.writeText(text).then(() => true).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  });
};

OUTREACH_TEMPLATES.allKeys = function () {
  return Object.keys(OUTREACH_TEMPLATES).filter((k) => typeof OUTREACH_TEMPLATES[k] === "object" && OUTREACH_TEMPLATES[k].subject);
};
