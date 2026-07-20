import { Text } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Auto-generated shopping lists from selected meals: categories, tick-off,
// quantity tracking, favourite lists, manual additions.
export default function ShoppingListScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Shopping List" }} />
      <ScreenContainer>
        <Card className="mb-4 mt-2">
          <Text className="text-text">
            No shopping list generated yet. Plan meals in Nutrition to auto-populate one.
          </Text>
        </Card>
      </ScreenContainer>
    </>
  );
}
