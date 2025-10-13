import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import type { ThemeMapping } from "@/lib/theme-utils";

interface ColorTokensEditorProps {
  theme: ThemeMapping;
  onColorChange: (token: keyof ThemeMapping, hex: string) => void;
}

export function ColorTokensEditor({
  theme,
  onColorChange,
}: ColorTokensEditorProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">COLOR TOKENS</h2>
      <div className="space-y-3">
        {Object.entries(theme).map(([token, hex]) => (
          <motion.div
            key={token}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-12 h-12 border-4 border-black"
              style={{ backgroundColor: hex }}
            />
            <div className="flex-1">
              <label className="text-sm font-bold uppercase">{token}</label>
              <Input
                type="text"
                value={hex}
                onChange={(e) =>
                  onColorChange(token as keyof ThemeMapping, e.target.value)
                }
                className="border-2 border-black font-mono uppercase"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
