import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CoachSummaryStore {
  lastSummary: string | null;
  lastGeneratedAt: string | null;
  setSummary: (summary: string) => void;
}

export const useCoachSummaryStore = create<CoachSummaryStore>()(
  persist(
    (set) => ({
      lastSummary: null,
      lastGeneratedAt: null,
      setSummary: (summary) =>
        set({ lastSummary: summary, lastGeneratedAt: new Date().toISOString() }),
    }),
    {
      name: "rm-fitness-coach-summary",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
