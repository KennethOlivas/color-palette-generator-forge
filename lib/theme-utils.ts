import type { Color } from "./color-utils"

export interface ThemeMapping {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  border: string
  muted: string
  destructive: string
}

export function generateThemeFromPalette(colors: Color[]): ThemeMapping {
  // Auto-assign colors to theme tokens based on lightness
  const sortedByLightness = [...colors].sort((a, b) => a.hsl.l - b.hsl.l)

  return {
    background: sortedByLightness[sortedByLightness.length - 1]?.hex || "#FFFFFF",
    foreground: sortedByLightness[0]?.hex || "#000000",
    primary: colors[0]?.hex || "#000000",
    secondary: colors[1]?.hex || "#666666",
    accent: colors[2]?.hex || "#0066FF",
    border: sortedByLightness[sortedByLightness.length - 2]?.hex || "#E5E5E5",
    muted: sortedByLightness[sortedByLightness.length - 2]?.hex || "#F5F5F5",
    destructive: colors[colors.length - 1]?.hex || "#FF0000",
  }
}

export function generateTailwindConfig(theme: ThemeMapping): string {
  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.primary}',
        secondary: '${theme.secondary}',
        accent: '${theme.accent}',
        background: '${theme.background}',
        foreground: '${theme.foreground}',
        border: '${theme.border}',
        muted: '${theme.muted}',
        destructive: '${theme.destructive}',
      },
    },
  },
}`
}

export function generateCSSVariables(theme: ThemeMapping): string {
  return `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --border: ${theme.border};
  --muted: ${theme.muted};
  --destructive: ${theme.destructive};
}`
}
