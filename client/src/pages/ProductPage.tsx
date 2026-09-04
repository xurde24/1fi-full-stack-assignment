import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../services/api";
import type { EmiPlan, Product, Variant } from "../types/product";

function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    null,
  );
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;

      setLoading(true);
      setError("");

      try {
        const data = await getProductBySlug(slug);

        setProduct(data);

        const storageKey = `onefi_product_selection_${slug}`;
        const savedSelection = localStorage.getItem(storageKey);

        let savedVariantId: string | null = null;
        let savedPlanId: string | null = null;

        if (savedSelection) {
          try {
            const parsed = JSON.parse(savedSelection);

            savedVariantId =
              typeof parsed.variantId === "string"
                ? parsed.variantId
                : null;

            savedPlanId =
              typeof parsed.planId === "string"
                ? parsed.planId
                : null;
          } catch {
            localStorage.removeItem(storageKey);
          }
        }

        const savedVariant = data.variants.find(
          (variant) => variant.id === savedVariantId,
        );

        const savedPlan = data.emiPlans.find(
          (plan) => plan.id === savedPlanId,
        );

        if (data.variants.length > 0) {
          setSelectedVariant(savedVariant || data.variants[0]);
        } else {
          setSelectedVariant(null);
        }

        if (data.emiPlans.length > 0) {
          setSelectedPlan(savedPlan || data.emiPlans[0]);
        } else {
          setSelectedPlan(null);
        }
      } catch {
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug || !selectedVariant || !selectedPlan) {
      return;
    }

    const storageKey = `onefi_product_selection_${slug}`;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        variantId: selectedVariant.id,
        planId: selectedPlan.id,
      }),
    );
  }, [slug, selectedVariant, selectedPlan]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="h-7 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-[520px] items-center justify-center rounded-xl bg-gray-100">
                <div className="h-72 w-48 animate-pulse rounded-2xl bg-gray-200" />
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />

              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

              <div className="grid grid-cols-2 gap-3">
                <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
                <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
                <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
              </div>

              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

              <div className="space-y-3">
                <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
                <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
                <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
              </div>

              <div className="h-14 animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-500">
          {error || "Product not found."}
        </p>

        <a
          href="/#products"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white"
        >
          Back to products
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
     
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            1Fi
          </Link>

          

          <a
            href="/#products"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            All Products
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
       
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
         

          <Link
            to="/"
            className="font-medium text-slate-400 transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="text-slate-300">
            /
          </span>

          

          <a
            href="/#products"
            className="font-medium text-slate-500 transition hover:text-blue-600"
          >
            Smartphone
          </a>

          <span className="text-slate-300">
            /
          </span>

         

          <span className="font-semibold text-slate-900">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
         

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex h-[380px] items-center justify-center rounded-xl bg-gray-50 p-8 sm:h-[520px]">
              {selectedVariant && (
                <img
                  src={selectedVariant.imageUrl}
                  alt={`${product.name} ${selectedVariant.color}`}
                  className="h-full w-full object-contain transition duration-300"
                />
              )}
            </div>

            

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.variants.map((variant) => {
                const isSelected =
                  selectedVariant?.id === variant.id;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`h-20 w-20 shrink-0 rounded-xl border-2 bg-gray-50 p-2 transition ${
                      isSelected
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={variant.imageUrl}
                      alt={variant.color}
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </section>

          

          <section className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Smartphone
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>

              <p className="mt-3 leading-7 text-gray-600">
                {product.description}
              </p>

              
              {selectedVariant && (
                <div className="mt-6 border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500">
                    Selling price
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{selectedVariant.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-lg text-gray-400 line-through">
                      ₹{selectedVariant.mrp.toLocaleString("en-IN")}
                    </span>

                    {selectedVariant.mrp >
                      selectedVariant.price && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {Math.round(
                          ((selectedVariant.mrp -
                            selectedVariant.price) /
                            selectedVariant.mrp) *
                            100,
                        )}
                        % off
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-medium text-green-600">
                    You save ₹
                    {(
                      selectedVariant.mrp -
                      selectedVariant.price
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">
                    Select variant
                  </h2>

                  {selectedVariant && (
                    <span className="text-sm text-gray-500">
                      {selectedVariant.color}
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.variants.map((variant) => {
                    const isSelected =
                      selectedVariant?.id === variant.id;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() =>
                          setSelectedVariant(variant)
                        }
                        className={`rounded-xl border-2 p-4 text-left transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {variant.color}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {variant.storage}
                            </p>
                          </div>

                          {isSelected && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                              ✓
                            </span>
                          )}
                        </div>

                        <p className="mt-3 font-semibold text-gray-900">
                          ₹{variant.price.toLocaleString("en-IN")}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              

              <div className="mt-8">
                <h2 className="font-semibold text-gray-900">
                  Select EMI plan
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a monthly payment option
                </p>

                <div className="mt-4 space-y-3">
                  {product.emiPlans.map((plan) => {
                    const isSelected =
                      selectedPlan?.id === plan.id;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() =>
                          setSelectedPlan(plan)
                        }
                        className={`w-full rounded-xl border-2 p-4 text-left transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-400"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xl font-bold text-gray-900">
                              ₹
                              {plan.monthlyPayment.toLocaleString(
                                "en-IN",
                              )}

                              <span className="text-sm font-normal text-gray-500">
                                {" "}
                                / month
                              </span>
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {plan.tenureMonths} months ·{" "}
                              {plan.interestRate}% interest
                            </p>
                          </div>

                          {isSelected && (
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                              ✓
                            </span>
                          )}
                        </div>

                        {plan.cashback > 0 && (
                          <div className="mt-3">
                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              ₹
                              {plan.cashback.toLocaleString(
                                "en-IN",
                              )}{" "}
                              cashback
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

             
              <button
                type="button"
                disabled={!selectedVariant || !selectedPlan}
                onClick={() => {
                  if (!selectedVariant || !selectedPlan) {
                    return;
                  }

                  navigate("/checkout", {
                    state: {
                      productName: product.name,
                      variantColor: selectedVariant.color,
                      storage: selectedVariant.storage,
                      price: selectedVariant.price,
                      monthlyPayment:
                        selectedPlan.monthlyPayment,
                      tenureMonths:
                        selectedPlan.tenureMonths,
                      interestRate:
                        selectedPlan.interestRate,
                      cashback: selectedPlan.cashback,
                      imageUrl: selectedVariant.imageUrl,
                    },
                  });
                }}
                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Proceed with EMI
              </button>
            </div>

            

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-lg">💳</p>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  Easy EMI
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-lg">🔒</p>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  Secure
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-lg">🎁</p>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  Cashback
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;