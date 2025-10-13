import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CSSOutputProps {
  css: string;
  copied: boolean;
  onCopy: () => void;
}

export function CSSOutput({ css, copied, onCopy }: CSSOutputProps) {
  return (
    <div className="border-4 border-black p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">CSS</h3>
        <Button
          onClick={onCopy}
          variant="outline"
          size="sm"
          className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              COPIED
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              COPY
            </>
          )}
        </Button>
      </div>
      <code className="block p-4 bg-white border-2 border-black text-sm font-mono break-all">
        background: {css};
      </code>
    </div>
  );
}
