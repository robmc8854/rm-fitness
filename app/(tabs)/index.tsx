import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { WeightChart } from "@/components/WeightChart";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useNutritionLogStore } from "@/hooks/useNutritionLogStore";
import { useProgressStore } from "@/hooks/useProgressStore";
import { computeWorkoutStreak } from "@/lib/training";
import { DEFAULT_TARGETS, todayKey } from "@/lib/nutrition";

export default function DashboardScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const activeWorkout = workouts.find((w) => !w.completedAt);
  const streak = computeWorkoutStreak(workouts);

  const today = todayKey();
  const log = useNutritionLogStore((s) => s.getLog(today));

  const latestWeight = useProgressStore((s) => s.latestWeight());
  const weightHistory = useProgressStore((s) => s.weightHistory(8));

  return (
    <ScreenContainer>
      <View className="mb-6 mt-2">
        <Text className="text-textMuted text-base">Welcome back</Text>
        <Text className="text-text text-3xl font-bold">Rob</Text>
      </View>

      <Link href={activeWorkout ? `/workouts/${activeWorkout.id}` : "/workouts"} asChild>
        <Pressable>
          <Card className="mb-4">
            <Text className="text-textMuted text-sm mb-1">
              {activeWorkout ? "Workout In Progress" : "Today's Workout"}
            </Text>
            <Text className="text-text text-xl font-semibold">
              {activeWorkout ? activeWorkout.name : "No workout started — tap to begin"}
            </Text>
          </Card>
        </Pressable>
      </Link>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Calories</Text>
          <Text className="text-text text-lg font-bold">{log.calories} / {DEFAULT_TARGETS.calories}</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Protein</Text>
          <Text className="text-text text-lg font-bold">{log.proteinG} / {DEFAULT_TARGETS.proteinG}g</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Water</Text>
          <Text className="text-text text-lg font-bold">
            {(log.waterMl / 1000).toFixed(1)} / {(DEFAULT_TARGETS.waterMl / 1000).toFixed(1)}L
          </Text>
        </Card>
      </View>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Body Weight</Text>
          <Text className="text-text text-lg font-bold">
            {latestWeight != null ? `${latestWeight} kg` : "— kg"}
          </Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Streak</Text>
          <Text className="text-primary text-lg font-bold">{streak} day{streak === 1 ? "" : "s"}</Text>
        </Card>
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Weekly Progress</Text>
        <WeightChart data={weightHistory} />
      </Card>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">AI Summary</Text>
        <Text className="text-text">
          Your AI Coach summary will appear here once the coaching module is wired up (Phase 5).
        </Text>
      </Card>

      <Card>
        <Text className="text-textMuted text-sm mb-1">Daily Motivation</Text>
        <Text className="text-text italic">"Consistency beats intensity."</Text>
      </Card>
    </ScreenContainer>
  );
}
