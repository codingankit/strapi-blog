import { z } from "zod";

export const contactSalesSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z.string().email("Please enter a valid email"),
  message: z
    .string()
    .min(25, "Message must be at least 25 characters long")
    .max(1000, "Message must be at most 1000 characters long"),
});

export type ContactSalesSchema = z.infer<typeof contactSalesSchema>;
