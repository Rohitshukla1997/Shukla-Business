// ============================================================================
// Google Apps Script: Inquiry Activity Log Service
// ============================================================================

function logInquiryActivity(
  ss,
  inquiryId,
  action,
  prevVal,
  newVal,
  remarks,
  updatedBy,
) {
  try {
    var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.ACTIVITY);
    if (!sheet) return;

    var activityId =
      "ACT-" +
      Utilities.formatDate(new Date(), APP_CONFIG.TIMEZONE, "yyyyMMdd-HHmmss") +
      "-" +
      Math.floor(Math.random() * 900 + 100);
    var timestamp = Utilities.formatDate(
      new Date(),
      APP_CONFIG.TIMEZONE,
      "yyyy-MM-dd HH:mm:ss",
    );

    sheet.appendRow([
      activityId,
      inquiryId,
      action,
      prevVal || "-",
      newVal || "-",
      remarks || "-",
      timestamp,
      updatedBy || "System",
    ]);
  } catch (err) {
    Logger.log("Failed to log activity: " + err.toString());
  }
}

function getInquiryActivities(ss, inquiryId) {
  var sheet = ss.getSheetByName(APP_CONFIG.SHEETS.ACTIVITY);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var results = [];
  for (var i = 1; i < data.length; i++) {
    if (!inquiryId || String(data[i][1]) === String(inquiryId)) {
      results.push({
        activityId: data[i][0],
        inquiryId: data[i][1],
        action: data[i][2],
        previousValue: data[i][3],
        newValue: data[i][4],
        remarks: data[i][5],
        createdAt: data[i][6],
        updatedBy: data[i][7],
      });
    }
  }
  return results.reverse();
}
