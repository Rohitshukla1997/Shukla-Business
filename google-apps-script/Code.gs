// ============================================================================
// Google Apps Script: Shukla Business Inquiries Integration
// EXACT MATCH FOR YOUR COLUMNS:
// A: Date | B: Client Name | C: Client Contact | D: Client Email | E: Description | F: Products | G: Status
// ============================================================================

var CONFIG = {
  BUSINESS_NAME: "Shukla Electronic & Computer Services",
  NOTIFICATION_EMAIL: "sanjay.shukla1967@gmail.com", // Put your Gmail here
  SHARED_SECRET: "shukla-sec-2026-integration-key", // Matches APPS_SCRIPT_SHARED_SECRET in .env.local
  SHEET_NAME: "Inquiries",
  TIMEZONE: "Asia/Kolkata",
};

// 1. Initial setup function (Run this once if you want to create or format the headers)
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  var headers = [
    "Date",
    "Client Name",
    "Client Contact",
    "Client Email",
    "Description",
    "Products",
    "Status",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#000000");
  headerRange.setFontColor("#FFFFFF");
  sheet.setFrozenRows(1);
}

// 2. Main POST endpoint (Called by Next.js website when customer submits form)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ success: false, error: "Empty request body" });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return responseJson({ success: false, error: "Invalid JSON format" });
    }

    // Verify secret key
    var incomingKey = data.apiKey || data.secret;
    if (incomingKey !== CONFIG.SHARED_SECRET) {
      return responseJson({
        success: false,
        error: "Unauthorized access: Invalid API key",
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }

    // A: Date (e.g. 2026-11-10 17:15)
    var dateStr = Utilities.formatDate(
      new Date(),
      CONFIG.TIMEZONE,
      "yyyy-MM-dd HH:mm:ss",
    );

    // Extract fields matching your columns
    var clientName = String(data.customerName || data.name || "").trim();
    var clientContact = String(data.phoneNumber || data.phone || "").trim();
    var clientEmail = String(data.emailAddress || data.email || "").trim();
    var description = String(
      data.message || data.notes || data.description || "",
    ).trim();
    var products = String(
      data.service || data.category || data.products || "Electronics Repair",
    ).trim();
    var status = String(data.status || "New").trim();

    // If update action from dashboard
    if (data.action === "update") {
      return updateInquiryRow(sheet, data);
    }

    // Validation
    if (!clientName || !clientContact) {
      return responseJson({
        success: false,
        error: "Client Name and Contact number are required",
      });
    }

    // Generate unique inquiry reference ID
    var lastRow = sheet.getLastRow();
    var nextId =
      "INQ-" +
      Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy") +
      "-" +
      ("0000" + lastRow).slice(-4);

    // Append exactly into your 7 columns:
    // [Date, Client Name, Client Contact, Client Email, Description, Products, Status]
    sheet.appendRow([
      dateStr,
      clientName,
      clientContact,
      clientEmail || "N/A",
      description,
      products,
      status,
    ]);

    // Send instant notification to your Gmail
    try {
      sendGmailAlert({
        inquiryId: nextId,
        date: dateStr,
        name: clientName,
        phone: clientContact,
        email: clientEmail,
        products: products,
        description: description,
      });
    } catch (mailErr) {
      Logger.log("Gmail notification error: " + mailErr.toString());
    }

    return responseJson({
      success: true,
      inquiryId: nextId,
      date: dateStr,
      message: "Inquiry saved to Google Sheets",
    });
  } catch (err) {
    return responseJson({ success: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// 3. Main GET endpoint (Called by Next.js Dashboard to read and list inquiries)
function doGet(e) {
  try {
    var incomingKey =
      e && e.parameter && (e.parameter.apiKey || e.parameter.secret);
    if (incomingKey !== CONFIG.SHARED_SECRET) {
      return responseJson({ success: false, error: "Unauthorized" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return responseJson({ success: true, count: 0, inquiries: [] });
    }

    var list = [];
    // Row 0 is header, rows 1..N are records
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      list.push({
        inquiryId: "INQ-" + (1000 + i),
        date: row[0],
        createdAt: row[0],
        customerName: row[1],
        phoneNumber: row[2],
        emailAddress: row[3] === "N/A" ? "" : row[3],
        message: row[4],
        service: row[5],
        category: row[5],
        status: row[6] || "New",
      });
    }

    return responseJson({
      success: true,
      count: list.length,
      inquiries: list.reverse(),
    });
  } catch (err) {
    return responseJson({ success: false, error: err.toString() });
  }
}

// 4. Update status in row
function updateInquiryRow(sheet, data) {
  var rows = sheet.getDataRange().getValues();
  var targetRow = -1;

  for (var i = 1; i < rows.length; i++) {
    // Match by Client Contact or Customer Name
    if (
      rows[i][2] == data.phoneNumber ||
      rows[i][1] == data.customerName ||
      (data.inquiryId && "INQ-" + (1000 + i) === data.inquiryId)
    ) {
      targetRow = i + 1; // 1-based index
      break;
    }
  }

  if (targetRow === -1) {
    return responseJson({ success: false, error: "Inquiry record not found" });
  }

  // Column G is Status (Column 7)
  if (data.status) {
    sheet.getRange(targetRow, 7).setValue(data.status);
  }

  return responseJson({ success: true, updatedRow: targetRow });
}

// 5. Gmail Alert Function
function sendGmailAlert(info) {
  var subject =
    "New Website Inquiry: " + info.name + " (" + info.products + ")";
  var htmlBody =
    '<div style="font-family: Arial, sans-serif; max-width: 560px; padding: 20px; border: 1px solid #E5E5E5; border-radius: 10px;">' +
    '<div style="background: #000; padding: 15px; color: #FFF; border-radius: 8px 8px 0 0; text-align: center;">' +
    '<h3 style="margin: 0; color: #C6A76B;">Shukla Business Inquiries</h3>' +
    '<p style="margin: 5px 0 0 0; font-size: 12px;">New Inquiry Received on Website</p>' +
    "</div>" +
    '<div style="padding: 15px; background: #FFF;">' +
    "<p><strong>Date:</strong> " +
    info.date +
    "</p>" +
    "<p><strong>Client Name:</strong> " +
    info.name +
    "</p>" +
    '<p><strong>Client Contact:</strong> <a href="tel:' +
    info.phone +
    '">' +
    info.phone +
    "</a></p>" +
    "<p><strong>Client Email:</strong> " +
    (info.email || "N/A") +
    "</p>" +
    "<p><strong>Products / Service:</strong> " +
    info.products +
    "</p>" +
    "<p><strong>Description:</strong><br>" +
    (info.description || "None") +
    "</p>" +
    "</div>" +
    "</div>";

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
  });
}

function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
