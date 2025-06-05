const jwt = require("jsonwebtoken");
const supabase = require("../../supabase");
const authMiddleware = require("../../middlewares/auth.middleware");

jest.mock("jsonwebtoken");
jest.mock("../../supabase");

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 401 if no Authorization header", async () => {
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authorization token missing",
    });
  });

  test("should return 401 if Authorization header does not start with 'Bearer '", async () => {
    req.headers.authorization = "Token abc123";
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authorization token missing",
    });
  });

  test("should return 401 if token is invalid", async () => {
    req.headers.authorization = "Bearer invalidToken";
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  test("should return 500 if database error occurs", async () => {
    req.headers.authorization = "Bearer validToken";
    jwt.verify.mockReturnValue({ id: 1 });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest
        .fn()
        .mockResolvedValue({ data: null, error: "Database error" }),
    });

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });

  test("should return 401 if user not found", async () => {
    req.headers.authorization = "Bearer validToken";
    jwt.verify.mockReturnValue({ id: 1 });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  test("should call next() if token is valid and user is found", async () => {
    req.headers.authorization = "Bearer validToken";
    jwt.verify.mockReturnValue({ id: 1 });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest
        .fn()
        .mockResolvedValue({ data: { id: 1, name: "John Doe" }, error: null }),
    });

    await authMiddleware(req, res, next);
    expect(req.user).toEqual({ id: 1, name: "John Doe" });
    expect(next).toHaveBeenCalled();
  });
});
