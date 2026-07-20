import { TextInput, TextInputProps, View, Text } from "react-native";
import { colors } from "@/theme/tokens";

interface TextFieldProps extends TextInputProps {
  label?: string;
}

export function TextField({ label, style, ...rest }: TextFieldProps) {
  return (
    <View className="mb-3">
      {label ? <Text className="text-textMuted text-xs mb-1">{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          {
            backgroundColor: colors.surfaceAlt,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            color: colors.text,
            fontSize: 16,
            minHeight: 48,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}
