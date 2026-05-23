(function () {
  "use strict";

  const KNOWLEDGE = {
    supply: [
      "Review minimum stock levels weekly. Prioritize reorder: antibiotics, ORS, gloves, malaria RDTs before comfort items.",
      "Track expiry dates — FEFO (first-expiry-first-out) reduces waste in low-resource settings.",
      "If stock below 2 weeks usage, flag donor or central pharmacy immediately.",
      "Solar fridge vaccines: log temp twice daily; any breach requires protocol review per national EPI guidelines.",
      "Maintain offline paper backup of inventory when connectivity fails."
    ],
    staff: [
      "Minimum safe coverage: 1 clinician + 1 nurse for outpatient; add triage clerk if >80 visits/day.",
      "Rotate night/on-call fairly; document handover notes for continuity.",
      "Volunteer clinicians need credential verification and supervision assignment before shifts.",
      "Build 4-week rolling roster; publish 1 week ahead for staff planning.",
      "Flag burnout: >6 consecutive days requires rest day per most NGO HR policies."
    ],
    intake: [
      "Register: name, age/sex, village/zone, chief complaint category (not diagnosis), referral source.",
      "Check duplicate visits same day to reduce queue inflation.",
      "Triage category is assigned by trained clinician — intake clerk does not diagnose.",
      "Daily tally by age group (<5, 5–14, 15–49, 50+) supports donor indicators.",
      "Offer privacy for sensitive complaints; route to appropriate room."
    ],
    referral: [
      "Emergency referral: stabilize, document, arrange transport, notify receiving facility if phone available.",
      "Tier 2 facilities handle complications; maintain updated referral directory with phone numbers offline.",
      "Track referral feedback — facilities that never send reports back need partner meeting.",
      "Maternal emergency: pre-referral checklist (vitals, bleeding, gestational age, transport time).",
      "Mental health: maintain list of counseling partners; warm handoff when possible."
    ],
    equipment: [
      "Autoclave: weekly spore test where protocol requires; log all cycles.",
      "BP cuffs and scales: calibrate quarterly; replace worn cuffs.",
      "Generator: test weekly; fuel stock minimum 72 hours.",
      "Cold chain: backup ice packs ready; fridge alarm log reviewed each morning.",
      "Breakdown log with date, device, action taken — supports donor asset reports."
    ],
    donor: [
      "Standard outputs: total visits, <5 visits, immunizations, ANC, referrals out, stock-outs.",
      "Disaggregate by sex and age where possible — most grants require this.",
      "Note stock-out days explicitly; funders understand supply chain gaps.",
      "Include volunteer hours and community outreach sessions in narrative.",
      "Export dashboard stats monthly; attach 1-page narrative on challenges and requests."
    ],
    general: [
      "These agents support facility operations only — not medical diagnosis or treatment advice.",
      "Licensed clinicians make all clinical decisions per national protocols.",
      "Health Portal is free forever for underserved facilities — no payment required.",
      "Data stays in your browser localStorage unless you choose to export.",
      "For clinical questions, consult WHO IMCI/ISTH or your national ministry guidelines."
    ]
  };

  const RULES = [
    { keys: ["supply", "pharmacy", "stock", "inventory", "reorder", "vaccine", "fridge"], topic: "supply" },
    { keys: ["staff", "shift", "schedule", "volunteer", "roster", "coverage", "burnout"], topic: "staff" },
    { keys: ["intake", "register", "patient", "form", "queue", "triage clerk"], topic: "intake" },
    { keys: ["referral", "transfer", "hospital", "follow-up", "emergency"], topic: "referral" },
    { keys: ["equipment", "maintenance", "repair", "device", "autoclave", "generator"], topic: "equipment" },
    { keys: ["donor", "report", "grant", "indicator", "funder", "monthly"], topic: "donor" }
  ];

  function detectTopic(text, agentId) {
    const lower = text.toLowerCase();
    const agent = HEALTH_PORTAL.getAgent(agentId);
    if (agent) {
      if (agent.topics.some((t) => lower.includes(t))) {
        for (const rule of RULES) {
          if (rule.keys.some((k) => lower.includes(k))) return rule.topic;
        }
      }
      const map = {
        "supply-advisor": "supply",
        "staff-scheduler": "staff",
        "intake-helper": "intake",
        "referral-router": "referral",
        "equipment-agent": "equipment",
        "donor-report-agent": "donor"
      };
      if (map[agentId]) return map[agentId];
    }
    for (const rule of RULES) {
      if (rule.keys.some((k) => lower.includes(k))) return rule.topic;
    }
    return "general";
  }

  function respond(text, agentId) {
    const topic = detectTopic(text, agentId);
    const pool = KNOWLEDGE[topic] || KNOWLEDGE.general;
    const seed = Math.abs(text.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const answer = pool[seed % pool.length];
    const agent = HEALTH_PORTAL.getAgent(agentId);
    const name = agent ? agent.name : "Facility Ops Agent";
    return `${name}: ${answer}\n\n⚕️ Operational guidance only — not medical advice. Clinicians follow national protocols.`;
  }

  function generateShiftRoster(staffList, days) {
    const staff = staffList.split(",").map((s) => s.trim()).filter(Boolean);
    if (!staff.length) return "Add staff names separated by commas.";
    const roster = [];
    for (let d = 0; d < days; d++) {
      const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d % 7];
      const on = staff[d % staff.length];
      const backup = staff[(d + 1) % staff.length];
      roster.push(`${day}: Primary ${on}, Backup ${backup}`);
    }
    return roster.join("\n");
  }

  function generateDonorReport(facilityName, visits, immunizations) {
    return `MONTHLY FACILITY REPORT — ${facilityName || "Health Facility"}
Date: ${new Date().toLocaleDateString()}

OUTPUT INDICATORS
- Total outpatient visits: ${visits || "[enter]"}
- Immunizations administered: ${immunizations || "[enter]"}
- Stock-out days: [enter]
- Referrals to higher level: [enter]
- Community outreach sessions: [enter]

NARRATIVE
Operations continued with [describe staffing/supply challenges].
Requests: [list critical stock or equipment needs].

Prepared via Health Portal (free for underserved facilities).`;
  }

  function checkInventory(items) {
    return items
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(",").map((p) => p.trim());
        const name = parts[0] || "Item";
        const qty = parseInt(parts[1], 10) || 0;
        const min = parseInt(parts[2], 10) || 10;
        return { name, qty, min, alert: qty < min };
      });
  }

  function mountAgent(options) {
    const chat = document.getElementById(options.chatId || "agent-chat");
    const input = document.getElementById(options.inputId || "agent-input");
    const send = document.getElementById(options.sendId || "agent-send");
    const agentId = options.agentId || "supply-advisor";

    if (!chat || !input || !send) return;

    function addMsg(text, role) {
      const div = document.createElement("div");
      div.className = "ai-msg " + role;
      div.style.whiteSpace = "pre-wrap";
      div.textContent = text;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    function handleSend() {
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, "user");
      input.value = "";
      setTimeout(() => addMsg(respond(text, agentId), "agent"), 350);
    }

    send.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });

    if (options.greeting) addMsg(options.greeting, "agent");
  }

  window.HEALTH_AGENT = {
    respond,
    mountAgent,
    generateShiftRoster,
    generateDonorReport,
    checkInventory,
    KNOWLEDGE
  };
})();
