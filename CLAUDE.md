# CLAUDE.md — Digital Mons

> **STRICT RULE: Before completing ANY task, you MUST update this file (CLAUDE.md) to reflect changes to the project structure, references, conventions, or dependencies. This is non-negotiable. Every change to the codebase must be accompanied by an update to this document.**

## Project Structure

```
digital-mons/
├── CLAUDE.md                  # This file — project rules and reference
├── components.json            # shadcn/ui configuration
├── package.json               # Project manifest and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS config (Tailwind CSS v4)
├── eslint.config.mjs          # ESLint flat config
├── public/                    # Static assets (mon sprites go in /mons/)
└── src/
    ├── app/                   # Next.js App Router
    │   ├── layout.tsx         # Root layout (dark mode enabled)
    │   ├── page.tsx           # Landing page with link to Dex
    │   ├── globals.css        # Global styles, CSS variables, theme
    │   └── dex/
    │       ├── page.tsx       # Dex list — mobile-first grid of all mons
    │       └── [id]/
    │           └── page.tsx   # Mon detail — full profile, stats, evolution chain
    ├── components/
    │   ├── ui/                # shadcn/ui primitives
    │   │   ├── button.tsx     # Button (variants: default, destructive, outline, secondary, ghost, link)
    │   │   └── card.tsx       # Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    │   ├── element-badge.tsx  # Colored badge for element types
    │   └── mon-card.tsx       # Monster card used in the Dex grid
    ├── data/
    │   └── mons.ts            # All monster seed data + helper functions (getMonById, getEvolutionChain, etc.)
    ├── hooks/                 # Custom React hooks
    └── lib/
        ├── types.ts           # Core types: Mon, MonStats, MonAbility, EvolutionChain, enums
        ├── element-colors.ts  # Tailwind color maps per element type (bg, text, border) + rarity colors
        └── utils.ts           # cn() utility (clsx + tailwind-merge)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Components**: shadcn/ui (manually installed, new-york style)
- **Styling**: Tailwind CSS v4 with CSS variables
- **Linting**: ESLint with next/core-web-vitals and next/typescript
- **Package Manager**: npm

## Design System

- **Theme**: Dark mode (default, class-based via `dark` on `<html>`)
- **Primary Color**: Green / lime — `oklch(0.72 0.19 142)`
- **Border Radius**: `0.5rem` (via `--radius` CSS variable)
- **Aesthetic**: Clean & minimal

## Monster Dex System

### Evolution Stages (6, linear)

| # | Stage Name | Description                    |
|---|------------|--------------------------------|
| 1 | **Spark**  | Newborn digital essence        |
| 2 | **Sprout** | Early form taking shape        |
| 3 | **Strike** | Battle-ready juvenile          |
| 4 | **Surge**  | Powerful adult form            |
| 5 | **Apex**   | Peak evolution                 |
| 6 | **Omega**  | Transcendent final form        |

### Element Types (12)

Fire, Water, Earth, Wind, Lightning, Ice, Light, Shadow, Metal, Nature, Poison, Psychic

- Mons can be **single or dual-typed**.

### Rarity Tiers (6)

Common, Uncommon, Rare, Epic, Legendary, Mythic

### Mon Data Model

Each mon has: `id`, `dexNumber`, `name`, `types` (1-2), `stage`, `rarity`, `description`, `lore`, `habitat`, `stats` (hp/attack/defense/speed/special), `abilities[]` (name/description/element), `evolvesFrom`, `evolvesInto`, `image`, `imagePrompt`.

### Image Generation Prompts

Every mon includes an `imagePrompt` field — a detailed Strampler pixel art generation prompt for AI image tools. Prompt conventions:

- **Style prefix**: Always starts with `"Strampler pixel art"`
- **Resolution**: `64x64` for Spark/Sprout stages, `96x96` for Strike/Surge, `128x128` for Apex/Omega
- **Structure**: Style → resolution → creature description → body/colors → pose → background → palette → proportions → suffix
- **Suffix**: Always ends with `"digital monster creature design"` (+ `"legendary aura"` / `"mythic divine aura"` for Legendary/Mythic)
- **Palette**: Each prompt includes an explicit color palette matching the mon's element types
- **Progression**: Prompts scale in detail and grandeur matching evolution stage — Spark is cute/minimal, Omega is godlike/transcendent

### Current Mon Count: 60

- **Pyrox Line** (#001-006): Cindlet → Blazpup → Pyrox → Volcanox → Ignirex → Soldracon (Fire → Fire/Earth → Fire/Light)
- **Aquara Line** (#007-012): Drople → Tidalin → Aquara → Tsunamaw → Abysseon → Leviathos (Water → Water/Shadow → Water/Psychic)
- **Voltik Line** (#013-018): Zapbit → Voltik → Thundrix → Galvorn → Tempesteel → Thorathon (Lightning → Lightning/Wind → Lightning/Metal → Lightning/Light)
- **Florae Line** (#019-024): Seedbit → Thornlet → Florae → Vengrove → Blightwood → Yggdracore (Nature → Nature/Poison → Nature/Shadow → Nature/Light)
- **Glacien Line** (#025-030): Frozzle → Sleetpaw → Glacien → Permafrost → Cryomancer → Absolutzero (Ice → Ice/Wind → Ice/Earth → Ice/Psychic → Ice/Shadow)
- **Terravex Line** (#031-036): Pebblit → Claypaw → Terravex → Quarrion → Monolithus → Pangaedon (Earth → Earth/Metal → Earth/Fire → Earth/Light)
- **Cyclonix Line** (#037-042): Zephlet → Gustpaw → Cyclonix → Stormveil → Tempestia → Aetherios (Wind → Wind/Lightning → Wind/Ice → Wind/Psychic → Wind/Light)
- **Noctrix Line** (#043-048): Gloombit → Duskpaw → Noctrix → Phantasm → Eclipsar → Voidmaw (Shadow → Shadow/Poison → Shadow/Psychic → Shadow/Ice → Shadow/Fire)
- **Cerebrex Line** (#049-054): Psibit → Mentalin → Cerebrex → Cognivore → Oraclyn → Omnimind (Psychic → Psychic/Light → Psychic/Shadow → Psychic/Metal → Psychic/Light)
- **Steelvex Line** (#055-060): Cogling → Ironpup → Steelvex → Forgeron → Titanwarden → Mechagodra (Metal → Metal/Fire → Metal/Earth → Metal/Lightning → Metal/Light)

## Commands

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Conventions

- Use the `src/` directory for all application code.
- Use the App Router (`src/app/`) — do not use the Pages Router.
- Import aliases use `@/*` mapped to `./src/*`.
- Prefer server components by default; add `"use client"` only when needed.
- Keep components small and composable.
- Place all UI primitives in `src/components/ui/` following shadcn/ui patterns.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Use CSS variables defined in `globals.css` for all theme colors — never hardcode colors.
- Add new shadcn/ui components to `src/components/ui/` manually (registry access may be unavailable).
- All mon data lives in `src/data/mons.ts`. Use the helper functions (`getMonById`, `getEvolutionChain`, `getMonsByStage`) to query data.
- Element color mappings are centralized in `src/lib/element-colors.ts`.
- Mon detail pages are statically generated via `generateStaticParams`.

## Key Dependencies

| Package                    | Purpose                          |
|----------------------------|----------------------------------|
| `class-variance-authority` | Component variant definitions    |
| `clsx`                     | Conditional classname strings    |
| `tailwind-merge`           | Tailwind class deduplication     |
| `lucide-react`             | Icon library                     |
| `@radix-ui/react-slot`     | Polymorphic component support    |

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
