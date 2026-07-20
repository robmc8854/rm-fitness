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
];

export function templatesForSplit(split: WorkoutSplit): WorkoutTemplate[] {
  return WORKOUT_TEMPLATES.filter((t) => t.split === split);
}

export function getTemplateById(id: string): WorkoutTemplate | undefined {
  return WORKOUT_TEMPLATES.find((t) => t.id === id);
}
