import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}