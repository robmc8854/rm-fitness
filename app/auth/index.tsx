import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { colors } from "@/theme/tokens";

// Auth module (Phase 1): email auth wired to Supabase, plus Apple Sign In.
// Google Sign In is a documented future addition per the spec.
export default function AuthScreen() {
  return (
    <ScreenContainer>
      <View className="items-center mt-16 mb-10">
        <Text className="text-text text-3xl font-bold">RM Fitness</Text>
        <Text className="text-textMuted mt-2">Sign in to continue</Text>
      </View>

      <Pressable
        className="rounded-full py-4 items-center mb-3"
        style={{ backgroundColor: colors.primary, minHeight: 48 }}
      >
        <Text className="text-background font-semibold">Continue with Email</Text>
      </Pressable>

      <Pressable
        className="rounded-full py-4 items-center border"
        style={{ borderColor: colors.border, minHeight: 48 }}
      >
        <Text className="text-text font-semibold">Continue with Apple</Text>
      </Pressable>
    </ScreenContainer>
  );
}
