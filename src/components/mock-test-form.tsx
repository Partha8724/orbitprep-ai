"use client";

import { useEffect, useMemo, useState } from "react";

import { submitMockTestAction } from "@/app/test-series/actions";

type Option = { label: string; text: string };
type Question = {
  id: string;
  question_text: string;
  difficulty: string;
  options: Option[];
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function MockTestForm({
  testId,
  durationMinutes,
  questions,
}: {
  testId: string;
  durationMinutes: number;
  questions: Question[];
}) {
  const [secondsLeft, setSecondsLeft] = useState(Math.max(durationMinutes, 1) * 60);
  const [submitted, setSubmitted] = useState(false);
  const progress = useMemo(() => {
    const total = Math.max(durationMinutes, 1) * 60;
    return Math.max(0, Math.min(100, Math.round((secondsLeft / total) * 100)));
  }, [durationMinutes, secondsLeft]);

  useEffect(() => {
    if (submitted) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          const form = document.getElementById("mock-test-form") as HTMLFormElement | null;
          form?.requestSubmit();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [submitted]);

  return (
    <form id="mock-test-form" action={submitMockTestAction} className="mt-10 space-y-6" onSubmit={() => setSubmitted(true)}>
      <input type="hidden" name="test_id" value={testId} />
      <div className="sticky top-20 z-20 rounded-lg border border-white/10 bg-slate-950/95 p-4 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-400">Time left</div>
            <div className="text-2xl font-semibold text-white">{formatTime(secondsLeft)}</div>
          </div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-emerald-300 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <button className="rounded-md bg-white px-5 py-3 font-semibold text-slate-950">Submit</button>
        </div>
      </div>
      {questions.map((question, index) => (
        <section key={question.id} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-cyan-200">
            Question {index + 1} / {questions.length} · {question.difficulty}
          </div>
          <h2 className="mt-3 text-xl font-semibold">{question.question_text}</h2>
          <div className="mt-5 space-y-3">
            {question.options.map((option) => (
              <label key={option.label} className="flex gap-3 rounded-md border border-white/10 bg-slate-950/60 p-4 text-sm">
                <input required type="radio" name={`question_${question.id}`} value={option.label} />
                <span>
                  <strong>{option.label}.</strong> {option.text}
                </span>
              </label>
            ))}
          </div>
        </section>
      ))}
    </form>
  );
}
