# Rummy Score Board - Agent Guidelines

## Project Location
The actual application is in the `rummy-score/` subdirectory. All development work must be done from within this directory:
```bash
cd rummy-score
```

## Key Information
- **Development commands**: Run from `rummy-score/` directory
  - `npm run dev` - Start dev server with Turbopack
  - `npm run build` - Create production build
  - `npm run start` - Run production build
  - `npm run lint` - Run ESLint
- **Architecture**: Next.js 15, React 19, TypeScript strict mode, Tailwind CSS v4
- **State management**: React Context via RummyContext
- **PWA**: Configured with next-pwa (service workers in public/)
- **Import aliases**: @/components, @/ui, @/lib, @/hooks → src/*

## Detailed Guidance
See `rummy-score/AGENTS.md` for comprehensive project-specific instructions including:
- Component organization
- Architecture details
- TypeScript configuration
- PWA specifics
- Common development patterns