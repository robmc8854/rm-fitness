import { View, ViewProps } from "react-native";

export function Card({ children, className = "", ...rest }: ViewProps & { className?: string }) {
  return (
    <View
      className={`bg-surface border border-border rounded-card p-4 ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
}
