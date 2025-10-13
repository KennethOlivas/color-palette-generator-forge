"use client";

import { useState, useEffect } from "react";
import { generatePalette } from "@/lib/color-utils";
import {
  generateThemeFromPalette,
  generateTailwindConfig,
  generateCSSVariables,
  type ThemeMapping,
} from "@/lib/theme-utils";
import { themePresets } from "@/lib/theme-presets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { PaletteHeader } from "@/components/common/header";
import { ThemeLivePreview } from "@/components/theme/theme-live-preview";

export default function ThemesPage() {
  // Removed unused colors state
  const [theme, setTheme] = useState<ThemeMapping | null>(null);
  // Removed unused copied state
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  useEffect(() => {
    const initialColors = generatePalette(5);
    setTheme(generateThemeFromPalette(initialColors));
  }, []);

  const handleColorChange = (token: keyof ThemeMapping, hex: string) => {
    if (theme) {
      setTheme({ ...theme, [token]: hex });
      setSelectedPreset(null);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handlePresetSelect = (presetName: string) => {
    const preset = themePresets.find((p) => p.name === presetName);
    if (preset) {
      setTheme(preset.theme);
      setSelectedPreset(presetName);
    }
  };

  if (!theme) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <PaletteHeader showRightButtons={false} />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Panel - Theme Configuration */}
            <div className="space-y-6">
              {/* Preset Selector */}
              <div>
                <h2 className="text-3xl font-bold mb-4">PRESETS</h2>
                <div className="grid grid-cols-2 gap-3">
                  {themePresets.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => handlePresetSelect(preset.name)}
                      className={`p-4 border-4 border-black text-left font-bold transition-colors ${
                        selectedPreset === preset.name
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-lg mb-1">
                        {preset.name.toUpperCase()}
                      </div>
                      <div className="text-xs opacity-70">
                        {preset.description}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {Object.values(preset.theme)
                          .slice(0, 5)
                          .map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 border-2 border-black"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">COLOR TOKENS</h2>
                <div className="space-y-3">
                  {Object.entries(theme).map(([token, hex]) => (
                    <motion.div
                      key={token}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-12 h-12 border-4 border-black"
                        style={{ backgroundColor: hex }}
                      />
                      <div className="flex-1">
                        <label className="text-sm font-bold uppercase">
                          {token}
                        </label>
                        <Input
                          type="text"
                          value={hex}
                          onChange={(e) =>
                            handleColorChange(
                              token as keyof ThemeMapping,
                              e.target.value,
                            )
                          }
                          className="border-2 border-black font-mono uppercase"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">EXPORT</h2>

                <div className="border-4 border-black p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold">TAILWIND CONFIG</h3>
                    <Button
                      onClick={() => handleCopy(generateTailwindConfig(theme))}
                      variant="outline"
                      size="sm"
                      className="border-2 border-black"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <pre className="text-xs font-mono overflow-x-auto">
                    {generateTailwindConfig(theme)}
                  </pre>
                </div>

                <div className="border-4 border-black p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold">CSS VARIABLES</h3>
                    <Button
                      onClick={() => handleCopy(generateCSSVariables(theme))}
                      variant="outline"
                      size="sm"
                      className="border-2 border-black"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <pre className="text-xs font-mono overflow-x-auto">
                    {generateCSSVariables(theme)}
                  </pre>
                </div>
              </div>
            </div>
            <ThemeLivePreview theme={theme} />

            {/* Right Panel - Live Preview */}
            <motion.div
              key={JSON.stringify(theme)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="border-4 border-black p-8 space-y-6"
              style={{
                backgroundColor: theme.background,
                color: theme.foreground,
              }}
            >
              <h2 className="text-3xl font-bold">LIVE PREVIEW</h2>

              {/* Buttons */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase">Buttons</h3>
                <div className="flex gap-3 flex-wrap">
                  <button
                    className="px-6 py-3 border-2 font-bold"
                    style={{
                      backgroundColor: theme.primary,
                      color: theme.background,
                      borderColor: theme.primary,
                    }}
                  >
                    PRIMARY
                  </button>
                  <button
                    className="px-6 py-3 border-2 font-bold"
                    style={{
                      backgroundColor: theme.secondary,
                      color: theme.background,
                      borderColor: theme.secondary,
                    }}
                  >
                    SECONDARY
                  </button>
                  <button
                    className="px-6 py-3 border-2 font-bold"
                    style={{
                      backgroundColor: "transparent",
                      color: theme.foreground,
                      borderColor: theme.border,
                    }}
                  >
                    OUTLINE
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase">Cards</h3>
                <div
                  className="border-4 p-6 space-y-3"
                  style={{ borderColor: theme.border }}
                >
                  <h4 className="text-xl font-bold">Card Title</h4>
                  <p className="text-sm" style={{ color: theme.muted }}>
                    This is a card component with your custom theme applied. It
                    uses the border and muted colors.
                  </p>
                  <button
                    className="px-4 py-2 border-2 font-bold text-sm"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.background,
                      borderColor: theme.accent,
                    }}
                  >
                    ACCENT BUTTON
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase">Inputs</h3>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 border-2 font-mono"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.foreground,
                    borderColor: theme.border,
                  }}
                />
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase">Badges</h3>
                <div className="flex gap-2 flex-wrap">
                  <span
                    className="px-3 py-1 text-xs font-bold border-2"
                    style={{
                      backgroundColor: theme.primary,
                      color: theme.background,
                      borderColor: theme.primary,
                    }}
                  >
                    PRIMARY
                  </span>
                  <span
                    className="px-3 py-1 text-xs font-bold border-2"
                    style={{
                      backgroundColor: theme.secondary,
                      color: theme.background,
                      borderColor: theme.secondary,
                    }}
                  >
                    SECONDARY
                  </span>
                  <span
                    className="px-3 py-1 text-xs font-bold border-2"
                    style={{
                      backgroundColor: theme.destructive,
                      color: theme.background,
                      borderColor: theme.destructive,
                    }}
                  >
                    DESTRUCTIVE
                  </span>
                </div>
              </div>

              {/* Alert */}
              <div
                className="border-4 p-4"
                style={{
                  backgroundColor: theme.muted,
                  borderColor: theme.border,
                }}
              >
                <h4 className="text-sm font-bold mb-2">ALERT MESSAGE</h4>
                <p className="text-xs">
                  This is an alert component using the muted background color.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <main className="max-w-7xl mx-auto p-8"></main>
    </div>
  );
}
