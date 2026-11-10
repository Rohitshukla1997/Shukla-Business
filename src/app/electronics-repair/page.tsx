import type { Metadata } from "next";
import { Store, Clock, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/shared/button";
import { ServiceCard } from "@/components/cards/service-card";
import { servicesData } from "@/config/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Electronics & Computer Repair | Physical Workshop Nagpur",
  description:
    "Professional in-store component-level repair for laptops, desktop computers, television sets, audio equipment, and appliance circuit boards in Nagpur.",
};

export default function ElectronicsRepairPage() {
  const repairServices = servicesData.filter((s) => s.division === "electronics");

  return (
    <>
      {/* Editorial Header */}
      <section className="pt-20 pb-16 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-bold uppercase tracking-wider">
              Division A • Physical Workshop Services Only
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#000000]">
              Component-Level Electronics Repair
            </h1>
            <p className="text-lg text-[#666666] leading-relaxed font-normal">
              We rescue broken logic boards, power supplies, and audio circuits through precision micro-soldering.
              All repairs are conducted strictly at our in-store workbench in Nagpur.
            </p>
          </div>
        </Container>
      </section>

      {/* STRICT BUSINESS POLICY ALERT BOX (Cool Light Grey) */}
      <SectionWrapper variant="secondary" noPadding className="py-10">
        <Container size="wide">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#C6A76B]/40 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="p-3.5 rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
                <Store className="h-7 w-7 text-[#C6A76B]" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold font-heading text-[#000000]">
                  Important: In-Shop Drop-Off Policy
                </h2>
                <p className="text-sm text-[#666666] mt-1.5 max-w-3xl leading-relaxed font-normal">
                  To maintain rigorous ESD control and utilize bench oscilloscopes,{" "}
                  <strong className="text-[#000000]">all repairs require visiting our physical store in Nagpur</strong>. We do not provide
                  home visits, pickup services, or delivery.
                </p>
              </div>
            </div>
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-[#000000] bg-[#FFFFFF] text-[#000000] text-xs font-bold uppercase tracking-wider hover:bg-[#F4F4F4] hover:border-[#C6A76B] whitespace-nowrap transition-all shadow-sm"
            >
              <MapPin className="h-4 w-4 mr-2 text-[#C6A76B]" />
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </a>
          </div>
        </Container>
      </SectionWrapper>

      {/* Detailed Services Grid */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <SectionHeading
            badge="Workbench Capabilities"
            badgeVariant="gold"
            title="Comprehensive Hardware Solutions"
            subtitle="Inspected and repaired by experienced hardware technicians using genuine components."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {repairServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Workshop Diagnostic Protocol */}
      <SectionWrapper variant="secondary">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
                Diagnostic Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#000000] mt-2 mb-6">
                Why bench diagnostics matter for micro-electronics
              </h2>
              <p className="text-base text-[#666666] leading-relaxed mb-6 font-normal">
                Modern circuit boards feature multi-layer traces and dense BGA chip architectures.
                Attempting makeshift repairs without proper workbench test equipment risks permanent delamination.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#000000] font-medium">
                  <CheckCircle className="h-5 w-5 text-[#C6A76B] shrink-0" />
                  <span>Oscilloscope waveform analysis on power rails</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#000000] font-medium">
                  <CheckCircle className="h-5 w-5 text-[#C6A76B] shrink-0" />
                  <span>Microscopic examination of solder joints & pad corrosion</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#000000] font-medium">
                  <CheckCircle className="h-5 w-5 text-[#C6A76B] shrink-0" />
                  <span>Ultrasonic cleansing for liquid-damaged hardware</span>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] space-y-6 shadow-lg transition-all">
              <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                Visit Our Physical Workshop
              </h3>
              <div className="space-y-4 text-sm text-[#666666]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                  <span className="font-semibold text-[#000000]">{siteConfig.contact.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.workingHours}</span>
                </div>
              </div>
              <div className="pt-5 border-t border-[#E5E5E5]">
                <Button href="/contact?type=repair" variant="primary" className="w-full">
                  Check-in Device Before Visit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
