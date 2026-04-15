import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ attemptId: string }> };

export default async function TestResultPage({ params }: PageProps) {
  const profile = await requireProfile();
  const { attemptId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: attempt, error } = await supabase
    .from("test_attempts")
    .select("id, total_questions, correct_answers, score_percent, topic_breakdown, created_at, mock_tests(title)")
    .eq("id", attemptId)
    .eq("user_id", profile.id)
    .single();

  if (error || !attempt) throw new Error(error?.message || "Attempt not found");
  const result = attempt as any;
  const testTitle = (Array.isArray(result.mock_tests) ? result.mock_tests[0]?.title : result.mock_tests?.title) || "Mock test";

  const weakTopics = Object.entries((attempt.topic_breakdown || {}) as Record<string, { total: number; correct: number }>)
    .map(([topicId, stats]) => ({
      topicId,
      total: stats.total,
      correct: stats.correct,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <Link href="/test-series" className="text-sm text-cyan-200">Back to tests</Link>
        <h1 className="mt-5 text-5xl font-semibold">Result</h1>
        <p className="mt-3 text-slate-300">{testTitle}</p>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Score</div><div className="mt-2 text-4xl font-semibold">{attempt.score_percent}%</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Correct</div><div className="mt-2 text-4xl font-semibold">{attempt.correct_answers}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Questions</div><div className="mt-2 text-4xl font-semibold">{attempt.total_questions}</div></div>
        </section>
        <section className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Weak topic detection</h2>
          <div className="mt-5 space-y-3">
            {weakTopics.map((topic) => (
              <div key={topic.topicId} className="rounded-md border border-white/10 bg-slate-950/60 p-4">
                <div className="font-semibold">{topic.topicId === "unmapped" ? "Unmapped topic" : topic.topicId}</div>
                <div className="mt-1 text-sm text-slate-400">{topic.correct}/{topic.total} correct - {topic.accuracy}% accuracy</div>
              </div>
            ))}
            {weakTopics.length === 0 ? <p className="text-sm text-slate-400">No topic data was recorded for this attempt.</p> : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

