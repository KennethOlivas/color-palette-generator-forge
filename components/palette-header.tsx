import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, Minus, Download, FolderOpen } from "lucide-react"
import { Navigation } from "./navigation"
import { motion } from "framer-motion"

interface PaletteHeaderProps {
    colorCount?: number
    isGenerating?: boolean
    onAddColor?: () => void
    onRemoveColor?: () => void
    onGenerate?: () => void
    onShowExport?: () => void
    onShowSaved?: () => void
    showRightButtons: boolean // Only show on index page
}

export function PaletteHeader({
  colorCount,
  isGenerating,
  onAddColor,
  onRemoveColor,
  onGenerate,
  onShowExport,
  onShowSaved,
  showRightButtons = true,
}: PaletteHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}
      className="border-b-4 border-black p-6 bg-white"
    >
      <div className="mx-auto flex items-center justify-between">
        <h1 className="text-5xl font-bold tracking-tight">COLORFORGE</h1>
        <Navigation />
        {showRightButtons && (
          <div className="flex items-center gap-4">
            <Button
              onClick={onShowSaved}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <FolderOpen className="h-5 w-5 mr-2" />
              LIBRARY
            </Button>
            <Button
              onClick={onShowExport}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <Download className="h-5 w-5 mr-2" />
              EXPORT
            </Button>
            <Button
              onClick={onRemoveColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={(colorCount ?? 0) <= 2}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">{colorCount ?? 0}</span>
            <Button
              onClick={onAddColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={(colorCount ?? 0) >= 10}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              onClick={onGenerate}
              className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold transition-colors duration-0"
            >
              <motion.div
                animate={isGenerating ? { scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
              </motion.div>
              GENERATE
            </Button>
          </div>
        )}
      </div>
    </motion.header>
  )
}
