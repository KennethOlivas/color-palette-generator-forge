"use client";

import { useState } from "react";
import type { Color } from "@/lib/color-utils";
import {
  exportAsCSS,
  exportAsJSON,
  exportAsSVG,
  exportAsASE,
  exportAsGPL,
  downloadFile,
  savePaletteToStorage,
} from "@/lib/export-utils";
import { Button } from "@/components/ui/button";
import { X, Download, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ExportModalProps {
  colors: Color[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

export function ExportModal({
  colors,
  open,
  onOpenChange,
  onSave,
}: ExportModalProps) {
  const [paletteName, setPaletteName] = useState("My Palette");
  const [exportFormat, setExportFormat] = useState<
    "css" | "json" | "svg" | "ase" | "gpl"
  >("css");

  const handleExport = () => {
    let content = "";
    let filename = "";
    let mimeType = "";

    switch (exportFormat) {
      case "css":
        content = exportAsCSS(
          colors,
          paletteName.toLowerCase().replace(/\s+/g, "-"),
        );
        filename = `${paletteName.toLowerCase().replace(/\s+/g, "-")}.css`;
        mimeType = "text/css";
        break;
      case "json":
        content = exportAsJSON(colors);
        filename = `${paletteName.toLowerCase().replace(/\s+/g, "-")}.json`;
        mimeType = "application/json";
        break;
      case "svg":
        content = exportAsSVG(colors);
        filename = `${paletteName.toLowerCase().replace(/\s+/g, "-")}.svg`;
        mimeType = "image/svg+xml";
        break;
      case "ase":
        content = exportAsASE(colors, paletteName);
        filename = `${paletteName.toLowerCase().replace(/\s+/g, "-")}.ase`;
        mimeType = "text/plain";
        break;
      case "gpl":
        content = exportAsGPL(colors, paletteName);
        filename = `${paletteName.toLowerCase().replace(/\s+/g, "-")}.gpl`;
        mimeType = "text/plain";
        break;
    }

    downloadFile(content, filename, mimeType);
  };

  const handleSave = () => {
    const palette = {
      id: Date.now().toString(),
      name: paletteName,
      colors: colors.map((c) => ({ ...c, locked: false })),
      createdAt: new Date().toISOString(),
    };
    savePaletteToStorage(palette);
    onSave?.();
    onOpenChange(false);
    toast.success(`Palette "${paletteName}" saved to library!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-8 border-4 border-black bg-white"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-3xl font-bold">
            SAVE & EXPORT
          </DialogTitle>
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
          Save or export your generated color palette in multiple formats.
        </DialogDescription>

        {/* Palette Preview */}
        <div className="mb-6">
          <div className="flex h-20 border-4 border-black">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex-1"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Palette Name */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">PALETTE NAME</label>
          <input
            type="text"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            className="w-full border-4 border-black p-3 text-xl font-bold"
            placeholder="My Palette"
          />
        </div>

        {/* Save to Local Storage */}
        <div className="mb-6">
          <Button
            onClick={handleSave}
            className="w-full border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold"
          >
            <Save className="h-5 w-5 mr-2" />
            SAVE TO LIBRARY
          </Button>
        </div>

        {/* Export Format */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">EXPORT FORMAT</label>
          <div className="grid grid-cols-5 gap-2">
            {(["css", "json", "svg", "ase", "gpl"] as const).map((format) => (
              <Button
                key={format}
                onClick={() => setExportFormat(format)}
                variant={exportFormat === format ? "default" : "outline"}
                className={`border-2 border-black font-bold ${
                  exportFormat === format
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          className="w-full border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold"
        >
          <Download className="h-5 w-5 mr-2" />
          EXPORT AS {exportFormat.toUpperCase()}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
