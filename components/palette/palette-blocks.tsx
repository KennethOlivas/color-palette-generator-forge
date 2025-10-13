import { Reorder } from "framer-motion";
import { useRef } from "react";
import { ColorBlock } from "./color-block";
import { type Color } from "@/lib/color-utils";
import { useState, useEffect } from "react";

interface PaletteBlocksProps {
  colors: Color[];
  onReorder: (colors: Color[]) => void;
  onToggleLock: (index: number) => void;
  onColorChange: (index: number, newColor: Color) => void;
}

export function PaletteBlocks({
  colors,
  onReorder,
  onToggleLock,
  onColorChange,
}: PaletteBlocksProps) {
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemRefs = useRef<any[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Reorder.Group
      axis={isMobile ? "y" : "x"}
      values={colors}
      onReorder={onReorder}
      className={`flex-1 flex ${isMobile ? "flex-col" : "flex-row"}`}
      as="div"
    >
      {colors.map((color, idx) => (
        <Reorder.Item
          key={color.hex}
          value={color}
          className="flex-1"
          drag={!color.locked ? (isMobile ? "y" : "x") : false}
          dragListener={!isMobile}
          dragElastic={0}
          dragMomentum={false}
          whileDrag={{ zIndex: 10, boxShadow: "0 0 0 4px black" }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={(el: any) => (itemRefs.current[idx] = el)}
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
  );
}
