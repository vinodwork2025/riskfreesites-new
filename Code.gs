// ─────────────────────────────────────────────────────────────────────────────
// RiskFreeSites — Google Apps Script Web App
// Sheet: https://docs.google.com/spreadsheets/d/1qtro9JTDogZ3Ox3edFs2VhlL5YOO7IxLnJTM9XDvp6A
//
// HOW TO DEPLOY:
//   1. Open the Google Sheet above → Extensions → Apps Script
//   2. Paste this entire file into Code.gs (replace any existing content)
//   3. Click Deploy → New deployment → Web app
//   4. Set "Execute as" = Me
//       Set "Who has access" = Anyone
//   5. Click Deploy → Authorize → Copy the Web App URL
//   6. Paste that URL into index.html where it says YOUR_APPS_SCRIPT_URL
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_ID = '1qtro9JTDogZ3Ox3edFs2VhlL5YOO7IxLnJTM9XDvp6A';

var HEADERS = ['Timestamp', 'Name', 'Business Name', 'Phone (WhatsApp)', 'Industry', 'Website'];

// ── Handle GET (health check / browser test)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RiskFreeSites lead capture is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Handle POST (form submission)
function doPost(e) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    // Auto-add header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight('bold')
           .setBackground('#1a1918')
           .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Parse submitted fields
    var params = e.parameter;
    var row = [
      new Date(),
      params.name     || '',
      params.business || '',
      params.phone    || '',
      params.industry || '',
      params.website  || ''
    ];

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
