"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "GENERATOR" },
  ]

  return (
    <nav className="flex gap-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button
            variant={pathname === link.href ? "default" : "outline"}
            className={`border-2 border-black font-bold ${
              pathname === link.href ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
