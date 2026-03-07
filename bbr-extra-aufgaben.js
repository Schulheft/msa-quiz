// ================================================================
// BBR-EXTRA-AUFGABEN.JS – Zusätzliche Übungsaufgaben für die BBR
// basierend auf der PDF "BBR weitere Aufgaben"
// Enthält 10 Themen mit je 20 Aufgaben (Typ: mc)
// Alle Titel enthalten den Zusatz "(extra)" für die Anzeige.
// ================================================================

var BBR_EXTRA_THEMES = [
  // ─────────────────────────────────────────────────────────────
  // Thema 1: Groß- und Kleinschreibung (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_grossklein",
    title: "Groß- und Kleinschreibung (extra)",
    emoji: "🔠",
    color: "#dc2626",
    qs: [
  {sub:"Nomen großschreiben",type:"cross",
  q:"Entscheide: groß oder klein?",
  rows:["hunde sind treue Tiere – h/H?","meine Schwester mag eis – e/E?","er hat recht – r/R?","sie hat angst vor Spinnen – a/A?","ich wünsche dir gute besserung – b/B?"],
  cols:["groß","klein"],
  correct:[0,0,0,0,0],
  model:"Hunde / Eis / Recht / Angst / Besserung – alles Nomen → groß",
  rule:"<div class=rbox><span class=hl>Nomen</span> werden immer großgeschrieben.</div>"},

  {sub:"Satzanfang & Tageszeiten",type:"cross",
  q:"Entscheide: groß oder klein?",
  rows:["das Buch ist interessant – d/D?","katzen sind beliebte Haustiere – k/K?","nach dem Essen ruhen wir – n/N?","meine Meinung ist wichtig – m/M?","das Wetter ist schön – d/D?"],
  cols:["groß","klein"],
  correct:[0,0,0,0,0],
  model:"Das / Katzen / Nach / Meine / Das – Satzanfang → groß",
  rule:"<div class=rbox>Am <span class=hl>Satzanfang</span> steht der erste Buchstabe groß.</div>"},

  {sub:"Substantivierte Verben & Adjektive",type:"cross",
  q:"Entscheide: groß oder klein?",
  rows:["laufen macht Spaß – l/L?","das ist alles, was ich weiß – a/A?","ich habe neues gelernt – n/N?","wir gehen heute schwimmen – s/S?","sie hat Kannst … – kannst du helfen? – k/K?"],
  cols:["groß","klein"],
  correct:[0,0,0,1,0],
  model:"Laufen (subst. Verb) / Alles (Indefinitpron.) / Neues (subst. Adj.) → groß · schwimmen (Verb bleibt klein) · Kannst (Satzanfang) → groß",
  rule:"<div class=rbox>Substantivierte Verben und Adjektive → <span class=hl>groß</span><br>Verb in Verbgefüge (schwimmen gehen) → <span class=hl>klein</span></div>"},

  {sub:"Tageszeiten & Adverbien",type:"cross",
  q:"Entscheide: groß oder klein?",
  rows:["gestern abend war ich im Kino – a/A?","heute mittag gibt es Suppe – m/M?","wir treffen uns morgen – m/M?","er arbeitet abends oft lange – a/A?","wir fahren in den Urlaub – i/I?"],
  cols:["groß","klein"],
  correct:[0,0,1,1,1],
  model:"Abend (Tageszeit nach gestern) → groß · Mittag (Tageszeit nach heute) → groß · morgen (Adverb) → klein · abends (Adverb) → klein · in (Präposition) → klein",
  rule:"<div class=rbox>Tageszeiten nach heute/gestern/morgen → <span class=hl>groß</span><br>Adverbien (morgen, abends) und Präpositionen (in) → <span class=hl>klein</span></div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 2: Getrennt- und Zusammenschreibung (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_getrennt",
    title: "Getrennt- und Zusammenschreibung (extra)",
    emoji: "🧩",
    color: "#ca8a04",
    qs: [
  {sub:"Verb + gehen / bleiben",type:"cross",
  q:"Getrennt oder zusammen?",
  rows:["Morgen werden wir ___ (einkaufen gehen)","Ich möchte ___ (schlafen gehen)","Wir gehen heute ___ (schwimmen gehen)","Er ist plötzlich ___ (stehen bleiben / stehengeblieben)","Kannst du ___ (wiederkommen)?"],
  cols:["getrennt","zusammen"],
  correct:[0,0,0,1,1],
  model:"einkaufen gehen / schlafen gehen / schwimmen gehen → getrennt (Verb+Verb wörtlich) · stehengeblieben (Partizip) / wiederkommen → zusammen",
  rule:"<div class=rbox>Verb + <em>gehen</em>: wörtliche Bedeutung → <span class=hl>getrennt</span><br>Partizip fester Verben (stehengeblieben) → <span class=hl>zusammen</span></div>"},

  {sub:"Feste Verben",type:"cross",
  q:"Getrennt oder zusammen?",
  rows:["Sie wird ___ (teilnehmen / teil nehmen)","Er will ___ (abnehmen / ab nehmen)","Wir haben ___ (zusammengearbeitet / zusammen gearbeitet)","Ich habe ihn ___ (kennengelernt / kennen gelernt)","Das wird mir ___ (schwerfallen / schwer fallen)"],
  cols:["getrennt","zusammen"],
  correct:[1,1,1,1,1],
  model:"Alle fünf sind feste Zusammensetzungen → zusammen",
  rule:"<div class=rbox>Feste Verb-Verbindungen mit eigener Bedeutung → <span class=hl>zusammen</span><br>(kennenlernen, abnehmen, zusammenarbeiten, teilnehmen, schwerfallen)</div>"},

  {sub:"Substantiv + Verb & freie Verbindungen",type:"cross",
  q:"Getrennt (und ggf. groß) oder zusammen?",
  rows:["Wir müssen ___ (haltmachen / Halt machen)","Er hat ___ (achtgegeben / Acht gegeben)","Das ___ (geht weiter / weitergeht)","Bitte ___ (leer machen / leermachen)","Sie will ___ (Klavier spielen / Klavierspielen)"],
  cols:["getrennt","zusammen"],
  correct:[0,0,0,0,0],
  model:"Halt machen / Acht geben (Subst. + Verb → getrennt, Großschr.) · geht weiter (trennbares Verb) · leer machen (wörtliche Bedeutung) · Klavier spielen (Tätigkeit)",
  rule:"<div class=rbox>Substantiv + Verb → <span class=hl>getrennt</span> + Groß (Halt machen, Acht geben)<br>Wörtliche Bedeutung → <span class=hl>getrennt</span> (leer machen, Klavier spielen)</div>"},

  {sub:"frei sprechen / freisprechen & zurückkommen",type:"cross",
  q:"Getrennt oder zusammen?",
  rows:["Im Vortrag sollte man ___ reden (ohne Manuskript)","Der Angeklagte wurde ___ (für unschuldig erklärt)","Wir werden ___ (zurückkommen)","Das Konzert ___ (stattfinden → findet statt)","Sie muss noch ___ (einkaufen)"],
  cols:["getrennt","zusammen"],
  correct:[0,1,1,1,1],
  model:"frei sprechen (wörtlich) → getrennt · freigesprochen (feste Bedeutung) / zurückkommen / stattfinden / einkaufen → zusammen",
  rule:"<div class=rbox><span class=hl>frei sprechen</span>: ohne Manuskript → getrennt<br><span class=hl>freisprechen</span>: für unschuldig erklären → zusammen<br>Feste trennbare Verben → zusammen (im Infinitiv)</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 3: Zeichensetzung (Kommas) (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_komma",
    title: "Kommasetzung (extra)",
    emoji: "🔍",
    color: "#0f766e",
    qs: [
  {sub:"Nebensatz-Konjunktionen",type:"cross",
  q:"Komma ja oder nein? (markiere die Stelle mit () )",
  rows:["Sie fragt sich () ob sie kommen soll.","Ich hoffe () dass du bald gesund wirst.","Er ist müde () weil er wenig geschlafen hat.","Wir gehen spazieren () wenn das Wetter schön ist.","Ich weiß nicht () ob er kommt."],
  cols:["mit Komma","ohne Komma"],
  correct:[0,0,0,0,0],
  model:"ob / dass / weil / wenn / ob leiten Nebensätze ein → immer Komma davor",
  rule:"<div class=rbox>Vor unterordnenden Konjunktionen (<span class=hl>ob, dass, weil, wenn, obwohl</span> …) steht immer ein Komma.</div>"},

  {sub:"Relativsätze & Appositionen",type:"cross",
  q:"Komma ja oder nein?",
  rows:["Der Mann () der dort steht () ist mein Onkel. [zwei Stellen]","Bitte geben Sie mir das Buch () das auf dem Tisch liegt.","Ich habe ihn () den besten Freund () eingeladen. [zwei Stellen]","Das Haus () in dem ich wohne () ist alt. [zwei Stellen]","Nachdem er gegessen hatte () ging er schlafen."],
  cols:["Komma(s) nötig","kein Komma"],
  correct:[0,0,0,0,0],
  model:"Relativsätze und Appositionen werden in Kommas eingeschlossen. Vorangestellter NS → Komma nach ihm.",
  rule:"<div class=rbox><span class=hl>Relativsätze</span> (der … / das … / in dem …) → einschließen<br><span class=hl>Apposition</span> (den besten Freund) → zwei Kommas<br><span class=hl>Vorangestellter NS</span> → Komma danach</div>"},

  {sub:"Infinitivgruppen & Aufzählungen",type:"cross",
  q:"Komma ja oder nein?",
  rows:["Er arbeitet () um Geld zu verdienen.","Anstatt zu lernen () spielt er am Computer.","Kinder () Jugendliche und Erwachsene sind willkommen.","Er kam () ging und setzte sich.","Wir trafen uns () um ins Kino zu gehen."],
  cols:["mit Komma","ohne Komma"],
  correct:[0,0,0,0,0],
  model:"um…zu / anstatt…zu → Komma · Aufzählung (Komma vor 2. Element, nicht vor letztem und) → Komma",
  rule:"<div class=rbox><span class=hl>Infinitivgruppe</span> mit um/anstatt/ohne + zu → Komma<br><span class=hl>Aufzählung</span>: zwischen jedem Element Komma, außer vor dem letzten <em>und</em></div>"},

  {sub:"aber / und & indirekte Rede",type:"cross",
  q:"Komma ja oder nein?",
  rows:["Sie ist nett () aber manchmal laut.","Wir fahren nach Berlin () und besuchen das Brandenburger Tor.","Er sagte () er komme morgen.","Sie weiß () dass sie Recht hat.","Sie freut sich () dass du da bist."],
  cols:["mit Komma","ohne Komma"],
  correct:[0,1,0,0,0],
  model:"aber → Komma · und (gleiche Aussage, kein eigener HS) → kein Komma · indirekte Rede und dass-Sätze → Komma",
  rule:"<div class=rbox>Vor <span class=hl>aber</span> steht Komma (Entgegensetzung)<br>Vor <span class=hl>und</span> in Hauptsatzreihen steht <em>kein</em> Komma<br>Vor <span class=hl>dass</span> und in indirekter Rede → Komma</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 4: Satzbau (Grammatik) (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_satzbau",
    title: "Satzbau (extra)",
    emoji: "🔗",
    color: "#9333ea",
    qs: [
  {sub:"Verbposition erkennen",type:"cross",
  q:"Wo steht das Verb – an Position 2 (HS) oder am Ende (NS)?",
  rows:["Ich gehe morgen ins Kino.","weil er krank ist","Morgen gehe ich einkaufen.","ob er kommt","Nachdem er gegessen hatte"],
  cols:["Position 2 (Hauptsatz)","am Ende (Nebensatz)"],
  correct:[0,1,0,1,1],
  model:"HS: Verb an Pos. 2 · NS: Verb am Ende",
  rule:"<div class=rbox><span class=hl>Hauptsatz</span>: Verb an Position 2 (Ich <b>gehe</b> / Morgen <b>gehe</b> ich)<br><span class=hl>Nebensatz</span>: Verb am Ende (weil er krank <b>ist</b>)</div>"},

  {sub:"Hauptsatz oder Nebensatz?",type:"cross",
  q:"Hauptsatz (HS) oder Nebensatz (NS)?",
  rows:["weil er krank ist","Er ist krank.","dass du kommst","ging er schlafen","wann er kommt"],
  cols:["Hauptsatz","Nebensatz"],
  correct:[1,0,1,0,1],
  model:"Eingeleitete Sätze mit Verb am Ende = NS · Sätze, die allein stehen können = HS",
  rule:"<div class=rbox><span class=hl>Nebensatz</span>: beginnt mit unterordnender Konjunktion, Verb am Ende<br><span class=hl>Hauptsatz</span>: kann allein stehen, Verb an Pos. 2</div>"},

  {sub:"Korrekte Satzstellung",type:"mc",
  q:"Welche Sätze sind korrekt? (Verb an Pos. 2)\n\n(A) Ich gehe morgen ins Kino.\n(B) Morgen ich gehe ins Kino.\n(C) Morgen gehe ich ins Kino.\n(D) Ich muss morgen früh aufstehen.\n(E) Morgen muss ich früh aufstehen.",
  o:["A, B und C","A, C, D und E","nur A und D","B und E"],
  c:1,
  model:"A, C, D und E sind korrekt – Verb immer an Position 2.",
  rule:"<div class=rbox>Im HS steht das finite Verb <span class=hl>immer an Position 2</span>.<br>Beginnt der Satz mit einer Angabe (Morgen), rückt das Subjekt auf Position 3.</div>"},

  {sub:"Nebensatz-Konjunktionen",type:"cross",
  q:"Welche Konjunktion leitet einen Nebensatz ein?",
  rows:["___ er krank ist, bleibt er zu Hause. → ob oder weil?","Ich weiß nicht, ___ er kommt. → wann oder dann?","___ es regnet, gehen wir spazieren. → Obwohl oder Trotzdem?","Er sagt, er ___ keine Zeit habe. → konjugiertes Verb oder Inifnitiv?","Das Haus, ___ ich wohne, ist alt. → in dem oder das dem?"],
  cols:["korrekt","falsch"],
  correct:[0,0,0,0,0],
  model:"weil (NS) / wann (NS) / Obwohl (NS) / habe (konj. im NS) / in dem (Relativpronomen)",
  rule:"<div class=rbox>NS-Konjunktionen: <span class=hl>weil, ob, wann, obwohl, dass, wenn, nachdem…</span><br>Im NS: Verb am Ende, konjugiert</div>"},

  {sub:"Nebensatz bestimmen",type:"mc",
  q:"Trenne jeweils HS und NS:\n\n(a) ‚Nachdem er gegessen hatte, ging er schlafen.'\n(b) ‚Ich weiß nicht, ob er kommt.'\n(c) ‚Der Hund, der bellt, gehört mir.'\n\nWie viele Nebensätze hat Satz (c)?",
  o:["0","1","2","3"],
  c:1,
  model:"1 Nebensatz: ‚der bellt' (Relativsatz)",
  rule:"<div class=rbox>Relativsätze (der, die, das + Verb am Ende) zählen als Nebensätze.</div>"},

  {sub:"weil-Satz: richtig oder falsch?",type:"cross",
  q:"Korrekt oder nicht?",
  rows:["Weil er krank ist, bleibt er zu Hause.","Weil er ist krank, bleibt er zu Hause.","Ich bin müde, weil ich wenig geschlafen habe.","Ich bin müde, weil ich habe wenig geschlafen.","Er geht ins Kino, weil er den Film sehen will."],
  cols:["korrekt","falsch"],
  correct:[0,1,0,1,0],
  model:"Im NS mit weil steht das Verb am Ende: weil er krank IST / wenig geschlafen HABE / sehen WILL",
  rule:"<div class=rbox>Im <span class=hl>weil</span>-Satz steht das Verb am Ende (Verbendstellung).</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 5: Wortarten erkennen (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_wortarten",
    title: "Wortarten erkennen (extra)",
    emoji: "🔤",
    color: "#2563eb",
    qs: [
  {sub:"Nomen, Verb oder Adjektiv?",type:"cross",
  q:"Bestimme die Wortart:",
  rows:["‚Hund' in ‚Der Hund läuft'","‚läuft'","‚schnell' in ‚Er läuft schnell'","‚schöner' in ‚ein schöner Tag'","‚laufen'"],
  cols:["Nomen","Verb","Adjektiv / Adverb"],
  correct:[0,1,2,2,1],
  model:"Hund=Nomen · läuft/laufen=Verb · schnell=Adverb · schöner=Adjektiv (attr.)",
  rule:"<div class=rbox><span class=hl>Nomen</span>: benennt Dinge/Personen (groß)<br><span class=hl>Verb</span>: drückt Handlung aus<br><span class=hl>Adjektiv/Adverb</span>: beschreibt Eigenschaft oder Art</div>"},

  {sub:"Artikel, Pronomen oder Konjunktion?",type:"cross",
  q:"Bestimme die Wortart:",
  rows:["‚der' in ‚der Hund'","‚dem' in ‚mit dem Auto'","‚die' in ‚die Katze'","‚Ich'","‚sie' (Personalpronomen)"],
  cols:["Artikel","Pronomen","Konjunktion"],
  correct:[0,0,0,1,1],
  model:"der/dem/die = Artikel · Ich/sie = Pronomen",
  rule:"<div class=rbox><span class=hl>Artikel</span>: begleitet Nomen (der, die, das, ein)<br><span class=hl>Pronomen</span>: steht allein statt Nomen (ich, sie, mein, alles)</div>"},

  {sub:"Präposition, Konjunktion oder Adverb?",type:"cross",
  q:"Bestimme die Wortart:",
  rows:["‚und'","‚aber'","‚weil'","‚in' (in der Schule)","‚zu' (zu Hause)"],
  cols:["Präposition","Konjunktion","Adverb"],
  correct:[1,1,1,0,0],
  model:"und/aber=nebenordnende Konjunktion · weil=unterordnende Konjunktion · in/zu=Präposition",
  rule:"<div class=rbox><span class=hl>Konjunktion</span>: verbindet Sätze/Wörter (und, aber, weil, wenn)<br><span class=hl>Präposition</span>: gibt Verhältnisse an, steht vor Nomen (in, zu, mit, für)</div>"},

  {sub:"Adverb, Pronomen oder Adjektiv?",type:"cross",
  q:"Bestimme die Wortart:",
  rows:["‚heute'","‚dort'","‚mein'","‚alles'","‚schneller' in ‚schneller als'"],
  cols:["Adverb","Pronomen","Adjektiv (Komparativ)"],
  correct:[0,0,1,1,2],
  model:"heute/dort=Adverb · mein=Possessivpronomen · alles=Indefinitpronomen · schneller=Adjektiv Komparativ",
  rule:"<div class=rbox><span class=hl>Adverb</span>: unveränderlich, gibt Zeit/Ort an (heute, dort)<br><span class=hl>Possessivpronomen</span>: mein, dein, sein…<br><span class=hl>Indefinitpronomen</span>: alles, nichts, jemand…</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 6: Zeiten der Verben (Zeitformen) (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_zeitformen",
    title: "Zeitformen (extra)",
    emoji: "⏰",
    color: "#16a34a",
    qs: [
  {sub:"Zeitform erkennen (1)",type:"cross",
  q:"Bestimme die Zeitform:",
  rows:["‚Ich gehe zur Schule.'","‚Er spielte Fußball.'","‚Wir haben gegessen.'","‚Nachdem er gegessen hatte, …' – hatte gegessen","‚Er las ein Buch.'"],
  cols:["Präsens","Präteritum","Perfekt","Plusquamperfekt"],
  correct:[0,1,2,3,1],
  model:"gehe=Präsens · spielte/las=Präteritum · haben gegessen=Perfekt · hatte gegessen=Plusquamperfekt",
  rule:"<div class=rbox><span class=hl>Präsens</span>: gehe · <span class=hl>Präteritum</span>: spielte, las · <span class=hl>Perfekt</span>: haben/sein + Part.II · <span class=hl>Plusquamperfekt</span>: hatte/war + Part.II</div>"},

  {sub:"Zeitform erkennen (2)",type:"cross",
  q:"Bestimme die Zeitform:",
  rows:["‚Sie wird morgen kommen.'","‚Ich bin gelaufen.'","‚Er hat geschlafen.'","‚Ich hatte getanzt.'","‚Sie waren gekommen.'"],
  cols:["Perfekt","Plusquamperfekt","Futur I"],
  correct:[2,0,0,1,1],
  model:"wird kommen=Futur I · bin gelaufen/hat geschlafen=Perfekt · hatte getanzt/waren gekommen=Plusquamperfekt",
  rule:"<div class=rbox><span class=hl>Futur I</span>: werden + Infinitiv<br><span class=hl>Perfekt</span>: haben/sein + Part.II<br><span class=hl>Plusquamperfekt</span>: hatte/war + Part.II</div>"},

  {sub:"Hilfsverb & Futur",type:"cross",
  q:"Welches Hilfsverb passt?",
  rows:["‚Er ___ geschwommen.' (Perfekt)","‚Ich ___ gefragt.' (Perfekt)","‚Sie ___ gekommen.' (Plusquamperfekt)","‚Du ___ sehen.' (Futur I)","‚Sie ___ gelacht haben.' (Futur II)"],
  cols:["haben","sein","werden"],
  correct:[1,0,1,2,2],
  model:"geschwommen=sein (Bewegung) · gefragt=haben · gekommen=sein · sehen=werden (Futur) · gelacht haben=werden (Futur II)",
  rule:"<div class=rbox><span class=hl>sein</span>: Verben der Bewegung/Zustandsänderung (laufen, kommen, schwimmen)<br><span class=hl>haben</span>: die meisten anderen Verben<br><span class=hl>werden</span>: Futur I + II</div>"},

  {sub:"Zeitformen bilden",type:"mc",
  q:"Bilde die korrekten Formen:\n(a) Perfekt von ‚Ich spiele.'\n(b) Präteritum von ‚Sie singt.'\n(c) Futur I von ‚Wir lernen.'\n(d) ‚Ich würde kommen.' – welche Zeitform?",
  o:["Ich habe gespielt / Sie sang / Wir werden lernen / Konjunktiv II",
     "Ich gespielt habe / Sie singte / Wir lernen werden / Futur I",
     "Ich habe gespielt / Sie hat gesungen / Wir werden lernen / Futur II",
     "Ich habe gespielt / Sie sang / Wir lernen werden / Konjunktiv I"],
  c:0,
  model:"(a) Ich habe gespielt (b) Sie sang (c) Wir werden lernen (d) Konjunktiv II",
  rule:"<div class=rbox>Perfekt: haben/sein + Part.II · Präteritum stark: sang · Futur I: werden + Inf. · <span class=hl>Konjunktiv II</span>: würde + Inf.</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 7: Fälle (Kasus) (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_faelle",
    title: "Fälle (Kasus) (extra)",
    emoji: "📘",
    color: "#0891b2",
    qs: [
  {sub:"Kasus bestimmen",type:"cross",
  q:"Bestimme den Fall des unterstrichenen Wortes:",
  rows:["Der ‚Hund' bellt. (wer?)","Ich sehe den ‚Hund'. (wen?)","Ich gebe dem ‚Hund' Futter. (wem?)","Das Spielzeug des ‚Hundes' ist neu. (wessen?)","Das Buch gehört dem ‚Mädchen'. (wem?)"],
  cols:["Nominativ","Akkusativ","Dativ","Genitiv"],
  correct:[0,1,2,3,2],
  model:"bellt → Nom. · sehe den → Akk. · gebe dem → Dat. · des Hundes → Gen. · gehört dem → Dat.",
  rule:"<div class=rbox><span class=hl>Nom.</span>: Wer/Was? · <span class=hl>Akk.</span>: Wen/Was? · <span class=hl>Dat.</span>: Wem? · <span class=hl>Gen.</span>: Wessen?</div>"},

  {sub:"Präpositionen + Kasus",type:"cross",
  q:"Welchen Kasus verlangt die Präposition?",
  rows:["‚mit' (mit wem gehst du?)","‚für' (für wen ist das Geschenk?)","‚bei' (sie wohnt bei den Eltern)","‚trotz' (trotz des Regens)","‚wegen' (wegen des Staus)"],
  cols:["Akkusativ","Dativ","Genitiv"],
  correct:[1,0,1,2,2],
  model:"mit/bei → Dativ · für → Akkusativ · trotz/wegen → Genitiv",
  rule:"<div class=rbox><span class=hl>Dativ</span>: mit, bei, nach, von, zu, aus, seit<br><span class=hl>Akkusativ</span>: für, durch, gegen, ohne, um<br><span class=hl>Genitiv</span>: trotz, wegen, während, statt</div>"},

  {sub:"Richtigen Artikel wählen",type:"cross",
  q:"Welcher Artikel ist korrekt?",
  rows:["Ich höre ___ Musik. (hören + Akk., ‚die Musik')","Er hilft ___ Freund. (helfen + Dat., ‚der Freund')","Ich schreibe ___ Brief. (schreiben + Akk., ‚der Brief')","Das Buch gehört ___ Mädchen. (gehören + Dat., ‚das Mädchen')","Er fragt ___ Lehrer. (fragen + Akk., ‚der Lehrer')"],
  cols:["die/der/das (Nominativ)","den/die/das (Akkusativ)","dem/der/dem (Dativ)"],
  correct:[1,2,1,2,1],
  model:"Musik(Akk.)→die · Freund(Dat.)→dem · Brief(Akk.)→den · Mädchen(Dat.)→dem · Lehrer(Akk.)→den",
  rule:"<div class=rbox>Akkusativ m.: <span class=hl>den</span> · Akkusativ f./n.: die/das unverändert<br>Dativ m./n.: <span class=hl>dem</span> · Dativ f.: <span class=hl>der</span></div>"},

  {sub:"als / wie + Kasus & besondere Verben",type:"mc",
  q:"Wähle den richtigen Artikel:\n(a) Er ist größer als ___ Bruder. (der Bruder)\n(b) Ich vertraue ___ Arzt. (vertrauen + Dativ)\n(c) Ich gedenke ___ Verstorbenen. (gedenken + Genitiv)\n(d) Sie ist so alt wie ___ Schwester. (die Schwester)",
  o:["der / dem / der / die","den / dem / des / die","der / dem / der / den","der / den / der / die"],
  c:0,
  model:"(a) der (nach ‚als' gleicher Fall = Nom.) (b) dem (vertrauen + Dat.) (c) der (gedenken + Gen., f.) (d) die (wie + Nom.)",
  rule:"<div class=rbox>Nach <span class=hl>als</span> und <span class=hl>wie</span>: gleicher Fall wie Bezugswort<br><span class=hl>vertrauen</span> + Dativ · <span class=hl>gedenken</span> + Genitiv</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 8: Aktiv und Passiv (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_passiv",
    title: "Aktiv und Passiv (extra)",
    emoji: "⚙️",
    color: "#7c3aed",
    qs: [
  {sub:"Aktiv oder Passiv erkennen",type:"cross",
  q:"Aktiv oder Passiv?",
  rows:["‚Der Lehrer erklärt die Aufgabe.'","‚Die Aufgabe wird erklärt.'","‚Die Kinder werden von der Lehrerin gelobt.'","‚Er las ein Buch.'","‚Das Lied ist gesungen worden.'"],
  cols:["Aktiv","Passiv"],
  correct:[0,1,1,0,1],
  model:"Subjekt handelt selbst → Aktiv · werden/worden + Part.II → Passiv",
  rule:"<div class=rbox><span class=hl>Aktiv</span>: Subjekt führt Handlung aus<br><span class=hl>Passiv</span>: Subjekt erleidet Handlung (werden + Partizip II)</div>"},

  {sub:"Passiv-Zeitformen",type:"cross",
  q:"Welche Passiv-Zeitform liegt vor?",
  rows:["‚Die Tür wurde geöffnet.'","‚Das Lied ist gesungen worden.'","‚Das Auto war repariert worden.'","‚Das wird gemacht werden.'","‚Das Auto ist repariert.' (Ergebnis)"],
  cols:["Präteritum Passiv","Perfekt Passiv","Plusquamperfekt Passiv","Futur I Passiv","Zustandspassiv"],
  correct:[0,1,2,3,4],
  model:"wurde=Prät.Pass. · ist…worden=Perf.Pass. · war…worden=Plusqpf.Pass. · wird…werden=Fut.I · ist repariert=Zustandspassiv",
  rule:"<div class=rbox>Vorgangspassiv: <span class=hl>werden</span> + Part.II<br>Zustandspassiv: <span class=hl>sein</span> + Part.II (beschreibt Ergebnis)</div>"},

  {sub:"Passiv bilden",type:"mc",
  q:"Bilde das Passiv:\n(a) ‚Der Hund beißt den Mann.' → Präsens Passiv\n(b) ‚Der Brief wird geschrieben.' → Präteritum Passiv\n(c) ‚Man sagt, dass er kommt.' → unpersönliches Passiv",
  o:["Der Mann wird gebissen. / Der Brief wurde geschrieben. / Es wird gesagt, dass er kommt.",
     "Der Mann wird beißen. / Der Brief wird geschrieben. / Man wird gesagt.",
     "Der Mann ist gebissen. / Der Brief wurde schreiben. / Er wird gesagt."],
  c:0,
  model:"(a) Der Mann wird gebissen. (b) Der Brief wurde geschrieben. (c) Es wird gesagt, dass er kommt.",
  rule:"<div class=rbox>Passiv: <span class=hl>werden</span> (konj.) + Partizip II<br>Unpersönliches Passiv: ‚es wird gesagt'</div>"},

  {sub:"Täter im Passiv & Aktiv ↔ Passiv",type:"mc",
  q:"Beantworte die Fragen:\n(a) ‚Die Kinder werden von der Lehrerin gelobt.' – Wer lobt?\n(b) Welches Hilfsverb bildet das Passiv?\n(c) Aktiv: ‚Das Haus wird gestrichen.' → Aktiv?\n(d) ‚Mir wurde geholfen.' → Aktiv?",
  o:["Lehrerin / werden / Jemand streicht das Haus. / Jemand half mir.",
     "Kinder / sein / Das Haus streicht. / Ich half jemandem.",
     "Lehrerin / haben / Jemand streicht das Haus. / Mir hilft jemand.",
     "Lehrerin / werden / Das Haus wird streichen. / Jemand half mir."],
  c:0,
  model:"(a) Lehrerin (b) werden (c) Jemand streicht das Haus. (d) Jemand half mir.",
  rule:"<div class=rbox>Täter im Passiv: <span class=hl>von + Dativ</span><br>Passiv-Hilfsverb: <span class=hl>werden</span><br>Aktiv: Akkusativobjekt → Subjekt</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 9: Häufige Rechtschreibprobleme (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_rechtschreibung",
    title: "Häufige Rechtschreibprobleme (extra)",
    emoji: "✏️",
    color: "#b45309",
    qs: [
  {sub:"das oder dass?",type:"cross",
  q:"das oder dass?",
  rows:["Das ist ___ beste Buch. (Artikel)","Ich glaube, ___ er kommt. (Konjunktion)","Das Buch, ___ du mir empfohlen hast, war toll. (Relativpron.)","Er sagte, ___ er morgen kommen würde. (Konjunktion)","Erkläre mir bitte, warum ___ so ist. (Pronomen)"],
  cols:["das","dass"],
  correct:[0,1,0,1,0],
  model:"Artikel/Pronomen/Relativpron. → das · Konjunktion (leitet NS ein) → dass",
  rule:"<div class=rbox>Probe: durch <em>dieses/welches</em> ersetzbar? → <span class=hl>das</span><br>Nicht ersetzbar, leitet NS ein → <span class=hl>dass</span></div>"},

  {sub:"seid / seit & Homophone",type:"cross",
  q:"Wähle das richtige Wort:",
  rows:["___ wann wart ihr hier? (zeitlich)","___ ihr fertig? (Verb ‚sein')","Ich ___ gestern krank. (Präteritum von sein)","Ist das ___? (wahr, echt)","___ Menschen kommen. (größere Anzahl)"],
  cols:["seid","seit","war","wahr","Mehr"],
  correct:[1,0,2,3,4],
  model:"seit (zeitlich) / seid (ihr seid) / war (Verb) / wahr (Adjektiv) / Mehr (Komparativ)",
  rule:"<div class=rbox><span class=hl>seid</span>: 2. P. Pl. von sein (ihr seid)<br><span class=hl>seit</span>: zeitlich (seit wann)<br><span class=hl>war</span>: 1./3. P. Sg. Prät. · <span class=hl>wahr</span>: echt, richtig</div>"},

  {sub:"Homonyme & Verwechslungen",type:"match",
  q:"Ordne die richtige Bedeutung zu:",
  pairs:[["Das ___ ist platt. (Fahrzeug)", "Rad"],["Er gab mir einen guten ___. (Ratschlag)", "Rat"],["Das Kind ist ___ gefallen. (viel oder fiel?)", "viel"],["Er ___ die Treppe hinunter. (Präteritum von fallen)", "fiel"],["Wir fahren mit dem ___. (Wasserfahrzeug)", "Boot"]],
  model:"Rad (Fahrzeug) / Rat (Ratschlag) / viel (Adverb) / fiel (Verb) / Boot",
  rule:"<div class=rbox>Homophone unterscheiden durch Kontext:<br><span class=hl>fiel</span>: Verb (fallen) · <span class=hl>viel</span>: Menge<br><span class=hl>Rad</span>: Fahrzeug · <span class=hl>Rat</span>: Ratschlag</div>"},

  {sub:"Doppelkonsonanten & Dehnungs-h",type:"cross",
  q:"Richtig geschrieben?",
  rows:["kommen oder komen?","rennen oder renen?","schwimmen oder schwimen?","Tipp oder Tip? (Hinweis)","fahren oder fahran? (Dehnungs-h)"],
  cols:["erste Variante","zweite Variante"],
  correct:[0,0,0,0,0],
  model:"kommen / rennen / schwimmen / Tipp / fahren – alle ersten Varianten sind korrekt",
  rule:"<div class=rbox>Nach kurzem Vokal: <span class=hl>Konsonant verdoppeln</span> (kommen, rennen, schwimmen, Tipp)<br>Nach langem Vokal: <span class=hl>Dehnungs-h</span> (fahren, Zahlen, Befehl)</div>"}
]
  },

  // ─────────────────────────────────────────────────────────────
  // Thema 10: Worttrennung (extra)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bbr_extra_trennung",
    title: "Worttrennung (extra)",
    emoji: "✂️",
    color: "#6b7280",
    qs: [
  {sub:"Einfache Wörter trennen (1)",type:"cross",
  q:"Wie wird das Wort getrennt?",
  rows:["Fahren","Kinder","Atem","Ofen","lesen"],
  cols:["Fah-ren / Kin-der / A-tem / O-fen / le-sen","Fa-hren / Kind-er / At-em / Of-en / les-en"],
  correct:[0,0,0,0,0],
  model:"Fah-ren / Kin-der / A-tem / O-fen / le-sen",
  rule:"<div class=rbox>Trennung nach <span class=hl>Sprechsilben</span>. Einzelner Vokal am Anfang darf allein stehen (A-tem, O-fen).</div>"},

  {sub:"Einfache Wörter trennen (2)",type:"cross",
  q:"Wie wird das Wort getrennt?",
  rows:["reisen","spielen","laufen","Abend","Pflanze"],
  cols:["rei-sen / spie-len / lau-fen / Ab-end / Pflan-ze","reis-en / spiel-en / lauf-en / A-bend / Pfla-nze"],
  correct:[0,0,0,0,0],
  model:"rei-sen / spie-len / lau-fen / Ab-end / Pflan-ze",
  rule:"<div class=rbox>Diphthonge (ei, ie, au) bleiben zusammen. Präfixe (Ab-) bleiben erhalten.</div>"},

  {sub:"Doppelkonsonanten trennen",type:"cross",
  q:"Wie wird das Wort getrennt?",
  rows:["kommen","rennen","schwimmen","wissen","Küsse"],
  cols:["kom-men / ren-nen / schwim-men / wis-sen / Küs-se","ko-mmen / re-nnen / schwi-mmen / wi-ssen / Kü-sse"],
  correct:[0,0,0,0,0],
  model:"kom-men / ren-nen / schwim-men / wis-sen / Küs-se",
  rule:"<div class=rbox>Doppelkonsonanten werden <span class=hl>in der Mitte getrennt</span>: mm→m-m, nn→n-n, ss→s-s</div>"},

  {sub:"Besondere Trennregeln",type:"cross",
  q:"Wie wird das Wort getrennt?",
  rows:["versuchen","backen (ck → kk)","Straße (ß bleibt)","waschen (sch bleibt)","trocknen (ck → kk)"],
  cols:["ver-su-chen / bak-ken / Stra-ße / wa-schen / trock-nen","vers-u-chen / back-en / Straß-e / was-chen / tro-cknen"],
  correct:[0,0,0,0,0],
  model:"ver-su-chen / bak-ken / Stra-ße / wa-schen / trock-nen",
  rule:"<div class=rbox><span class=hl>Vorsilben</span> bleiben ganz (ver-su-chen)<br><span class=hl>ck</span> wird zu <span class=hl>k-k</span> (bak-ken, trock-nen)<br><span class=hl>sch</span> und <span class=hl>ß</span> werden nicht getrennt</div>"}
]
  }
];