import { PDFDocument } from "pdf-lib"

export async function mergePDFs(files: { data: ArrayBuffer; pages: { fileIndex: number; pageIndex: number }[] }[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()
  const loaded = new Map<number, PDFDocument>()

  for (const file of files) {
    for (const { fileIndex, pageIndex } of file.pages) {
      if (!loaded.has(fileIndex)) {
        loaded.set(fileIndex, await PDFDocument.load(file.data))
      }
      const srcPdf = loaded.get(fileIndex)!
      const [copiedPage] = await mergedPdf.copyPages(srcPdf, [pageIndex])
      mergedPdf.addPage(copiedPage)
    }
  }

  return mergedPdf.save()
}

export async function splitPDF(data: ArrayBuffer, pageIndices: number[]): Promise<Uint8Array> {
  const srcPdf = await PDFDocument.load(data)
  const newPdf = await PDFDocument.create()
  const copiedPages = await newPdf.copyPages(srcPdf, pageIndices)
  copiedPages.forEach((page) => newPdf.addPage(page))
  return newPdf.save()
}

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

export function downloadBlob(data: Uint8Array, filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "pdf"
  const blob = new Blob([data as BlobPart], { type: MIME[ext] || "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}
