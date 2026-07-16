import Link from "next/link"
import { GitMerge, SplitSquareHorizontal, ArrowRight, Shield, Zap, Download } from "lucide-react"

const benefits = [
  { icon: Zap, title: "Blazing Fast", desc: "Everything runs in your browser. No waiting for uploads." },
  { icon: Shield, title: "100% Private", desc: "Files never leave your device. Zero servers involved." },
  { icon: Download, title: "Free Forever", desc: "No signup, no limits, no hidden costs. Period." },
]

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="pt-4 text-center sm:pt-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          PDF Tools,{" "}
          <span className="text-accent">Simplified</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-secondary sm:text-lg">
          Merge and split PDFs directly in your browser. <br className="hidden sm:inline" />
          No uploads. No limits. Completely private.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <Link
            href="/merge"
            className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-6 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 sm:p-8"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 sm:h-16 sm:w-16">
              <GitMerge className="h-7 w-7 text-accent sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-lg font-semibold text-primary sm:text-xl">Merge PDF</h2>
              <p className="mt-0.5 text-sm text-secondary">Combine multiple PDFs into one. Drag to reorder pages.</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-secondary transition-colors group-hover:text-accent" />
          </Link>

          <Link
            href="/split"
            className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-6 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 sm:p-8"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 sm:h-16 sm:w-16">
              <SplitSquareHorizontal className="h-7 w-7 text-accent sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-lg font-semibold text-primary sm:text-xl">Split PDF</h2>
              <p className="mt-0.5 text-sm text-secondary">Extract specific pages from a PDF into a new file.</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-secondary transition-colors group-hover:text-accent" />
          </Link>
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">How It Works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {[
            { step: "1", title: "Upload", desc: "Drop your PDF files" },
            { step: "2", title: "Arrange", desc: "Reorder or select pages" },
            { step: "3", title: "Download", desc: "Get your new PDF instantly" },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-heading text-lg font-bold text-accent">
                {s.step}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-primary">{s.title}</h3>
              <p className="mt-1 text-sm text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-lg text-center">
        <div className="grid grid-cols-3 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="rounded-xl bg-white p-4 shadow-sm">
                <Icon className="mx-auto h-5 w-5 text-accent" />
                <h3 className="mt-2 font-heading text-xs font-semibold text-primary">{b.title}</h3>
                <p className="mt-0.5 text-[11px] leading-tight text-secondary">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
