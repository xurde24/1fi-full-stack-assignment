import { useEffect, useMemo, useState } from "react";
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
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const getStartingVariant = (product: Product) => {
    if (!product.variants?.length) return null;

    return product.variants.reduce((lowest, variant) =>
      variant.price < lowest.price ? variant : lowest
    );
  };

  const getLowestEmi = (product: Product) => {
    if (!product.emiPlans?.length) return null;

    return product.emiPlans.reduce((lowest, plan) =>
      plan.monthlyPayment < lowest.monthlyPayment ? plan : lowest
    );
  };

  const getDiscountPercentage = (price: number, mrp: number) => {
    if (!mrp || mrp <= price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  const featuredProducts = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            1Fi
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#products"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Products
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              How it works
            </a>

            <a
              href="#benefits"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Why 1Fi
            </a>
          </nav>

          <a
            href="#products"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore phones
          </a>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-slate-50">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          {/* Hero text */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-xs font-semibold text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Smarter way to buy your next phone
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Get the phone you want.
              <span className="block text-blue-600">
                Pay through easy EMI.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Shop premium smartphones and choose an EMI plan that fits your
              budget. Transparent pricing, flexible tenures and cashback
              offers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Shop smartphones
                <span>→</span>
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                How it works
              </a>
            </div>

            {/* Hero trust points */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                  ✓
                </span>
                Flexible EMI
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                  ✓
                </span>
                Transparent pricing
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                  ✓
                </span>
                Cashback offers
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 sm:p-6">
              <div className="rounded-[1.5rem] bg-slate-50 p-5 sm:p-7">
                {/* Fake product card visual */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Featured
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Premium smartphones
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm">
                    ✦
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                    {featuredProducts[0]?.variants?.[0]?.imageUrl ? (
                      <img
                        src={featuredProducts[0].variants[0].imageUrl}
                        alt={featuredProducts[0].name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-4xl">📱</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Starting from
                    </p>

                    <p className="mt-1 truncate text-lg font-bold text-slate-900">
                      {featuredProducts[0]?.name || "Premium smartphone"}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Easy monthly payments
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-blue-600">
                        ₹2,699
                      </span>

                      <span className="text-xs text-slate-400">
                        / month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white p-3 text-center">
                    <p className="text-base">💳</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-500">
                      EMI
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center">
                    <p className="text-base">🔒</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-500">
                      Secure
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center">
                    <p className="text-base">🎁</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-500">
                      Cashback
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating offer */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg sm:-left-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Selected offers
              </p>

              <p className="mt-1 text-sm font-bold text-green-600">
                Up to cashback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section id="benefits" className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex gap-4 border-b border-slate-100 py-7 md:border-b-0 md:border-r md:pr-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
              💳
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Flexible EMI plans
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Choose a monthly payment and tenure that works for you.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-b border-slate-100 py-7 md:border-b-0 md:px-8 md:border-r">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
              🎁
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Cashback offers
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Get additional value with cashback on selected plans.
              </p>
            </div>
          </div>

          <div className="flex gap-4 py-7 md:pl-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🔒
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Simple & transparent
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                See pricing, interest and cashback before you choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCTS ==================== */}
      <section
        id="products"
        className="scroll-mt-20 bg-slate-50 px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Shop smartphones
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Pick your next phone
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Compare prices and EMI plans across our available
                smartphones.
              </p>
            </div>

            {!loading && !error && products.length > 0 && (
              <div className="text-sm font-medium text-slate-400">
                {products.length} products available
              </div>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <div className="h-72 animate-pulse bg-slate-100" />

                  <div className="space-y-4 p-6">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-3xl border border-red-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">
                !
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Couldn't load products
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <div className="text-4xl">📱</div>

              <h3 className="mt-4 font-bold text-slate-900">
                No products available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please check back later.
              </p>
            </div>
          )}

          {/* Product cards */}
          {!loading && !error && products.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const variant = getStartingVariant(product);
                const emi = getLowestEmi(product);

                if (!variant) return null;

                const discount = getDiscountPercentage(
                  variant.price,
                  variant.mrp
                );

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                  >
                    {/* Product image */}
                    <div className="relative flex h-72 items-center justify-center overflow-hidden bg-slate-50 p-8">
                      {discount > 0 && (
                        <div className="absolute left-4 top-4 z-10 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                          {discount}% OFF
                        </div>
                      )}

                      <img
                        src={variant.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Product content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                            Smartphone
                          </p>

                          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900">
                            {product.name}
                          </h3>
                        </div>

                        <div className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                          {product.variants.length} variants
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-5">
                        <p className="text-xs font-medium text-slate-400">
                          Starting from
                        </p>

                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-slate-950">
                            ₹{variant.price.toLocaleString("en-IN")}
                          </span>

                          {variant.mrp > variant.price && (
                            <span className="text-sm text-slate-400 line-through">
                              ₹{variant.mrp.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {variant.mrp > variant.price && (
                          <p className="mt-1 text-xs font-semibold text-green-600">
                            Save ₹
                            {(variant.mrp - variant.price).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        )}
                      </div>

                      {/* EMI */}
                      {emi && (
                        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-medium text-blue-600">
                                EMI from
                              </p>

                              <p className="mt-1 text-lg font-extrabold text-slate-900">
                                ₹
                                {emi.monthlyPayment.toLocaleString(
                                  "en-IN"
                                )}
                                <span className="ml-1 text-xs font-medium text-slate-500">
                                  / month
                                </span>
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs font-medium text-slate-400">
                                Tenure
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-700">
                                {emi.tenureMonths} months
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-blue-100 pt-3">
                            <span className="text-xs text-slate-500">
                              {emi.interestRate}% interest
                            </span>

                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700">
                              ₹
                              {emi.cashback.toLocaleString("en-IN")} cashback
                            </span>
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        to={`/products/${product.slug}`}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 group-hover:shadow-md"
                      >
                        View product
                        <span>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section
        id="how-it-works"
        className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Simple process
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              How it works
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Choose your phone, select your preferred EMI plan and review
              everything before continuing.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                01
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Choose your phone
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Browse available smartphones and select the configuration
                you want.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                02
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Pick an EMI plan
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Compare monthly payments, tenure, interest rate and cashback
                before making your choice.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                03
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Review your order
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Confirm your selected product and EMI details on the checkout
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
            Ready to get started?
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your next phone is just a few clicks away.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Explore our smartphones and find an EMI plan that fits your
            budget.
          </p>

          <a
            href="#products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
          >
            Explore products
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div>
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-tight text-white"
              >
                1Fi
              </Link>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                A simple smartphone shopping experience with transparent
                EMI plans and cashback offers.
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <p className="text-sm font-bold text-white">
                  Explore
                </p>

                <div className="mt-3 space-y-2">
                  <a
                    href="#products"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Products
                  </a>

                  <a
                    href="#how-it-works"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    How it works
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Benefits
                </p>

                <div className="mt-3 space-y-2">
                  <a
                    href="#benefits"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Flexible EMI
                  </a>

                  <a
                    href="#benefits"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Cashback
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500">
              © 2026 1Fi. Built as a full-stack internship assignment demo.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;