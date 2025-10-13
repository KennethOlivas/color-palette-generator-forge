import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  generateTailwindConfig,
  generateCSSVariables,
} from "@/lib/theme-utils";
import type { ThemeMapping } from "@/lib/theme-utils";

interface ThemeExportPanelProps {
  theme: ThemeMapping;
  onCopy: (text: string, type: string) => void;
}

export function ThemeExportPanel({ theme, onCopy }: ThemeExportPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">EXPORT</h2>
      <div className="border-4 border-black p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold">TAILWIND CONFIG</h3>
          <Button
            onClick={() => onCopy(generateTailwindConfig(theme), "tailwind")}
            variant="outline"
            size="sm"
            className="border-2 border-black"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <pre className="text-xs font-mono overflow-x-auto">
          {generateTailwindConfig(theme)}
        </pre>
      </div>
      <div className="border-4 border-black p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold">CSS VARIABLES</h3>
          <Button
            onClick={() => onCopy(generateCSSVariables(theme), "css")}
            variant="outline"
            size="sm"
            className="border-2 border-black"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <pre className="text-xs font-mono overflow-x-auto">
          {generateCSSVariables(theme)}
        </pre>
      </div>
    </div>
  );
}
