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
      variant.price < lowest.price ? variant : lowest,
    );
  };

  const getLowestEmi = (product: Product) => {
    if (!product.emiPlans?.length) return null;

    return product.emiPlans.reduce((lowest, plan) =>
      plan.monthlyPayment < lowest.monthlyPayment ? plan : lowest,
    );
  };

  const getDiscountPercentage = (price: number, mrp: number) => {
    if (!mrp || mrp <= price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  const featuredProduct = useMemo(() => {
    if (!products.length) return null;

    return products[0];
  }, [products]);

  const featuredVariant = featuredProduct
    ? getStartingVariant(featuredProduct)
    : null;

  const featuredEmi = featuredProduct
    ? getLowestEmi(featuredProduct)
    : null;

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="text-[28px] font-black tracking-[-0.08em] text-blue-600 transition hover:opacity-80"
          >
            1Fi
          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="/#products"
              className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              Products
            </a>

            <a
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              How it works
            </a>

            <a
              href="/#benefits"
              className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              Why 1Fi
            </a>

          </nav>

          <a
            href="/#products"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
          >
            Explore phones

            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

        </div>
      </header>

      {/* ================= HERO ================= */}

      <section
        id="hero"
        className="relative overflow-hidden bg-[#f7f9fc]"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-xs font-bold text-blue-600 shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white">
                ✦
              </span>

              Smarter way to buy your next phone
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[64px]">
              Get the phone
              <br />
              you want.
              <span className="block text-blue-600">
                Pay through easy EMI.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Shop premium smartphones and choose an EMI plan that fits your
              budget. Transparent pricing, flexible tenures and cashback
              offers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="/#products"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl"
              >
                Shop smartphones

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                How it works
              </a>

            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500">

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-600">
                  ✓
                </span>
                Flexible EMI
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-600">
                  ✓
                </span>
                Transparent pricing
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-600">
                  ✓
                </span>
                Cashback offers
              </div>

            </div>

          </div>

          {/* FEATURED PHONE */}

          <div className="relative mx-auto w-full max-w-xl">

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,0.10)] sm:p-5">

              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-5 sm:p-7">

                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100/50 blur-2xl" />

                <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-indigo-50 blur-2xl" />

                <div className="relative z-10 flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                      Featured
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Premium smartphones
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    ✦
                  </div>

                </div>

                {featuredProduct && (
                  <Link
                    to={`/products/${featuredProduct.slug}`}
                    className="group relative z-10 mt-6 block rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-5"
                  >

                    <div className="flex items-center gap-5">

                      <div className="flex h-40 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-3 sm:h-48 sm:w-32">

                        {featuredVariant?.imageUrl ? (
                          <img
                            src={featuredVariant.imageUrl}
                            alt={featuredProduct.name}
                            className="h-full w-full object-contain drop-shadow-lg transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-5xl">
                            📱
                          </span>
                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-semibold text-slate-400">
                          Starting from
                        </p>

                        <p className="mt-1 truncate text-lg font-black text-slate-950 sm:text-xl">
                          {featuredProduct.name}
                        </p>

                        {featuredVariant && (
                          <p className="mt-2 text-xs font-medium text-slate-500">
                            {featuredVariant.color} ·{" "}
                            {featuredVariant.storage}
                          </p>
                        )}

                        {featuredEmi && (
                          <>
                            <p className="mt-4 text-xs font-semibold text-blue-600">
                              EMI from
                            </p>

                            <div className="mt-0.5 flex items-baseline gap-1.5">

                              <span className="text-2xl font-black text-blue-600">
                                ₹
                                {featuredEmi.monthlyPayment.toLocaleString(
                                  "en-IN",
                                )}
                              </span>

                              <span className="text-xs text-slate-400">
                                / month
                              </span>

                            </div>
                          </>
                        )}

                      </div>

                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                      <span className="text-xs font-semibold text-slate-400">
                        View product details
                      </span>

                      <span className="text-sm font-bold text-blue-600 transition-transform group-hover:translate-x-1">
                        →
                      </span>

                    </div>

                  </Link>
                )}

                <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">

                  <div className="rounded-xl border border-slate-100 bg-white p-3 text-center shadow-sm">
                    <p className="text-base">💳</p>
                    <p className="mt-1 text-[10px] font-bold text-slate-500">
                      Easy EMI
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-3 text-center shadow-sm">
                    <p className="text-base">🔒</p>
                    <p className="mt-1 text-[10px] font-bold text-slate-500">
                      Secure
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-3 text-center shadow-sm">
                    <p className="text-base">🎁</p>
                    <p className="mt-1 text-[10px] font-bold text-slate-500">
                      Cashback
                    </p>
                  </div>

                </div>

              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl sm:-left-7">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected plans
              </p>

              <p className="mt-1 text-sm font-black text-emerald-600">
                Cashback available
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section
        id="benefits"
        className="scroll-mt-20 border-b border-slate-100 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-6 md:grid-cols-3 lg:px-8">

          <div className="flex gap-4 border-b border-slate-100 py-7 md:border-b-0 md:border-r md:pr-8">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
              ₹
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

          <div className="flex gap-4 border-b border-slate-100 py-7 md:border-b-0 md:border-r md:px-8">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg">
              🎁
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Cashback offers
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Get additional value with cashback on eligible plans.
              </p>
            </div>

          </div>

          <div className="flex gap-4 py-7 md:pl-8">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
              ✓
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

      {/* ================= PRODUCTS ================= */}

      <section
        id="products"
        className="scroll-mt-20 bg-[#f7f9fc] px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Shop smartphones
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Pick your next phone
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Compare prices and EMI plans across our available
                smartphones.
              </p>

            </div>

            {!loading && !error && products.length > 0 && (
              <div className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-500 shadow-sm">
                {products.length} products available
              </div>
            )}

          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white"
                >

                  <div className="h-72 animate-pulse bg-slate-100" />

                  <div className="space-y-4 p-6">

                    <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />

                    <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />

                    <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100" />

                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="mt-10 rounded-[28px] border border-red-100 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-500">
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
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Try again
              </button>

            </div>
          )}

          {/* EMPTY */}

          {!loading && !error && products.length === 0 && (
            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="text-4xl">
                📱
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No products available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please check back later.
              </p>

            </div>
          )}

          {/* PRODUCT CARDS */}

          {!loading && !error && products.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => {

                const variant = getStartingVariant(product);
                const emi = getLowestEmi(product);

                if (!variant) return null;

                const discount = getDiscountPercentage(
                  variant.price,
                  variant.mrp,
                );

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_22px_50px_rgba(15,23,42,0.10)]"
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/products/${product.slug}`}
                      className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8"
                    >

                      {discount > 0 && (
                        <div className="absolute left-4 top-4 z-10 rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                          {discount}% OFF
                        </div>
                      )}

                      <div className="absolute right-4 top-4 rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur">
                        {product.variants.length} variants
                      </div>

                      <img
                        src={variant.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,0.10)] transition duration-500 group-hover:scale-105"
                      />

                    </Link>

                    {/* DETAILS */}

                    <div className="p-6">

                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                        Smartphone
                      </p>

                      <h3 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
                        {product.name}
                      </h3>

                      {/* PRICE */}

                      <div className="mt-5">

                        <p className="text-[11px] font-semibold text-slate-400">
                          Starting from
                        </p>

                        <div className="mt-1 flex flex-wrap items-baseline gap-2">

                          <span className="text-2xl font-black text-slate-950">
                            ₹
                            {variant.price.toLocaleString("en-IN")}
                          </span>

                          {variant.mrp > variant.price && (
                            <span className="text-sm text-slate-400 line-through">
                              ₹
                              {variant.mrp.toLocaleString("en-IN")}
                            </span>
                          )}

                        </div>

                        {variant.mrp > variant.price && (
                          <p className="mt-1 text-xs font-bold text-emerald-600">
                            Save ₹
                            {(
                              variant.mrp - variant.price
                            ).toLocaleString("en-IN")}
                          </p>
                        )}

                      </div>

                      {/* EMI */}

                      {emi && (
                        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">

                          <div className="flex items-center justify-between gap-3">

                            <div>

                              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                EMI from
                              </p>

                              <p className="mt-1 text-lg font-black text-slate-950">
                                ₹
                                {emi.monthlyPayment.toLocaleString(
                                  "en-IN",
                                )}

                                <span className="ml-1 text-[11px] font-medium text-slate-400">
                                  / month
                                </span>
                              </p>

                            </div>

                            <div className="text-right">

                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Tenure
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-700">
                                {emi.tenureMonths} months
                              </p>

                            </div>

                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-blue-100 pt-3">

                            <span className="text-[11px] font-medium text-slate-500">
                              {emi.interestRate}% interest
                            </span>

                            {emi.cashback > 0 && (
                              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                                ₹
                                {emi.cashback.toLocaleString(
                                  "en-IN",
                                )}{" "}
                                cashback
                              </span>
                            )}

                          </div>

                        </div>
                      )}

                      {/* BUTTON */}

                      <Link
                        to={`/products/${product.slug}`}
                        className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-700 hover:shadow-xl"
                      >
                        View product

                        <span className="transition-transform group-hover/btn:translate-x-1">
                          →
                        </span>
                      </Link>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Simple process
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
              How it works
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Everything is simple and transparent — from choosing your phone
              to reviewing your EMI plan.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                01
              </div>

              <h3 className="mt-6 text-lg font-black text-slate-900">
                Choose your phone
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Browse available smartphones and select the configuration you
                want.
              </p>

              <div className="mt-6 h-1 w-10 rounded-full bg-blue-600 transition-all group-hover:w-16" />

            </div>

            <div className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                02
              </div>

              <h3 className="mt-6 text-lg font-black text-slate-900">
                Pick an EMI plan
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Compare monthly payments, tenure, interest rate and cashback
                before making your choice.
              </p>

              <div className="mt-6 h-1 w-10 rounded-full bg-blue-600 transition-all group-hover:w-16" />

            </div>

            <div className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                03
              </div>

              <h3 className="mt-6 text-lg font-black text-slate-900">
                Review your order
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Confirm your selected product and EMI details before continuing
                to checkout.
              </p>

              <div className="mt-6 h-1 w-10 rounded-full bg-blue-600 transition-all group-hover:w-16" />

            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-blue-600 px-6 py-12 text-center shadow-2xl shadow-blue-600/15 sm:px-10 sm:py-16">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="relative">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
              Ready to get started?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Your next phone is just a few clicks away.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Explore our smartphones and find an EMI plan that fits your
              budget.
            </p>

            <a
              href="/#products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Explore products
              <span>→</span>
            </a>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-800 bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-10 sm:flex-row">

            <div>

              <Link
                to="/"
                className="text-[28px] font-black tracking-[-0.08em] text-white"
              >
                1Fi
              </Link>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                A simple smartphone shopping experience with transparent EMI
                plans and cashback offers.
              </p>

            </div>

            <div className="flex gap-14">

              <div>

                <p className="text-sm font-bold text-white">
                  Explore
                </p>

                <div className="mt-3 space-y-2.5">

                  <a
                    href="/#products"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Products
                  </a>

                  <a
                    href="/#how-it-works"
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

                <div className="mt-3 space-y-2.5">

                  <a
                    href="/#benefits"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Flexible EMI
                  </a>

                  <a
                    href="/#benefits"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Cashback
                  </a>

                  <a
                    href="/#benefits"
                    className="block text-sm text-slate-400 transition hover:text-white"
                  >
                    Transparent pricing
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