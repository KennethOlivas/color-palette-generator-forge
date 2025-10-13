import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface ColorStop {
  color: string;
  position: number;
}

interface ColorStopsEditorProps {
  colorStops: ColorStop[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onColorChange: (index: number, color: string) => void;
  onPositionChange: (index: number, position: number) => void;
}

export function ColorStopsEditor({
  colorStops,
  onAdd,
  onRemove,
  onColorChange,
  onPositionChange,
}: ColorStopsEditorProps) {
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">COLOR STOPS</h3>
        <Button
          onClick={onAdd}
          variant="outline"
          size="icon"
          className="border-2 border-black hover:bg-black hover:text-white bg-transparent"
          disabled={colorStops.length >= 5}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-4">
        {colorStops.map((stop, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => onColorChange(index, e.target.value)}
                className="w-12 h-12 border-4 border-black cursor-pointer"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => onColorChange(index, e.target.value)}
                className="flex-1 border-4 border-black p-2 text-lg font-bold uppercase font-mono"
              />
              {colorStops.length > 2 && (
                <Button
                  onClick={() => onRemove(index)}
                  variant="ghost"
                  size="icon"
                  className="border-2 border-black hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                POSITION: {stop.position}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) =>
                  onPositionChange(index, Number.parseInt(e.target.value))
                }
                className="w-full h-3 accent-black"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
