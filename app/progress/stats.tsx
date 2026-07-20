import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useNutritionLogStore } from "@/hooks/useNutritionLogStore";
import { computeWeeklyStats, computeAchievements } from "@/lib/stats";
import { colors } from "@/theme/tokens";

export default function StatisticsScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const measurements = useProgressStore((s) => s.measurements);
  const getLog = useNutritionLogStore((s) => s.getLog);

  const stats = computeWeeklyStats(workouts, measurements, getLog);
  const achievements = computeAchievements(workouts, stats);
  const unlockedCount = achievements.filter((a) => a.achieved).length;

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Statistics" }} />
      <ScreenContainer>
        <View className="flex-row gap-3 mt-2 mb-4">
          <Card className="flex-1 items-center py-4">
            <Text className="text-primary text-2xl font-bold">{stats.workoutStreak}</Text>
            <Text className="text-textMuted text-xs mt-1">Day Streak</Text>
          </Card>
          <Card className="flex-1 items-center py-4">
            <Text className="text-primary text-2xl font-bold">{stats.totalWorkoutsCompleted}</Text>
            <Text className="text-textMuted text-xs mt-1">Total Workouts</Text>
          </Card>
          <Card className="flex-1 items-center py-4">
            <Text className="text-primary text-2xl font-bold">{stats.workoutsPerWeekAvg}</Text>
            <Text className="text-textMuted text-xs mt-1">Per Week Avg</Text>
          </Card>
        </View>

        <Card className="mb-4">
          <Text className="text-textMuted text-sm mb-3">This Week</Text>
          <View className="flex-row justify-between py-1.5">
            <Text className="text-text">Calories logged</Text>
            <Text className="text-text font-semibold">{stats.caloriesThisWeek} kcal</Text>
          </View>
          <View className="flex-row justify-between py-1.5">
            <Text className="text-text">Avg protein / day</Text>
            <Text className="text-text font-semibold">{stats.avgProteinThisWeek}g</Text>
          </View>
          <View className="flex-row justify-between py-1.5">
            <Text className="text-text">Bodyweight trend</Text>
            <Text
              className="font-semibold"
              style={{
                color:
                  stats.weightDeltaKg == null
                    ? colors.textMuted
                    : stats.weightDeltaKg <= 0
                    ? colors.primary
                    : colors.text,
              }}
            >
              {stats.weightDeltaKg == null
                ? "Not enough data"
                : `${stats.weightDeltaKg > 0 ? "+" : ""}${stats.weightDeltaKg} kg`}
            </Text>
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="text-textMuted text-sm mb-3">Muscle Groups Trained</Text>
          {stats.muscleGroupFrequency.length === 0 ? (
            <Text className="text-text">No sets logged yet.</Text>
          ) : (
            stats.muscleGroupFrequency.map((mg) => (
              <View key={mg.muscleGroup} className="flex-row justify-between py-1">
                <Text className="text-text">{mg.muscleGroup}</Text>
                <Text className="text-textMuted">{mg.setCount} sets</Text>
              </View>
            ))
          )}
        </Card>

        <Card className="mb-4">
          <Text className="text-textMuted text-sm mb-3">Favourite Exercises</Text>
          {stats.favouriteExercises.length === 0 ? (
            <Text className="text-text">No sets logged yet.</Text>
          ) : (
            stats.favouriteExercises.map((ex, idx) => (
              <View key={ex.exerciseId} className="flex-row justify-between py-1">
                <Text className="text-text">
                  {idx + 1}. {ex.exerciseName}
                </Text>
                <Text className="text-textMuted">{ex.setCount} sets</Text>
              </View>
            ))
          )}
        </Card>

        <Card>
          <Text className="text-textMuted text-sm mb-3">
            Achievements ({unlockedCount}/{achievements.length})
          </Text>
          {achievements.map((a) => (
            <View
              key={a.id}
              className="flex-row items-center justify-between py-2 border-b border-border"
            >
              <View className="flex-1">
                <Text
                  className="font-semibold"
                  style={{ color: a.achieved ? colors.text : colors.textMuted }}
                >
                  {a.achieved ? "🏅" : "🔒"} {a.label}
                </Text>
                <Text className="text-textMuted text-xs">{a.description}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScreenContainer>
    </>
  );
}
