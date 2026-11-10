import { NextRequest, NextResponse } from "next/server";
import { AppsScriptClient } from "@/modules/integrations/apps-script/apps-script.client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get("pin");
  const requiredPin = process.env.DASHBOARD_ACCESS_PIN || "2026";

  if (pin !== requiredPin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const isConfigured = AppsScriptClient.isConfigured();

  if (!isConfigured) {
    return NextResponse.json({
      success: true,
      status: "PENDING_SETUP",
      message: "Apps Script Web App URL is not yet configured in .env.local",
    });
  }

  const pingResult = await AppsScriptClient.executeGet({ action: "ping" });

  return NextResponse.json({
    success: true,
    status: pingResult.success ? "CONNECTED" : "CONNECTION_ERROR",
    details: pingResult,
  });
}
