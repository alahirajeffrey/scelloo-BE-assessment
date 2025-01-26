import { z } from "zod";

export const createProductValidation = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  stock_quantity: z
    .number()
    .int()
    .nonnegative("Stock quantity must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
});

export const deleteProductValidation = z.object({
  id: z.string().uuid("Invalid product ID format"),
});

export const getProductValidation = z.object({
  id: z.string().uuid("Invalid product ID format"),
});

export const uppdateProductValidation = createProductValidation.partial();
