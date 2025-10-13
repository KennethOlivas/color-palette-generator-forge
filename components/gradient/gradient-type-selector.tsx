import { Button } from "@/components/ui/button";

export type GradientType =
  | "linear"
  | "radial"
  | "ellipse"
  | "conic"
  | "repeating-linear";

interface GradientTypeSelectorProps {
  gradientType: GradientType;
  setGradientType: (type: GradientType) => void;
}

export function GradientTypeSelector({
  gradientType,
  setGradientType,
}: GradientTypeSelectorProps) {
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">TYPE</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Button
          onClick={() => setGradientType("linear")}
          variant={gradientType === "linear" ? "default" : "outline"}
          className={`border-2 border-black font-bold ${
            gradientType === "linear"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          LINEAR
        </Button>
        <Button
          onClick={() => setGradientType("radial")}
          variant={gradientType === "radial" ? "default" : "outline"}
          className={`border-2 border-black font-bold ${
            gradientType === "radial"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          RADIAL
        </Button>
        <Button
          onClick={() => setGradientType("ellipse")}
          variant={gradientType === "ellipse" ? "default" : "outline"}
          className={`border-2 border-black font-bold ${
            gradientType === "ellipse"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          ELLIPSE
        </Button>
        <Button
          onClick={() => setGradientType("conic")}
          variant={gradientType === "conic" ? "default" : "outline"}
          className={`border-2 border-black font-bold ${
            gradientType === "conic"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          CONIC
        </Button>
        <Button
          onClick={() => setGradientType("repeating-linear")}
          variant={gradientType === "repeating-linear" ? "default" : "outline"}
          className={`border-2 border-black font-bold ${
            gradientType === "repeating-linear"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          REPEATING LINEAR
        </Button>
      </div>
    </div>
  );
}
