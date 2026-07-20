# RM Fitness

A premium, AI-assisted fitness app — training programmes, workout tracking,
nutrition planning, shopping lists, progress tracking, and an AI coach — built
as a single modern replacement for a stack of separate fitness apps.

## Tech stack

- **Frontend:** React Native, Expo SDK 51, TypeScript, Expo Router, NativeWind
- **Backend:** Supabase (Postgres, Auth, Storage)
- **State/data:** TanStack Query
- **Charts:** Victory Native
- **Auth:** Email, Apple Sign In (Google Sign In planned)
- **Deployment:** Expo EAS Build → TestFlight → App Store / Google Play

## Project status

This is the **Phase 1** scaffold: project setup, navigation, theme, and a
placeholder screen for every module in the spec. No backend logic is wired
up yet — screens render static/empty states so the whole app is navigable
and visually consistent from day one.

| Phase | Scope | Status |
|---|---|---|
| 1 | Project setup, navigation, auth shell, dashboard, theme | ✅ scaffolded |
| 2 | Workout system (plans, tracking, PRs, history) | ✅ local-first (Supabase sync pending) |
| 3 | Nutrition + shopping | ✅ local-first (Supabase sync pending) |
| 4 | Progress tracking, charts, photos | ✅ local-first (Supabase sync pending) |
| 5 | AI Coach | ⏳ not started |
| 6 | Testing, optimisation, TestFlight, App Store prep | ⏳ not started |

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase project URL + anon key
npm run start
```

Requires the Expo Go app (or a dev build) to run on device/simulator.

## Project structure

```
app/                  Expo Router routes (file-based navigation)
  (tabs)/             Dashboard, Workouts, Nutrition, Progress, Profile
  auth/                Sign in
  shopping/            Shopping list
  coach/               AI Coach
  settings/            Settings
src/
  components/          Shared UI primitives (Card, ScreenContainer, ...)
  lib/                 Supabase client, TanStack Query client
  theme/               Design tokens (colors, spacing, radius)
  types/               Shared domain types
  hooks/               (empty — Phase 2+)
  constants/           (empty — Phase 2+)
supabase/
  README.md            Schema plan + RLS notes for the Supabase backend
```

## Workout system (Phase 2)

Fully functional and local-first — works offline with no backend required,
persisted on-device via AsyncStorage (through a Zustand store), ready to be
layered with Supabase sync later without screen-level changes.

- Start a workout from a split (PPL / Upper-Lower / Full Body / Custom)
- Add exercises from an 18-exercise seed library (`src/data/exercises.ts`),
  searchable by name or muscle group
- Log sets (weight × reps), mark sets complete, remove sets
- Estimated 1RM per set (Epley formula) and total session volume, live
- Personal records computed across all workout history
  (`src/lib/training.ts::computePRs`)
- Workout history list with per-session volume and date

## Nutrition + Shopping (Phase 3)

Also local-first via Zustand + AsyncStorage.

- Daily macro/water logging against default targets, with live progress bars
- Saved meals with full macros + optional ingredient list (for shopping list
  generation), favouriting, and one-tap quick-log
- Simple meal planner: assign saved meals to today (extendable to full week)
- Shopping list auto-generated from the coming week's planned meals —
  ingredients merged and grouped by category (Produce/Protein/Dairy/Pantry/
  Frozen/Other), with tick-off and manual item entry

## Progress Tracking (Phase 4)

Also local-first via Zustand + AsyncStorage.

- Body measurement logging (weight, chest, waist, arms, legs, shoulders),
  one entry per date, replacing same-day entries rather than duplicating
- Weight trend chart (Victory Native) shared between Dashboard and Progress
- Strength section pulls live 1RM PRs from workout history — no duplicate
  data entry between Workouts and Progress
- Progress photos via device camera (front/side/back), stored as local file
  URIs pending Supabase Storage upload wiring
- Dashboard now pulls real data throughout: today's workout, macro/water
  totals, live workout streak, and latest weight — no more placeholders

## Design philosophy

Dark theme first, smooth animations, large touch targets, simple navigation,
fast loading, consistent styling, easy one-handed use, clear data
visualisation. Design tokens live in `src/theme/tokens.ts` and are mirrored
in `tailwind.config.js` for NativeWind classNames.
