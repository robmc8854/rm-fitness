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

// Consecutive-day streak of completed workouts, counting back from today.
// A rest day breaks the chain unless today itself has no workout yet (in
// which case we still count yesterday's chain so the streak doesn't zero
// out the moment the clock ticks past midnight).
export function computeWorkoutStreak(workouts: Workout[]): number {
  const completedDates = new Set(
    workouts.filter((w) => w.completedAt).map((w) => w.completedAt!.slice(0, 10))
  );

  let streak = 0;
  const cursor = new Date();

  // If today has no completed workout yet, start counting from yesterday.
  const todayKey = cursor.toISOString().slice(0, 10);
  if (!completedDates.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (completedDates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
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
