(function () {
  "use strict";

  const KNOWLEDGE = {
    relocation: [
      "Prioritize countries with explicit talent/relocation visas: Estonia, Finland, Poland, Singapore, South Korea.",
      "Document family composition (father + pets) early — many sponsors filter on household size and pet policies.",
      "Target NGOs with expatriate housing benefits: UN agencies, ICRC, MSF, GIZ, JICA secondments.",
      "Prepare a 1-page relocation value proposition: skills offered in exchange for sponsored move + housing.",
      "EU Blue Card and national D visas often allow dependents; verify pet import timelines separately."
    ],
    humanitarian: [
      "Use cluster coordination structures: Shelter, WASH, Health, Protection, Logistics.",
      "Maintain offline copies of beneficiary registries — sync when connectivity returns.",
      "Standardize intake forms across partners to reduce duplication of assessments.",
      "Track gender-disaggregated data for all distribution programs.",
      "Pre-position supplies using lead times from logistics-supply dashboards."
    ],
    grants: [
      "EU Horizon, EEA Grants, and DG NEAR instruments are active for Eastern Europe recovery.",
      "UN OCHA pooled funds accept rapid proposals for new emergencies.",
      "Many Nordic embassies fund civil society via small grants (<€50k) with fast turnaround.",
      "Document co-financing and match requirements before applying.",
      "Align proposals to host government priority sectors listed on country dashboards."
    ],
    sanctions: [
      "Russia dashboards are for US/EU sanctions compliance reference only — not operational guidance inside restricted jurisdictions.",
      "Humanitarian exemptions exist but require documented due diligence and screening.",
      "Screen all transactions against OFAC SDN and EU consolidated lists before disbursement.",
      "Maintain audit trails for permitted medical and food assistance corridors.",
      "Consult legal counsel before any engagement involving sanctioned entities."
    ],
    pets: [
      "EU pet travel typically requires microchip, rabies vaccination, and EU health certificate.",
      "Iceland and UK-adjacent routes may require extended quarantine — plan 6+ months ahead.",
      "Singapore and Japan have strict import quarantine — factor into sponsorship timeline.",
      "Identify pet-friendly housing before visa submission — landlords often require proof.",
      "Keep vaccination records and ISO microchip numbers in offline storage."
    ]
  };

  const KEYWORDS = [
    { keys: ["relocat", "visa", "sponsor", "move", "housing"], topic: "relocation" },
    { keys: ["aid", "humanitarian", "ngo", "refugee", "volunteer"], topic: "humanitarian" },
    { keys: ["grant", "fund", "proposal", "donor"], topic: "grants" },
    { keys: ["sanction", "ofac", "compliance", "russia"], topic: "sanctions" },
    { keys: ["pet", "dog", "cat", "animal"], topic: "pets" }
  ];

  function detectTopic(text) {
    const lower = text.toLowerCase();
    for (const rule of KEYWORDS) {
      if (rule.keys.some((k) => lower.includes(k))) return rule.topic;
    }
    return "relocation";
  }

  function pickResponse(topic, seed) {
    const pool = KNOWLEDGE[topic] || KNOWLEDGE.relocation;
    return pool[seed % pool.length];
  }

  function respond(userText) {
    const topic = detectTopic(userText);
    const seed = Math.abs(userText.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const answer = pickResponse(topic, seed);
    const prefix = {
      relocation: "Relocation advisor",
      humanitarian: "Field ops advisor",
      grants: "Funding advisor",
      sanctions: "Compliance note",
      pets: "Pet relocation advisor"
    }[topic];

    return `${prefix}: ${answer}\n\n(Offline rule-based assistant — no external API. For production, connect to your org's approved LLM.)`;
  }

  function mountChat(options) {
    const chat = document.getElementById(options.chatId || "ai-chat");
    const input = document.getElementById(options.inputId || "ai-input");
    const send = document.getElementById(options.sendId || "ai-send");

    if (!chat || !input || !send) return;

    function addMsg(text, role) {
      const div = document.createElement("div");
      div.className = "ai-msg " + role;
      div.textContent = text;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    function handleSend() {
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, "user");
      input.value = "";
      setTimeout(() => addMsg(respond(text), "agent"), 400);
    }

    send.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });

    if (options.greeting) addMsg(options.greeting, "agent");
  }

  window.CIVIC_OFFLINE_AI = { respond, mountChat, KNOWLEDGE };
})();
