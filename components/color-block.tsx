"use client"

import { useState } from "react"
import { type Color, getContrastColor, hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils"
import { Lock, Unlock, Copy, Check, Edit, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColorEditorPanel } from "./color-editor-panel"
import { motion } from "framer-motion"

interface ColorBlockProps {
  color: Color
  onToggleLock: () => void
  onColorChange: (newColor: Color) => void
  index: number
}

export function ColorBlock({ color, onToggleLock, onColorChange }: ColorBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(color.hex)
  const [showEditor, setShowEditor] = useState(false)

  const textColor = getContrastColor(color.hex)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleHexEdit = () => {
    if (isValidHex(editValue)) {
      const hsl = hexToHsl(editValue)
      onColorChange({
        hex: editValue.startsWith("#") ? editValue : `#${editValue}`,
        hsl,
        locked: color.locked,
      })
      setIsEditing(false)
    }
  }

  const handleHslChange = (type: "h" | "s" | "l", value: number) => {
    const newHsl = { ...color.hsl, [type]: value }
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    onColorChange({
      hex: newHex,
      hsl: newHsl,
      locked: color.locked,
    })
  }

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center h-full min-h-[300px] border-4 border-black cursor-hover"
        style={{ backgroundColor: color.hex }}
      >
        {!color.locked && (
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity">
            <GripVertical className="h-8 w-8" style={{ color: textColor }} />
          </div>
        )}

        {/* Lock/Unlock Button */}
    
          <Button
            onClick={onToggleLock}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 border-2 border-black hover:bg-black/10"
            style={{ color: textColor }}
          >
            {color.locked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
          </Button>
      

        <Button
          onClick={() => setShowEditor(true)}
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 border-2 border-black hover:bg-black/10"
          style={{ color: textColor }}
        >
          <Edit className="h-5 w-5" />
        </Button>

        {/* HEX Display/Edit */}
        <div className="flex flex-col items-center gap-4">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleHexEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleHexEdit()
                if (e.key === "Escape") {
                  setIsEditing(false)
                  setEditValue(color.hex)
                }
              }}
              className="text-4xl font-bold tracking-tight bg-transparent border-b-4 border-current text-center uppercase font-mono outline-none w-48"
              style={{ color: textColor }}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-4xl font-bold tracking-tight uppercase font-mono hover:underline cursor-hover"
              style={{ color: textColor }}
            >
              {color.hex}
            </button>
          )}

          {/* Copy Button */}
          <motion.div
            animate={copied ? { backgroundColor: [textColor, "transparent", textColor, "transparent"] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="border-2 border-current font-bold bg-transparent"
              style={{ color: textColor, borderColor: textColor }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  COPY
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* HSL Sliders */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold w-4" style={{ color: textColor }}>
              H
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={color.hsl.h}
              onChange={(e) => handleHslChange("h", Number.parseInt(e.target.value))}
              className="flex-1 h-2 accent-current"
              style={{ accentColor: textColor }}
            />
            <span className="text-xs font-bold w-8 text-right" style={{ color: textColor }}>
              {color.hsl.h}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold w-4" style={{ color: textColor }}>
              S
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={color.hsl.s}
              onChange={(e) => handleHslChange("s", Number.parseInt(e.target.value))}
              className="flex-1 h-2 accent-current"
              style={{ accentColor: textColor }}
            />
            <span className="text-xs font-bold w-8 text-right" style={{ color: textColor }}>
              {color.hsl.s}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold w-4" style={{ color: textColor }}>
              L
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={color.hsl.l}
              onChange={(e) => handleHslChange("l", Number.parseInt(e.target.value))}
              className="flex-1 h-2 accent-current"
              style={{ accentColor: textColor }}
            />
            <span className="text-xs font-bold w-8 text-right" style={{ color: textColor }}>
              {color.hsl.l}
            </span>
          </div>
        </div>
      </div>

      {showEditor && (
        <ColorEditorPanel color={color} onColorChange={onColorChange} onClose={() => setShowEditor(false)} />
      )}
    </>
  )
}
