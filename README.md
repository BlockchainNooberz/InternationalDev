# Civic Portal — International Gov & NGO Dashboards

Portfolio of static, offline-capable web dashboards and tools for international government, NGO, humanitarian, charity, volunteer, and relocation workflows across **Europe** and **Asia**.

## Start here — Andrew Elston

```
projects/dashboards/hub.html
```

Unified directory: all countries, tools, pre-filled email templates, contact block.

```
projects/dashboards/deployment-pitch.html
```

PDF-ready pitch with experience block — attach to outreach emails.

## New in this release

- **portfolio.html** — Resume/portfolio landing with PDF export
- **europe/ukraine/recovery-center.html** — Deep Ukraine recovery dashboard
- **tools/live-data-console.html** — REST Countries API + cached UN/EU feeds
- **europe/russia/governance-research.html** — Public governance indices (research only)
- **assets/js/live-data.js** — Live API layer with offline fallbacks
- **assets/js/pdf-export.js** — Print-optimized PDF brief export

## Deployment outreach (relocation sponsorship)

```
projects/dashboards/deployment-pitch.html     — PDF-ready pitch + contact block
projects/dashboards/tools/deployment-outreach.html — 50+ org directory + authority map
projects/dashboards/tools/sponsorship-pipeline.html — CRM + follow-up email generator
```

Includes honest assessments of UN, EU Solidarity Corps, USAID primes, FEMA, DARPA, HAARP, and private contractors with real relocation leverage.


Underserved health facilities get dashboards and offline agents at **$0 forever**:

```
projects/dashboards/health/index.html
```

- 6 facility types (rural clinic, refugee camp, island post, urban clinic, mobile unit, maternal health)
- 12 operational dashboard modules (patient flow, pharmacy, scheduling, referrals, cold chain, etc.)
- 6 offline agents (supply, shifts, intake, referrals, equipment, donor reports)
- **Not medical advice** — operations and administration only

Regenerate facility pages:

```bash
node projects/dashboards/health/scripts/generate-health.mjs
```

## Structure

```
projects/dashboards/
├── index.html                 # Global portal
├── assets/
│   ├── css/portal.css         # Shared design system
│   └── js/
│       ├── country-data.js    # Countries, modules, tools metadata
│       ├── dashboard-core.js  # Dashboard rendering engine
│       └── offline-ai.js      # Offline rule-based field agent
├── tools/                     # 8 cross-region tools
├── europe/                    # 16 country hubs + dashboards
├── asia/                      # 16 country hubs + dashboards
└── scripts/
    └── generate-dashboards.mjs
```

## Coverage

### Europe (16)
Ukraine, Romania, Russia (sanctions compliance desk only), Estonia, Finland, Iceland, Greenland, Poland, Latvia, Lithuania, Moldova, Georgia, Czech Republic, Slovakia, Hungary, Bulgaria

### Asia & Pacific (16)
China, Singapore, Vietnam, South Korea, Nepal, Japan, Taiwan, Thailand, Philippines, Indonesia, Malaysia, Sri Lanka, Maldives, Fiji, Samoa, Palau

### Dashboard modules (14 types)
Humanitarian ops, refugee resettlement, NGO volunteer coordination, community development, business ecosystem, digital gov, climate resilience, health & welfare, relocation & sponsorship, logistics, sanctions compliance (Russia), grant funding, education & youth, disaster preparedness, rural livelihood

### Cross-region tools (8)
- Relocation Command Center
- Grant & Funding Radar
- Volunteer Deployment Planner
- Sanctions Screening Desk
- Pet & Family Relocation Kit
- Offline Field Agent
- NGO Partnership Map
- Sponsorship Pipeline CRM

## Regenerate country files

```bash
node projects/dashboards/scripts/generate-dashboards.mjs
```

## Notes

- Demo data is seeded per country/module for portfolio presentation.
- Russia hub is limited to US/EU sanctions compliance reference workflows.
- Replace static data with live APIs (UN OCHA, EU Funding Portal, etc.) for production use.
