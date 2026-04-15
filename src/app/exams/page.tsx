import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { exams, subjectSections } from "@/lib/catalog";

export const metadata = { title: "Exams" };

export default function ExamsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">Free exam hubs</div>
            <h1 className="mt-5 text-5xl font-semibold">Exams</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Browse UPSC, APSC, SSC, Railway, Banking, Police, State PSC, Teaching, Defence, and Assam government job preparation with database-backed questions, PDFs, mock tests, and current affairs relevance.</p>
          </section>
          <LanguageSwitcher />
        </div>
        <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <Link key={exam.slug} href={`/exams/${exam.slug}`} className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40 hover:bg-white/10">
              <h2 className="text-2xl font-semibold">{exam.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{exam.overview}</p>
              <div className="mt-5 text-sm text-cyan-200">Open preparation hub</div>
            </Link>
          ))}
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-semibold">Subject sections</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {subjectSections.map((section) => (
              <Link key={section.slug} href={`/subjects/${section.slug}`} className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-emerald-300/40 hover:bg-white/10">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
