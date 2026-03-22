import { buildApp } from "../app";

const app = buildApp();

describe("Products API", () => {
  let id: string;

  it("GET empty", async () => {
    const res = await app.inject({ method: "GET", url: "/api/products" });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual([]);
  });

  it("POST create", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: {
        name: "Test",
        description: "Desc",
        price: 10,
        category: "books",
        inStock: true
      }
    });

    const body = JSON.parse(res.body);
    id = body.id;

    expect(res.statusCode).toBe(201);
  });

  it("GET by id", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/api/products/${id}`
    });

    expect(res.statusCode).toBe(200);
  });
});