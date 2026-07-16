import type { Metadata } from "next"
import MergeTool from "@/components/merge-tool"

export const metadata: Metadata = {
  title: "Merge — PDF Tool",
  description: "Combine multiple PDFs into one file. Drag to reorder pages. Free and private.",
}

export default function MergePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">Merge PDF</h1>
        <p className="mt-1 text-sm text-secondary">
          Upload PDFs, reorder pages, and combine them into one document.
        </p>
      </div>
      <MergeTool />
    </div>
  )
}
