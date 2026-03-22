import { randomUUID } from "node:crypto";
import type { Product } from "../product.js";
import type { ProductCreateInput, ProductUpdateInput } from "../schemas/productSchema.js";

const products = new Map<string, Product>();

export const memoryDb = {
  async getAll(): Promise<Product[]> {
    return Array.from(products.values());
  },

  async getById(id: string): Promise<Product | null> {
    return products.get(id) ?? null;
  },

  async create(data: ProductCreateInput): Promise<Product> {
    const product: Product = { id: randomUUID(), ...data };
    products.set(product.id, product);
    return product;
  },

  async update(id: string, data: ProductUpdateInput): Promise<Product | null> {
    if (!products.has(id)) return null;
    const updated: Product = { id, ...data };
    products.set(id, updated);
    return updated;
  },

  async remove(id: string): Promise<boolean> {
    return products.delete(id);
  }
};