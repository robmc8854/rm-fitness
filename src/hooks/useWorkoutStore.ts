import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout, WorkoutSet, WorkoutSplit, PlannedExercise, SetType } from "@/types";

// Local-first workout store. This is intentionally the source of truth
// on-device; Phase-later work can add a Supabase sync layer that reads from
// and writes through this same store (optimistic local writes + background
// sync) without changing any screen code.

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface WorkoutStore {
  workouts: Workout[];

  createWorkout: (input: {
    name: string;
    split: WorkoutSplit;
    scheduledFor?: string | null;
    plannedExercises?: PlannedExercise[];
  }) => string;
  deleteWorkout: (workoutId: string) => void;
  updateWorkoutNotes: (workoutId: string, notes: string) => void;
  completeWorkout: (workoutId: string) => void;

  addSet: (
    workoutId: string,
    input: {
      exerciseId: string;
      reps: number;
      weightKg: number;
      rpe?: number | null;
      tempo?: string | null;
      setType?: SetType;
      supersetGroupId?: string | null;
    }
  ) => void;
  updateSet: (workoutId: string, setId: string, patch: Partial<Omit<WorkoutSet, "id">>) => void;
  toggleSetComplete: (workoutId: string, setId: string) => void;
  removeSet: (workoutId: string, setId: string) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      workouts: [],

      createWorkout: ({ name, split, scheduledFor = null, plannedExercises = [] }) => {
        const id = generateId();
        const workout: Workout = {
          id,
          userId: "local",
          name,
          split,
          scheduledFor,
          startedAt: new Date().toISOString(),
          completedAt: null,
          sets: [],
          notes: null,
          plannedExercises,
        };
        set((state) => ({ workouts: [workout, ...state.workouts] }));
        return id;
      },

      deleteWorkout: (workoutId) => {
        set((state) => ({ workouts: state.workouts.filter((w) => w.id !== workoutId) }));
      },

      updateWorkoutNotes: (workoutId, notes) => {
        set((state) => ({
          workouts: state.workouts.map((w) => (w.id === workoutId ? { ...w, notes } : w)),
        }));
      },

      completeWorkout: (workoutId) => {
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId ? { ...w, completedAt: new Date().toISOString() } : w
          ),
        }));
      },

      addSet: (workoutId, input) => {
        const newSet: WorkoutSet = {
          id: generateId(),
          exerciseId: input.exerciseId,
          reps: input.reps,
          weightKg: input.weightKg,
          rpe: input.rpe ?? null,
          tempo: input.tempo ?? null,
          setType: input.setType ?? "working",
          supersetGroupId: input.supersetGroupId ?? null,
          completedAt: null,
        };
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId ? { ...w, sets: [...w.sets, newSet] } : w
          ),
        }));
      },

      updateSet: (workoutId, setId, patch) => {
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId
              ? { ...w, sets: w.sets.map((s) => (s.id === setId ? { ...s, ...patch } : s)) }
              : w
          ),
        }));
      },

      toggleSetComplete: (workoutId, setId) => {
        const workout = get().workouts.find((w) => w.id === workoutId);
        const currentSet = workout?.sets.find((s) => s.id === setId);
        const nowComplete = !currentSet?.completedAt;
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId
              ? {
                  ...w,
                  sets: w.sets.map((s) =>
                    s.id === setId
                      ? { ...s, completedAt: nowComplete ? new Date().toISOString() : null }
                      : s
                  ),
                }
              : w
          ),
        }));
      },

      removeSet: (workoutId, setId) => {
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId ? { ...w, sets: w.sets.filter((s) => s.id !== setId) } : w
          ),
        }));
      },
    }),
    {
      name: "rm-fitness-workouts",
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as WorkoutStore;
        return {
          ...state,
          workouts: (state.workouts ?? []).map((w) => ({
            ...w,
            plannedExercises: w.plannedExercises ?? [],
            startedAt: w.startedAt ?? w.completedAt ?? null,
            sets: w.sets.map((s) => ({
              ...s,
              tempo: s.tempo ?? null,
              setType: s.setType ?? "working",
              supersetGroupId: s.supersetGroupId ?? null,
            })),
          })),
        };
      },
    }
  )
);
