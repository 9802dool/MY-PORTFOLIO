# HM SOLUTIONS — Desktop Inventory Management

Cross-platform desktop app (Windows & macOS) for local inventory: categories, items, search/filter, and CSV/PDF reports. Data is stored in SQLite on your computer (`userData` folder).

## Requirements

- Node.js 20+
- npm

## Development

```bash
cd hmsolutions
npm install
npm run dev
```

## Production build

Builds the app and creates installers in `release/`:

```bash
npm run build
```

- **Windows**: NSIS installer (`.exe`) in `release/`
- **macOS**: `.dmg` in `release/` (build on a Mac with Xcode tools for signing/notarization if distributing)

## Tech stack

- Electron + electron-vite
- React + TypeScript + Tailwind CSS
- better-sqlite3 (main process)
- Papa Parse (CSV) + jsPDF (PDF) in the renderer

## License

MIT
