import { Link, useLocation } from "react-router-dom";

interface CheckoutState {
  productName: string;
  variantColor: string;
  storage: string;
  price: number;
  monthlyPayment: number;
  tenureMonths: number;
  interestRate: number;
  cashback: number;
  imageUrl: string;
}

function CheckoutPage() {
  const location = useLocation();

  const state = location.state as CheckoutState | null;

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            No EMI selection found
          </h1>

          <p className="mt-2 text-gray-500">
            Please select a product and EMI plan first.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            1Fi
          </Link>

          <span className="text-sm font-medium text-gray-500">
            EMI Checkout
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Almost there
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Review your EMI selection
          </h1>

          <p className="mt-2 text-gray-600">
            Check your phone and payment plan before continuing.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          {/* Product */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Your product
            </h2>

            <div className="mt-6 flex gap-5">
              <div className="flex h-32 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-100 p-3">
                <img
                  src={state.imageUrl}
                  alt={state.productName}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {state.productName}
                </h3>

                <p className="mt-2 text-gray-600">
                  {state.variantColor} · {state.storage}
                </p>

                <p className="mt-4 text-xl font-bold text-gray-900">
                  ₹{state.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </section>

          {/* EMI summary */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              EMI summary
            </h2>

            <div className="mt-6 rounded-xl bg-blue-50 p-5">
              <p className="text-sm text-gray-500">
                Monthly payment
              </p>

              <p className="mt-1 text-3xl font-bold text-blue-700">
                ₹{state.monthlyPayment.toLocaleString("en-IN")}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  / month
                </span>
              </p>
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              <div className="flex justify-between py-3">
                <span className="text-gray-500">Tenure</span>
                <span className="font-medium text-gray-900">
                  {state.tenureMonths} months
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">Interest rate</span>
                <span className="font-medium text-gray-900">
                  {state.interestRate}%
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">Cashback</span>
                <span className="font-semibold text-green-600">
                  ₹{state.cashback.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Continue
            </button>
          </section>
        </div>

        {/* Back */}
        <div className="mt-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-blue-600"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;