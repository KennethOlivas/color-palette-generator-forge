"use client"

import { useState, useEffect, useCallback } from "react"
import { type Color, generatePalette } from "@/lib/color-utils"
import { PaletteHeader } from "./palette-header"
import { PaletteFooter } from "./palette-footer"
import { PaletteBlocks } from "./palette-blocks"
import { ExportModal } from "./export-modal"
import { SavedPalettesModal } from "./saved-palettes-modal"

export function PaletteGenerator() {
  const [colors, setColors] = useState<Color[]>([])
  const [colorCount, setColorCount] = useState(5)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate initial palette
  useEffect(() => {
    setColors(generatePalette(colorCount))
  }, [])

  // Generate new palette (respecting locked colors)
  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      setColors(generatePalette(colorCount, colors))
      setIsGenerating(false)
    }, 200)
  }, [colorCount, colors])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Space - Generate new palette
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault()
        handleGenerate()
      }
      // L - Lock/unlock first unlocked color
      if (e.key === "l" || e.key === "L") {
        const firstUnlocked = colors.findIndex((c) => !c.locked)
        if (firstUnlocked !== -1) {
          handleToggleLock(firstUnlocked)
        }
      }
      // C - Copy first color
      if (e.key === "c" || e.key === "C") {
        if (colors[0]) {
          navigator.clipboard.writeText(colors[0].hex)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [colors, handleGenerate])

  const handleToggleLock = (index: number) => {
    setColors((prev) => prev.map((color, i) => (i === index ? { ...color, locked: !color.locked } : color)))
  }

  const handleColorChange = (index: number, newColor: Color) => {
    setColors((prev) => prev.map((color, i) => (i === index ? newColor : color)))
  }

  const handleAddColor = () => {
    if (colorCount < 10) {
      setColorCount((prev) => prev + 1)
      setColors((prev) => [...prev, generatePalette(1)[0]])
    }
  }

  const handleRemoveColor = () => {
    if (colorCount > 2) {
      setColorCount((prev) => prev - 1)
      setColors((prev) => prev.slice(0, -1))
    }
  }

  const handleLoadPalette = (loadedColors: Color[]) => {
    setColors(loadedColors)
    setColorCount(loadedColors.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <PaletteHeader
        colorCount={colorCount}
        isGenerating={isGenerating}
        onAddColor={handleAddColor}
        onRemoveColor={handleRemoveColor}
        onGenerate={handleGenerate}
        onShowExport={() => setShowExportModal(true)}
        onShowSaved={() => setShowSavedModal(true)}
        showRightButtons={true}
      />

      <PaletteBlocks
        colors={colors}
        onReorder={setColors}
        onToggleLock={handleToggleLock}
        onColorChange={handleColorChange}
      />

      {/* Footer with keyboard shortcuts */}
      <PaletteFooter />

      {/* Modals */}
      {showExportModal && (
        <ExportModal
          colors={colors}
          onClose={() => setShowExportModal(false)}
          onSave={() => setShowExportModal(false)}
        />
      )}
      {showSavedModal && <SavedPalettesModal onClose={() => setShowSavedModal(false)} onLoad={handleLoadPalette} />}
    </div>
  )
}
