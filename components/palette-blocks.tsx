import { Reorder } from "framer-motion"
import { ColorBlock } from "./color-block"
import { type Color } from "@/lib/color-utils"

interface PaletteBlocksProps {
  colors: Color[]
  onReorder: (colors: Color[]) => void
  onToggleLock: (index: number) => void
  onColorChange: (index: number, newColor: Color) => void
}

export function PaletteBlocks({ colors, onReorder, onToggleLock, onColorChange }: PaletteBlocksProps) {
  return (
    <Reorder.Group axis="x" values={colors} onReorder={onReorder} className="flex-1 flex" as="div">
      {colors.map((color, idx) => (
        <Reorder.Item
          key={color.hex}
          value={color}
          className="flex-1"
          drag={!color.locked ? "x" : false}
          dragElastic={0}
          dragMomentum={false}
          whileDrag={{ zIndex: 10, boxShadow: "0 0 0 4px black" }}
        >
          <ColorBlock
            color={color}
            index={idx}
            onToggleLock={() => onToggleLock(idx)}
            onColorChange={(newColor) => onColorChange(idx, newColor)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
