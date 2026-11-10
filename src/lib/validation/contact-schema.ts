import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(80, { message: "Name cannot exceed 80 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Please provide a valid 10-digit phone number." })
    .max(15, { message: "Phone number is too long." }),
  division: z.enum(["electronics-repair", "digital-solutions"]),
  serviceCategory: z
    .string()
    .min(1, { message: "Please select a specific service." }),
  notes: z
    .string()
    .min(10, {
      message:
        "Please describe your device issue or project scope (minimum 10 characters).",
    })
    .max(1000, { message: "Description cannot exceed 1000 characters." }),
  inShopAcknowledgment: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
