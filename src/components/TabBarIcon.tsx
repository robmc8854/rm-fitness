import { Ionicons } from "@expo/vector-icons";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "home",
  dumbbell: "barbell",
  nutrition: "restaurant",
  chart: "trending-up",
  profile: "person-circle",
  shopping: "cart",
  coach: "sparkles",
  settings: "settings",
};

interface TabBarIconProps {
  name: keyof typeof ICONS;
  color: string;
  size?: number;
}

export function TabBarIcon({ name, color, size = 24 }: TabBarIconProps) {
  return <Ionicons name={ICONS[name] ?? "ellipse"} size={size} color={color} />;
}
