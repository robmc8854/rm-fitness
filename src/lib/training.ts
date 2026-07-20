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

export interface WorkoutSummary {
  durationMinutes: number | null;
  estimatedCalories: number | null;
  volumeKg: number;
  exercisesCompleted: number;
  muscleGroupsTrained: string[];
  prExerciseIds: string[];
}

// Called with the completed workout plus every OTHER workout (so "PR"
// means genuinely the best this exercise has ever seen, not just today).
export function computeWorkoutSummary(workout: Workout, priorWorkouts: Workout[]): WorkoutSummary {
  let durationMinutes: number | null = null;
  if (workout.startedAt && workout.completedAt) {
    const ms = new Date(workout.completedAt).getTime() - new Date(workout.startedAt).getTime();
    durationMinutes = Math.max(1, Math.round(ms / 60000));
  }

  // Rough estimate: ~6 kcal/min for moderate-intensity resistance training.
  const estimatedCalories = durationMinutes != null ? Math.round(durationMinutes * 6) : null;

  const volumeKg = workoutVolume(workout);
  const exerciseIds = Array.from(new Set(workout.sets.map((s) => s.exerciseId)));

  const priorPRs = computePRs(priorWorkouts);
  const prExerciseIds = exerciseIds.filter((exId) => {
    const bestToday = bestSetByEstimated1RM(workout.sets.filter((s) => s.exerciseId === exId));
    if (!bestToday) return false;
    const todayEst = estimateOneRepMax(bestToday.weightKg, bestToday.reps);
    const priorBest = priorPRs[exId]?.bestEstimated1RM ?? 0;
    return todayEst > priorBest;
  });

  return {
    durationMinutes,
    estimatedCalories,
    volumeKg,
    exercisesCompleted: exerciseIds.length,
    muscleGroupsTrained: [], // filled in by caller with exercise lookup (avoids circular import)
    prExerciseIds,
  };
}


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
