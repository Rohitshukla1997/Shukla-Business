// ============================================================================
// Google Apps Script: Security & Request Verification Service
// ============================================================================

function verifyRequest(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return { valid: false, error: "Missing request body" };
  }

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return { valid: false, error: "Invalid JSON body" };
  }

  var sharedSecret = getSharedSecret();
  var incomingKey =
    data.apiKey || data.secret || (e.parameter && e.parameter.apiKey);

  if (!incomingKey || incomingKey !== sharedSecret) {
    return {
      valid: false,
      error: "Unauthorized access: invalid or missing API key",
    };
  }

  return { valid: true, data: data };
}

function verifyGetRequest(e) {
  var sharedSecret = getSharedSecret();
  var incomingKey =
    e && e.parameter && (e.parameter.apiKey || e.parameter.secret);

  if (!incomingKey || incomingKey !== sharedSecret) {
    return {
      valid: false,
      error: "Unauthorized access: invalid or missing API key",
    };
  }

  return { valid: true, params: e.parameter };
}
