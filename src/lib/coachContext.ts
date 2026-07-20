import { Workout } from "@/types";
import { computePRs, workoutVolume } from "@/lib/training";
import { MacroTotals } from "@/lib/nutrition";

export interface CoachContext {
  recentWorkouts: {
    name: string;
    date: string | null;
    volumeKg: number;
    setCount: number;
  }[];
  prs: { exercise: string; estimated1RM: number }[];
  weightTrend: { date: string; weightKg: number }[];
  last7DaysNutrition: MacroTotals[];
  workoutStreak: number;
}

// Reduces the raw local stores down to a small, model-friendly summary —
// keeps the prompt cheap and avoids ever sending full historical logs.
export function buildCoachContext(input: {
  workouts: Workout[];
  weightHistory: { date: string; weightKg: number }[];
  nutritionLast7Days: MacroTotals[];
  streak: number;
  exerciseNameLookup: (id: string) => string;
}): CoachContext {
  const { workouts, weightHistory, nutritionLast7Days, streak, exerciseNameLookup } = input;

  const recentWorkouts = workouts
    .filter((w) => w.completedAt)
    .sort((a, b) => (b.completedAt! > a.completedAt! ? 1 : -1))
    .slice(0, 8)
    .map((w) => ({
      name: w.name,
      date: w.completedAt,
      volumeKg: workoutVolume(w),
      setCount: w.sets.length,
    }));

  const prMap = computePRs(workouts);
  const prs = Object.values(prMap)
    .sort((a, b) => b.bestEstimated1RM - a.bestEstimated1RM)
    .slice(0, 8)
    .map((pr) => ({
      exercise: exerciseNameLookup(pr.exerciseId),
      estimated1RM: pr.bestEstimated1RM,
    }));

  return {
    recentWorkouts,
    prs,
    weightTrend: weightHistory,
    last7DaysNutrition: nutritionLast7Days,
    workoutStreak: streak,
  };
}
