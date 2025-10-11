// Export utilities for different formats

import type { Color } from "./color-utils"

export interface SavedPalette {
  id: string
  name: string
  colors: Color[]
  createdAt: string
}

// Export as CSS variables
export function exportAsCSS(colors: Color[], paletteName = "palette"): string {
  let css = `:root {\n`
  colors.forEach((color, index) => {
    css += `  --${paletteName}-${index + 1}: ${color.hex};\n`
  })
  css += `}`
  return css
}

// Export as JSON
export function exportAsJSON(colors: Color[]): string {
  const palette = colors.map((c) => ({
    hex: c.hex,
    hsl: c.hsl,
  }))
  return JSON.stringify(palette, null, 2)
}

// Export as SVG
export function exportAsSVG(colors: Color[]): string {
  const width = 800
  const height = 200
  const colorWidth = width / colors.length

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n`

  colors.forEach((color, index) => {
    const x = index * colorWidth
    svg += `  <rect x="${x}" y="0" width="${colorWidth}" height="${height}" fill="${color.hex}"/>\n`
  })

  svg += `</svg>`
  return svg
}

// Export as ASE (Adobe Swatch Exchange) - simplified text format
export function exportAsASE(colors: Color[], paletteName = "ColorForge Palette"): string {
  let ase = `Adobe Swatch Exchange\n`
  ase += `Palette: ${paletteName}\n\n`

  colors.forEach((color, index) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.hex)
    if (result) {
      const r = (Number.parseInt(result[1], 16) / 255).toFixed(4)
      const g = (Number.parseInt(result[2], 16) / 255).toFixed(4)
      const b = (Number.parseInt(result[3], 16) / 255).toFixed(4)
      ase += `Color ${index + 1}: RGB ${r} ${g} ${b}\n`
    }
  })

  return ase
}

// Export as GPL (GIMP Palette)
/**
 * Exports an array of colors as a GIMP Palette (GPL) formatted string.
 *
 * @param colors - An array of `Color` objects, each containing a hex color value.
 * @param paletteName - The name of the palette to be included in the GPL file. Defaults to "ColorForge Palette".
 * @returns A string representing the palette in GPL format, suitable for import into GIMP.
 *
 * @remarks
 * Each color is converted from its hex representation to RGB values and formatted according to the GPL specification.
 * Colors that do not match the expected hex format are skipped.
 */
export function exportAsGPL(colors: Color[], paletteName = "ColorForge Palette"): string {
  let gpl = `GIMP Palette\n`
  gpl += `Name: ${paletteName}\n`
  gpl += `Columns: ${colors.length}\n`
  gpl += `#\n`

  colors.forEach((color, index) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.hex)
    if (result) {
      const r = Number.parseInt(result[1], 16)
      const g = Number.parseInt(result[2], 16)
      const b = Number.parseInt(result[3], 16)
      gpl += `${r.toString().padStart(3)} ${g.toString().padStart(3)} ${b.toString().padStart(3)} Color ${index + 1}\n`
    }
  })

  return gpl
}

// Download file helper
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// Local storage helpers
export function savePaletteToStorage(palette: SavedPalette) {
  const palettes = getSavedPalettes()
  palettes.push(palette)
  localStorage.setItem("colorforge-palettes", JSON.stringify(palettes))
}

export function getSavedPalettes(): SavedPalette[] {
  const stored = localStorage.getItem("colorforge-palettes")
  return stored ? JSON.parse(stored) : []
}

export function deletePaletteFromStorage(id: string) {
  const palettes = getSavedPalettes().filter((p) => p.id !== id)
  localStorage.setItem("colorforge-palettes", JSON.stringify(palettes))
}

export function loadPaletteFromStorage(id: string): SavedPalette | null {
  const palettes = getSavedPalettes()
  return palettes.find((p) => p.id === id) || null
}
