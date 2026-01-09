(() => {
  "use strict";

  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // --- Content (no placeholders) ---
  const NODES = {
    hub: {
      id: "hub",
      type: "Hub",
      title: "Vermögensbaum",
      sub: "Überblick · Filter · Klick in die Zweige",
      what: "Du brauchst keine 27 Ideen. Du brauchst eine Idee, die wächst. Dieser Baum zeigt dir Wege, die du nebenbei starten kannst – mit klaren Schritten und realistischen Gewinnspannen.",
      forWhom: [
        "Wenn du Struktur willst statt Chaos.",
        "Wenn du Optionen sehen willst, ohne dich zu verzetteln.",
        "Wenn du Entscheidungen nach Zeit/Kapital/Reichweite treffen willst."
      ],
      steps: [
        "Wähle deinen Stamm (Zeit, Kapital, Reichweite, Skill).",
        "Klicke einen Ast an (Digitale Produkte / Services / Plattform).",
        "Klicke einen Zweig: du bekommst Schritte + Gewinnspanne + Fehler.",
        "Starte mit dem kleinsten umsetzbaren Schritt – heute."
      ],
      money: [
        { left: "Ergebnis", right: "Klarheit + Fokus + Startplan" },
        { left: "Hebel", right: "Skalieren statt schuften" }
      ],
      mistake: "Zu viele Optionen ohne Filter → Lähmung. Und: Zu viel Lesen ohne Tun.",
      cta: "Wenn du willst, sag mir: Zeit/Woche + Startkapital + Reichweite. Dann mache ich dir aus dem Baum eine 7-Tage-Startsequenz."
    },

    digital: {
      id: "digital",
      type: "Ast",
      title: "Digitale Produkte",
      sub: "Einmal bauen · oft verkaufen",
      what: "Du verkaufst kein PDF. Du verkaufst: Erleichterung, Abkürzung, Ordnung, Ergebnis.",
      forWhom: [
        "Wenn du erklären, strukturieren, vereinfachen kannst.",
        "Wenn du weniger Zeit-gegen-Geld willst.",
        "Wenn du Evergreen statt Dauerstress willst."
      ],
      steps: [
        "Wähle 1 Schmerz, der heute nervt (nicht „nice to have“).",
        "Definiere 1 Ergebnis (klar in einem Satz).",
        "Baue ein kleines, sauberes Produkt (Guide/Template).",
        "Landingpage + 10 Inhalte (Pins/Posts) → Verkauf."
      ],
      money: [
        { left: "Richtwert", right: "500–10.000 €/Monat (je nach Produkt + Traffic)" },
        { left: "Tempo", right: "mittel (dafür skalierbar)" }
      ],
      mistake: "Zu lang, zu allgemein, zu viel Wissen statt Schritte.",
      cta: "Willst du 10 Produktideen aus deinen Themen – inkl. Titel, Struktur, Preis, und Verkaufsargument?"
    },

    mini_guides: {
      id: "mini_guides",
      type: "Zweig",
      title: "Mini-Guides / PDFs",
      sub: "Die schnellste Form, Wissen in Geld zu verwandeln",
      what: "Ein Mini-Guide ist kein Buch. Er ist ein Werkzeug: kurz, konkret, umsetzbar.",
      forWhom: [
        "Wenig Zeit pro Woche.",
        "Wenig Startkapital.",
        "Du willst schnell einen ersten Euro sehen."
      ],
      steps: [
        "Wähle 1 Problem, das Menschen sofort lösen wollen.",
        "Schreibe 7 Schritte (max. 3 Seiten Inhalt + Checkliste).",
        "Pack es in ein cleanes PDF.",
        "Erstelle 1 Landingpage + 10 Pins/Posts.",
        "Verkauf über Shop + Link in Bio."
      ],
      money: [
        { left: "Preis", right: "9–29 €" },
        { left: "2 Verkäufe/Tag", right: "ca. 540–1.740 €/Monat" },
        { left: "5 Verkäufe/Tag", right: "ca. 1.350–4.350 €/Monat" }
      ],
      mistake: "Zu viel Theorie. Zu wenig Schritt-für-Schritt. Und: Kein klarer Kaufgrund (Zeit sparen / Fehler vermeiden / Ergebnis).",
      cta: "Sag mir 1 Thema – ich mache dir daraus einen Mini-Guide: Titel, Inhaltsstruktur, Checkliste, Preis und Landingpage-Text."
    },

    templates: {
      id: "templates",
      type: "Zweig",
      title: "Templates",
      sub: "Menschen zahlen dafür, nicht bei null anfangen zu müssen",
      what: "Vorlagen, die Arbeit abnehmen: Content-Plan, Angebots-PDF, Kalender, Checklisten, Dashboards, Branding-Kits.",
      forWhom: [
        "Du kannst Systeme bauen.",
        "Du liebst klare Strukturen.",
        "Du willst Evergreen statt ständig neu."
      ],
      steps: [
        "Entscheide eine Kategorie (Content / Business / Gesundheit / Planung).",
        "Baue 1 Hero-Template + 10 Varianten.",
        "Schreibe eine Anleitung: „So benutzt du es in 15 Minuten“.",
        "Baue ein Bundle (Starter + Pro)."
      ],
      money: [
        { left: "Preis", right: "19–79 € (Bundles 49–149 €)" },
        { left: "30 Verkäufe/Monat à 49 €", right: "1.470 €" },
        { left: "200 Verkäufe/Monat à 49 €", right: "9.800 €" }
      ],
      mistake: "Schön, aber ohne Nutzen. Template ohne Ergebnisversprechen = Deko.",
      cta: "Willst du 10 Template-Ideen, die sich verkaufen + Bundle-Struktur + Shop-Texte?"
    },

    services: {
      id: "services",
      type: "Ast",
      title: "Services nebenbei",
      sub: "Schneller Cashflow · Marktfeedback · später skalieren",
      what: "Services sind der Turbo. Nicht das Ziel. Du nutzt sie, um Geld + Marktfeedback zu bekommen – und daraus später Produkte zu bauen.",
      forWhom: [
        "Wenn du schnell Umsatz brauchst.",
        "Wenn du Proof (Beispiele) aufbauen willst.",
        "Wenn du später aus Services Systeme machst."
      ],
      steps: [
        "Wähle 1 Service mit klarer Grenze (Ergebnis, Lieferzeit, Preis).",
        "Baue 1 Vorher/Nachher-Beispiel.",
        "Pitch oder poste konsequent mit CTA.",
        "Dokumentiere: Welche Anfragen kommen? Daraus baust du Produkte."
      ],
      money: [
        { left: "Richtwert", right: "500–8.000 €/Monat (je nach Angebot + Frequenz)" },
        { left: "Tempo", right: "schnell (dafür weniger skalierbar)" }
      ],
      mistake: "„Ich kann alles“ → niemand kauft. Fokus schlägt Talent.",
      cta: "Willst du 3 Service-Angebote, die sauber abgrenzen (Einsteiger/Pro/Retainer) – als Copy-Paste Text?"
    },

    ugc: {
      id: "ugc",
      type: "Zweig",
      title: "UGC für Marken",
      sub: "Du brauchst keine Reichweite. Du brauchst ein sauberes Ergebnis.",
      what: "Du lieferst Kurzvideos/Fotos/Ads-Material, das Marken als Werbung nutzen können.",
      forWhom: [
        "Wenn du schnell starten willst.",
        "Wenn du lieber Output lieferst als Follower jagst.",
        "Wenn du klare Pakete verkaufen willst."
      ],
      steps: [
        "Wähle 1 Branche (Beauty, Fitness, Food, Tech).",
        "Baue 6 Beispiel-Clips (Dummy reicht, eigenes Produkt reicht).",
        "Schreibe 1 Angebotspaket (3 Stufen).",
        "Pitch 20 Marken/Woche."
      ],
      money: [
        { left: "Einstieg", right: "150–600 € pro Paket" },
        { left: "4 Pakete/Monat", right: "600–2.400 €" },
        { left: "10 Pakete/Monat", right: "1.500–6.000 €" }
      ],
      mistake: "Kein Fokus + kein Paket = endlose Anfragen ohne Abschluss.",
      cta: "Sag mir deine Branche – ich baue dir 3 UGC-Pakete inkl. Leistung, Preis, Grenzen und Pitch-Text."
    },

    micro_services: {
      id: "micro_services",
      type: "Zweig",
      title: "Micro-Dienstleistungen",
      sub: "Kleine Leistung · klare Grenze · schneller Verkauf",
      what: "Micro-Services sind keine Agentur. Es sind kleine, abgeschlossene Ergebnisse, die du nebenbei liefern kannst – ohne auszuufern.",
      forWhom: [
        "Wenn du klare Sprints magst (48h / 7 Tage).",
        "Wenn du schnell Proof willst.",
        "Wenn du ohne Website starten willst."
      ],
      steps: [
        "Definiere 1 Ergebnis (nicht 10 Aufgaben).",
        "Setze Lieferzeit + Preis (und einen Aufpreis für Express).",
        "Mach 1 Beispielfall (Vorher/Nachher).",
        "Poste 3× pro Woche: Problem → Lösung → Angebot."
      ],
      money: [
        { left: "Preis", right: "99–399 € pro Micro-Service" },
        { left: "10 Verkäufe/Monat", right: "990–3.990 €" },
        { left: "25 Verkäufe/Monat", right: "2.475–9.975 €" }
      ],
      mistake: "Zu billig, zu offen, zu viele Sonderwünsche.",
      cta: "Sag mir, was du gut kannst (Text, Foto, Struktur). Ich mache dir 10 Micro-Services inkl. Preisschild + Grenzen."
    },

    platform: {
      id: "platform",
      type: "Ast",
      title: "Plattform-Einkommen",
      sub: "Reichweite als Motor · Funnels als Getriebe",
      what: "Plattformen zahlen nicht, weil du postest. Sie zahlen, wenn du postest und dein Funnel die Arbeit übernimmt.",
      forWhom: [
        "Wenn du Sichtbarkeit als Asset aufbauen willst.",
        "Wenn du Systeme liebst (Hooks → CTA → Landingpage).",
        "Wenn du nicht jeden Monat bei null starten willst."
      ],
      steps: [
        "Wähle 1 Plattform (Pinterest oder Instagram) – nicht beide gleichzeitig.",
        "Wähle 1 Angebot/Produkt als Ziel.",
        "Baue eine Landingpage, die abschließt.",
        "Baue Content als Maschine (wiederholbare Formate)."
      ],
      money: [
        { left: "Richtwert", right: "500–20.000 €/Monat (je nach Angebot + System)" },
        { left: "Tempo", right: "Pinterest: langsam · Instagram: schneller" }
      ],
      mistake: "Zu viel Ästhetik, zu wenig Angebot. Ohne CTA bleibt’s Theater.",
      cta: "Willst du eine Funnel-Struktur passend zu deinem Produkt (Hook-Formate + CTA-Flow + Landingpage-Outline)?"
    },

    pinterest: {
      id: "pinterest",
      type: "Zweig",
      title: "Pinterest Evergreen",
      sub: "Langsam anlaufend. Dafür monatelang Geld mit einem Pin.",
      what: "Pins bringen Suchtraffic auf Landingpages. Dort steht ein Mini-Produkt oder Lead-Magnet, der verkauft oder Leads einsammelt.",
      forWhom: [
        "Wenn du geduldig bist (2–4 Monate Aufbau).",
        "Wenn du Evergreen willst statt täglichem Druck.",
        "Wenn du Suchintention nutzen willst."
      ],
      steps: [
        "1 Thema = 1 Landingpage.",
        "10 Pins pro Landingpage.",
        "3 Boards, sauber benannt.",
        "Jede Woche 10 neue Pins."
      ],
      money: [
        { left: "Nach 2–4 Monaten", right: "500–3.000 €/Monat (bei Konsequenz)" },
        { left: "Später möglich", right: "3.000–15.000 €/Monat (mit Produkt-Stack)" }
      ],
      mistake: "Zu früh aufgeben. Pinterest ist kein TikTok.",
      cta: "Sag mir dein Thema – ich baue dir 10 Board-Namen + 30 Pin-Titel + 1 Landingpage-Outline."
    },

    instagram: {
      id: "instagram",
      type: "Zweig",
      title: "Instagram Funnel",
      sub: "Nicht posten. Leiten. Führen. Abschließen.",
      what: "Hook-Post → Story → DM/Link → Landingpage → Kauf. Nicht hübsch sein. Wirksam sein.",
      forWhom: [
        "Wenn du schnellere Reaktionen willst.",
        "Wenn du mit Story/DM arbeiten kannst.",
        "Wenn du ein klares Angebot hast (oder bereit bist, es zu bauen)."
      ],
      steps: [
        "1 Produkt/1 Angebot wählen.",
        "7 Content-Formate definieren (Problem, Proof, Prozess, Persönlichkeit, Preis, FAQ, Callout).",
        "3 Posts/Woche + kurze Stories täglich.",
        "Jede Woche 1 CTA-Post: „Schreib mir X“."
      ],
      money: [
        { left: "Stabil", right: "1.000–5.000 €/Monat (bei sauberer Umsetzung)" },
        { left: "Wenn System sitzt", right: "5.000–20.000 €/Monat (Angebot + Proof + Funnel)" }
      ],
      mistake: "Zu viel Content ohne Abschluss. Ohne CTA keine Verkäufe.",
      cta: "Sag mir dein Produkt – ich schreibe dir 14 Hooks + 14 Story-Skripte + 4 CTA-Posts."
    }
  };

  const ALL_NODE_IDS = Object.keys(NODES);

  // Eligibility rules (simple but meaningful)
  // Each node (esp. twigs) defines "ideal" conditions; scoring picks best.
  const RULES = {
    // branches
    digital: { time: ["2-5","5-10","10+"], capital: ["0","100-1000","1000+"], reach: ["none","small","existing"], skill: ["beginner","advanced","pro"] },
    services:{ time: ["2-5","5-10","10+"], capital: ["0","100-1000","1000+"], reach: ["none","small","existing"], skill: ["beginner","advanced","pro"] },
    platform:{ time: ["5-10","10+"], capital: ["0","100-1000","1000+"], reach: ["none","small","existing"], skill: ["beginner","advanced","pro"] },

    // twigs
    mini_guides:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    templates:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["advanced","pro","beginner"] },

    ugc:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    micro_services:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },

    pinterest:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    instagram:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["small","existing","none"], skill:["beginner","advanced","pro"] },

    hub:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] }
  };

  // scoring weights: time more important for platform & templates
  const WEIGHTS = { time: 4, capital: 2, reach: 2, skill: 2 };

  const els = {
    time: $("#timePerWeek"),
    capital: $("#capital"),
    reach: $("#reach"),
    skill: $("#skill"),
    reset: $("#resetBtn"),
    openBest: $("#openBestBtn"),
    openHub: $("#openHubBtn"),
    openRandom: $("#openRandomBtn"),
    bestCards: $("#bestCards"),

    modalOverlay: $("#modalOverlay"),
    closeModal: $("#closeModalBtn"),
    modalKicker: $("#modalKicker"),
    modalTitle: $("#modalTitle"),
    modalSub: $("#modalSub"),
    modalBody: $("#modalBody"),

    pillTime: $("#pillTime"),
    pillCapital: $("#pillCapital"),
    pillReach: $("#pillReach"),
    pillSkill: $("#pillSkill"),

    copyBtn: $("#copyBtn"),
    nextBtn: $("#nextBtn"),
  };

  let lastOpenedId = "hub";

  function getState(){
    return {
      time: els.time.value,
      capital: els.capital.value,
      reach: els.reach.value,
      skill: els.skill.value
    };
  }

  function resetState(){
    els.time.value = "2-5";
    els.capital.value = "0";
    els.reach.value = "none";
    els.skill.value = "beginner";
    updateUI();
  }

  function scoreNode(nodeId, state){
    const rule = RULES[nodeId] || RULES.hub;
    let score = 0;
    let max = 0;

    // helper
    const add = (key, val) => {
      const w = WEIGHTS[key];
      max += w;
      if ((rule[key] || []).includes(val)) score += w;
    };

    add("time", state.time);
    add("capital", state.capital);
    add("reach", state.reach);
    add("skill", state.skill);

    // Normalize 0..100
    const pct = Math.round((score / Math.max(1, max)) * 100);

    // Small heuristics
    // If time is 2-5, platform twigs should be a bit lower.
    if (state.time === "2-5" && (nodeId === "pinterest" || nodeId === "instagram" || nodeId === "platform")) {
      return Math.max(0, pct - 15);
    }
    // Templates are harder with very low time.
    if (state.time === "2-5" && nodeId === "templates") {
      return Math.max(0, pct - 10);
    }
    // Instagram benefits from some reach; if none, slightly reduce.
    if (state.reach === "none" && nodeId === "instagram") {
      return Math.max(0, pct - 10);
    }
    return pct;
  }

  function classifyScore(pct){
    if (pct >= 80) return "good";
    if (pct >= 60) return "mid";
    return "low";
  }

  function scoreLabel(pct){
    // short & punchy
    if (pct >= 90) return "TOP";
    if (pct >= 80) return "GUT";
    if (pct >= 60) return "OK";
    return "LOW";
  }

  function applyNodeVisual(nodeEl, pct){
    nodeEl.classList.remove("is-good", "is-mid", "is-low");
    const cls = classifyScore(pct);
    if (cls === "good") nodeEl.classList.add("is-good");
    else if (cls === "mid") nodeEl.classList.add("is-mid");
    else nodeEl.classList.add("is-low");
  }

  function updateScores(){
    const state = getState();

    // Update each node block
    $$("[data-node]").forEach(el => {
      const id = el.getAttribute("data-node");
      const pct = scoreNode(id, state);
      applyNodeVisual(el, pct);
    });

    // Score pills
    $$("[data-score]").forEach(pill => {
      const id = pill.getAttribute("data-score");
      const pct = scoreNode(id, state);
      pill.textContent = scoreLabel(pct);
      pill.dataset.pct = String(pct);
    });

    renderBest(state);
  }

  function renderBest(state){
    const candidateIds = [
      "mini_guides","templates","ugc","micro_services","pinterest","instagram"
    ];

    const scored = candidateIds
      .map(id => ({ id, pct: scoreNode(id, state) }))
      .sort((a,b) => b.pct - a.pct)
      .slice(0,3);

    els.bestCards.innerHTML = "";
    scored.forEach(item => {
      const node = NODES[item.id];
      const cls = classifyScore(item.pct);

      const card = document.createElement("div");
      card.className = `bestCard ${cls === "good" ? "is-good" : cls === "mid" ? "is-mid" : "is-low"}`;
      card.setAttribute("role","listitem");
      card.tabIndex = 0;
      card.addEventListener("click", () => openModal(item.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item.id); }
      });

      card.innerHTML = `
        <div class="bestTop">
          <div class="bestTitle">${escapeHtml(node.title)}</div>
          <div class="badge">${scoreLabel(item.pct)}</div>
        </div>
        <div class="bestSub">${escapeHtml(node.sub)}</div>
      `;
      els.bestCards.appendChild(card);
    });
  }

  function buildModalContent(node){
    const makeList = (arr) => `<ul>${arr.map(li => `<li>${escapeHtml(li)}</li>`).join("")}</ul>`;

    const steps = makeList(node.steps || []);
    const forWhom = makeList(node.forWhom || []);

    const moneyRows = (node.money || []).map(r => `
      <div class="moneyRow"><span>${escapeHtml(r.left)}</span><strong>${escapeHtml(r.right)}</strong></div>
    `).join("");

    return `
      <div class="grid2">
        <div class="section">
          <h4>Was ist das?</h4>
          <p>${escapeHtml(node.what || "")}</p>
        </div>
        <div class="section">
          <h4>Für wen passt das?</h4>
          ${forWhom}
        </div>
      </div>

      <div class="section">
        <h4>So startest du</h4>
        ${steps}
      </div>

      <div class="grid2">
        <div class="section moneyBox">
          <h4>Mögliche Gewinne</h4>
          ${moneyRows || `<p>${escapeHtml("Richtwerte – abhängig von Umsetzung, Angebot und Markt.")}</p>`}
        </div>
        <div class="section">
          <h4>Häufigster Fehler</h4>
          <p>${escapeHtml(node.mistake || "")}</p>
          <div style="height:10px"></div>
          <h4>CTA</h4>
          <p>${escapeHtml(node.cta || "")}</p>
        </div>
      </div>
    `;
  }

  function openModal(nodeId){
    const node = NODES[nodeId] || NODES.hub;
    lastOpenedId = nodeId;

    els.modalKicker.textContent = node.type || "Zweig";
    els.modalTitle.textContent = node.title || "Titel";
    els.modalSub.textContent = node.sub || "";
    els.modalBody.innerHTML = buildModalContent(node);

    const state = getState();
    els.pillTime.textContent = `Zeit: ${pretty.time(state.time)}`;
    els.pillCapital.textContent = `Kapital: ${pretty.capital(state.capital)}`;
    els.pillReach.textContent = `Reichweite: ${pretty.reach(state.reach)}`;
    els.pillSkill.textContent = `Skill: ${pretty.skill(state.skill)}`;

    els.modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";

    // focus
    setTimeout(() => els.closeModal.focus(), 0);
  }

  function closeModal(){
    els.modalOverlay.hidden = true;
    document.body.style.overflow = "";
    // return focus to last opened node if present
    const back = $(`[data-node="${lastOpenedId}"]`);
    if (back) back.focus();
  }

  function openNextBest(){
    const state = getState();
    const candidateIds = ["mini_guides","templates","ugc","micro_services","pinterest","instagram"];
    const scored = candidateIds.map(id => ({ id, pct: scoreNode(id, state) })).sort((a,b)=>b.pct-a.pct);

    // find current index
    const idx = scored.findIndex(x => x.id === lastOpenedId);
    const next = scored[(idx + 1) % scored.length] || scored[0];
    openModal(next.id);
  }

  function openBest3Modal(){
    // open the best one
    const state = getState();
    const candidateIds = ["mini_guides","templates","ugc","micro_services","pinterest","instagram"];
    const best = candidateIds
      .map(id => ({ id, pct: scoreNode(id, state) }))
      .sort((a,b) => b.pct - a.pct)[0];
    openModal(best.id);
  }

  function openRandomTwig(){
    const twigs = ["mini_guides","templates","ugc","micro_services","pinterest","instagram"];
    const pick = twigs[Math.floor(Math.random() * twigs.length)];
    openModal(pick);
  }

  function copyModalText(){
    const node = NODES[lastOpenedId] || NODES.hub;
    const state = getState();
    const text = [
      `Vermögensbaum – ${node.type}: ${node.title}`,
      node.sub ? `\n${node.sub}\n` : "\n",
      `Was ist das?\n${node.what}\n`,
      `Für wen passt das?\n- ${(node.forWhom || []).join("\n- ")}\n`,
      `So startest du\n- ${(node.steps || []).join("\n- ")}\n`,
      `Mögliche Gewinne\n- ${(node.money || []).map(m => `${m.left}: ${m.right}`).join("\n- ")}\n`,
      `Häufigster Fehler\n${node.mistake}\n`,
      `CTA\n${node.cta}\n`,
      `\nDein Stamm: Zeit=${pretty.time(state.time)} | Kapital=${pretty.capital(state.capital)} | Reichweite=${pretty.reach(state.reach)} | Skill=${pretty.skill(state.skill)}`
    ].join("\n");

    navigator.clipboard?.writeText(text).then(() => {
      toast("Kopiert.");
    }).catch(() => {
      fallbackCopy(text);
      toast("Kopiert.");
    });
  }

  function fallbackCopy(text){
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch(_) {}
    document.body.removeChild(ta);
  }

  function toast(msg){
    const t = document.createElement("div");
    t.textContent = msg;
    t.style.position = "fixed";
    t.style.bottom = "18px";
    t.style.left = "50%";
    t.style.transform = "translateX(-50%)";
    t.style.padding = "10px 12px";
    t.style.borderRadius = "14px";
    t.style.background = "rgba(255,255,255,.92)";
    t.style.color = "#0b0c0f";
    t.style.fontWeight = "800";
    t.style.border = "1px solid rgba(0,0,0,.12)";
    t.style.boxShadow = "0 18px 40px rgba(0,0,0,.45)";
    t.style.zIndex = "999";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1200);
  }

  function updateUI(){
    updateScores();
  }

  // --- Events ---
  function bindNodeClicks(){
    $$("[data-node]").forEach(el => {
      const id = el.getAttribute("data-node");
      el.addEventListener("click", () => openModal(id));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(id);
        }
      });
    });
  }

  function bindControls(){
    [els.time, els.capital, els.reach, els.skill].forEach(sel => {
      sel.addEventListener("change", updateUI);
    });

    els.reset.addEventListener("click", resetState);
    els.openBest.addEventListener("click", openBest3Modal);
    els.openHub.addEventListener("click", () => openModal("hub"));
    els.openRandom.addEventListener("click", openRandomTwig);

    els.closeModal.addEventListener("click", closeModal);
    els.modalOverlay.addEventListener("click", (e) => {
      if (e.target === els.modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (!els.modalOverlay.hidden && e.key === "Escape") closeModal();
    });

    els.copyBtn.addEventListener("click", copyModalText);
    els.nextBtn.addEventListener("click", openNextBest);
  }

  // --- Utils ---
  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  const pretty = {
    time: (v) => (v === "2-5" ? "2–5h" : v === "5-10" ? "5–10h" : "10+h"),
    capital: (v) => (v === "0" ? "0€" : v === "100-1000" ? "100–1.000€" : "1.000€+"),
    reach: (v) => (v === "none" ? "keine" : v === "small" ? "klein" : "vorhanden"),
    skill: (v) => (v === "beginner" ? "Anfänger" : v === "advanced" ? "Fortgeschritten" : "Profi"),
  };

  // --- Init ---
  function init(){
    bindNodeClicks();
    bindControls();
    updateUI();
    // initial best cards ready
  }

  init();

})();
