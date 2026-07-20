import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BodyMeasurement, ProgressPhoto } from "@/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface ProgressStore {
  measurements: BodyMeasurement[];
  photos: ProgressPhoto[];

  logMeasurement: (input: {
    date: string;
    weightKg?: number | null;
    bodyFatPct?: number | null;
    chestCm?: number | null;
    waistCm?: number | null;
    armsCm?: number | null;
    legsCm?: number | null;
    shouldersCm?: number | null;
  }) => void;
  deleteMeasurement: (id: string) => void;

  addPhoto: (input: { date: string; angle: ProgressPhoto["angle"]; storagePath: string }) => void;
  deletePhoto: (id: string) => void;

  latestWeight: () => number | null;
  latestBodyFatPct: () => number | null;
  weightHistory: (limit?: number) => { date: string; weightKg: number }[];
  bodyFatHistory: (limit?: number) => { date: string; bodyFatPct: number }[];
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      measurements: [],
      photos: [],

      logMeasurement: (input) => {
        const entry: BodyMeasurement = {
          id: generateId(),
          userId: "local",
          date: input.date,
          weightKg: input.weightKg ?? null,
          bodyFatPct: input.bodyFatPct ?? null,
          chestCm: input.chestCm ?? null,
          waistCm: input.waistCm ?? null,
          armsCm: input.armsCm ?? null,
          legsCm: input.legsCm ?? null,
          shouldersCm: input.shouldersCm ?? null,
        };
        set((state) => ({
          // Replace an existing entry for the same date rather than duplicating.
          measurements: [
            entry,
            ...state.measurements.filter((m) => m.date !== input.date),
          ].sort((a, b) => (a.date < b.date ? 1 : -1)),
        }));
      },

      deleteMeasurement: (id) => {
        set((state) => ({ measurements: state.measurements.filter((m) => m.id !== id) }));
      },

      addPhoto: (input) => {
        const photo: ProgressPhoto = {
          id: generateId(),
          userId: "local",
          date: input.date,
          angle: input.angle,
          storagePath: input.storagePath,
        };
        set((state) => ({ photos: [photo, ...state.photos] }));
      },

      deletePhoto: (id) => {
        set((state) => ({ photos: state.photos.filter((p) => p.id !== id) }));
      },

      latestWeight: () => {
        const withWeight = get().measurements.filter((m) => m.weightKg != null);
        return withWeight.length > 0 ? withWeight[0].weightKg : null;
      },

      latestBodyFatPct: () => {
        const withBf = get().measurements.filter((m) => m.bodyFatPct != null);
        return withBf.length > 0 ? withBf[0].bodyFatPct : null;
      },

      weightHistory: (limit = 12) => {
        return get()
          .measurements.filter((m) => m.weightKg != null)
          .slice(0, limit)
          .reverse()
          .map((m) => ({ date: m.date, weightKg: m.weightKg as number }));
      },

      bodyFatHistory: (limit = 12) => {
        return get()
          .measurements.filter((m) => m.bodyFatPct != null)
          .slice(0, limit)
          .reverse()
          .map((m) => ({ date: m.date, bodyFatPct: m.bodyFatPct as number }));
      },
    }),
    {
      name: "rm-fitness-progress",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as ProgressStore;
        return {
          ...state,
          measurements: (state.measurements ?? []).map((m) => ({
            ...m,
            bodyFatPct: m.bodyFatPct ?? null,
          })),
        };
      },
    }
  )
);
