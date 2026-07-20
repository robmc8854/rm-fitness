import { Text } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// AI Coach (Phase 5): plateau detection, weight-increase recommendations,
// deload suggestions, nutrition guidance, recovery monitoring, motivation.
export default function CoachScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "AI Coach" }} />
      <ScreenContainer>
        <Card className="mb-4 mt-2">
          <Text className="text-text">
            AI Coach isn't wired up yet — this is a Phase 5 module once workout and
            nutrition history exist to analyse.
          </Text>
        </Card>
      </ScreenContainer>
    </>
  );
}
