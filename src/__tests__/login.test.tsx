import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { z } from "zod";

// Test the Zod schema directly (unit test for validation logic)
const loginFormSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Please enter password"),
});

describe("Login form schema validation", () => {
  // Positive scenarios
  it("passes with valid email and password", () => {
    const result = loginFormSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("passes with any non-empty password", () => {
    const result = loginFormSchema.safeParse({
      email: "admin@lendsqr.com",
      password: "a",
    });
    expect(result.success).toBe(true);
  });

  // Negative scenarios
  it("fails with empty email", () => {
    const result = loginFormSchema.safeParse({ email: "", password: "pass" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path[0] === "email");
      expect(emailError).toBeDefined();
    }
  });

  it("fails with invalid email format", () => {
    const result = loginFormSchema.safeParse({
      email: "not-an-email",
      password: "pass",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path[0] === "email");
      expect(emailError?.message).toBe("Invalid email");
    }
  });

  it("fails with empty password", () => {
    const result = loginFormSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find(
        (i) => i.path[0] === "password"
      );
      expect(passwordError?.message).toBe("Please enter password");
    }
  });

  it("fails when both fields are empty", () => {
    const result = loginFormSchema.safeParse({ email: "", password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });
});
