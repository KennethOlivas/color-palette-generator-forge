interface AngleSliderProps {
  angle: number;
  setAngle: (angle: number) => void;
  visible: boolean;
}

export function AngleSlider({ angle, setAngle, visible }: AngleSliderProps) {
  if (!visible) return null;
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">ANGLE: {angle}°</h3>
      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => setAngle(Number.parseInt(e.target.value))}
        className="w-full h-4 accent-black"
      />
    </div>
  );
}
