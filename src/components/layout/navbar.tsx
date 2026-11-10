"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5]">
      <Container size="wide">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="group flex items-center space-x-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] font-bold text-xl font-heading group-hover:border-[#C6A76B] transition-all border border-[#000000]">
              <span className="group-hover:text-[#C6A76B] transition-colors">S</span>
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base text-[#000000] leading-tight tracking-tight">
                SHUKLA<span className="text-[#C6A76B]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold">
                Electronic & Software
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navigationConfig.mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all",
                    isActive
                      ? "text-[#000000] font-bold"
                      : "text-[#666666] hover:text-[#000000] hover:bg-[#F4F4F4]"
                  )}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C6A76B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button
              href="/contact?type=repair"
              variant="secondary"
              size="sm"
            >
              Shop Check-In
            </Button>
            <Button
              href="/contact?type=digital"
              variant="primary"
              size="sm"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#000000] border border-[#E5E5E5] hover:border-[#C6A76B] hover:bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#000000]" /> : <Menu className="h-6 w-6 text-[#000000]" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Flyout */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 pt-3 pb-7 shadow-lg">
          <div className="space-y-1.5">
            {navigationConfig.mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all",
                    isActive
                      ? "bg-[#000000] text-[#FFFFFF]"
                      : "text-[#000000] hover:bg-[#F4F4F4]"
                  )}
                >
                  <span>{item.title}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#C6A76B]"></span>}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E5E5] space-y-3">
            <div className="text-xs text-[#666666] px-2 font-medium">
              Workshop: {siteConfig.contact.workingHours}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                href="/contact?type=repair"
                variant="secondary"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                In-Shop Drop-off
              </Button>
              <Button
                href="/contact?type=digital"
                variant="primary"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                Quote Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
