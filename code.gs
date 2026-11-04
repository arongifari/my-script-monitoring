const TOKEN = 'MySuperSecretToken2026_xYz987!'; // harus sama dengan config.php

function doGet() {
  return ContentService.createTextOutput('Web app aktif');
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.token !== TOKEN) return ContentService.createTextOutput('forbidden');
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sh.appendRow([d.time, d.identity, d.cpu, d.mem_used_pct, d.uptime, d.down]);
  return ContentService.createTextOutput('ok');
}
