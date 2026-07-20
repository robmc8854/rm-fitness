import { Workout, WorkoutSet } from "@/types";

// Epley formula: widely used, simple, and accurate enough for the 1-10 rep
// range most training programmes operate in.
export function estimateOneRepMax(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  return Math.round(weightKg * (1 + reps / 30) * 10) / 10;
}

export function bestSetByEstimated1RM(sets: WorkoutSet[]): WorkoutSet | null {
  const completed = sets.filter((s) => s.completedAt);
  if (completed.length === 0) return null;
  return completed.reduce((best, s) =>
    estimateOneRepMax(s.weightKg, s.reps) > estimateOneRepMax(best.weightKg, best.reps) ? s : best
  );
}

export function totalVolume(sets: WorkoutSet[]): number {
  return sets
    .filter((s) => s.completedAt)
    .reduce((sum, s) => sum + s.weightKg * s.reps, 0);
}

export function workoutVolume(workout: Workout): number {
  return totalVolume(workout.sets);
}

// Personal record: highest estimated 1RM ever recorded for a given exercise
// across all workouts, plus the heaviest single set (by weight) for context.
export interface ExercisePR {
  exerciseId: string;
  bestEstimated1RM: number;
  bestSet: WorkoutSet | null;
  achievedInWorkoutId: string | null;
}

export function computePRs(workouts: Workout[]): Record<string, ExercisePR> {
  const prs: Record<string, ExercisePR> = {};

  for (const workout of workouts) {
    for (const set of workout.sets) {
      if (!set.completedAt) continue;
      const est = estimateOneRepMax(set.weightKg, set.reps);
      const existing = prs[set.exerciseId];
      if (!existing || est > existing.bestEstimated1RM) {
        prs[set.exerciseId] = {
          exerciseId: set.exerciseId,
          bestEstimated1RM: est,
          bestSet: set,
          achievedInWorkoutId: workout.id,
        };
      }
    }
  }

  return prs;
}
