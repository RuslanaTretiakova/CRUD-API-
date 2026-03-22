import Fastify from "fastify";
import { productRoutes } from "./routes/products.js";

export const buildApp = () => {
  const app = Fastify();

  app.register(productRoutes);

  app.setNotFoundHandler((_, reply) => {
    reply.status(404).send({ message: "Route not found" });
  });

  app.setErrorHandler((error, _, reply) => {
    console.error(error);
    reply.status(500).send({ message: "Internal Server Error" });
  });

  return app;
};