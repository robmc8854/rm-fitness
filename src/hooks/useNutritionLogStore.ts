import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMPTY_TOTALS, MacroTotals } from "@/lib/nutrition";

interface NutritionLogStore {
  logsByDate: Record<string, MacroTotals>;
  addToLog: (date: string, delta: Partial<MacroTotals>) => void;
  resetLog: (date: string) => void;
  getLog: (date: string) => MacroTotals;
}

export const useNutritionLogStore = create<NutritionLogStore>()(
  persist(
    (set, get) => ({
      logsByDate: {},

      addToLog: (date, delta) => {
        set((state) => {
          const current = state.logsByDate[date] ?? { ...EMPTY_TOTALS };
          const next: MacroTotals = {
            calories: current.calories + (delta.calories ?? 0),
            proteinG: current.proteinG + (delta.proteinG ?? 0),
            carbsG: current.carbsG + (delta.carbsG ?? 0),
            fatG: current.fatG + (delta.fatG ?? 0),
            fibreG: current.fibreG + (delta.fibreG ?? 0),
            sugarG: current.sugarG + (delta.sugarG ?? 0),
            saltG: current.saltG + (delta.saltG ?? 0),
            waterMl: current.waterMl + (delta.waterMl ?? 0),
          };
          return { logsByDate: { ...state.logsByDate, [date]: next } };
        });
      },

      resetLog: (date) => {
        set((state) => ({ logsByDate: { ...state.logsByDate, [date]: { ...EMPTY_TOTALS } } }));
      },

      getLog: (date) => {
        return get().logsByDate[date] ?? { ...EMPTY_TOTALS };
      },
    }),
    {
      name: "rm-fitness-nutrition-logs",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as NutritionLogStore;
        const logsByDate = state.logsByDate ?? {};
        const patched: Record<string, MacroTotals> = {};
        for (const [date, log] of Object.entries(logsByDate)) {
          patched[date] = { ...EMPTY_TOTALS, ...log };
        }
        return { ...state, logsByDate: patched };
      },
    }
  )
);
