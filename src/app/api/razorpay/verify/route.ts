import { NextResponse } from "next/server";

import { getCurrentProfile } from "@/lib/auth";
import { verifyCheckoutSignature } from "@/lib/razorpay/client";
import { upsertUserSubscription } from "@/lib/subscriptions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerifyPaymentBody = {
  razorpay_payment_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }
    const body = (await request.json()) as VerifyPaymentBody;

    if (!body.razorpay_payment_id || !body.razorpay_subscription_id || !body.razorpay_signature) {
      return NextResponse.json({ error: "Missing Razorpay payment verification fields." }, { status: 400 });
    }

    const isValid = verifyCheckoutSignature({
      subscriptionId: body.razorpay_subscription_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid Razorpay signature." }, { status: 400 });
    }

    await upsertUserSubscription({
      userId: profile.id,
      subscriptionId: body.razorpay_subscription_id,
      paymentId: body.razorpay_payment_id,
      status: "active",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not verify payment.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
