import type { Metadata } from "next";
import { SecondHandDealsSection } from "@/components/sections/second-hand-deals-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pre-Owned Electronics in Nagpur",
  description:
    "Buy and sell tested second-hand smart LED TVs, laptops, computers, and electronic appliances in Nagpur. 25-point workshop inspection, fair cash valuation, and direct in-shop deals.",
  keywords: [
    "Second hand laptop Nagpur",
    "Used LED TV Nagpur",
    "Buy sell pre-owned electronics Nagpur",
    "Used computer Nagpur",
    "Certified pre-owned electronics",
  ],
  alternates: {
    canonical: "/second-hand-deals",
  },
  openGraph: {
    title: "Buy & Sell Certified Pre-Owned Electronics | Shukla Services Nagpur",
    description:
      "Buy and sell verified second-hand electronics in Nagpur with 25-point workshop inspection and fair valuation.",
    url: `${siteConfig.url}/second-hand-deals`,
  },
};

export default function SecondHandDealsPage() {
  return (
    <>
      {/* Directly renders the Buy & Sell option without duplicate top header */}
      <SecondHandDealsSection isStandalonePage={true} />
    </>
  );
}
