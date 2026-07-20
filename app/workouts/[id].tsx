import { useMemo, useState } from "react";
import { Text, View, Pressable, Modal, FlatList } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { RestTimer } from "@/components/RestTimer";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { EXERCISE_LIBRARY, getExerciseById } from "@/data/exercises";
import { estimateOneRepMax, workoutVolume, computeWorkoutSummary } from "@/lib/training";
import { colors } from "@/theme/tokens";
import { SetType } from "@/types";

const SET_TYPES: { key: SetType; label: string }[] = [
  { key: "warmup", label: "Warm-up" },
  { key: "working", label: "Working" },
  { key: "dropset", label: "Drop Set" },
  { key: "failure", label: "Failure" },
  { key: "restpause", label: "Rest-Pause" },
];

const DEFAULT_REST_SECONDS = 90;

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workouts = useWorkoutStore((s) => s.workouts);
  const addSet = useWorkoutStore((s) => s.addSet);
  const toggleSetComplete = useWorkoutStore((s) => s.toggleSetComplete);
  const removeSet = useWorkoutStore((s) => s.removeSet);
  const completeWorkout = useWorkoutStore((s) => s.completeWorkout);
  const deleteWorkout = useWorkoutStore((s) => s.deleteWorkout);

  const workout = workouts.find((w) => w.id === id);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [reps, setReps] = useState("8");
  const [weight, setWeight] = useState("20");
  const [rpe, setRpe] = useState("");
  const [tempo, setTempo] = useState("");
  const [setType, setSetType] = useState<SetType>("working");
  const [supersetOn, setSupersetOn] = useState(false);
  const [activeSupersetGroupId, setActiveSupersetGroupId] = useState<string | null>(null);

  const [restSeconds, setRestSeconds] = useState<number | null>(null);

  const setsByExercise = useMemo(() => {
    if (!workout) return {};
    return workout.sets.reduce<Record<string, typeof workout.sets>>((acc, s) => {
      acc[s.exerciseId] = acc[s.exerciseId] ?? [];
      acc[s.exerciseId].push(s);
      return acc;
    }, {});
  }, [workout]);

  if (!workout) {
    return (
      <ScreenContainer>
        <Text className="text-text mt-8 text-center">Workout not found.</Text>
      </ScreenContainer>
    );
  }

  const summary = workout.completedAt
    ? computeWorkoutSummary(
        workout,
        workouts.filter((w) => w.id !== workout.id)
      )
    : null;
  const muscleGroupsTrained = summary
    ? Array.from(
        new Set(
          Object.keys(setsByExercise)
            .map((exId) => getExerciseById(exId)?.muscleGroup)
            .filter((g): g is string => Boolean(g))
        )
      )
    : [];

  function handleAddSet() {
    if (!selectedExerciseId || !id) return;
    const repsNum = parseInt(reps, 10) || 0;
    const weightNum = parseFloat(weight) || 0;
    const rpeNum = rpe ? parseFloat(rpe) : null;
    addSet(id, {
      exerciseId: selectedExerciseId,
      reps: repsNum,
      weightKg: weightNum,
      rpe: rpeNum,
      tempo: tempo.trim() || null,
      setType,
      supersetGroupId: supersetOn ? activeSupersetGroupId : null,
    });
    setPickerOpen(false);
    setSelectedExerciseId(null);
    setRestSeconds(DEFAULT_REST_SECONDS);
  }

  function handleComplete() {
    if (!id) return;
    completeWorkout(id);
  }

  function handleDelete() {
    if (!id) return;
    deleteWorkout(id);
    router.back();
  }

  const exerciseIds = Object.keys(setsByExercise);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: workout.name }} />
      <ScreenContainer>
        {summary && (
          <Card className="mb-4 mt-2">
            <Text className="text-primary text-sm font-semibold mb-2">Workout Complete 🎉</Text>
            <View className="flex-row flex-wrap gap-y-2">
              <View className="w-1/2">
                <Text className="text-textMuted text-xs">Duration</Text>
                <Text className="text-text font-bold">
                  {summary.durationMinutes != null ? `${summary.durationMinutes} min` : "—"}
                </Text>
              </View>
              <View className="w-1/2">
                <Text className="text-textMuted text-xs">Calories (est.)</Text>
                <Text className="text-text font-bold">
                  {summary.estimatedCalories != null ? `${summary.estimatedCalories} kcal` : "—"}
                </Text>
              </View>
              <View className="w-1/2">
                <Text className="text-textMuted text-xs">Volume Lifted</Text>
                <Text className="text-text font-bold">{summary.volumeKg} kg</Text>
              </View>
              <View className="w-1/2">
                <Text className="text-textMuted text-xs">Exercises</Text>
                <Text className="text-text font-bold">{summary.exercisesCompleted}</Text>
              </View>
            </View>
            {muscleGroupsTrained.length > 0 && (
              <Text className="text-textMuted text-xs mt-2">
                Muscle groups: {muscleGroupsTrained.join(", ")}
              </Text>
            )}
            {summary.prExerciseIds.length > 0 && (
              <Text className="text-primary text-sm mt-2">
                🏆 New PR: {summary.prExerciseIds.map((id) => getExerciseById(id)?.name ?? id).join(", ")}
              </Text>
            )}
          </Card>
        )}

        <Card className="mb-4">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-textMuted text-xs">Total Volume</Text>
              <Text className="text-text text-lg font-bold">{workoutVolume(workout)} kg</Text>
            </View>
            <View>
              <Text className="text-textMuted text-xs">Sets Logged</Text>
              <Text className="text-text text-lg font-bold">{workout.sets.length}</Text>
            </View>
            <View>
              <Text className="text-textMuted text-xs">Status</Text>
              <Text className="text-text text-lg font-bold">
                {workout.completedAt ? "Complete" : "In progress"}
              </Text>
            </View>
          </View>
        </Card>

        {restSeconds !== null && !workout.completedAt && (
          <RestTimer
            seconds={restSeconds}
            onDone={() => setRestSeconds(null)}
            onAdjust={(delta) => setRestSeconds((s) => Math.max(0, (s ?? 0) + delta))}
            onSkip={() => setRestSeconds(null)}
          />
        )}

        {workout.plannedExercises.length === 0 && exerciseIds.length === 0 && (
          <Text className="text-textMuted text-center mb-4">
            No exercises added yet. Tap "Add Exercise" to log your first set.
          </Text>
        )}

        {workout.plannedExercises
          .filter((pe) => !setsByExercise[pe.exerciseId])
          .map((pe) => {
            const exercise = getExerciseById(pe.exerciseId);
            return (
              <Card key={pe.exerciseId} className="mb-4">
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-text font-semibold mb-1">{exercise?.name ?? pe.exerciseId}</Text>
                    <Text className="text-textMuted text-sm">
                      Target: {pe.targetSets} × {pe.targetReps}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      setSelectedExerciseId(pe.exerciseId);
                      setPickerOpen(true);
                    }}
                  >
                    <Text className="text-primary">+ Log set</Text>
                  </Pressable>
                </View>
              </Card>
            );
          })}

        {exerciseIds.map((exId) => {
          const exercise = getExerciseById(exId);
          const sets = setsByExercise[exId];
          return (
            <Card key={exId} className="mb-4">
              <Text className="text-text font-semibold mb-2">{exercise?.name ?? exId}</Text>
              {sets.map((s, idx) => (
                <View
                  key={s.id}
                  className="flex-row items-center justify-between py-2 border-b border-border"
                >
                  <Text className="text-textMuted w-6">{idx + 1}</Text>
                  <View className="flex-1">
                    <Text className="text-text">
                      {s.weightKg}kg × {s.reps} · e1RM {estimateOneRepMax(s.weightKg, s.reps)}kg
                    </Text>
                    <Text className="text-textMuted text-xs">
                      {s.setType !== "working" ? `${s.setType} · ` : ""}
                      {s.rpe != null ? `RPE ${s.rpe} · ` : ""}
                      {s.tempo ? `Tempo ${s.tempo} · ` : ""}
                      {s.supersetGroupId ? "Superset" : ""}
                    </Text>
                  </View>
                  <Pressable onPress={() => toggleSetComplete(workout.id, s.id)} className="px-3 py-1">
                    <Text style={{ color: s.completedAt ? colors.primary : colors.textMuted }}>
                      {s.completedAt ? "✓ Done" : "Mark done"}
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => removeSet(workout.id, s.id)} className="px-2 py-1">
                    <Text style={{ color: colors.danger }}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </Card>
          );
        })}

        <Button
          label="+ Add Exercise / Set"
          variant="outline"
          onPress={() => setPickerOpen(true)}
        />

        {!workout.completedAt && (
          <View className="mt-4">
            <Button label="Finish Workout" onPress={handleComplete} />
          </View>
        )}

        <View className="mt-3">
          <Button label="Delete Workout" variant="danger" onPress={handleDelete} />
        </View>
      </ScreenContainer>

      <Modal visible={pickerOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 24 }}>
          <Text className="text-text text-xl font-bold mb-4">Add Set</Text>

          {!selectedExerciseId ? (
            <FlatList
              data={EXERCISE_LIBRARY}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedExerciseId(item.id)}>
                  <Card className="mb-2">
                    <Text className="text-text font-medium">{item.name}</Text>
                    <Text className="text-textMuted text-xs">{item.muscleGroup}</Text>
                  </Card>
                </Pressable>
              )}
            />
          ) : (
            <ScreenContainer>
              <Text className="text-textMuted mb-3">
                {getExerciseById(selectedExerciseId)?.name}
              </Text>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <TextField
                    label="Weight (kg)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                  />
                </View>
                <View className="flex-1">
                  <TextField
                    label="Reps"
                    keyboardType="numeric"
                    value={reps}
                    onChangeText={setReps}
                  />
                </View>
              </View>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <TextField
                    label="RPE (optional)"
                    keyboardType="numeric"
                    placeholder="e.g. 8"
                    value={rpe}
                    onChangeText={setRpe}
                  />
                </View>
                <View className="flex-1">
                  <TextField
                    label="Tempo (optional)"
                    placeholder="e.g. 3-1-1-0"
                    value={tempo}
                    onChangeText={setTempo}
                  />
                </View>
              </View>

              <Text className="text-textMuted text-xs mb-2">Set Type</Text>
              <View className="flex-row flex-wrap gap-2 mb-3">
                {SET_TYPES.map((t) => (
                  <Pressable key={t.key} onPress={() => setSetType(t.key)}>
                    <View
                      className="px-3 py-1.5 rounded-full border"
                      style={{
                        borderColor: setType === t.key ? colors.primary : colors.border,
                        backgroundColor: setType === t.key ? colors.primaryMuted : "transparent",
                      }}
                    >
                      <Text className="text-text text-xs">{t.label}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  const turningOn = !supersetOn;
                  setSupersetOn(turningOn);
                  if (turningOn && !activeSupersetGroupId) {
                    setActiveSupersetGroupId(`${Date.now()}`);
                  }
                }}
              >
                <View
                  className="px-3 py-2 rounded-full border mb-4 items-center"
                  style={{
                    borderColor: supersetOn ? colors.primary : colors.border,
                    backgroundColor: supersetOn ? colors.primaryMuted : "transparent",
                  }}
                >
                  <Text className="text-text text-xs">
                    {supersetOn ? "✓ Part of a superset" : "Mark as part of a superset"}
                  </Text>
                </View>
              </Pressable>

              <Button label="Log Set" onPress={handleAddSet} />
              <View className="mt-3">
                <Button
                  label="Change Exercise"
                  variant="outline"
                  onPress={() => setSelectedExerciseId(null)}
                />
              </View>
            </ScreenContainer>
          )}

          <View className="mt-4">
            <Button
              label="Close"
              variant="outline"
              onPress={() => {
                setPickerOpen(false);
                setSelectedExerciseId(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
