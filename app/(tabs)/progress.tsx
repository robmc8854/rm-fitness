import { useState } from "react";
import { Text, View, Pressable, Modal, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { WeightChart } from "@/components/WeightChart";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { computePRs } from "@/lib/training";
import { getExerciseById } from "@/data/exercises";
import { todayKey } from "@/lib/nutrition";
import { colors } from "@/theme/tokens";
import { ProgressPhoto } from "@/types";

const MEASUREMENT_FIELDS: { key: "chestCm" | "waistCm" | "armsCm" | "legsCm" | "shouldersCm"; label: string }[] = [
  { key: "chestCm", label: "Chest" },
  { key: "waistCm", label: "Waist" },
  { key: "armsCm", label: "Arms" },
  { key: "legsCm", label: "Legs" },
  { key: "shouldersCm", label: "Shoulders" },
];

const ANGLES: ProgressPhoto["angle"][] = ["front", "side", "back"];

export default function ProgressScreen() {
  const measurements = useProgressStore((s) => s.measurements);
  const logMeasurement = useProgressStore((s) => s.logMeasurement);
  const weightHistory = useProgressStore((s) => s.weightHistory());
  const photos = useProgressStore((s) => s.photos);
  const addPhoto = useProgressStore((s) => s.addPhoto);

  const workouts = useWorkoutStore((s) => s.workouts);
  const prs = computePRs(workouts);
  const topPRs = Object.values(prs)
    .sort((a, b) => b.bestEstimated1RM - a.bestEstimated1RM)
    .slice(0, 5);

  const latest = measurements[0];

  const [logOpen, setLogOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [arms, setArms] = useState("");
  const [legs, setLegs] = useState("");
  const [shoulders, setShoulders] = useState("");

  function handleSaveMeasurement() {
    logMeasurement({
      date: todayKey(),
      weightKg: weight ? parseFloat(weight) : null,
      chestCm: chest ? parseFloat(chest) : null,
      waistCm: waist ? parseFloat(waist) : null,
      armsCm: arms ? parseFloat(arms) : null,
      legsCm: legs ? parseFloat(legs) : null,
      shouldersCm: shoulders ? parseFloat(shoulders) : null,
    });
    setWeight(""); setChest(""); setWaist(""); setArms(""); setLegs(""); setShoulders("");
    setLogOpen(false);
  }

  async function handleCapturePhoto(angle: ProgressPhoto["angle"]) {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]) {
      addPhoto({ date: todayKey(), angle, storagePath: result.assets[0].uri });
    }
  }

  function latestPhotoFor(angle: ProgressPhoto["angle"]) {
    return photos.find((p) => p.angle === angle);
  }

  return (
    <ScreenContainer>
      <Text className="text-text text-3xl font-bold my-4">Progress</Text>

      <Card className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-textMuted text-sm">Weight Trend</Text>
          <Text className="text-text font-semibold">
            {latest?.weightKg != null ? `${latest.weightKg} kg` : "— kg"}
          </Text>
        </View>
        <WeightChart data={weightHistory} />
      </Card>

      <Button label="+ Log Measurements" onPress={() => setLogOpen(true)} />

      <View className="flex-row flex-wrap gap-3 my-4">
        {MEASUREMENT_FIELDS.map(({ key, label }) => (
          <Card key={key} className="w-[30%] items-center py-3">
            <Text className="text-textMuted text-xs">{label}</Text>
            <Text className="text-text text-sm font-semibold">
              {latest?.[key] != null ? `${latest[key]} cm` : "— cm"}
            </Text>
          </Card>
        ))}
      </View>

      <Card className="mb-4">
        <Text className="text-textMuted text-sm mb-2">Strength — Estimated 1RM</Text>
        {topPRs.length === 0 ? (
          <Text className="text-text">No PRs yet — log sets in Workouts to populate this.</Text>
        ) : (
          topPRs.map((pr) => {
            const exercise = getExerciseById(pr.exerciseId);
            return (
              <View key={pr.exerciseId} className="flex-row justify-between py-1.5">
                <Text className="text-text">{exercise?.name ?? pr.exerciseId}</Text>
                <Text className="text-primary font-semibold">{pr.bestEstimated1RM} kg</Text>
              </View>
            );
          })
        )}
      </Card>

      <Card>
        <Text className="text-textMuted text-sm mb-2">Progress Photos</Text>
        <View className="flex-row gap-3">
          {ANGLES.map((angle) => {
            const photo = latestPhotoFor(angle);
            return (
              <Pressable
                key={angle}
                onPress={() => handleCapturePhoto(angle)}
                className="flex-1 aspect-square"
              >
                <View className="flex-1 bg-surfaceAlt rounded-md items-center justify-center overflow-hidden">
                  {photo ? (
                    <Image source={{ uri: photo.storagePath }} style={{ width: "100%", height: "100%" }} />
                  ) : (
                    <Text className="text-textMuted text-xs capitalize">{angle}{"\n"}Tap to capture</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        {photos.length > 0 && (
          <Text className="text-textMuted text-xs mt-3">
            {photos.length} photo{photos.length === 1 ? "" : "s"} in your timeline.
          </Text>
        )}
      </Card>

      <Modal visible={logOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 24 }}>
          <ScreenContainer>
            <Text className="text-text text-xl font-bold mb-4 mt-2">Log Measurements</Text>
            <TextField label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <TextField label="Chest (cm)" value={chest} onChangeText={setChest} keyboardType="numeric" />
            <TextField label="Waist (cm)" value={waist} onChangeText={setWaist} keyboardType="numeric" />
            <TextField label="Arms (cm)" value={arms} onChangeText={setArms} keyboardType="numeric" />
            <TextField label="Legs (cm)" value={legs} onChangeText={setLegs} keyboardType="numeric" />
            <TextField label="Shoulders (cm)" value={shoulders} onChangeText={setShoulders} keyboardType="numeric" />
            <View className="mt-3">
              <Button label="Save" onPress={handleSaveMeasurement} />
            </View>
            <View className="mt-3">
              <Button label="Cancel" variant="outline" onPress={() => setLogOpen(false)} />
            </View>
          </ScreenContainer>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
