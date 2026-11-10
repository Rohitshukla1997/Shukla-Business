export interface ServiceItem {
  id: string;
  division: "electronics" | "digital";
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  features: string[];
  ctaText: string;
  ctaHref: string;
  requirementNotice?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "computer-laptop-repair",
    division: "electronics",
    title: "Computer & Laptop Repair",
    tagline: "Motherboard micro-soldering, chip replacement, and thermal rebuilds",
    description:
      "Expert hardware diagnostic and component-level repairs for Windows PCs, MacBooks, gaming rigs, and office workstations.",
    highlights: ["In-shop micro-soldering", "Component-level testing", "Original replacement parts"],
    features: [
      "No display & power cycling diagnosis",
      "Liquid damage recovery & ultrasonic cleansing",
      "BGA chip reballing & hinge/chassis restoration",
      "RAM, NVMe SSD speed & thermal pad upgrades",
    ],
    ctaText: "Visit Workshop for Inspection",
    ctaHref: "/contact?service=computer-repair",
    requirementNotice: "Physical Drop-off Only: Repairs are strictly performed at our workbench in Nagpur.",
  },
  {
    id: "tv-audio-repair",
    division: "electronics",
    title: "Television & Audio Systems",
    tagline: "LED/OLED backlight restoration, power boards, and vintage amplifier servicing",
    description:
      "Comprehensive diagnostic and repair for smart TVs, audio receivers, studio monitors, radios, and home theatre surround setups.",
    highlights: ["Audio fidelity restoration", "SMPS power board repairs", "Panel backlight replacement"],
    features: [
      "Smart LED / OLED backlights & T-CON boards",
      "Transistor & capacitor replacements for vintage radios",
      "Subwoofer amplifier driver repairs & channel balancing",
      "Short-circuit and surge recovery for SMPS units",
    ],
    ctaText: "Bring Unit to Shop",
    ctaHref: "/contact?service=tv-audio-repair",
    requirementNotice: "In-Shop Service Only: Bring your television or audio receiver to our store for diagnostics.",
  },
  {
    id: "appliance-repair",
    division: "electronics",
    title: "Electronic Appliance PCB Repair",
    tagline: "Motherboard and inverter control circuit repairs",
    description:
      "Repair and revival of electronic appliance PCB control units, power boards, and microcontrollers.",
    highlights: ["Microcontroller flashing", "Relay board restoration", "Fast workshop turnaround"],
    features: [
      "Inverter board circuit troubleshooting",
      "Capacitive switch and display panel repair",
      "Power surge protection diode replacements",
      "Micro-component soldering and test bench stress analysis",
    ],
    ctaText: "Drop Off for Diagnostic",
    ctaHref: "/contact?service=appliance-repair",
    requirementNotice: "Physical Workshop Only: Kindly bring the PCB control unit or appliance to our store counter.",
  },
  {
    id: "website-development",
    division: "digital",
    title: "Modern Business Websites",
    tagline: "Fast, editorial, conversion-focused Next.js websites",
    description:
      "High-speed, SEO-optimized digital web presence engineered for local businesses, clinics, manufacturers, and professional studios.",
    highlights: ["Zero bloat Next.js App Router", "Sub-second LCP speeds", "Black, White & Champagne Gold aesthetic"],
    features: [
      "Mobile-first responsive architecture",
      "Enterprise-grade technical SEO and schema markup",
      "Tailored UI tokens with bespoke typography",
      "Integrated contact funnels and lead generation",
    ],
    ctaText: "Get a Website Quote",
    ctaHref: "/contact?service=website-development",
  },
];
