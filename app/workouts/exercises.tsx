import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Stack } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { TextField } from "@/components/TextField";
import { EXERCISE_LIBRARY, getAlternatives } from "@/data/exercises";
import { colors, fonts } from "@/theme/tokens";
import { Difficulty } from "@/types";

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  beginner: colors.primary,
  intermediate: colors.warning,
  advanced: colors.danger,
};

const EQUIPMENT_LABEL: Record<string, string> = {
  barbell: "Barbell",
  dumbbell: "Dumbbell",
  machine: "Machine",
  cable: "Cable",
  bodyweight: "Bodyweight",
  kettlebell: "Kettlebell",
  resistance_band: "Band",
  bench: "Bench",
};

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = EXERCISE_LIBRARY.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.muscleGroup.toLowerCase().includes(query.toLowerCase()) ||
      e.equipment.toLowerCase().includes(query.toLowerCase())
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
            placeholder="Search by name, muscle, or equipment"
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12, marginBottom: 8 }}>
          {EXERCISE_LIBRARY.length} exercises across {Object.keys(getExercisesByMuscleGroupCount()).length} muscle groups
        </Text>

        {Object.entries(grouped).map(([group, exercises]) => (
          <View key={group} className="mb-4">
            <Text style={{ color: colors.textMuted, fontFamily: fonts.bodySemibold, fontSize: 13, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {group} ({exercises.length})
            </Text>
            {exercises.map((ex) => {
              const isExpanded = expandedId === ex.id;
              return (
                <Pressable key={ex.id} onPress={() => setExpandedId(isExpanded ? null : ex.id)}>
                  <Card className="mb-2">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text style={{ color: colors.text, fontFamily: fonts.bodySemibold, fontSize: 15, flex: 1 }}>
                        {ex.name}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 999,
                          backgroundColor: `${DIFFICULTY_COLOR[ex.difficulty]}22`,
                        }}
                      >
                        <Text style={{ color: DIFFICULTY_COLOR[ex.difficulty], fontFamily: fonts.bodyMedium, fontSize: 10 }}>
                          {ex.difficulty}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12, marginBottom: 6 }}>
                      {EQUIPMENT_LABEL[ex.equipment] ?? ex.equipment}
                      {ex.secondaryMuscles.length > 0 ? ` · Also works: ${ex.secondaryMuscles.join(", ")}` : ""}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 13, lineHeight: 18 }}>
                      {ex.instructions}
                    </Text>

                    {isExpanded && (
                      <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border }}>
                        {ex.commonMistakes.length > 0 && (
                          <View className="mb-2">
                            <Text style={{ color: colors.warning, fontFamily: fonts.bodySemibold, fontSize: 12, marginBottom: 2 }}>
                              Common Mistakes
                            </Text>
                            {ex.commonMistakes.map((m, i) => (
                              <Text key={i} style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12 }}>
                                • {m}
                              </Text>
                            ))}
                          </View>
                        )}
                        {getAlternatives(ex.id).length > 0 && (
                          <View>
                            <Text style={{ color: colors.accent, fontFamily: fonts.bodySemibold, fontSize: 12, marginBottom: 2 }}>
                              Alternatives
                            </Text>
                            <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12 }}>
                              {getAlternatives(ex.id).map((a) => a.name).join(", ")}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}

                    <Text style={{ color: colors.primary, fontFamily: fonts.bodyMedium, fontSize: 11, marginTop: 8 }}>
                      {isExpanded ? "Show less ▲" : "Show mistakes & alternatives ▼"}
                    </Text>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        ))}

        {filtered.length === 0 && (
          <Text className="text-textMuted text-center mt-8">No exercises match "{query}".</Text>
        )}
      </ScreenContainer>
    </>
  );
}

function getExercisesByMuscleGroupCount() {
  return EXERCISE_LIBRARY.reduce<Record<string, number>>((acc, ex) => {
    acc[ex.muscleGroup] = (acc[ex.muscleGroup] ?? 0) + 1;
    return acc;
  }, {});
}
