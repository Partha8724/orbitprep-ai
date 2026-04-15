import { NextResponse } from "next/server";

import { verifyWebhookSignature } from "@/lib/razorpay/client";
import { updateSubscriptionByRazorpayId, upsertUserSubscription } from "@/lib/subscriptions";
import type { SubscriptionStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RazorpayEntity = {
  id?: string;
  status?: string;
  notes?: {
    user_id?: string;
  };
  current_end?: number;
  subscription_id?: string;
};

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    subscription?: {
      entity?: RazorpayEntity;
    };
    payment?: {
      entity?: RazorpayEntity;
    };
  };
};

function normalizeStatus(status: string | undefined): SubscriptionStatus {
  if (status === "active" || status === "authenticated" || status === "pending") {
    return status;
  }

  if (status === "halted" || status === "cancelled" || status === "completed" || status === "expired") {
    return status;
  }

  return "created";
}

function toIsoDate(unixSeconds: number | undefined) {
  return unixSeconds ? new Date(unixSeconds * 1000).toISOString() : null;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  try {
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
    }

    const payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
    const event = payload.event || "";
    const subscriptionEntity = payload.payload?.subscription?.entity;
    const paymentEntity = payload.payload?.payment?.entity;

    if (event.startsWith("subscription.") && subscriptionEntity?.id) {
      const userId = subscriptionEntity.notes?.user_id;
      const status = normalizeStatus(subscriptionEntity.status);

      if (userId) {
        await upsertUserSubscription({
          userId,
          subscriptionId: subscriptionEntity.id,
          status,
          currentPeriodEnd: toIsoDate(subscriptionEntity.current_end),
        });
      } else {
        await updateSubscriptionByRazorpayId({
          subscriptionId: subscriptionEntity.id,
          status,
          currentPeriodEnd: toIsoDate(subscriptionEntity.current_end),
        });
      }
    }

    if (event === "payment.captured" && paymentEntity?.subscription_id && paymentEntity.id) {
      await updateSubscriptionByRazorpayId({
        subscriptionId: paymentEntity.subscription_id,
        paymentId: paymentEntity.id,
        status: "active",
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
