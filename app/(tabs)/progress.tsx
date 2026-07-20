import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Long-term tracking: bodyweight, measurements, strength/PRs, charts
// (weight/strength/calories/protein/frequency), progress photos.
export default function ProgressScreen() {
  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-bold my-4">Progress</Text>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Weight Trend</Text>
        <View className="h-32 items-center justify-center">
          <Text className="text-textMuted text-xs">Chart placeholder — Victory Charts</Text>
        </View>
      </Card>

      <View className="flex-row flex-wrap gap-3 mb-4">
        {["Chest", "Waist", "Arms", "Legs", "Shoulders"].map((m) => (
          <Card key={m} className="w-[30%] items-center py-3">
            <Text className="text-textMuted text-xs">{m}</Text>
            <Text className="text-text text-sm font-semibold">— cm</Text>
          </Card>
        ))}
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">Strength</Text>
        <Text className="text-text">PRs and estimated 1RM will appear here.</Text>
      </Card>

      <Card>
        <Text className="text-textMuted text-sm mb-2">Progress Photos</Text>
        <View className="flex-row gap-3">
          {["Front", "Side", "Back"].map((angle) => (
            <View key={angle} className="flex-1 aspect-square bg-surfaceAlt rounded-md items-center justify-center">
              <Text className="text-textMuted text-xs">{angle}</Text>
            </View>
          ))}
        </View>
      </Card>
    </ScreenContainer>
  );
}
