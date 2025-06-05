const request = require("supertest");
const express = require("express");
const authRouter = require("../../routes/auth.route");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth.controller");

jest.mock("../../controllers/auth.controller");

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

describe("Auth Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    test("should register a user successfully", async () => {
      const mockResponse = {
        data: { id: 1, username: "john_doe" },
        message: "User registered successfully.",
        error: null,
      };

      registerUser.mockImplementation((req, res) => {
        res.status(201).json(mockResponse);
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ username: "john_doe", password: "password123" });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockResponse);
      expect(registerUser).toHaveBeenCalledTimes(1);
    });

    test("should return 400 if username or password is missing", async () => {
      const mockResponse = {
        data: null,
        message: null,
        error: "Username and password are required.",
      };

      registerUser.mockImplementation((req, res) => {
        res.status(400).json(mockResponse);
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ username: "", password: "" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual(mockResponse);
      expect(registerUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/auth/login", () => {
    test("should login successfully with valid credentials", async () => {
      const mockResponse = {
        data: { token: "jwt_token" },
        message: "Login successful.",
        error: null,
      };

      loginUser.mockImplementation((req, res) => {
        res.status(200).json(mockResponse);
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "john_doe", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResponse);
      expect(loginUser).toHaveBeenCalledTimes(1);
    });

    test("should return 401 if credentials are invalid", async () => {
      const mockResponse = {
        data: null,
        message: null,
        error: "Invalid username or password.",
      };

      loginUser.mockImplementation((req, res) => {
        res.status(401).json(mockResponse);
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "john_doe", password: "wrong_password" });

      expect(res.status).toBe(401);
      expect(res.body).toEqual(mockResponse);
      expect(loginUser).toHaveBeenCalledTimes(1);
    });
  });
});
