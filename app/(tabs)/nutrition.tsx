import { Text, View } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Nutrition planner: calories, protein, carbs, fat, fibre, water, meal
// planner, saved meals, favourites, macro breakdown, weekly trends.
export default function NutritionScreen() {
  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-bold my-4">Nutrition</Text>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Calories</Text>
          <Text className="text-text text-lg font-bold">— / 2400</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Protein</Text>
          <Text className="text-text text-lg font-bold">— / 180g</Text>
        </Card>
      </View>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Carbs</Text>
          <Text className="text-text text-lg font-bold">— / 250g</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Fat</Text>
          <Text className="text-text text-lg font-bold">— / 70g</Text>
        </Card>
        <Card className="flex-1">
          <Text className="text-textMuted text-xs">Fibre</Text>
          <Text className="text-text text-lg font-bold">— / 30g</Text>
        </Card>
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-1">Meal Planner</Text>
        <Text className="text-text">No meals planned yet.</Text>
      </Card>

      <Link href="/shopping" asChild>
        <Card className="mb-4">
          <Text className="text-textMuted text-sm mb-1">Shopping List</Text>
          <Text className="text-primary">Generate from this week's meals →</Text>
        </Card>
      </Link>

      <Card>
        <Text className="text-textMuted text-sm mb-1">Weekly Trends</Text>
        <Text className="text-text">Trend charts will appear here (Phase 4).</Text>
      </Card>
    </ScreenContainer>
  );
}
