import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, MealIngredient, MealCategory, PlannedMeal } from "@/types";
import { MEAL_LIBRARY } from "@/data/mealLibrary";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_FAVOURITE_IDS = new Set([
  "lib-chicken-rice-bowl",
  "lib-protein-oats",
  "lib-greek-yogurt-bowl",
  "lib-salmon-sweet-potato",
]);

function defaultMeals(): Meal[] {
  return MEAL_LIBRARY.map((m) => ({
    id: m.id,
    userId: "local",
    name: m.name,
    category: m.category,
    calories: m.calories,
    proteinG: m.proteinG,
    carbsG: m.carbsG,
    fatG: m.fatG,
    isFavourite: DEFAULT_FAVOURITE_IDS.has(m.id),
    ingredients: m.ingredients,
  }));
}

interface MealStore {
  meals: Meal[];
  plannedMeals: PlannedMeal[];

  addMeal: (input: {
    name: string;
    category: MealCategory;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    ingredients?: MealIngredient[];
  }) => string;
  deleteMeal: (mealId: string) => void;
  toggleFavourite: (mealId: string) => void;

  planMeal: (date: string, mealId: string) => void;
  removePlannedMeal: (plannedMealId: string) => void;
  plannedMealsForRange: (startDate: string, endDate: string) => PlannedMeal[];
}

export const useMealStore = create<MealStore>()(
  persist(
    (set, get) => ({
      meals: defaultMeals(),
      plannedMeals: [],

      addMeal: (input) => {
        const id = generateId();
        const meal: Meal = {
          id,
          userId: "local",
          name: input.name,
          category: input.category,
          calories: input.calories,
          proteinG: input.proteinG,
          carbsG: input.carbsG,
          fatG: input.fatG,
          isFavourite: false,
          ingredients: input.ingredients ?? [],
        };
        set((state) => ({ meals: [meal, ...state.meals] }));
        return id;
      },

      deleteMeal: (mealId) => {
        set((state) => ({
          meals: state.meals.filter((m) => m.id !== mealId),
          plannedMeals: state.plannedMeals.filter((p) => p.mealId !== mealId),
        }));
      },

      toggleFavourite: (mealId) => {
        set((state) => ({
          meals: state.meals.map((m) =>
            m.id === mealId ? { ...m, isFavourite: !m.isFavourite } : m
          ),
        }));
      },

      planMeal: (date, mealId) => {
        const planned: PlannedMeal = { id: generateId(), date, mealId };
        set((state) => ({ plannedMeals: [...state.plannedMeals, planned] }));
      },

      removePlannedMeal: (plannedMealId) => {
        set((state) => ({
          plannedMeals: state.plannedMeals.filter((p) => p.id !== plannedMealId),
        }));
      },

      plannedMealsForRange: (startDate, endDate) => {
        return get().plannedMeals.filter((p) => p.date >= startDate && p.date <= endDate);
      },
    }),
    {
      name: "rm-fitness-meals",
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as MealStore;
        const existingMeals = state.meals ?? [];

        if (existingMeals.length === 0) {
          return { ...state, meals: defaultMeals() };
        }

        // Backfill category on meals saved before it existed (matching
        // against the library by id where possible), and merge in any
        // library meals this install doesn't have yet (new content added
        // since they first launched) without touching their own custom meals.
        const libraryById = new Map(MEAL_LIBRARY.map((m) => [m.id, m]));
        const existingIds = new Set(existingMeals.map((m) => m.id));

        const patched = existingMeals.map((m) => {
          if (m.category) return m;
          const libMatch = libraryById.get(m.id);
          return { ...m, category: libMatch?.category ?? ("lunch" as const) };
        });

        const newLibraryMeals = defaultMeals().filter((m) => !existingIds.has(m.id));

        return { ...state, meals: [...patched, ...newLibraryMeals] };
      },
    }
  )
);
