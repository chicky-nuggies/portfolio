# Tay Wei Shen Portfolio

A personal portfolio built with React, Vite, TypeScript, and Tailwind CSS.

The site presents Tay Wei Shen's background as an AI Software Engineer, including work experience, skills, competition wins, education, leadership roles, and contact links. The UI uses a terminal-inspired visual direction with animated shader effects and smooth reveal transitions.

## Tech Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS
- ESLint
- `lucide-react`
- `ogl`

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - run TypeScript build checks and create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Project Structure

```text
src/
  components/
    ui/
    FaultyTerminal.jsx
  lib/
    utils.ts
  App.tsx
  index.css
  main.tsx
```

## Notes

- Path alias `@` points to `src` and is configured in `vite.config.ts`.
- Tailwind scans `index.html` and files inside `src/**/*.{ts,tsx,js,jsx}`.
- The main portfolio content currently lives in `src/App.tsx`.

## Build for Production

```bash
npm run build
```

The output is generated in `dist/`.
