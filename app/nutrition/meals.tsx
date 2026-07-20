import { useState } from "react";
import { Text, View, Pressable, Modal } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useMealStore } from "@/hooks/useMealStore";
import { colors } from "@/theme/tokens";
import { MealIngredient } from "@/types";
import { todayKey } from "@/lib/nutrition";

const INGREDIENT_CATEGORIES = ["Produce", "Protein", "Dairy", "Pantry", "Frozen", "Other"];

export default function MealsScreen() {
  const meals = useMealStore((s) => s.meals);
  const addMeal = useMealStore((s) => s.addMeal);
  const deleteMeal = useMealStore((s) => s.deleteMeal);
  const toggleFavourite = useMealStore((s) => s.toggleFavourite);
  const planMeal = useMealStore((s) => s.planMeal);
  const plannedMeals = useMealStore((s) => s.plannedMeals);

  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
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

        <Text className="text-textMuted text-sm mt-6 mb-2">Saved Meals</Text>
        {meals.length === 0 ? (
          <Text className="text-text">No meals saved yet.</Text>
        ) : (
          meals.map((m) => (
            <Card key={m.id} className="mb-3">
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-text font-semibold flex-1">{m.name}</Text>
                <Pressable onPress={() => toggleFavourite(m.id)}>
                  <Text style={{ color: m.isFavourite ? colors.primary : colors.textMuted }}>
                    {m.isFavourite ? "★ Favourite" : "☆ Favourite"}
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
          ))
        )}
      </ScreenContainer>

      <Modal visible={createOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 24 }}>
          <ScreenContainer>
            <Text className="text-text text-xl font-bold mb-4 mt-2">New Meal</Text>

            <TextField label="Meal name" value={name} onChangeText={setName} placeholder="e.g. Chicken & Rice Bowl" />
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
