# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rummy Score Board is a Next.js PWA application for tracking scores in Rummy card games. It provides player management, score tracking across multiple rounds, and works offline as a progressive web app.

## Development Commands

- **Dev server**: `npm run dev` — Starts dev server with Turbopack for fast rebuilds
- **Build**: `npm run build` — Creates production build in `.next/`
- **Production**: `npm start` — Runs production build
- **Lint**: `npm run lint` — Runs ESLint (enforces core-web-vitals and TypeScript rules)

## Architecture

### Framework Stack
- **Next.js 15** with App Router (src/app/)
- **React 19** with TypeScript strict mode
- **Tailwind CSS** with PostCSS v4
- **shadcn/ui** components (New York style, RSC enabled)
- **Next.js PWA** (next-pwa) with service workers in public/

### Import Aliases
- `@/components` → `src/components`
- `@/ui` → `src/components/ui`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

### Component Organization

**src/components/ui/**: shadcn-ui primitives (Button, Card, Input, etc.)

**src/components/rummy/**: Domain logic
- `RummyContext.tsx` — React Context managing game state (players, rounds, scores)
- `RummyHome.tsx` — Main menu/navigation hub
- `PlayerList.tsx` — Player list display
- `RummyScoreCounter.tsx` — Score input component
- `RummyGameSummary.tsx` — Round results display
- `NewGameForm.tsx` — Game initialization

**src/app/**: Next.js pages and layout
- `layout.tsx` — Root layout with RummyProvider wrapper
- `page.tsx` — Entry point
- `globals.css` — Tailwind directives and custom styles

### State Management

Game state uses React Context (`RummyContext`):
- `Player` type: `{ name, score, roundScore }`
- `Round` type: `Player[]` (snapshot of players at round end)
- Hook: `useRummy()` — Access context with error boundary for missing provider

Initial state includes 4 sample players (Padma, Babu, Harsha, Pragna).

## Key Configuration Details

- **TypeScript**: Strict mode enabled, target ES2017, moduleResolution: bundler
- **CSS**: Tailwind v4 with zinc base color, CSS variables enabled, no prefix
- **ESLint**: Flat config extending `next/core-web-vitals` + `next/typescript`
- **PWA Config**: Service worker auto-registers, skipWaiting enabled, dest: `public/`
- **Icon Library**: lucide-react (imported from lucide-react package)

## Common Patterns

- Client components use `"use client"` directive at top
- UI components are React Server Components by default
- Rummy components are client-side with Context integration
- Styling uses Tailwind utility classes + shadcn variants
