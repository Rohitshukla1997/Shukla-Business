// ============================================================================
// Google Apps Script: Inquiry Business Logic Service
// ============================================================================

function generateInquiryId(sheet) {
  var year = Utilities.formatDate(new Date(), APP_CONFIG.TIMEZONE, "yyyy");
  var lastRow = sheet.getLastRow();
  var nextNum = 1;

  if (lastRow > 1) {
    var lastId = sheet.getRange(lastRow, 1).getValue();
    var match = String(lastId).match(/INQ-\d{4}-(\d+)/);
    if (match && match[1]) {
      nextNum = parseInt(match[1], 10) + 1;
    } else {
      nextNum = lastRow;
    }
  }

  var paddedNum = ("0000" + nextNum).slice(-4);
  return APP_CONFIG.INQUIRY_PREFIX + "-" + year + "-" + paddedNum;
}

function createInquiry(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.INQUIRIES);

    var now = Utilities.formatDate(
      new Date(),
      APP_CONFIG.TIMEZONE,
      "yyyy-MM-dd HH:mm:ss",
    );
    var inquiryId = generateInquiryId(sheet);

    var record = {
      inquiryId: inquiryId,
      createdAt: now,
      updatedAt: now,
      customerName: String(payload.customerName || "").trim(),
      phoneNumber: String(payload.phoneNumber || "").trim(),
      emailAddress: String(payload.emailAddress || "").trim(),
      category: String(payload.category || "General").trim(),
      service: String(payload.service || "Standard").trim(),
      subject: String(payload.subject || "Website Inquiry").trim(),
      message: String(payload.message || "").trim(),
      source: String(payload.source || "Website").trim(),
      status: "New",
      priority: String(payload.priority || "Medium").trim(),
      assignedTo: "",
      followUpDate: "",
      internalRemarks: String(payload.internalRemarks || "").trim(),
      gmailStatus: "PENDING",
      gmailMessageId: "",
    };

    // Send email notification via GmailApp/MailApp
    var emailResult = sendInquiryEmailNotification(record);
    record.gmailStatus = emailResult.status;
    record.gmailMessageId = emailResult.messageId || "";

    // Append row
    sheet.appendRow([
      record.inquiryId,
      record.createdAt,
      record.updatedAt,
      record.customerName,
      record.phoneNumber,
      record.emailAddress,
      record.category,
      record.service,
      record.subject,
      record.message,
      record.source,
      record.status,
      record.priority,
      record.assignedTo,
      record.followUpDate,
      record.internalRemarks,
      record.gmailStatus,
      record.gmailMessageId,
    ]);

    // Log Activity
    logInquiryActivity(
      ss,
      inquiryId,
      "CREATED",
      "-",
      "New",
      "Inquiry submitted via " + record.source,
      "Customer",
    );

    return {
      success: true,
      inquiryId: inquiryId,
      createdAt: record.createdAt,
      gmailStatus: record.gmailStatus,
    };
  } finally {
    lock.releaseLock();
  }
}

function listInquiries() {
  var ss = getOrCreateSpreadsheet();
  var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.INQUIRIES);
  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  var headers = data[0];
  var list = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    list.push({
      inquiryId: row[0],
      createdAt: row[1],
      updatedAt: row[2],
      customerName: row[3],
      phoneNumber: row[4],
      emailAddress: row[5],
      category: row[6],
      service: row[7],
      subject: row[8],
      message: row[9],
      source: row[10],
      status: row[11],
      priority: row[12],
      assignedTo: row[13],
      followUpDate: row[14],
      internalRemarks: row[15],
      gmailStatus: row[16],
      gmailMessageId: row[17],
    });
  }

  return list.reverse();
}

function updateInquiry(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.INQUIRIES);
    var data = sheet.getDataRange().getValues();

    var inquiryId = payload.inquiryId;
    if (!inquiryId) return { success: false, error: "Missing inquiryId" };

    var rowIndex = -1;
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(inquiryId)) {
        rowIndex = i + 1; // 1-based index
        break;
      }
    }

    if (rowIndex === -1) {
      return { success: false, error: "Inquiry ID not found: " + inquiryId };
    }

    var now = Utilities.formatDate(
      new Date(),
      APP_CONFIG.TIMEZONE,
      "yyyy-MM-dd HH:mm:ss",
    );
    var oldStatus = sheet.getRange(rowIndex, 12).getValue();
    var oldRemarks = sheet.getRange(rowIndex, 16).getValue();

    // Update row
    sheet.getRange(rowIndex, 3).setValue(now); // Updated At

    if (payload.status !== undefined && payload.status !== null) {
      sheet.getRange(rowIndex, 12).setValue(payload.status);
    }
    if (payload.priority !== undefined && payload.priority !== null) {
      sheet.getRange(rowIndex, 13).setValue(payload.priority);
    }
    if (payload.assignedTo !== undefined && payload.assignedTo !== null) {
      sheet.getRange(rowIndex, 14).setValue(payload.assignedTo);
    }
    if (payload.followUpDate !== undefined && payload.followUpDate !== null) {
      sheet.getRange(rowIndex, 15).setValue(payload.followUpDate);
    }
    if (
      payload.internalRemarks !== undefined &&
      payload.internalRemarks !== null
    ) {
      sheet.getRange(rowIndex, 16).setValue(payload.internalRemarks);
    }

    // Log Activity
    var user = payload.updatedBy || "Dashboard User";
    if (payload.status && payload.status !== oldStatus) {
      logInquiryActivity(
        ss,
        inquiryId,
        "STATUS_UPDATE",
        oldStatus,
        payload.status,
        payload.remarks || "Status modified via Dashboard",
        user,
      );
    } else if (
      payload.internalRemarks &&
      payload.internalRemarks !== oldRemarks
    ) {
      logInquiryActivity(
        ss,
        inquiryId,
        "REMARKS_ADDED",
        oldRemarks,
        payload.internalRemarks,
        "Remarks updated",
        user,
      );
    } else {
      logInquiryActivity(
        ss,
        inquiryId,
        "UPDATED",
        "-",
        "-",
        "Record updated",
        user,
      );
    }

    return { success: true, inquiryId: inquiryId, updatedAt: now };
  } finally {
    lock.releaseLock();
  }
}

function retryFailedGmailNotifications() {
  var ss = getOrCreateSpreadsheet();
  var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.INQUIRIES);
  var data = sheet.getDataRange().getValues();

  var retriedCount = 0;
  for (var i = 1; i < data.length; i++) {
    var gmailStatus = data[i][16];
    if (gmailStatus === "FAILED" || gmailStatus === "PENDING") {
      var rowInquiry = {
        inquiryId: data[i][0],
        createdAt: data[i][1],
        customerName: data[i][3],
        phoneNumber: data[i][4],
        emailAddress: data[i][5],
        category: data[i][6],
        service: data[i][7],
        subject: data[i][8],
        message: data[i][9],
        source: data[i][10],
        status: data[i][11],
      };

      var res = sendInquiryEmailNotification(rowInquiry);
      if (res.success) {
        var rowIndex = i + 1;
        sheet.getRange(rowIndex, 17).setValue(res.status);
        sheet.getRange(rowIndex, 18).setValue(res.messageId);
        logInquiryActivity(
          ss,
          rowInquiry.inquiryId,
          "GMAIL_RETRY",
          "FAILED",
          "SENT",
          "Notification re-sent successfully",
          "Auto-Trigger",
        );
        retriedCount++;
      }
    }
  }

  return { success: true, retriedCount: retriedCount };
}
