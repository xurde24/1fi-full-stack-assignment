import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import type { Product } from "../types/product";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            1Fi
          </Link>

          <a
            href="#products"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Shop Smartphones
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Smart shopping. Easy EMI.
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Get your favourite smartphone on{" "}
              <span className="text-blue-600">easy EMI.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Choose from popular smartphones, pick your preferred variant,
              and select an EMI plan that works for your budget.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Explore smartphones
              </a>

              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                Flexible EMI plans
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="text-2xl">💳</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Flexible EMI
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a payment plan that suits you.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="text-2xl">🎁</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Cashback offers
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get cashback with selected EMI plans.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="text-2xl">📱</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Popular smartphones
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Pick from our available products and variants.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Featured collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Choose your smartphone
          </h2>

          <p className="mt-2 text-gray-600">
            Select a phone and explore its variants and EMI options.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const firstVariant = product.variants[0];

            const lowestEmi =
              product.emiPlans.length > 0
                ? Math.min(
                    ...product.emiPlans.map(
                      (plan) => plan.monthlyPayment,
                    ),
                  )
                : null;

            const discount =
              firstVariant && firstVariant.mrp > firstVariant.price
                ? Math.round(
                    ((firstVariant.mrp - firstVariant.price) /
                      firstVariant.mrp) *
                      100,
                  )
                : 0;

            return (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative flex h-80 items-center justify-center bg-gray-50 p-8">
                  {discount > 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      {discount}% OFF
                    </span>
                  )}

                  <img
                    src={firstVariant?.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  {firstVariant && (
                    <div className="mt-5">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Starting from
                      </p>

                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹
                          {firstVariant.price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm text-gray-400 line-through">
                          ₹
                          {firstVariant.mrp.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}

                  {lowestEmi !== null && (
                    <div className="mt-4 rounded-xl bg-blue-50 p-3">
                      <p className="text-xs text-gray-500">
                        EMI starting from
                      </p>

                      <p className="mt-1 font-bold text-blue-700">
                        ₹{lowestEmi.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-gray-500">
                          {" "}
                          / month
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                    <span className="font-semibold text-blue-600">
                      View product
                    </span>

                    <span className="text-lg text-gray-400 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-600">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-gray-900">1Fi</p>

          <p className="text-sm text-gray-500">
            Smartphones made easier with flexible EMI plans.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;