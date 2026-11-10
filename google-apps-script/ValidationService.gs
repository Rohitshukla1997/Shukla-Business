// ============================================================================
// Google Apps Script: Validation Service
// ============================================================================

function validateInquiryPayload(payload) {
  if (!payload) return { valid: false, error: "Empty payload" };

  if (!payload.customerName || String(payload.customerName).trim().length < 2) {
    return {
      valid: false,
      error: "Customer name must be at least 2 characters long.",
    };
  }

  if (!payload.phoneNumber || String(payload.phoneNumber).trim().length < 10) {
    return { valid: false, error: "Valid 10-digit phone number is required." };
  }

  if (
    payload.emailAddress &&
    !/^\S+@\S+\.\S+$/.test(String(payload.emailAddress).trim())
  ) {
    return { valid: false, error: "Invalid email address format." };
  }

  return { valid: true };
}
