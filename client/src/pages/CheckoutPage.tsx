import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

const CHECKOUT_STORAGE_KEY = "onefi_checkout_selection";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const routerState = location.state as CheckoutState | null;

  const [state, setState] = useState<CheckoutState | null>(() => {
    if (routerState) {
      return routerState;
    }

    try {
      const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY);

      if (!saved) {
        return null;
      }

      return JSON.parse(saved) as CheckoutState;
    } catch {
      return null;
    }
  });

  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  /*
   * Save the selected checkout data so that refreshing
   * /checkout does not immediately lose the selection.
   */
  useEffect(() => {
    if (!state) return;

    localStorage.setItem(
      CHECKOUT_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  /*
   * If React Router gives us new checkout state,
   * update our local state as well.
   */
  useEffect(() => {
    if (routerState) {
      setState(routerState);
      setOrderComplete(false);
    }
  }, [routerState]);

  if (!state) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-blue-600"
            >
              1Fi
            </Link>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>EMI Checkout</span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                ✓
              </span>
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
              🛒
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              No EMI selection found
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Please choose a product and EMI plan before continuing to
              checkout.
            </p>

            <Link
              to="/#products"
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-blue-600"
            >
              1Fi
            </Link>

            <span className="text-sm font-medium text-slate-500">
              Demo checkout
            </span>
          </div>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center px-5 py-12">
          <div className="w-full rounded-3xl border border-green-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-green-600">
              Demo order complete
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              You're all set!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Your selected {state.productName} configuration and EMI plan
              have been successfully reviewed.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                  <img
                    src={state.imageUrl}
                    alt={state.productName}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {state.productName}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {state.variantColor} · {state.storage}
                  </p>

                  <p className="mt-2 text-sm font-bold text-blue-600">
                    {formatPrice(state.monthlyPayment)} / month
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              This is a demonstration flow. No real payment has been
              processed.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/#products"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Browse more phones
              </Link>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            1Fi
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="hidden sm:inline">
              Secure checkout
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
              ✓
            </span>
          </div>
        </div>
      </header>

      {/* Main */}

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-slate-500 transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <span className="font-medium text-slate-900">
            Checkout
          </span>
        </div>

        {/* Heading */}

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Almost there
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Review your order
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Confirm your product and EMI plan before continuing.
          </p>
        </div>

        {/* Checkout progress */}

        <div className="mb-8 hidden items-center sm:flex">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              ✓
            </div>

            <span className="text-sm font-semibold text-slate-900">
              Product
            </span>
          </div>

          <div className="mx-4 h-px w-16 bg-blue-200" />

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>

            <span className="text-sm font-semibold text-slate-900">
              Review
            </span>
          </div>

          <div className="mx-4 h-px w-16 bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-400">
              3
            </div>

            <span className="text-sm font-medium text-slate-400">
              Payment
            </span>
          </div>
        </div>

        {/* Main layout */}

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_400px]">
          {/* Product */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
              <h2 className="text-lg font-bold text-slate-900">
                Your product
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Selected device and configuration
              </p>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 sm:h-60 sm:w-52">
                  <img
                    src={state.imageUrl}
                    alt={state.productName}
                    className="h-full w-full object-contain p-5"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-3 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Smartphone
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    {state.productName}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {state.variantColor} · {state.storage}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Product price
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      {formatPrice(state.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    ← Change selection
                  </button>
                </div>
              </div>

              {/* Highlights */}

              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg">📱</div>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Configuration
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {state.variantColor}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg">💾</div>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Storage
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {state.storage}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg">🛡️</div>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Purchase
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    EMI eligible
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EMI */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                EMI summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your selected payment plan
              </p>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Monthly payment
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {formatPrice(state.monthlyPayment)}
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    / month
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  for {state.tenureMonths} months
                </p>
              </div>

              <div className="mt-5 divide-y divide-slate-100">
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-slate-500">
                    Product price
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatPrice(state.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-slate-500">
                    Tenure
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {state.tenureMonths} months
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-slate-500">
                    Interest rate
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      state.interestRate === 0
                        ? "text-green-600"
                        : "text-slate-900"
                    }`}
                  >
                    {state.interestRate === 0
                      ? "0% — No interest"
                      : `${state.interestRate}%`}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-slate-500">
                    Cashback
                  </span>

                  <span className="text-sm font-bold text-green-600">
                    {formatPrice(state.cashback)}
                  </span>
                </div>
              </div>

              {/* Cashback */}

              <div className="mt-2 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm">
                  🎁
                </div>

                <div>
                  <p className="text-sm font-bold text-green-800">
                    You're getting {formatPrice(state.cashback)} cashback
                  </p>

                  <p className="mt-1 text-xs leading-5 text-green-700">
                    Cashback will be applied according to the selected EMI
                    offer.
                  </p>
                </div>
              </div>

              {/* Demo payment */}

              <button
                type="button"
                onClick={() => setOrderComplete(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
              >
                Complete demo order
                <span className="text-base">→</span>
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Demo only · No real payment will be processed
              </p>
            </div>
          </section>
        </div>

        {/* Trust cards */}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
              💳
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Flexible EMI
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Choose what works for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg">
              🔒
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Secure checkout
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Your selection is protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg">
              🎁
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Cashback
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Enjoy your selected offer
              </p>
            </div>
          </div>
        </div>

        {/* Back */}

        <div className="mt-7">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            ← Back to product
          </button>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;