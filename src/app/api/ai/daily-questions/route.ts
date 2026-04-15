import { NextResponse } from "next/server";

import { generateEducationContent } from "@/lib/ai";
import { requireProfile } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireProfile();
    const body = (await request.json()) as { exam?: string; subject?: string };
    const output = await generateEducationContent({
      kind: "questions",
      prompt: `Generate 10 daily practice MCQs for ${body.exam || "Indian government exams"} in ${body.subject || "general studies"}. Include options, correct answer, and explanation.`,
    });
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "AI daily questions failed" }, { status: 500 });
  }
}
