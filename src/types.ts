import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
});

export const professionalInfoSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.enum(["0-2 years", "3-5 years", "6-10 years", "10+ years"]),
  industry: z.string().min(1, "Industry is required"),
});

export const billingInfoSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(16, "Card number must be at most 16 digits"),
  cardHolderName: z.string().min(1, "Card holder name is required"),
  expirationDate: z.string().min(4, "Expiration date is required"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;
