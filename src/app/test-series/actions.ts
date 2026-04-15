"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" ? item : "";
}

export async function submitMockTestAction(formData: FormData) {
  const profile = await requireProfile();
  const testId = value(formData, "test_id");

  if (!testId) {
    redirect("/test-series?error=Missing%20test%20id");
  }

  const supabase = await createSupabaseServerClient();
  const { data: test, error: testError } = await supabase
    .from("mock_tests")
    .select("id, is_premium")
    .eq("id", testId)
    .eq("status", "published")
    .single();

  if (testError || !test) {
    redirect("/test-series?error=Test%20not%20available");
  }


  const { data: rows, error } = await supabase
    .from("mock_test_questions")
    .select("question_id, questions(id, correct_answer, topic_id)")
    .eq("mock_test_id", testId);

  if (error) {
    redirect(`/test-series/${testId}?error=${encodeURIComponent(error.message)}`);
  }

  const answers = (rows || []).map((row) => {
    const question = Array.isArray(row.questions) ? row.questions[0] : row.questions;
    const selectedAnswer = value(formData, `question_${row.question_id}`);
    const isCorrect = selectedAnswer === question?.correct_answer;

    return {
      questionId: row.question_id as string,
      topicId: (question?.topic_id as string | null) || null,
      selectedAnswer,
      isCorrect,
    };
  });
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const topicBreakdown = answers.reduce<Record<string, { total: number; correct: number }>>((acc, answer) => {
    const key = answer.topicId || "unmapped";
    acc[key] = acc[key] || { total: 0, correct: 0 };
    acc[key].total += 1;
    if (answer.isCorrect) {
      acc[key].correct += 1;
    }
    return acc;
  }, {});

  const { data: attempt, error: attemptError } = await supabase
    .from("test_attempts")
    .insert({
      user_id: profile.id,
      mock_test_id: testId,
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      score_percent: scorePercent,
      topic_breakdown: topicBreakdown,
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    redirect(`/test-series/${testId}?error=${encodeURIComponent(attemptError?.message || "Could not save attempt")}`);
  }

  const answerRows = answers.map((answer) => ({
    attempt_id: attempt.id,
    question_id: answer.questionId,
    selected_answer: answer.selectedAnswer,
    is_correct: answer.isCorrect,
  }));

  if (answerRows.length > 0) {
    const { error: answerError } = await supabase.from("test_answers").insert(answerRows);

    if (answerError) {
      redirect(`/test-series/${testId}?error=${encodeURIComponent(answerError.message)}`);
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/test-series");
  redirect(`/test-series/results/${attempt.id}`);
}
