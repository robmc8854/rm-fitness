import { View, Dimensions } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory-native";
import { colors } from "@/theme/tokens";

interface WeeklyBarChartProps {
  data: { label: string; value: number }[];
  target?: number;
}

const screenWidth = Dimensions.get("window").width;

export function WeeklyBarChart({ data, target }: WeeklyBarChartProps) {
  const chartData = data.map((d, idx) => ({ x: idx + 1, y: d.value, label: d.label }));

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
        width={screenWidth - 64}
        height={180}
        padding={{ top: 16, bottom: 32, left: 44, right: 16 }}
        domainPadding={{ x: 16 }}
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
        <VictoryBar
          data={chartData}
          style={{ data: { fill: colors.primary, width: 14 } }}
          cornerRadius={{ top: 4 }}
        />
      </VictoryChart>
    </View>
  );
}
