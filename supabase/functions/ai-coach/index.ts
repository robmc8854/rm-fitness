// Supabase Edge Function: ai-coach
//
// Receives a compact training/nutrition context from the app, calls the
// Anthropic API server-side (so the API key never ships in the mobile
// bundle), and returns a short coaching summary.
//
// Deploy with:
//   supabase functions deploy ai-coach
// Set the secret with:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// Requires the caller to be an authenticated Supabase user (checked via the
// Authorization header Supabase automatically forwards).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const MODEL = "claude-sonnet-4-6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured on the server." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { context } = await req.json();

    const systemPrompt = `You are the AI Coach inside RM Fitness, a fitness tracking app.
You are given a compact JSON summary of the user's recent training, personal
records, bodyweight trend, and nutrition over the last week.

Write a short, encouraging, specific coaching summary (150-220 words) covering:
- A read on recent training: any plateau signs, whether volume/PRs are trending up
- One concrete, actionable recommendation (e.g. a weight increase, a deload,
  a specific lift to prioritise) grounded in the actual numbers given
- A brief nutrition observation if the data supports one (skip if data is too sparse)
- End with one line of genuine, non-generic motivation

Be direct and specific rather than generic. If there isn't enough data yet for
a category (e.g. no PRs, no nutrition logs), say so briefly rather than
inventing detail. Do not use markdown headers — plain prose in short paragraphs.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Here is my recent training/nutrition context as JSON:\n\n${JSON.stringify(context, null, 2)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API error: ${errText}` }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const textBlock = data.content?.find((block: { type: string }) => block.type === "text");
    const summary = textBlock?.text ?? "No summary generated.";

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
