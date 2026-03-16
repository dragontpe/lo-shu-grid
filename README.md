# Lo Shu Grid Reader

> **[Download for macOS (Apple Silicon)](https://github.com/dragontpe/lo-shu-grid/releases/latest/download/Lo.Shu.Grid.Reader_0.1.0_aarch64.dmg)** — open the DMG and drag to Applications

A macOS desktop application that generates personalised Lo Shu Grid numerology reports as premium PDF documents.

The app takes a person's name, date of birth, and gender as input, calculates their Lo Shu Grid, selects the correct pre-written interpretation texts from the built-in library, assembles a personalised report, and exports a beautifully formatted PDF.

Fully offline. No API calls. No AI at runtime. All interpretation text is built into the application.

## Features

- **Lo Shu Grid calculation** — Driver Number, Conductor Number, number pool with duplication rules, plane detection, Raj Yoga (Golden Yog / Silver Yog) identification
- **Kua Number (Feng Shui)** — Ba Zhai Eight Mansions calculation with Chinese solar year boundary handling, auspicious direction mapping
- **PDF report generation** — Premium A4/Letter PDF with gold-themed cover page, visual 3x3 grid, interpretation sections, and closing
- **Bilingual** — Full reports in English or Traditional Chinese (繁體中文)
- **Business branding** — Add your company name, contact info, and operator name to personalise reports for your practice
- **Non-binary support** — Displays both Male and Female Kua calculations with neutral framing

## Tech Stack

- [Tauri v2](https://tauri.app) — Rust backend, WebView frontend
- [React](https://react.dev) + TypeScript — frontend
- [Vite](https://vite.dev) — build tool
- [Tailwind CSS](https://tailwindcss.com) — styling
- [pdf-lib](https://pdf-lib.js.org) — PDF generation (pure TypeScript, no external dependencies)

## Architecture

```
src/
  calculation/
    gridEngine.ts           — pure calculation logic (no side effects)
    gridEngine.test.ts      — 25 unit tests
  content/
    interpretations.ts      — all English interpretation text
    interpretations.zh-TW.ts — all Traditional Chinese text
    labels.ts               — localised UI labels
  report/
    assembleReport.ts       — selects and sequences content blocks
    reportTypes.ts          — TypeScript types for content blocks
  pdf/
    pdfExporter.ts          — renders content blocks to PDF via pdf-lib
    pdfTheme.ts             — colours, font sizes, spacing constants
  components/
    InputForm.tsx
    GridDisplay.tsx
    Settings.tsx
  hooks/
    useGrid.ts
    useReport.ts
```

**Key design decisions:**
- All interpretation text lives in `interpretations.ts` (and its Chinese counterpart) — single source of truth
- The calculation engine is pure TypeScript with no imports except its own types — fully unit testable
- The report assembler does zero text generation — it only selects and sequences pre-written texts
- The PDF exporter does zero business logic — it receives typed content blocks and renders them
- Traditional Chinese Wu Xing (Five Elements) system only — no Vedic/planetary associations

## Development

### Prerequisites

- [Rust](https://rustup.rs) (stable)
- [Node.js](https://nodejs.org) (v18+)
- [Tauri CLI](https://tauri.app/start/prerequisites/)

### Setup

```bash
git clone https://github.com/dragontpe/lo-shu-grid.git
cd lo-shu-grid
npm install
```

### Run (development)

```bash
npm run tauri dev
```

### Test

```bash
npx vitest run
```

### Build (release)

```bash
npm run tauri build
```

Output: `src-tauri/target/release/bundle/macos/Lo Shu Grid Reader.app`

## Numerology System

Based on the traditional Chinese Lo Shu (洛書) magic square — a 3x3 grid where every row, column, and diagonal sums to 15. The system maps birth date digits to grid positions to reveal personality patterns, strengths, and growth areas through the Five Elements (Wu Xing / 五行) framework.

## License

MIT
