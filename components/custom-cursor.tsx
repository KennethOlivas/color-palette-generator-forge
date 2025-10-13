"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    window.navigator.userAgent,
  );
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileDevice());
    if (isMobileDevice()) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-white border-2 border-black pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          duration: 0.1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-black pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          duration: 0.1,
        }}
      />
    </>
  );
}
