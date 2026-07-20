import { Text, View } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";

// Profile: height, weight, age, activity level, goals, target weight,
// daily calorie/protein targets. Settings lives as a separate route.
export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-heading my-4">Profile</Text>

      <Card className="mb-4">
        <View className="flex-row justify-between py-2 border-b border-border">
          <Text className="text-textMuted">Height</Text>
          <Text className="text-text">—</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border">
          <Text className="text-textMuted">Weight</Text>
          <Text className="text-text">—</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border">
          <Text className="text-textMuted">Age</Text>
          <Text className="text-text">—</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border">
          <Text className="text-textMuted">Activity Level</Text>
          <Text className="text-text">—</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-textMuted">Target Weight</Text>
          <Text className="text-text">—</Text>
        </View>
      </Card>

      <Link href="/settings" asChild>
        <Card>
          <Text className="text-primary">Settings →</Text>
        </Card>
      </Link>
    </ScreenContainer>
  );
}
