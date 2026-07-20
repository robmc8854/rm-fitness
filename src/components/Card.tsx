import { View, ViewProps } from "react-native";
import { colors, radius, shadow } from "@/theme/tokens";

interface CardProps extends ViewProps {
  className?: string;
  variant?: "default" | "flat";
}

export function Card({ children, className = "", variant = "default", style, ...rest }: CardProps) {
  return (
    <View
      className={`rounded-card p-4 ${className}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        variant === "default" ? shadow.card : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
