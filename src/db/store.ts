import type { Product } from "../product.js";

class Store {
  private products: Map<string, Product> = new Map();

  getAll() {
    return Array.from(this.products.values());
  }

  get(id: string) {
    return this.products.get(id);
  }

  create(product: Product) {
    this.products.set(product.id, product);
    return product;
  }

  update(id: string, data: Product) {
    this.products.set(id, data);
    return data;
  }

  delete(id: string) {
    return this.products.delete(id);
  }
}

export const store = new Store();