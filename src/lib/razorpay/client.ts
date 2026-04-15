import crypto from "node:crypto";

const premiumAmountPaise = 19900;

export type RazorpaySubscriptionResponse = {
  id: string;
  status: string;
  short_url?: string;
};

type RazorpaySubscriptionRequest = {
  userId: string;
  email: string;
  fullName: string;
};

function getRazorpayKeySecret() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Missing Razorpay server keys. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
  }

  return { keyId, keySecret };
}

export function getRazorpayPublicConfig() {
  const checkoutKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
  const planId = process.env.RAZORPAY_PREMIUM_PLAN_ID;

  if (!checkoutKeyId) {
    throw new Error("Missing Razorpay checkout key. Set NEXT_PUBLIC_RAZORPAY_KEY_ID.");
  }

  if (!planId) {
    throw new Error("Missing Razorpay premium plan. Set RAZORPAY_PREMIUM_PLAN_ID.");
  }

  return {
    checkoutKeyId,
    planId,
    premiumAmountPaise,
  };
}

export async function createPremiumSubscription({ userId, email, fullName }: RazorpaySubscriptionRequest) {
  const { keyId, keySecret } = getRazorpayKeySecret();
  const { planId } = getRazorpayPublicConfig();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      total_count: 120,
      quantity: 1,
      customer_notify: 1,
      notes: {
        user_id: userId,
        email,
        full_name: fullName,
        product: "orbitprep_ai_premium_monthly",
      },
    }),
  });

  const body = (await response.json()) as RazorpaySubscriptionResponse & { error?: { description?: string } };

  if (!response.ok) {
    throw new Error(body.error?.description || "Could not create Razorpay subscription.");
  }

  return body;
}

export function verifyCheckoutSignature({
  subscriptionId,
  paymentId,
  signature,
}: {
  subscriptionId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret } = getRazorpayKeySecret();
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${subscriptionId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Missing Razorpay webhook secret. Set RAZORPAY_WEBHOOK_SECRET.");
  }

  if (!signature) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

  if (expectedSignature.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}
