import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Gym tracking system: plans (PPL/Upper-Lower/Full Body/Custom), exercise
// library, rest timer, set/rep/weight tracking, PRs, 1RM, volume, history.
export default function WorkoutsScreen() {
  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-bold my-4">Workouts</Text>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">Active Programme</Text>
        <Text className="text-text text-lg font-semibold">No programme selected</Text>
      </Card>

      <View className="flex-row gap-3 mb-4">
        {["Push/Pull/Legs", "Upper/Lower", "Full Body", "Custom"].map((split) => (
          <Card key={split} className="flex-1 items-center py-3">
            <Text className="text-text text-xs text-center">{split}</Text>
          </Card>
        ))}
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">Exercise Library</Text>
        <Text className="text-text">Browse exercises, instructions, and images.</Text>
      </Card>

      <Card>
        <Text className="text-textMuted text-sm mb-1">Personal Records</Text>
        <Text className="text-text">No PRs logged yet — track your first set to get started.</Text>
      </Card>
    </ScreenContainer>
  );
}
