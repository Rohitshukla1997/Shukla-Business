import type { Metadata } from "next";
import { SecondHandDealsSection } from "@/components/sections/second-hand-deals-section";

export const metadata: Metadata = {
  title: "Certified Second-Hand Electronics | Buy & Sell Deals",
  description:
    "Buy and sell certified pre-owned LED TVs, laptops, home theatre audio systems, and electronics appliances with 25-point workshop inspection in Nagpur.",
};

export default function SecondHandDealsPage() {
  return (
    <>
      {/* Directly renders the Buy & Sell option without duplicate top header */}
      <SecondHandDealsSection isStandalonePage={true} />
    </>
  );
}
