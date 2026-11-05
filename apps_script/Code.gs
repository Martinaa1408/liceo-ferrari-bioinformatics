/**
 * Raccolta feedback e statistiche per gli incontri al Liceo Ferrari.
 *
 * Cosa fa
 *  - doPost: riceve il modulo feedback.html e aggiunge una riga al foglio "Risposte".
 *  - doGet:  restituisce le statistiche e i commenti alla dashboard, solo se il token è giusto.
 *
 * Come si installa (5 minuti, una volta sola)
 *  1. Crea un Foglio Google nuovo, per esempio "Feedback incontri Liceo Ferrari".
 *  2. Estensioni > Apps Script. Cancella tutto e incolla questo file.
 *  3. Cambia TOKEN qui sotto con una parola lunga che solo tu conosci.
 *  4. Distribuisci > Nuova distribuzione > Tipo: App web.
 *     Esegui come: Me. Chi può accedere: Chiunque. Autorizza quando richiesto.
 *  5. Copia l'URL che finisce con /exec.
 *     Incollalo in feedback.html (costante ENDPOINT) e nella dashboard (campo "URL").
 */
const TOKEN = 'CAMBIA-QUESTA-PAROLA';
const HEADERS = ['Data', 'Incontro', 'Voto', 'Chiarezza', 'Piaciuto', 'Interesse', 'Laurea', 'Cosa cambieresti', 'Domanda', 'Email'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Risposte');
  if (!sh) { sh = ss.insertSheet('Risposte'); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  return sh;
}

function doPost(e) {
  const p = e.parameter || {};
  if (p['_honey']) return ContentService.createTextOutput('ok');           // anti-spam
  const piaciuto = (e.parameters && e.parameters['Piaciuto']) ? e.parameters['Piaciuto'].join('; ') : '';
  sheet_().appendRow([
    new Date(),
    p['Incontro'] || '',
    Number(p['Voto (1-10)']) || '',
    Number(p['Chiarezza (1-5)']) || '',
    piaciuto,
    Number(p['Interesse (1-5)']) || '',
    p["Laurea in quest'area"] || '',
    (p['Cosa cambieresti'] || '').substring(0, 2000),
    (p['Domanda'] || '').substring(0, 2000),
    (p['email'] || '').substring(0, 200)
  ]);
  return ContentService.createTextOutput('ok');
}

function avg_(a) { return a.length ? Math.round(a.reduce(function (x, y) { return x + y; }, 0) / a.length * 100) / 100 : null; }
function count_(a) { const o = {}; a.forEach(function (v) { if (v !== '') o[v] = (o[v] || 0) + 1; }); return o; }

function doGet(e) {
  const out = function (o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); };
  if (!e.parameter || e.parameter.token !== TOKEN) return out({ error: 'token' });
  const rows = sheet_().getDataRange().getValues().slice(1);
  const col = function (i) { return rows.map(function (r) { return r[i]; }); };
  const nums = function (i) { return col(i).filter(function (v) { return typeof v === 'number'; }); };
  const piaciuto = {};
  col(4).forEach(function (s) { String(s).split('; ').forEach(function (x) { if (x) piaciuto[x] = (piaciuto[x] || 0) + 1; }); });
  const tz = Session.getScriptTimeZone();
  return out({
    total: rows.length,
    byMeeting: count_(col(1)),
    avgVote: avg_(nums(2)), voteDist: count_(nums(2)),
    avgClarity: avg_(nums(3)), clarityDist: count_(nums(3)),
    avgInterest: avg_(nums(5)), interestDist: count_(nums(5)),
    liked: piaciuto,
    degree: count_(col(6)),
    changes: rows.filter(function (r) { return r[7]; }).map(function (r) { return { date: Utilities.formatDate(new Date(r[0]), tz, 'dd/MM HH:mm'), meeting: r[1], text: r[7] }; }),
    questions: rows.filter(function (r) { return r[8]; }).map(function (r) { return { date: Utilities.formatDate(new Date(r[0]), tz, 'dd/MM HH:mm'), meeting: r[1], text: r[8], email: r[9] }; })
  });
}
