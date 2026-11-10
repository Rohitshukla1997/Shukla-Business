import { InquiryDashboard } from "@/modules/inquiries/components/inquiry-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry Management Portal | Shukla Business",
  description:
    "Authorized Google Sheets and Gmail synchronized dashboard for managing customer inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <InquiryDashboard />;
}
