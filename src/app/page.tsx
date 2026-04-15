import Link from "next/link";
import { Bot, ClipboardList, FileText, Languages, Newspaper, ShieldCheck, Trophy } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { exams, subjectSections } from "@/lib/catalog";

const features = [
  { href: "/ai-mentor", title: "AI Mentor", copy: "Ask for explanations, revision plans, current affairs summaries, and weak-topic guidance.", icon: Bot },
  { href: "/test-series", title: "Mock tests", copy: "Take timed tests with saved attempts, scoring, accuracy, and result pages.", icon: Trophy },
  { href: "/daily-questions", title: "Question bank", copy: "Practice approved MCQs from the Supabase-backed admin workflow.", icon: ClipboardList },
  { href: "/pdfs", title: "PDF library", copy: "Open approved study notes, digests, previous paper resources, and revision PDFs.", icon: FileText },
  { href: "/current-affairs", title: "Current affairs", copy: "Read published summaries that connect daily events with exam preparation.", icon: Newspaper },
  { href: "/exams", title: "Exam hubs", copy: "Study UPSC, APSC, SSC, Railway, Banking, Police, Teaching, Defence, and Assam job exams.", icon: ShieldCheck },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#050816] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">All features free during launch</div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">AI-powered preparation for Indian government exams.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">OrbitPrep AI combines Supabase-backed study content, timed mock tests, PDF resources, current affairs, AI explanations, and admin publishing workflows for serious exam preparation.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="rounded-md bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">Create free account</Link><Link href="/exams" className="rounded-md border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10">Browse exams</Link></div>
          </div>
          <div className="space-y-4">
            <LanguageSwitcher />
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3 text-cyan-100"><Languages className="h-5 w-5" /><span className="font-semibold">Multilingual-ready content</span></div>
              <p className="mt-3 text-sm leading-6 text-slate-300">The language dictionary structure supports English, Assamese, Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and Urdu.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-semibold">Working student features</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => { const Icon = feature.icon; return <Link key={feature.href} href={feature.href} className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40 hover:bg-white/10"><Icon className="h-7 w-7 text-cyan-200" /><h3 className="mt-5 text-xl font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{feature.copy}</p></Link>; })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-semibold">Exam coverage</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{exams.map((exam) => <Link key={exam.slug} href={`/exams/${exam.slug}`} className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm font-semibold text-slate-100 hover:border-emerald-300/40">{exam.name}</Link>)}</div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-semibold">Subject sections</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{subjectSections.map((section) => <Link key={section.slug} href={`/subjects/${section.slug}`} className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-emerald-300/40"><h3 className="text-xl font-semibold">{section.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{section.description}</p></Link>)}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
