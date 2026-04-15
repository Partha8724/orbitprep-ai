"use client";

import Link from "next/link";
import { useState } from "react";
import { Brain, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/exams", label: "Exams" },
  { href: "/daily-questions", label: "Questions" },
  { href: "/pdfs", label: "PDFs" },
  { href: "/current-affairs", label: "Current Affairs" },
  { href: "/test-series", label: "Tests" },
  { href: "/ai-mentor", label: "AI Mentor" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/20"><Brain className="h-6 w-6 text-cyan-100" /></div>
          <div><div className="text-lg font-semibold">OrbitPrep AI</div><div className="text-xs text-slate-300">Government exam platform</div></div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-200 lg:flex">{links.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-white">{link.label}</Link>)}</nav>
        <div className="hidden items-center gap-3 lg:flex"><Link href="/login" className="rounded-md px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-white">Login</Link><Link href="/dashboard" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">Dashboard</Link></div>
        <button onClick={() => setOpen(!open)} className="rounded-md border border-white/10 bg-white/5 p-2 lg:hidden" aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {open ? <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 lg:hidden"><div className="flex flex-col gap-3">{[...links, { href: "/login", label: "Login" }, { href: "/dashboard", label: "Dashboard" }].map((link) => <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-slate-200 hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>{link.label}</Link>)}</div></div> : null}
    </header>
  );
}
