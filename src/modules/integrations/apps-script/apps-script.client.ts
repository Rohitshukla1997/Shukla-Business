export interface AppsScriptResponse<T = unknown> {
  success: boolean;
  error?: string;
  count?: number;
  [key: string]: unknown;
}

export class AppsScriptClient {
  private static getUrl(): string | undefined {
    return process.env.APPS_SCRIPT_WEB_APP_URL;
  }

  private static getSharedSecret(): string {
    return (
      process.env.APPS_SCRIPT_SHARED_SECRET || "shukla-sec-2026-integration-key"
    );
  }

  public static isConfigured(): boolean {
    return !!process.env.APPS_SCRIPT_WEB_APP_URL;
  }

  public static async executePost<T = unknown>(
    payload: Record<string, unknown>
  ): Promise<AppsScriptResponse<T>> {
    const url = this.getUrl();
    if (!url) {
      return {
        success: false,
        error: "Google Apps Script Web App URL is not configured in .env.local",
      };
    }

    try {
      const body = {
        ...payload,
        apiKey: this.getSharedSecret(),
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Standard Google Apps Script redirect-safe MIME
        },
        body: JSON.stringify(body),
        redirect: "follow",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script HTTP error: ${response.status}`);
      }

      const data = (await response.json()) as AppsScriptResponse<T>;
      return data;
    } catch (err: unknown) {
      console.error("[AppsScriptClient] POST error:", err);
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to communicate with Google Apps Script",
      };
    }
  }

  public static async executeGet<T = unknown>(
    params: Record<string, string>
  ): Promise<AppsScriptResponse<T>> {
    const baseUrl = this.getUrl();
    if (!baseUrl) {
      return {
        success: false,
        error: "Google Apps Script Web App URL is not configured in .env.local",
      };
    }

    try {
      const url = new URL(baseUrl);
      url.searchParams.set("apiKey", this.getSharedSecret());
      Object.entries(params).forEach(([key, val]) => {
        url.searchParams.set(key, val);
      });

      const response = await fetch(url.toString(), {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script HTTP error: ${response.status}`);
      }

      const data = (await response.json()) as AppsScriptResponse<T>;
      return data;
    } catch (err: unknown) {
      console.error("[AppsScriptClient] GET error:", err);
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to query Google Apps Script",
      };
    }
  }
}

