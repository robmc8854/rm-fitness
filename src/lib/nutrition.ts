import { Meal, NutritionLog } from "@/types";

export interface MacroTotals {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fibreG: number;
  waterMl: number;
}

export const EMPTY_TOTALS: MacroTotals = {
  calories: 0,
  proteinG: 0,
  carbsG: 0,
  fatG: 0,
  fibreG: 0,
  waterMl: 0,
};

export function sumMeals(meals: Meal[]): MacroTotals {
  return meals.reduce<MacroTotals>(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      proteinG: acc.proteinG + m.proteinG,
      carbsG: acc.carbsG + m.carbsG,
      fatG: acc.fatG + m.fatG,
      fibreG: acc.fibreG,
      waterMl: acc.waterMl,
    }),
    { ...EMPTY_TOTALS }
  );
}

export function todayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function pctOfTarget(value: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((value / target) * 100));
}

export interface DailyTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fibreG: number;
  waterMl: number;
}

// Sensible defaults until the Profile module (Phase 1 stub) has real targets
// wired through. Kept in one place so both Dashboard and Nutrition stay
// consistent.
export const DEFAULT_TARGETS: DailyTargets = {
  calories: 2400,
  proteinG: 180,
  carbsG: 250,
  fatG: 70,
  fibreG: 30,
  waterMl: 3000,
};
