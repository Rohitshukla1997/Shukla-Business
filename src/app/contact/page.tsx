import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ContactForm } from "@/components/contact/contact-form";
import { TypewriterHeading } from "@/components/sections/typewriter-heading";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Clock, Store, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Workshop Location",
  description:
    "Visit our physical electronics repair workshop in Tukdoji Complex, Nagpur (Tue–Sun, 10 AM – 9 PM). Phone: +91 98765 43210. Direct check-in & web consultations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Workshop Location | Shukla Electronic Nagpur",
    description:
      "Physical workshop counter in Nagpur for electronics repair & digital solutions. Get directions and submit service inquiries.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-8 pb-12 md:pt-10 md:pb-14 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <Container size="wide">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-bold uppercase tracking-wider">
              Nagpur Workshop & Digital Lab
            </span>
            <TypewriterHeading
              text="Contact & Workshop Location"
              className="text-4xl sm:text-6xl text-left"
            />
            <p className="text-lg text-[#666666] leading-relaxed font-normal">
              Have a device that needs precision diagnostics, or want to discuss
              a custom digital solution? Reach out directly or visit our
              workshop counter in Nagpur.
            </p>
          </div>
        </Container>
      </section>

      <SectionWrapper variant="primary">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
                  Inquiry Portal
                </span>
                <h2 className="text-3xl font-extrabold font-heading text-[#000000] mt-1">
                  Send Your Inquiry
                </h2>
                <p className="text-sm text-[#666666] mt-1 font-normal">
                  Select your requirement below. We respond within a few
                  business hours.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Right Column: Physical Workshop Details & Map */}
            <div className="lg:col-span-5 space-y-8" id="map">
              <div className="rounded-3xl bg-[#F4F4F4] border border-[#E5E5E5] p-8 sm:p-10 space-y-8 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-[#C6A76B]"></span>
                  <h3 className="font-heading font-extrabold text-2xl text-[#000000]">
                    Workshop Details
                  </h3>
                </div>

                <div className="space-y-5 text-sm text-[#000000]">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#000000] text-base font-bold">
                        Physical Store Address
                      </strong>
                      <span className="text-[#666666] leading-relaxed block mt-0.5">
                        {siteConfig.contact.address}
                      </span>
                      <a
                        href={siteConfig.contact.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-[#C6A76B] hover:underline mt-2 gap-1 uppercase tracking-wider"
                      >
                        <span>Open on Google Maps</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#000000] text-base font-bold">
                        Store Working Hours
                      </strong>
                      <span className="text-[#666666] block mt-0.5">
                        {siteConfig.contact.workingHours}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#000000] text-base font-bold">
                        Direct Phone
                      </strong>
                      <span className="text-[#666666] block mt-0.5">
                        {siteConfig.contact.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#000000] text-base font-bold">
                        Email
                      </strong>
                      <span className="text-[#666666] block mt-0.5">
                        {siteConfig.contact.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Physical Policy Box */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#000000] space-y-2 shadow-sm">
                  <span className="font-bold text-[#000000] flex items-center gap-2 uppercase tracking-wide">
                    <Store className="h-4 w-4 text-[#C6A76B]" />
                    In-Store Drop-off Policy
                  </span>
                  <p className="font-normal text-[#666666] leading-relaxed">
                    For all electronic appliances, computers, and TV repairs,
                    customers must visit our physical store in Nagpur. We do not
                    provide home visits or doorstep collection.
                  </p>
                </div>
              </div>

              {/* Interactive Google Map Embed Card */}
              <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden shadow-sm hover:border-[#C6A76B] transition-all">
                <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F4F4F4]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#C6A76B]" />
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#000000]">
                      Live Google Maps Location
                    </span>
                  </div>
                  <a
                    href={siteConfig.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider text-[#C6A76B] hover:underline flex items-center gap-1.5"
                  >
                    <span>Directions</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="relative w-full h-64 bg-[#F4F4F4]">
                  <iframe
                    title="Shukla Electronic & Computer Services Location"
                    src="https://maps.google.com/maps?q=21.1196276,79.1048427&hl=en&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5 text-xs text-[#666666] bg-[#FFFFFF] font-medium border-t border-[#E5E5E5] leading-relaxed">
                  <strong className="text-[#000000]">Landmark:</strong> Near KMG
                  Hospital Tukdoji Complex, Nagpur. Easily accessible by local
                  transport with street parking available outside.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
