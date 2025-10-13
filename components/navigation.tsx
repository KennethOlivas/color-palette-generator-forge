"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "GENERATOR" },
    { href: "/extract", label: "EXTRACTOR" },
    {
      href: "https://github.com/KennethOlivas/color-palette-generator-forge",
      label: (
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="currentColor"
            viewBox="0 0 24 24"
            className="inline-block"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span className="hidden sm:inline">GITHUB</span>
        </span>
      ),
      external: true,
    },
  ]

  return (
    <nav className="flex flex-wrap gap-2 w-full justify-center sm:justify-start ml-4">
      {links.map((link) =>
        link.external ? (
          <a
            key={typeof link.label === "string" ? link.label : link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-2 border-black font-bold bg-white text-black hover:bg-black hover:text-white"
            >
              {link.label}
            </Button>
          </a>
        ) : (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname === link.href ? "default" : "outline"}
              className={`border-2 border-black font-bold ${
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
