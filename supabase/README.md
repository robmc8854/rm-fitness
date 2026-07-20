# Supabase Backend Notes

This app uses Supabase for auth, Postgres data storage, and file storage
(progress photos). No SQL migrations are checked in yet — this file tracks
the schema plan so it can be turned into real migrations in Phase 2+.

## Planned tables

- `profiles` — 1:1 with `auth.users`, holds height/weight/age/activity
  level/goals/targets (see `src/types/index.ts::UserProfile`)
- `exercises` — shared exercise library (name, muscle group, instructions, image)
- `workouts` — user workout instances (name, split, scheduled/completed dates, notes)
- `workout_sets` — sets belonging to a workout (exercise, reps, weight, RPE)
- `nutrition_logs` — daily macro/water totals per user
- `meals` — saved/favourite meals with macro breakdown
- `shopping_lists` / `shopping_list_items` — generated + manual shopping lists
- `body_measurements` — weight + chest/waist/arms/legs/shoulders over time
- `progress_photos` — storage path + angle (front/side/back) + date

## Row Level Security

Every user-owned table should have RLS enabled with a policy restricting
`select`/`insert`/`update`/`delete` to rows where `user_id = auth.uid()`.
`exercises` can be publicly readable (shared library) with writes restricted
to service role only.

## Storage buckets

- `progress-photos` — private bucket, per-user folder, signed URLs only.

## Edge Functions

### `ai-coach`

Proxies AI Coach requests to the Anthropic API. Keeps the API key server-side
— the mobile app never has direct access to it.

Deploy and configure:

```bash
supabase functions deploy ai-coach
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

The client calls this via `supabase.functions.invoke("ai-coach", { body: { context } })`
(see `src/lib/aiCoach.ts`). Requires the user to be authenticated, since
Supabase forwards the Authorization header automatically — once real auth
(Phase 1 stub) is wired up, add a check in the function for a valid session
if you want to restrict access further.

## Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and fill in the project URL + anon key.
3. Once migrations are added under `supabase/migrations/`, run them via the
   Supabase CLI (`supabase db push`) or paste into the SQL editor.
