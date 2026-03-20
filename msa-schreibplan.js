// msa-schreibplan.js
// Interaktiver Schreibplan-Leitfaden – MSA-Erörterung
// Thema: Soll auf einer Klassenfahrt auf digitale Medien verzichtet werden?

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     ZUSTAND
     ═══════════════════════════════════════════════════════════ */
  const S = {
    step:       0,
    these:      null,   // 'A' = Verzicht | 'B' = Medien gehören dazu
    votes:      {},     // { 0: 'pro'|'contra', 1: ..., 2: ..., 3: ... }
    argChoices: {},     // { '<stepN>': { bub: 0|1, opt: 0|1 } }
    fazitSel:   [],     // Indizes der gewählten stärksten Argumente im Fazit
  };

  /* ═══════════════════════════════════════════════════════════
     DATEN
     ═══════════════════════════════════════════════════════════ */
  const THESE_A = 'Der Verzicht auf digitale Medien macht die Klassenfahrt zu einem besonders schönen Erlebnis.';
  const THESE_B = 'Digitale Medien gehören zum alltäglichen Leben dazu.';

  const SPRECHBLASEN = [
    { icon: '📸', text: 'So kann man doch gar keine Fotos von der Reise machen!' },
    { icon: '🚨', text: 'Was ist, wenn etwas passiert?' },
    { icon: '🎲', text: 'Es gibt so tolle Gesellschaftsspiele, die viel Spaß machen.' },
    { icon: '🗣️', text: 'Face-to-face kann man sich besser über vertrauliche Dinge austauschen.' },
  ];

  const ARGS_A = [
    {
      bubble: SPRECHBLASEN[2],
      args:   ['Gesellschaftsspiele fördern echte Gemeinschaft', 'Analoge Spiele schaffen unvergessliche Erlebnisse ohne Bildschirm'],
      belege: [
        { text: 'Gesellschaftsspiele → alle mitmachen, niemand am Handy', correct: true },
        { text: 'Spieleabend auf Fahrt → gemeinsame Erinnerungen stärker als Fotos', correct: true },
        { text: 'Gesellschaftsspiele sind teuer und schwer mitzunehmen', correct: false, type: 'unlogisch', explanation: '❌ Unlogisch: Diese Aussage widerspricht dem Argument – ob Spiele teuer sind, hat nichts damit zu tun, ob sie Gemeinschaft fördern.' },
        { text: 'Spiele machen Spaß', correct: false, type: 'oberflächlich', explanation: '❌ Zu oberflächlich: Diese Aussage ist zu allgemein und belegt das Argument nicht konkret genug.' },
      ],
    },
    {
      bubble: SPRECHBLASEN[3],
      args:   ['Tiefere, persönlichere Kommunikation möglich', 'Offenere Gespräche ohne digitale Ablenkung'],
      belege: [
        { text: 'kein Handy → keine Unterbrechungen, konzentrierteres Gespräch', correct: true },
        { text: 'persönliche Gespräche → tiefere Freundschaften', correct: true },
        { text: 'Ohne Handy werden Gespräche langweiliger', correct: false, type: 'unlogisch', explanation: '❌ Unlogisch: Das Gegenteil ist gemeint – ohne Handyablenkung werden Gespräche intensiver, nicht langweiliger.' },
        { text: 'Reden ist wichtig', correct: false, type: 'oberflächlich', explanation: '❌ Zu oberflächlich: Diese Aussage erklärt nicht, warum Gespräche ohne Handy besser sind.' },
      ],
    },
  ];
  const ARGS_B = [
    {
      bubble: SPRECHBLASEN[0],
      args:   ['Keine Fotos als Urlaubserinnerungen', 'Kein Festhalten schöner Momente möglich'],
      belege: [
        { text: 'Fotos → bleibende Erinnerungen auch nach Jahren', correct: true },
        { text: 'Gruppenfotos als gemeinsames Reiseandenken', correct: true },
        { text: 'Mit Fotos kann man anderen zeigen, wie toll man reist', correct: false, type: 'unlogisch', explanation: '❌ Unlogisch: Das klingt nach Angeben – das ist kein stichhaltiger Beleg für den Wert von Fotos als Erinnerungen.' },
        { text: 'Fotos sind schön', correct: false, type: 'oberflächlich', explanation: '❌ Zu oberflächlich: Diese Aussage ist zu allgemein und belegt das Argument nicht konkret.' },
      ],
    },
    {
      bubble: SPRECHBLASEN[1],
      args:   ['Eingeschränkte Erreichbarkeit bei Notfällen', 'Keine schnelle Hilfe im Notfall möglich'],
      belege: [
        { text: 'Unfall / Erkrankung → Notruf lebensnotwendig', correct: true },
        { text: 'Elternkontakt bei dringenden Problemen nötig', correct: true },
        { text: 'Notfälle kommen auf Klassenfahrten eigentlich nie vor', correct: false, type: 'unlogisch', explanation: '❌ Unlogisch: Das widerspricht dem Argument – Notfälle können immer vorkommen, deshalb braucht man ein Handy.' },
        { text: 'Man braucht ein Handy', correct: false, type: 'oberflächlich', explanation: '❌ Zu oberflächlich: Das ist keine Begründung, sondern nur eine Aussage ohne Erklärung.' },
      ],
    },
  ];

  const EIGENE_A = ['Mehr Bewegung und Naturerlebnisse möglich', 'Unabhängigkeit vom Internet stärkt Selbstvertrauen', 'Gemeinsame Erlebnisse ohne Ablenkung'];
  const EIGENE_B = ['Google Maps für Navigation', 'Informationen im Internet suchen', 'Kontakt zur Familie jederzeit gewährleistet'];

  const EIGENE_A_FALSCH = { text: 'Handys sind zu teuer und zu zerbrechlich', explanation: '❌ Unlogisch: Die Kosten oder Zerbrechlichkeit eines Handys sind kein Argument dafür, auf digitale Medien zu verzichten. Es geht um gemeinsame Erlebnisse, nicht um den Wert des Geräts.' };
  const EIGENE_B_FALSCH = { text: 'Mit dem Handy sieht man cooler aus', explanation: '❌ Zu oberflächlich: Außenwirkung ist kein stichhaltiges Argument. Überzeugende Argumente beziehen sich auf Sicherheit, Nützlichkeit oder konkrete Vorteile.' };

  const TOTAL = 12;

  /* ═══════════════════════════════════════════════════════════
     HTML-HELFER
     ═══════════════════════════════════════════════════════════ */
  const r   = t => `<span style="color:#ef4444;font-weight:700">${t}</span>`;
  const grn = t => `<span style="color:#16a34a;font-weight:700">${t}</span>`;

  const progress = n => `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <div style="flex:1;height:5px;background:rgba(128,128,128,.15);border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${Math.round((n / TOTAL) * 100)}%;background:var(--accent,#6366f1);border-radius:3px;transition:width .5s ease"></div>
      </div>
    </div>`;

  const chip = (label, color) => `
    <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:.7rem;font-weight:700;letter-spacing:.06em;background:${color}22;color:${color};margin-bottom:10px">${label}</span>`;

  const box = (html, tint = 'rgba(99,102,241,.05)', border = '#6366f133') => `
    <div class="card" style="padding:14px 16px;margin-bottom:12px;background:${tint};border:1px solid ${border}">${html}</div>`;

  const toggleBtn = (id, label, icon = '💡', color = '') => `
    <button id="${id}" class="btn btn-ol" style="font-size:.8rem;margin:6px 6px 0 0;${color ? `color:${color};border-color:${color}` : ''}">${icon} ${label}</button>`;

  const toggleBox = (id, html) => `
    <div id="${id}" style="display:none;margin-top:10px">${box(html, 'rgba(99,102,241,.06)', '#6366f144')}</div>`;

  /** Navigations-Leiste mit Zurück- und Weiter-Button */
  const navigation = (weiterLabel = 'Weiter →', weiterDisabled = false) => `
    <div style="display:flex;justify-content:center;gap:12px;margin-top:22px">
      ${S.step > 0
        ? `<button id="sp-zurueck" class="btn btn-ol" style="min-width:120px">← Zurück</button>`
        : ''}
      <button id="sp-weiter" class="btn btn-dk"
        style="min-width:170px;${weiterDisabled ? 'opacity:.35;cursor:not-allowed' : ''}"
        ${weiterDisabled ? 'disabled' : ''}>${weiterLabel}</button>
    </div>`;

  /* ═══════════════════════════════════════════════════════════
     SCHRITTE
     ═══════════════════════════════════════════════════════════ */

  /* 0 – Aufgabenpräsentation + Meinungsäußerungen */
  function s0() {
    const CORRECT_VOTES = { 0: 'contra', 1: 'contra', 2: 'pro', 3: 'pro' };
    const allCorrect = Object.keys(S.votes).length >= 4
      && Object.entries(S.votes).every(([k, v]) => v === CORRECT_VOTES[parseInt(k)]);
    return `
      ${progress(0)}
      <h3 style="margin-bottom:14px">Soll während einer Klassenfahrt auf digitale Medien verzichtet werden?</h3>
      ${box(`
        <p style="font-size:.9rem;margin-bottom:10px">In Kürze soll Ihre Abschlussfahrt stattfinden. Einige Eltern und Ihr Klassenlehrer schlagen vor, während der gesamten Reise auf digitale Medien zu verzichten. Da dieser Vorschlag in Ihrer Klasse kontrovers diskutiert wird, soll darüber abgestimmt werden.</p>
        <p style="font-size:.9rem">Deshalb muss sich jeder intensiv mit dem Vorschlag auseinandersetzen. Verfassen Sie in Vorbereitung auf die Abstimmung eine <strong>Erörterung</strong>.</p>
      `)}

      <button id="sp-btn-meinungen" class="btn btn-ol" style="font-size:.88rem;margin-bottom:4px">
        💬 Lesen Sie zunächst folgende Meinungsäußerungen:
      </button>

      <div id="sp-box-meinungen" style="display:none;margin-top:10px">
        ${SPRECHBLASEN.map((s, i) => {
          const voted = S.votes[i];
          return `
          <div style="margin-bottom:16px">
            <div style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;
                        background:rgba(128,128,128,.07);border-radius:12px;border:1.5px solid rgba(128,128,128,.15)">
              <span style="font-size:1.4rem;line-height:1.2">${s.icon}</span>
              <p style="font-size:.9rem;font-style:italic;margin:0;flex:1">&bdquo;${s.text}&ldquo;</p>
            </div>
            <div style="margin-top:6px;display:flex;align-items:center;gap:8px;padding-left:4px">
              <button id="sp-vote-pro-${i}" class="btn btn-ol" style="font-size:.75rem;
                ${voted === 'pro' ? 'background:#16a34a22;color:#16a34a;border-color:#16a34a;' : ''}">👍 Pro</button>
              <button id="sp-vote-contra-${i}" class="btn btn-ol" style="font-size:.75rem;
                ${voted === 'contra' ? 'background:#ef444422;color:#ef4444;border-color:#ef4444;' : ''}">👎 Contra</button>
              <span id="sp-vote-conf-${i}" style="font-size:.75rem;font-weight:700;
                color:${voted === 'pro' ? '#16a34a' : '#ef4444'};
                display:${voted ? 'inline' : 'none'}">
                ${voted === 'pro' ? '✓ Pro' : voted === 'contra' ? '✓ Contra' : ''}
              </span>
            </div>
          </div>`;
        }).join('')}
      </div>

      ${navigation('Los geht\'s →', !allCorrect)}`;
  }

  /* 1 – Einleitung: Schreibanlass */
  function s1() {
    return `
      ${progress(1)}
      ${chip('Einleitung', '#0ea5e9')}
      <h3 style="margin:4px 0 14px">Schreibanlass</h3>
      ${box(`
        <p style="font-size:.82rem;opacity:.7;line-height:1.6;margin-bottom:0">
          Da dieser Vorschlag in Ihrer Klasse kontrovers diskutiert wird, soll darüber abgestimmt werden.
          Deshalb muss sich jeder intensiv mit dem Vorschlag auseinandersetzen.
          Verfassen Sie in Vorbereitung auf die Abstimmung eine Erörterung.
        </p>
      `)}
      ${box(`<p style="font-size:.9rem">Der ${r('Schreibanlass')} erklärt, ${r('warum du schreibst')}. Überlege dir, was der Anlass für den Text ist.</p>`)}
      ${toggleBtn('sp-btn-loesung', '✏️ Musterlösung anzeigen', '✏️', '#8b5cf6')}
      ${toggleBox('sp-box-loesung', `
        <p style="font-size:.78rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Mögliche Stichpunkte:</p>
        <ul style="padding-left:16px;font-size:.88rem;line-height:2.4;margin:0">
          <li>Kommende Abschlussfahrt</li>
          <li>Vorschlag der Eltern und Klassenlehrerin: Verzicht auf digitale Medien während der Fahrt</li>
        </ul>
      `)}
      ${toggleBtn('sp-btn-hilfe', '💡 Hilfe', '💡')}
      ${toggleBox('sp-box-hilfe', `
        <p style="font-weight:600;margin-bottom:6px">💡 Hinweis:</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2;margin:0">
          <li>Der Schreibanlass steht immer im ${grn('ersten Teil der Aufgabenstellung')}.</li>
          <li>${grn('Eine andere Möglichkeit wäre: Abschlussfahrt geplant – Vorschlag: kein Handy – Abstimmung nötig')}</li>
        </ul>
      `)}
      ${navigation()}`;
  }

  /* 2 – Einleitung: Hinführung zum Thema */
  function s2() {
    return `
      ${progress(2)}
      ${chip('Einleitung', '#0ea5e9')}
      <h3 style="margin:4px 0 14px">Hinführung zum Thema</h3>
      ${box(`
        <p style="font-size:.82rem;opacity:.7;line-height:1.6;margin-bottom:0">
          Da dieser Vorschlag in Ihrer Klasse kontrovers diskutiert wird, soll darüber abgestimmt werden.
          Deshalb muss sich jeder intensiv mit dem Vorschlag auseinandersetzen.
          Verfassen Sie in Vorbereitung auf die Abstimmung eine Erörterung.
        </p>
      `)}
      ${box(`
        <p style="font-size:.9rem">Eine ${r('Hinführung')} gibt dem Leser Informationen, warum du jetzt schreibst und wie du vorgehst. Überlege dir einen möglichen Schreibanlass.</p>
      `)}
      ${toggleBtn('sp-btn-loesung', '📝 Mögliche Stichpunkte', '📝', '#8b5cf6')}
      ${toggleBox('sp-box-loesung', `
        <p style="font-size:.78rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Mögliche Stichpunkte:</p>
        <ul style="padding-left:16px;font-size:.88rem;line-height:2.4;margin:0">
          <li>${r('Kontroverse Diskussion')} in der Klasse, baldige Abstimmung</li>
        </ul>
      `)}
      ${toggleBtn('sp-btn-hilfe', '💡 Wortspeicher', '💡')}
      ${toggleBox('sp-box-hilfe', `
        <p style="font-weight:600;margin-bottom:8px">💡 Wortspeicher:</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2">
          <li>${grn('Erörterung pro und contra')}</li>
          <li>${grn('Erörterung der Problemfrage')}</li>
          <li>${grn('Darstellung der Diskussion')}</li>
        </ul>
      `)}
      ${navigation()}`;
  }

  /* 3 – These wählen */
  function s3() {
    return `
      ${progress(3)}
      ${chip('Hauptteil – These', '#8b5cf6')}
      <h3 style="margin:4px 0 14px">Wähle deine These</h3>
      ${box(`<p style="font-size:.87rem;opacity:.65;margin-bottom:12px">Entscheide: Welche Position vertrittst du in deiner Erörterung? Klicke an.</p>
        <div id="sp-these-a" style="padding:14px;border-radius:10px;border:2px solid rgba(128,128,128,.25);cursor:pointer;margin-bottom:10px;transition:all .2s">
          <p style="font-size:.73rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">These A</p>
          <p style="font-size:.9rem;line-height:1.45">${THESE_A}</p>
        </div>
        <div id="sp-these-b" style="padding:14px;border-radius:10px;border:2px solid rgba(128,128,128,.25);cursor:pointer;transition:all .2s">
          <p style="font-size:.73rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">These B</p>
          <p style="font-size:.9rem;line-height:1.45">${THESE_B}</p>
        </div>
      `)}
      <div id="sp-these-hint" style="display:none;text-align:center;margin-top:8px;font-size:.85rem;font-weight:700;color:#16a34a"></div>
      <div style="display:flex;justify-content:center;gap:12px;margin-top:22px">
        <button id="sp-zurueck" class="btn btn-ol" style="min-width:120px">← Zurück</button>
        <button id="sp-weiter" class="btn btn-dk" style="min-width:170px;opacity:.35;cursor:not-allowed" disabled>Weiter →</button>
      </div>`;
  }

  /* 4 / 6 – Argumente (These / Gegenthese) – beide Sprechblasen nebeneinander */
  function sArgBoth(isThese) {
    const stepN            = isThese ? 4 : 6;
    const theseText        = S.these === 'A' ? THESE_A : THESE_B;
    const gegenText        = S.these === 'A' ? THESE_B : THESE_A;
    const currentArgs      = isThese
      ? (S.these === 'A' ? ARGS_A : ARGS_B)
      : (S.these === 'A' ? ARGS_B : ARGS_A);
    const currentTheseText = isThese ? theseText : gegenText;
    const label            = isThese ? 'Hauptteil – These' : 'Hauptteil – Gegenthese';
    const argColor         = isThese ? '#8b5cf6' : '#f59e0b';
    const stepKey          = String(stepN);
    const choices          = S.argChoices[stepKey] || {};
    const bothDone         = choices[0] && choices[0].opt !== undefined && choices[0].belCorrect === true
                          && choices[1] && choices[1].opt !== undefined && choices[1].belCorrect === true;

    const renderBubble = (a, ai) => {
      const c         = choices[ai] || {};
      const chosenOpt = c.opt;
      const chosenBel = c.bel;
      return `
      <div style="display:flex;flex-direction:column;gap:10px">
        <div id="sp-bubble-${ai}" data-bubble="${ai}"
          style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;
                 background:rgba(128,128,128,.07);border-radius:12px;cursor:pointer;
                 border:2px solid ${chosenOpt !== undefined ? '#6366f1' : 'rgba(128,128,128,.18)'};
                 transition:border-color .2s">
          <span style="font-size:1.4rem;line-height:1.2">${a.bubble.icon}</span>
          <p style="font-size:.9rem;font-style:italic;margin:0;flex:1">&bdquo;${a.bubble.text}&ldquo;</p>
        </div>
        <div id="sp-args-${ai}"
          style="display:${chosenOpt !== undefined ? 'block' : 'none'};padding:10px 12px;
                 background:rgba(99,102,241,.04);border-radius:8px;border:1px solid ${argColor}33">
          <p style="font-size:.78rem;font-weight:800;margin-bottom:8px">➜ Argument wählen:</p>
          ${a.args.map((arg, oi) => {
            const isChosen = chosenOpt === oi;
            return `
            <div data-bub="${ai}" data-opt="${oi}" data-color="${argColor}"
              style="padding:8px 12px;border-radius:8px;cursor:pointer;margin-bottom:6px;
                     font-size:.87rem;font-weight:600;color:${argColor};transition:all .2s;
                     border:2px solid ${isChosen ? argColor : 'rgba(128,128,128,.2)'};
                     background:${isChosen ? argColor + '11' : ''}">
              ➜ ${arg}
            </div>`;
          }).join('')}
          <div id="sp-beleg-area-${ai}"
            style="display:${chosenOpt !== undefined ? 'block' : 'none'};
                   margin-top:12px;padding-top:10px;border-top:1px solid ${argColor}22">
            <p style="font-size:.78rem;font-weight:800;margin-bottom:6px">➜ Beleg / Beispiel wählen <span style="font-size:.72rem;font-weight:400;opacity:.6">(wähle eine richtige Antwort)</span>:</p>
            ${a.belege.map((bel, bi) => {
              const isBelChosen = chosenBel === bi;
              const isCorrect   = bel.correct;
              const chosenColor = isBelChosen ? (isCorrect ? '#16a34a' : '#ef4444') : 'rgba(128,128,128,.2)';
              return `
              <div data-belbub="${ai}" data-belopt="${bi}" data-color="${argColor}"
                data-correct="${bel.correct}" data-explanation="${bel.correct ? '' : (bel.explanation || '')}"
                style="padding:8px 12px;border-radius:8px;cursor:pointer;margin-bottom:6px;
                       font-size:.85rem;color:#374151;transition:all .2s;
                       border:2px solid ${isBelChosen ? chosenColor : 'rgba(128,128,128,.2)'};
                       background:${isBelChosen ? (isCorrect ? '#16a34a11' : '#ef444411') : ''}">
                ➜ ${bel.text}
                ${isBelChosen && !isCorrect ? `<div style="margin-top:6px;font-size:.8rem;font-weight:600;color:#ef4444">${bel.explanation}</div>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
    };

    return `
      ${progress(stepN)}
      ${chip(label, argColor)}
      <h3 style="margin:4px 0 6px">Argumente</h3>
      ${box(`
        <p style="font-size:.75rem;opacity:.5;margin-bottom:4px">${isThese ? 'Deine These' : 'Gegenthese'}</p>
        <p style="font-size:.87rem;font-style:italic;line-height:1.45">${currentTheseText}</p>
      `)}
      <p style="font-size:.82rem;font-weight:700;margin:10px 0 8px;opacity:.7">Klicke eine Sprechblase an, wähle ein Argument und dann einen Beleg:</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:6px">
        <div>${renderBubble(currentArgs[0], 0)}</div>
        <div>${renderBubble(currentArgs[1], 1)}</div>
      </div>
      ${navigation('Weiter →', !bothDone)}`;
  }

  /* 5 / 7 – Eigenes Argument (These / Gegenthese) */
  function sEigen(isThese) {
    const stepN        = isThese ? 5 : 7;
    const theseText    = S.these === 'A' ? THESE_A : THESE_B;
    const gegenText    = S.these === 'A' ? THESE_B : THESE_A;
    const eigeneListe  = isThese
      ? (S.these === 'A' ? EIGENE_A : EIGENE_B)
      : (S.these === 'A' ? EIGENE_B : EIGENE_A);
    const eigenFalsch  = isThese
      ? (S.these === 'A' ? EIGENE_A_FALSCH : EIGENE_B_FALSCH)
      : (S.these === 'A' ? EIGENE_B_FALSCH : EIGENE_A_FALSCH);
    const theseLabel   = isThese ? theseText : gegenText;
    const label        = isThese ? 'Hauptteil – These' : 'Hauptteil – Gegenthese';
    const argColor     = isThese ? '#8b5cf6' : '#f59e0b';
    const stepKey      = 'eigen' + stepN;
    const sel          = (S.argChoices[stepKey] || {}).sel;

    // Alle 4 Optionen mischen: 3 richtige + 1 falsche (immer an Position 2, also Index 2)
    const alleOptionen = [
      { text: eigeneListe[0], correct: true,  idx: 0 },
      { text: eigeneListe[1], correct: true,  idx: 1 },
      { text: eigenFalsch.text, correct: false, idx: 2, explanation: eigenFalsch.explanation },
      { text: eigeneListe[2], correct: true,  idx: 3 },
    ];

    return `
      ${progress(stepN)}
      ${chip(label, argColor)}
      <h3 style="margin:4px 0 6px">Eigenes Argument</h3>
      ${box(`
        <p style="font-size:.75rem;opacity:.5;margin-bottom:4px">${isThese ? 'Deine These' : 'Gegenthese'}</p>
        <p style="font-size:.87rem;font-style:italic;line-height:1.45">${theseLabel}</p>
      `)}
      ${box(`<p style="font-size:.9rem">Formuliere jetzt ein ${r('eigenes Argument')} und stütze es mit einem Beleg aus deinem ${r('Alltag oder eigenen Erfahrungen')}.</p>`)}
      <p style="font-size:.82rem;font-weight:700;margin:10px 0 8px;opacity:.7">Welches ist ein passendes Argument? Klicke an:</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
        ${alleOptionen.map(opt => {
          const isChosen   = sel === opt.idx;
          const chosenColor = isChosen ? (opt.correct ? '#16a34a' : '#ef4444') : 'rgba(128,128,128,.2)';
          const bgColor     = isChosen ? (opt.correct ? '#16a34a11' : '#ef444411') : '';
          return `
          <div data-eigen="${stepKey}" data-eigen-idx="${opt.idx}"
               data-correct="${opt.correct}" data-explanation="${opt.correct ? '' : opt.explanation}"
               style="padding:10px 14px;border-radius:8px;cursor:pointer;font-size:.87rem;font-weight:600;
                      transition:all .2s;border:2px solid ${chosenColor};background:${bgColor};
                      color:${isChosen ? (opt.correct ? '#16a34a' : '#ef4444') : ''}">
            ➜ ${opt.text}
            ${isChosen && !opt.correct ? `<div style="margin-top:6px;font-size:.8rem;font-weight:400;color:#ef4444;line-height:1.5">${opt.explanation}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
      ${navigation()}`;
  }

  /* 11 – Schluss: Persönliche Meinung */
  function s11() {
    return `
      ${progress(11)}
      ${chip('Schluss', '#16a34a')}
      <h3 style="margin:4px 0 14px">Persönliche Meinung</h3>
      ${box(`<p style="font-size:.9rem">Im Schluss formulierst du deine ${r('eigene, persönliche Meinung')} zum Thema. Welche Seite überzeugt dich mehr? Und warum? Notiere stichwortartig.</p>`)}
      ${toggleBtn('sp-btn-loesung', '✏️ Musterlösung anzeigen', '✏️', '#8b5cf6')}
      ${toggleBox('sp-box-loesung', `
        <p style="font-size:.78rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Mögliche Stichpunkte (Beispiel These B):</p>
        <ul style="padding-left:16px;font-size:.88rem;line-height:2.4;margin:0">
          <li>Verzicht auf digitale Medien ${r('nicht sinnvoll')}</li>
          <li>Sicherheit und Erreichbarkeit ${r('wichtiger')} als Ablenkungsfreiheit</li>
          <li>Kompromiss wäre ${r('sinnvoller')} als vollständiges Verbot</li>
        </ul>
      `)}
      ${toggleBtn('sp-btn-hilfe', '💡 Formulierungshilfen für deinen Text', '💡')}
      ${toggleBox('sp-box-hilfe', `
        <p style="font-weight:600;margin-bottom:8px">Formulierungshilfen für deinen Text</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2;margin:0">
          <li>${grn('<em>„Meiner Meinung nach …"</em>')}</li>
          <li>${grn('<em>„Ich bin der Ansicht, dass …"</em>')}</li>
          <li>${grn('<em>„Alles in allem glaube ich, dass …"</em>')}</li>
        </ul>
      `)}
      ${navigation()}`;
  }

  /* 12 – Fazit */
  function s12() {
    const allProArgs = [
      ...ARGS_A[0].args.map(a => ({ text: a, side: 'pro' })),
      ...ARGS_A[1].args.map(a => ({ text: a, side: 'pro' })),
    ];
    const allContraArgs = [
      ...ARGS_B[0].args.map(a => ({ text: a, side: 'contra' })),
      ...ARGS_B[1].args.map(a => ({ text: a, side: 'contra' })),
    ];
    const allArgs = [...allProArgs, ...allContraArgs];
    const sel = S.fazitSel || [];

    return `
      ${progress(12)}
      ${chip('Schluss', '#16a34a')}
      <h3 style="margin:4px 0 14px">Fazit</h3>
      ${box(`<p style="font-size:.9rem">Hier sollst du nochmal die für dich ${r('stärksten Argumente')} nennen. Wähle 1–2 Argumente aus der Liste:</p>`)}
      <div style="margin-bottom:12px">
        ${allArgs.map((a, i) => {
          const isPro    = a.side === 'pro';
          const isChosen = sel.includes(i);
          const sign     = isPro ? '+' : '−';
          const color    = isPro ? '#16a34a' : '#ef4444';
          return `
          <div data-fazit-idx="${i}"
            style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;
                   cursor:pointer;margin-bottom:7px;transition:all .2s;font-size:.87rem;
                   border:2px solid ${isChosen ? color : 'rgba(128,128,128,.2)'};
                   background:${isChosen ? color + '11' : ''}">
            <span style="font-size:1rem;font-weight:800;color:${color};min-width:16px">${sign}</span>
            <span>${a.text}</span>
          </div>`;
        }).join('')}
      </div>
      <p id="sp-fazit-hint" style="font-size:.8rem;color:#ef4444;display:${sel.length === 0 ? 'block' : 'none'};margin-bottom:8px">Bitte wähle mindestens 1 Argument.</p>
      ${toggleBtn('sp-btn-loesung', '✏️ Musterlösung anzeigen', '✏️', '#8b5cf6')}
      ${toggleBox('sp-box-loesung', `
        <p style="font-size:.78rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Mögliche Stichpunkte:</p>
        <ul style="padding-left:16px;font-size:.88rem;line-height:2.4;margin:0">
          <li>Argumente ${r('beider Seiten')} nachvollziehbar</li>
          <li>Sicherheit und Erreichbarkeit ${r('wiegen schwerer')}</li>
          <li>vollständiger Verzicht → ${r('zu einschränkend')}</li>
        </ul>
      `)}
      ${toggleBtn('sp-btn-hilfe', '💡 Formulierungshilfen für deinen Text', '💡')}
      ${toggleBox('sp-box-hilfe', `
        <p style="font-weight:600;margin-bottom:8px">Formulierungshilfen für deinen Text</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2;margin:0">
          <li>${grn('<em>„Zusammenfassend lässt sich sagen, dass …"</em>')}</li>
          <li>${grn('<em>„Die Argumente zeigen deutlich, dass …"</em>')}</li>
          <li>${grn('<em>„Insgesamt überwiegen die Argumente für/gegen …"</em>')}</li>
        </ul>
      `)}
      ${navigation('Weiter →', sel.length === 0)}`;
  }

  /* 13 – Empfehlung */
  function s13() {
    return `
      ${progress(13)}
      ${chip('Schluss', '#16a34a')}
      <h3 style="margin:4px 0 14px">Empfehlung</h3>
      ${box(`<p style="font-size:.9rem">Formuliere eine klare ${r('Empfehlung')}: Was soll die Klasse bei der Abstimmung entscheiden? Notiere stichwortartig.</p>`)}
      ${toggleBtn('sp-btn-loesung', '✏️ Musterlösung anzeigen', '✏️', '#8b5cf6')}
      ${toggleBox('sp-box-loesung', `
        <p style="font-size:.78rem;font-weight:700;opacity:.5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Mögliche Stichpunkte:</p>
        <ul style="padding-left:16px;font-size:.88rem;line-height:2.4;margin:0">
          <li>Empfehlung: ${r('Kompromiss')} statt Totalverbot</li>
          <li>z. B. Handynutzung nur in der Freizeit erlauben</li>
          <li>Gemeinschaftserlebnisse ${r('und')} Sicherheit vereinbar</li>
        </ul>
      `)}
      ${toggleBtn('sp-btn-hilfe', '💡 Hilfe', '💡')}
      ${toggleBox('sp-box-hilfe', `
        <p style="font-weight:600;margin-bottom:8px">💡 Empfehlung formulieren:</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2;margin:0">
          <li>${grn('<em>„Ich empfehle daher, …"</em>')}</li>
          <li>${grn('<em>„Deshalb sollte die Klasse …"</em>')}</li>
          <li>${grn('<em>„Mein Rat: …"</em>')}</li>
        </ul>
      `)}
      ${navigation('Zu den Tipps →')}`;
  }

  /* 14 – Tipps */
  function s14() {
    return `
      ${progress(14)}
      <h3 style="margin-bottom:16px">📋 Wichtige Tipps für die Erörterung</h3>
      ${box(`<p style="font-weight:700;margin-bottom:10px">✅ Hinweis zum Schreibplan</p>
        <ul style="padding-left:16px;font-size:.87rem;line-height:2;margin:0">
          <li>Schreibpläne sind in ${r('Stichworten')} – kein Fließtext nötig</li>
          <li>Rechtschreibfehler führen im Schreibplan ${r('nicht zum Punktabzug')}</li>
          <li>Die persönliche Meinung gehört nur in den ${r('Schluss')}</li>
        </ul>`)}
      ${navigation('Fertig! 🎉')}`;
  }

  /* 15 – Viel Erfolg */
  function s15() {
    return `
      <div style="text-align:center;padding:36px 20px">
        <div style="font-size:3rem;margin-bottom:14px">🎉</div>
        <h2 style="font-size:1.5rem;margin-bottom:8px">Viel Erfolg!</h2>
        <p style="opacity:.55;font-size:.9rem;margin-bottom:20px">Du hast alle Schritte des Schreibplans durchgearbeitet.</p>
        ${box(`
          <p style="font-size:.85rem;font-weight:700;margin-bottom:10px;text-align:left">Dein Schreibplan enthält:</p>
          <ul style="padding-left:16px;font-size:.85rem;line-height:2.1;text-align:left;margin:0">
            <li>${grn('✅')} Einleitung: Schreibanlass + Hinführung</li>
            <li>${grn('✅')} These mit Argumenten + Belegen</li>
            <li>${grn('✅')} Gegenthese mit Argumenten + Belegen</li>
            <li>${grn('✅')} Schluss: Fazit + Persönliche Meinung + Empfehlung</li>
          </ul>
        `)}
        <button id="sp-weiter" class="btn btn-ol" style="margin-top:6px">↺ Nochmal von vorne</button>
      </div>`;
  }

  /* ═══════════════════════════════════════════════════════════
     ROUTER
     ═══════════════════════════════════════════════════════════ */
  function getHTML(n) {
    switch (n) {
      case 0:  return s0();
      case 1:  return s1();
      case 2:  return s2();
      case 3:  return s3();
      case 4:  return sArgBoth(true);
      case 5:  return sEigen(true);
      case 6:  return sArgBoth(false);
      case 7:  return sEigen(false);
      case 8:  return s12();
      case 9:  return s11();
      case 10: return s13();
      case 11: return s14();
      default: return s15();
    }
  }

  /* ═══════════════════════════════════════════════════════════
     RENDER + EVENTS
     ═══════════════════════════════════════════════════════════ */
  function render() {
    const el = document.getElementById('msa-schreibplan-grid');
    if (!el) return;
    el.innerHTML = getHTML(S.step);
    bindEvents();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindEvents() {

    /* ── Weiter-Button ── */
    const wb = document.getElementById('sp-weiter');
    if (wb) wb.addEventListener('click', () => {
      if (S.step >= TOTAL) {
        S.step = 0; S.these = null; S.votes = {}; S.argChoices = {}; S.fazitSel = [];
      } else {
        S.step++;
      }
      render();
    });

    /* ── Zurück-Button ── */
    const zb = document.getElementById('sp-zurueck');
    if (zb) zb.addEventListener('click', () => {
      if (S.step > 0) { S.step--; render(); }
    });

    /* ── Generische Toggle-Buttons ── */
    [
      ['sp-btn-anlass',   'sp-btn-anlass-box'],
      ['sp-btn-hilfe',    'sp-box-hilfe'],
      ['sp-btn-sb',       'sp-box-sb'],
      ['sp-btn-ideen',    'sp-box-ideen'],
      ['sp-btn-loesung',  'sp-box-loesung'],
    ].forEach(([btnId, boxId]) => {
      const btn = document.getElementById(btnId);
      const bx  = document.getElementById(boxId);
      if (btn && bx) btn.addEventListener('click', () => {
        bx.style.display = bx.style.display !== 'none' ? 'none' : 'block';
      });
    });

    /* ── Meinungsäußerungen Toggle (Schritt 0) ── */
    const mBtn = document.getElementById('sp-btn-meinungen');
    const mBox = document.getElementById('sp-box-meinungen');
    if (mBtn && mBox) mBtn.addEventListener('click', () => {
      mBox.style.display = mBox.style.display !== 'none' ? 'none' : 'block';
    });

    /* ── Pro / Contra Abstimmung (Schritt 0) ── */
    // Richtige Antworten: 0+1 = contra (Fotos, Notfall → sprechen gegen Verzicht),
    //                     2+3 = pro    (Gesellschaftsspiele, Gespräche → sprechen für Verzicht)
    const CORRECT_VOTES = { 0: 'contra', 1: 'contra', 2: 'pro', 3: 'pro' };

    SPRECHBLASEN.forEach((_, i) => {
      const proBtn    = document.getElementById(`sp-vote-pro-${i}`);
      const contraBtn = document.getElementById(`sp-vote-contra-${i}`);

      const applyVote = (choice) => {
        S.votes[i] = choice;
        const correct = choice === CORRECT_VOTES[i];

        // Farbe: grün wenn richtig, rot wenn falsch
        const choiceColor = correct ? '#16a34a' : '#ef4444';

        if (proBtn) {
          proBtn.style.background  = choice === 'pro' ? choiceColor + '22' : '';
          proBtn.style.color       = choice === 'pro' ? choiceColor        : '';
          proBtn.style.borderColor = choice === 'pro' ? choiceColor        : '';
        }
        if (contraBtn) {
          contraBtn.style.background  = choice === 'contra' ? choiceColor + '22' : '';
          contraBtn.style.color       = choice === 'contra' ? choiceColor        : '';
          contraBtn.style.borderColor = choice === 'contra' ? choiceColor        : '';
        }

        const conf = document.getElementById(`sp-vote-conf-${i}`);
        if (conf) {
          conf.style.display = 'inline';
          conf.style.color   = choiceColor;
          conf.textContent   = correct
            ? (choice === 'pro' ? '✓ Pro' : '✓ Contra')
            : (choice === 'pro' ? '✗ Pro' : '✗ Contra');
        }

        // Weiter erst wenn alle vier richtig bewertet wurden
        const allCorrect = Object.keys(S.votes).length >= 4
          && Object.entries(S.votes).every(([k, v]) => v === CORRECT_VOTES[parseInt(k)]);
        const wbBtn = document.getElementById('sp-weiter');
        if (wbBtn) {
          wbBtn.disabled      = !allCorrect;
          wbBtn.style.opacity = allCorrect ? '1' : '.35';
          wbBtn.style.cursor  = allCorrect ? 'pointer' : 'not-allowed';
        }
      };

      if (proBtn)    proBtn.addEventListener('click',    () => applyVote('pro'));
      if (contraBtn) contraBtn.addEventListener('click', () => applyVote('contra'));
    });

    /* ── These-Auswahl (Schritt 3) ── */
    const elA     = document.getElementById('sp-these-a');
    const elB     = document.getElementById('sp-these-b');
    const hint    = document.getElementById('sp-these-hint');
    const wbThese = document.getElementById('sp-weiter');

    const pickThese = (choice) => {
      S.these = choice;
      if (elA) elA.style.border = choice === 'A' ? '2px solid #6366f1' : '2px solid rgba(128,128,128,.25)';
      if (elB) elB.style.border = choice === 'B' ? '2px solid #6366f1' : '2px solid rgba(128,128,128,.25)';
      if (hint) { hint.style.display = 'block'; hint.textContent = `✓ These ${choice} ausgewählt`; }
      if (wbThese) { wbThese.disabled = false; wbThese.style.opacity = '1'; wbThese.style.cursor = 'pointer'; }
    };
    if (elA) elA.addEventListener('click', () => pickThese('A'));
    if (elB) elB.addEventListener('click', () => pickThese('B'));

    /* ── Klickbare Sprechblasen in Argument-Schritten ── */
    document.querySelectorAll('[data-bubble]').forEach(bEl => {
      bEl.addEventListener('click', () => {
        const ai      = parseInt(bEl.getAttribute('data-bubble'));
        const argsDiv = document.getElementById(`sp-args-${ai}`);
        if (!argsDiv) return;
        const isOpen  = argsDiv.style.display !== 'none';
        argsDiv.style.display = isOpen ? 'none' : 'block';
        bEl.style.borderColor = isOpen ? 'rgba(128,128,128,.18)' : '#6366f1';
      });
    });

    /* ── Argument-Option wählen ── */
    document.querySelectorAll('[data-bub][data-opt]').forEach(optEl => {
      optEl.addEventListener('click', () => {
        const bub      = parseInt(optEl.getAttribute('data-bub'));
        const opt      = parseInt(optEl.getAttribute('data-opt'));
        const argColor = optEl.getAttribute('data-color') || '#8b5cf6';
        const stepKey  = String(S.step);
        if (!S.argChoices[stepKey]) S.argChoices[stepKey] = {};
        const prev = S.argChoices[stepKey][bub] || {};
        S.argChoices[stepKey][bub] = { opt, bel: prev.bel };

        // Reset + highlight nur innerhalb dieser Blase
        document.querySelectorAll(`[data-bub="${bub}"][data-opt]`).forEach(o => {
          o.style.borderColor = 'rgba(128,128,128,.2)';
          o.style.background  = '';
        });
        optEl.style.borderColor = argColor;
        optEl.style.background  = argColor + '11';

        // Beleg-Bereich einblenden
        const belegArea = document.getElementById(`sp-beleg-area-${bub}`);
        if (belegArea) belegArea.style.display = 'block';

        // Bubble-Rahmen aktiv
        const bubEl = document.getElementById(`sp-bubble-${bub}`);
        if (bubEl) bubEl.style.borderColor = '#6366f1';

        // Weiter prüfen
        _checkBothDone(stepKey);
      });
    });

    /* ── Beleg-Option wählen ── */
    document.querySelectorAll('[data-belbub][data-belopt]').forEach(belEl => {
      belEl.addEventListener('click', () => {
        const bub         = parseInt(belEl.getAttribute('data-belbub'));
        const belopt      = parseInt(belEl.getAttribute('data-belopt'));
        const argColor    = belEl.getAttribute('data-color') || '#8b5cf6';
        const isCorrect   = belEl.getAttribute('data-correct') === 'true';
        const explanation = belEl.getAttribute('data-explanation') || '';
        const stepKey     = String(S.step);
        if (!S.argChoices[stepKey]) S.argChoices[stepKey] = {};
        const prev = S.argChoices[stepKey][bub] || {};
        S.argChoices[stepKey][bub] = { ...prev, bel: belopt, belCorrect: isCorrect };

        // Reset alle Beleg-Optionen dieser Blase
        document.querySelectorAll(`[data-belbub="${bub}"][data-belopt]`).forEach(o => {
          o.style.borderColor = 'rgba(128,128,128,.2)';
          o.style.background  = '';
          // Erklärungstext entfernen
          const exDiv = o.querySelector('.bel-explanation');
          if (exDiv) exDiv.remove();
        });

        // Gewählte Option einfärben
        const chosenColor = isCorrect ? '#16a34a' : '#ef4444';
        belEl.style.borderColor = chosenColor;
        belEl.style.background  = chosenColor + '11';

        // Bei falscher Antwort: Erklärung einblenden
        if (!isCorrect && explanation) {
          const exDiv = document.createElement('div');
          exDiv.className = 'bel-explanation';
          exDiv.style.cssText = 'margin-top:6px;font-size:.8rem;font-weight:600;color:#ef4444';
          exDiv.textContent = explanation;
          belEl.appendChild(exDiv);
        }

        // Weiter prüfen
        _checkBothDone(stepKey);
      });
    });

    /* ── Eigene Argumente: klickbare Optionen ── */
    document.querySelectorAll('[data-eigen]').forEach(el => {
      el.addEventListener('click', () => {
        const stepKey    = el.getAttribute('data-eigen');
        const idx        = parseInt(el.getAttribute('data-eigen-idx'));
        if (!S.argChoices[stepKey]) S.argChoices[stepKey] = {};
        S.argChoices[stepKey].sel = idx;
        render();
      });
    });

    /* ── Fazit: stärkste Argumente wählen ── */
    document.querySelectorAll('[data-fazit-idx]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-fazit-idx'));
        if (!S.fazitSel) S.fazitSel = [];
        const pos = S.fazitSel.indexOf(idx);
        if (pos !== -1) {
          S.fazitSel.splice(pos, 1);
        } else if (S.fazitSel.length < 2) {
          S.fazitSel.push(idx);
        }
        // Re-render nur diesen Schritt
        render();
      });
    });
  }

  function _checkBothDone(stepKey) {
    const c = S.argChoices[stepKey] || {};
    const done = c[0] && c[0].opt !== undefined && c[0].belCorrect === true
              && c[1] && c[1].opt !== undefined && c[1].belCorrect === true;
    const wbBtn = document.getElementById('sp-weiter');
    if (wbBtn) {
      wbBtn.disabled      = !done;
      wbBtn.style.opacity = done ? '1' : '.35';
      wbBtn.style.cursor  = done ? 'pointer' : 'not-allowed';
    }
  }

  /* ═══════════════════════════════════════════════════════════
     INITIALISIERUNG
     ═══════════════════════════════════════════════════════════ */
  function init() {
    S.step       = 0;
    S.these      = null;
    S.votes      = {};
    S.argChoices = {};
    S.fazitSel   = [];
    render();
  }

  window._initMsaSchreibplan = init;

  // MutationObserver: initialisiert sobald das Panel sichtbar wird.
  // Der Tab-Klick wird von switchAreaTab in quiz-logik.js behandelt.
  (function watchPanel() {
    var panel = document.getElementById('msa-panel-schreibplan');
    if (!panel) return;

    var observer = new MutationObserver(function () {
      var visible = panel.style.display !== 'none' && panel.style.display !== '';
      if (visible) {
        var grid = document.getElementById('msa-schreibplan-grid');
        if (grid && !grid.children.length) init();
      }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['style'] });
  })();

})();
