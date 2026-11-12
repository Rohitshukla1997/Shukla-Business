import type { Metadata } from "next";
import { SecondHandDealsSection } from "@/components/sections/second-hand-deals-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shukla Electronics in Nagpur",
  description:
    "Repair electronics, sales of accessories, electrical materials, and tested second-hand smart LED TVs, laptops, computers, and appliances in Nagpur. 25-point workshop inspection and direct in-shop deals.",
  keywords: [
    "Second hand Tv Nagpur",
    "Used LED TV Nagpur",
    "Repair electronics Nagpur",
    "Repair computer Nagpur",
    "Electronic accessories Nagpur",
    "Electrical materials Nagpur",
    "Certified electronics repair shop",
  ],
  alternates: {
    canonical: "/second-hand-deals",
  },
  openGraph: {
    title: "Shukla Electronics Nagpur",
    description:
      "Repair electronics, sales of accessories, electrical materials, and verified pre-owned LED TVs and laptops in Nagpur with fair valuation.",
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
