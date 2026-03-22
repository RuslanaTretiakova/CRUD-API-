import { store } from "../db/store.js";
import type { Product } from "../product.js";
import { randomUUID } from "crypto";

export const productService = {
  getAll: () => store.getAll(),

  getById: (id: string) => store.get(id),

  create: (data: Omit<Product, "id">) => {
    const product: Product = { id: randomUUID(), ...data };
    return store.create(product);
  },

  update: (id: string, data: Omit<Product, "id">) => {
    const updated: Product = { id, ...data };
    return store.update(id, updated);
  },

  delete: (id: string) => store.delete(id),
};