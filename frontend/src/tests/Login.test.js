import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../pages/Login";
import TestWrapper from "./TestWrapper.test";

const mockStore = configureStore([]);
const store = mockStore({});

describe("Login Form Tests", () => {
  test("renders email and password fields", () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows typing in email and password fields", async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "mypassword123" } });
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("mypassword123");
  });

  test("shows validation errors for empty fields", async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test("shows email format error for invalid email", async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test("shows password length error for short password", async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "123" } });
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });
});
