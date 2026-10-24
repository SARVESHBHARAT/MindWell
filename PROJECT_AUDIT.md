# Mind the Well — Project Audit Report

**Audit date:** 2026-10-21  
**Auditor:** Cline (AI coding agent)  
**Project root:** `d:\pulse-of-mind-main`  
**Status:** Phases 1–3 complete; deployed to Render Static Sites (https://mindwelll.onrender.com)

---

## 1. Project Overview

**MindWell** ("Mind the Well") is a **frontend-only single-page application** for a campus mental health platform serving educational institutions. It provides:

- AI-powered conversational mental health support with client-side crisis-keyword detection
- Clinical screening assessments (PHQ-9 depression, GAD-7 anxiety) with scoring and interpretation
- Daily mood check-ins with wellness-score tracking
- A gamified "Wellness Tree" with XP, levels, streaks, and achievements
- An admin dashboard with institutional analytics, risk alerts, and report exports
- Public landing page with feature marketing

The project appears to have been generated with **Lovable** (the README references a Lovable project URL and the package is scaffolded as `vite_react_shadcn_ts`). It is a **demo/prototype frontend**: all data is hardcoded mock data, there is **no backend, no database, no authentication, and no external API integration**.

Intended users: students (end users), counselors, and campus administrators. The problem it addresses: centralized, stigma-aware mental health support, screening, and wellness tracking for educational institutions.
## 2. Detected Technology Stack and Versions

| Layer | Technology | Version (from package.json) |
|---|---|---|
| Build tool / dev server | Vite | ^5.4.19 |
| UI framework | React | ^18.3.1 |
| Language | TypeScript | ^5.8.3 (dev) |
| Styling | Tailwind CSS | ^3.4.17 (dev) |
| UI primitives | shadcn-ui / Radix UI | various ^1.x–^2.x |
| Routing | react-router-dom | ^6.30.1 |
| Data fetching | @tanstack/react-query | ^5.83.0 |
| Forms | react-hook-form + zod resolvers | ^7.61.1 / ^3.25.76 |
| Charts | recharts | ^2.15.4 |
| Notifications | sonner | ^1.7.4 |
| Icons | lucide-react | ^0.462.0 |
| Date utils | date-fns | ^3.6.0 |
| Linting | ESLint 9 (flat config) | ^9.32.0 |
| Package manager in use | npm (lockfile: package-lock.json) | npm 10.9.3 local |
| Secondary lockfile present | bun.lockb | (bun was used at some point) |

Runtime environment verified locally: **Node.js v22.20.0, npm 10.9.3**.

Note: `package.json` has `"private": true` and name `vite_react_shadcn_ts` (generic scaffold name, not "mindwell").
## 3. Existing Directory Structure

```
d:\pulse-of-mind-main\
├── .gitignore
├── bun.lockb
├── components.json          # shadcn-ui config
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md                # (Lovable template, not project-specific)
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── main.tsx
│   ├── App.tsx              # Router + QueryClient + routes
│   ├── App.css              # (unused vite default styles)
│   ├── index.css            # Tailwind + MindWell design tokens
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── Navigation.tsx   # Top nav with all route links + mobile drawer
│   │   └── ui/              # shadcn-ui component wrappers (~45 files)
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts     # sonner-based toast store
│   ├── lib/
│   │   └── utils.ts         # cn() helper
│   └── pages/
│       ├── Index.tsx        # Landing page
│       ├── Dashboard.tsx    # Mood check-in + stats
│       ├── Chat.tsx         # AI chat + crisis detection
│       ├── Assessments.tsx  # PHQ-9 / GAD-7 screener
│       ├── WellnessTree.tsx # Gamified wellness tree
│       ├── AdminDashboard.tsx # Institutional analytics
│       └── NotFound.tsx
├── node_modules/            # (installed; not part of source)
└── dist/                    # (produced by `npm run build`; not committed)
```

No `src/` subfolders for services, API clients, stores, or tests exist. There is **no backend folder, no database schema/migrations, no `__tests__` or vitest config**.

**Git (at audit):** Initially uninitialized. Subsequently initialized in Phase 3 and published to `https://github.com/SARVESHBHARAT/MindWell` on the `master` branch.

**Environment files (at audit):** None found initially. An `.env.example` reference was subsequently created documenting that no environment variables are required for the static frontend prototype.
## 4. Features Currently Implemented (verified by reading source)

All features are **client-side simulations with hardcoded mock data**; nothing persists beyond a browser refresh and nothing calls an external service.

1. **Routing** — `/`, `/dashboard`, `/chat`, `/assessments`, `/wellness`, `/admin`, `*` catch-all via react-router-dom.
2. **Navigation** — sticky top nav with active-state highlighting and mobile drawer.
3. **Index (landing)** — hero, feature cards, stats, demo CTA cards, CTA section.
4. **Dashboard** — greeting ("Welcome back, Alex!"), 1–10 mood check-in buttons, wellness score card, streak card, weekly-goal progress, 7-day mood trend chart (mock data), quick-action buttons.
5. **Chat** — message list, user input, simulated AI responses via keyword matching (anxiety, sadness, stress, sleep, default), emergency-keyword detection, typing indicator, auto-scroll, timestamped messages.
6. **Assessments** — PHQ-9 (9 items) and GAD-7 (7 items) screeners, 0–3 frequency options, question navigation, score calculation, clinical interpretation bands, results view, recommendation placeholders, mock history.
7. **WellnessTree** — tree level/XP/streak stats, tree visualization (leaves by level), activity breakdown, unlocked/locked achievements with progress bars.
8. **AdminDashboard** — campus stats cards, risk-alert table, weekly trends, department stats, tabs (overview/alerts/reports/students), export-report buttons (no-op), system-status badges.
9. **NotFound** — 404 page logging the bad route to console.
10. **Design system** — Tailwind design tokens (light/dark), gradient utilities, shadow utilities, shadcn-ui components.
## 5. Features Partially Implemented

| Feature | Gap |
|---|---|
| **Mood check-in (Dashboard)** | Mood can be selected, but the "Submit Check-in" button has **no `onClick` handler** — the selection is never saved and no confirmation is shown. |
| **Assessments** | "Next" can be pressed without selecting an answer for the current question (sparse/invalid answers possible). No per-question validation. |
| **Chat crisis flow** | Emergency responses are flagged, and a "Connect to Crisis Counselor" button is rendered, but the button has **no `onClick` handler** — no resources/action are triggered. |
| **Assessment history / View Full History** | Buttons are no-ops (static mock rows only). |
| **Admin export reports** | All four export buttons are no-ops. |
| **WellnessTree progress** | Progress bars are static mock values; nothing is earned by user action. |
## 6. Features That Appear to Be Missing (intended by product, absent from code)

| Feature | Evidence |
|---|---|
| **Authentication / authorization** | No login, session, or role gating anywhere; `/admin` is publicly reachable. The nav shows "Admin" to everyone. |
| **Persistence** | No localStorage, IndexedDB, or API calls. All state resets on refresh. |
| **Backend / API** | No server folder, no API client, no environment variables. tanstack-query is installed but unused. |
| **Database** | No schema, migrations, or seed data. |
| **Tests** | No test framework, no test files, no test script in package.json. |
| **Environment configuration** | No `.env.example`; no `VITE_` variables documented. |
| **Real crisis-resource action** | Crisis line numbers are mentioned in copy but not actionable. |
| **CI/CD config** | No GitHub Actions or similar. |
| **User profile / settings** | None. |

Note: auth/backend/persistence are **absent by design** for this frontend-demo prototype (mock-data architecture). They are listed as missing only to be explicit; implementing a full backend is **out of scope** unless requested.
## 7. Build and Runtime Problems

| # | Problem | Severity | Status |
|---|---|---|---|
| 1 | `npm run build` succeeds; `tsc --noEmit` passes with zero errors | — | None (app builds) |
| 2 | Browserslist `caniuse-lite` data is 16 months old (warning only, build succeeds) | Low | Confirmed |
| 3 | `tailwind.config.ts` `content` globs reference `./pages/**`, `./components/**`, `./app/**` at project root (do not exist) — harmless because `./src/**` covers everything | Low | Confirmed |
| 4 | `App.css` contains unused Vite default styles (`.logo`, `.card`) — not referenced by any component | Low | Confirmed |

No critical or high-severity build/runtime defects were found. The application starts and builds cleanly in its current state.
## 8. Dependency and Compatibility Issues

- Two lockfiles exist: `package-lock.json` (npm) and `bun.lockb` (bun). Only `package-lock.json` matches the installed `node_modules`. No conflict detected at runtime; the presence of `bun.lockb` is a minor housekeeping item.
- `@eslint/js` ^9.32.0 and `globals` ^15.15.0 with `ecmaVersion: 2020` in eslint.config.js — functional, no failures observed.
- `lovable-tagger` dev dependency is used only in development mode in `vite.config.ts`; harmless.
- No security advisories were checked programmatically (would require `npm audit`, network permitting).

## 9. Database and API Requirements

None required to run the app as shipped. It is a static SPA backed by mock data. tanstack-query is installed but not wired to any API. No `VITE_` environment variables are referenced anywhere in `src/`.

## 10. Security Concerns

| # | Concern | Severity | Notes |
|---|---|---|---|
| 1 | No secrets/API keys present in the codebase (confirmed by source review) | — | None found |
| 2 | `/admin` route is not role-protected; any user can reach the admin dashboard | Medium | App is a prototype without auth; document as a known limitation |
| 3 | Crisis/suicide keywords are scanned client-side in `Chat.tsx`; no server-side escalation | Medium | By design for demo; must not be represented as a real crisis-response system |
| 4 | `index.html` references external assets (og:image on lovable.dev, canonical `mindwell-campus.com`) | Low | Cosmetic only; update for real deployment |
| 5 | `package.json` `"private": true` — must be flipped to `false` (or removed) for public npm-style publishing; irrelevant for GitHub publication but noted | Low | — |

## 11. Missing Configuration or Assets

- **`.env.example`** missing. Recommended: document that no env vars are required to run, with optional `VITE_` placeholders.
- **README.md** is the generic Lovable template; contains no project-specific setup, feature, or troubleshooting info.
- **No `.gitignore` entries for `.env*`** (currently unnecessary since no env files exist; add when `.env.example` is added).
- Test configuration missing.
- No `favicon` branding issue — `public/favicon.ico` present (7.6 KB).

## 12. Current Test Coverage and Test Results

- **Test framework:** none installed.
- **Test files:** none.
- **Test script:** none in package.json (`scripts`: dev, build, build:dev, lint, preview).
- **Coverage:** 0%.
- **Verification performed instead:** `tsc --noEmit` (exit 0), `npm run build` (exit 0, 43.88s, bundles ~396 KB JS + 68 KB CSS).

## 13. Recovery Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Recovery work performed on the only copy of the project | Medium | High | Backup created at `d:\MindTheWell_Recovery_Backup` before any edits (source files only, excludes `node_modules`) |
| No git history exists to preserve | — | — | `git init` will be performed in Phase 3 as a new repository |
| Mock-data architecture mistaken for a complete full-stack app | Medium | Medium | Audit report clearly documents frontend-only scope; no backend will be invented |
| Crisis features misrepresented as production-grade emergency response | Medium | High | Keep client-side keyword detection; add clear disclaimers; do not wire real phone numbers as "auto-connect" |

## 14. Prioritized List of Required Fixes

**Critical:** none (application builds and runs).

**High:**
1. Dashboard "Submit Check-in" has no handler — mood selection is lost on submit.
2. Assessments allow advancing without answering the current question.
3. Chat "Connect to Crisis Counselor" button does nothing.

**Medium:**
4. NotFound uses an anchor `<a href="/">` causing a full-page reload instead of client-side navigation.
5. No test coverage at all.
6. No `.env.example` / environment documentation.
7. README is a Lovable template, not a project README.
8. `/admin` lacks role protection (document as known limitation).

**Low:**
9. `package.json` name is generic (`vite_react_shadcn_ts`); rename to `mindwell` and add description.
10. Browserslist data warning.
11. `tailwind.config.ts` content globs include nonexistent directories (cosmetic).
12. Unused `App.css` default styles.

## 15. Recommended Implementation Plan (Phase 2)

1. **Baseline & backup (done):** backup at `d:\MindTheWell_Recovery_Backup`; `tsc` and `build` both pass.
2. Fix High-severity items: Dashboard submit handler (localStorage persistence + toast success), Assessments required-answer validation, Chat crisis button (crisis-resource AlertDialog).
3. Fix Medium/Low items: NotFound `Link`, `.env.example`, README rewrite, package.json rename, `.gitignore` additions.
4. Add vitest + React Testing Library test suite covering score calculation, emergency detection, mood submission, and route rendering; add `npm test` script.
5. Verify: `tsc --noEmit`, `npm run build`, `npm test`, and a dev-server smoke test.
6. Update `PROJECT_AUDIT.md` with fixes applied.
7. Phase 3: `git init`, stage reviewed changes, commit, create GitHub repository (user to supply URL/name), push, verify publication.

**Confirmed vs. suspected:** All defects above marked "Confirmed" were verified by reading the source and running the build/type-check. No suspected issues remain unresolved at this time.

---

## 16. Post-Audit Implementation & Production Deployment Addendum

- **Implementation Completed:**
  - High-severity items resolved: Dashboard mood check-in persistence to `localStorage` (`mindwell_checkins`) with toast confirmation, Assessment question answer validation before advancing, and Chat crisis keyword detection with emergency alert dialog displaying 988 and campus hotlines.
  - Test framework integrated: Vitest + React Testing Library suite passing all test cases.
  - Package configured: Package renamed to `mindwell` with clear description, `.env.example` added.
- **Git Repository & Production Branch:**
  - Initialized Git repository, committed clean source, and pushed to [https://github.com/SARVESHBHARAT/MindWell](https://github.com/SARVESHBHARAT/MindWell) on branch `master`.
- **Render Production Deployment:**
  - **Hosting Platform:** Render (Static Site, Free Tier $0/month)
  - **Build Command:** `npm install && npm run build`
  - **Publish Directory:** `dist`
  - **Production URL:** [https://mindwelll.onrender.com](https://mindwelll.onrender.com/)
  - **Architecture Confirmation:** Verified as a client-side Single Page Application (SPA). No backend server, persistent database, or external AI API is deployed.
  - **Domain Note:** The temporary/placeholder domain (`mindwell-campus.com`) noted in item 10.4 is superseded by the verified live deployment at `https://mindwelll.onrender.com`.