import Link from "next/link";
import {
  Wrench,
  Code,
  Cpu,
  Store,
  Tv,
  Laptop,
  CircuitBoard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Button } from "@/components/shared/button";
import { TVDisassemblySection } from "@/components/sections/tv-disassembly-section";
import { TypewriterHeading } from "@/components/sections/typewriter-heading";

const featuredRepairCards = [
  {
    id: "laptops",
    icon: Laptop,
    title: "Computers & Laptop",
    tagline: "Chip-level BGA & logic boards",
    badge: "In-Store",
    href: "/electronics-repair#laptops",
  },
  {
    id: "tvs",
    icon: Tv,
    title: "LED TVs & Audio Systems",
    tagline: "SMPS power boards & backlights",
    badge: "Workbench",
    href: "/electronics-repair#tv",
  },
  {
    id: "appliances",
    icon: CircuitBoard,
    title: "Electronic Appliance PCBs",
    tagline: "Inverter circuits & controllers",
    badge: "Diagnostics",
    href: "/electronics-repair#appliances",
  },
  {
    id: "websites",
    icon: Code,
    title: "Business Websites",
    tagline: "High-speed modern Next.js systems",
    badge: "Digital",
    href: "/website-development",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. CLEAN EDITORIAL HERO */}
      <section className="relative bg-[#FFFFFF] pt-8 pb-16 md:pt-12 md:pb-20 border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="sr-only">
              Electronics &amp; Computer Repair and Website Development in
              Nagpur — Shukla Electronic &amp; Computer Services
            </h1>

            <TypewriterHeading
              as="h2"
              text={[
                "Technology deserves a better touch.",
                "Precision electronics repair on our workbench.",
                "Custom business websites built for speed.",
                "Transparent diagnostics with component-level craft.",
                "Bridging physical hardware with modern digital code.",
              ]}
              className="text-4xl sm:text-6xl lg:text-7xl text-center max-w-4xl mx-auto leading-[1.08] tracking-tight"
            />

            <p className="text-lg sm:text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed font-normal">
              Expert electronics workbench repair and modern business websites
              engineered in Nagpur. Pure craft, transparent diagnostics, and
              clean architecture.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button href="#divisions" variant="primary" size="lg">
                Explore Services
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact & Workshop Map
              </Button>
            </div>

            {/* Quick 3-Pillar Badges */}
            <div className="pt-8 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-bold text-[#000000] uppercase tracking-wider">
              <div className="flex items-center justify-center gap-2.5">
                <Store className="h-4 w-4 text-[#C6A76B]" />
                <span>Physical In-Store Workshop</span>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <Cpu className="h-4 w-4 text-[#C6A76B]" />
                <span>Micro-Soldering Diagnostics</span>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <Code className="h-4 w-4 text-[#C6A76B]" />
                <span>Professional Business Websites</span>
              </div>
            </div>

            {/* HERO PRODUCT & SERVICE SHOWCASE CARDS (SECOND PRODUCT LIST CART) */}
            <div className="pt-10">
              <div className="text-left mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A76B] block">
                    Core Product & Service Catalogue
                  </span>
                  <span className="font-heading font-extrabold text-base text-[#000000]">
                    Select Category for Direct Check-In
                  </span>
                </div>
                <Link
                  href="/electronics-repair"
                  className="text-xs font-bold text-[#000000] hover:text-[#C6A76B] transition-colors flex items-center gap-1"
                >
                  <span>All Services</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C6A76B]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {featuredRepairCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="group p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-10 w-10 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon className="h-5 w-5 text-[#C6A76B]" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F4F4F4] text-[#000000] border border-[#E5E5E5] group-hover:border-[#C6A76B]/50 transition-colors">
                            {card.badge}
                          </span>
                        </div>
                        <h4 className="font-heading font-extrabold text-sm text-[#000000] group-hover:text-[#C6A76B] transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#666666] mt-1 font-normal leading-relaxed">
                          {card.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F4F4F4] flex items-center justify-between text-xs font-bold text-[#000000]">
                        <span className="text-[11px] group-hover:underline">
                          Explore Specs
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#C6A76B] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE SCROLL-BASED TV DISASSEMBLY & REASSEMBLY */}
      <TVDisassemblySection />

      {/* 3. SIMPLE & SWEET TWO DIVISIONS */}
      <SectionWrapper id="divisions" variant="secondary">
        <Container size="wide">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
              Our Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#000000] mt-2">
              Two Dedicated Divisions
            </h2>
            <p className="text-sm text-[#666666] mt-2">
              Hardware bench repair in Nagpur, alongside bespoke web
              engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Division A: Electronics Repair */}
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] p-8 sm:p-10 flex flex-col justify-between shadow-sm transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#000000] text-[#FFFFFF]">
                    Division A
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#F4F4F4] text-[#000000] border border-[#E5E5E5] flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5 text-[#C6A76B]" />
                    In-Store Drop-off
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                  Electronics & Computer Repair
                </h3>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  Component-level diagnostics for laptops, desktops, LED
                  televisions, audio systems, and appliance motherboards.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-[#F4F4F4] border border-[#E5E5E5] text-xs text-[#000000]">
                  <strong>Workshop Notice:</strong> All repairs happen on our
                  workbench in Nagpur. No doorstep or home visits.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                <Button
                  href="/electronics-repair"
                  variant="secondary"
                  className="w-full flex items-center justify-center"
                >
                  <span>View Repair Services</span>
                  <ArrowRight className="h-4 w-4 ml-2 text-[#C6A76B]" />
                </Button>
              </div>
            </div>

            {/* Division B: Website Development */}
            <div className="rounded-3xl bg-[#171717] text-[#FFFFFF] border border-[#333333] hover:border-[#C6A76B] p-8 sm:p-10 flex flex-col justify-between shadow-xl transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#000000] text-[#C6A76B] border border-[#C6A76B]/40">
                    Division B
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#000000] text-[#FFFFFF] border border-[#333333] flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5 text-[#C6A76B]" />
                    Remote & Online
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold font-heading text-[#FFFFFF]">
                  Modern Website Development
                </h3>
                <p className="mt-3 text-sm text-[#CCCCCC] leading-relaxed font-normal">
                  Custom Next.js websites built with sub-second speeds, clean
                  design, and local SEO structure for modern businesses.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-[#000000] border border-[#333333] text-xs text-[#CCCCCC]">
                  <strong>Clean Tech Stack:</strong> React, Next.js App Router,
                  Tailwind CSS, and TanStack Query caching.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#333333]">
                <Button
                  href="/website-development"
                  variant="darkSurfacePrimary"
                  className="w-full flex items-center justify-center"
                >
                  <span>Explore Web Solutions</span>
                  <ArrowRight className="h-4 w-4 ml-2 text-[#C6A76B]" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. CONCISE CALL TO ACTION */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#000000] text-[#FFFFFF] p-8 sm:p-12 border border-[#C6A76B]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
                Visit Us or Start a Project
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#FFFFFF]">
                Ready to talk? Reach out today.
              </h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] max-w-lg">
                Tue–Sun 10:00 AM – 9:00 PM at our Nagpur workshop, or send an
                inquiry online.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                href="/contact?type=repair"
                variant="darkSurfacePrimary"
                size="md"
              >
                Workshop Location
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
