import type { Metadata } from "next"
import { Outfit, Work_Sans } from "next/font/google"
import Navbar from "@/components/navbar"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" })

export const metadata: Metadata = {
  title: "PDF Tool",
  description: "Merge and split PDFs directly in your browser. 100% free, no uploads, no signup.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${workSans.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-6 sm:pb-6 sm:pt-10">{children}</main>
        <footer className="hidden border-t border-border py-5 text-center text-xs text-secondary sm:block">
          PDF Tool — All processing happens in your browser. Nothing is uploaded.
        </footer>
      </body>
    </html>
  )
}
