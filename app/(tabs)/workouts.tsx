import { useState } from "react";
import { Text, View, Pressable, Modal } from "react-native";
import { Link, router } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { computePRs } from "@/lib/training";
import { getExerciseById } from "@/data/exercises";
import { templatesForSplit, WorkoutTemplate } from "@/data/workoutTemplates";
import { WorkoutSplit } from "@/types";
import { colors } from "@/theme/tokens";

const SPLITS: { key: WorkoutSplit; label: string }[] = [
  { key: "push_pull_legs", label: "Push/Pull/Legs" },
  { key: "upper_lower", label: "Upper/Lower" },
  { key: "full_body", label: "Full Body" },
  { key: "custom", label: "Custom" },
];

export default function WorkoutsScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const createWorkout = useWorkoutStore((s) => s.createWorkout);

  const [templatePickerSplit, setTemplatePickerSplit] = useState<WorkoutSplit | null>(null);

  const activeWorkout = workouts.find((w) => !w.completedAt);
  const completedWorkouts = workouts.filter((w) => w.completedAt);
  const prs = computePRs(workouts);
  const topPRs = Object.values(prs)
    .sort((a, b) => b.bestEstimated1RM - a.bestEstimated1RM)
    .slice(0, 3);

  function handleSplitTap(split: WorkoutSplit) {
    const templates = templatesForSplit(split);
    if (templates.length === 0) {
      // Custom has no pre-built template — starts as a blank log.
      const id = createWorkout({ name: "Custom Workout", split });
      router.push(`/workouts/${id}`);
      return;
    }
    setTemplatePickerSplit(split);
  }

  function startFromTemplate(template: WorkoutTemplate) {
    const id = createWorkout({
      name: template.name,
      split: template.split,
      plannedExercises: template.exercises.map((e) => ({
        exerciseId: e.exerciseId,
        targetSets: e.targetSets,
        targetReps: e.targetReps,
      })),
    });
    setTemplatePickerSplit(null);
    router.push(`/workouts/${id}`);
  }

  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-bold my-4">Workouts</Text>

      {activeWorkout ? (
        <Pressable onPress={() => router.push(`/workouts/${activeWorkout.id}`)}>
          <Card className="mb-4">
            <Text className="text-textMuted text-sm mb-1">In Progress</Text>
            <Text className="text-text text-lg font-semibold">{activeWorkout.name}</Text>
            <Text className="text-primary mt-1">{activeWorkout.sets.length} sets logged →</Text>
          </Card>
        </Pressable>
      ) : (
        <Card className="mb-4">
          <Text className="text-textMuted text-sm mb-1">Start a Workout</Text>
          <Text className="text-text">Pick a split below to see today's plan.</Text>
        </Card>
      )}

      <View className="flex-row flex-wrap gap-3 mb-4">
        {SPLITS.map(({ key, label }) => (
          <Pressable key={key} onPress={() => handleSplitTap(key)} className="flex-1 min-w-[45%]">
            <Card className="items-center py-4">
              <Text className="text-text text-sm text-center font-medium">{label}</Text>
            </Card>
          </Pressable>
        ))}
      </View>

      <Link href="/workouts/exercises" asChild>
        <Pressable>
          <Card className="mb-4">
            <Text className="text-textMuted text-sm mb-1">Exercise Library</Text>
            <Text className="text-primary">Browse exercises, instructions, and images →</Text>
          </Card>
        </Pressable>
      </Link>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Personal Records</Text>
        {topPRs.length === 0 ? (
          <Text className="text-text">No PRs logged yet — track your first set to get started.</Text>
        ) : (
          topPRs.map((pr) => {
            const exercise = getExerciseById(pr.exerciseId);
            return (
              <View key={pr.exerciseId} className="flex-row justify-between py-1.5">
                <Text className="text-text">{exercise?.name ?? pr.exerciseId}</Text>
                <Text className="text-primary font-semibold">{pr.bestEstimated1RM} kg e1RM</Text>
              </View>
            );
          })
        )}
      </Card>

      <Link href="/workouts/history" asChild>
        <Pressable>
          <Card>
            <Text className="text-textMuted text-sm mb-1">History</Text>
            <Text className="text-primary">
              {completedWorkouts.length} completed workout{completedWorkouts.length === 1 ? "" : "s"} →
            </Text>
          </Card>
        </Pressable>
      </Link>

      <Modal
        visible={templatePickerSplit !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setTemplatePickerSplit(null)}
      >
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 24 }}>
          <Text className="text-text text-xl font-bold mb-4">
            {SPLITS.find((s) => s.key === templatePickerSplit)?.label} — choose a day
          </Text>

          {templatePickerSplit &&
            templatesForSplit(templatePickerSplit).map((template) => (
              <Pressable key={template.id} onPress={() => startFromTemplate(template)}>
                <Card className="mb-3">
                  <Text className="text-text font-semibold mb-2">{template.name}</Text>
                  {template.exercises.map((ex) => {
                    const exercise = getExerciseById(ex.exerciseId);
                    return (
                      <Text key={ex.exerciseId} className="text-textMuted text-sm py-0.5">
                        {exercise?.name ?? ex.exerciseId} — {ex.targetSets} × {ex.targetReps}
                      </Text>
                    );
                  })}
                </Card>
              </Pressable>
            ))}

          <Pressable onPress={() => setTemplatePickerSplit(null)} className="mt-2">
            <Text className="text-textMuted text-center">Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
