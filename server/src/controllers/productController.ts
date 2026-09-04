import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getProducts = async (_req: Request, res: Response) => {
  const startTime = Date.now();

  console.log("➡️ GET /api/products - request started");

  try {
    console.log("⏳ Querying PostgreSQL...");

    const dbStartTime = Date.now();

    const products = await prisma.product.findMany({
      include: {
        variants: true,
        emiPlans: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const dbTime = Date.now() - dbStartTime;

    console.log(`✅ PostgreSQL query completed in ${dbTime}ms`);
    console.log(`📦 Products returned: ${products.length}`);

    res.json(products);

    const totalTime = Date.now() - startTime;
    console.log(`🏁 GET /api/products completed in ${totalTime}ms`);
  } catch (error) {
    const totalTime = Date.now() - startTime;

    console.error("❌ Error fetching products:", error);
    console.error(`⏱️ Request failed after ${totalTime}ms`);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const startTime = Date.now();

  console.log(`➡️ GET /api/products/${req.params.slug} - request started`);

  try {
    const slug = req.params.slug as string;

    console.log("⏳ Querying PostgreSQL...");

    const dbStartTime = Date.now();

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        variants: true,
        emiPlans: true,
      },
    });

    const dbTime = Date.now() - dbStartTime;

    console.log(`✅ PostgreSQL query completed in ${dbTime}ms`);

    if (!product) {
      console.log("❌ Product not found");

      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

    const totalTime = Date.now() - startTime;
    console.log(
      `🏁 GET /api/products/${slug} completed in ${totalTime}ms`
    );
  } catch (error) {
    const totalTime = Date.now() - startTime;

    console.error("❌ Error fetching product:", error);
    console.error(`⏱️ Request failed after ${totalTime}ms`);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};