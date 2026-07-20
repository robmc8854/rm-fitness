import { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { colors } from "@/theme/tokens";

interface RestTimerProps {
  seconds: number;
  onDone: () => void;
  onAdjust: (deltaSeconds: number) => void;
  onSkip: () => void;
}

export function RestTimer({ seconds, onDone, onAdjust, onSkip }: RestTimerProps) {
  useEffect(() => {
    if (seconds <= 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => onAdjust(-1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.max(0, seconds) % 60;

  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        alignItems: "center",
      }}
    >
      <Text className="text-textMuted text-xs mb-1">Rest Timer</Text>
      <Text className="text-primary text-3xl font-bold mb-3">
        {mins}:{secs.toString().padStart(2, "0")}
      </Text>
      <View className="flex-row gap-3">
        <Pressable onPress={() => onAdjust(-15)}>
          <View className="px-3 py-1.5 rounded-full border" style={{ borderColor: colors.border }}>
            <Text className="text-text text-xs">-15s</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onAdjust(15)}>
          <View className="px-3 py-1.5 rounded-full border" style={{ borderColor: colors.border }}>
            <Text className="text-text text-xs">+15s</Text>
          </View>
        </Pressable>
        <Pressable onPress={onSkip}>
          <View className="px-3 py-1.5 rounded-full border" style={{ borderColor: colors.primary }}>
            <Text className="text-primary text-xs">Skip</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
