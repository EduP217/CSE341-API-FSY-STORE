const request = require("supertest");
const router = require("../routes");

describe("Test Handlers", () => {
  test("responds to /", async () => {
    const res = await request("https://api-fsy-store.onrender.com").get("/");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toEqual("Hello World");
  });

  test("responds to /api/v1/auth/local", async () => {
    const payload = {
        username: "Test",
        password: "test.321",
    };
    const res = await request("https://api-fsy-store.onrender.com")
      .post("/api/v1/auth/local")
      .type('form')
      .send(payload);

    expect(res.statusCode).toBe(302);
    expect(res.header["location"]).toBe("/api/v1/profile");
    expect(res.redirect).toBe(true);
  });

  test("responds to /api/v1/auth/logout", async () => {
    const res = await request("https://api-fsy-store.onrender.com").get("/api/v1/auth/logout");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toEqual("Successfull Logout");
  });
});
