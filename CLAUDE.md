# CLAUDE.md — Digital Mons

> **STRICT RULE: Before completing ANY task, you MUST update this file (CLAUDE.md) to reflect changes to the project structure, references, conventions, or dependencies. This is non-negotiable. Every change to the codebase must be accompanied by an update to this document.**

## Project Structure

```
digital-mons/
├── CLAUDE.md                  # This file — project rules and reference
├── package.json               # Project manifest and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS config (Tailwind CSS v4)
├── eslint.config.mjs          # ESLint flat config
├── public/                    # Static assets
└── src/
    └── app/                   # Next.js App Router
        ├── layout.tsx         # Root layout
        ├── page.tsx           # Home page
        └── globals.css        # Global styles (Tailwind import)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint with next/core-web-vitals and next/typescript
- **Package Manager**: npm

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

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
