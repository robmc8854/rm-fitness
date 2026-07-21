import { Exercise } from "@/types";

// A real exercise database: primary + secondary muscles, equipment,
// difficulty, common mistakes, and cross-referenced alternatives — matching
// the "Exercise Database" module in the spec (categorised by muscle group
// and equipment type, hundreds of exercises implied; this is a genuinely
// useful subset rather than a token handful).
export const EXERCISE_LIBRARY: Exercise[] = [
  // ===== CHEST =====
  { id: "bench-press", name: "Barbell Bench Press", muscleGroup: "Chest", secondaryMuscles: ["Triceps", "Shoulders"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Lie on a flat bench, lower the bar to your mid-chest with control, press back up to lockout.",
    commonMistakes: ["Flaring elbows to 90°", "Bouncing the bar off the chest"], alternatives: ["incline-db-press", "dips", "chest-fly"], imageUrl: null },
  { id: "incline-db-press", name: "Incline Dumbbell Press", muscleGroup: "Chest", secondaryMuscles: ["Shoulders", "Triceps"], equipment: "dumbbell", difficulty: "intermediate",
    instructions: "On a 30-45° incline bench, press dumbbells up and slightly inward until arms are extended.",
    commonMistakes: ["Setting the incline too steep, shifting focus to shoulders"], alternatives: ["bench-press", "chest-fly"], imageUrl: null },
  { id: "chest-fly", name: "Dumbbell Chest Fly", muscleGroup: "Chest", secondaryMuscles: ["Shoulders"], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Lie flat, arms slightly bent, lower dumbbells out to the sides in an arc, bring back together over the chest.",
    commonMistakes: ["Straightening arms fully, straining the elbow joint"], alternatives: ["cable-crossover", "bench-press"], imageUrl: null },
  { id: "cable-crossover", name: "Cable Crossover", muscleGroup: "Chest", secondaryMuscles: ["Shoulders"], equipment: "cable", difficulty: "intermediate",
    instructions: "Pull both cable handles down and across the body in an arc, squeezing the chest at the bottom.",
    commonMistakes: ["Using momentum instead of a controlled squeeze"], alternatives: ["chest-fly", "dips"], imageUrl: null },
  { id: "dips", name: "Dips", muscleGroup: "Chest", secondaryMuscles: ["Triceps", "Shoulders"], equipment: "bodyweight", difficulty: "intermediate",
    instructions: "Lower until upper arms are roughly parallel to the floor, press back to lockout.",
    commonMistakes: ["Going too deep and straining the shoulder"], alternatives: ["bench-press", "tricep-pushdown"], imageUrl: null },
  { id: "pushup", name: "Push-Up", muscleGroup: "Chest", secondaryMuscles: ["Triceps", "Core"], equipment: "bodyweight", difficulty: "beginner",
    instructions: "Keep a straight line from head to heels, lower chest to just above the floor, press back up.",
    commonMistakes: ["Sagging hips", "Flaring elbows"], alternatives: ["bench-press", "dips"], imageUrl: null },

  // ===== BACK =====
  { id: "deadlift", name: "Barbell Deadlift", muscleGroup: "Back", secondaryMuscles: ["Hamstrings", "Glutes", "Core"], equipment: "barbell", difficulty: "advanced",
    instructions: "Hinge at the hips, keep the bar close to your shins, drive through the floor to stand tall.",
    commonMistakes: ["Rounding the lower back", "Bar drifting away from the shins"], alternatives: ["romanian-deadlift", "barbell-row"], imageUrl: null },
  { id: "pull-up", name: "Pull-Up", muscleGroup: "Back", secondaryMuscles: ["Biceps"], equipment: "bodyweight", difficulty: "intermediate",
    instructions: "From a dead hang, pull your chin over the bar, control the descent.",
    commonMistakes: ["Using momentum/kipping", "Partial range of motion"], alternatives: ["lat-pulldown", "barbell-row"], imageUrl: null },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "Back", secondaryMuscles: ["Biceps", "Rear Delts"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Hinge forward, row the bar to your lower ribs, squeeze the shoulder blades together.",
    commonMistakes: ["Standing too upright, turning it into a shrug"], alternatives: ["cable-row", "pull-up"], imageUrl: null },
  { id: "lat-pulldown", name: "Lat Pulldown", muscleGroup: "Back", secondaryMuscles: ["Biceps"], equipment: "cable", difficulty: "beginner",
    instructions: "Pull the bar down to your upper chest, lead with your elbows.",
    commonMistakes: ["Leaning back excessively", "Using momentum"], alternatives: ["pull-up", "cable-row"], imageUrl: null },
  { id: "cable-row", name: "Seated Cable Row", muscleGroup: "Back", secondaryMuscles: ["Biceps", "Rear Delts"], equipment: "cable", difficulty: "beginner",
    instructions: "Sit tall, pull the handle to your torso keeping elbows close, squeeze the shoulder blades.",
    commonMistakes: ["Rounding the back to add range of motion"], alternatives: ["barbell-row", "lat-pulldown"], imageUrl: null },
  { id: "t-bar-row", name: "T-Bar Row", muscleGroup: "Back", secondaryMuscles: ["Biceps", "Rear Delts"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Hinge over the bar, row the weight to your chest keeping elbows tucked slightly.",
    commonMistakes: ["Jerking the weight with the lower back"], alternatives: ["barbell-row", "cable-row"], imageUrl: null },
  { id: "face-pull", name: "Cable Face Pull", muscleGroup: "Rear Delts", secondaryMuscles: ["Back"], equipment: "cable", difficulty: "beginner",
    instructions: "Pull the rope towards your face, elbows high, focus on external rotation.",
    commonMistakes: ["Pulling too low, turning it into a row"], alternatives: ["lateral-raise"], imageUrl: null },
  { id: "hyperextension", name: "Back Extension", muscleGroup: "Back", secondaryMuscles: ["Glutes", "Hamstrings"], equipment: "machine", difficulty: "beginner",
    instructions: "Hinge at the hips over the pad, lower torso down, extend back to a flat line — don't hyperextend.",
    commonMistakes: ["Hyperextending past neutral at the top"], alternatives: ["romanian-deadlift", "good-morning"], imageUrl: null },

  // ===== SHOULDERS =====
  { id: "overhead-press", name: "Barbell Overhead Press", muscleGroup: "Shoulders", secondaryMuscles: ["Triceps", "Core"], equipment: "barbell", difficulty: "intermediate",
    instructions: "From the rack position, press the bar overhead to lockout, keeping ribs down.",
    commonMistakes: ["Overarching the lower back", "Pressing the bar forward instead of up"], alternatives: ["db-shoulder-press", "lateral-raise"], imageUrl: null },
  { id: "db-shoulder-press", name: "Dumbbell Shoulder Press", muscleGroup: "Shoulders", secondaryMuscles: ["Triceps"], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Press dumbbells from shoulder height straight overhead, without excessive back arch.",
    commonMistakes: ["Flaring elbows too wide"], alternatives: ["overhead-press"], imageUrl: null },
  { id: "lateral-raise", name: "Dumbbell Lateral Raise", muscleGroup: "Shoulders", secondaryMuscles: [], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Raise dumbbells out to the sides to shoulder height, slight bend in the elbows.",
    commonMistakes: ["Using momentum/swinging the weight up"], alternatives: ["cable-lateral-raise"], imageUrl: null },
  { id: "cable-lateral-raise", name: "Cable Lateral Raise", muscleGroup: "Shoulders", secondaryMuscles: [], equipment: "cable", difficulty: "beginner",
    instructions: "With the cable at the lowest setting, raise the handle out to the side under constant tension.",
    commonMistakes: ["Leaning away from the cable to cheat the weight up"], alternatives: ["lateral-raise"], imageUrl: null },
  { id: "front-raise", name: "Dumbbell Front Raise", muscleGroup: "Shoulders", secondaryMuscles: ["Chest"], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Raise dumbbells straight out in front to shoulder height, control the descent.",
    commonMistakes: ["Swinging using the lower back"], alternatives: ["overhead-press"], imageUrl: null },
  { id: "upright-row", name: "Upright Row", muscleGroup: "Shoulders", secondaryMuscles: ["Back"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Pull the bar up close to the body to chin height, elbows leading.",
    commonMistakes: ["Pulling too high, straining the shoulder joint"], alternatives: ["lateral-raise"], imageUrl: null },
  { id: "shrug", name: "Barbell Shrug", muscleGroup: "Shoulders", secondaryMuscles: ["Back"], equipment: "barbell", difficulty: "beginner",
    instructions: "Hold the bar at arm's length, elevate the shoulders straight up, pause, lower with control.",
    commonMistakes: ["Rolling the shoulders instead of a straight up-down path"], alternatives: ["upright-row"], imageUrl: null },

  // ===== ARMS =====
  { id: "barbell-curl", name: "Barbell Curl", muscleGroup: "Biceps", secondaryMuscles: [], equipment: "barbell", difficulty: "beginner",
    instructions: "Curl the bar up without swinging, squeeze at the top, lower under control.",
    commonMistakes: ["Swinging the torso to generate momentum"], alternatives: ["dumbbell-curl", "hammer-curl"], imageUrl: null },
  { id: "dumbbell-curl", name: "Dumbbell Curl", muscleGroup: "Biceps", secondaryMuscles: [], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Curl each dumbbell up, keeping elbows pinned to your sides.",
    commonMistakes: ["Letting elbows drift forward"], alternatives: ["barbell-curl", "hammer-curl"], imageUrl: null },
  { id: "hammer-curl", name: "Hammer Curl", muscleGroup: "Biceps", secondaryMuscles: ["Forearms"], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Curl dumbbells with a neutral (palms-in) grip throughout.",
    commonMistakes: ["Using too much weight and losing the neutral grip"], alternatives: ["dumbbell-curl"], imageUrl: null },
  { id: "preacher-curl", name: "Preacher Curl", muscleGroup: "Biceps", secondaryMuscles: [], equipment: "barbell", difficulty: "intermediate",
    instructions: "Rest arms on the preacher pad, curl the bar up, avoid locking out fully at the bottom.",
    commonMistakes: ["Yanking the weight up off the bottom stretch"], alternatives: ["barbell-curl"], imageUrl: null },
  { id: "tricep-pushdown", name: "Cable Tricep Pushdown", muscleGroup: "Triceps", secondaryMuscles: [], equipment: "cable", difficulty: "beginner",
    instructions: "Keep elbows pinned to your sides, extend the cable attachment down to full lockout.",
    commonMistakes: ["Letting elbows drift away from the body"], alternatives: ["skull-crusher", "dips"], imageUrl: null },
  { id: "skull-crusher", name: "Skull Crusher", muscleGroup: "Triceps", secondaryMuscles: [], equipment: "barbell", difficulty: "intermediate",
    instructions: "Lying flat, lower the bar towards your forehead by bending only at the elbow, extend back up.",
    commonMistakes: ["Letting the elbows flare out"], alternatives: ["tricep-pushdown", "close-grip-bench"], imageUrl: null },
  { id: "close-grip-bench", name: "Close-Grip Bench Press", muscleGroup: "Triceps", secondaryMuscles: ["Chest"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Grip just inside shoulder width, lower to the chest keeping elbows tucked, press up.",
    commonMistakes: ["Gripping too narrow, straining the wrists"], alternatives: ["skull-crusher", "dips"], imageUrl: null },
  { id: "overhead-tricep-extension", name: "Overhead Tricep Extension", muscleGroup: "Triceps", secondaryMuscles: [], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Hold a dumbbell overhead with both hands, lower behind the head, extend back up.",
    commonMistakes: ["Flaring elbows out to the sides"], alternatives: ["tricep-pushdown"], imageUrl: null },

  // ===== LEGS =====
  { id: "squat", name: "Barbell Back Squat", muscleGroup: "Legs", secondaryMuscles: ["Glutes", "Core"], equipment: "barbell", difficulty: "advanced",
    instructions: "Brace your core, squat to depth, drive through the floor to stand.",
    commonMistakes: ["Knees caving inward", "Not reaching depth"], alternatives: ["leg-press", "hack-squat"], imageUrl: null },
  { id: "front-squat", name: "Front Squat", muscleGroup: "Legs", secondaryMuscles: ["Core", "Glutes"], equipment: "barbell", difficulty: "advanced",
    instructions: "Rest the bar on the front delts, elbows high, squat to depth keeping the torso upright.",
    commonMistakes: ["Dropping the elbows, causing the bar to roll forward"], alternatives: ["squat", "leg-press"], imageUrl: null },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "Hamstrings", secondaryMuscles: ["Glutes", "Back"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Hinge at the hips with a soft knee bend, lower the bar along your legs, feel the hamstring stretch.",
    commonMistakes: ["Squatting the movement instead of hinging"], alternatives: ["leg-curl", "good-morning"], imageUrl: null },
  { id: "leg-press", name: "Leg Press", muscleGroup: "Legs", secondaryMuscles: ["Glutes"], equipment: "machine", difficulty: "beginner",
    instructions: "Lower the sled until knees reach ~90°, press back up without locking out hard.",
    commonMistakes: ["Letting the lower back round off the pad"], alternatives: ["squat", "hack-squat"], imageUrl: null },
  { id: "hack-squat", name: "Hack Squat", muscleGroup: "Legs", secondaryMuscles: ["Glutes"], equipment: "machine", difficulty: "intermediate",
    instructions: "Positioned on the machine, squat down under control and drive back up through the heels.",
    commonMistakes: ["Letting knees track past the toes excessively under heavy load"], alternatives: ["squat", "leg-press"], imageUrl: null },
  { id: "walking-lunge", name: "Walking Lunge", muscleGroup: "Legs", secondaryMuscles: ["Glutes"], equipment: "dumbbell", difficulty: "intermediate",
    instructions: "Step forward into a lunge, front knee tracking over toes, alternate legs.",
    commonMistakes: ["Taking too short a step, limiting range"], alternatives: ["bulgarian-split-squat"], imageUrl: null },
  { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", muscleGroup: "Legs", secondaryMuscles: ["Glutes"], equipment: "dumbbell", difficulty: "intermediate",
    instructions: "Rear foot elevated on a bench, lower the front leg to a deep lunge, drive back up.",
    commonMistakes: ["Placing the front foot too close, limiting depth"], alternatives: ["walking-lunge", "leg-press"], imageUrl: null },
  { id: "leg-extension", name: "Leg Extension", muscleGroup: "Quads", secondaryMuscles: [], equipment: "machine", difficulty: "beginner",
    instructions: "Extend the legs to full lockout against the pad, control the descent.",
    commonMistakes: ["Using momentum by swinging the weight up"], alternatives: ["squat", "leg-press"], imageUrl: null },
  { id: "leg-curl", name: "Lying Leg Curl", muscleGroup: "Hamstrings", secondaryMuscles: [], equipment: "machine", difficulty: "beginner",
    instructions: "Curl the pad towards your glutes, control the return to full extension.",
    commonMistakes: ["Lifting the hips off the pad to cheat the weight up"], alternatives: ["romanian-deadlift"], imageUrl: null },
  { id: "hip-thrust", name: "Barbell Hip Thrust", muscleGroup: "Glutes", secondaryMuscles: ["Hamstrings"], equipment: "barbell", difficulty: "intermediate",
    instructions: "Upper back on a bench, drive the hips up until the body forms a straight line, squeeze glutes at the top.",
    commonMistakes: ["Overextending the lower back at the top"], alternatives: ["glute-bridge", "romanian-deadlift"], imageUrl: null },
  { id: "glute-bridge", name: "Glute Bridge", muscleGroup: "Glutes", secondaryMuscles: ["Hamstrings"], equipment: "bodyweight", difficulty: "beginner",
    instructions: "Lying on your back, drive hips up squeezing the glutes, lower with control.",
    commonMistakes: ["Not achieving full hip extension at the top"], alternatives: ["hip-thrust"], imageUrl: null },
  { id: "calf-raise", name: "Standing Calf Raise", muscleGroup: "Calves", secondaryMuscles: [], equipment: "machine", difficulty: "beginner",
    instructions: "Rise onto your toes, pause at the top, lower under control past parallel.",
    commonMistakes: ["Using a short, bouncy range of motion"], alternatives: ["seated-calf-raise"], imageUrl: null },
  { id: "seated-calf-raise", name: "Seated Calf Raise", muscleGroup: "Calves", secondaryMuscles: [], equipment: "machine", difficulty: "beginner",
    instructions: "Seated with knees bent, press through the balls of the feet to raise the weight, lower fully.",
    commonMistakes: ["Cutting the range of motion short"], alternatives: ["calf-raise"], imageUrl: null },
  { id: "good-morning", name: "Good Morning", muscleGroup: "Hamstrings", secondaryMuscles: ["Back", "Glutes"], equipment: "barbell", difficulty: "advanced",
    instructions: "Bar on the upper back, hinge forward at the hips with a soft knee bend, return to standing.",
    commonMistakes: ["Rounding the back instead of hinging"], alternatives: ["romanian-deadlift", "hyperextension"], imageUrl: null },

  // ===== CORE =====
  { id: "plank", name: "Plank", muscleGroup: "Core", secondaryMuscles: ["Shoulders"], equipment: "bodyweight", difficulty: "beginner",
    instructions: "Hold a straight line from head to heels, brace your core, breathe steadily.",
    commonMistakes: ["Letting the hips sag or pike up"], alternatives: ["side-plank"], imageUrl: null },
  { id: "side-plank", name: "Side Plank", muscleGroup: "Core", secondaryMuscles: ["Shoulders"], equipment: "bodyweight", difficulty: "intermediate",
    instructions: "Balance on one forearm, hips lifted in a straight line, hold without sagging.",
    commonMistakes: ["Letting the hips drop toward the floor"], alternatives: ["plank"], imageUrl: null },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", muscleGroup: "Core", secondaryMuscles: ["Forearms"], equipment: "bodyweight", difficulty: "advanced",
    instructions: "Hang from a bar, raise legs to at least hip height using the lower abs, lower with control.",
    commonMistakes: ["Swinging using momentum instead of controlled abs"], alternatives: ["cable-crunch", "plank"], imageUrl: null },
  { id: "cable-crunch", name: "Cable Crunch", muscleGroup: "Core", secondaryMuscles: [], equipment: "cable", difficulty: "beginner",
    instructions: "Kneeling, crunch down bringing elbows towards the knees, using the abs not the arms.",
    commonMistakes: ["Pulling with the arms instead of crunching the torso"], alternatives: ["hanging-leg-raise"], imageUrl: null },
  { id: "russian-twist", name: "Russian Twist", muscleGroup: "Core", secondaryMuscles: [], equipment: "bodyweight", difficulty: "beginner",
    instructions: "Seated, lean back slightly, rotate the torso side to side, optionally holding weight.",
    commonMistakes: ["Moving only the arms instead of rotating the torso"], alternatives: ["plank"], imageUrl: null },

  // ===== CARDIO / CONDITIONING =====
  { id: "kettlebell-swing", name: "Kettlebell Swing", muscleGroup: "Full Body", secondaryMuscles: ["Glutes", "Hamstrings", "Core"], equipment: "kettlebell", difficulty: "intermediate",
    instructions: "Hinge at the hips, snap forward explosively to swing the kettlebell to chest height.",
    commonMistakes: ["Squatting the movement instead of hinging"], alternatives: ["hip-thrust"], imageUrl: null },
  { id: "burpee", name: "Burpee", muscleGroup: "Full Body", secondaryMuscles: ["Core", "Legs", "Chest"], equipment: "bodyweight", difficulty: "intermediate",
    instructions: "Drop to a push-up, jump feet back in, explode up into a jump.",
    commonMistakes: ["Sagging hips during the push-up phase"], alternatives: ["mountain-climbers"], imageUrl: null },
  { id: "mountain-climbers", name: "Mountain Climbers", muscleGroup: "Core", secondaryMuscles: ["Shoulders", "Legs"], equipment: "bodyweight", difficulty: "beginner",
    instructions: "In a plank position, drive knees alternately towards the chest at pace.",
    commonMistakes: ["Letting the hips rise too high, reducing intensity"], alternatives: ["burpee", "plank"], imageUrl: null },
  { id: "box-jump", name: "Box Jump", muscleGroup: "Legs", secondaryMuscles: ["Glutes", "Core"], equipment: "bodyweight", difficulty: "intermediate",
    instructions: "Explosively jump onto the box, landing softly with bent knees, step back down.",
    commonMistakes: ["Landing with locked-out knees"], alternatives: ["squat"], imageUrl: null },
  { id: "farmers-carry", name: "Farmer's Carry", muscleGroup: "Full Body", secondaryMuscles: ["Forearms", "Core", "Shoulders"], equipment: "dumbbell", difficulty: "beginner",
    instructions: "Hold a heavy dumbbell/kettlebell in each hand, walk a set distance keeping the torso upright.",
    commonMistakes: ["Leaning to one side instead of staying upright"], alternatives: ["kettlebell-swing"], imageUrl: null },

  // ===== OLYMPIC / POWER =====
  { id: "power-clean", name: "Power Clean", muscleGroup: "Full Body", secondaryMuscles: ["Legs", "Back", "Shoulders"], equipment: "barbell", difficulty: "advanced",
    instructions: "Explosively extend hips and knees to pull the bar up, then drop under it into a front-rack catch.",
    commonMistakes: ["Pulling early with the arms instead of the legs/hips"], alternatives: ["deadlift"], imageUrl: null },
  { id: "thruster", name: "Thruster", muscleGroup: "Full Body", secondaryMuscles: ["Legs", "Shoulders"], equipment: "barbell", difficulty: "advanced",
    instructions: "Front squat down, then drive up explosively into an overhead press in one fluid motion.",
    commonMistakes: ["Pausing between the squat and the press instead of one motion"], alternatives: ["front-squat", "overhead-press"], imageUrl: null },
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

export function getAlternatives(id: string): Exercise[] {
  const ex = getExerciseById(id);
  if (!ex) return [];
  return ex.alternatives.map((altId) => getExerciseById(altId)).filter((e): e is Exercise => Boolean(e));
}
