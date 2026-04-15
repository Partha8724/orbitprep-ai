import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Daily Questions" };

type QuestionRow = {
  id: string;
  question_text: string;
  options: Array<{ label: string; text: string }> | null;
  correct_answer: string;
  explanation: string | null;
  difficulty: string;
  source_type: string;
  topics: Array<{ name: string }> | { name: string } | null;
};

function topicName(topics: QuestionRow["topics"]) {
  if (Array.isArray(topics)) return topics[0]?.name || "";
  return topics?.name || "";
}

export default async function DailyQuestionsPage() {
  await requireProfile();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select("id, question_text, options, correct_answer, explanation, difficulty, source_type, topics(name)")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw new Error(error.message);
  const questions = (data || []) as QuestionRow[];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">Free daily practice</div>
        <h1 className="mt-5 text-5xl font-semibold">Daily Questions</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">Practice the newest approved questions from the AI and admin content pipeline.</p>
        <section className="mt-10 space-y-5">
          {questions.map((question, index) => {
            const topic = topicName(question.topics);
            return (
              <article key={question.id} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-cyan-200">Question {index + 1} · {question.difficulty} · {question.source_type}{topic ? ` · ${topic}` : ""}</div>
                <h2 className="mt-3 text-xl font-semibold">{question.question_text}</h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">{(question.options || []).map((option) => <div key={option.label} className="rounded-md border border-white/10 bg-slate-950/60 p-4 text-sm"><strong>{option.label}.</strong> {option.text}</div>)}</div>
                <details className="mt-5 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4"><summary className="cursor-pointer font-semibold text-emerald-100">Show answer and explanation</summary><p className="mt-3 text-sm text-slate-200">Correct answer: {question.correct_answer}</p><p className="mt-2 text-sm leading-6 text-slate-300">{question.explanation || "Explanation is not available yet."}</p></details>
              </article>
            );
          })}
          {questions.length === 0 ? <p className="text-slate-400">No approved questions are available yet.</p> : null}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
