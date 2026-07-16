"use client"

import { useCallback, useState } from "react"
import { PDFDocument } from "pdf-lib"
import FileDropzone from "./file-dropzone"
import PageList, { type PageItem } from "./page-list"
import { mergePDFs, downloadBlob } from "@/lib/pdf"
import { Loader2, Download } from "lucide-react"

const COLORS = ["#2563EB", "#DC2626", "#16A34A", "#D97706", "#9333EA", "#0891B2"]

interface FileEntry {
  id: string
  name: string
  size: number
  data: ArrayBuffer
}

export default function MergeTool() {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [pages, setPages] = useState<PageItem[]>([])
  const [loading, setLoading] = useState(false)

  const handleFiles = useCallback(async (entries: FileEntry[]) => {
    setFiles(entries)
    const allPages: PageItem[] = []
    for (let fi = 0; fi < entries.length; fi++) {
      let pageCount = 0
      try {
        const pdf = await PDFDocument.load(entries[fi].data)
        pageCount = pdf.getPageCount()
      } catch {
        pageCount = 1
      }
      for (let pi = 0; pi < pageCount; pi++) {
        allPages.push({ id: `${fi}-${pi}`, label: `${pi + 1}`, fileColor: COLORS[fi % COLORS.length] })
      }
    }
    setPages(allPages)
  }, [])

  const handleMerge = async () => {
    if (pages.length === 0) return
    setLoading(true)
    try {
      const fileMap = new Map<number, { data: ArrayBuffer; fileIndex: number }>()
      pages.forEach((page) => {
        const fi = parseInt(page.id.split("-")[0])
        if (!fileMap.has(fi)) {
          fileMap.set(fi, { data: files[fi].data, fileIndex: fi })
        }
      })
      const result = await mergePDFs(
        Array.from(fileMap.entries()).map(([, f]) => ({
          data: f.data,
          pages: pages
            .filter((p) => parseInt(p.id.split("-")[0]) === f.fileIndex)
            .map((p) => ({ fileIndex: f.fileIndex, pageIndex: parseInt(p.id.split("-")[1]) })),
        }))
      )
      downloadBlob(result, "merged.pdf")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <FileDropzone onFiles={handleFiles} multiple />

      {pages.length > 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-primary">{pages.length} page{pages.length > 1 ? "s" : ""}</span>
            <span className="text-xs text-secondary">Drag to reorder pages</span>
          </div>

          <PageList pages={pages} onReorder={setPages} />

          <button
            onClick={handleMerge}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 font-heading text-base font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 sm:text-lg"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            {loading ? "Merging…" : `Merge & Download (${pages.length} pages)`}
          </button>
        </>
      )}
    </div>
  )
}
