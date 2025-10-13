import type { ThemeMapping } from "@/lib/theme-utils";
import { motion } from "framer-motion";

interface ThemeLivePreviewProps {
  theme: ThemeMapping;
}

export function ThemeLivePreview({ theme }: ThemeLivePreviewProps) {
  return (
    <motion.div
      key={JSON.stringify(theme)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="border-4 border-black p-8 space-y-6"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <h2 className="text-3xl font-bold">LIVE PREVIEW</h2>
      {/* Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase">Buttons</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            className="px-6 py-3 border-2 font-bold"
            style={{
              backgroundColor: theme.primary,
              color: theme.background,
              borderColor: theme.primary,
            }}
          >
            PRIMARY
          </button>
          <button
            className="px-6 py-3 border-2 font-bold"
            style={{
              backgroundColor: theme.secondary,
              color: theme.background,
              borderColor: theme.secondary,
            }}
          >
            SECONDARY
          </button>
          <button
            className="px-6 py-3 border-2 font-bold"
            style={{
              backgroundColor: "transparent",
              color: theme.foreground,
              borderColor: theme.border,
            }}
          >
            OUTLINE
          </button>
        </div>
      </div>
      {/* Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase">Cards</h3>
        <div
          className="border-4 p-6 space-y-3"
          style={{ borderColor: theme.border }}
        >
          <h4 className="text-xl font-bold">Card Title</h4>
          <p className="text-sm" style={{ color: theme.muted }}>
            This is a card component with your custom theme applied. It uses the
            border and muted colors.
          </p>
          <button
            className="px-4 py-2 border-2 font-bold text-sm"
            style={{
              backgroundColor: theme.accent,
              color: theme.background,
              borderColor: theme.accent,
            }}
          >
            ACCENT BUTTON
          </button>
        </div>
      </div>
      {/* Inputs */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase">Inputs</h3>
        <input
          type="text"
          placeholder="Enter text..."
          className="w-full px-4 py-3 border-2 font-mono"
          style={{
            backgroundColor: theme.background,
            color: theme.foreground,
            borderColor: theme.border,
          }}
        />
      </div>
      {/* Badges */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase">Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <span
            className="px-3 py-1 text-xs font-bold border-2"
            style={{
              backgroundColor: theme.primary,
              color: theme.background,
              borderColor: theme.primary,
            }}
          >
            PRIMARY
          </span>
          <span
            className="px-3 py-1 text-xs font-bold border-2"
            style={{
              backgroundColor: theme.secondary,
              color: theme.background,
              borderColor: theme.secondary,
            }}
          >
            SECONDARY
          </span>
          <span
            className="px-3 py-1 text-xs font-bold border-2"
            style={{
              backgroundColor: theme.destructive,
              color: theme.background,
              borderColor: theme.destructive,
            }}
          >
            DESTRUCTIVE
          </span>
        </div>
      </div>
      {/* Alert */}
      <div
        className="border-4 p-4"
        style={{ backgroundColor: theme.muted, borderColor: theme.border }}
      >
        <h4 className="text-sm font-bold mb-2">ALERT MESSAGE</h4>
        <p className="text-xs">
          This is an alert component using the muted background color.
        </p>
      </div>
    </motion.div>
  );
}
