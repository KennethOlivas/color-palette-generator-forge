"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  onClickLink?: () => void
}

  const links = [
    { href: "/", label: "GENERATOR" },
    { href: "/extract", label: "EXTRACTOR" },
    { href: "/contrast", label: "CONTRAST" },
    { href: "/gradient", label: "GRADIENT" },
    { href: "/theme", label: "THEME" },
    {
      href: "https://github.com/KennethOlivas/color-palette-generator-forge",
      label: "GITHUB",
      external: true,
    },
  ]


export function Navigation({ onClickLink }: NavigationProps) {
  const pathname = usePathname()


  return (
    <nav className="flex flex-col sm:flex-row gap-4 items-center">
      {links.map((link) =>
        link.external ? (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickLink}
          >
            <Button
              variant="outline"
              className="border-2 border-black font-bold bg-white text-black hover:bg-black hover:text-white w-40 sm:w-auto"
            >
              {link.label}
            </Button>
          </a>
        ) : (
          <Link key={link.href} href={link.href} onClick={onClickLink}>
            <Button
              variant={pathname === link.href ? "default" : "outline"}
              className={`border-2 border-black font-bold w-40 sm:w-auto ${
                pathname === link.href
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              {link.label}
            </Button>
          </Link>
        )
      )}
    </nav>
  )
}
