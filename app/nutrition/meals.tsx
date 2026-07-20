import { useState, useMemo } from "react";
import { Text, View, Pressable, Modal } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useMealStore } from "@/hooks/useMealStore";
import { colors } from "@/theme/tokens";
import { MealIngredient, MealCategory } from "@/types";
import { todayKey } from "@/lib/nutrition";

const INGREDIENT_CATEGORIES = ["Produce", "Protein", "Dairy", "Pantry", "Frozen", "Other"];

const MEAL_CATEGORIES: { key: MealCategory; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snack", label: "Snack" },
];

type FilterKey = MealCategory | "all";

export default function MealsScreen() {
  const meals = useMealStore((s) => s.meals);
  const addMeal = useMealStore((s) => s.addMeal);
  const deleteMeal = useMealStore((s) => s.deleteMeal);
  const toggleFavourite = useMealStore((s) => s.toggleFavourite);
  const planMeal = useMealStore((s) => s.planMeal);
  const plannedMeals = useMealStore((s) => s.plannedMeals);

  const [filter, setFilter] = useState<FilterKey>("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<MealCategory>("lunch");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [ingredients, setIngredients] = useState<MealIngredient[]>([]);
  const [ingName, setIngName] = useState("");
  const [ingQty, setIngQty] = useState("");
  const [ingCategory, setIngCategory] = useState(INGREDIENT_CATEGORIES[0]);

  function addIngredient() {
    if (!ingName.trim()) return;
    setIngredients((prev) => [...prev, { name: ingName.trim(), quantity: ingQty.trim(), category: ingCategory }]);
    setIngName("");
    setIngQty("");
  }

  function resetForm() {
    setName("");
    setCategory("lunch");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setIngredients([]);
  }

  function handleSaveMeal() {
    if (!name.trim()) return;
    addMeal({
      name: name.trim(),
      category,
      calories: parseInt(calories, 10) || 0,
      proteinG: parseInt(protein, 10) || 0,
      carbsG: parseInt(carbs, 10) || 0,
      fatG: parseInt(fat, 10) || 0,
      ingredients,
    });
    resetForm();
    setCreateOpen(false);
  }

  const today = todayKey();
  const plannedToday = plannedMeals.filter((p) => p.date === today);

  const filteredMeals = useMemo(
    () => (filter === "all" ? meals : meals.filter((m) => m.category === filter)),
    [meals, filter]
  );

  const groupedMeals = useMemo(() => {
    if (filter !== "all") return { [filter]: filteredMeals };
    return MEAL_CATEGORIES.reduce<Record<string, typeof meals>>((acc, c) => {
      const inCat = meals.filter((m) => m.category === c.key);
      if (inCat.length > 0) acc[c.key] = inCat;
      return acc;
    }, {});
  }, [filteredMeals, filter, meals]);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Meal Planner" }} />
      <ScreenContainer>
        <Card className="mb-4 mt-2">
          <Text className="text-textMuted text-sm mb-2">Planned for Today</Text>
          {plannedToday.length === 0 ? (
            <Text className="text-text">Nothing planned yet — add a saved meal below.</Text>
          ) : (
            plannedToday.map((p) => {
              const meal = meals.find((m) => m.id === p.mealId);
              return (
                <Text key={p.id} className="text-text py-1">
                  {meal?.name ?? "Unknown meal"}
                </Text>
              );
            })
          )}
        </Card>

        <Button label="+ Create New Meal" onPress={() => setCreateOpen(true)} />

        <View className="flex-row flex-wrap gap-2 mt-6 mb-2">
          <Pressable onPress={() => setFilter("all")}>
            <View
              className="px-3 py-1.5 rounded-full border"
              style={{
                borderColor: filter === "all" ? colors.primary : colors.border,
                backgroundColor: filter === "all" ? colors.primaryMuted : "transparent",
              }}
            >
              <Text className="text-text text-xs">All ({meals.length})</Text>
            </View>
          </Pressable>
          {MEAL_CATEGORIES.map((c) => {
            const count = meals.filter((m) => m.category === c.key).length;
            return (
              <Pressable key={c.key} onPress={() => setFilter(c.key)}>
                <View
                  className="px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: filter === c.key ? colors.primary : colors.border,
                    backgroundColor: filter === c.key ? colors.primaryMuted : "transparent",
                  }}
                >
                  <Text className="text-text text-xs">{c.label} ({count})</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {Object.keys(groupedMeals).length === 0 ? (
          <Text className="text-text mt-4">No meals in this category yet.</Text>
        ) : (
          Object.entries(groupedMeals).map(([catKey, catMeals]) => (
            <View key={catKey} className="mb-2">
              {filter === "all" && (
                <Text className="text-textMuted text-sm mt-4 mb-2 uppercase tracking-wide">
                  {MEAL_CATEGORIES.find((c) => c.key === catKey)?.label ?? catKey}
                </Text>
              )}
              {catMeals.map((m) => (
                <Card key={m.id} className="mb-3">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-text font-semibold flex-1">{m.name}</Text>
                    <Pressable onPress={() => toggleFavourite(m.id)}>
                      <Text style={{ color: m.isFavourite ? colors.primary : colors.textMuted }}>
                        {m.isFavourite ? "★" : "☆"}
                      </Text>
                    </Pressable>
                  </View>
                  <Text className="text-textMuted text-xs mb-2">
                    {m.calories} kcal · P{m.proteinG}g · C{m.carbsG}g · F{m.fatG}g
                  </Text>
                  {m.ingredients.length > 0 && (
                    <Text className="text-textMuted text-xs mb-2">
                      {m.ingredients.map((i) => i.name).join(", ")}
                    </Text>
                  )}
                  <View className="flex-row gap-3">
                    <Pressable onPress={() => planMeal(today, m.id)}>
                      <Text className="text-primary text-sm">Plan for today</Text>
                    </Pressable>
                    <Pressable onPress={() => deleteMeal(m.id)}>
                      <Text style={{ color: colors.danger, fontSize: 14 }}>Delete</Text>
                    </Pressable>
                  </View>
                </Card>
              ))}
            </View>
          ))
        )}
      </ScreenContainer>

      <Modal visible={createOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 24 }}>
          <ScreenContainer>
            <Text className="text-text text-xl font-bold mb-4 mt-2">New Meal</Text>

            <TextField label="Meal name" value={name} onChangeText={setName} placeholder="e.g. Chicken & Rice Bowl" />

            <Text className="text-textMuted text-xs mb-2">Category</Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {MEAL_CATEGORIES.map((c) => (
                <Pressable key={c.key} onPress={() => setCategory(c.key)}>
                  <View
                    className="px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: category === c.key ? colors.primary : colors.border,
                      backgroundColor: category === c.key ? colors.primaryMuted : "transparent",
                    }}
                  >
                    <Text className="text-text text-xs">{c.label}</Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <TextField label="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" />
              </View>
              <View className="flex-1">
                <TextField label="Protein (g)" value={protein} onChangeText={setProtein} keyboardType="numeric" />
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <TextField label="Carbs (g)" value={carbs} onChangeText={setCarbs} keyboardType="numeric" />
              </View>
              <View className="flex-1">
                <TextField label="Fat (g)" value={fat} onChangeText={setFat} keyboardType="numeric" />
              </View>
            </View>

            <Text className="text-textMuted text-sm mt-2 mb-2">Ingredients (for shopping list)</Text>
            {ingredients.map((ing, idx) => (
              <View key={idx} className="flex-row justify-between py-1">
                <Text className="text-text text-sm">
                  {ing.name} {ing.quantity ? `(${ing.quantity})` : ""} — {ing.category}
                </Text>
              </View>
            ))}

            <View className="flex-row gap-2 mb-2">
              <View className="flex-1">
                <TextField placeholder="Ingredient" value={ingName} onChangeText={setIngName} />
              </View>
              <View className="w-20">
                <TextField placeholder="Qty" value={ingQty} onChangeText={setIngQty} />
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {INGREDIENT_CATEGORIES.map((cat) => (
                <Pressable key={cat} onPress={() => setIngCategory(cat)}>
                  <View
                    className="px-3 py-1 rounded-full border"
                    style={{
                      borderColor: ingCategory === cat ? colors.primary : colors.border,
                      backgroundColor: ingCategory === cat ? colors.primaryMuted : "transparent",
                    }}
                  >
                    <Text className="text-text text-xs">{cat}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <Button label="Add Ingredient" variant="outline" onPress={addIngredient} />

            <View className="mt-6">
              <Button label="Save Meal" onPress={handleSaveMeal} />
            </View>
            <View className="mt-3">
              <Button
                label="Cancel"
                variant="outline"
                onPress={() => {
                  resetForm();
                  setCreateOpen(false);
                }}
              />
            </View>
          </ScreenContainer>
        </View>
      </Modal>
    </>
  );
}
