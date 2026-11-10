import type { Metadata } from "next";
import { Zap, Layers, Sparkles, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/shared/button";
import { TypewriterHeading } from "@/components/sections/typewriter-heading";

export const metadata: Metadata = {
  title: "Website Development | Modern Business Websites",
  description:
    "Fast, conversion-focused, and beautifully architected business websites with Champagne Gold elegance.",
};

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <section className="pt-20 pb-16 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-bold uppercase tracking-wider">
              Division B • Digital Solutions
            </span>
            <TypewriterHeading
              text="Software and Website"
              className="text-4xl sm:text-6xl text-left"
            />
            <p className="text-lg text-[#666666] leading-relaxed font-normal">
              We design and code clean, editorial websites for businesses that
              demand sub-second load speeds, modern aesthetics, and superior
              Google search visibility.
            </p>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <SectionHeading
            badge="Engineering Philosophy"
            badgeVariant="gold"
            title="Beyond Generic Best Experience in Website."
            subtitle="Generic page builders create slow, bloated code. We engineer bespoke Full stack development systems with zero compromises."
            enableTypewriter={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                  Sub-Second Core Web Vitals
                </h3>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  By leveraging React Server Components (RSC) and image
                  optimization, your site renders instantly on 4G networks.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                  Refined Luxury Typography
                </h3>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  Clean editorial typography, champagne gold accents, and
                  intentional whitespace establish instant credibility.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] shadow-sm flex flex-col justify-between transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#000000] text-[#FFFFFF] flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-[#C6A76B]" />
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                  Engineered for Search Engines
                </h3>
                <p className="mt-3 text-sm text-[#666666] leading-relaxed font-normal">
                  Built-in semantic HTML, Open Graph cards, dynamic sitemaps,
                  and Schema.org structured data out of the box.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Website Packages (Warm Ivory) */}
      <SectionWrapper variant="secondary">
        <Container size="wide">
          <SectionHeading
            badge="Project Scope"
            badgeVariant="gold"
            title="Tailored Packages for Every Growth Stage"
            subtitle="Clear delivery milestones and complete source-code ownership with zero monthly licensing traps."
            align="center"
            enableTypewriter={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Starter Business Web */}
            <div className="p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] flex flex-col justify-between shadow-sm transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
                  Essential
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#000000] mt-1.5">
                  Business Presence Website
                </h3>
                <p className="text-sm text-[#666666] mt-3 font-normal leading-relaxed">
                  Perfect for local shops, healthcare clinics, and professional
                  practices needing high credibility.
                </p>

                <ul className="mt-8 space-y-3.5 text-sm text-[#000000] font-medium">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Up to 5 custom-designed website pages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Mobile-first responsive architecture</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Google Business & Local SEO Schema</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Interactive inquiry form with validation</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-[#E5E5E5]">
                <Button
                  href="/contact?service=business-website"
                  variant="secondary"
                  className="w-full"
                >
                  Request Consultation
                </Button>
              </div>
            </div>

            {/* Custom Web Application */}
            <div className="p-10 rounded-3xl bg-[#171717] text-[#FFFFFF] border border-[#333333] hover:border-[#C6A76B] flex flex-col justify-between shadow-2xl transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
                  Advanced
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#FFFFFF] mt-1.5">
                  Full-Scale Digital Platform
                </h3>
                <p className="text-sm text-[#CCCCCC] mt-3 font-normal leading-relaxed">
                  For service companies, catalogs, and businesses requiring
                  interactive portals and custom databases.
                </p>

                <ul className="mt-8 space-y-3.5 text-sm text-[#F5F5F5] font-medium">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Multi-route architecture & custom components</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>API integrations (WhatsApp, CRM, Payment links)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Admin dashboard & content workflows</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#C6A76B] shrink-0" />
                    <span>Motion animations & dynamic interactive UX</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-[#333333]">
                <Button
                  href="/contact?service=custom-web-platform"
                  variant="darkSurfacePrimary"
                  className="w-full"
                >
                  Get a Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
