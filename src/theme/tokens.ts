// Central design tokens. Keep this as the single source of truth for
// colors/spacing so screens stay visually consistent (see tailwind.config.js
// for the NativeWind-facing mirror of these values).

export const colors = {
  background: "#08080A",
  backgroundElevated: "#0F0F13",
  surface: "#16161C",
  surfaceAlt: "#1E1E26",
  surfaceHighlight: "#252530",
  border: "#26262F",
  borderStrong: "#34343F",

  primary: "#5EE1A0",
  primaryDim: "#3FA377",
  primaryMuted: "#1D3A2C",
  primaryGlow: "rgba(94, 225, 160, 0.18)",

  accent: "#8B7CFF",
  accentMuted: "#2A2450",

  text: "#F7F7F9",
  textMuted: "#94949F",
  textFaint: "#5C5C68",

  danger: "#FF6B6B",
  dangerMuted: "#3A2020",
  warning: "#FFB84D",
} as const;

// Gradient pairs for LinearGradient — [start, end]. Keep subtle; this is a
// premium dark app, not a neon one.
export const gradients = {
  primaryButton: ["#6FEBAF", "#3FA377"] as const,
  heroCard: ["#161B18", "#0B0F0D"] as const,
  accentButton: ["#9C8FFF", "#6C5CE0"] as const,
  glass: ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.01)"] as const,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  card: 24,
  pill: 999,
} as const;

export const touchTarget = {
  minHeight: 48,
  minWidth: 48,
} as const;

export const shadow = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

export const fonts = {
  heading: "Manrope_800ExtraBold",
  headingBold: "Manrope_700Bold",
  headingSemibold: "Manrope_600SemiBold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemibold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
} as const;
