import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Register from "../pages/Register";
import TestWrapper from "./TestWrapper.test"; // Your wrapper with Redux and Router

describe("Register Form Tests", () => {
  test("renders email, password, and role fields", () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("allows typing in email and password fields and selecting role", async () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleSelect = screen.getByLabelText(/role/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "mypassword123" } });
      fireEvent.change(roleSelect, { target: { value: "admin" } });
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("mypassword123");
    expect(roleSelect.value).toBe("admin");
  });

  test("shows validation errors for empty fields", async () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/role is required/i)).toBeInTheDocument();
  });

  test("shows email format error for invalid email", async () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test("shows password length error for short password", async () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "123" } });
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("shows role selection error for invalid role", async () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    const roleSelect = screen.getByLabelText(/role/i);

    await act(async () => {
      fireEvent.change(roleSelect, { target: { value: "invalid-role" } });
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    expect(screen.getByText(/Role is required/i)).toBeInTheDocument();
  });
});
