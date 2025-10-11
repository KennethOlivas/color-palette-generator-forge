"use client"

import { useState, useEffect } from "react"
import type { Color } from "@/lib/color-utils"
import { getSavedPalettes, deletePaletteFromStorage, type SavedPalette } from "@/lib/export-utils"
import { Button } from "@/components/ui/button"
import { X, Trash2 } from "lucide-react"

interface SavedPalettesModalProps {
  onClose: () => void
  onLoad: (colors: Color[]) => void
}

export function SavedPalettesModal({ onClose, onLoad }: SavedPalettesModalProps) {
  const [palettes, setPalettes] = useState<SavedPalette[]>([])

  useEffect(() => {
    setPalettes(getSavedPalettes())
  }, [])

  const handleDelete = (id: string) => {
    deletePaletteFromStorage(id)
    setPalettes(getSavedPalettes())
  }

  const handleLoad = (palette: SavedPalette) => {
    onLoad(palette.colors)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-4xl w-full p-8 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">SAVED PALETTES</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="border-2 border-black hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Palettes List */}
        {palettes.length === 0 ? (
          <div className="border-4 border-black p-12 text-center bg-gray-50">
            <p className="font-bold text-lg">NO SAVED PALETTES YET</p>
            <p className="text-sm mt-2">Save your first palette to see it here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {palettes.map((palette) => (
              <div key={palette.id} className="border-4 border-black p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{palette.name}</h3>
                    <p className="text-xs font-bold text-gray-600">
                      {new Date(palette.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLoad(palette)}
                      className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold"
                    >
                      LOAD
                    </Button>
                    <Button
                      onClick={() => handleDelete(palette.id)}
                      variant="ghost"
                      size="icon"
                      className="border-2 border-black hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex h-12 border-2 border-black">
                  {palette.colors.map((color, index) => (
                    <div key={index} className="flex-1" style={{ backgroundColor: color.hex }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
