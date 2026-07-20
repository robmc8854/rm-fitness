import { Text, View, Switch } from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Card } from "@/components/Card";
import { colors } from "@/theme/tokens";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      <ScreenContainer>
        <Card className="mb-4 mt-2">
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-text">Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-text">Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="text-text py-2">Units</Text>
          <Text className="text-text py-2">Privacy</Text>
          <Text className="text-text py-2">Data Export</Text>
          <Text className="text-text py-2">Cloud Backup</Text>
        </Card>

        <Card>
          <Text className="text-danger">Account Management</Text>
        </Card>
      </ScreenContainer>
    </>
  );
}
