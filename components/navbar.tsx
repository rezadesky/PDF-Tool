"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, GitMerge, SplitSquareHorizontal, FileIcon } from "lucide-react"

const links = [
  { href: "/", label: "Home", icon: FileText },
  { href: "/merge", label: "Merge", icon: GitMerge },
  { href: "/split", label: "Split", icon: SplitSquareHorizontal },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <header className="hidden border-b border-border bg-white sm:block">
        <nav className="mx-auto flex max-w-5xl items-center gap-8 px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
            <FileIcon className="h-5 w-5 text-accent" />
            PDF Tool
          </Link>
          <div className="ml-auto flex gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-accent/10 text-accent" : "text-secondary hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-white sm:hidden">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                active ? "text-accent" : "text-secondary"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-accent" : "text-secondary"}`} />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
