import { WorkoutSplit } from "@/types";

export interface TemplateExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: string; // display range, e.g. "8-10"
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  split: WorkoutSplit;
  exercises: TemplateExercise[];
}

// Real, sensible default programming built from the seed exercise library
// (src/data/exercises.ts). These are what actually populate a workout when
// someone picks a split — not just an empty log screen.
export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: "ppl-push",
    name: "Push Day",
    split: "push_pull_legs",
    exercises: [
      { exerciseId: "bench-press", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "incline-db-press", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "overhead-press", targetSets: 3, targetReps: "6-8" },
      { exerciseId: "lateral-raise", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "tricep-pushdown", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "dips", targetSets: 2, targetReps: "8-12" },
    ],
  },
  {
    id: "ppl-pull",
    name: "Pull Day",
    split: "push_pull_legs",
    exercises: [
      { exerciseId: "deadlift", targetSets: 3, targetReps: "5-6" },
      { exerciseId: "pull-up", targetSets: 4, targetReps: "6-10" },
      { exerciseId: "barbell-row", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "lat-pulldown", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "face-pull", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "barbell-curl", targetSets: 3, targetReps: "8-10" },
    ],
  },
  {
    id: "ppl-legs",
    name: "Leg Day",
    split: "push_pull_legs",
    exercises: [
      { exerciseId: "squat", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "romanian-deadlift", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "leg-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "walking-lunge", targetSets: 3, targetReps: "10-12 each leg" },
      { exerciseId: "calf-raise", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "plank", targetSets: 3, targetReps: "45-60s" },
    ],
  },
  {
    id: "ul-upper",
    name: "Upper Body",
    split: "upper_lower",
    exercises: [
      { exerciseId: "bench-press", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "barbell-row", targetSets: 4, targetReps: "8-10" },
      { exerciseId: "overhead-press", targetSets: 3, targetReps: "6-8" },
      { exerciseId: "lat-pulldown", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "lateral-raise", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "barbell-curl", targetSets: 2, targetReps: "8-10" },
      { exerciseId: "tricep-pushdown", targetSets: 2, targetReps: "10-12" },
    ],
  },
  {
    id: "ul-lower",
    name: "Lower Body",
    split: "upper_lower",
    exercises: [
      { exerciseId: "squat", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "romanian-deadlift", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "leg-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "walking-lunge", targetSets: 3, targetReps: "10-12 each leg" },
      { exerciseId: "calf-raise", targetSets: 4, targetReps: "12-15" },
    ],
  },
  {
    id: "fb-a",
    name: "Full Body A",
    split: "full_body",
    exercises: [
      { exerciseId: "squat", targetSets: 3, targetReps: "6-8" },
      { exerciseId: "bench-press", targetSets: 3, targetReps: "6-8" },
      { exerciseId: "barbell-row", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "overhead-press", targetSets: 2, targetReps: "8-10" },
      { exerciseId: "plank", targetSets: 3, targetReps: "45-60s" },
    ],
  },
  {
    id: "fb-b",
    name: "Full Body B",
    split: "full_body",
    exercises: [
      { exerciseId: "deadlift", targetSets: 3, targetReps: "5-6" },
      { exerciseId: "incline-db-press", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "pull-up", targetSets: 3, targetReps: "6-10" },
      { exerciseId: "leg-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "lateral-raise", targetSets: 3, targetReps: "12-15" },
    ],
  },

  // ----- Bro Split (5-day, one muscle group per day) -----
  {
    id: "bro-chest",
    name: "Chest Day",
    split: "bro_split",
    exercises: [
      { exerciseId: "bench-press", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "incline-db-press", targetSets: 4, targetReps: "8-10" },
      { exerciseId: "chest-fly", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "cable-crossover", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "dips", targetSets: 3, targetReps: "8-12" },
    ],
  },
  {
    id: "bro-back",
    name: "Back Day",
    split: "bro_split",
    exercises: [
      { exerciseId: "deadlift", targetSets: 3, targetReps: "5-6" },
      { exerciseId: "pull-up", targetSets: 4, targetReps: "6-10" },
      { exerciseId: "barbell-row", targetSets: 4, targetReps: "8-10" },
      { exerciseId: "t-bar-row", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "face-pull", targetSets: 3, targetReps: "12-15" },
    ],
  },
  {
    id: "bro-shoulders",
    name: "Shoulder Day",
    split: "bro_split",
    exercises: [
      { exerciseId: "overhead-press", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "lateral-raise", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "front-raise", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "face-pull", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "shrug", targetSets: 3, targetReps: "10-12" },
    ],
  },
  {
    id: "bro-arms",
    name: "Arm Day",
    split: "bro_split",
    exercises: [
      { exerciseId: "barbell-curl", targetSets: 4, targetReps: "8-10" },
      { exerciseId: "hammer-curl", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "close-grip-bench", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "tricep-pushdown", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "preacher-curl", targetSets: 3, targetReps: "10-12" },
    ],
  },
  {
    id: "bro-legs",
    name: "Leg Day",
    split: "bro_split",
    exercises: [
      { exerciseId: "squat", targetSets: 4, targetReps: "6-8" },
      { exerciseId: "romanian-deadlift", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "leg-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "leg-extension", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "leg-curl", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "calf-raise", targetSets: 4, targetReps: "12-15" },
    ],
  },

  // ----- Powerbuilding (strength focus + hypertrophy accessories) -----
  {
    id: "powerbuilding-squat",
    name: "Squat Focus",
    split: "powerbuilding",
    exercises: [
      { exerciseId: "squat", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "leg-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "bulgarian-split-squat", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "leg-curl", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "plank", targetSets: 3, targetReps: "45-60s" },
    ],
  },
  {
    id: "powerbuilding-bench",
    name: "Bench Focus",
    split: "powerbuilding",
    exercises: [
      { exerciseId: "bench-press", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "incline-db-press", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "close-grip-bench", targetSets: 3, targetReps: "6-8" },
      { exerciseId: "chest-fly", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "tricep-pushdown", targetSets: 3, targetReps: "10-12" },
    ],
  },
  {
    id: "powerbuilding-deadlift",
    name: "Deadlift Focus",
    split: "powerbuilding",
    exercises: [
      { exerciseId: "deadlift", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "barbell-row", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "pull-up", targetSets: 3, targetReps: "6-10" },
      { exerciseId: "hyperextension", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "hammer-curl", targetSets: 3, targetReps: "10-12" },
    ],
  },

  // ----- Strength (low rep, heavy compound focus) -----
  {
    id: "strength-a",
    name: "Strength A — Squat/Bench",
    split: "strength",
    exercises: [
      { exerciseId: "squat", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "bench-press", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "barbell-row", targetSets: 4, targetReps: "5-6" },
    ],
  },
  {
    id: "strength-b",
    name: "Strength B — Deadlift/Press",
    split: "strength",
    exercises: [
      { exerciseId: "deadlift", targetSets: 4, targetReps: "3-5" },
      { exerciseId: "overhead-press", targetSets: 5, targetReps: "3-5" },
      { exerciseId: "pull-up", targetSets: 4, targetReps: "5-8" },
    ],
  },

  // ----- Hypertrophy (higher volume, moderate reps) -----
  {
    id: "hypertrophy-push",
    name: "Hypertrophy — Push",
    split: "hypertrophy",
    exercises: [
      { exerciseId: "incline-db-press", targetSets: 4, targetReps: "10-12" },
      { exerciseId: "bench-press", targetSets: 3, targetReps: "8-10" },
      { exerciseId: "cable-crossover", targetSets: 3, targetReps: "12-15" },
      { exerciseId: "db-shoulder-press", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "lateral-raise", targetSets: 4, targetReps: "15-20" },
      { exerciseId: "tricep-pushdown", targetSets: 3, targetReps: "12-15" },
    ],
  },
  {
    id: "hypertrophy-pull",
    name: "Hypertrophy — Pull",
    split: "hypertrophy",
    exercises: [
      { exerciseId: "lat-pulldown", targetSets: 4, targetReps: "10-12" },
      { exerciseId: "cable-row", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "t-bar-row", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "face-pull", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "dumbbell-curl", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "hammer-curl", targetSets: 3, targetReps: "12-15" },
    ],
  },
  {
    id: "hypertrophy-legs",
    name: "Hypertrophy — Legs",
    split: "hypertrophy",
    exercises: [
      { exerciseId: "hack-squat", targetSets: 4, targetReps: "10-12" },
      { exerciseId: "romanian-deadlift", targetSets: 3, targetReps: "10-12" },
      { exerciseId: "leg-extension", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "leg-curl", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "walking-lunge", targetSets: 3, targetReps: "12 each leg" },
      { exerciseId: "calf-raise", targetSets: 4, targetReps: "15-20" },
    ],
  },

  // ----- Fat Loss (higher intensity, circuit-style, compound + conditioning) -----
  {
    id: "fatloss-a",
    name: "Fat Loss — Full Body Circuit A",
    split: "fat_loss",
    exercises: [
      { exerciseId: "kettlebell-swing", targetSets: 4, targetReps: "15-20" },
      { exerciseId: "squat", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "barbell-row", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "mountain-climbers", targetSets: 3, targetReps: "30s" },
      { exerciseId: "plank", targetSets: 3, targetReps: "45-60s" },
    ],
  },
  {
    id: "fatloss-b",
    name: "Fat Loss — Full Body Circuit B",
    split: "fat_loss",
    exercises: [
      { exerciseId: "burpee", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "leg-press", targetSets: 4, targetReps: "15-20" },
      { exerciseId: "lat-pulldown", targetSets: 4, targetReps: "12-15" },
      { exerciseId: "box-jump", targetSets: 3, targetReps: "10" },
      { exerciseId: "russian-twist", targetSets: 3, targetReps: "20" },
    ],
  },

  // ----- Bodyweight / Home Workouts (no equipment needed) -----
  {
    id: "bodyweight-full",
    name: "Bodyweight Full Body",
    split: "bodyweight",
    exercises: [
      { exerciseId: "pushup", targetSets: 4, targetReps: "12-20" },
      { exerciseId: "pull-up", targetSets: 4, targetReps: "6-10" },
      { exerciseId: "glute-bridge", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "bulgarian-split-squat", targetSets: 3, targetReps: "10-12 each leg" },
      { exerciseId: "plank", targetSets: 3, targetReps: "45-60s" },
      { exerciseId: "mountain-climbers", targetSets: 3, targetReps: "30s" },
    ],
  },
  {
    id: "bodyweight-conditioning",
    name: "Bodyweight Conditioning",
    split: "bodyweight",
    exercises: [
      { exerciseId: "burpee", targetSets: 4, targetReps: "10-15" },
      { exerciseId: "mountain-climbers", targetSets: 4, targetReps: "30s" },
      { exerciseId: "pushup", targetSets: 3, targetReps: "15-20" },
      { exerciseId: "side-plank", targetSets: 3, targetReps: "30-45s each side" },
      { exerciseId: "russian-twist", targetSets: 3, targetReps: "20" },
    ],
  },
];

export function templatesForSplit(split: WorkoutSplit): WorkoutTemplate[] {
  return WORKOUT_TEMPLATES.filter((t) => t.split === split);
}

export function getTemplateById(id: string): WorkoutTemplate | undefined {
  return WORKOUT_TEMPLATES.find((t) => t.id === id);
}
