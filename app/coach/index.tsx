import { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useNutritionLogStore } from "@/hooks/useNutritionLogStore";
import { useCoachSummaryStore } from "@/hooks/useCoachSummaryStore";
import { buildCoachContext } from "@/lib/coachContext";
import { requestCoachSummary } from "@/lib/aiCoach";
import { getExerciseById } from "@/data/exercises";
import { todayKey } from "@/lib/nutrition";
import { colors } from "@/theme/tokens";

function lastNDayKeys(n: number): string[] {
  const keys: string[] = [];
  const cursor = new Date();
  for (let i = 0; i < n; i++) {
    keys.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() - 1);
  }
  return keys;
}

export default function CoachScreen() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const weightHistory = useProgressStore((s) => s.weightHistory(12));
  const getLog = useNutritionLogStore((s) => s.getLog);
  const lastSummary = useCoachSummaryStore((s) => s.lastSummary);
  const lastGeneratedAt = useCoachSummaryStore((s) => s.lastGeneratedAt);
  const setSummary = useCoachSummaryStore((s) => s.setSummary);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasEnoughData = workouts.some((w) => w.completedAt) || weightHistory.length > 0;

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const context = buildCoachContext({
        workouts,
        weightHistory,
        nutritionLast7Days: lastNDayKeys(7).map((d) => getLog(d)),
        streak: 0, // streak isn't essential to the coach prompt itself
        exerciseNameLookup: (id) => getExerciseById(id)?.name ?? id,
      });
      const result = await requestCoachSummary(context);
      setSummary(result.summary);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't reach the AI Coach. Check your Supabase Edge Function is deployed and ANTHROPIC_API_KEY is set."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "AI Coach" }} />
      <ScreenContainer>
        <Card className="mb-4 mt-2">
          <Text className="text-textMuted text-sm mb-2">
            {lastGeneratedAt
              ? `Last updated ${new Date(lastGeneratedAt).toLocaleString()}`
              : "No summary generated yet"}
          </Text>

          {loading ? (
            <View className="py-6 items-center">
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : lastSummary ? (
            <Text className="text-text leading-6">{lastSummary}</Text>
          ) : (
            <Text className="text-text">
              {hasEnoughData
                ? "Tap below to get your first AI coaching summary based on your training and nutrition data."
                : "Log a completed workout or a bodyweight entry first — the more real data the Coach has, the more useful its feedback."}
            </Text>
          )}

          {error && <Text className="mt-3" style={{ color: colors.danger }}>{error}</Text>}
        </Card>

        <Button
          label={lastSummary ? "Regenerate Summary" : "Get My Coaching Summary"}
          onPress={handleGenerate}
          loading={loading}
        />

        <Card className="mt-4">
          <Text className="text-textMuted text-xs">
            The AI Coach reads your recent workouts, PRs, weight trend, and last 7 days of
            nutrition logs to generate this summary. It runs through a Supabase Edge Function
            (see supabase/functions/ai-coach) so your API key never ships inside the app.
          </Text>
        </Card>
      </ScreenContainer>
    </>
  );
}
