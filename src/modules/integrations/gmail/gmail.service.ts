import { GoogleSheetsService } from "../google-sheets/sheets.service";

export class GmailNotificationService {
  /**
   * Retries any failed notifications stored in the Google Spreadsheet
   */
  public static async retryFailedNotifications() {
    return GoogleSheetsService.retryFailedNotifications();
  }
}
