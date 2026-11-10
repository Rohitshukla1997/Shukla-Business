// ============================================================================
// Google Apps Script: Main HTTP Web App Controller (doGet & doPost)
// ============================================================================

function doPost(e) {
  try {
    var auth = verifyRequest(e);
    if (!auth.valid) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: auth.error }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var payload = auth.data;
    var action = payload.action || "create";

    var result;
    if (action === "create") {
      var val = validateInquiryPayload(payload);
      if (!val.valid) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: val.error }),
        ).setMimeType(ContentService.MimeType.JSON);
      }
      result = createInquiry(payload);
    } else if (action === "update") {
      result = updateInquiry(payload);
    } else if (action === "retry_gmail") {
      result = retryFailedGmailNotifications();
    } else if (action === "list") {
      var items = listInquiries();
      result = { success: true, count: items.length, inquiries: items };
    } else {
      result = { success: false, error: "Unsupported action: " + action };
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var auth = verifyGetRequest(e);
    if (!auth.valid) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: auth.error }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var action = (e.parameter && e.parameter.action) || "list";
    var result;

    if (action === "list") {
      var items = listInquiries();
      result = { success: true, count: items.length, inquiries: items };
    } else if (action === "activities") {
      var ss = getOrCreateSpreadsheet();
      var inquiryId = e.parameter.inquiryId;
      var activities = getInquiryActivities(ss, inquiryId);
      result = {
        success: true,
        count: activities.length,
        activities: activities,
      };
    } else if (action === "ping") {
      result = {
        success: true,
        message: "Apps Script integration operational",
        timestamp: new Date().toISOString(),
      };
    } else {
      result = { success: false, error: "Unsupported action: " + action };
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Initial setup helper run manually once by business owner if desired
function setupSpreadsheet() {
  var ss = getOrCreateSpreadsheet();
  Logger.log("Initialized spreadsheet: " + ss.getUrl());
}
