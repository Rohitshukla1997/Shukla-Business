import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/shared/button";
import { TypewriterHeading } from "@/components/sections/typewriter-heading";
import { Store, Code, HeartHandshake, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us | Hardware Craft & Software Engineering in Nagpur",
  description:
    "Discover Shukla Electronic & Computer Services in Nagpur. Founded on component-level electronics craft, transparent workbench diagnostics, and custom software engineering.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Shukla Electronic & Computer Services Nagpur",
    description:
      "Combining physical electronics repair craft with modern software engineering in Nagpur.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-8 pb-12 md:pt-10 md:pb-14 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-bold uppercase tracking-wider">
              Our Story & Philosophy
            </span>
            <TypewriterHeading
              text="Bridging Hardware Craft with Modern Software."
              className="text-4xl sm:text-6xl text-left"
            />
            <p className="text-lg text-[#666666] leading-relaxed font-normal">
              We started with a simple belief: whether you are repairing a
              critical circuit board or architecting a digital platform, true
              engineering comes down to fundamentals, honesty, and precision.
            </p>
          </div>
        </Container>
      </section>

      {/* Origin Story */}
      <SectionWrapper variant="primary">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#000000]">
                Why we operate with two dedicated divisions
              </h2>
              <p className="text-base text-[#666666] leading-relaxed">
                Most repair shops remain isolated in legacy routines, while most
                digital software agencies lack an understanding of hardware
                constraints and physical business operations.
              </p>
              <p className="text-base text-[#666666] leading-relaxed">
                At Shukla Electronic & Computer Services in Nagpur, we bring
                both worlds together. Our hardware technicians use oscilloscopes
                and high-grade soldering rigs on physical workbenches to revive
                expensive electronics. Simultaneously, our software team builds
                websites and tailor-made management applications that empower
                small and growing enterprises.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] transition-all shadow-sm">
                  <h4 className="font-heading font-bold text-base text-[#000000] flex items-center gap-2">
                    <Store className="h-5 w-5 text-[#C6A76B]" />
                    Physical Workshop
                  </h4>
                  <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                    All electronics repairs happen right in our store. Direct
                    diagnosis without outsourcing.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#C6A76B] transition-all shadow-sm">
                  <h4 className="font-heading font-bold text-base text-[#000000] flex items-center gap-2">
                    <Code className="h-5 w-5 text-[#C6A76B]" />
                    Online Digital Lab
                  </h4>
                  <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                    Full-stack web applications, custom website design and cloud
                    setups.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#F4F4F4] border border-[#E5E5E5] space-y-6 shadow-sm">
              <h3 className="text-2xl font-bold font-heading text-[#000000]">
                Core Values We Live By
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <ShieldCheck className="h-5 w-5 text-[#C6A76B] shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-sm text-[#000000]">
                      Zero False Claims
                    </h5>
                    <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                      We do not promise home doorstep repairs because genuine
                      chip-level testing cannot be carried in a backpack. We are
                      upfront about our in-shop requirement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HeartHandshake className="h-5 w-5 text-[#C6A76B] shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-sm text-[#000000]">
                      Longevity Over Disposability
                    </h5>
                    <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                      We believe in repairing equipment before replacing it, and
                      writing maintainable code that lasts years without
                      breaking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E5E5]">
                <Button href="/contact" variant="primary" className="w-full">
                  Get In Touch With Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
