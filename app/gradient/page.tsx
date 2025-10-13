"use client";

import { useState } from "react";
import { Navigation } from "@/components/common/navigation";
import { GradientTypeSelector } from "@/components/gradient/gradient-type-selector";
import { AngleSlider } from "@/components/gradient/angle-slider";
import { ColorStopsEditor } from "@/components/gradient/color-stops-editor";
import { CSSOutput } from "@/components/gradient/css-output";
import { GradientPreview } from "@/components/gradient/gradient-preview";
import { ExampleUsage } from "@/components/gradient/example-usage";
import { PaletteHeader } from "@/components/common/header";

type GradientType = "linear" | "radial" | "ellipse" | "conic" | "repeating-linear";

interface ColorStop {
  color: string;
  position: number;
}

export default function GradientPage() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#FF6B6B", position: 0 },
    { color: "#4ECDC4", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const generateGradientCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    switch (gradientType) {
      case "linear":
        return `linear-gradient(${angle}deg, ${stops})`;
      case "radial":
        return `radial-gradient(circle, ${stops})`;
      case "ellipse":
        return `radial-gradient(ellipse, ${stops})`;
      case "conic":
        return `conic-gradient(${stops})`;
      case "repeating-linear":
        return `repeating-linear-gradient(${angle}deg, ${stops})`;
      default:
        return `linear-gradient(${angle}deg, ${stops})`;
    }
  };

  const handleCopyCSS = async () => {
    await navigator.clipboard.writeText(generateGradientCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = colorStops.length > 0 ? 50 : 0;
      setColorStops([
        ...colorStops,
        { color: "#000000", position: newPosition },
      ]);
    }
  };

  const handleRemoveColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const handleColorChange = (index: number, color: string) => {
    const newStops = [...colorStops];
    newStops[index].color = color;
    setColorStops(newStops);
  };

  const handlePositionChange = (index: number, position: number) => {
    const newStops = [...colorStops];
    newStops[index].position = position;
    setColorStops(newStops);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <PaletteHeader showRightButtons={false} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">GRADIENT GENERATOR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls Section */}
            <div className="space-y-6">
              <GradientTypeSelector gradientType={gradientType} setGradientType={setGradientType} />
              <AngleSlider angle={angle} setAngle={setAngle} visible={gradientType === "linear" || gradientType === "repeating-linear"} />
              <ColorStopsEditor
                colorStops={colorStops}
                onAdd={handleAddColorStop}
                onRemove={handleRemoveColorStop}
                onColorChange={handleColorChange}
                onPositionChange={handlePositionChange}
              />
              <CSSOutput css={generateGradientCSS()} copied={copied} onCopy={handleCopyCSS} />
            </div>
            {/* Preview Section */}
            <div className="space-y-6">
              <GradientPreview css={generateGradientCSS()} />
              <ExampleUsage css={generateGradientCSS()} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
