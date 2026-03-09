// ================================================================
// BBR-EXTRA-WIEDER.JS – Zusatzaufgaben: wieder / wider
//
// Variable: BBR_WIEDER_THEMES  (Array mit Themen)
// Wird in index.html per concat() an die BBR-Themen angehängt.
//
// Neue Themen hier einfach als Objekte hinzufügen:
//   { id: "bbr_wieder_...", title: "...", emoji: "...", color: "...", qs: [...] }
// ================================================================

var BBR_WIEDER_THEMES = [

  // ─────────────────────────────────────────────────────────────
  // Thema 1: wieder / wider – Grundlagen
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_wieder_grundlagen",
    title: "wieder / wider – Grundlagen",
    emoji: "🔄",
    color: "#0e7490",
    qs: [
      {
        sub: "wieder oder wider? – Grundübung",
        type: "cross",
        q: "wieder (= erneut / zurück) oder wider (= gegen)?",
        rows: [
          "Er kommt ___ nach Hause.",
          "Das geht ___ meinen Willen.",
          "Sie spielen ___ zusammen.",
          "Das spricht ___ die Abmachung.",
          "Ich sehe dich ___ morgen."
        ],
        cols: ["wieder", "wider"],
        correct: [0, 1, 0, 1, 0],
        model: "wieder = erneut/zurück; wider = gegen/entgegen",
        rule: "<div class=rbox><b>Merkhilfe:</b> <span class=hl>wieder</span> → 'noch einmal' oder 'zurück' (Zeit/Wiederholung). <span class=hl>wider</span> → 'gegen' / 'entgegen' (kann man oft durch 'gegen' ersetzen).</div>"
      },
      {
        sub: "Komposita mit wieder / wider",
        type: "cross",
        q: "Welches Wort passt in die Zusammensetzung?",
        rows: [
          "___spruch (= Einwand, Gegenrede)",
          "___sehen (= erneut treffen)",
          "___holen (= nochmals tun)",
          "___stand (= Widerstand leisten)",
          "___gabe (= Inhalt zurückgeben)"
        ],
        cols: ["wieder", "wider"],
        correct: [1, 0, 0, 1, 0],
        model: "Widerspruch, Widerstand = wider; Wiedersehen, Wiederholen, Wiedergabe = wieder",
        rule: "<div class=rbox>Typische <span class=hl>wider</span>-Komposita: Widerspruch, Widerstand, Widerwille, widerrufen. Typische <span class=hl>wieder</span>-Komposita: Wiederholen, Wiedersehen, Wiedergabe, wiederkehren.</div>"
      }

      // ── Hier weitere Aufgaben ergänzen ───────────────────────
    ]
  }

  // ── Hier weitere Themen als eigene Objekte ergänzen ──────────
];
