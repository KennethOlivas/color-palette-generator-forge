import type React from "react";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { Toaster } from "@/components/ui/sonner";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ColorForge - Brutalist Color Palette Generator",
  description:
    "Generate, edit, and share color palettes with a brutalist aesthetic",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="font-mono antialiased">
        {children}
        <CustomCursor />
        <footer className="text-md text-center mt-8 text-gray-500">
          © {new Date().getFullYear()} ColorForge. All rights reserved. <br />
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/kenneth-olivas/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Kenneth Olivas
          </a>
        </footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
