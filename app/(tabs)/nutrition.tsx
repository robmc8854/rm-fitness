import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { useNutritionLogStore } from "@/hooks/useNutritionLogStore";
import { useMealStore } from "@/hooks/useMealStore";
import { WeeklyBarChart } from "@/components/WeeklyBarChart";
import { MacroDonut } from "@/components/MacroDonut";
import { DEFAULT_TARGETS, pctOfTarget, todayKey } from "@/lib/nutrition";
import { colors, fonts } from "@/theme/tokens";

function MacroRow({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  const pct = pctOfTarget(value, target);
  return (
    <View className="mb-3">
      <View className="flex-row justify-between mb-1">
        <Text className="text-textMuted text-xs">{label}</Text>
        <Text className="text-text text-xs">
          {value}{unit} / {target}{unit}
        </Text>
      </View>
      <View className="h-2 rounded-full bg-surfaceAlt overflow-hidden">
        <View
          className="h-2 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: colors.primary }}
        />
      </View>
    </View>
  );
}

export default function NutritionScreen() {
  const today = todayKey();
  const log = useNutritionLogStore((s) => s.getLog(today));
  const addToLog = useNutritionLogStore((s) => s.addToLog);
  const getLog = useNutritionLogStore((s) => s.getLog);
  const meals = useMealStore((s) => s.meals);

  const favouriteMeals = meals.filter((m) => m.isFavourite).slice(0, 3);

  const last7DaysCalories = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { label: d.toLocaleDateString(undefined, { weekday: "narrow" }), value: getLog(key).calories };
  });

  function quickAddMeal(mealId: string) {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;
    addToLog(today, {
      calories: meal.calories,
      proteinG: meal.proteinG,
      carbsG: meal.carbsG,
      fatG: meal.fatG,
      sugarG: meal.sugarG,
      saltG: meal.saltG,
    });
  }

  function addWater(ml: number) {
    addToLog(today, { waterMl: ml });
  }

  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-heading my-4">Nutrition</Text>

      <Card className="mb-4">
        <Text style={{ color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 13, marginBottom: 4 }}>
          Today's Macro Split
        </Text>
        <MacroDonut proteinG={log.proteinG} carbsG={log.carbsG} fatG={log.fatG} />
      </Card>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-3">Today's Totals</Text>
        <MacroRow label="Calories" value={log.calories} target={DEFAULT_TARGETS.calories} unit="" />
        <MacroRow label="Protein" value={log.proteinG} target={DEFAULT_TARGETS.proteinG} unit="g" />
        <MacroRow label="Carbs" value={log.carbsG} target={DEFAULT_TARGETS.carbsG} unit="g" />
        <MacroRow label="Fat" value={log.fatG} target={DEFAULT_TARGETS.fatG} unit="g" />
        <MacroRow label="Sugar" value={log.sugarG} target={DEFAULT_TARGETS.sugarG} unit="g" />
        <MacroRow label="Salt" value={log.saltG} target={DEFAULT_TARGETS.saltG} unit="g" />
        <MacroRow label="Water" value={log.waterMl} target={DEFAULT_TARGETS.waterMl} unit="ml" />
      </Card>

      <Card className="mb-4">
        <Text style={{ color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 13, marginBottom: 4 }}>
          Weekly Calorie Trend
        </Text>
        <WeeklyBarChart data={last7DaysCalories} />
      </Card>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Quick Add Water</Text>
        <View className="flex-row gap-3">
          {[250, 500, 750].map((ml) => (
            <Pressable key={ml} onPress={() => addWater(ml)} className="flex-1">
              <View className="border border-border rounded-md items-center py-2">
                <Text className="text-text">+{ml}ml</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Favourite Meals — Quick Log</Text>
        {favouriteMeals.length === 0 ? (
          <Text className="text-text">
            No favourite meals yet. Save one from Meal Planner to quick-log it here.
          </Text>
        ) : (
          favouriteMeals.map((m) => (
            <Pressable key={m.id} onPress={() => quickAddMeal(m.id)}>
              <View className="flex-row justify-between py-2 border-b border-border">
                <Text className="text-text">{m.name}</Text>
                <Text className="text-primary">+ Log ({m.calories} kcal)</Text>
              </View>
            </Pressable>
          ))
        )}
      </Card>

      <Link href="/nutrition/meals" asChild>
        <Pressable>
          <Card className="mb-4">
            <Text className="text-textMuted text-sm mb-1">Meal Planner</Text>
            <Text className="text-primary">Manage saved meals & plan your week →</Text>
          </Card>
        </Pressable>
      </Link>

      <Link href="/shopping" asChild>
        <Pressable>
          <Card>
            <Text className="text-textMuted text-sm mb-1">Shopping List</Text>
            <Text className="text-primary">Generate from this week's meals →</Text>
          </Card>
        </Pressable>
      </Link>
    </ScreenContainer>
  );
}
