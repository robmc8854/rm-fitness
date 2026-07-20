import { Workout, BodyMeasurement } from "@/types";
import { MacroTotals } from "@/lib/nutrition";
import { getExerciseById } from "@/data/exercises";
import { computeWorkoutStreak, computePRs } from "@/lib/training";

export interface MuscleGroupFrequency {
  muscleGroup: string;
  setCount: number;
}

export interface ExerciseFrequency {
  exerciseId: string;
  exerciseName: string;
  setCount: number;
}

export interface WeeklyStats {
  workoutStreak: number;
  caloriesThisWeek: number;
  avgProteinThisWeek: number;
  weightDeltaKg: number | null;
  muscleGroupFrequency: MuscleGroupFrequency[];
  favouriteExercises: ExerciseFrequency[];
  workoutsPerWeekAvg: number;
  totalWorkoutsCompleted: number;
}

function lastNDayKeys(n: number): string[] {
  const keys: string[] = [];
  const cursor = new Date();
  for (let i = 0; i < n; i++) {
    keys.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() - 1);
  }
  return keys;
}

export function computeWeeklyStats(
  workouts: Workout[],
  measurements: BodyMeasurement[],
  getLog: (date: string) => MacroTotals
): WeeklyStats {
  const completed = workouts.filter((w) => w.completedAt);
  const last7Days = lastNDayKeys(7);
  const logs = last7Days.map((d) => getLog(d));

  const caloriesThisWeek = logs.reduce((sum, l) => sum + l.calories, 0);
  const daysWithProteinLogged = logs.filter((l) => l.proteinG > 0).length;
  const avgProteinThisWeek =
    daysWithProteinLogged > 0
      ? Math.round(logs.reduce((sum, l) => sum + l.proteinG, 0) / daysWithProteinLogged)
      : 0;

  const withWeight = measurements.filter((m) => m.weightKg != null).sort((a, b) => (a.date < b.date ? -1 : 1));
  const weightDeltaKg =
    withWeight.length >= 2
      ? Math.round(((withWeight[withWeight.length - 1].weightKg as number) - (withWeight[0].weightKg as number)) * 10) / 10
      : null;

  const muscleGroupCounts = new Map<string, number>();
  const exerciseCounts = new Map<string, number>();
  for (const w of completed) {
    for (const s of w.sets) {
      const exercise = getExerciseById(s.exerciseId);
      if (exercise) {
        muscleGroupCounts.set(exercise.muscleGroup, (muscleGroupCounts.get(exercise.muscleGroup) ?? 0) + 1);
      }
      exerciseCounts.set(s.exerciseId, (exerciseCounts.get(s.exerciseId) ?? 0) + 1);
    }
  }

  const muscleGroupFrequency: MuscleGroupFrequency[] = Array.from(muscleGroupCounts.entries())
    .map(([muscleGroup, setCount]) => ({ muscleGroup, setCount }))
    .sort((a, b) => b.setCount - a.setCount);

  const favouriteExercises: ExerciseFrequency[] = Array.from(exerciseCounts.entries())
    .map(([exerciseId, setCount]) => ({
      exerciseId,
      exerciseName: getExerciseById(exerciseId)?.name ?? exerciseId,
      setCount,
    }))
    .sort((a, b) => b.setCount - a.setCount)
    .slice(0, 5);

  // Average workouts/week across the span of completed workout history.
  let workoutsPerWeekAvg = 0;
  if (completed.length > 0) {
    const dates = completed.map((w) => new Date(w.completedAt as string).getTime());
    const earliest = Math.min(...dates);
    const spanWeeks = Math.max(1, (Date.now() - earliest) / (1000 * 60 * 60 * 24 * 7));
    workoutsPerWeekAvg = Math.round((completed.length / spanWeeks) * 10) / 10;
  }

  return {
    workoutStreak: computeWorkoutStreak(workouts),
    caloriesThisWeek,
    avgProteinThisWeek,
    weightDeltaKg,
    muscleGroupFrequency,
    favouriteExercises,
    workoutsPerWeekAvg,
    totalWorkoutsCompleted: completed.length,
  };
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  achieved: boolean;
}

export function computeAchievements(workouts: Workout[], stats: WeeklyStats): Achievement[] {
  const completed = workouts.filter((w) => w.completedAt);
  const totalPRs = workouts.length > 0 ? Object.keys(computePRs(workouts)).length : 0;

  return [
    {
      id: "first-workout",
      label: "First Workout",
      description: "Complete your first workout",
      achieved: completed.length >= 1,
    },
    {
      id: "ten-workouts",
      label: "Ten Workouts",
      description: "Complete 10 workouts",
      achieved: completed.length >= 10,
    },
    {
      id: "fifty-workouts",
      label: "Fifty Workouts",
      description: "Complete 50 workouts",
      achieved: completed.length >= 50,
    },
    {
      id: "streak-7",
      label: "7-Day Streak",
      description: "Train 7 days in a row",
      achieved: stats.workoutStreak >= 7,
    },
    {
      id: "streak-30",
      label: "30-Day Streak",
      description: "Train 30 days in a row",
      achieved: stats.workoutStreak >= 30,
    },
    {
      id: "first-pr",
      label: "First PR",
      description: "Log your first personal record",
      achieved: totalPRs >= 1,
    },
    {
      id: "consistency-4wk",
      label: "4-Week Consistency",
      description: "Average 3+ workouts/week",
      achieved: stats.workoutsPerWeekAvg >= 3,
    },
  ];
}
