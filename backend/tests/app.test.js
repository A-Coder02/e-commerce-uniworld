// app.test.js
const request = require("supertest");
const app = require("../app");

describe("Express app routes", () => {
  test("GET /check-health should return Hello World message", async () => {
    const response = await request(app).get("/check-health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello World!" });
  });

  test("POST /echo should echo the sent data", async () => {
    const testData = { name: "ChatGPT", role: "AI" };
    const response = await request(app).post("/echo").send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ youSent: testData });
  });
});
