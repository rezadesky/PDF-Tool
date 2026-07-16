import type { Metadata } from "next"
import SplitTool from "@/components/split-tool"

export const metadata: Metadata = {
  title: "Split — PDF Tool",
  description: "Extract specific pages from a PDF. Select the pages you need. Free and private.",
}

export default function SplitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">Split PDF</h1>
        <p className="mt-1 text-sm text-secondary">
          Upload a PDF and pick which pages to extract into a new document.
        </p>
      </div>
      <SplitTool />
    </div>
  )
}
