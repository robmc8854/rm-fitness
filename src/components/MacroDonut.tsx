import { View, Text, Dimensions } from "react-native";
import { VictoryPie } from "victory-native";
import { colors, fonts } from "@/theme/tokens";

interface MacroDonutProps {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

const screenWidth = Dimensions.get("window").width;
const SIZE = Math.min(screenWidth - 64, 220);

export function MacroDonut({ proteinG, carbsG, fatG }: MacroDonutProps) {
  const total = proteinG + carbsG + fatG;

  if (total === 0) {
    return (
      <View style={{ height: 160, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 12 }}>
          Log a meal to see your macro split
        </Text>
      </View>
    );
  }

  const data = [
    { x: "Protein", y: proteinG, color: colors.primary },
    { x: "Carbs", y: carbsG, color: colors.accent },
    { x: "Fat", y: fatG, color: colors.warning },
  ];

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ width: SIZE, height: SIZE }}>
        <VictoryPie
          data={data}
          width={SIZE}
          height={SIZE}
          innerRadius={SIZE * 0.32}
          padAngle={2}
          colorScale={data.map((d) => d.color)}
          labels={() => ""}
          style={{ data: { stroke: colors.background, strokeWidth: 2 } }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
        {data.map((d) => (
          <View key={d.x} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: d.color, marginRight: 4 }} />
            <Text style={{ color: colors.textMuted, fontFamily: fonts.body, fontSize: 11 }}>
              {d.x} {Math.round((d.y / total) * 100)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
