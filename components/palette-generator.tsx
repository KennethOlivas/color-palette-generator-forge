"use client"

import { useState, useEffect, useCallback } from "react"
import { type Color, generatePalette } from "@/lib/color-utils"
import { ColorBlock } from "./color-block"
import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, Minus, Download, FolderOpen } from "lucide-react"
import { Navigation } from "./navigation"
import { ExportModal } from "./export-modal"
import { SavedPalettesModal } from "./saved-palettes-modal"
import { motion, Reorder } from "framer-motion"

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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "linear", duration: 0.15 }}
        className="border-b-4 border-black p-6 bg-white"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-bold tracking-tight">COLORFORGE</h1>
          <Navigation />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowSavedModal(true)}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <FolderOpen className="h-5 w-5 mr-2" />
              LIBRARY
            </Button>
            <Button
              onClick={() => setShowExportModal(true)}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <Download className="h-5 w-5 mr-2" />
              EXPORT
            </Button>
            <Button
              onClick={handleRemoveColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={colorCount <= 2}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">{colorCount}</span>
            <Button
              onClick={handleAddColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={colorCount >= 10}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleGenerate}
              className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold transition-colors duration-0"
            >
              <motion.div animate={isGenerating ? { rotate: 360 } : {}} transition={{ duration: 0.2, ease: "linear" }}>
                <RefreshCw className="h-5 w-5 mr-2" />
              </motion.div>
              GENERATE
            </Button>
          </div>
        </div>
      </motion.header>

      <Reorder.Group axis="x" values={colors} onReorder={setColors} className="flex-1 flex" as="div">
        {colors.map((color) => (
          <Reorder.Item
            key={color.hex}
            value={color}
            className="flex-1"
            drag={!color.locked ? "x" : false}
            dragElastic={0}
            dragMomentum={false}
            whileDrag={{ scale: 1.02, zIndex: 10, boxShadow: "0 0 0 4px black" }}
          >
            <ColorBlock
              color={color}
              index={colors.indexOf(color)}
              onToggleLock={() => handleToggleLock(colors.indexOf(color))}
              onColorChange={(newColor) => handleColorChange(colors.indexOf(color), newColor)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Footer with keyboard shortcuts */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "linear", duration: 0.15 }}
        className="border-t-4 border-black p-4 bg-white"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 text-sm font-bold">
          <span>SPACE - Generate</span>
          <span>L - Lock/Unlock</span>
          <span>C - Copy</span>
          <span>Drag to Reorder</span>
          <span>Click HEX to Edit</span>
        </div>
      </motion.footer>

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
