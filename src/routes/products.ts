import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { productCreateSchema, productUpdateSchema } from "../schemas/productSchema.js";

const uuidSchema = z.string().uuid();

export const productsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/products", async (_req, reply) => {
    const products = await db.getAll();
    return reply.code(200).send(products);
  });

  fastify.get("/products/:id", async (req, reply) => {
    const params = req.params as { id: string };

    const parsed = uuidSchema.safeParse(params.id);
    if (!parsed.success) {
      return reply.code(400).send({ message: "Invalid productId (must be UUID)" });
    }

    const product = await db.getById(parsed.data);
    if (!product) {
      return reply.code(404).send({ message: "Product not found" });
    }

    return reply.code(200).send(product);
  });

  fastify.post("/products", async (req, reply) => {
    const body = req.body;

    const parsed = productCreateSchema.safeParse(body);
    if (!parsed.success) {
      return reply.code(400).send({ message: "Invalid request body", issues: parsed.error.issues });
    }

    const created = await db.create(parsed.data);
    return reply.code(201).send(created);
  });

  fastify.put("/products/:id", async (req, reply) => {
    const params = req.params as { id: string };
    const body = req.body;

    const idParsed = uuidSchema.safeParse(params.id);
    if (!idParsed.success) {
      return reply.code(400).send({ message: "Invalid productId (must be UUID)" });
    }

    const bodyParsed = productUpdateSchema.safeParse(body);
    if (!bodyParsed.success) {
      return reply.code(400).send({ message: "Invalid request body", issues: bodyParsed.error.issues });
    }

    const updated = await db.update(idParsed.data, bodyParsed.data);
    if (!updated) {
      return reply.code(404).send({ message: "Product not found" });
    }

    return reply.code(200).send(updated);
  });

  fastify.delete("/products/:id", async (req, reply) => {
    const params = req.params as { id: string };

    const parsed = uuidSchema.safeParse(params.id);
    if (!parsed.success) {
      return reply.code(400).send({ message: "Invalid productId (must be UUID)" });
    }

    const deleted = await db.remove(parsed.data);
    if (!deleted) {
      return reply.code(404).send({ message: "Product not found" });
    }

    return reply.code(204).send();
  });
};