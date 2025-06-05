const helloRouter = require("express").Router();
// routes/hello.js
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
helloRouter.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

module.exports = helloRouter;
