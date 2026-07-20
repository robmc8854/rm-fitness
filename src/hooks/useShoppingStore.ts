import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingList, ShoppingListItem, Meal, PlannedMeal } from "@/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface ShoppingStore {
  lists: ShoppingList[];

  generateFromMeals: (input: {
    name: string;
    weekOf: string;
    plannedMeals: PlannedMeal[];
    meals: Meal[];
  }) => string;
  addManualItem: (listId: string, input: { name: string; category: string; quantity: number }) => void;
  toggleItem: (listId: string, itemId: string) => void;
  removeItem: (listId: string, itemId: string) => void;
  toggleFavourite: (listId: string) => void;
  deleteList: (listId: string) => void;
}

export const useShoppingStore = create<ShoppingStore>()(
  persist(
    (set) => ({
      lists: [],

      generateFromMeals: ({ name, weekOf, plannedMeals, meals }) => {
        // Aggregate ingredients across every planned meal in range, merging
        // duplicate items (by name+category) into a single line with a
        // "times needed" count as quantity.
        const listId = generateId();
        const merged = new Map<string, ShoppingListItem>();

        for (const planned of plannedMeals) {
          const meal = meals.find((m) => m.id === planned.mealId);
          if (!meal) continue;
          for (const ing of meal.ingredients) {
            const key = `${ing.name.toLowerCase()}::${ing.category}`;
            const existing = merged.get(key);
            if (existing) {
              existing.quantity += 1;
            } else {
              merged.set(key, {
                id: generateId(),
                listId,
                name: ing.quantity ? `${ing.name} (${ing.quantity})` : ing.name,
                category: ing.category || "Other",
                quantity: 1,
                checked: false,
              });
            }
          }
        }

        const list: ShoppingList = {
          id: listId,
          userId: "local",
          name,
          weekOf,
          items: Array.from(merged.values()),
          isFavourite: false,
        };
        set((state) => ({ lists: [list, ...state.lists] }));
        return listId;
      },

      addManualItem: (listId, input) => {
        const item: ShoppingListItem = {
          id: generateId(),
          listId,
          name: input.name,
          category: input.category || "Other",
          quantity: input.quantity,
          checked: false,
        };
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, items: [...l.items, item] } : l
          ),
        }));
      },

      toggleItem: (listId, itemId) => {
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  items: l.items.map((it) =>
                    it.id === itemId ? { ...it, checked: !it.checked } : it
                  ),
                }
              : l
          ),
        }));
      },

      removeItem: (listId, itemId) => {
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, items: l.items.filter((it) => it.id !== itemId) } : l
          ),
        }));
      },

      toggleFavourite: (listId) => {
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, isFavourite: !l.isFavourite } : l
          ),
        }));
      },

      deleteList: (listId) => {
        set((state) => ({ lists: state.lists.filter((l) => l.id !== listId) }));
      },
    }),
    {
      name: "rm-fitness-shopping",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
