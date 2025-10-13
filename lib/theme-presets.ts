import type { ThemeMapping } from "./theme-utils"

export interface ThemePreset {
  name: string
  description: string
  theme: ThemeMapping
}

export const themePresets: ThemePreset[] = [
  {
    name: "Brutalist",
    description: "Bold black/white, no border radius",
    theme: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#666666",
      background: "#FFFFFF",
      foreground: "#000000",
      border: "#000000",
      muted: "#F5F5F5",
      destructive: "#FF0000",
    },
  },
  {
    name: "Minimal",
    description: "Grayscale, low contrast",
    theme: {
      primary: "#4A4A4A",
      secondary: "#6B6B6B",
      accent: "#8C8C8C",
      background: "#FAFAFA",
      foreground: "#2A2A2A",
      border: "#E0E0E0",
      muted: "#F0F0F0",
      destructive: "#D32F2F",
    },
  },
  {
    name: "Neon",
    description: "Bright accents on dark background",
    theme: {
      primary: "#00FF00",
      secondary: "#FF00FF",
      accent: "#00FFFF",
      background: "#0A0A0A",
      foreground: "#FFFFFF",
      border: "#00FF00",
      muted: "#1A1A1A",
      destructive: "#FF0066",
    },
  },
  {
    name: "Retro",
    description: "Pastel tones",
    theme: {
      primary: "#FF6B9D",
      secondary: "#C44569",
      accent: "#FFA07A",
      background: "#FFF5E1",
      foreground: "#4A4A4A",
      border: "#FFB6C1",
      muted: "#FFE4E1",
      destructive: "#DC143C",
    },
  },
  {
    name: "Futuristic",
    description: "Monochrome + electric blue",
    theme: {
      primary: "#0066FF",
      secondary: "#0044CC",
      accent: "#00AAFF",
      background: "#0A0A0A",
      foreground: "#E0E0E0",
      border: "#1A1A1A",
      muted: "#151515",
      destructive: "#FF3366",
    },
  },
]
