// tests/auth.test.js
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth.controller.js");
const bcrypt = require("bcryptjs");
const supabase = require("../../supabase/index.js");
const { generateTokens } = require("../../utils/auth.js");

jest.mock("bcryptjs");
jest.mock("../../supabase/index.js");
jest.mock("../../utils/auth");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("registerUser", () => {
    test("should return 400 if role is invalid", async () => {
      req.body = { email: "test@test.com", password: "pass", role: "invalid" };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid role. Allowed roles: admin, user.",
        status: false,
      });
    });

    test("should return 400 if email or password is missing", async () => {
      req.body = { email: "", password: "pass", role: "user" };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email and password are required",
        status: false,
      });
    });

    test("should register user and return tokens", async () => {
      req.body = { email: "test@test.com", password: "pass", role: "user" };
      bcrypt.hash.mockResolvedValue("hashedPassword");
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: "123", email: "test@test.com", role: "user" },
          error: null,
        }),
      });
      generateTokens.mockReturnValue({ accessToken: "token" });

      await registerUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("pass", 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User registered successfully",
          data: expect.objectContaining({ id: "123" }),
          tokens: { accessToken: "token" },
          status: true,
        })
      );
    });

    test("should handle supabase error", async () => {
      req.body = { email: "test@test.com", password: "pass", role: "user" };
      bcrypt.hash.mockResolvedValue("hashedPassword");
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "DB error" },
        }),
      });

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "DB error",
        status: false,
      });
    });
  });

  describe("loginUser", () => {
    test("should return 400 if user not found", async () => {
      req.body = { email: "test@test.com", password: "pass" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid credentials",
        status: false,
      });
    });

    test("should return 401 if password mismatch", async () => {
      req.body = { email: "test@test.com", password: "wrongpass" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: "123",
            email: "test@test.com",
            password: "hashed",
            role: "user",
          },
          error: null,
        }),
      });
      bcrypt.compare.mockResolvedValue(false);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid credentials",
        status: false,
      });
    });

    test("should login user and return tokens", async () => {
      req.body = { email: "test@test.com", password: "pass" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: {
            id: "123",
            email: "test@test.com",
            password: "hashed",
            role: "user",
          },
          error: null,
        }),
      });
      bcrypt.compare.mockResolvedValue(true);
      generateTokens.mockReturnValue({ accessToken: "token" });

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { id: "123", email: "test@test.com", role: "user" },
          tokens: { accessToken: "token" },
          status: true,
        })
      );
    });
  });
});
