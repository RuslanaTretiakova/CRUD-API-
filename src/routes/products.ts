import type { FastifyInstance } from "fastify";
import * as controller from "../controllers/products.controller.js";

export async function productRoutes(app: FastifyInstance) {
  app.get("/api/products", controller.getAllProducts);
  app.get("/api/products/:id", controller.getProduct);
  app.post("/api/products", controller.createProduct);
  app.put("/api/products/:id", controller.updateProduct);
  app.delete("/api/products/:id", controller.deleteProduct);
}