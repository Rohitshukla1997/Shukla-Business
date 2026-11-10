import { z } from "zod";

export const inquiryStatusEnum = z.enum([
  "New",
  "Contacted",
  "In Progress",
  "Completed",
  "Rejected",
]);

export type InquiryStatus = z.infer<typeof inquiryStatusEnum>;

export const inquiryPriorityEnum = z.enum(["Low", "Medium", "High", "Urgent"]);
export type InquiryPriority = z.infer<typeof inquiryPriorityEnum>;

export const createInquirySchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters."),
  phoneNumber: z
    .string()
    .min(10, "Please provide a valid 10-digit phone number.")
    .max(15, "Phone number is too long."),
  emailAddress: z
    .string()
    .email("Please provide a valid email address.")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select an inquiry category."),
  service: z.string().min(1, "Please specify a service or device."),
  subject: z.string().optional().default("Website Inquiry"),
  message: z
    .string()
    .min(5, "Please provide at least 5 characters describing your inquiry.")
    .max(2000, "Message cannot exceed 2000 characters."),
  source: z.string().optional().default("Website"),
  priority: inquiryPriorityEnum.optional().default("Medium"),
  internalRemarks: z.string().optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;

export const updateInquirySchema = z.object({
  inquiryId: z.string().min(1, "Inquiry ID is required"),
  status: inquiryStatusEnum.optional(),
  priority: inquiryPriorityEnum.optional(),
  assignedTo: z.string().optional(),
  followUpDate: z.string().optional(),
  internalRemarks: z.string().optional(),
  remarks: z.string().optional(),
  updatedBy: z.string().optional(),
});

export type UpdateInquiryInput = z.infer<typeof updateInquirySchema>;

export interface InquiryRecord {
  inquiryId: string;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  phoneNumber: string;
  emailAddress: string;
  category: string;
  service: string;
  subject: string;
  message: string;
  source: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo: string;
  followUpDate: string;
  internalRemarks: string;
  gmailStatus: "SENT" | "PENDING" | "FAILED" | "SKIPPED";
  gmailMessageId?: string;
}

export interface InquiryActivity {
  activityId: string;
  inquiryId: string;
  action: string;
  previousValue: string;
  newValue: string;
  remarks: string;
  createdAt: string;
  updatedBy: string;
}
