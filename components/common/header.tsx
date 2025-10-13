"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  RefreshCw,
  Plus,
  Minus,
  Download,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "./navigation";

interface PaletteHeaderProps {
  colorCount?: number;
  isGenerating?: boolean;
  onAddColor?: () => void;
  onRemoveColor?: () => void;
  onGenerate?: () => void;
  onShowExport?: () => void;
  onShowSaved?: () => void;
  showRightButtons: boolean;
}

export function PaletteHeader({
  colorCount,
  isGenerating,
  onAddColor,
  onRemoveColor,
  onGenerate,
  onShowExport,
  onShowSaved,
  showRightButtons = true,
}: PaletteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Block scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}
      className="border-b-4 border-black p-4 sm:p-6 bg-white relative z-50"
    >
      <div className="mx-auto flex items-center justify-between">
        <div className="flex  items-center space-x-4">
          {/* Left: App Name */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            COLORFORGE
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden sm:block">
            <Navigation />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden border-2 border-black rounded-md p-2 hover:bg-black hover:text-white transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Right Buttons (Desktop Only) */}
        {showRightButtons && (
          <div className="hidden sm:flex items-center gap-4">
            <Button
              onClick={onShowSaved}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <FolderOpen className="h-5 w-5 mr-2" />
              LIBRARY
            </Button>
            <Button
              onClick={onShowExport}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0"
            >
              <Download className="h-5 w-5 mr-2" />
              EXPORT
            </Button>
            <Button
              onClick={onRemoveColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={(colorCount ?? 0) <= 2}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">{colorCount ?? 0}</span>
            <Button
              onClick={onAddColor}
              variant="outline"
              size="icon"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0"
              disabled={(colorCount ?? 0) >= 10}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              onClick={onGenerate}
              className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold transition-colors duration-0"
            >
              <motion.div
                animate={
                  isGenerating
                    ? { scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] }
                    : {}
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
              </motion.div>
              GENERATE
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 border-t-4 border-black w-screen h-screen overflow-y-auto"
            style={{ touchAction: "none" }}
          >
            <Navigation onClickLink={() => setIsMenuOpen(false)} />
            {showRightButtons && (
              <div className="flex flex-col gap-4 w-full max-w-sm px-6 mt-8">
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onShowSaved?.();
                  }}
                  variant="outline"
                  className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0 w-full"
                >
                  <FolderOpen className="h-5 w-5 mr-2" />
                  LIBRARY
                </Button>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onShowExport?.();
                  }}
                  variant="outline"
                  className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent transition-colors duration-0 w-full"
                >
                  <Download className="h-5 w-5 mr-2" />
                  EXPORT
                </Button>
                <div className="flex items-center gap-2 w-full">
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onRemoveColor?.();
                    }}
                    variant="outline"
                    size="icon"
                    className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0 flex-1"
                    disabled={(colorCount ?? 0) <= 2}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="text-xl font-bold px-2">{colorCount ?? 0}</span>
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onAddColor?.();
                    }}
                    variant="outline"
                    size="icon"
                    className="border-2 border-black hover:bg-black hover:text-white bg-transparent transition-colors duration-0 flex-1"
                    disabled={(colorCount ?? 0) >= 10}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onGenerate?.();
                  }}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold transition-colors duration-0 w-full"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  GENERATE
                </Button>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 border-2 border-black rounded-md p-2 bg-white hover:bg-black hover:text-white transition-colors z-50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
