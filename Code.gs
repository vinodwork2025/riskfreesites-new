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

var HEADERS = [
  'Timestamp', 'Name', 'Business Name', 'Email', 'Phone',
  'Industry', 'Website', 'Status', 'Source', 'Notes',
  'Demo URL', 'Assigned To', 'Follow Up Date'
];

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
      // Pre-format phone column (E) as plain text so '+' prefix is never
      // misread as a formula operator
      sheet.getRange('E:E').setNumberFormat('@');
    }

    // Parse submitted fields
    var params  = e.parameter;
    var nextRow = sheet.getLastRow() + 1;

    // Pre-format phone cell (col E = 5) as text BEFORE writing.
    sheet.getRange(nextRow, 5).setNumberFormat('@');

    sheet.getRange(nextRow, 1, 1, 13).setValues([[
      new Date(),           // A  Timestamp
      params.name     || '',// B  Name
      params.business || '',// C  Business Name
      params.email    || '',// D  Email
      params.phone    || '',// E  Phone
      params.industry || '',// F  Industry
      params.website  || '',// G  Website
      '',                   // H  Status       (filled manually)
      'Website Form',       // I  Source        (auto-tagged)
      '',                   // J  Notes         (filled manually)
      '',                   // K  Demo URL      (filled manually)
      '',                   // L  Assigned To   (filled manually)
      ''                    // M  Follow Up Date (filled manually)
    ]]);

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
