import type { FastifyReply, FastifyRequest } from "fastify";
import { productService } from "../services/products.service.js";
import { productSchema, uuidSchema } from "../utils/validator.js";
export const getAllProducts = async (_: FastifyRequest, reply: FastifyReply) => {
  return reply.send(productService.getAll());
};

export const getProduct = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = req.params;

  if (!uuidSchema.safeParse(id).success)
    return reply.status(400).send({ message: "Invalid productId" });

  const product = productService.getById(id);
  if (!product) return reply.status(404).send({ message: "Product not found" });

  return reply.send(product);
};

export const createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success)
    return reply.status(400).send({ message: "Invalid body" });

  const product = productService.create(parsed.data);
  return reply.status(201).send(product);
};

export const updateProduct = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = req.params;

  if (!uuidSchema.safeParse(id).success)
    return reply.status(400).send({ message: "Invalid productId" });

  const existing = productService.getById(id);
  if (!existing) return reply.status(404).send({ message: "Product not found" });

  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success)
    return reply.status(400).send({ message: "Invalid body" });

  const updated = productService.update(id, parsed.data);
  return reply.send(updated);
};

export const deleteProduct = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = req.params;

  if (!uuidSchema.safeParse(id).success)
    return reply.status(400).send({ message: "Invalid productId" });

  const exists = productService.getById(id);
  if (!exists) return reply.status(404).send({ message: "Product not found" });

  productService.delete(id);
  return reply.status(204).send();
};