(() => {
  "use strict";

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // === CONTACT ===
  const EMAIL_TO = "rebelle.media.creator@gmail.com";

  // WhatsApp international format (DE): +49 162 9471865 => 491629471865
  // (ohne +, ohne Leerzeichen)
  const WA_NUMBER = "491629471865";

  // === LOCAL ANALYTICS (tracking-free, local-only) ===
  // Speichert NUR auf dem Gerät (localStorage). Kein Server, keine Cookies, keine IDs.
  const Analytics = (() => {
    const KEY = "rb_vb_local_stats_v1";
    const nowISO = () => new Date().toISOString();

    function load() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "null") || {
          createdAt: nowISO(),
          views: 0,
          opens: 0,
          mails: 0,
          whatsapps: 0,
          nodes: {}
        };
      } catch {
        return { createdAt: nowISO(), views: 0, opens: 0, mails: 0, whatsapps: 0, nodes: {} };
      }
    }

    function save(data) {
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
    }

    function inc(path, nodeId) {
      const d = load();
      d[path] = (d[path] || 0) + 1;
      if (nodeId) {
        d.nodes[nodeId] = d.nodes[nodeId] || { opens: 0, mails: 0, whatsapps: 0 };
        if (path === "opens") d.nodes[nodeId].opens++;
        if (path === "mails") d.nodes[nodeId].mails++;
        if (path === "whatsapps") d.nodes[nodeId].whatsapps++;
      }
      d.updatedAt = nowISO();
      save(d);
      return d;
    }

    function reset() {
      try { localStorage.removeItem(KEY); } catch {}
      return load();
    }

    function get() { return load(); }

    function exportJSON() {
      const blob = new Blob([JSON.stringify(load(), null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vermoegensbaum-local-stats.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 400);
    }

    return { inc, get, reset, exportJSON };
  })();

  // ===== Content (contactText pro Zweig) =====
  const NODES = {
    hub: {
      id: "hub",
      type: "HUB",
      title: "Vermögensbaum",
      sub: "Überblick · Filter · Klick in die Zweige",
      what: "Du brauchst keine 27 Ideen. Du brauchst eine Idee, die wächst. Dieser Baum zeigt dir Wege, die du nebenbei starten kannst – mit klaren Schritten und realistischen Gewinnspannen.",
      forWhom: ["Wenn du Struktur willst statt Chaos.","Wenn du Optionen sehen willst, ohne dich zu verzetteln.","Wenn du Entscheidungen nach Zeit/Kapital/Reichweite treffen willst."],
      steps: ["Wähle deinen Stamm (Zeit, Kapital, Reichweite, Skill).","Klicke einen Ast an (Digitale Produkte / Services / Plattform).","Klicke einen Zweig: du bekommst Schritte + Gewinnspanne + Fehler.","Starte mit dem kleinsten umsetzbaren Schritt – heute."],
      money: [{ left: "Ergebnis", right: "Klarheit + Fokus + Startplan" },{ left: "Hebel", right: "Skalieren statt schuften" }],
      mistake: "Zu viele Optionen ohne Filter → Lähmung. Zu viel Lesen ohne Tun.",
      cta: "Wenn du willst: schreib kurz Zeit/Woche + Startkapital + Thema – ich mache dir daraus einen 7-Tage-Startplan.",
      contactText: "Hallo, ich bin ___ und würde gern mehr über den Vermögensbaum erfahren.\n\nMein Thema: ___\nZeit/Woche: ___\nStartkapital: ___\nIch brauche Hilfe bei: ___\n\nDanke!"
    },

    digital: {
      id: "digital",
      type: "AST",
      title: "Digitale Produkte",
      sub: "Einmal bauen · oft verkaufen",
      what: "Du verkaufst kein PDF. Du verkaufst: Erleichterung, Abkürzung, Ordnung, Ergebnis.",
      forWhom: ["Wenn du erklären, strukturieren, vereinfachen kannst.","Wenn du weniger Zeit-gegen-Geld willst.","Wenn du Evergreen statt Dauerstress willst."],
      steps: ["Wähle 1 Schmerz, der heute nervt.","Definiere 1 Ergebnis (1 Satz).","Baue ein kleines Produkt (Guide/Template).","Landingpage + 10 Inhalte → Verkauf."],
      money: [{ left: "Richtwert", right: "500–10.000 €/Monat (je nach Produkt + Traffic)" },{ left: "Tempo", right: "mittel (dafür skalierbar)" }],
      mistake: "Zu allgemein, zu lang, zu wenig Schritte.",
      cta: "Sag mir dein Thema – ich mache dir 10 Produktideen + Struktur + Preis.",
      contactText: "Hallo, ich bin ___ und möchte mit digitalen Produkten starten.\n\nMein Thema: ___\nIch denke an: Guide/Template/Bundle\nIch brauche Hilfe bei: Idee/Struktur/Preis/Landingpage\n\nDanke!"
    },

    mini_guides: {
      id: "mini_guides",
      type: "ZWEIG",
      title: "Mini-Guides / PDFs",
      sub: "Die schnellste Form, Wissen in Geld zu verwandeln",
      what: "Ein Mini-Guide ist kein Buch. Er ist ein Werkzeug: kurz, konkret, umsetzbar.",
      forWhom: ["Wenig Zeit pro Woche.","Wenig Startkapital.","Du willst schnell einen ersten Euro sehen."],
      steps: ["Wähle 1 Problem, das Menschen sofort lösen wollen.","Schreibe 7 Schritte (max. 3 Seiten + Checkliste).","PDF clean gestalten.","Landingpage + 10 Pins/Posts.","Verkauf über Shop + Link."],
      money: [{ left: "Preis", right: "9–29 €" },{ left: "2 Verkäufe/Tag", right: "540–1.740 €/Monat" },{ left: "5 Verkäufe/Tag", right: "1.350–4.350 €/Monat" }],
      mistake: "Zu viel Theorie. Kein klarer Kaufgrund.",
      cta: "Sag mir 1 Thema – ich mache dir Titel + Struktur + Checkliste + Preis + Landingpage-Text.",
      contactText: "Hallo, ich bin ___ und will einen Mini-Guide erstellen.\n\nMein Thema: ___\nZielgruppe: ___\nIch hänge bei: Hook/Struktur/Preis/Verkauf\n\nDanke!"
    },

    templates: {
      id: "templates",
      type: "ZWEIG",
      title: "Templates",
      sub: "Menschen zahlen dafür, nicht bei null anfangen zu müssen",
      what: "Vorlagen, die Arbeit abnehmen: Content-Plan, Angebots-PDF, Checklisten, Dashboards, Kits.",
      forWhom: ["Du kannst Systeme bauen.","Du liebst klare Strukturen.","Du willst Evergreen statt ständig neu."],
      steps: ["1 Kategorie wählen.","1 Hero-Template + Varianten bauen.","15-Minuten-Anleitung schreiben.","Bundle (Starter + Pro) erstellen."],
      money: [{ left: "Preis", right: "19–79 € (Bundles 49–149 €)" },{ left: "30 Verkäufe/Monat à 49 €", right: "1.470 €" },{ left: "200 Verkäufe/Monat à 49 €", right: "9.800 €" }],
      mistake: "Schön, aber ohne Nutzen. Template ohne Ergebnisversprechen = Deko.",
      cta: "Sag mir dein Thema – ich baue dir 10 Template-Ideen + Bundle-Struktur + Shop-Text.",
      contactText: "Hallo, ich bin ___ und möchte Templates verkaufen.\n\nThema: ___\nZiel: ___\nIch brauche Hilfe bei: Bundle/Preis/Struktur/Shoptext\n\nDanke!"
    },

    services: {
      id: "services",
      type: "AST",
      title: "Services nebenbei",
      sub: "Schneller Cashflow · Marktfeedback · später skalieren",
      what: "Services sind der Turbo. Nicht das Ziel. Du nutzt sie für Cash + Proof – und baust daraus später Produkte.",
      forWhom: ["Wenn du schnell Umsatz brauchst.","Wenn du Proof aufbauen willst.","Wenn du aus Services Systeme machen willst."],
      steps: ["1 Service mit klarer Grenze definieren.","1 Vorher/Nachher-Beispiel bauen.","Konsequent posten/pitchen.","Fragen dokumentieren → Produkt bauen."],
      money: [{ left: "Richtwert", right: "500–8.000 €/Monat (je nach Angebot + Frequenz)" },{ left: "Tempo", right: "schnell (dafür weniger skalierbar)" }],
      mistake: "„Ich kann alles“ → niemand kauft.",
      cta: "Sag mir, was du kannst – ich mache dir 3 Angebote (Einsteiger/Pro/Retainer).",
      contactText: "Hallo, ich bin ___ und möchte nebenbei mit einem Service starten.\n\nIch kann gut: ___\nIch will verkaufen: ___\nIch brauche Hilfe bei: Angebot/Preis/Grenze\n\nDanke!"
    },

    ugc: {
      id: "ugc",
      type: "ZWEIG",
      title: "UGC für Marken",
      sub: "Du brauchst keine Reichweite. Du brauchst ein sauberes Ergebnis.",
      what: "Du lieferst Foto/Video-Material, das Marken als Werbung nutzen. Ergebnis > Follower.",
      forWhom: ["Wenn du schnell starten willst.","Wenn du lieber Output lieferst als Follower jagst.","Wenn du klare Pakete verkaufen willst."],
      steps: ["1 Branche wählen.","6 Beispiel-Clips bauen.","3 Pakete definieren.","20 Marken/Woche pitchen."],
      money: [{ left: "Einstieg", right: "150–600 € pro Paket" },{ left: "4 Pakete/Monat", right: "600–2.400 €" },{ left: "10 Pakete/Monat", right: "1.500–6.000 €" }],
      mistake: "Kein Fokus + kein Paket = endlose Anfragen.",
      cta: "Sag mir deine Branche – ich baue dir 3 UGC-Pakete inkl. Grenzen + Pitch-Text.",
      contactText: "Hallo, ich bin ___ und will mit UGC starten.\n\nBranche: ___\nIch brauche Hilfe bei: Paketen/Pitch/Portfolio\n\nDanke!"
    },

    micro_services: {
      id: "micro_services",
      type: "ZWEIG",
      title: "Micro-Dienstleistungen",
      sub: "Kleine Leistung · klare Grenze · schneller Verkauf",
      what: "Micro-Services liefern ein klares Ergebnis in kurzer Zeit – ohne auszuufern.",
      forWhom: ["Wenn du klare Sprints magst.","Wenn du schnell Proof willst.","Wenn du ohne großes Setup starten willst."],
      steps: ["1 Ergebnis definieren.","Preis + Lieferzeit + Express festlegen.","1 Beispielfall bauen.","Regelmäßig posten: Problem → Lösung → Angebot."],
      money: [{ left: "Preis", right: "99–399 € pro Micro-Service" },{ left: "10 Verkäufe/Monat", right: "990–3.990 €" },{ left: "25 Verkäufe/Monat", right: "2.475–9.975 €" }],
      mistake: "Zu offen, zu viele Sonderwünsche.",
      cta: "Sag mir deine Stärke – ich mache dir 10 Micro-Services inkl. Preisschild + Grenzen.",
      contactText: "Hallo, ich bin ___ und möchte Micro-Services anbieten.\n\nStärke: ___\nIch will verkaufen: ___\nIch brauche Hilfe bei: Angebot/Preis/Grenze\n\nDanke!"
    },

    platform: {
      id: "platform",
      type: "AST",
      title: "Plattform-Einkommen",
      sub: "Reichweite als Motor · Funnels als Getriebe",
      what: "Plattformen zahlen nicht fürs Posten. Sie zahlen, wenn dein Funnel abschließt.",
      forWhom: ["Wenn du Sichtbarkeit als Asset willst.","Wenn du Systeme magst (Hook → CTA → Landingpage)."],
      steps: ["1 Plattform wählen.","1 Angebot als Ziel.","Landingpage bauen.","Wiederholbare Content-Formate."],
      money: [{ left: "Richtwert", right: "500–20.000 €/Monat (je nach Angebot + System)" },{ left: "Tempo", right: "Pinterest: langsam · Instagram: schneller" }],
      mistake: "Ohne Angebot ist alles Theater.",
      cta: "Sag mir dein Produkt – ich mache dir Funnel-Outline + Content-Formate + CTA-Flow.",
      contactText: "Hallo, ich bin ___ und möchte Plattform-Einkommen aufbauen.\n\nThema/Produkt: ___\nPlattform: Pinterest/Instagram\nIch brauche Hilfe bei: Funnel/Content/CTA\n\nDanke!"
    },

    pinterest: {
      id: "pinterest",
      type: "ZWEIG",
      title: "Pinterest Evergreen",
      sub: "Langsam anlaufend. Dafür monatelang Geld mit einem Pin.",
      what: "Pins bringen Suchtraffic auf Landingpages. Dort verkauft dein Mini-Produkt (oder sammelt Leads).",
      forWhom: ["Wenn du geduldig bist (2–4 Monate Aufbau).","Wenn du Evergreen willst statt Dauer-Druck."],
      steps: ["1 Thema = 1 Landingpage.","10 Pins pro Landingpage.","3 Boards sauber benennen.","Jede Woche 10 neue Pins."],
      money: [{ left: "Nach 2–4 Monaten", right: "500–3.000 €/Monat (bei Konsequenz)" },{ left: "Später möglich", right: "3.000–15.000 €/Monat (mit Produkt-Stack)" }],
      mistake: "Zu früh aufgeben.",
      cta: "Sag mir dein Thema – ich baue dir Boards + Pin-Titel + Landingpage-Outline.",
      contactText: "Hallo, ich bin ___ und will Pinterest Evergreen starten.\n\nThema: ___\nZiel: ___\nIch brauche Hilfe bei: Boards/Pins/Landingpage\n\nDanke!"
    },

    instagram: {
      id: "instagram",
      type: "ZWEIG",
      title: "Instagram Funnel",
      sub: "Nicht posten. Leiten. Führen. Abschließen.",
      what: "Hook-Post → Story → Link/DM → Landingpage → Kauf. Nicht hübsch sein. Wirksam sein.",
      forWhom: ["Wenn du schnellere Reaktionen willst.","Wenn du Story/DM nutzen kannst."],
      steps: ["1 Produkt wählen.","7 Content-Formate definieren.","3 Posts/Woche + Stories.","1 CTA-Post/Woche."],
      money: [{ left: "Stabil", right: "1.000–5.000 €/Monat (sauber umgesetzt)" },{ left: "Wenn System sitzt", right: "5.000–20.000 €/Monat (Offer + Proof + Funnel)" }],
      mistake: "Zu viel Content ohne Abschluss.",
      cta: "Sag mir dein Produkt – ich schreibe dir Hooks + Story-Skripte + CTA-Posts.",
      contactText: "Hallo, ich bin ___ und möchte einen Instagram-Funnel bauen.\n\nThema/Produkt: ___\nIch brauche Hilfe bei: Hooks/Stories/CTA/Landingpage\n\nDanke!"
    }
  };

  // ===== rules/scoring =====
  const RULES = {
    digital: { time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    services:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    platform:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },

    mini_guides:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    templates:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },

    ugc:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    micro_services:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },

    pinterest:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },
    instagram:{ time:["5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] },

    hub:{ time:["2-5","5-10","10+"], capital:["0","100-1000","1000+"], reach:["none","small","existing"], skill:["beginner","advanced","pro"] }
  };
  const WEIGHTS = { time: 4, capital: 2, reach: 2, skill: 2 };

  // ===== elements =====
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

    emailBtn: $("#emailBtn"),
    waBtn: $("#waBtn"),
    nextBtn: $("#nextBtn"),

    footerMail: $("#footerMail"),
    footerWa: $("#footerWa"),

    statsPanel: $("#statsPanel"),
    statsBox: $("#statsBox"),
    statsResetBtn: $("#statsResetBtn"),
    statsExportBtn: $("#statsExportBtn")
  };

  let lastOpenedId = "hub";

  // ===== safety: modal never open at start =====
  document.addEventListener("DOMContentLoaded", () => {
    const modalEl = document.getElementById("modalOverlay");
    if (modalEl) {
      modalEl.hidden = true;
      document.body.style.overflow = "";
    }

    Analytics.inc("views");
    updateUI();
    setFooterLinks(NODES.hub);

    // Stats panel only on demand
    if (location.hash === "#stats") {
      showStats();
    }
  });

  function getState() {
    return {
      time: els.time?.value || "2-5",
      capital: els.capital?.value || "0",
      reach: els.reach?.value || "none",
      skill: els.skill?.value || "beginner"
    };
  }

  function prettyState(s) {
    return {
      time: s.time === "2-5" ? "2–5h" : s.time === "5-10" ? "5–10h" : "10+h",
      capital: s.capital === "0" ? "0€" : s.capital === "100-1000" ? "100–1.000€" : "1.000€+",
      reach: s.reach === "none" ? "keine" : s.reach === "small" ? "klein" : "vorhanden",
      skill: s.skill === "beginner" ? "Anfänger" : s.skill === "advanced" ? "Fortgeschritten" : "Profi"
    };
  }

  function resetState() {
    if (els.time) els.time.value = "2-5";
    if (els.capital) els.capital.value = "0";
    if (els.reach) els.reach.value = "none";
    if (els.skill) els.skill.value = "beginner";
    updateUI();
  }

  function scoreNode(nodeId, state) {
    const rule = RULES[nodeId] || RULES.hub;
    let score = 0, max = 0;

    const add = (key, val) => {
      const w = WEIGHTS[key];
      max += w;
      if ((rule[key] || []).includes(val)) score += w;
    };

    add("time", state.time);
    add("capital", state.capital);
    add("reach", state.reach);
    add("skill", state.skill);

    let pct = Math.round((score / Math.max(1, max)) * 100);

    if (state.time === "2-5" && (nodeId === "pinterest" || nodeId === "instagram" || nodeId === "platform")) pct = Math.max(0, pct - 15);
    if (state.time === "2-5" && nodeId === "templates") pct = Math.max(0, pct - 10);
    if (state.reach === "none" && nodeId === "instagram") pct = Math.max(0, pct - 10);

    return pct;
  }

  function classifyScore(pct) {
    if (pct >= 80) return "good";
    if (pct >= 60) return "mid";
    return "low";
  }

  function scoreLabel(pct) {
    if (pct >= 90) return "TOP";
    if (pct >= 80) return "GUT";
    if (pct >= 60) return "OK";
    return "LOW";
  }

  function applyNodeVisual(nodeEl, pct) {
    nodeEl.classList.remove("is-good", "is-mid", "is-low");
    const cls = classifyScore(pct);
    if (cls === "good") nodeEl.classList.add("is-good");
    else if (cls === "mid") nodeEl.classList.add("is-mid");
    else nodeEl.classList.add("is-low");
  }

  function updateScores() {
    const state = getState();

    $$("[data-node]").forEach((el) => {
      const id = el.getAttribute("data-node");
      const pct = scoreNode(id, state);
      applyNodeVisual(el, pct);
    });

    $$("[data-score]").forEach((pill) => {
      const id = pill.getAttribute("data-score");
      const pct = scoreNode(id, getState());
      pill.textContent = scoreLabel(pct);
    });

    renderBest(state);
  }

  function renderBest(state) {
    if (!els.bestCards) return;

    const candidateIds = ["mini_guides", "templates", "ugc", "micro_services", "pinterest", "instagram"];
    const scored = candidateIds
      .map((id) => ({ id, pct: scoreNode(id, state) }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3);

    els.bestCards.innerHTML = "";
    scored.forEach((item) => {
      const node = NODES[item.id];
      const cls = classifyScore(item.pct);

      const card = document.createElement("div");
      card.className = `bestCard ${cls === "good" ? "is-good" : cls === "mid" ? "is-mid" : "is-low"}`;
      card.setAttribute("role", "listitem");
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

  function buildModalContent(node) {
    const makeList = (arr) => `<ul>${(arr || []).map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>`;
    const moneyRows = (node.money || [])
      .map((r) => `<div class="moneyRow"><span>${escapeHtml(r.left)}</span><strong>${escapeHtml(r.right)}</strong></div>`)
      .join("");

    return `
      <div class="grid2">
        <div class="section">
          <h4>Was ist das?</h4>
          <p>${escapeHtml(node.what || "")}</p>
        </div>
        <div class="section">
          <h4>Für wen passt das?</h4>
          ${makeList(node.forWhom)}
        </div>
      </div>

      <div class="section">
        <h4>So startest du</h4>
        ${makeList(node.steps)}
      </div>

      <div class="grid2">
        <div class="section">
          <h4>Mögliche Gewinne</h4>
          ${moneyRows || `<p>Richtwerte – abhängig von Umsetzung, Angebot und Markt.</p>`}
        </div>
        <div class="section">
          <h4>Häufigster Fehler</h4>
          <p>${escapeHtml(node.mistake || "")}</p>
          <div style="height:10px"></div>
          <h4>Nächster Schritt</h4>
          <p>${escapeHtml(node.cta || "")}</p>
        </div>
      </div>
    `;
  }

  function buildMessage(node) {
    const s = prettyState(getState());
    return [
      node.contactText || "Hallo, ich bin ___ und würde gern mehr erfahren.",
      "",
      "— Kontext (Vermögensbaum) —",
      `Zweig: ${node.title}`,
      node.sub ? `Subline: ${node.sub}` : "",
      "",
      "— Mein Stamm —",
      `Zeit/Woche: ${s.time}`,
      `Kapital: ${s.capital}`,
      `Reichweite: ${s.reach}`,
      `Skill: ${s.skill}`,
      "",
      "— Meine Frage / mein Ziel —",
      "Ich will konkret erreichen: ___",
      "Ich brauche Hilfe bei: ___"
    ].filter(Boolean).join("\n");
  }

  function openModal(nodeId) {
    const node = NODES[nodeId] || NODES.hub;
    lastOpenedId = nodeId;

    Analytics.inc("opens", nodeId);

    if (els.modalKicker) els.modalKicker.textContent = node.type || "ZWEIG";
    if (els.modalTitle) els.modalTitle.textContent = node.title || "";
    if (els.modalSub) els.modalSub.textContent = node.sub || "";
    if (els.modalBody) els.modalBody.innerHTML = buildModalContent(node);

    const s = prettyState(getState());
    if (els.pillTime) els.pillTime.textContent = `Zeit: ${s.time}`;
    if (els.pillCapital) els.pillCapital.textContent = `Kapital: ${s.capital}`;
    if (els.pillReach) els.pillReach.textContent = `Reichweite: ${s.reach}`;
    if (els.pillSkill) els.pillSkill.textContent = `Skill: ${s.skill}`;

    setFooterLinks(node);

    if (els.modalOverlay) {
      els.modalOverlay.hidden = false;
      document.body.style.overflow = "hidden";
      setTimeout(() => els.closeModal?.focus?.(), 0);
    }
  }

  function closeModal() {
    if (!els.modalOverlay) return;
    els.modalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  function openBestModal() {
    const state = getState();
    const candidateIds = ["mini_guides", "templates", "ugc", "micro_services", "pinterest", "instagram"];
    const best = candidateIds
      .map((id) => ({ id, pct: scoreNode(id, state) }))
      .sort((a, b) => b.pct - a.pct)[0];
    openModal(best.id);
  }

  function openNextBest() {
    const state = getState();
    const candidateIds = ["mini_guides", "templates", "ugc", "micro_services", "pinterest", "instagram"];
    const scored = candidateIds
      .map((id) => ({ id, pct: scoreNode(id, state) }))
      .sort((a, b) => b.pct - a.pct);

    const idx = scored.findIndex((x) => x.id === lastOpenedId);
    const next = scored[(idx + 1) % scored.length] || scored[0];
    openModal(next.id);
  }

  function openRandomTwig() {
    const twigs = ["mini_guides", "templates", "ugc", "micro_services", "pinterest", "instagram"];
    openModal(twigs[Math.floor(Math.random() * twigs.length)]);
  }

  function sendMail(node) {
    Analytics.inc("mails", node.id);
    const subject = encodeURIComponent(`Vermögensbaum – ${node.title}`);
    const body = encodeURIComponent(buildMessage(node));
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  }

  function openWhatsApp(node) {
    Analytics.inc("whatsapps", node.id);
    const text = encodeURIComponent(buildMessage(node));
    // wa.me needs international number without +
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  function setFooterLinks(node) {
    if (els.footerMail) {
      const subject = encodeURIComponent(`Vermögensbaum – ${node.title}`);
      const body = encodeURIComponent(buildMessage(node));
      els.footerMail.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
      els.footerMail.textContent = EMAIL_TO;
    }
    if (els.footerWa) {
      els.footerWa.href = openWhatsApp(node);
    }
  }

  // 🅲 Stats UI
  function showStats() {
    if (!els.statsPanel || !els.statsBox) return;
    els.statsPanel.hidden = false;
    const d = Analytics.get();
    els.statsBox.textContent = JSON.stringify(d, null, 2);
  }

  function refreshStats() {
    if (!els.statsBox) return;
    els.statsBox.textContent = JSON.stringify(Analytics.get(), null, 2);
  }

  // ===== wiring =====
  function bindNodeClicks() {
    $$("[data-node]").forEach((el) => {
      const id = el.getAttribute("data-node");
      el.addEventListener("click", () => openModal(id));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(id); }
      });
    });
  }

  function bindControls() {
    [els.time, els.capital, els.reach, els.skill].forEach((sel) => {
      if (!sel) return;
      sel.addEventListener("change", updateUI);
    });

    els.reset?.addEventListener("click", resetState);
    els.openBest?.addEventListener("click", openBestModal);
    els.openHub?.addEventListener("click", () => openModal("hub"));
    els.openRandom?.addEventListener("click", openRandomTwig);

    els.closeModal?.addEventListener("click", closeModal);
    els.modalOverlay?.addEventListener("click", (e) => {
      if (e.target === els.modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (els.modalOverlay && !els.modalOverlay.hidden && e.key === "Escape") closeModal();
      if (location.hash === "#stats") showStats();
    });

    els.emailBtn?.addEventListener("click", () => {
      const node = NODES[lastOpenedId] || NODES.hub;
      sendMail(node);
      refreshStats();
    });

    els.waBtn?.addEventListener("click", () => {
      const node = NODES[lastOpenedId] || NODES.hub;
      window.open(openWhatsApp(node), "_blank");
      refreshStats();
    });

    els.nextBtn?.addEventListener("click", openNextBest);

    els.statsResetBtn?.addEventListener("click", () => {
      Analytics.reset();
      refreshStats();
    });

    els.statsExportBtn?.addEventListener("click", () => {
      Analytics.exportJSON();
    });
  }

  function updateUI() { updateScores(); }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function init() {
    bindNodeClicks();
    bindControls();
    updateUI();
  }

  init();
})();
