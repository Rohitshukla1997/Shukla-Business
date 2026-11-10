import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "darkSurfacePrimary" | "darkSurfaceSecondary";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A76B] focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase font-semibold",
    md: "px-6 py-2.5 text-sm font-semibold",
    lg: "px-8 py-3.5 text-base font-bold",
  };

  const variantStyles = {
    primary:
      "bg-[#000000] text-[#FFFFFF] hover:bg-[#171717] hover:border-[#C6A76B] border border-[#000000] shadow-sm",
    secondary:
      "bg-[#FFFFFF] text-[#000000] hover:bg-[#F4F4F4] hover:border-[#C6A76B] border border-[#E5E5E5] shadow-sm",
    gold:
      "bg-[#C6A76B] text-[#000000] hover:bg-[#AE8D50] border border-[#C6A76B] shadow-sm font-bold",
    darkSurfacePrimary:
      "bg-[#FFFFFF] text-[#000000] hover:bg-[#F4F4F4] hover:border-[#C6A76B] border border-[#FFFFFF] shadow-sm font-bold",
    darkSurfaceSecondary:
      "bg-transparent text-[#FFFFFF] hover:bg-[#171717] hover:border-[#C6A76B] border border-[#FFFFFF]/40 shadow-sm font-bold",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} prefetch={true} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
