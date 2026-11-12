"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validation/contact-schema";
import { Button } from "@/components/shared/button";
import { CheckCircle2, AlertCircle, Store, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      division: "electronics-repair",
      serviceCategory: "computer-laptop-repair",
      inShopAcknowledgment: true,
    },
  });

  const selectedDivision = watch("division");

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionError(null);
      const res = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.fullName,
          phoneNumber: data.phone,
          emailAddress: data.email,
          category:
            data.division === "electronics-repair"
              ? "Electronics Repair"
              : "Digital Solutions",
          service: data.serviceCategory,
          subject: `${data.division === "electronics-repair" ? "Hardware Service" : "Web Project"} - ${data.serviceCategory}`,
          message: data.notes,
          source: "Contact Form",
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
      setSubmissionError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting. Please try calling directly.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#C6A76B] p-10 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F4F4] border border-[#C6A76B] text-[#C6A76B]">
          <CheckCircle2 className="h-9 w-9 text-[#C6A76B]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold font-heading text-[#000000]">
            Inquiry Successfully Received
          </h3>
          {inquiryId && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#000000] text-[#C6A76B] text-xs font-mono font-bold tracking-wide">
              Reference ID: {inquiryId}
            </div>
          )}
        </div>
        <p className="text-base text-[#666666] max-w-md mx-auto leading-relaxed font-normal">
          Your inquiry has been stored in our Google Sheets system and our
          Nagpur team has been notified via Gmail.
        </p>

        {selectedDivision === "electronics-repair" ? (
          <div className="p-6 rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] text-xs text-[#000000] max-w-md mx-auto text-left space-y-1.5">
            <span className="font-extrabold text-[#000000] block text-sm">
              📍 Nagpur Workshop Drop-Off Reminder
            </span>
            <p className="font-normal text-[#666666]">
              Please bring your equipment directly to our physical workshop
              during business hours (Tue–Sun, 10:00 AM – 9:00 PM) for intake and
              inspection.
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] text-xs text-[#000000] max-w-md mx-auto text-left space-y-1.5">
            <span className="font-extrabold text-[#000000] block text-sm">
              💻 Software Project Consultation
            </span>
            <p className="font-normal text-[#666666]">
              Our lead software architect will get back to you with a
              preliminary scope outline and quote.
            </p>
          </div>
        )}

        <div className="pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              setSubmitted(false);
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] p-8 sm:p-12 space-y-8 shadow-sm hover:border-[#C6A76B] transition-all"
      noValidate
    >
      {/* Division Selector Tabs */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-3.5">
          Select Service Division *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setValue("division", "electronics-repair");
              setValue("serviceCategory", "computer-laptop-repair");
            }}
            className={cn(
              "p-5 rounded-2xl border text-left transition-all",
              selectedDivision === "electronics-repair"
                ? "border-[#C6A76B] bg-[#000000] text-[#FFFFFF] shadow-md"
                : "border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] hover:bg-[#F4F4F4]",
            )}
          >
            <div className="flex items-center gap-2 font-extrabold text-sm tracking-wide">
              <Store
                className={cn(
                  "h-4 w-4",
                  selectedDivision === "electronics-repair"
                    ? "text-[#C6A76B]"
                    : "text-[#000000]",
                )}
              />
              Electronics Repair
            </div>
            <p
              className={cn(
                "text-xs mt-1.5 leading-relaxed font-normal",
                selectedDivision === "electronics-repair"
                  ? "text-[#CCCCCC]"
                  : "text-[#666666]",
              )}
            >
              Physical shop visit in Nagpur for computer, TV, audio & PCB
              repair.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setValue("division", "digital-solutions");
              setValue("serviceCategory", "website-development");
            }}
            className={cn(
              "p-5 rounded-2xl border text-left transition-all",
              selectedDivision === "digital-solutions"
                ? "border-[#C6A76B] bg-[#000000] text-[#FFFFFF] shadow-md"
                : "border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] hover:bg-[#F4F4F4]",
            )}
          >
            <div className="flex items-center gap-2 font-extrabold text-sm tracking-wide">
              <Code
                className={cn(
                  "h-4 w-4",
                  selectedDivision === "digital-solutions"
                    ? "text-[#C6A76B]"
                    : "text-[#000000]",
                )}
              />
              Digital Solutions
            </div>
            <p
              className={cn(
                "text-xs mt-1.5 leading-relaxed font-normal",
                selectedDivision === "digital-solutions"
                  ? "text-[#CCCCCC]"
                  : "text-[#666666]",
              )}
            >
              Next.js websites, custom software, and ERP systems.
            </p>
          </button>
        </div>
      </div>

      {/* Physical Shop Policy Notice if Electronics is chosen */}
      {selectedDivision === "electronics-repair" && (
        <div className="p-5 rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] text-xs text-[#000000] flex items-start gap-3.5">
          <AlertCircle className="h-5 w-5 text-[#C6A76B] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold text-[#000000]">
              Important Workshop Policy:
            </strong>{" "}
            We do not offer doorstep pickup or home repair services. You will
            need to bring your item directly to our workbench in Nagpur.
          </div>
        </div>
      )}

      {/* Service Subcategory Dropdown */}
      <div>
        <label
          htmlFor="serviceCategory"
          className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-2.5"
        >
          Specific Requirement *
        </label>
        <select
          id="serviceCategory"
          {...register("serviceCategory")}
          className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#000000] font-medium focus:border-[#C6A76B] focus:outline-none focus:ring-1 focus:ring-[#C6A76B]"
        >
          {selectedDivision === "electronics-repair" ? (
            <>
              <option value="computer-laptop-repair">
                Computer & Laptop Repair
              </option>
              <option value="television-repair">
                Smart TV & Display Panel Repair
              </option>
              <option value="audio-hometheatre">
                Audio, Radio & Home Theatre Repair
              </option>
              <option value="appliance-pcb">
                Electronic Appliance PCB Repair
              </option>
            </>
          ) : (
            <>
              <option value="website-development">
                Business Website Creation
              </option>
              <option value="custom-software">
                Custom Management Software / ERP
              </option>
              <option value="process-automation">
                Workflow & Billing Automation
              </option>
              <option value="custom-app">Bespoke Web Application</option>
            </>
          )}
        </select>
        {errors.serviceCategory && (
          <p className="mt-2 text-xs font-medium text-[#C6A76B]">
            {errors.serviceCategory.message}
          </p>
        )}
      </div>

      {/* Name & Contact Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-2.5"
          >
            Your Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#000000] font-medium focus:border-[#C6A76B] focus:outline-none focus:ring-1 focus:ring-[#C6A76B]"
          />
          {errors.fullName && (
            <p className="mt-2 text-xs font-medium text-[#C6A76B]">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-2.5"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#000000] font-medium focus:border-[#C6A76B] focus:outline-none focus:ring-1 focus:ring-[#C6A76B]"
          />
          {errors.phone && (
            <p className="mt-2 text-xs font-medium text-[#C6A76B]">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-2.5"
        >
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#000000] font-medium focus:border-[#C6A76B] focus:outline-none focus:ring-1 focus:ring-[#C6A76B]"
        />
        {errors.email && (
          <p className="mt-2 text-xs font-medium text-[#C6A76B]">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Description / Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-2.5"
        >
          {selectedDivision === "electronics-repair"
            ? "Describe Device Issue & Symptoms *"
            : "Describe Project Scope or Business Needs *"}
        </label>
        <textarea
          id="notes"
          rows={4}
          placeholder={
            selectedDivision === "electronics-repair"
              ? "e.g., Laptop power LED turns on but screen is completely black. Model: Lenovo Legion 5..."
              : "e.g., We need a clean editorial website for our medical clinic with appointment request form..."
          }
          {...register("notes")}
          className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#000000] font-medium focus:border-[#C6A76B] focus:outline-none focus:ring-1 focus:ring-[#C6A76B]"
        />
        {errors.notes && (
          <p className="mt-2 text-xs font-medium text-[#C6A76B]">
            {errors.notes.message}
          </p>
        )}
      </div>

      {submissionError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{submissionError}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting to Workshop Queue..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
