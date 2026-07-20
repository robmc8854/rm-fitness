import { Exercise } from "@/types";

// Starter exercise library. Real app will let users/admins extend this and
// eventually back it with the Supabase `exercises` table (see
// supabase/README.md). IDs are stable strings so workout history references
// survive future data migrations.
export const EXERCISE_LIBRARY: Exercise[] = [
  // Push
  { id: "bench-press", name: "Barbell Bench Press", muscleGroup: "Chest", instructions: "Lie on a flat bench, lower the bar to your mid-chest with control, press back up to lockout.", imageUrl: null },
  { id: "incline-db-press", name: "Incline Dumbbell Press", muscleGroup: "Chest", instructions: "On a 30-45° incline bench, press dumbbells up and slightly inward until arms are extended.", imageUrl: null },
  { id: "overhead-press", name: "Barbell Overhead Press", muscleGroup: "Shoulders", instructions: "From the rack position, press the bar overhead to lockout, keeping ribs down.", imageUrl: null },
  { id: "lateral-raise", name: "Dumbbell Lateral Raise", muscleGroup: "Shoulders", instructions: "Raise dumbbells out to the sides to shoulder height, slight bend in the elbows.", imageUrl: null },
  { id: "tricep-pushdown", name: "Cable Tricep Pushdown", muscleGroup: "Triceps", instructions: "Keep elbows pinned to your sides, extend the cable attachment down to full lockout.", imageUrl: null },
  { id: "dips", name: "Dips", muscleGroup: "Triceps", instructions: "Lower until upper arms are roughly parallel to the floor, press back to lockout.", imageUrl: null },

  // Pull
  { id: "deadlift", name: "Barbell Deadlift", muscleGroup: "Back", instructions: "Hinge at the hips, keep the bar close to your shins, drive through the floor to stand tall.", imageUrl: null },
  { id: "pull-up", name: "Pull-Up", muscleGroup: "Back", instructions: "From a dead hang, pull your chin over the bar, control the descent.", imageUrl: null },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "Back", instructions: "Hinge forward, row the bar to your lower ribs, squeeze the shoulder blades together.", imageUrl: null },
  { id: "lat-pulldown", name: "Lat Pulldown", muscleGroup: "Back", instructions: "Pull the bar down to your upper chest, lead with your elbows.", imageUrl: null },
  { id: "barbell-curl", name: "Barbell Curl", muscleGroup: "Biceps", instructions: "Curl the bar up without swinging, squeeze at the top, lower under control.", imageUrl: null },
  { id: "face-pull", name: "Cable Face Pull", muscleGroup: "Rear Delts", instructions: "Pull the rope towards your face, elbows high, focus on external rotation.", imageUrl: null },

  // Legs
  { id: "squat", name: "Barbell Back Squat", muscleGroup: "Legs", instructions: "Brace your core, squat to depth, drive through the floor to stand.", imageUrl: null },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "Hamstrings", instructions: "Hinge at the hips with a soft knee bend, lower the bar along your legs, feel the hamstring stretch.", imageUrl: null },
  { id: "leg-press", name: "Leg Press", muscleGroup: "Legs", instructions: "Lower the sled until knees reach ~90°, press back up without locking out hard.", imageUrl: null },
  { id: "walking-lunge", name: "Walking Lunge", muscleGroup: "Legs", instructions: "Step forward into a lunge, front knee tracking over toes, alternate legs.", imageUrl: null },
  { id: "calf-raise", name: "Standing Calf Raise", muscleGroup: "Calves", instructions: "Rise onto your toes, pause at the top, lower under control past parallel.", imageUrl: null },
  { id: "plank", name: "Plank", muscleGroup: "Core", instructions: "Hold a straight line from head to heels, brace your core, breathe steadily.", imageUrl: null },
];

export function getExercisesByMuscleGroup(): Record<string, Exercise[]> {
  return EXERCISE_LIBRARY.reduce<Record<string, Exercise[]>>((acc, ex) => {
    acc[ex.muscleGroup] = acc[ex.muscleGroup] ?? [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {});
}

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISE_LIBRARY.find((e) => e.id === id);
}
