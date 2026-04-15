import { NextResponse } from "next/server";

import { getCurrentProfile } from "@/lib/auth";
import { getRazorpayPublicConfig, createPremiumSubscription } from "@/lib/razorpay/client";
import { upsertUserSubscription } from "@/lib/subscriptions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    if (profile.is_premium) {
      return NextResponse.json({ error: "Premium is already active for this account." }, { status: 409 });
    }

    const subscription = await createPremiumSubscription({
      userId: profile.id,
      email: profile.email,
      fullName: profile.full_name,
    });
    const { checkoutKeyId, premiumAmountPaise } = getRazorpayPublicConfig();

    await upsertUserSubscription({
      userId: profile.id,
      subscriptionId: subscription.id,
      status: subscription.status === "active" ? "active" : "created",
    });

    return NextResponse.json({
      keyId: checkoutKeyId,
      subscriptionId: subscription.id,
      amount: premiumAmountPaise,
      currency: "INR",
      name: "OrbitPrep AI Premium",
      description: "Monthly premium subscription",
      user: {
        name: profile.full_name,
        email: profile.email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create subscription.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
