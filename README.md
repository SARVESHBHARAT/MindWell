# MindWell â€” Campus Mental Health Platform

MindWell is a frontend-only demo application for campus mental health support at educational institutions. It provides AI-powered conversational support, clinical mental health screenings, daily mood check-ins, gamified wellness tracking, and an institutional analytics dashboard for administrators.

> **Note:** This is a frontend prototype. All data is mock data stored in-browser; there is no backend, database, or authentication server. It is intended to demonstrate the product experience and UI, not to handle real patient data.

## Features

- **Landing page** â€” feature overview and entry points to each tool
- **Dashboard** â€” daily mood check-in (1â€“10 scale), wellness score, streak, weekly goal, 7-day mood trend; check-ins persist in browser localStorage
- **AI Support chat** â€” keyword-guided conversational support with client-side crisis-keyword detection and an actionable crisis-resources dialog (988 Suicide & Crisis Lifeline, Crisis Text Line, campus line)
- **Clinical Assessments** â€” PHQ-9 depression and GAD-7 anxiety screeners with scoring, clinical interpretation bands, and next-step recommendations
- **Wellness Tree** â€” gamified wellness journey with tree level, XP, streaks, activities, and locked/unlocked achievements
- **Admin Dashboard** â€” institutional analytics: campus stats, risk alerts, weekly trends, department stats, and report/system-status UI
- **Design system** â€” Tailwind CSS with shadcn-ui components, light/dark theme support, responsive layout

## Technology Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn-ui (Radix UI primitives)
- React Router 6
- TanStack Query 5
- React Hook Form + Zod
- Recharts, Sonner, date-fns, lucide-react
- Vitest + React Testing Library + jsdom (tests)

## Prerequisites

- Node.js 18 or newer (tested with Node v22.20.0)
- npm 10 or newer (tested with npm 10.9.3)

## Installation

`sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd mindwell

# 2. Install dependencies
npm i

# 3. Start the development server
npm run dev
`

The app runs on http://localhost:5173 by default (Vite; see ite.config.ts if you need port 8080).

## Environment Configuration

MindWell requires **no environment variables** to run. A .env.example is included with optional placeholder values for a future backend integration. Copy it to .env only when you add backend/API integration:

`sh
cp .env.example .env
`

Real .env files are excluded from Git via .gitignore.

## Database Setup

None required. The application is a static SPA backed by mock data; there is no database, schema, or migration to set up.

## Development Commands

| Command | Purpose |
|---|---|
| 
pm run dev | Start dev server with hot reloading |
| 
pm run build | Production build (outputs to dist/) |
| 
pm run preview | Preview the production build locally |
| 
pm run lint | Run ESLint |
| 
pm test | Run the test suite once (Vitest) |

## Deployment

This is a static site produced by 
pm run build. Deploy the contents of dist/ to any static host (Vercel, Netlify, GitHub Pages, etc.):

`sh
npm run build
# deploy dist/
`

Because there is no backend, no server-side environment variables are needed at deploy time.

Update src/pages/NotFound.tsx, route configuration in src/App.tsx, and index.html metadata (canonical URL, Open Graph image) for your deployment domain.

## Known Limitations

- **Frontend-only prototype:** no backend, database, or authentication. All data resets when browser storage is cleared; nothing is shared between users or devices.
- **No real crisis response:** crisis-keyword detection is client-side keyword matching and the crisis-resources dialog shows helpline information only. It is not a substitute for professional emergency services. If you or someone you know is in crisis, call emergency services (e.g. 911 in the US) or a suicide/crisis helpline immediately.
- **/admin is not role-protected:** anyone can access the admin dashboard in this demo.
- **External links/assets:** index.html references Open Graph imagery hosted on lovable.dev; replace with your own assets before public deployment.

