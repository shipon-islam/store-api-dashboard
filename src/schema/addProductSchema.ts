import { z } from "zod";

export const addProductSchema = z.object({
  category: z.string().min(1, {
    message: "category required",
  }),
  subcategory: z.string(),
  name: z.string().min(2, {
    message: "name must be at least 4 characters.",
  }),
  price: z.string().min(1, {
    message: "price is required",
  }),
  stock: z.string().min(1, {
    message: "stock is required",
  }),
  discount: z.string().min(1, {
    message: "discount is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  cover: z.any().refine((files) => files?.length < 2, "max 1 file"),
  feature: z.any().refine((files) => files?.length <= 2, "max 2 file"),
});
