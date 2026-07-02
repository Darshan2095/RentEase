import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  images: z.array(z.string()).min(1),
  monthlyRent: z.number().positive(),
  securityDeposit: z.number().positive(),
  rentalTenure: z.array(z.number()).min(1),
  stock: z.number().min(0),
  brand: z.string().optional(),
  dimensions: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  isFeatured: z.boolean(),
});

export type ProductInput = z.infer<typeof productSchema>;