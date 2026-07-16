"use client"

import { useMemo } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, FileText } from "lucide-react"

export interface PageItem {
  id: string
  label: string
  fileColor: string
}

function SortablePage({ page, isSelected, onToggle }: { page: PageItem; isSelected: boolean; onToggle?: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition-all ${
        isDragging ? "z-50 border-accent/50 shadow-lg opacity-90" : "border-border"
      } ${isSelected ? "ring-2 ring-accent ring-offset-1" : ""}`}
    >
      {onToggle ? (
        <button
          onClick={() => onToggle(page.id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            isSelected ? "border-accent bg-accent text-white" : "border-border"
          }`}
        >
          {isSelected && (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      ) : (
        <button {...attributes} {...listeners} className="cursor-grab touch-none text-secondary hover:text-primary">
          <GripVertical className="h-5 w-5" />
        </button>
      )}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted font-heading text-sm font-semibold text-secondary">
        {page.label}
      </div>
      <FileText className="h-4 w-4 shrink-0 text-secondary" />
      <span className="min-w-0 flex-1 truncate text-sm text-primary">Page {page.label}</span>
      <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: page.fileColor }} />
    </div>
  )
}

interface PageListProps {
  pages: PageItem[]
  selected?: Set<string>
  onReorder?: (pages: PageItem[]) => void
  onToggle?: (id: string) => void
}

export default function PageList({ pages, selected, onReorder, onToggle }: PageListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const ids = useMemo(() => pages.map((p) => p.id), [pages])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id || !onReorder) return

    const oldIndex = pages.findIndex((p) => p.id === active.id)
    const newIndex = pages.findIndex((p) => p.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const updated = [...pages]
    const [moved] = updated.splice(oldIndex, 1)
    updated.splice(newIndex, 0, moved)
    onReorder(updated)
  }

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white py-16 text-secondary">
        <FileText className="h-10 w-10" />
        <p className="text-sm">Upload a PDF to see its pages here.</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        <div className="grid gap-3 sm:grid-cols-2">
          {pages.map((page) => (
            <SortablePage
              key={page.id}
              page={page}
              isSelected={selected?.has(page.id) ?? false}
              onToggle={onToggle}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
