import Link from "next/link";
import {
  Wrench,
  Code,
  Cpu,
  CheckCircle2,
  Store,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/shared/button";
import { ServiceCard } from "@/components/cards/service-card";
import { FadeIn } from "@/components/motion/fade-in";
import { servicesData } from "@/config/services";

export default function HomePage() {
  const repairServices = servicesData.filter(
    (s) => s.division === "electronics",
  );
  const digitalServices = servicesData.filter((s) => s.division === "digital");

  return (
    <>
      {/* 1. HERO SECTION (Editorial Luxury Minimal) */}
      <section className="relative overflow-hidden bg-[#FFFFFF] pt-14 pb-24 md:pt-24 md:pb-32 border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Narrative */}
            <div className="lg:col-span-7 space-y-7">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-xs font-bold text-[#000000] uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#C6A76B]"></span>
                  Technology Studio & Electronics Laboratory
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#000000] leading-[1.06]">
                  Technology deserves a better touch.
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg sm:text-xl text-[#666666] max-w-2xl leading-relaxed font-normal">
                  Expert electronics repair and thoughtfully engineered business
                  websites for modern companies. Component-level craftsmanship
                  meets cutting-edge web architecture.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                  <Button href="#divisions" variant="primary" size="lg">
                    Explore Services
                  </Button>
                  <Button
                    href="/contact?type=digital"
                    variant="secondary"
                    size="lg"
                  >
                    Get a Project Quote
                  </Button>
                </div>
              </FadeIn>

              {/* Quick Trust Highlights */}
              <FadeIn direction="up" delay={0.4}>
                <div className="pt-8 border-t border-[#E5E5E5] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-bold text-[#000000] uppercase tracking-wider">
                  <div className="flex items-center gap-2.5">
                    <Store className="h-4 w-4 text-[#C6A76B]" />
                    <span>Physical Workshop</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Cpu className="h-4 w-4 text-[#C6A76B]" />
                    <span>Micro-Soldering</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Code className="h-4 w-4 text-[#C6A76B]" />
                    <span>Next.js Architecture</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column Editorial Card */}
            <div className="lg:col-span-5">
              <FadeIn direction="left" delay={0.2}>
                <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] p-8 sm:p-10 shadow-xl hover:border-[#C6A76B] transition-all">
                  <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-6 mb-6">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#666666] font-bold">
                        Dual Operating Model
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl text-[#000000] mt-0.5">
                        How We Serve You
                      </h3>
                    </div>
                    <span className="h-3 w-3 rounded-full bg-[#C6A76B]"></span>
                  </div>

                  {/* Division 1 Card */}
                  <div className="p-5 rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[#000000] flex items-center gap-1.5 tracking-wider">
                        <Wrench className="h-3.5 w-3.5 text-[#C6A76B]" />
                        Division A
                      </span>
                      <span className="text-[10px] font-bold bg-[#000000] text-[#C6A76B] border border-[#C6A76B]/40 px-3 py-1 rounded-md tracking-wider">
                        In-Store Drop-off
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#000000] mt-3">
                      Electronics & Hardware Repair
                    </h4>
                    <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                      Computers, laptops, TVs, audio systems, and PCB appliances
                      inspected on our workbench in Nagpur.
                    </p>
                  </div>

                  {/* Division 2 Card */}
                  <div className="p-5 rounded-2xl bg-[#171717] text-[#FFFFFF] border border-[#333333]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[#FFFFFF] flex items-center gap-1.5 tracking-wider">
                        <Code className="h-3.5 w-3.5 text-[#C6A76B]" />
                        Division B
                      </span>
                      <span className="text-[10px] font-bold bg-[#000000] text-[#FFFFFF] border border-[#C6A76B]/40 px-3 py-1 rounded-md tracking-wider">
                        Online & Remote
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#FFFFFF] mt-3">
                      Website Development
                    </h4>
                    <p className="text-xs text-[#CCCCCC] mt-1.5 leading-relaxed">
                      High-converting Next.js websites engineered for local
                      businesses, clinics, and modern studios.
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#000000] font-bold">
                    <span>Workshop Hours: 10:00 AM – 8:30 PM</span>
                    <Link
                      href="/about"
                      className="text-[#000000] hover:text-[#C6A76B] transition-colors flex items-center gap-1"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3 w-3 text-[#C6A76B]" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE TWO DIVISIONS SECTION (Warm Ivory Background) */}
      <SectionWrapper id="divisions" variant="secondary">
        <Container size="wide">
          <SectionHeading
            badge="Business Model"
            badgeVariant="gold"
            title="Two Clear Divisions. One Standard of Rigor."
            subtitle="Whether you need physical repair of critical hardware or clean, maintainable web architecture, we approach both with precision engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Division A Card */}
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] p-8 sm:p-12 flex flex-col justify-between shadow-sm transition-all">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#000000] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider mb-8">
                  Division A: Physical Shop Only
                </div>
                <h3 className="text-3xl font-extrabold font-heading text-[#000000]">
                  Electronics & Computer Repairs
                </h3>
                <p className="mt-4 text-base text-[#666666] leading-relaxed font-normal">
                  Precision workbench diagnostics for laptops, desktops,
                  television sets, radios, and electronic appliance
                  motherboards.
                </p>

                {/* Explicit Business Rule Notice */}
                <div className="mt-8 p-5 rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] text-xs text-[#000000] space-y-2">
                  <div className="font-bold text-[#000000] flex items-center gap-2 tracking-wide uppercase">
                    <Store className="h-4 w-4 text-[#C6A76B]" />
                    In-Store Diagnostic Requirement
                  </div>
                  <p className="font-normal text-[#666666] leading-relaxed">
                    All repairs are conducted strictly inside our physical
                    workshop in Nagpur. We do not provide home visits, doorstep
                    pickups, or deliveries to protect diagnostic integrity.
                  </p>
                </div>

                <ul className="mt-8 space-y-3.5 text-sm text-[#000000] font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Computer & Laptop Chip-Level Repair</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Television Panel & Power Supply Restoration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Audio Receivers & Home Theatre Amplifiers</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-[#E5E5E5]">
                <Button
                  href="/electronics-repair"
                  variant="secondary"
                  className="w-full"
                >
                  Explore Repair Services
                </Button>
              </div>
            </div>

            {/* Division B Card */}
            <div className="rounded-3xl bg-[#171717] text-[#FFFFFF] border border-[#333333] hover:border-[#C6A76B] p-8 sm:p-12 flex flex-col justify-between shadow-2xl transition-all">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#000000] border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-bold uppercase tracking-wider mb-8">
                  Division B: Digital Solutions
                </div>
                <h3 className="text-3xl font-extrabold font-heading text-[#FFFFFF]">
                  Modern Business Websites
                </h3>
                <p className="mt-4 text-base text-[#CCCCCC] leading-relaxed font-normal">
                  High-speed, SEO-optimized digital web presence engineered for
                  local businesses, clinics, manufacturers, and professional
                  studios ready to scale.
                </p>

                <div className="mt-8 p-5 rounded-2xl bg-[#000000] border border-[#333333] text-xs text-[#FFFFFF] space-y-2">
                  <div className="font-bold text-[#FFFFFF] flex items-center gap-2 tracking-wide uppercase">
                    <Code className="h-4 w-4 text-[#C6A76B]" />
                    Full Lifecycle Web Engineering
                  </div>
                  <p className="font-normal text-[#CCCCCC] leading-relaxed">
                    Modern Next.js App Router websites, local business SEO
                    schema, and integrated lead funnels engineered without
                    bloated page builders.
                  </p>
                </div>

                <ul className="mt-8 space-y-3.5 text-sm text-[#F5F5F5] font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Business Websites Creation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Google Local Business & Rich Snippets SEO</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#C6A76B] shrink-0" />
                    <span>Conversion-Focused Contact & Quote Funnels</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-[#333333]">
                <Button
                  href="/website-development"
                  variant="darkSurfacePrimary"
                  className="w-full"
                >
                  Explore Website Development
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. ELECTRONICS REPAIR SERVICES SECTION (White Surface) */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <SectionHeading
            badge="Division A"
            badgeVariant="gold"
            title="Electronics & Hardware Services"
            subtitle="Specialized bench repair using professional oscilloscopes, thermal cameras, and micro-soldering stations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {repairServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. DIGITAL SOLUTIONS / WEBSITE DEV SECTION (Featured Black Surface) */}
      <SectionWrapper variant="dark">
        <Container size="wide">
          <SectionHeading
            badge="Division B"
            badgeVariant="white"
            title="Website Development Solutions"
            subtitle="High-converting editorial websites that eliminate slowness and elevate brand credibility."
            theme="dark"
          />

          <div className="max-w-2xl mx-auto">
            {digitalServices.map((service) => (
              <ServiceCard key={service.id} service={service} theme="dark" />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 5. WHY CHOOSE US (White Surface) */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <SectionHeading
            badge="Engineering Standards"
            title="Why Shukla Electronic & Computer Services"
            subtitle="We blend meticulous hardware craft with contemporary software engineering."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Cpu className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#000000]">
                  Chip-Level Expertise
                </h4>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  We repair down to individual ICs, capacitors, and micro-traces
                  instead of forcing costly motherboard replacements.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#000000]">
                  Clean Next.js Code
                </h4>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  No bloated page builders. We write pure, scalable TypeScript
                  and Next.js App Router architectures for blazing speed.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#000000]">
                  Transparent Diagnostics
                </h4>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  Clear post-inspection quotes with no hidden charges. Genuine
                  parts and honest repair feasibility reports.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Store className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#000000]">
                  Dedicated Workshop
                </h4>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  Visit our physical workbench directly, speak with the
                  technicians, and test your device thoroughly before checkout.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. CTA & SHOP LOCATION INVITATION (Soft Black #171717) */}
      <SectionWrapper variant="darkSoft">
        <Container size="wide">
          <div className="rounded-3xl bg-[#000000] text-[#FFFFFF] p-10 sm:p-16 relative overflow-hidden border border-[#C6A76B]/40 shadow-2xl">
            <div className="max-w-3xl space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFFF] text-[#000000] text-xs font-bold uppercase tracking-wider">
                Ready to Collaborate?
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#FFFFFF] leading-tight">
                Visit our workshop or start a digital project
                <span className="text-[#C6A76B]">.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-normal">
                Drop by our physical store in Nagpur for in-person diagnostics,
                or request an online proposal for your business website.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-5">
                <Button
                  href="/contact?type=repair"
                  variant="darkSurfacePrimary"
                  size="lg"
                >
                  Workshop Directions & Hours
                </Button>
                <Button
                  href="/contact?type=digital"
                  variant="darkSurfaceSecondary"
                  size="lg"
                >
                  Request Website Quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
