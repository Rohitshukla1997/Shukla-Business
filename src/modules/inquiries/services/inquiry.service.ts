import { GoogleSheetsService } from "@/modules/integrations/google-sheets/sheets.service";
import { CreateInquiryInput, UpdateInquiryInput } from "../types/inquiry.types";

export class InquiryService {
  public static async submitCustomerInquiry(data: CreateInquiryInput) {
    return GoogleSheetsService.createInquiry(data);
  }

  public static async getInquiries() {
    return GoogleSheetsService.listInquiries();
  }

  public static async updateInquiryStatus(data: UpdateInquiryInput) {
    return GoogleSheetsService.updateInquiry(data);
  }

  public static async getHistory(inquiryId?: string) {
    return GoogleSheetsService.getActivities(inquiryId);
  }

  public static async retryNotifications() {
    return GoogleSheetsService.retryFailedNotifications();
  }
}
