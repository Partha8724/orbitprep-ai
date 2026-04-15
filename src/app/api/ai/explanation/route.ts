import { NextResponse } from "next/server";

import { generateEducationContent } from "@/lib/ai";
import { requireProfile } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireProfile();
    const body = (await request.json()) as { question?: string; answer?: string };
    if (!body.question) return NextResponse.json({ error: "question is required" }, { status: 400 });
    const output = await generateEducationContent({
      kind: "revision_notes",
      prompt: `Explain this answer for a government exam student.\nQuestion: ${body.question}\nAnswer: ${body.answer || "Not provided"}`,
    });
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "AI explanation failed" }, { status: 500 });
  }
}
