import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, MealIngredient, PlannedMeal } from "@/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface MealStore {
  meals: Meal[];
  plannedMeals: PlannedMeal[];

  addMeal: (input: {
    name: string;
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
      meals: [],
      plannedMeals: [],

      addMeal: (input) => {
        const id = generateId();
        const meal: Meal = {
          id,
          userId: "local",
          name: input.name,
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
    }
  )
);
