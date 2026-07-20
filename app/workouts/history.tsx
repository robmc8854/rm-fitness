import { Text, View, Pressable, FlatList } from "react-native";
import { Stack, router } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { workoutVolume } from "@/lib/training";

export default function WorkoutHistoryScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const completed = workouts
    .filter((w) => w.completedAt)
    .sort((a, b) => (b.completedAt! > a.completedAt! ? 1 : -1));

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Workout History" }} />
      <ScreenContainer>
        {completed.length === 0 ? (
          <Text className="text-textMuted text-center mt-8">
            No completed workouts yet — finish a workout to see it here.
          </Text>
        ) : (
          completed.map((w) => (
            <Pressable key={w.id} onPress={() => router.push(`/workouts/${w.id}`)}>
              <Card className="mb-3 mt-2">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-text font-semibold">{w.name}</Text>
                  <Text className="text-textMuted text-xs">
                    {new Date(w.completedAt!).toLocaleDateString()}
                  </Text>
                </View>
                <Text className="text-textMuted text-sm">
                  {w.sets.length} sets · {workoutVolume(w)} kg total volume
                </Text>
                {w.notes ? <Text className="text-textMuted text-xs mt-1 italic">{w.notes}</Text> : null}
              </Card>
            </Pressable>
          ))
        )}
      </ScreenContainer>
    </>
  );
}
