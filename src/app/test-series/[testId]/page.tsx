import Link from "next/link";

import { MockTestForm } from "@/components/mock-test-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ testId: string }>; searchParams: Promise<{ error?: string }> };
type Option = { label: string; text: string };

export default async function TestAttemptPage({ params, searchParams }: PageProps) {
  await requireProfile();
  const { testId } = await params;
  const query = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: test, error } = await supabase
    .from("mock_tests")
    .select("id, title, description, duration_minutes, mock_test_questions(position, questions(id, question_text, options, difficulty))")
    .eq("id", testId)
    .eq("status", "published")
    .single();

  if (error || !test) throw new Error(error?.message || "Test not found");

  const rows = [...(test.mock_test_questions || [])].sort((a, b) => a.position - b.position);
  const questions = rows.flatMap((row) => {
    const question = Array.isArray(row.questions) ? row.questions[0] : row.questions;
    if (!question) return [];
    return [{ id: question.id, question_text: question.question_text, difficulty: question.difficulty, options: (question.options || []) as Option[] }];
  });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <Link href="/test-series" className="text-sm text-cyan-200">Back to tests</Link>
        <div className="mt-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">Free access</div>
        <h1 className="mt-4 text-5xl font-semibold">{test.title}</h1>
        <p className="mt-4 text-slate-300">{test.description}</p>
        <p className="mt-2 text-sm text-slate-400">Duration: {test.duration_minutes} minutes</p>
        {query.error ? <div className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{query.error}</div> : null}
        {questions.length > 0 ? <MockTestForm testId={test.id} durationMinutes={test.duration_minutes} questions={questions} /> : <p className="mt-10 text-slate-400">This test has no published questions yet.</p>}
      </main>
      <SiteFooter />
    </>
  );
}
