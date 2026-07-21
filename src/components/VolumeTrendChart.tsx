import { Text, View, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";
import { colors } from "@/theme/tokens";

interface VolumeTrendChartProps {
  data: { label: string; volumeKg: number }[];
}

const screenWidth = Dimensions.get("window").width;

export function VolumeTrendChart({ data }: VolumeTrendChartProps) {
  if (data.length < 2) {
    return (
      <View className="h-32 items-center justify-center">
        <Text className="text-textMuted text-xs text-center">
          Complete at least two workouts to see your volume trend.
        </Text>
      </View>
    );
  }

  const chartData = data.map((d, idx) => ({ x: idx + 1, y: d.volumeKg, label: d.label }));

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={screenWidth - 64}
      height={180}
      padding={{ top: 16, bottom: 32, left: 50, right: 16 }}
    >
      <VictoryAxis
        style={{
          axis: { stroke: colors.border },
          tickLabels: { fill: colors.textMuted, fontSize: 9 },
          grid: { stroke: "transparent" },
        }}
        tickFormat={(_t, idx) => chartData[idx]?.label ?? ""}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: colors.border },
          tickLabels: { fill: colors.textMuted, fontSize: 9 },
          grid: { stroke: colors.border, strokeDasharray: "2,4" },
        }}
      />
      <VictoryLine
        data={chartData}
        style={{ data: { stroke: colors.accent, strokeWidth: 2 } }}
        interpolation="monotoneX"
      />
    </VictoryChart>
  );
}
