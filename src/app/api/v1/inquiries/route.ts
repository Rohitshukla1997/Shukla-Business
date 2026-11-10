import { NextRequest, NextResponse } from "next/server";
import {
  createInquirySchema,
  updateInquirySchema,
} from "@/modules/inquiries/types/inquiry.types";
import { InquiryService } from "@/modules/inquiries/services/inquiry.service";
import { AppsScriptClient } from "@/modules/integrations/apps-script/apps-script.client";

// Rate limiting map (in-memory per runtime instance)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60000 }); // 1 min window
    return true;
  }

  if (entry.count >= 10) {
    return false; // Exceeded 10 requests per minute
  }

  entry.count++;
  return true;
}

/**
 * GET: Retrieve inquiries list or activity logs (Used by Inquiry Dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get("pin");
    const requiredPin = process.env.DASHBOARD_ACCESS_PIN || "2026";

    // Dashboard security protection
    if (pin !== requiredPin) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid dashboard security PIN",
        },
        { status: 401 },
      );
    }

    const action = searchParams.get("action");
    if (action === "activities") {
      const inquiryId = searchParams.get("inquiryId") || undefined;
      const activities = await InquiryService.getHistory(inquiryId);
      return NextResponse.json(activities);
    }

    const result = await InquiryService.getInquiries();
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[Inquiries API GET Error]", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST: Customer inquiry submission or Dashboard updates
 */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    // Check if this is a Dashboard update operation
    if (body.action === "update") {
      const requiredPin = process.env.DASHBOARD_ACCESS_PIN || "2026";
      if (body.pin !== requiredPin) {
        return NextResponse.json(
          { success: false, error: "Unauthorized operation" },
          { status: 401 },
        );
      }

      const parsed = updateInquirySchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { success: false, error: parsed.error.issues[0].message },
          { status: 400 },
        );
      }

      const updateRes = await InquiryService.updateInquiryStatus(parsed.data);
      return NextResponse.json(updateRes);
    }

    // Check if this is a Gmail retry trigger
    if (body.action === "retry_gmail") {
      const requiredPin = process.env.DASHBOARD_ACCESS_PIN || "2026";
      if (body.pin !== requiredPin) {
        return NextResponse.json(
          { success: false, error: "Unauthorized operation" },
          { status: 401 },
        );
      }

      const retryRes = await InquiryService.retryNotifications();
      return NextResponse.json(retryRes);
    }

    // Standard Customer Inquiry Submission (NO GOOGLE AUTH REQUIRED FOR CUSTOMER)
    const parsed = createInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    // Check if Google Apps script is configured
    if (!AppsScriptClient.isConfigured()) {
      // Graceful fallback for local development before business owner deploys Web App
      const mockId = "INQ-2026-" + Math.floor(1000 + Math.random() * 9000);
      return NextResponse.json({
        success: true,
        inquiryId: mockId,
        gmailStatus: "SKIPPED_LOCAL",
        message:
          "Inquiry accepted. (Notice: Google Apps Script Web App URL pending configuration in .env.local).",
      });
    }

    const result = await InquiryService.submitCustomerInquiry(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to record inquiry" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      inquiryId: result.inquiryId,
      gmailStatus: result.gmailStatus,
    });
  } catch (err: unknown) {
    console.error("[Inquiries API POST Error]", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during submission",
      },
      { status: 500 },
    );
  }
}
