import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { WeightChart } from "@/components/WeightChart";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useNutritionLogStore } from "@/hooks/useNutritionLogStore";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useCoachSummaryStore } from "@/hooks/useCoachSummaryStore";
import { computeWorkoutStreak } from "@/lib/training";
import { DEFAULT_TARGETS, todayKey, pctOfTarget } from "@/lib/nutrition";
import { colors, fonts, gradients, shadow } from "@/theme/tokens";

function StatRing({
  icon,
  label,
  value,
  target,
  unit,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  target: number;
  unit: string;
}) {
  const pct = pctOfTarget(value, target);
  return (
    <Card className="flex-1" style={{ paddingVertical: 14 }}>
      <View className="flex-row items-center mb-2">
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.primaryMuted,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Ionicons name={icon} size={14} color={colors.primary} />
        </View>
        <Text style={{ color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 11 }}>
          {label}
        </Text>
      </View>
      <Text style={{ color: colors.text, fontFamily: fonts.headingBold, fontSize: 18 }}>
        {value}
        <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12 }}> / {target}{unit}</Text>
      </Text>
      <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surfaceAlt, marginTop: 8, overflow: "hidden" }}>
        <View style={{ width: `${pct}%`, height: 5, borderRadius: 3, backgroundColor: colors.primary }} />
      </View>
    </Card>
  );
}

export default function DashboardScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const activeWorkout = workouts.find((w) => !w.completedAt);
  const streak = computeWorkoutStreak(workouts);

  const today = todayKey();
  const log = useNutritionLogStore((s) => s.getLog(today));

  const latestWeight = useProgressStore((s) => s.latestWeight());
  const weightHistory = useProgressStore((s) => s.weightHistory(8));
  const lastCoachSummary = useCoachSummaryStore((s) => s.lastSummary);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <ScreenContainer>
      <LinearGradient
        colors={gradients.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            borderRadius: 28,
            padding: 20,
            marginTop: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.border,
          },
          shadow.card,
        ]}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 13 }}>{greeting}</Text>
            <Text style={{ color: colors.text, fontFamily: fonts.heading, fontSize: 30, marginTop: 2 }}>
              Rob
            </Text>
          </View>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: colors.primaryMuted,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.primaryDim,
            }}
          >
            <Ionicons name="flame" size={22} color={colors.primary} />
          </View>
        </View>

        <View className="flex-row items-center mt-4">
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: colors.primaryMuted,
              marginRight: 8,
            }}
          >
            <Text style={{ color: colors.primary, fontFamily: fonts.bodySemibold, fontSize: 12 }}>
              🔥 {streak} day{streak === 1 ? "" : "s"} streak
            </Text>
          </View>
          {latestWeight != null && (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                backgroundColor: colors.surfaceAlt,
              }}
            >
              <Text style={{ color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 12 }}>
                {latestWeight} kg
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <Link href={activeWorkout ? `/workouts/${activeWorkout.id}` : "/workouts"} asChild>
        <Pressable>
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              { borderRadius: 24, padding: 18, marginBottom: 16 },
              shadow.glow,
            ]}
          >
            <View className="flex-row items-center justify-between">
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#0A1F14", fontFamily: fonts.bodyMedium, fontSize: 12 }}>
                  {activeWorkout ? "WORKOUT IN PROGRESS" : "TODAY'S WORKOUT"}
                </Text>
                <Text
                  style={{ color: "#08120C", fontFamily: fonts.headingBold, fontSize: 19, marginTop: 2 }}
                  numberOfLines={1}
                >
                  {activeWorkout ? activeWorkout.name : "Start a workout"}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(8,18,12,0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="arrow-forward" size={18} color="#08120C" />
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      </Link>

      <View className="flex-row gap-3 mb-3">
        <StatRing icon="flame-outline" label="Calories" value={log.calories} target={DEFAULT_TARGETS.calories} unit="" />
        <StatRing icon="barbell-outline" label="Protein" value={log.proteinG} target={DEFAULT_TARGETS.proteinG} unit="g" />
      </View>
      <View className="flex-row gap-3 mb-6">
        <StatRing icon="water-outline" label="Water" value={Math.round(log.waterMl / 250) * 250} target={DEFAULT_TARGETS.waterMl} unit="ml" />
        <StatRing icon="trending-down-outline" label="Sugar" value={log.sugarG} target={DEFAULT_TARGETS.sugarG} unit="g" />
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text style={{ color: colors.text, fontFamily: fonts.headingSemibold, fontSize: 17 }}>
          Weekly Progress
        </Text>
      </View>
      <Card className="mb-6">
        <WeightChart data={weightHistory} />
      </Card>

      <Link href="/coach" asChild>
        <Pressable>
          <Card className="mb-4" style={{ borderColor: colors.accentMuted }}>
            <View className="flex-row items-center mb-2">
              <Ionicons name="sparkles" size={16} color={colors.accent} />
              <Text style={{ color: colors.accent, fontFamily: fonts.bodySemibold, fontSize: 13, marginLeft: 6 }}>
                AI COACH
              </Text>
            </View>
            <Text style={{ color: colors.text, fontFamily: fonts.body, fontSize: 14, lineHeight: 20 }} numberOfLines={3}>
              {lastCoachSummary ??
                "Get a personalised coaching summary based on your training and nutrition →"}
            </Text>
          </Card>
        </Pressable>
      </Link>

      <Card>
        <Text style={{ color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 12, marginBottom: 4 }}>
          DAILY MOTIVATION
        </Text>
        <Text style={{ color: colors.text, fontFamily: fonts.headingSemibold, fontSize: 16, fontStyle: "italic" }}>
          "Consistency beats intensity."
        </Text>
      </Card>
    </ScreenContainer>
  );
}
