"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RazorpayCheckoutResponse = {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type CreateSubscriptionResponse = {
  keyId: string;
  subscriptionId: string;
  name: string;
  description: string;
  user: {
    name: string;
    email: string;
  };
  error?: string;
};

function loadRazorpayCheckout() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function UpgradePremiumButton({ isPremium }: { isPremium: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function startCheckout() {
    setIsLoading(true);
    setStatus(null);

    const checkoutLoaded = await loadRazorpayCheckout();

    if (!checkoutLoaded || !window.Razorpay) {
      setStatus("Razorpay Checkout could not be loaded. Check your browser connection and try again.");
      setIsLoading(false);
      return;
    }

    const createResponse = await fetch("/api/razorpay/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const createData = (await createResponse.json()) as CreateSubscriptionResponse;

    if (!createResponse.ok || createData.error) {
      setStatus(createData.error || "Could not start premium checkout.");
      setIsLoading(false);
      return;
    }

    const checkout = new window.Razorpay({
      key: createData.keyId,
      subscription_id: createData.subscriptionId,
      name: createData.name,
      description: createData.description,
      prefill: createData.user,
      theme: {
        color: "#22d3ee",
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false);
        },
      },
      handler: async (paymentResponse) => {
        const verifyResponse = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentResponse),
        });
        const verifyData = (await verifyResponse.json()) as { success?: boolean; error?: string };

        if (!verifyResponse.ok || !verifyData.success) {
          setStatus(verifyData.error || "Payment verification failed. Premium was not activated.");
          setIsLoading(false);
          return;
        }

        setStatus("Premium activated. Refreshing your dashboard.");
        router.refresh();
        setIsLoading(false);
      },
    });

    checkout.open();
  }

  if (isPremium) {
    return (
      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
        Premium is active on this account.
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Opening Razorpay..." : "Upgrade to Premium - ₹199/month"}
      </button>
      {status ? <p className="mt-3 text-sm leading-6 text-slate-300">{status}</p> : null}
    </div>
  );
}
