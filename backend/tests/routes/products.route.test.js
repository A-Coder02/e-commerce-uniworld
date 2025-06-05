const request = require("supertest");
const express = require("express");
const productRouter = require("../../routes/products.route");

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products.controller");

jest.mock("../../controllers/products.controller");

const app = express();
app.use(express.json());
app.use("/api/products", productRouter);

describe("Product Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/products", () => {
    test("should get all products", async () => {
      const mockProducts = [{ id: 1, name: "Product 1" }];
      getProducts.mockImplementation((req, res) => {
        res.status(200).json(mockProducts);
      });

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockProducts);
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/products", () => {
    test("should create a product", async () => {
      const newProduct = { name: "New Product" };
      createProduct.mockImplementation((req, res) => {
        res.status(201).json({ id: 2, ...newProduct });
      });

      const res = await request(app).post("/api/products").send(newProduct);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 2, ...newProduct });
      expect(createProduct).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /api/products/:id", () => {
    test("should get product by id", async () => {
      const product = { id: 1, name: "Product 1" };
      getProductById.mockImplementation((req, res) => {
        res.status(200).json(product);
      });

      const res = await request(app).get("/api/products/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(product);
      expect(getProductById).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /api/products/:id", () => {
    test("should update product by id", async () => {
      const updatedProduct = { id: 1, name: "Updated Product" };
      updateProduct.mockImplementation((req, res) => {
        res.status(200).json(updatedProduct);
      });

      const res = await request(app)
        .put("/api/products/1")
        .send({ name: "Updated Product" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedProduct);
      expect(updateProduct).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /api/products/:id", () => {
    test("should delete product by id", async () => {
      deleteProduct.mockImplementation((req, res) => {
        res.status(204).send();
      });

      const res = await request(app).delete("/api/products/1");

      expect(res.status).toBe(204);
      expect(deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
});
