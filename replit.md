# FLOG (FLower lOG) — Workspace

## Overview

pnpm workspace monorepo using TypeScript. FLOG is a trendy, editorial magazine-style website for a Korean nonprofit documenting youth in their 20s.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite, Tailwind v4, framer-motion, wouter, shadcn/ui
- **Backend/DB**: Firebase Firestore (no server — client-side only)
- **Fonts**: Hahmlet, Noto Serif KR, Noto Sans KR
- **Site background**: `#FBFAF6`
- **Domain**: `flowerlog20.com`

## Artifacts

| Artifact | Dir | Package | Port | Path |
|---|---|---|---|---|
| FLOG (main site) | `artifacts/FLOG` | `@workspace/FLOG` | 18544 | `/` |
| API Server | `artifacts/api-server` | `@workspace/api-server` | — | `/api` |
| Canvas / Mockup Sandbox | `artifacts/mockup-sandbox` | `@workspace/mockup-sandbox` | — | — |

> Note: The FLOG artifact's internal platform ID is `artifacts/kkotbonabo` (immutable legacy ID from before the rename). The folder and package name are now `FLOG` / `@workspace/FLOG`.

## Key Files

- `artifacts/FLOG/src/lib/magazine-store.ts` — all Firestore types, defaults, read/write functions
- `artifacts/FLOG/src/pages/admin.tsx` — admin panel (password: `flog2024`, stored in sessionStorage)
- `artifacts/FLOG/src/pages/home.tsx` — fully dynamic home page via `HomeData` from Firestore
- `artifacts/FLOG/src/pages/mind-profile.tsx` — Mind Profile page
- `artifacts/FLOG/src/components/EventPopup.tsx` — popup (reads `config/popup` from Firestore)

## Firebase / Firestore

- **Project**: `flog-home`
- **Rules**: public read/write on `config/{document}`
- **Firestore docs**:
  - `config/popup` — `PopupData` (event popup shown on home)
  - `config/event` — `EventData` (event page content)
  - `config/about` — about page
  - `config/mind-profile` — mind profile page (includes 3 image URL fields)
  - `config/join` — join page
  - `config/home` — `HomeData` (5 sections: Hero, Philosophy, Magazine Preview, Mind Profile Preview, CTA)
  - `config/magazine` — magazine page

## Admin Panel

- URL: `/admin`
- Password: `flog2024` (stored in sessionStorage)
- 7 tabs: HOME, POP, ABOUT, MAGAZINE, MIND PROFILE, EVENT, JOIN

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/FLOG run dev` — run FLOG site locally
- `pnpm --filter @workspace/FLOG run build` — build FLOG site

## Notes

- All UI text in Korean except brand/editorial elements (FLOG, MAGAZINE, etc.)
- Mind profile images stored in `public/mind-profile/` and served at `/mind-profile/profile_N.jpg`
- Port was changed from 18543 → 18544 to resolve a conflict after folder rename
