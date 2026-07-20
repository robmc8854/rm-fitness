import { useMemo, useState } from "react";
import { Text, View, Pressable, Modal, FlatList } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { EXERCISE_LIBRARY, getExerciseById } from "@/data/exercises";
import { estimateOneRepMax, workoutVolume } from "@/lib/training";
import { colors } from "@/theme/tokens";

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

  function handleAddSet() {
    if (!selectedExerciseId || !id) return;
    const repsNum = parseInt(reps, 10) || 0;
    const weightNum = parseFloat(weight) || 0;
    addSet(id, { exerciseId: selectedExerciseId, reps: repsNum, weightKg: weightNum });
  }

  function handleComplete() {
    if (!id) return;
    completeWorkout(id);
    router.back();
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
        <Card className="mb-4 mt-2">
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
                  <Text className="text-text flex-1">
                    {s.weightKg}kg × {s.reps} · e1RM {estimateOneRepMax(s.weightKg, s.reps)}kg
                  </Text>
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
            <View>
              <Text className="text-textMuted mb-3">
                {getExerciseById(selectedExerciseId)?.name}
              </Text>
              <TextField
                label="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <TextField
                label="Reps"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
              />
              <Button
                label="Log Set"
                onPress={() => {
                  handleAddSet();
                }}
              />
              <View className="mt-3">
                <Button
                  label="Change Exercise"
                  variant="outline"
                  onPress={() => setSelectedExerciseId(null)}
                />
              </View>
            </View>
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
