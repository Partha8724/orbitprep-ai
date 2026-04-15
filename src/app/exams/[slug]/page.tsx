import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { exams, getExam, getExamPageData } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return exams.map((exam) => ({ slug: exam.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function ExamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const catalogExam = getExam(slug);
  if (!catalogExam) notFound();
  const data = await getExamPageData(slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <Link href="/exams" className="text-sm text-cyan-200">Back to exams</Link>
        <h1 className="mt-5 text-5xl font-semibold">{catalogExam.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{data.exam?.description || catalogExam.overview}</p>
        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {catalogExam.focus.map((item) => <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-200">{item}</div>)}
        </section>
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">Subjects</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{data.subjects.map((subject: { id: string; name: string }) => <div key={subject.id} className="rounded-md border border-white/10 bg-slate-950/60 p-4">{subject.name}</div>)}{data.subjects.length === 0 ? <p className="text-sm text-slate-400">Subjects appear after admin publishes this exam syllabus.</p> : null}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">Question sets</h2><div className="mt-5 space-y-3">{data.questions.map((question: { id: string; question_text: string; difficulty: string }) => <Link href="/daily-questions" key={question.id} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="text-sm text-cyan-200">{question.difficulty}</div><div className="mt-1 font-medium">{question.question_text}</div></Link>)}{data.questions.length === 0 ? <p className="text-sm text-slate-400">Approved tagged questions will appear here.</p> : null}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">PDFs</h2><div className="mt-5 space-y-3">{data.pdfs.map((pdf: { id: string; title: string; file_url: string; description: string | null }) => <a key={pdf.id} href={pdf.file_url} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-medium">{pdf.title}</div><p className="mt-1 text-sm text-slate-400">{pdf.description}</p></a>)}{data.pdfs.length === 0 ? <p className="text-sm text-slate-400">Approved PDFs will appear here.</p> : null}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><h2 className="text-2xl font-semibold">Mock tests</h2><div className="mt-5 space-y-3">{data.tests.map((test: { id: string; title: string; duration_minutes: number }) => <Link key={test.id} href={`/test-series/${test.id}`} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-medium">{test.title}</div><div className="mt-1 text-sm text-slate-400">{test.duration_minutes} minutes</div></Link>)}{data.tests.length === 0 ? <p className="text-sm text-slate-400">Published tests will appear here.</p> : null}</div></div>
        </section>
        <section className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Current affairs relevance</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">{data.affairs.map((entry: { id: string; title: string; summary: string; published_date: string }) => <article key={entry.id} className="rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="text-sm text-cyan-200">{entry.published_date}</div><h3 className="mt-2 font-semibold">{entry.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{entry.summary}</p></article>)}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
