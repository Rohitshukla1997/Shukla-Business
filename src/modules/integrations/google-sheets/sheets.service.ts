import { AppsScriptClient } from "../apps-script/apps-script.client";
import {
  CreateInquiryInput,
  InquiryRecord,
  UpdateInquiryInput,
  InquiryActivity,
} from "../../inquiries/types/inquiry.types";

export class GoogleSheetsService {
  /**
   * Appends an inquiry record to the Google Sheet and sends Gmail notification
   */
  public static async createInquiry(input: CreateInquiryInput): Promise<{
    success: boolean;
    inquiryId?: string;
    gmailStatus?: string;
    error?: string;
  }> {
    const res = await AppsScriptClient.executePost<{
      inquiryId: string;
      gmailStatus: string;
    }>({
      action: "create",
      customerName: input.customerName,
      phoneNumber: input.phoneNumber,
      emailAddress: input.emailAddress || "",
      category: input.category,
      service: input.service,
      subject: input.subject || "Website Inquiry",
      message: input.message,
      source: input.source || "Website",
      priority: input.priority || "Medium",
      internalRemarks: input.internalRemarks || "",
    });

    if (!res.success) {
      return { success: false, error: res.error || "Could not save to Google Sheets" };
    }

    return {
      success: true,
      inquiryId: (res.inquiryId as string) || "INQ-PENDING",
      gmailStatus: (res.gmailStatus as string) || "PENDING",
    };
  }

  /**
   * Retrieves all inquiry records from Google Sheets
   */
  public static async listInquiries(): Promise<{
    success: boolean;
    inquiries: InquiryRecord[];
    error?: string;
  }> {
    const res = await AppsScriptClient.executeGet<{ inquiries: InquiryRecord[] }>({
      action: "list",
    });

    if (!res.success) {
      return {
        success: false,
        inquiries: [],
        error: res.error || "Failed to fetch inquiry records from Google Sheets",
      };
    }

    return {
      success: true,
      inquiries: (res.inquiries as unknown as InquiryRecord[]) || [],
    };
  }

  /**
   * Updates an existing inquiry row in Google Sheets
   */
  public static async updateInquiry(input: UpdateInquiryInput): Promise<{
    success: boolean;
    error?: string;
  }> {
    const res = await AppsScriptClient.executePost({
      action: "update",
      ...input,
    });

    if (!res.success) {
      return { success: false, error: res.error || "Failed to update record in Google Sheets" };
    }

    return { success: true };
  }

  /**
   * Retrieves activity history for a specific inquiry from Google Sheets
   */
  public static async getActivities(inquiryId?: string): Promise<{
    success: boolean;
    activities: InquiryActivity[];
    error?: string;
  }> {
    const params: Record<string, string> = { action: "activities" };
    if (inquiryId) params.inquiryId = inquiryId;

    const res = await AppsScriptClient.executeGet<{ activities: InquiryActivity[] }>(
      params
    );

    if (!res.success) {
      return { success: false, activities: [], error: res.error };
    }

    return {
      success: true,
      activities: (res.activities as unknown as InquiryActivity[]) || [],
    };
  }

  /**
   * Triggers a batch retry for any inquiries where Gmail notification previously failed
   */
  public static async retryFailedNotifications(): Promise<{
    success: boolean;
    retriedCount?: number;
    error?: string;
  }> {
    const res = await AppsScriptClient.executePost<{ retriedCount: number }>({
      action: "retry_gmail",
    });

    return {
      success: !!res.success,
      retriedCount: res.retriedCount as number,
      error: res.error,
    };
  }
}

