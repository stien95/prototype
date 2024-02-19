import { z } from "zod";
import { errorLength } from "./errorMessageZod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userRegex = /^[a-zA-Z0-9_.-]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const password = z
  .string()
  .min(7, errorLength("Password", 7, "min"))
  .max(120, errorLength("Password", 120, "max"));

export const signInSchema = z.object({
  userOrEmail: z
    .string()
    .min(3, errorLength("Email or username", 3, "min"))
    .max(120, errorLength("Email", 120, "max"))
    .refine(
      (value) => {
        if (!(value.length > 30)) {
          return value.match(emailRegex) || value.match(userRegex);
        } else {
          return value.match(emailRegex);
        }
      },
      {
        message: "It must be a valid email or username",
      }
    ),
  password,
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, errorLength("Name", 3, "min"))
      .max(30, errorLength("Name", 30, "max"))
      .regex(
        nameRegex,
        "Name can only contain letters, numbers, underscores, hyphens, and dots"
      ),
    username: z
      .string()
      .trim()
      .min(3, errorLength("Username", 3, "min"))
      .max(30, errorLength("Username", 30, "max"))
      .regex(
        userRegex,
        "Username can only contain letters, numbers, underscores, hyphens, and dots"
      ),
    email: z.string().trim().email().max(120, errorLength("Email", 120, "max")),
    password,
    confirmPassword: z
      .string()
      .min(7, errorLength("Confirm password", 7, "min"))
      .max(120, errorLength("Confirm password", 120, "max")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
