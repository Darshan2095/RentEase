import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;