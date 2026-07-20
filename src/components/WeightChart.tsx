import { Text, View, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";
import { colors } from "@/theme/tokens";

interface WeightChartProps {
  data: { date: string; weightKg: number }[];
}

const screenWidth = Dimensions.get("window").width;

export function WeightChart({ data }: WeightChartProps) {
  if (data.length < 2) {
    return (
      <View className="h-40 items-center justify-center">
        <Text className="text-textMuted text-xs text-center">
          Log your weight on at least two dates to see a trend line.
        </Text>
      </View>
    );
  }

  const chartData = data.map((d, idx) => ({ x: idx + 1, y: d.weightKg, label: d.date.slice(5) }));

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={screenWidth - 64}
      height={200}
      padding={{ top: 16, bottom: 32, left: 44, right: 16 }}
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
        style={{ data: { stroke: colors.primary, strokeWidth: 2 } }}
        interpolation="monotoneX"
      />
    </VictoryChart>
  );
}
