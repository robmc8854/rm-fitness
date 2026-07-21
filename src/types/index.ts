// Core domain types. These map to the Postgres tables that will live in
// Supabase (see supabase/README.md for schema notes).

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export interface UserProfile {
  id: string;
  email: string;
  heightCm: number | null;
  weightKg: number | null;
  age: number | null;
  activityLevel: ActivityLevel | null;
  fitnessGoals: string[];
  targetWeightKg: number | null;
  dailyCalorieTarget: number | null;
  dailyProteinTargetG: number | null;
  createdAt: string;
}

export type WorkoutSplit =
  | "push_pull_legs"
  | "upper_lower"
  | "full_body"
  | "bro_split"
  | "powerbuilding"
  | "strength"
  | "hypertrophy"
  | "fat_loss"
  | "bodyweight"
  | "custom";

export type Equipment =
  | "barbell" | "dumbbell" | "machine" | "cable" | "bodyweight"
  | "kettlebell" | "resistance_band" | "bench";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  secondaryMuscles: string[];
  equipment: Equipment;
  difficulty: Difficulty;
  instructions: string;
  commonMistakes: string[];
  alternatives: string[]; // exercise ids
  imageUrl: string | null;
}

export type SetType = "warmup" | "working" | "dropset" | "failure" | "restpause";

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weightKg: number;
  rpe: number | null;
  tempo: string | null; // e.g. "3-1-1-0" (eccentric-pause-concentric-pause)
  setType: SetType;
  supersetGroupId: string | null;
  completedAt: string | null;
}

export interface PlannedExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  split: WorkoutSplit;
  scheduledFor: string | null;
  startedAt: string | null;
  completedAt: string | null;
  sets: WorkoutSet[];
  notes: string | null;
  plannedExercises: PlannedExercise[];
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fibreG: number;
  sugarG: number;
  saltG: number;
  waterMl: number;
}

export interface MealIngredient {
  name: string;
  quantity: string; // free text, e.g. "200g" or "2"
  category: string; // e.g. Produce, Protein, Dairy, Pantry, Other
}

export type MealCategory = "breakfast" | "lunch" | "dinner" | "snack";

export interface Meal {
  id: string;
  userId: string;
  name: string;
  category: MealCategory;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  sugarG: number;
  saltG: number;
  isFavourite: boolean;
  ingredients: MealIngredient[];
  recipeInstructions: string | null;
}

export interface PlannedMeal {
  id: string;
  date: string; // YYYY-MM-DD
  mealId: string;
}

export interface ShoppingListItem {
  id: string;
  listId: string;
  name: string;
  category: string;
  quantity: number;
  checked: boolean;
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  weekOf: string;
  items: ShoppingListItem[];
  isFavourite: boolean;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weightKg: number | null;
  bodyFatPct: number | null;
  chestCm: number | null;
  waistCm: number | null;
  armsCm: number | null;
  legsCm: number | null;
  shouldersCm: number | null;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  date: string;
  angle: "front" | "side" | "back";
  storagePath: string;
}
