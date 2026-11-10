import React from "react";
import { Check, ArrowRight, Store } from "lucide-react";
import { ServiceItem } from "@/config/services";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  theme?: "light" | "dark";
  className?: string;
}

export function ServiceCard({ service, theme = "light", className }: ServiceCardProps) {
  const isElectronics = service.division === "electronics";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 border hover:border-[#C6A76B] hover:shadow-xl",
        isDark
          ? "bg-[#171717] text-[#FFFFFF] border-[#333333]"
          : "bg-[#FFFFFF] text-[#000000] border-[#E5E5E5]",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <span
            className={cn(
              "px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
              isDark
                ? "bg-[#000000] text-[#C6A76B] border-[#C6A76B]/40"
                : "bg-[#F4F4F4] text-[#C6A76B] border-[#C6A76B]/40"
            )}
          >
            {isElectronics ? "Physical Workshop" : "Digital Project"}
          </span>

          {isElectronics && (
            <span
              className={cn(
                "flex items-center text-[11px] font-bold px-2.5 py-1 rounded-md border",
                isDark
                  ? "bg-[#000000] text-[#FFFFFF] border-[#333333]"
                  : "bg-[#F4F4F4] text-[#000000] border-[#E5E5E5]"
              )}
            >
              <Store className="h-3.5 w-3.5 mr-1.5 text-[#C6A76B]" />
              In-Shop Only
            </span>
          )}
        </div>

        <h3
          className={cn(
            "text-2xl font-bold font-heading group-hover:text-[#C6A76B] transition-colors",
            isDark ? "text-[#FFFFFF]" : "text-[#000000]"
          )}
        >
          {service.title}
        </h3>

        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#C6A76B]">
          {service.tagline}
        </p>

        <p
          className={cn(
            "mt-4 text-sm leading-relaxed",
            isDark ? "text-[#CCCCCC]" : "text-[#666666]"
          )}
        >
          {service.description}
        </p>

        <div
          className={cn(
            "mt-8 pt-6 border-t",
            isDark ? "border-[#333333]" : "border-[#E5E5E5]"
          )}
        >
          <h4
            className={cn(
              "text-xs font-bold uppercase tracking-wider mb-4",
              isDark ? "text-[#FFFFFF]" : "text-[#000000]"
            )}
          >
            Core Scope & Capabilities
          </h4>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className={cn(
                  "flex items-start text-xs sm:text-sm font-medium",
                  isDark ? "text-[#F5F5F5]" : "text-[#171717]"
                )}
              >
                <Check className="h-4 w-4 mr-2.5 shrink-0 mt-0.5 text-[#C6A76B]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={cn(
          "mt-8 pt-6 border-t",
          isDark ? "border-[#333333]" : "border-[#E5E5E5]"
        )}
      >
        {service.requirementNotice && (
          <p
            className={cn(
              "text-xs font-medium mb-5 p-3 rounded-lg border",
              isDark
                ? "bg-[#000000] text-[#CCCCCC] border-[#333333]"
                : "bg-[#F4F4F4] text-[#171717] border-[#E5E5E5]"
            )}
          >
            ▪ {service.requirementNotice}
          </p>
        )}
        <Button
          href={service.ctaHref}
          variant={isDark ? "darkSurfacePrimary" : (isElectronics ? "secondary" : "primary")}
          size="md"
          className="w-full flex items-center justify-center group/btn"
        >
          <span>{service.ctaText}</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform text-[#C6A76B]" />
        </Button>
      </div>
    </div>
  );
}
