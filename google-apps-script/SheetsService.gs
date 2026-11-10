// ============================================================================
// Google Apps Script: Sheets Management Service
// ============================================================================

function getOrCreateSpreadsheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    // If not bound container
    var files = DriveApp.getFilesByName(APP_CONFIG.SPREADSHEET_NAME);
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create(APP_CONFIG.SPREADSHEET_NAME);
    }
  }

  ensureWorksheets(ss);
  return ss;
}

function ensureWorksheets(ss) {
  var sheets = [
    {
      name: APP_CONFIG.SHEETS.INQUIRIES,
      headers: [
        "Inquiry ID",
        "Created At",
        "Updated At",
        "Customer Name",
        "Phone Number",
        "Email Address",
        "Category",
        "Service",
        "Subject",
        "Message",
        "Source",
        "Status",
        "Priority",
        "Assigned To",
        "Follow-up Date",
        "Internal Remarks",
        "Gmail Status",
        "Gmail Message ID",
      ],
    },
    {
      name: APP_CONFIG.SHEETS.ACTIVITY,
      headers: [
        "Activity ID",
        "Inquiry ID",
        "Action",
        "Previous Value",
        "New Value",
        "Remarks",
        "Created At",
        "Updated By",
      ],
    },
    {
      name: APP_CONFIG.SHEETS.CONFIG,
      headers: [
        "Business Name",
        "Notification Gmail Address",
        "Spreadsheet ID",
        "Timezone",
        "Inquiry ID Prefix",
        "Email Notification Enabled",
      ],
    },
  ];

  sheets.forEach(function (def) {
    var sheet = ss.getSheetByName(def.name);
    if (!sheet) {
      sheet = ss.insertSheet(def.name);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(def.headers);
      var headerRange = sheet.getRange(1, 1, 1, def.headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#000000");
      headerRange.setFontColor("#C6A76B");
      sheet.setFrozenRows(1);
    }
  });

  // Populate config row if empty
  var configSheet = ss.getSheetByName(APP_CONFIG.SHEETS.CONFIG);
  if (configSheet.getLastRow() === 1) {
    configSheet.appendRow([
      APP_CONFIG.BUSINESS_NAME,
      getNotificationEmail(),
      ss.getId(),
      APP_CONFIG.TIMEZONE,
      APP_CONFIG.INQUIRY_PREFIX,
      "TRUE",
    ]);
  }
}
