import { z } from "zod";

// Reusable password schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[0-9]/, "Must include a number")
  .regex(/[!@#$%^&*]/, "Must include a special character");

// Flag must be in format MMMh4CK{something}
export const flagSchema = z
  .string()
  .regex(/^MMMh4CK\{.*\}$/, "Flag format must be MMMh4CK{...}");

// Register Schema
export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: passwordSchema,
});

// Login Schema
export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Profile Update Schema
export const profileUpdateSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: passwordSchema.optional()
});

// Flag Submission Schema
export const flagSubmitSchema = z.object({
  challengeId: z.string().length(24, "Invalid challenge ID"), // assuming MongoDB ObjectId
  flag: flagSchema
});
