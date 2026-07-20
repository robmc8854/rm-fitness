import { View, Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "@/components/TabBarIcon";
import { colors, fonts, shadow } from "@/theme/tokens";

const ICON_BY_ROUTE: Record<string, "home" | "dumbbell" | "nutrition" | "chart" | "profile"> = {
  index: "home",
  workouts: "dumbbell",
  nutrition: "nutrition",
  progress: "chart",
  profile: "profile",
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: insets.bottom + 8,
      }}
    >
      <BlurView
        intensity={60}
        tint="dark"
        style={[
          {
            flexDirection: "row",
            borderRadius: 28,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: "rgba(22,22,28,0.82)",
            paddingVertical: 8,
            paddingHorizontal: 6,
          },
          shadow.card,
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconName = ICON_BY_ROUTE[route.name] ?? "home";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const label =
            typeof options.title === "string" ? options.title : route.name;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                borderRadius: 22,
                backgroundColor: isFocused ? colors.primaryMuted : "transparent",
                marginHorizontal: 2,
              }}
            >
              <TabBarIcon
                name={iconName}
                color={isFocused ? colors.primary : colors.textMuted}
                size={22}
              />
              <Text
                style={{
                  fontFamily: isFocused ? fonts.bodySemibold : fonts.body,
                  fontSize: 10,
                  marginTop: 3,
                  color: isFocused ? colors.primary : colors.textMuted,
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}
