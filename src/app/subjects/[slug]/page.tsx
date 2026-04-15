import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSubjectSectionData, subjectSections } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return subjectSections.map((section) => ({ slug: section.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function SubjectSectionPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getSubjectSectionData(slug);
  if (!data.section) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <Link href="/exams" className="text-sm text-cyan-200">Back to exams</Link>
        <h1 className="mt-5 text-5xl font-semibold">{data.section.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{data.section.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{data.section.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{tag}</span>)}</div>
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">Questions</h2><div className="mt-5 space-y-4">{data.questions.map((question: { id: string; question_text: string; difficulty: string; correct_answer: string; explanation: string | null }) => <article key={question.id} className="rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="text-sm text-cyan-200">{question.difficulty}</div><h3 className="mt-2 font-semibold">{question.question_text}</h3><details className="mt-3 text-sm text-slate-300"><summary className="cursor-pointer text-emerald-100">Answer</summary><p className="mt-2">Correct answer: {question.correct_answer}</p><p className="mt-1">{question.explanation}</p></details></article>)}{data.questions.length === 0 ? <p className="text-sm text-slate-400">Approved tagged questions will appear here.</p> : null}</div></div>
          <div className="space-y-6"><div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">PDFs</h2><div className="mt-5 space-y-3">{data.pdfs.map((pdf: { id: string; title: string; file_url: string }) => <a key={pdf.id} href={pdf.file_url} className="block rounded-md border border-white/10 bg-slate-950/60 p-4">{pdf.title}</a>)}{data.pdfs.length === 0 ? <p className="text-sm text-slate-400">Approved PDFs will appear here.</p> : null}</div></div><div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">Tests</h2><div className="mt-5 space-y-3">{data.tests.map((test: { id: string; title: string; duration_minutes: number }) => <Link key={test.id} href={`/test-series/${test.id}`} className="block rounded-md border border-white/10 bg-slate-950/60 p-4">{test.title} - {test.duration_minutes} min</Link>)}{data.tests.length === 0 ? <p className="text-sm text-slate-400">Published tests will appear here.</p> : null}</div></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
