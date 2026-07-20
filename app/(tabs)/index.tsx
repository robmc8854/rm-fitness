import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Dashboard: today's workout, calorie/protein/water targets, current weight,
// streak, weekly progress chart, next workout, AI summary, daily motivation.
// Data below is placeholder pending Supabase wiring (Phase 1 -> Phase 2/3).
export default function DashboardScreen() {
  return (
    <ScreenContainer>
      <View className="mb-6 mt-2">
        <Text className="text-textMuted text-base">Welcome back</Text>
        <Text className="text-text text-3xl font-bold">Rob</Text>
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">Today's Workout</Text>
        <Text className="text-text text-xl font-semibold">Push Day — Chest / Shoulders / Triceps</Text>
      </Card>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Calories</Text>
          <Text className="text-text text-lg font-bold">— / 2400</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Protein</Text>
          <Text className="text-text text-lg font-bold">— / 180g</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Water</Text>
          <Text className="text-text text-lg font-bold">— / 3L</Text>
        </Card>
      </View>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Body Weight</Text>
          <Text className="text-text text-lg font-bold">— kg</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Streak</Text>
          <Text className="text-primary text-lg font-bold">0 days</Text>
        </Card>
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Weekly Progress</Text>
        <View className="h-32 items-center justify-center">
          <Text className="text-textMuted text-xs">Chart placeholder — Victory Charts (Phase 4)</Text>
        </View>
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
