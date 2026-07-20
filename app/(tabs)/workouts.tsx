import { Text, View, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { computePRs } from "@/lib/training";
import { getExerciseById } from "@/data/exercises";

const SPLITS = [
  { key: "push_pull_legs", label: "Push/Pull/Legs" },
  { key: "upper_lower", label: "Upper/Lower" },
  { key: "full_body", label: "Full Body" },
  { key: "custom", label: "Custom" },
] as const;

export default function WorkoutsScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const createWorkout = useWorkoutStore((s) => s.createWorkout);

  const activeWorkout = workouts.find((w) => !w.completedAt);
  const completedWorkouts = workouts.filter((w) => w.completedAt);
  const prs = computePRs(workouts);
  const topPRs = Object.values(prs)
    .sort((a, b) => b.bestEstimated1RM - a.bestEstimated1RM)
    .slice(0, 3);

  function startWorkout(split: (typeof SPLITS)[number]["key"], label: string) {
    const id = createWorkout({ name: label, split });
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
          <Text className="text-text">No workout in progress — pick a split below to begin.</Text>
        </Card>
      )}

      <View className="flex-row flex-wrap gap-3 mb-4">
        {SPLITS.map(({ key, label }) => (
          <Pressable key={key} onPress={() => startWorkout(key, label)} className="flex-1 min-w-[45%]">
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
    </ScreenContainer>
  );
}
