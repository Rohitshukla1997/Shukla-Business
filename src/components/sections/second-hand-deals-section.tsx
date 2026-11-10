"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Tag,
  ArrowRightLeft,
  CheckCircle2,
  Tv,
  Laptop,
  Speaker,
  Cpu,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

export function SecondHandDealsSection({
  isStandalonePage = false,
}: {
  isStandalonePage?: boolean;
}) {
  const [dealType, setDealType] = useState<"buy" | "sell">("buy");
  const [category, setCategory] = useState<string>("tv");
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form inputs state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deviceDetails: "",
  });

  const categories = [
    { id: "tv", label: "Smart LED TVs", icon: Tv },
    { id: "laptop", label: "Laptops & PCs", icon: Laptop },
    { id: "audio", label: "Home Theatres & Audio", icon: Speaker },
    { id: "appliances", label: "Electronic Appliances", icon: Cpu },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const selectedCategoryObj = categories.find((c) => c.id === category);
      const res = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          phoneNumber: formData.phone,
          emailAddress: formData.email,
          category: `Certified Pre-Owned (${dealType.toUpperCase()})`,
          service: selectedCategoryObj?.label || category,
          subject: `${dealType === "sell" ? "Valuation / Sell Request" : "Purchase Inquiry"} - ${selectedCategoryObj?.label || category}`,
          message: formData.deviceDetails,
          source: "Pre-Owned Deals Portal",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit inquiry");
      }

      setInquiryId(json.inquiryId || null);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="second-hand-deals"
      className={cn(
        "relative bg-[#FFFFFF] border-b border-[#E5E5E5]",
        isStandalonePage ? "pt-6 pb-12 md:pt-8 md:pb-16" : "py-10 md:py-14",
      )}
    >
      <Container size="wide">
        {/* Single Main Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F4] border border-[#C6A76B]/40 text-xs font-bold uppercase tracking-wider text-[#000000]">
            <ArrowRightLeft className="h-3.5 w-3.5 text-[#C6A76B]" />
            <span>Certified Pre-Owned Division</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#000000] tracking-tight">
            Buy & Sell Certified Pre-Owned Electronics
            <span className="text-[#C6A76B]">.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mx-auto font-normal">
            25-point workshop testing on every pre-owned device in Nagpur.
            Instant fair appraisals for sellers and verified, reliable
            electronics for buyers.
          </p>
        </div>

        {/* Main Grid: Visual Showcase Left + Inquiry Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Studio Showcase Card */}
          <div className="lg:col-span-6 rounded-3xl bg-[#171717] text-[#FFFFFF] border border-[#333333] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-xl">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#000000] text-[#C6A76B] border border-[#C6A76B]/40">
                  Nagpur Workshop Certified
                </span>
                <span className="text-xs font-bold text-[#E5E5E5] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#C6A76B]" />
                  Verified Inspection
                </span>
              </div>

              <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden border border-[#333333] bg-[#000000]">
                <Image
                  src="/images/buy-sell-exchange.jpg"
                  alt="Certified Pre-Owned Electronics Showcase"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[#000000] border border-[#333333]">
                  <strong className="block text-[#FFFFFF] font-bold">
                    25-Point Bench Test
                  </strong>
                  <span className="text-[11px] text-[#CCCCCC]">
                    SMPS, display, audio & ports verified
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#000000] border border-[#333333]">
                  <strong className="block text-[#FFFFFF] font-bold">
                    Instant Fair Appraisal
                  </strong>
                  <span className="text-[11px] text-[#CCCCCC]">
                    Sell your used devices for direct cash/trade
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#333333] flex items-center justify-between text-xs text-[#CCCCCC]">
              <span>Visit counter: Tuesday–Sunday, 10:00 AM – 9:00 PM</span>
              <span className="text-[#C6A76B] font-bold">In-Shop Deals</span>
            </div>
          </div>

          {/* Right Column: Customer Buy / Sell Inquiry Form */}
          <div className="lg:col-span-6 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            {submitted ? (
              <div className="my-auto py-10 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F4F4] border border-[#C6A76B] text-[#C6A76B]">
                  <CheckCircle2 className="h-8 w-8 text-[#C6A76B]" />
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-[#000000]">
                  Inquiry Received
                </h3>
                {inquiryId && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#000000] text-[#C6A76B] text-[11px] font-mono font-bold tracking-wide">
                    Reference ID: {inquiryId}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[#666666] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been
                  saved to Google Sheets and our team has been notified via Gmail.
                  We will call you at <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        deviceDetails: "",
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A76B] block">
                    Instant Valuation & Stock Check
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[#000000]">
                    Register Your Buy or Sell Request
                  </h3>
                </div>

                {/* Deal Type Switcher: I Want to Buy vs I Want to Sell */}
                <div className="grid grid-cols-2 gap-2 bg-[#F4F4F4] p-1.5 rounded-xl border border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setDealType("buy")}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-bold transition-all",
                      dealType === "buy"
                        ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                        : "text-[#666666] hover:text-[#000000]",
                    )}
                  >
                    I Want to Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealType("sell")}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-bold transition-all",
                      dealType === "sell"
                        ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                        : "text-[#666666] hover:text-[#000000]",
                    )}
                  >
                    I Want to Sell
                  </button>
                </div>

                {/* Category Pills */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] block mb-1.5">
                    Select Equipment Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left flex flex-col items-center justify-center text-center transition-all",
                            category === cat.id
                              ? "bg-[#000000] text-[#FFFFFF] border-[#C6A76B]"
                              : "bg-[#FFFFFF] text-[#000000] border-[#E5E5E5] hover:border-[#C6A76B] hover:bg-[#F4F4F4]",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 mb-1",
                              category === cat.id
                                ? "text-[#C6A76B]"
                                : "text-[#666666]",
                            )}
                          />
                          <span className="text-[10px] font-bold leading-tight">
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields: Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#000000] block mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#000000] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#000000] block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#000000] block mb-1">
                    Device Description & Condition *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder={
                      dealType === "sell"
                        ? "Mention brand, model number, screen size, working condition, accessories..."
                        : "Describe the specifications, brand preference, or price budget you need..."
                    }
                    value={formData.deviceDetails}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deviceDetails: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold"
                  disabled={isSubmitting}
                >
                  <Send className="h-3.5 w-3.5 text-[#C6A76B]" />
                  <span>
                    {isSubmitting
                      ? "Sending Inquiry..."
                      : dealType === "sell"
                        ? "Submit For Sell Valuation"
                        : "Submit Purchase Inquiry"}
                  </span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
