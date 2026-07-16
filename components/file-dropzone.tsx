"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, X, FileIcon } from "lucide-react"
import { formatSize } from "@/lib/pdf"

interface FileEntry {
  id: string
  name: string
  size: number
  data: ArrayBuffer
}

interface FileDropzoneProps {
  onFiles: (files: FileEntry[]) => void
  multiple?: boolean
}

export default function FileDropzone({ onFiles, multiple = true }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<FileEntry[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const readFile = (file: File): Promise<FileEntry> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () =>
        resolve({ id: crypto.randomUUID(), name: file.name, size: file.size, data: reader.result as ArrayBuffer })
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })

  const addFiles = useCallback(
    async (fileList: FileList) => {
      const pdfs = Array.from(fileList).filter((f) => f.type === "application/pdf")
      if (!pdfs.length) return
      const entries = await Promise.all(pdfs.map(readFile))
      const updated = multiple ? [...files, ...entries] : entries
      setFiles(updated)
      onFiles(updated)
    },
    [files, multiple, onFiles]
  )

  const removeFile = useCallback(
    (id: string) => {
      const updated = files.filter((f) => f.id !== id)
      setFiles(updated)
      onFiles(updated)
    },
    [files, onFiles]
  )

  return (
    <div className="space-y-4">
      <button
        type="button"
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className={`flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-14 ${
          dragging
            ? "border-accent bg-accent/5"
            : "border-border bg-white hover:border-accent/50 hover:bg-accent/5"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
          <Upload className={`h-6 w-6 transition-colors ${dragging ? "text-accent" : "text-secondary"}`} />
        </div>
        <div>
          <p className="font-heading text-base font-semibold text-primary">
            {dragging ? "Drop here" : `Drop PDF${multiple ? "s" : ""} here`}
          </p>
          <p className="mt-0.5 text-sm text-secondary">or click to browse</p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files)}
      />

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm"
            >
              <FileIcon className="h-5 w-5 shrink-0 text-destructive" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{f.name}</p>
                <p className="text-xs text-secondary">{formatSize(f.size)}</p>
              </div>
              <button
                onClick={() => removeFile(f.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
