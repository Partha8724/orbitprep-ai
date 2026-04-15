"use client";

import Link from "next/link";

export function UpgradePremiumButton({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
      <div className="font-semibold">{isPremium ? "Premium flag is active." : "Free launch access is active."}</div>
      <p className="mt-2 leading-6 text-emerald-50/80">Payment checkout is disabled for now. All learning features are available without upgrading.</p>
      <Link href="/dashboard" className="mt-3 inline-flex rounded-md bg-white px-4 py-2 font-semibold text-slate-950">Open dashboard</Link>
    </div>
  );
}
