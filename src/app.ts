import Fastify from "fastify";
import { productsRoutes } from "./routes/products.js";

export function buildApp() {
  const fastify = Fastify({
    logger: true
  });

  fastify.register(productsRoutes, { prefix: "/api" });

  fastify.setNotFoundHandler((req, reply) => {
    reply.code(404).send({ message: `Route ${req.method} ${req.url} not found` });
  });

  fastify.setErrorHandler((error, _req, reply) => {
    fastify.log.error(error);
    reply.code(500).send({ message: "Internal server error" });
  });

  return fastify;
}