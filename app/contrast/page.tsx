"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  checkContrast,
  suggestAccessibleColor,
  type ContrastResult,
} from "@/lib/contrast-utils";
import { Check, X, AlertCircle } from "lucide-react";
import { isValidHex } from "@/lib/color-utils";
import { PaletteHeader } from "@/components/common/header";

export default function ContrastPage() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [result, setResult] = useState<ContrastResult | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleCheck = () => {
    if (isValidHex(foreground) && isValidHex(background)) {
      const contrastResult = checkContrast(foreground, background);
      setResult(contrastResult);

      // Generate suggestion if contrast is insufficient
      if (!contrastResult.aa.normal) {
        const suggested = suggestAccessibleColor(foreground, background, 4.5);
        setSuggestion(suggested);
      } else {
        setSuggestion(null);
      }
    }
  };

  const handleSwap = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
    setResult(null);
    setSuggestion(null);
  };

  const applySuggestion = () => {
    if (suggestion) {
      setForeground(suggestion);
      setSuggestion(null);
      // Auto-check with new color
      setTimeout(() => {
        const contrastResult = checkContrast(suggestion, background);
        setResult(contrastResult);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <PaletteHeader showRightButtons={false} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center md:text-left">CONTRAST CHECKER</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="border-4 border-black p-4 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-4">COLORS</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      FOREGROUND (TEXT)
                    </label>
                    <div className="flex flex-col md:flex-row gap-2">
                      <input
                        type="color"
                        value={foreground}
                        onChange={(e) => {
                          setForeground(e.target.value);
                          setResult(null);
                        }}
                        className="w-full md:w-16 h-12 md:h-16 border-4 border-black cursor-pointer rounded"
                      />
                      <input
                        type="text"
                        value={foreground}
                        onChange={(e) => {
                          setForeground(e.target.value);
                          setResult(null);
                        }}
                        className="flex-1 border-4 border-black p-3 text-lg md:text-xl font-bold uppercase font-mono rounded"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      BACKGROUND
                    </label>
                    <div className="flex flex-col md:flex-row gap-2">
                      <input
                        type="color"
                        value={background}
                        onChange={(e) => {
                          setBackground(e.target.value);
                          setResult(null);
                        }}
                        className="w-full md:w-16 h-12 md:h-16 border-4 border-black cursor-pointer rounded"
                      />
                      <input
                        type="text"
                        value={background}
                        onChange={(e) => {
                          setBackground(e.target.value);
                          setResult(null);
                        }}
                        className="flex-1 border-4 border-black p-3 text-lg md:text-xl font-bold uppercase font-mono rounded"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-6">
                  <Button
                    onClick={handleCheck}
                    className="w-full md:flex-1 border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold"
                  >
                    CHECK CONTRAST
                  </Button>
                  <Button
                    onClick={handleSwap}
                    variant="outline"
                    className="w-full md:flex-1 border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent"
                  >
                    SWAP
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <div
                className="border-4 border-black p-8 md:p-12 rounded-lg"
                style={{ backgroundColor: background }}
              >
                <p
                  className="text-lg md:text-2xl font-bold mb-4"
                  style={{ color: foreground }}
                >
                  NORMAL TEXT PREVIEW
                </p>
                <p className="text-2xl md:text-4xl font-bold" style={{ color: foreground }}>
                  LARGE TEXT PREVIEW
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Contrast Ratio */}
                  <div className="border-4 border-black p-4 md:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">CONTRAST RATIO</h3>
                    <p className="text-4xl md:text-6xl font-bold">
                      {result.ratio.toFixed(2)}:1
                    </p>
                  </div>

                  {/* WCAG Compliance */}
                  <div className="border-4 border-black p-4 md:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">WCAG COMPLIANCE</h3>

                    <div className="space-y-4">
                      {/* AA Level */}
                      <div>
                        <h4 className="text-lg md:text-xl font-bold mb-2">AA LEVEL</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border-2 border-black rounded">
                            <span className="font-bold text-xs md:text-base">
                              Normal Text (4.5:1)
                            </span>
                            {result.aa.normal ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <X className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 border-2 border-black rounded">
                            <span className="font-bold text-xs md:text-base">Large Text (3:1)</span>
                            {result.aa.large ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <X className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* AAA Level */}
                      <div>
                        <h4 className="text-lg md:text-xl font-bold mb-2">AAA LEVEL</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border-2 border-black rounded">
                            <span className="font-bold text-xs md:text-base">Normal Text (7:1)</span>
                            {result.aaa.normal ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <X className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 border-2 border-black rounded">
                            <span className="font-bold text-xs md:text-base">
                              Large Text (4.5:1)
                            </span>
                            {result.aaa.large ? (
                              <Check className="h-6 w-6 text-green-600" />
                            ) : (
                              <X className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Suggestion */}
                  {suggestion && (
                    <div className="border-4 border-black p-4 md:p-6 bg-yellow-50 rounded-lg">
                      <div className="flex flex-col md:flex-row items-start gap-3 mb-4">
                        <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg md:text-xl font-bold mb-2">
                            SUGGESTED ALTERNATIVE
                          </h3>
                          <p className="text-xs md:text-sm mb-4">
                            The current contrast ratio does not meet AA
                            standards. Try this accessible alternative:
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 border-4 border-black rounded"
                          style={{ backgroundColor: suggestion }}
                        />
                        <span className="text-xl md:text-2xl font-bold font-mono">
                          {suggestion}
                        </span>
                        <Button
                          onClick={applySuggestion}
                          className="w-full md:w-auto ml-auto border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold mt-2 md:mt-0"
                        >
                          APPLY
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!result && (
                <div className="border-4 border-black p-8 md:p-12 text-center bg-gray-50 rounded-lg">
                  <p className="font-bold text-base md:text-lg">
                    ENTER COLORS AND CHECK CONTRAST
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
