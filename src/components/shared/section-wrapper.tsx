import React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "darkSoft";
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  className,
  variant = "primary",
  noPadding = false,
  ...props
}: SectionWrapperProps) {
  const variantStyles = {
    // Primary: Pure White
    primary: "bg-[#FFFFFF] text-[#000000]",
    // Secondary: Cool Light Grey (#F4F4F4)
    secondary: "bg-[#F4F4F4] text-[#000000] border-y border-[#E5E5E5]",
    // Dark: Pure Black (#000000)
    dark: "bg-[#000000] text-[#FFFFFF]",
    // Dark Soft: #171717
    darkSoft: "bg-[#171717] text-[#FFFFFF]",
  };

  return (
    <section
      className={cn(
        !noPadding && "py-10 md:py-14",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
