import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

  deviceId: z.string().optional()
});

export type SignupInput = z.infer<typeof signupSchema>;


export const loginSchema = z.object({

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

  deviceId: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
