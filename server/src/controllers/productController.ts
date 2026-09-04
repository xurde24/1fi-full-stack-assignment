import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getProducts = async (
  _req: Request,
  res: Response,
) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
        emiPlans: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response,
) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        variants: true,
        emiPlans: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};