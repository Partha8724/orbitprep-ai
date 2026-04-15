import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SubscriptionStatus, UserSubscription } from "@/lib/types";

export async function getLatestUserSubscription(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("razorpay_subscription_id, razorpay_payment_id, status, current_period_end, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load subscription: ${error.message}`);
  }

  return data as UserSubscription | null;
}

export async function upsertUserSubscription({
  userId,
  subscriptionId,
  paymentId = null,
  status,
  currentPeriodEnd = null,
}: {
  userId: string;
  subscriptionId: string;
  paymentId?: string | null;
  status: SubscriptionStatus;
  currentPeriodEnd?: string | null;
}) {
  const supabase = createSupabaseAdminClient();
  const isPremium = status === "active" || status === "authenticated";

  const { error: subscriptionError } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      razorpay_subscription_id: subscriptionId,
      razorpay_payment_id: paymentId,
      status,
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "razorpay_subscription_id",
    }
  );

  if (subscriptionError) {
    throw new Error(`Could not update subscription: ${subscriptionError.message}`);
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ is_premium: isPremium })
    .eq("id", userId);

  if (profileError) {
    throw new Error(`Could not update premium status: ${profileError.message}`);
  }
}

export async function updateSubscriptionByRazorpayId({
  subscriptionId,
  paymentId = null,
  status,
  currentPeriodEnd = null,
}: {
  subscriptionId: string;
  paymentId?: string | null;
  status: SubscriptionStatus;
  currentPeriodEnd?: string | null;
}) {
  const supabase = createSupabaseAdminClient();

  const { data: subscription, error: lookupError } = await supabase
    .from("subscriptions")
    .select("user_id")
    .eq("razorpay_subscription_id", subscriptionId)
    .single();

  if (lookupError || !subscription) {
    throw new Error(`Could not find subscription ${subscriptionId}.`);
  }

  await upsertUserSubscription({
    userId: subscription.user_id as string,
    subscriptionId,
    paymentId,
    status,
    currentPeriodEnd,
  });
}
