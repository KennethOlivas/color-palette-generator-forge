"use client"

import { useState } from "react"
import { type Color, hexToHsl, hslToHex, getContrastColor } from "@/lib/color-utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ColorEditorPanelProps {
  color: Color
  onColorChange: (newColor: Color) => void
  onClose: () => void
}

export function ColorEditorPanel({ color, onColorChange, onClose }: ColorEditorPanelProps) {
  const [format, setFormat] = useState<"hex" | "rgb" | "hsl">("hex")

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (x: number) => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const rgb = hexToRgb(color.hex)

  const handleHslChange = (type: "h" | "s" | "l", value: number) => {
    const newHsl = { ...color.hsl, [type]: value }
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    onColorChange({
      hex: newHex,
      hsl: newHsl,
      locked: color.locked,
    })
  }

  const handleRgbChange = (type: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [type]: value }
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    const newHsl = hexToHsl(newHex)
    onColorChange({
      hex: newHex,
      hsl: newHsl,
      locked: color.locked,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-2xl w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">COLOR EDITOR</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="border-2 border-black hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Color Preview */}
        <div
          className="w-full h-32 border-4 border-black mb-6 flex items-center justify-center"
          style={{ backgroundColor: color.hex }}
        >
          <span className="text-4xl font-bold" style={{ color: getContrastColor(color.hex) }}>
            {color.hex}
          </span>
        </div>

        {/* Format Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setFormat("hex")}
            variant={format === "hex" ? "default" : "outline"}
            className={`border-2 border-black font-bold ${
              format === "hex" ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            HEX
          </Button>
          <Button
            onClick={() => setFormat("rgb")}
            variant={format === "rgb" ? "default" : "outline"}
            className={`border-2 border-black font-bold ${
              format === "rgb" ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            RGB
          </Button>
          <Button
            onClick={() => setFormat("hsl")}
            variant={format === "hsl" ? "default" : "outline"}
            className={`border-2 border-black font-bold ${
              format === "hsl" ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            HSL
          </Button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {format === "hsl" && (
            <>
              <div>
                <label className="block text-sm font-bold mb-2">HUE: {color.hsl.h}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={color.hsl.h}
                  onChange={(e) => handleHslChange("h", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">SATURATION: {color.hsl.s}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={color.hsl.s}
                  onChange={(e) => handleHslChange("s", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">LIGHTNESS: {color.hsl.l}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={color.hsl.l}
                  onChange={(e) => handleHslChange("l", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
            </>
          )}

          {format === "rgb" && (
            <>
              <div>
                <label className="block text-sm font-bold mb-2">RED: {rgb.r}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange("r", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">GREEN: {rgb.g}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange("g", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">BLUE: {rgb.b}</label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange("b", Number.parseInt(e.target.value))}
                  className="w-full h-4 accent-black"
                />
              </div>
            </>
          )}

          {format === "hex" && (
            <div>
              <label className="block text-sm font-bold mb-2">HEX CODE</label>
              <input
                type="text"
                value={color.hex}
                onChange={(e) => {
                  const hex = e.target.value
                  if (/^#?[0-9A-Fa-f]{0,6}$/.test(hex)) {
                    const fullHex = hex.startsWith("#") ? hex : `#${hex}`
                    if (fullHex.length === 7) {
                      const hsl = hexToHsl(fullHex)
                      onColorChange({ hex: fullHex, hsl, locked: color.locked })
                    }
                  }
                }}
                className="w-full border-4 border-black p-3 text-xl font-bold uppercase font-mono"
              />
            </div>
          )}
        </div>

        {/* Color Values Display */}
        <div className="mt-6 p-4 border-4 border-black bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-sm font-bold">
            <div>
              <div className="text-xs mb-1">HEX</div>
              <div>{color.hex}</div>
            </div>
            <div>
              <div className="text-xs mb-1">RGB</div>
              <div>
                {rgb.r}, {rgb.g}, {rgb.b}
              </div>
            </div>
            <div>
              <div className="text-xs mb-1">HSL</div>
              <div>
                {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
