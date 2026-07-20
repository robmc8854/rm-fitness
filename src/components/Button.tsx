import { useState } from "react";
import { Pressable, Text, PressableProps, ActivityIndicator, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, fonts, shadow } from "@/theme/tokens";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "outline" | "danger" | "accent";
  loading?: boolean;
}

// Deliberately avoids Pressable's function-as-style prop and relies on a
// plain style object + local pressed state instead — the callback style
// form was silently failing to paint backgrounds under RN 0.81 / New
// Architecture in this project.
export function Button({ label, variant = "primary", loading, disabled, onPressIn, onPressOut, style, ...rest }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isOutline = variant === "outline";
  const isDanger = variant === "danger";
  const isAccent = variant === "accent";
  const isGradient = variant === "primary" || isAccent;

  const textColor = isOutline ? colors.text : isDanger ? "#FFF5F5" : "#08120C";
  const borderColor = isOutline ? colors.border : "transparent";
  const gradientColors = isAccent ? gradients.accentButton : gradients.primaryButton;

  const content = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <Text style={{ color: textColor, fontFamily: fonts.bodySemibold, fontSize: 16 }}>{label}</Text>
  );

  if (isGradient) {
    return (
      <Pressable
        disabled={disabled || loading}
        onPressIn={(e) => { setPressed(true); onPressIn?.(e); }}
        onPressOut={(e) => { setPressed(false); onPressOut?.(e); }}
        style={[{ opacity: pressed || disabled ? 0.75 : 1, borderRadius: 999 }, shadow.glow]}
        {...rest}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.base}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled || loading}
      onPressIn={(e) => { setPressed(true); onPressIn?.(e); }}
      onPressOut={(e) => { setPressed(false); onPressOut?.(e); }}
      style={[
        styles.base,
        {
          backgroundColor: isDanger ? colors.danger : "transparent",
          borderWidth: isOutline ? 1 : 0,
          borderColor,
          opacity: pressed || disabled ? 0.7 : 1,
        },
      ]}
      {...rest}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    width: "100%",
  },
});
