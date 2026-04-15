export type UserRole = "student" | "admin";

export type SubscriptionStatus =
  | "created"
  | "authenticated"
  | "active"
  | "pending"
  | "halted"
  | "cancelled"
  | "completed"
  | "expired";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_premium: boolean;
  created_at: string;
};

export type UserSubscription = {
  razorpay_subscription_id: string;
  razorpay_payment_id: string | null;
  status: SubscriptionStatus;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};
