import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Email is invalid."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(1, "Message is required."),
});

export type ContactSchema = z.infer<typeof contactSchema>;
