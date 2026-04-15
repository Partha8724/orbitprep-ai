import { NextResponse } from "next/server";

import { generateEducationContent } from "@/lib/ai";
import { requireProfile } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireProfile();
    const body = (await request.json()) as { topic?: string };
    if (!body.topic) return NextResponse.json({ error: "topic is required" }, { status: 400 });
    const output = await generateEducationContent({
      kind: "current_affairs",
      prompt: `Create a concise current affairs summary with exam relevance, key facts to verify, and 5 MCQs for: ${body.topic}`,
    });
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "AI summary failed" }, { status: 500 });
  }
}
