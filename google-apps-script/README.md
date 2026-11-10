# Google Apps Script Setup Guide for Shukla Business Inquiries

Follow these exact 5-minute steps to connect your Business Google Account to the website.

---

### Step 1: Open Google Sheets

1. Sign in to your Business Google Account (`shuklabusiness.nagpur@gmail.com` or your business email).
2. Go to [https://sheets.google.com](https://sheets.google.com) and create a **Blank Spreadsheet**.
3. Rename the spreadsheet in the top-left to:
   ```text
   Shukla Business Inquiries
   ```

---

### Step 2: Open Apps Script Editor

1. In your newly created Google Sheet, click **Extensions** in the top menu bar.
2. Select **Apps Script**.
3. Name the Apps Script project:
   ```text
   Shukla Inquiries Backend
   ```

---

### Step 3: Copy the Script Files

In the Apps Script editor file sidebar (left panel), create/paste the files located in the `google-apps-script/` folder of this project:

1. **`Config.gs`**: Replace `Code.gs` or create `Config.gs` and paste the contents from `google-apps-script/Config.gs`.
2. Click **+ (Add a file)** > **Script** and create:
   - `SecurityService.gs`
   - `ValidationService.gs`
   - `SheetsService.gs`
   - `GmailService.gs`
   - `ActivityService.gs`
   - `InquiryService.gs`
   - `InquiryController.gs`
3. Paste each corresponding file's code.

---

### Step 4: Run Initial Setup & Grant Google Permissions

1. At the top toolbar of Apps Script, select the function **`setupSpreadsheet`** in the dropdown.
2. Click **Run**.
3. A popup will appear: **"Authorization required"**.
4. Click **Review permissions**.
5. Select your **Business Google Account**.
6. If Google shows "Google hasn't verified this app", click **Advanced** -> **Go to Shukla Inquiries Backend (unsafe)**.
7. Click **Allow** to grant permission to:
   - Manage your spreadsheets
   - Send emails as you
8. Switch back to your Google Sheet: You will see three formatted tabs created automatically with gold/black headers:
   - **Inquiries**
   - **Inquiry Activity**
   - **Configuration**

---

### Step 5: Deploy as Web App

1. In the top right corner of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (Select type) and choose **Web app**.
3. Set the fields:
   - **Description**: `v1 Production Inquiry API`
   - **Execute as**: `Me (your business email)`
   - **Who has access**: `Anyone` _(Note: The endpoint is cryptographically protected with your shared secret key; Next.js passes the key server-side so anonymous calls are blocked)_.
4. Click **Deploy**.
5. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 6: Configure `.env.local` in Next.js

In your project root, create or update `.env.local`:

```env
APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_ID/exec
APPS_SCRIPT_SHARED_SECRET=shukla-sec-2026-integration-key
BUSINESS_NOTIFICATION_EMAIL=your-business-email@gmail.com
DASHBOARD_ACCESS_PIN=2026
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

_(You can set your own secret key in both `.env.local` and in Apps Script `Project Settings -> Script Properties -> Property: SHARED_SECRET`)_.
