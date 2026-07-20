import { useState } from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { TextField } from "@/components/TextField";
import { EXERCISE_LIBRARY } from "@/data/exercises";

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState("");

  const filtered = EXERCISE_LIBRARY.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.muscleGroup.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, ex) => {
    acc[ex.muscleGroup] = acc[ex.muscleGroup] ?? [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {});

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Exercise Library" }} />
      <ScreenContainer>
        <View className="mt-2">
          <TextField
            placeholder="Search exercises or muscle groups"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {Object.entries(grouped).map(([group, exercises]) => (
          <View key={group} className="mb-4">
            <Text className="text-textMuted text-sm mb-2 uppercase tracking-wide">{group}</Text>
            {exercises.map((ex) => (
              <Card key={ex.id} className="mb-2">
                <Text className="text-text font-semibold mb-1">{ex.name}</Text>
                <Text className="text-textMuted text-sm">{ex.instructions}</Text>
              </Card>
            ))}
          </View>
        ))}

        {filtered.length === 0 && (
          <Text className="text-textMuted text-center mt-8">No exercises match "{query}".</Text>
        )}
      </ScreenContainer>
    </>
  );
}
