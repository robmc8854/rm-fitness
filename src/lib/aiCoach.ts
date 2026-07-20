import { supabase } from "@/lib/supabase";
import { CoachContext } from "@/lib/coachContext";

export interface CoachResult {
  summary: string;
}

export async function requestCoachSummary(context: CoachContext): Promise<CoachResult> {
  const { data, error } = await supabase.functions.invoke("ai-coach", {
    body: { context },
  });

  if (error) {
    throw new Error(error.message ?? "Failed to reach the AI Coach.");
  }
  if (data?.error) {
    throw new Error(data.error);
  }
  if (!data?.summary) {
    throw new Error("AI Coach returned an empty response.");
  }

  return { summary: data.summary as string };
}
