"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center py-1">
            <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/logo-trimmed.png"
                alt="Shukla Electronic & Computer Services"
                fill
                priority
                className="object-contain object-left"
              />
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
              variant="primary"
              size="sm"
            >
              Shop Check-In
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
            <div>
              <Button
                href="/contact?type=repair"
                variant="primary"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                Shop Check-In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
