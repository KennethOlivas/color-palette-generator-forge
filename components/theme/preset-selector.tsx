import { motion } from "framer-motion";
import { themePresets } from "@/lib/theme-presets";

interface PresetSelectorProps {
  selectedPreset: string | null;
  onSelect: (presetName: string) => void;
}

export function PresetSelector({ selectedPreset, onSelect }: PresetSelectorProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">PRESETS</h2>
      <div className="grid grid-cols-2 gap-3">
        {themePresets.map((preset) => (
          <motion.button
            key={preset.name}
            onClick={() => onSelect(preset.name)}
            className={`p-4 border-4 border-black text-left font-bold transition-colors ${
              selectedPreset === preset.name ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-lg mb-1">{preset.name.toUpperCase()}</div>
            <div className="text-xs opacity-70">{preset.description}</div>
            <div className="flex gap-1 mt-2">
              {Object.values(preset.theme)
                .slice(0, 5)
                .map((color, i) => (
                  <div key={i} className="w-6 h-6 border-2 border-black" style={{ backgroundColor: color }} />
                ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
