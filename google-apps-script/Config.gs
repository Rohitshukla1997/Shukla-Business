// ============================================================================
// Google Apps Script: Shukla Business Inquiries Integration Layer
// ============================================================================

var APP_CONFIG = {
  BUSINESS_NAME: "Shukla Electronic & Computer Services",
  SPREADSHEET_NAME: "Shukla Business Inquiries",
  TIMEZONE: "Asia/Kolkata",
  INQUIRY_PREFIX: "INQ",
  // Shared secret: must match APPS_SCRIPT_SHARED_SECRET in Next.js .env.local
  // You can also set this via Script Properties: PropertiesService.getScriptProperties().getProperty("SHARED_SECRET")
  DEFAULT_SHARED_SECRET: "shukla-sec-2026-integration-key",
  SHEETS: {
    INQUIRIES: "Inquiries",
    ACTIVITY: "Inquiry Activity",
    CONFIG: "Configuration",
  },
};

function getSharedSecret() {
  var prop =
    PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
  return prop || APP_CONFIG.DEFAULT_SHARED_SECRET;
}

function getNotificationEmail() {
  var prop =
    PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL");
  if (prop) return prop;
  try {
    return (
      Session.getActiveUser().getEmail() ||
      Session.getEffectiveUser().getEmail()
    );
  } catch (e) {
    return "";
  }
}
