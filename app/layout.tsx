import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "ColorForge - Brutalist Color Palette Generator",
  description: "Generate, edit, and share color palettes with a brutalist aesthetic",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="font-mono antialiased">
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
