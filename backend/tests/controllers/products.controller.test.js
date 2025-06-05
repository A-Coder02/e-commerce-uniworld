// tests/product.test.js
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products.controller");
const supabase = require("../../supabase");

jest.mock("../../supabase");

describe("Product Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // Create Product Tests
  describe("createProduct", () => {
    test("should return 400 if name or price is missing", async () => {
      req.body = { name: "", price: 0 };
      await createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        data: null,
        error: "Name and price are required.",
      });
    });

    test("should create a product successfully", async () => {
      req.body = {
        name: "Sample Product",
        img_url: "https://example.com/image.png",
        description: "A test product",
        price: 100,
        user_id: "123",
      };
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: req.body, error: null }),
      });

      await createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: req.body,
        message: "Product created successfully.",
        error: null,
      });
    });
  });

  // Get Products Tests
  describe("getProducts", () => {
    test("should return a list of products with pagination", async () => {
      req.query = { page: 1, limit: 2 };
      const products = [{ id: 1 }, { id: 2 }];
      const count = products.length;

      // Mock Supabase method chaining
      supabase.from.mockReturnValue({
        select: jest.fn(() => ({
          range: jest.fn(() =>
            Promise.resolve({
              data: products,
              error: null,
              count: 2,
            })
          ),
        })),
      });

      await getProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Products retrieved successfully.",
          data: products,
          pagination: expect.objectContaining({
            page: 1,
            limit: 2,
            totalItems: count,
            totalPages: 1,
          }),
          error: null,
        })
      );
    });
  });

  // Get Product by ID Tests
  describe("getProductById", () => {
    test("should return 404 if product not found", async () => {
      req.params = { id: "1" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest
          .fn()
          .mockResolvedValue({ data: null, error: { message: "Not found" } }),
      });

      await getProductById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        data: null,
        error: "Not found",
      });
    });

    test("should return a product by ID", async () => {
      req.params = { id: "1" };
      const product = { id: "1", name: "Sample Product" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: product, error: null }),
      });

      await getProductById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: product,
        message: "Product retrieved successfully.",
        error: null,
      });
    });
  });

  // Update Product Tests
  describe("updateProduct", () => {
    test("should update a product successfully", async () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Product", price: 150 };
      const updatedProduct = { id: "1", ...req.body };
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest
          .fn()
          .mockResolvedValue({ data: updatedProduct, error: null }),
      });

      await updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: updatedProduct,
        message: "Product updated successfully.",
        error: null,
      });
    });
  });

  // Delete Product Tests
  describe("deleteProduct", () => {
    test("should delete a product successfully", async () => {
      req.params = { id: "1" };
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: "1" }, error: null }),
      });

      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: { message: "Product deleted successfully." },
        error: null,
      });
    });
  });
});
