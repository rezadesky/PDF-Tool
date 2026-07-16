"use client"

import { useCallback, useState } from "react"
import { PDFDocument } from "pdf-lib"
import FileDropzone from "./file-dropzone"
import PageList, { type PageItem } from "./page-list"
import { splitPDF, downloadBlob } from "@/lib/pdf"
import { Loader2, Download } from "lucide-react"

interface FileEntry {
  id: string
  name: string
  size: number
  data: ArrayBuffer
}

export default function SplitTool() {
  const [file, setFile] = useState<FileEntry | null>(null)
  const [pages, setPages] = useState<PageItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const handleFiles = useCallback(async (entries: FileEntry[]) => {
    const f = entries[0]
    if (!f) return
    setFile(f)
    let pageCount = 0
    try {
      const pdf = await PDFDocument.load(f.data)
      pageCount = pdf.getPageCount()
    } catch {
      pageCount = 1
    }
    const allPages: PageItem[] = []
    for (let pi = 0; pi < pageCount; pi++) {
      allPages.push({ id: String(pi), label: String(pi + 1), fileColor: "#2563EB" })
    }
    setPages(allPages)
    setSelected(new Set(allPages.map((p) => p.id)))
  }, [])

  const togglePage = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSplit = async () => {
    if (!file || selected.size === 0) return
    setLoading(true)
    try {
      const indices = Array.from(selected).map(Number).sort((a, b) => a - b)
      const result = await splitPDF(file.data, indices)
      downloadBlob(result, `split-${file.name}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <FileDropzone onFiles={handleFiles} multiple={false} />

      {pages.length > 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-primary">
              {pages.length} page{pages.length > 1 ? "s" : ""} &middot; {selected.size} selected
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setSelected(new Set(pages.map((p) => p.id)))}
                className="text-xs font-medium text-accent hover:underline"
              >
                Select all
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs font-medium text-secondary hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <PageList pages={pages} selected={selected} onToggle={togglePage} />

          <button
            onClick={handleSplit}
            disabled={loading || selected.size === 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 font-heading text-base font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 sm:text-lg"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            {loading ? "Splitting…" : `Split & Download (${selected.size} pages)`}
          </button>
        </>
      )}
    </div>
  )
}
