interface ExampleUsageProps {
  css: string;
}

export function ExampleUsage({ css }: ExampleUsageProps) {
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <h3 className="text-2xl font-bold mb-4">EXAMPLE USAGE</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold mb-2">CSS</p>
          <code className="block p-3 bg-white border-2 border-black text-xs font-mono">
            .element {"{"} <br />
            {"  "}background: {css}; <br />
            {"}"}
          </code>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">TAILWIND (arbitrary value)</p>
          <code className="block p-3 bg-white border-2 border-black text-xs font-mono break-all">
            className="bg-[{css}]"
          </code>
        </div>
      </div>
    </div>
  );
}
