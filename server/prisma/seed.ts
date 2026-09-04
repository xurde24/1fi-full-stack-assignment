import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaNeon({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // --------------------------------------------------
  // iPhone 17 Pro
  // --------------------------------------------------

  await prisma.product.create({
    data: {
      name: "iPhone 17 Pro",
      slug: "iphone-17-pro",
      description:
        "Apple flagship smartphone with a premium design, powerful performance and an advanced camera system.",

      variants: {
        create: [
          {
            color: "Space Black",
            storage: "256GB",
            price: 129900,
            mrp: 134900,
            imageUrl: "/images/iphone-17-pro-space-black.jpg",
          },
          {
            color: "Silver",
            storage: "256GB",
            price: 129900,
            mrp: 134900,
            imageUrl: "/images/iphone-17-pro-silver.jpg",
          },
          {
            color: "Deep Blue",
            storage: "512GB",
            price: 149900,
            mrp: 154900,
            imageUrl: "/images/iphone-17-pro-deep-blue.jpg",
          },
        ],
      },

      emiPlans: {
        create: [
          {
            monthlyPayment: 4999,
            tenureMonths: 24,
            interestRate: 0,
            cashback: 5000,
          },
          {
            monthlyPayment: 7499,
            tenureMonths: 18,
            interestRate: 5.99,
            cashback: 4000,
          },
          {
            monthlyPayment: 10999,
            tenureMonths: 12,
            interestRate: 7.99,
            cashback: 3000,
          },
        ],
      },
    },
  });

  // --------------------------------------------------
  // Samsung Galaxy S24 Ultra
  // --------------------------------------------------

  await prisma.product.create({
    data: {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      description:
        "Samsung flagship smartphone with a stunning display, powerful processor and versatile camera system.",

      variants: {
        create: [
          {
            color: "Titanium Black",
            storage: "256GB",
            price: 119999,
            mrp: 129999,
            imageUrl: "/images/samsung-s24-ultra-titanium-black.jpg",
          },
          {
            color: "Titanium Gray",
            storage: "512GB",
            price: 129999,
            mrp: 139999,
            imageUrl: "/images/samsung-s24-ultra-titanium-gray.jpg",
          },
          {
            color: "Titanium Blue",
            storage: "1TB",
            price: 149999,
            mrp: 159999,
            imageUrl: "/images/samsung-s24-ultra-titanium-blue.jpg",
          },
        ],
      },

      emiPlans: {
        create: [
          {
            monthlyPayment: 4499,
            tenureMonths: 24,
            interestRate: 0,
            cashback: 4500,
          },
          {
            monthlyPayment: 6799,
            tenureMonths: 18,
            interestRate: 5.99,
            cashback: 3500,
          },
          {
            monthlyPayment: 9999,
            tenureMonths: 12,
            interestRate: 7.99,
            cashback: 2500,
          },
        ],
      },
    },
  });

  // --------------------------------------------------
  // OnePlus 13
  // --------------------------------------------------

  await prisma.product.create({
    data: {
      name: "OnePlus 13",
      slug: "oneplus-13",
      description:
        "OnePlus flagship smartphone with high-end performance and a smooth display.",

      variants: {
        create: [
          {
            color: "Midnight Black",
            storage: "256GB",
            price: 69999,
            mrp: 74999,
            imageUrl: "/images/oneplus-13-midnight-black.jpg",
          },
          {
            color: "Arctic Dawn",
            storage: "256GB",
            price: 69999,
            mrp: 74999,
            imageUrl: "/images/oneplus-13-arctic-dawn.jpg",
          },
          {
            color: "Blue",
            storage: "512GB",
            price: 79999,
            mrp: 84999,
            imageUrl: "/images/oneplus-13-blue.jpg",
          },
        ],
      },

      emiPlans: {
        create: [
          {
            monthlyPayment: 2699,
            tenureMonths: 24,
            interestRate: 0,
            cashback: 3000,
          },
          {
            monthlyPayment: 3999,
            tenureMonths: 18,
            interestRate: 5.99,
            cashback: 2500,
          },
          {
            monthlyPayment: 5999,
            tenureMonths: 12,
            interestRate: 7.99,
            cashback: 1500,
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("📱 Added 3 products");
  console.log("🎨 Added 9 variants");
  console.log("💳 Added 9 EMI plans");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
