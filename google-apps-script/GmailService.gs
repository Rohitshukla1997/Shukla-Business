// ============================================================================
// Google Apps Script: Gmail Notification Service
// ============================================================================

function sendInquiryEmailNotification(inquiry) {
  try {
    var recipient = getNotificationEmail();
    if (!recipient) {
      return { success: false, status: "SKIPPED", error: "No notification recipient configured" };
    }

    var subject = "New Website Inquiry | " + inquiry.inquiryId;

    var htmlBody =
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E5E5; border-radius: 12px; overflow: hidden;">' +
        '<div style="background-color: #000000; padding: 24px; text-align: center; border-bottom: 3px solid #C6A76B;">' +
          '<h2 style="color: #FFFFFF; margin: 0; font-size: 20px;">' + APP_CONFIG.BUSINESS_NAME + '</h2>' +
          '<p style="color: #C6A76B; margin: 6px 0 0 0; font-size: 13px; text-transform: uppercase; font-weight: bold;">New Customer Inquiry Intake</p>' +
        '</div>' +
        '<div style="padding: 24px; background-color: #FFFFFF;">' +
          '<div style="background-color: #F4F4F4; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #C6A76B;">' +
            '<strong style="color: #000000; font-size: 16px;">Inquiry ID: ' + inquiry.inquiryId + '</strong><br>' +
            '<span style="color: #666666; font-size: 12px;">Submitted at: ' + inquiry.createdAt + '</span>' +
          '</div>' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333333;">' +
            '<tr><td style="padding: 8px 0; font-weight: bold; width: 35%;">Customer Name:</td><td style="padding: 8px 0; color: #000000;">' + inquiry.customerName + '</td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0;"><a href="tel:' + inquiry.phoneNumber + '" style="color: #000000; font-weight: bold;">' + inquiry.phoneNumber + '</a></td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:' + (inquiry.emailAddress || "") + '" style="color: #C6A76B;">' + (inquiry.emailAddress || "N/A") + '</a></td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold;">Category:</td><td style="padding: 8px 0;">' + (inquiry.category || "General") + '</td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold;">Service / Device:</td><td style="padding: 8px 0;">' + (inquiry.service || "Standard") + '</td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold;">Source:</td><td style="padding: 8px 0;">' + (inquiry.source || "Website") + '</td></tr>' +
          '</table>' +
          '<div style="margin-top: 20px; padding: 16px; background-color: #F9F9F9; border-radius: 8px; border: 1px solid #E5E5E5;">' +
            '<strong style="color: #000000; display: block; margin-bottom: 8px; font-size: 13px;">Customer Message / Issue Description:</strong>' +
            '<p style="margin: 0; color: #444444; line-height: 1.5; white-space: pre-wrap;">' + (inquiry.message || "No additional message provided.") + '</p>' +
          '</div>' +
          '<div style="margin-top: 24px; text-align: center;">' +
            '<span style="display: inline-block; padding: 6px 14px; background-color: #000000; color: #C6A76B; font-size: 11px; font-weight: bold; border-radius: 20px;">' +
              'Status: ' + (inquiry.status || "New") +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div style="background-color: #F4F4F4; padding: 14px; text-align: center; color: #888888; font-size: 11px; border-top: 1px solid #E5E5E5;">' +
          'Shukla Business Automation • Nagpur, Maharashtra • Direct Workbench & Web Systems' +
        '</div>' +
      '</div>';

    var plainBody =
      "New Website Inquiry | " + inquiry.inquiryId + "\n\n" +
      "Customer: " + inquiry.customerName + "\n" +
      "Phone: " + inquiry.phoneNumber + "\n" +
      "Email: " + (inquiry.emailAddress || "N/A") + "\n" +
      "Category: " + (inquiry.category || "General") + "\n" +
      "Service: " + (inquiry.service || "Standard") + "\n" +
      "Source: " + (inquiry.source || "Website") + "\n" +
      "Submitted: " + inquiry.createdAt + "\n\n" +
      "Message:\n" + (inquiry.message || "None");

    // Send using MailApp or GmailApp
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

    return { success: true, status: "SENT", messageId: "GMAIL-" + new Date().getTime() };
  } catch (err) {
    Logger.log("Email error: " + err.toString());
    return { success: false, status: "FAILED", error: err.toString() };
  }
}

