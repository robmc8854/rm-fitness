import { ScrollView, ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenContainer({ children, ...rest }: ScrollViewProps) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
