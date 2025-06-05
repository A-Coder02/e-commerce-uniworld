const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
require("dotenv").config({ path: envFile });
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const helloRouter = require("./routes/hello");
const productRouter = require("./routes/products.route");
const authRouter = require("./routes/auth.route");
const authMiddleware = require("./middlewares/auth.middleware");
const swaggerFile = require("./swagger-output.json");

const app = express();

// middlwares
app.use(express.json());
app.use(cors({ origin: "*" }));
// Swagger UI route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// routes
app.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/echo", (req, res) => {
  res.status(200).json({ youSent: req.body });
});
app.use("/auth", authRouter);

app.use("/products", authMiddleware, productRouter);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`app is running on PORT:${PORT}`);
  });
}

module.exports = app;
