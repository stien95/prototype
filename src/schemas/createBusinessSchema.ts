import { z } from "zod";

const categoryRegex = /^[a-zA-Z\s]+$/;

export const createBusinessSchema = z.object({
  name: z.string().trim().min(3).max(120),
  category: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(categoryRegex, "La categoría solo puede tener letras y espacios."),
  frequentLocation: z.string().trim().min(3).max(120),
});
