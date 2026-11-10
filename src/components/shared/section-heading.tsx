import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "gold" | "black" | "white";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "gold",
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  const badgeClasses = {
    gold: "bg-[#F4F4F4] text-[#C6A76B] border-[#C6A76B]/40",
    black: "bg-[#000000] text-[#FFFFFF] border-[#000000]",
    white: "bg-[#FFFFFF] text-[#000000] border-[#E5E5E5]",
  };

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center px-4 py-1.5 mb-5 rounded-full text-xs font-bold uppercase tracking-wider border",
            badgeClasses[badgeVariant]
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",
          isDark ? "text-[#FFFFFF]" : "text-[#000000]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed font-normal",
            isDark ? "text-[#E5E5E5]" : "text-[#666666]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
