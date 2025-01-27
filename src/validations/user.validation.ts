import { z } from "zod";

export const registerUserValidation = z.object({
  email: z.string().email({}),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export const loginUserValidation = z.object({
  email: z.string().email({}),
  password: z.string(),
});
