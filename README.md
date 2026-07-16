# PDF Tool

> Merge and split PDFs directly in your browser. 100% client-side, no uploads, no signup, free forever.

PDF Tool is a browser-based utility for merging and splitting PDF files. All processing happens locally on your device — your files never leave your computer.

## Features

- **Merge PDFs** — Combine multiple PDFs into one document with drag-and-drop page reordering
- **Split PDFs** — Extract specific pages from a PDF into a new file
- **100% Private** — Files processed entirely in-browser, zero server uploads
- **No Signup Required** — Just open and use
- **Free Forever** — No limits, no hidden charges
- **Offline Capable** — Works after initial load (PWA-ready)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| PDF Engine | pdf-lib (client-side) |
| Drag & Drop | dnd-kit |
| Icons | Lucide React |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel with zero configuration:

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repository directly at [vercel.com](https://vercel.com).

## Project Structure

```
pdf-tool/
├── app/              # Next.js App Router pages & layout
│   ├── merge/        # Merge PDF page
│   └── split/        # Split PDF page
├── components/       # Reusable UI components
│   ├── navbar.tsx
│   ├── file-dropzone.tsx
│   ├── page-list.tsx
│   ├── merge-tool.tsx
│   └── split-tool.tsx
├── lib/              # Business logic
│   └── pdf.ts        # PDF merge/split operations
└── public/           # Static assets
```

## License

MIT
