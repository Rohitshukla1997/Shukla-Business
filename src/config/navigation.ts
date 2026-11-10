export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const navigationConfig: {
  mainNav: NavItem[];
  footerNav: {
    divisionA: NavItem[];
    divisionB: NavItem[];
    company: NavItem[];
  };
} = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Electronics Repair", href: "/electronics-repair" },
    { title: "Second-Hand Deals", href: "/second-hand-deals", badge: "Deals" },
    { title: "Website Development", href: "/website-development" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: {
    divisionA: [
      { title: "Computer & Laptop Repair", href: "/electronics-repair#laptops" },
      { title: "Television Repair", href: "/electronics-repair#tv" },
      { title: "Audio & Home Theatre", href: "/electronics-repair#audio" },
      { title: "Electronic Appliances", href: "/electronics-repair#appliances" },
      { title: "Shop Walk-In Policy", href: "/electronics-repair#policy" },
    ],
    divisionB: [
      { title: "Website Development", href: "/website-development" },
      { title: "High-Performance Next.js", href: "/website-development#packages" },
      { title: "Local SEO & Schema", href: "/website-development#seo" },
      { title: "Get a Project Quote", href: "/contact?type=digital" },
    ],
    company: [
      { title: "About Shukla Services", href: "/about" },
      { title: "Contact & Workshop Map", href: "/contact" },
      { title: "Check-in Repair Query", href: "/contact?type=repair" },
    ],
  },
};
