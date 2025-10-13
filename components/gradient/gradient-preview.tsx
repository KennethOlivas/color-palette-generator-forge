interface GradientPreviewProps {
  css: string;
}

export function GradientPreview({ css }: GradientPreviewProps) {
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">PREVIEW</h3>
      <div
        className="w-full h-96 border-4 border-black"
        style={{ background: css }}
      />
    </div>
  );
}
