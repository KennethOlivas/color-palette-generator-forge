import { motion } from "framer-motion";

export function PaletteFooter() {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}
      className="border-t-4 border-black p-4 bg-white hidden sm:block"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 text-sm font-bold">
        <span>SPACE - Generate</span>
        <span>L - Lock/Unlock</span>
        <span>C - Copy</span>
        <span>Drag to Reorder</span>
        <span>Click HEX to Edit</span>
      </div>
    </motion.footer>
  );
}
