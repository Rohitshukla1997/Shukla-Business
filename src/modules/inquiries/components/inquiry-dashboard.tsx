"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Clock3,
  XCircle,
  Send,
  Eye,
  History,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";
import {
  InquiryRecord,
  InquiryStatus,
  InquiryPriority,
  InquiryActivity,
} from "@/modules/inquiries/types/inquiry.types";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<InquiryStatus, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-purple-50 text-purple-700 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const PRIORITY_COLORS: Record<InquiryPriority, string> = {
  Low: "text-neutral-500",
  Medium: "text-blue-600",
  High: "text-amber-600",
  Urgent: "text-red-600 font-bold",
};

export function InquiryDashboard() {
  const [pin, setPin] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Selected Detail View & Activity Log
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [activities, setActivities] = useState<InquiryActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);

  // Status edit modal / state
  const [editStatus, setEditStatus] = useState<InquiryStatus>("New");
  const [editRemarks, setEditRemarks] = useState<string>("");
  const [isUpdating, startUpdateTransition] = useTransition();
  const [retryMessage, setRetryMessage] = useState<string | null>(null);

  const fetchInquiries = async (accessPin: string) => {
    setLoading(true);
    setError(null);
    setAuthError(null);

    try {
      const res = await fetch(`/api/v1/inquiries?pin=${encodeURIComponent(accessPin)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setAuthError("Invalid Security PIN. Access denied.");
          setIsAuthenticated(false);
          sessionStorage.removeItem("dashboard_pin");
        } else {
          setError(data.error || "Failed to load inquiries from Google Sheets");
        }
        setLoading(false);
        return;
      }

      setInquiries(data.inquiries || []);
      setIsAuthenticated(true);
      sessionStorage.setItem("dashboard_pin", accessPin);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Check saved PIN in sessionStorage
  useEffect(() => {
    const savedPin = typeof window !== "undefined" ? sessionStorage.getItem("dashboard_pin") : null;
    if (savedPin) {
      setPin(savedPin);
      fetchInquiries(savedPin);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    fetchInquiries(pin);
  };

  const fetchActivities = async (inquiryId: string) => {
    setLoadingActivities(true);
    try {
      const res = await fetch(
        `/api/v1/inquiries?pin=${encodeURIComponent(pin)}&action=activities&inquiryId=${encodeURIComponent(inquiryId)}`
      );
      const data = await res.json();
      if (data.success) {
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleSelectInquiry = (item: InquiryRecord) => {
    setSelectedInquiry(item);
    setEditStatus(item.status);
    setEditRemarks(item.internalRemarks || "");
    fetchActivities(item.inquiryId);
  };

  const handleSaveStatus = async () => {
    if (!selectedInquiry) return;

    startUpdateTransition(async () => {
      try {
        const res = await fetch("/api/v1/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pin,
            action: "update",
            inquiryId: selectedInquiry.inquiryId,
            status: editStatus,
            internalRemarks: editRemarks,
            updatedBy: "Owner Dashboard",
          }),
        });

        const data = await res.json();
        if (data.success) {
          // Update local state
          const updatedList = inquiries.map((item) =>
            item.inquiryId === selectedInquiry.inquiryId
              ? { ...item, status: editStatus, internalRemarks: editRemarks }
              : item
          );
          setInquiries(updatedList);
          setSelectedInquiry({
            ...selectedInquiry,
            status: editStatus,
            internalRemarks: editRemarks,
          });
          fetchActivities(selectedInquiry.inquiryId);
        } else {
          alert("Error updating record: " + (data.error || "Failed"));
        }
      } catch (err: unknown) {
        alert("Failed to update status in Google Sheets: " + err);
      }
    });
  };

  const handleRetryGmail = async () => {
    setRetryMessage("Retrying failed Gmail notifications...");
    try {
      const res = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin,
          action: "retry_gmail",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRetryMessage(`Success: ${data.retriedCount ?? 0} notifications resent.`);
        fetchInquiries(pin);
      } else {
        setRetryMessage("Retry failed: " + (data.error || "Unknown"));
      }
    } catch (err: unknown) {
      setRetryMessage("Network error during email retry.");
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      (item.customerName && item.customerName.toLowerCase().includes(q)) ||
      (item.phoneNumber && item.phoneNumber.includes(q)) ||
      (item.emailAddress && item.emailAddress.toLowerCase().includes(q)) ||
      (item.inquiryId && item.inquiryId.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    const matchesCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(inquiries.map((i) => i.category).filter(Boolean)));

  // If not authenticated, show PIN prompt
  if (!isAuthenticated) {
    return (
      <section className="py-16 bg-[#FFFFFF] border-b border-[#E5E5E5] min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E5E5] shadow-xl text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#000000] text-[#C6A76B]">
            <Lock className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold font-heading text-[#000000]">
              Inquiry Management Portal
            </h2>
            <p className="text-xs text-[#666666]">
              Synchronized directly with Shukla Business Google Sheets & Gmail API.
              Enter your authorized Security PIN to access.
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#000000] block mb-1">
                Dashboard Security PIN
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (Default: 2026)"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] text-center tracking-widest text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 text-center font-medium">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-3 text-sm font-bold"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-[#FFFFFF] border-b border-[#E5E5E5] min-h-screen">
      <Container size="wide">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C6A76B]">
                Connected: Google Sheets & Gmail
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#000000]">
              Customer Inquiries Dashboard
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Live two-way synchronization with Shukla Business Inquiries spreadsheet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchInquiries(pin)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F4F4F4] text-[#000000] border border-[#E5E5E5] hover:border-[#C6A76B] transition-all"
            >
              <RefreshCw className={cn("h-3.5 w-3.5 text-[#C6A76B]", loading && "animate-spin")} />
              <span>Refresh Sheets</span>
            </button>

            <button
              onClick={handleRetryGmail}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#000000] text-[#C6A76B] hover:bg-[#171717] transition-all"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Retry Failed Emails</span>
            </button>
          </div>
        </div>

        {retryMessage && (
          <div className="my-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center justify-between">
            <span>{retryMessage}</span>
            <button onClick={() => setRetryMessage(null)} className="font-bold ml-2">×</button>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-6">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search by customer name, phone, email, or inquiry ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] font-medium focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inquiries Table / List (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E5E5E5] bg-[#F4F4F4] flex items-center justify-between">
              <span className="text-xs font-bold text-[#000000] uppercase tracking-wider">
                Total Inquiries: {filteredInquiries.length}
              </span>
              <span className="text-[11px] text-[#666666]">
                Click an entry to view full details & update status
              </span>
            </div>

            <div className="divide-y divide-[#E5E5E5] max-h-[640px] overflow-y-auto">
              {filteredInquiries.length === 0 ? (
                <div className="p-10 text-center text-xs text-[#666666]">
                  {loading ? "Loading inquiries from Google Sheets..." : "No matching inquiries found."}
                </div>
              ) : (
                filteredInquiries.map((item) => {
                  const isSelected = selectedInquiry?.inquiryId === item.inquiryId;
                  return (
                    <div
                      key={item.inquiryId}
                      onClick={() => handleSelectInquiry(item)}
                      className={cn(
                        "p-4 hover:bg-[#F9F9F9] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        isSelected && "bg-[#F4F4F4] border-l-4 border-l-[#C6A76B]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#000000]">
                            {item.inquiryId}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                              STATUS_COLORS[item.status] || "bg-neutral-100 text-neutral-700"
                            )}
                          >
                            {item.status}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F4F4F4] text-[#666666]">
                            {item.source}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-[#000000]">
                          {item.customerName}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#666666]">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-[#C6A76B]" />
                            {item.phoneNumber}
                          </span>
                          {item.emailAddress && (
                            <span className="flex items-center gap-1 truncate max-w-[160px]">
                              <Mail className="h-3 w-3 text-[#C6A76B]" />
                              {item.emailAddress}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:text-right space-y-1 shrink-0">
                        <span className="text-[11px] font-medium text-[#000000] block">
                          {item.service}
                        </span>
                        <span className="text-[10px] text-[#888888] font-mono block">
                          {item.createdAt}
                        </span>
                        <div className="text-[10px] font-mono">
                          Gmail:{" "}
                          <span
                            className={cn(
                              "font-bold",
                              item.gmailStatus === "SENT"
                                ? "text-emerald-600"
                                : item.gmailStatus === "FAILED"
                                ? "text-red-600"
                                : "text-amber-600"
                            )}
                          >
                            {item.gmailStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Details & Action Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-5 shadow-xs sticky top-24">
            {selectedInquiry ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between pb-3 border-b border-[#E5E5E5]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C6A76B] block">
                      Inquiry Record
                    </span>
                    <h3 className="text-lg font-extrabold font-heading text-[#000000]">
                      {selectedInquiry.inquiryId}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full border",
                      STATUS_COLORS[selectedInquiry.status]
                    )}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>

                {/* Customer Information Card */}
                <div className="p-3.5 rounded-xl bg-[#F4F4F4] border border-[#E5E5E5] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Customer:</span>
                    <strong className="text-[#000000]">{selectedInquiry.customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Phone:</span>
                    <a href={`tel:${selectedInquiry.phoneNumber}`} className="font-bold text-[#000000] hover:text-[#C6A76B]">
                      {selectedInquiry.phoneNumber}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Email:</span>
                    <span className="text-[#000000]">{selectedInquiry.emailAddress || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Category:</span>
                    <span className="text-[#000000]">{selectedInquiry.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Service / Device:</span>
                    <span className="text-[#000000]">{selectedInquiry.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Created:</span>
                    <span className="text-[#000000] font-mono">{selectedInquiry.createdAt}</span>
                  </div>
                </div>

                {/* Customer Message */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#000000] block mb-1.5">
                    Customer Message / Symptoms:
                  </label>
                  <div className="p-3 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-xs text-[#333333] leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {selectedInquiry.message || "No notes provided."}
                  </div>
                </div>

                {/* Status & Remarks Update Form */}
                <div className="pt-3 border-t border-[#E5E5E5] space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#000000] block mb-1">
                      Update Status (Syncs to Google Sheets):
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as InquiryStatus)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#000000] block mb-1">
                      Internal Remarks / Follow-up Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                      placeholder="e.g. Called customer at 3 PM, customer bringing LED TV to workshop tomorrow..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#C6A76B]"
                    />
                  </div>

                  <Button
                    onClick={handleSaveStatus}
                    disabled={isUpdating}
                    variant="primary"
                    className="w-full py-2.5 text-xs font-bold"
                  >
                    {isUpdating ? "Syncing with Google Sheets..." : "Save & Synchronize"}
                  </Button>
                </div>

                {/* Activity History Log */}
                <div className="pt-3 border-t border-[#E5E5E5]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <History className="h-3.5 w-3.5 text-[#C6A76B]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#000000]">
                      Activity History (Audit Trail)
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {loadingActivities ? (
                      <p className="text-[11px] text-[#666666]">Loading history...</p>
                    ) : activities.length === 0 ? (
                      <p className="text-[11px] text-[#888888]">No activity records logged yet.</p>
                    ) : (
                      activities.map((act) => (
                        <div
                          key={act.activityId}
                          className="p-2 rounded-lg bg-[#F9F9F9] border border-[#E5E5E5] text-[10px] space-y-0.5"
                        >
                          <div className="flex justify-between font-bold text-[#000000]">
                            <span>{act.action}</span>
                            <span className="text-[#888888] font-mono">{act.createdAt}</span>
                          </div>
                          <div className="text-[#666666]">
                            {act.previousValue} → <strong>{act.newValue}</strong> ({act.updatedBy})
                          </div>
                          {act.remarks && (
                            <div className="text-[#888888] italic">{act.remarks}</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <FileSpreadsheet className="h-10 w-10 text-[#C6A76B] mx-auto opacity-70" />
                <h4 className="text-sm font-bold text-[#000000]">
                  No Inquiry Selected
                </h4>
                <p className="text-xs text-[#666666] max-w-xs mx-auto">
                  Select an inquiry from the list on the left to inspect customer
                  details, change workflow status, or view audit logs.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

