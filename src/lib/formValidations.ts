import { z } from "zod";

export const loginAndSignUpFormValidationSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const forgotPasswordFormValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address" }),
});

export const resetPasswordFormValidationSchema = z.object({
  newPassword: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmNewPassword: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const changePasswordFormValidationSchema = z.object({
  oldPassword: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmNewPassword: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const changeFontThemeFormValidationSchema = z.object({
  font: z.enum(["sans-serif", "serif", "monospace"], {
    required_error: "You need to select a notification type.",
  }),
});

export const changeColorThemeFormValidationSchema = z.object({
  theme: z.enum(["dark", "light", "system"], {
    required_error: "You need to select a theme.",
  }),
});