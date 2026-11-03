const TOKEN = '9f3a1c7e5b2d48a0c6e1f7d93b5a2c80e4d17f6a8b3c9d21'; // harus sama dengan config.php


function doGet() {
  return ContentService.createTextOutput('Web app aktif');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return ContentService.createTextOutput('forbidden');
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sh.appendRow([d.time, d.identity, d.cpu, d.mem_used_pct, d.uptime, d.down]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message);
  } finally {
    lock.releaseLock();
  }
}