import { useState } from "react";
import { Pressable, Text, PressableProps, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/theme/tokens";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "outline" | "danger";
  loading?: boolean;
}

// Deliberately avoids Pressable's function-as-style prop and relies on a
// plain style object + local pressed state instead. The callback style form
// (style={({ pressed }) => ({...})}) was silently failing to paint a
// background under RN 0.81 / New Architecture in this project, leaving
// buttons invisible (though still present and tappable) — this is the fix.
export function Button({ label, variant = "primary", loading, disabled, onPressIn, onPressOut, style, ...rest }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isOutline = variant === "outline";
  const isDanger = variant === "danger";

  const backgroundColor = isOutline ? "transparent" : isDanger ? colors.danger : colors.primary;
  const textColor = isOutline ? colors.text : "#0B0B0D";
  const borderColor = isOutline ? colors.border : "transparent";

  return (
    <Pressable
      disabled={disabled || loading}
      onPressIn={(e) => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
      style={[
        styles.base,
        {
          backgroundColor,
          borderWidth: isOutline ? 1 : 0,
          borderColor,
          opacity: pressed || disabled ? 0.7 : 1,
        },
      ]}
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

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    width: "100%",
  },
});
