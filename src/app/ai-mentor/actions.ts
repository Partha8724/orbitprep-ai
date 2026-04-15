"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateEducationContent } from "@/lib/ai";
import { requireProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function askAiMentorAction(formData: FormData) {
  const profile = await requireProfile();
  const value = formData.get("message");
  const message = typeof value === "string" ? value.trim() : "";

  if (!message) redirect("/ai-mentor?error=Message%20is%20required");

  let response = "";
  try {
    response = await generateEducationContent({ kind: "revision_notes", prompt: `Student question:\n${message}` });
  } catch (error) {
    redirect(`/ai-mentor?error=${encodeURIComponent(error instanceof Error ? error.message : "AI generation failed")}`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("ai_chats").insert({ user_id: profile.id, message, response });
  if (error) redirect(`/ai-mentor?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/ai-mentor");
}
