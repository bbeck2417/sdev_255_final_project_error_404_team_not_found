// src/lib/definitions.ts
import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  // Replaced email with username
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long." })
    .trim(),
  // Updated to match the Prisma UserRole enum exactly
  role: z.enum(["STUDENT", "TEACHER"], {
    message: "Please select a valid role.",
  }),
});

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username field must not be empty." }), // Replaced email
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        username?: string[]; // Replaced email
        password?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;
