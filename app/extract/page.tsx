"use client";

import type React from "react";

import { useState } from "react";
import {
  extractColorsFromImage,
  type ExtractedColor,
} from "@/lib/image-color-extractor";
import { Navigation } from "@/components/common/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Download, Copy, Check } from "lucide-react";
import { getContrastColor } from "@/lib/color-utils";
import { PaletteHeader } from "@/components/common/header";

export default function ExtractPage() {
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [colorCount, setColorCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Extract colors
    setIsProcessing(true);
    try {
      const colors = await extractColorsFromImage(file, colorCount);
      setExtractedColors(colors);
    } catch (error) {
      console.error("Error extracting colors:", error);
      alert("Failed to extract colors from image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async (hex: string, index: number) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExportPalette = () => {
    const colors = extractedColors.map((c) => c.hex).join("\n");
    const blob = new Blob([colors], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <PaletteHeader showRightButtons={false} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">IMAGE COLOR EXTRACTOR</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-4">
              <div className="border-4 border-black p-8 bg-gray-50">
                <label className="block mb-4">
                  <span className="text-sm font-bold mb-2 block">
                    NUMBER OF COLORS: {colorCount}
                  </span>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={colorCount}
                    onChange={(e) =>
                      setColorCount(Number.parseInt(e.target.value))
                    }
                    className="w-full h-4 accent-black"
                  />
                </label>

                <label className="cursor-pointer">
                  <div className="border-4 border-dashed border-black p-12 text-center hover:bg-gray-100 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-bold text-lg">CLICK TO UPLOAD IMAGE</p>
                    <p className="text-sm mt-2">JPG, PNG, WEBP</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {imagePreview && (
                <div className="border-4 border-black">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Uploaded"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {isProcessing && (
                <div className="border-4 border-black p-12 text-center">
                  <p className="font-bold text-xl">PROCESSING...</p>
                </div>
              )}

              {!isProcessing && extractedColors.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">EXTRACTED COLORS</h3>
                    <Button
                      onClick={handleExportPalette}
                      className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      EXPORT
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {extractedColors.map((color, index) => (
                      <div
                        key={index}
                        className="border-4 border-black flex items-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="flex-1 p-6">
                          <p
                            className="text-2xl font-bold"
                            style={{ color: getContrastColor(color.hex) }}
                          >
                            {color.hex}
                          </p>
                          <p
                            className="text-sm font-bold"
                            style={{ color: getContrastColor(color.hex) }}
                          >
                            {color.percentage.toFixed(1)}%
                          </p>
                        </div>
                        <Button
                          onClick={() => handleCopy(color.hex, index)}
                          variant="ghost"
                          size="icon"
                          className="mr-4 border-2 border-current"
                          style={{
                            color: getContrastColor(color.hex),
                            borderColor: getContrastColor(color.hex),
                          }}
                        >
                          {copiedIndex === index ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {!isProcessing && extractedColors.length === 0 && (
                <div className="border-4 border-black p-12 text-center bg-gray-50">
                  <p className="font-bold text-lg">
                    UPLOAD AN IMAGE TO EXTRACT COLORS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
