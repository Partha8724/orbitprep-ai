import { NextResponse } from "next/server";

import { generateEducationContent } from "@/lib/ai";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const profile = await requireProfile();
    const body = (await request.json()) as { prompt?: string; title?: string };
    if (!body.prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    const output = await generateEducationContent({ kind: "questions", prompt: body.prompt });
    const supabase = await createSupabaseServerClient();
    await supabase.from("ai_generations").insert({
      content_type: "questions",
      title: body.title || "Question generation",
      prompt: body.prompt,
      output,
      status: "pending_review",
      created_by: profile.id,
    });
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "AI generation failed" }, { status: 500 });
  }
}
