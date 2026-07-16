// File: colors.js
// Purpose: Jamia Academy ka pura design color palette ek jagah define karna
// Responsibility: Har component isi file se colors le, kahin bhi hex hardcode nahi hoga
// Future Usage: tailwind.config.js me extend hoga + JS-side logic (charts, dynamic styles) me import hoga
// Dependencies: Koi nahi (pure constants file)
// NOTE: Blue aur Indigo family strictly avoid ki gayi hai, jaisa brief me mention tha

// Primary — Deep Maroon (institute ka signature/brand color)
export const primary = {
  50: "#fdf3f2",
  100: "#fbe3e0",
  200: "#f5c2bc",
  300: "#ea9a90",
  400: "#d96a5c",
  500: "#b8342a", // base
  600: "#9c2721",
  700: "#7a1e19",
  800: "#5c1613",
  900: "#3f0f0d",
};

// Secondary — Warm Gold / Amber (excellence, tradition)
export const secondary = {
  50: "#fdf8ec",
  100: "#faedc9",
  200: "#f3d88d",
  300: "#eabf52",
  400: "#dda52b",
  500: "#c2871c", // base
  600: "#9c6a16",
  700: "#754f12",
  800: "#4f350c",
  900: "#2c1d07",
};

// Accent — Emerald Green (growth, knowledge)
export const accent = {
  50: "#eefbf4",
  100: "#d3f5e3",
  200: "#a2e8c6",
  300: "#67d4a3",
  400: "#37b985",
  500: "#1f9a6c", // base
  600: "#177a56",
  700: "#125e43",
  800: "#0d4531",
  900: "#082d20",
};

// Neutral — Warm Grays (text, backgrounds, borders)
export const neutral = {
  50: "#faf9f7",
  100: "#f2f0ec",
  200: "#e2ded6",
  300: "#c9c2b6",
  400: "#a89f8f",
  500: "#867c6b",
  600: "#665e50",
  700: "#4a443a",
  800: "#302c26",
  900: "#1c1a16",
};

// Semantic tokens — inhe hi components me use karna hai, raw palette ko nahi
export const colors = {
  primary,
  secondary,
  accent,
  neutral,
  background: neutral[50],
  surface: "#ffffff",
  textPrimary: neutral[900],
  textSecondary: neutral[600],
  border: neutral[200],
  success: accent[500],
  warning: secondary[500],
  danger: "#c0362c",
};

export default colors;
