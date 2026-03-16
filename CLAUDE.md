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
├── public/                    # Static assets
└── src/
    ├── app/                   # Next.js App Router
    │   ├── layout.tsx         # Root layout (dark mode enabled)
    │   ├── page.tsx           # Home page
    │   └── globals.css        # Global styles, CSS variables, theme
    ├── components/
    │   └── ui/                # shadcn/ui components
    │       ├── button.tsx     # Button (variants: default, destructive, outline, secondary, ghost, link)
    │       └── card.tsx       # Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    ├── hooks/                 # Custom React hooks
    └── lib/
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
