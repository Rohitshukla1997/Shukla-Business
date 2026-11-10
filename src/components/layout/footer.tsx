import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#FFFFFF] pt-20 pb-14 border-t border-[#333333]">
      <Container size="wide">
        {/* Physical Shop Visit Policy Banner */}
        <div className="mb-16 rounded-2xl bg-[#000000] border border-[#C6A76B]/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-start gap-5">
            <div className="p-3.5 rounded-xl bg-[#C6A76B] text-[#000000] shrink-0">
              <ShieldAlert className="h-7 w-7 text-[#000000]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-heading text-[#FFFFFF]">
                Physical Workshop Service Policy
              </h3>
              <p className="text-sm text-[#CCCCCC] mt-1.5 max-w-2xl leading-relaxed">
                All computer, laptop, television, audio, and electronics repairs
                are performed in-house at our workshop bench in Nagpur.{" "}
                <strong className="text-[#FFFFFF]">
                  We do not provide doorstep visits, pickups, or deliveries.
                </strong>
              </p>
            </div>
          </div>
          <a
            href={siteConfig.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#FFFFFF] text-[#000000] hover:bg-[#C6A76B] hover:text-[#000000] text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </a>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[#333333]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block py-1">
              <div className="relative h-12 w-48 sm:h-14 sm:w-56">
                <Image
                  src="/images/logo-dark-mode.png"
                  alt="Shukla Electronic & Computer Services"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-[#CCCCCC] max-w-sm leading-relaxed font-normal">
              Engineering reliable component-level repairs alongside clean,
              modern digital systems and custom web solutions.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-[#CCCCCC]">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#C6A76B] mt-0.5" />
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#FFFFFF] font-medium"
                >
                  {siteConfig.contact.address}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 shrink-0 text-[#C6A76B]" />
                <span>{siteConfig.contact.workingHours}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 shrink-0 text-[#C6A76B]" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 shrink-0 text-[#C6A76B]" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Division A Column */}
          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider uppercase text-[#FFFFFF] mb-5 pb-1 border-b border-[#C6A76B]/40 inline-block">
              Electronics Repair
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationConfig.footerNav.divisionA.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-[#CCCCCC] hover:text-[#C6A76B] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Division B Column */}
          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider uppercase text-[#FFFFFF] mb-5 pb-1 border-b border-[#C6A76B]/40 inline-block">
              Digital Solutions
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationConfig.footerNav.divisionB.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-[#CCCCCC] hover:text-[#C6A76B] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider uppercase text-[#FFFFFF] mb-5 pb-1 border-b border-[#C6A76B]/40 inline-block">
              Company & Help
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationConfig.footerNav.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-[#CCCCCC] hover:text-[#C6A76B] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#CCCCCC] gap-4">
          <p>
            © 2026 Shukla Electronic & Computer Services. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center gap-2 font-medium text-[#FFFFFF]">
              <span className="h-2 w-2 rounded-full bg-[#C6A76B]"></span>
              Nagpur Workshop Active
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
