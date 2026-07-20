import { Pressable, Text, PressableProps, ActivityIndicator } from "react-native";
import { colors } from "@/theme/tokens";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "outline" | "danger";
  loading?: boolean;
}

export function Button({ label, variant = "primary", loading, disabled, ...rest }: ButtonProps) {
  const isOutline = variant === "outline";
  const isDanger = variant === "danger";

  const backgroundColor = isOutline ? "transparent" : isDanger ? colors.danger : colors.primary;
  const textColor = isOutline ? colors.text : "#0B0B0D";
  const borderColor = isOutline ? colors.border : "transparent";

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => ({
        backgroundColor,
        borderWidth: isOutline ? 1 : 0,
        borderColor,
        borderRadius: 999,
        paddingVertical: 14,
        alignItems: "center",
        minHeight: 48,
        justifyContent: "center",
        opacity: pressed || disabled ? 0.7 : 1,
      })}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={{ color: textColor, fontWeight: "600", fontSize: 16 }}>{label}</Text>
      )}
    </Pressable>
  );
}
