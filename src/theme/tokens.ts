// Central design tokens. Keep this as the single source of truth for
// colors/spacing so screens stay visually consistent (see tailwind.config.js
// for the NativeWind-facing mirror of these values).

export const colors = {
  background: "#0B0B0D",
  surface: "#17171B",
  surfaceAlt: "#1F1F24",
  border: "#2A2A31",
  primary: "#5EE1A0",
  primaryMuted: "#2E6B4E",
  accent: "#7C9CFF",
  text: "#F5F5F7",
  textMuted: "#9A9AA5",
  danger: "#FF6B6B",
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
  card: 20,
  pill: 999,
} as const;

export const touchTarget = {
  minHeight: 48,
  minWidth: 48,
} as const;
