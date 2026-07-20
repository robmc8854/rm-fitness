import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useShoppingStore } from "@/hooks/useShoppingStore";
import { useMealStore } from "@/hooks/useMealStore";
import { todayKey } from "@/lib/nutrition";
import { colors } from "@/theme/tokens";

function endOfWeekKey(): string {
  const d = new Date();
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

export default function ShoppingListScreen() {
  const lists = useShoppingStore((s) => s.lists);
  const generateFromMeals = useShoppingStore((s) => s.generateFromMeals);
  const toggleItem = useShoppingStore((s) => s.toggleItem);
  const addManualItem = useShoppingStore((s) => s.addManualItem);
  const deleteList = useShoppingStore((s) => s.deleteList);

  const meals = useMealStore((s) => s.meals);
  const plannedMeals = useMealStore((s) => s.plannedMeals);

  const [manualName, setManualName] = useState("");

  const latestList = lists[0];

  function handleGenerate() {
    const start = todayKey();
    const end = endOfWeekKey();
    const rangePlanned = plannedMeals.filter((p) => p.date >= start && p.date <= end);
    generateFromMeals({
      name: `Week of ${start}`,
      weekOf: start,
      plannedMeals: rangePlanned,
      meals,
    });
  }

  function handleAddManual() {
    if (!latestList || !manualName.trim()) return;
    addManualItem(latestList.id, { name: manualName.trim(), category: "Other", quantity: 1 });
    setManualName("");
  }

  const grouped = latestList
    ? latestList.items.reduce<Record<string, typeof latestList.items>>((acc, item) => {
        acc[item.category] = acc[item.category] ?? [];
        acc[item.category].push(item);
        return acc;
      }, {})
    : {};

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Shopping List" }} />
      <ScreenContainer>
        <View className="mt-2 mb-4">
          <Button label="Generate List from This Week's Meals" onPress={handleGenerate} />
        </View>

        {!latestList ? (
          <Card>
            <Text className="text-text">
              No shopping list yet. Plan meals in the Meal Planner, then generate a list here.
            </Text>
          </Card>
        ) : (
          <>
            <Card className="mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-text font-semibold">{latestList.name}</Text>
                <Pressable onPress={() => deleteList(latestList.id)}>
                  <Text style={{ color: colors.danger }}>Delete</Text>
                </Pressable>
              </View>
            </Card>

            {Object.entries(grouped).map(([category, items]) => (
              <Card key={category} className="mb-3">
                <Text className="text-textMuted text-xs uppercase tracking-wide mb-2">{category}</Text>
                {items.map((item) => (
                  <Pressable key={item.id} onPress={() => toggleItem(latestList.id, item.id)}>
                    <View className="flex-row items-center justify-between py-2 border-b border-border">
                      <Text
                        className="text-text flex-1"
                        style={item.checked ? { textDecorationLine: "line-through", color: colors.textMuted } : undefined}
                      >
                        {item.name}
                      </Text>
                      <Text className="text-textMuted text-xs mr-2">×{item.quantity}</Text>
                      <Text style={{ color: item.checked ? colors.primary : colors.textMuted }}>
                        {item.checked ? "✓" : "○"}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </Card>
            ))}

            {latestList.items.length === 0 && (
              <Text className="text-textMuted text-center mb-4">
                No meals planned this week yet — generated list is empty.
              </Text>
            )}

            <Card>
              <Text className="text-textMuted text-sm mb-2">Add Item Manually</Text>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <TextField placeholder="e.g. Kitchen roll" value={manualName} onChangeText={setManualName} />
                </View>
              </View>
              <Button label="Add" variant="outline" onPress={handleAddManual} />
            </Card>
          </>
        )}
      </ScreenContainer>
    </>
  );
}
