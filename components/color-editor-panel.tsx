"use client";

import { useState, useEffect } from "react";
import {
  type Color,
  hexToHsl,
  hslToHex,
  getContrastColor,
} from "@/lib/color-utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface ColorEditorPanelProps {
  color: Color;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onColorChange: (newColor: Color) => void;
}

export function ColorEditorPanel({
  color,
  open,
  onOpenChange,
  onColorChange,
}: ColorEditorPanelProps) {
  const [format, setFormat] = useState<"hex" | "rgb" | "hsl">("hex");
  const [localColor, setLocalColor] = useState<Color>(color);

  useEffect(() => {
    if (open) setLocalColor(color);
  }, [color, open]);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (x: number) => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgb = hexToRgb(localColor.hex);

  const handleHslChange = (type: "h" | "s" | "l", value: number) => {
    const newHsl = { ...localColor.hsl, [type]: value };
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setLocalColor({
      hex: newHex,
      hsl: newHsl,
      locked: localColor.locked,
    });
  };

  const handleRgbChange = (type: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [type]: value };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const newHsl = hexToHsl(newHex);
    setLocalColor({
      hex: newHex,
      hsl: newHsl,
      locked: localColor.locked,
    });
  };

  const handleHexChange = (hex: string) => {
    if (/^#?[0-9A-Fa-f]{0,6}$/.test(hex)) {
      const fullHex = hex.startsWith("#") ? hex : `#${hex}`;
      if (fullHex.length === 7) {
        const hsl = hexToHsl(fullHex);
        setLocalColor({ hex: fullHex, hsl, locked: localColor.locked });
      } else {
        setLocalColor({ ...localColor, hex: fullHex });
      }
    }
  };

  const handleSave = () => {
    onColorChange(localColor);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="max-w-2xl p-8 border-4 border-black bg-white"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-3xl font-bold">COLOR EDITOR</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Adjust this color in HEX, RGB, or HSL format.
        </DialogDescription>

        {/* Color Preview */}
        <div
          className="w-full h-32 border-4 border-black mb-6 flex items-center justify-center"
          style={{ backgroundColor: localColor.hex }}
        >
          <span
            className="text-4xl font-bold"
            style={{ color: getContrastColor(localColor.hex) }}
          >
            {localColor.hex}
          </span>
        </div>

        {/* Format Selector */}
        <div className="flex gap-2 mb-6">
          {(["hex", "rgb", "hsl"] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFormat(f)}
              variant={format === f ? "default" : "outline"}
              className={`border-2 border-black font-bold ${
                format === f
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              {f.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {format === "hsl" && (
            <>
              <div>
                <label className="block text-sm font-bold mb-2">
                  HUE: {localColor.hsl.h}°
                </label>
                <Slider
                  value={[localColor.hsl.h]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(v) => handleHslChange("h", v[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  SATURATION: {localColor.hsl.s}%
                </label>
                <Slider
                  value={[localColor.hsl.s]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => handleHslChange("s", v[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  LIGHTNESS: {localColor.hsl.l}%
                </label>
                <Slider
                  value={[localColor.hsl.l]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => handleHslChange("l", v[0])}
                  className="w-full"
                />
              </div>
            </>
          )}

          {format === "rgb" && (
            <>
              <div>
                <label className="block text-sm font-bold mb-2">
                  RED: {rgb.r}
                </label>
                <Slider
                  value={[rgb.r]}
                  min={0}
                  max={255}
                  step={1}
                  onValueChange={(v) => handleRgbChange("r", v[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  GREEN: {rgb.g}
                </label>
                <Slider
                  value={[rgb.g]}
                  min={0}
                  max={255}
                  step={1}
                  onValueChange={(v) => handleRgbChange("g", v[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  BLUE: {rgb.b}
                </label>
                <Slider
                  value={[rgb.b]}
                  min={0}
                  max={255}
                  step={1}
                  onValueChange={(v) => handleRgbChange("b", v[0])}
                  className="w-full"
                />
              </div>
            </>
          )}

          {format === "hex" && (
            <div>
              <label className="block text-sm font-bold mb-2">HEX CODE</label>
              <input
                type="text"
                value={localColor.hex}
                onChange={(e) => handleHexChange(e.target.value)}
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
              <div>{localColor.hex}</div>
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
                {localColor.hsl.h}°, {localColor.hsl.s}%, {localColor.hsl.l}%
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="mt-6 flex justify-end">
            <Button
              variant="default"
              className="border-2 border-black font-bold bg-black text-white hover:bg-gray-800"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
