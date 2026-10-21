# MindWell — Digital Mental Wellness Platform

MindWell is a digital mental wellness platform developed around Smart India Hackathon 2025 Problem Statement SIH25092 for the Government of Jammu and Kashmir, focused on psychological support for students in higher education.

> **Note:** This is a frontend prototype. All data is mock data stored in-browser; there is no backend, database, or authentication server. It is intended to demonstrate the product experience and UI, not to handle real patient data.

## Smart India Hackathon (SIH) 2025

This project was developed as a prototype implementation of **Smart India Hackathon 2025 Problem Statement SIH25092**:

- **Problem Statement ID:** SIH25092
- **Problem statement:** Development of a Digital Mental Health and Psychological Support System for Students in Higher Education
- **Organization:** Government of Jammu and Kashmir
- **Event:** Smart India Hackathon 2025

MindWell addresses the higher education student mental wellness need by providing accessible psychological support tools, clinical assessment screenings, and crisis resource connectivity within a single campus platform.

### Project relationship to the problem statement

MindWell is a frontend prototype implementation inspired by the SIH 2025 problem statement. It demonstrates the core experience and UI patterns requested in the statement but does not include a government-operated backend, official database, or authenticated user system. This is a student development project addressing the stated problem domain.

## Key Features

- **Landing page** — feature overview and entry points to each tool
- **Dashboard** — daily mood check-in (1–10 scale), wellness score, streak, weekly goal, 7-day mood trend; check-ins persist in browser localStorage
- **AI Support chat** — keyword-guided conversational support with client-side crisis-keyword detection and an actionable crisis-resources dialog (988 Suicide & Crisis Lifeline, Crisis Text Line, campus line)
- **Clinical Assessments** — PHQ-9 depression and GAD-7 anxiety screeners with scoring, clinical interpretation bands, and next-step recommendations
- **Wellness Tree** — gamified wellness journey with tree level, XP, streaks, activities, and locked/unlocked achievements
- **Admin Dashboard** — institutional analytics: campus stats, risk alerts, weekly trends, department stats, and report/system-status UI
- **Design system** — Tailwind CSS with shadcn-ui components, light/dark theme support, responsive layout

## Technology Stack

- **Frontend framework:** Vite 5 + React 18 + TypeScript
- **UI components:** Tailwind CSS + shadcn-ui (Radix UI primitives)
- **Routing:** React Router 6
- **State management:** TanStack Query 5
- **Forms:** React Hook Form + Zod
- **Charting:** Recharts
- **Notifications:** Sonner
- **Date handling:** date-fns
- **Icons:** lucide-react
- **Testing:** Vitest + React Testing Library + jsdom
- **Build tooling:** Vite, PostCSS, Autoprefixer

## Architecture and Project Structure

`
mindwell/
├── public/             # Static assets (index.html, favicon, SVGs)
├── src/
│   ├── main.tsx        # Application entry point
│   ├── App.tsx         # Root component with routing
│   ├── index.css       # Global Tailwind directives and base styles
│   ├── App.css         # Custom component styles
│   ├── components/
│   │   └── ui/         # shadcn-ui components (alert-dialog, button, input, etc.)
│   ├── hooks/          # Custom hooks (use-mobile, use-toast)
│   ├── lib/
│   │   └── utils.ts    # Utility functions
│   ├── pages/          # Page-level components
│   │   ├── Index.tsx           # Landing page
│   │   ├── Dashboard.tsx       # Mood check-in and wellness score
│   │   ├── Chat.tsx            # AI support chat with crisis resources
│   │   ├── Assessments.tsx     # PHQ-9/GAD-7 clinical screeners
│   │   ├── WellnessTree.tsx    # Gamified wellness journey
│   │   ├── AdminDashboard.tsx  # Institutional analytics
│   │   └── NotFound.tsx        # 404 page
│   └── test/           # Test configuration
│       └── setup.ts          # jsdom stubs (scrollIntoView, etc.)
├── index.html          # HTML template with Vite and Tailwind configs
├── tailwind.config.ts  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── tsconfig.app.json   # TypeScript config for application code
├── tsconfig.json       # Root TypeScript config
├── tsconfig.node.json  # TypeScript config for Node scripts
├── vite.config.ts      # Vite configuration with React plugin
├── vitest.config.ts    # Vitest test configuration
├── package.json        # Dependencies and scripts
├── .env.example        # Placeholder environment variables
└── .gitignore         # Git ignore rules
`

## Installation and Setup

### Prerequisites

- Node.js 18 or newer (tested with Node v22.20.0)
- npm 10 or newer (tested with npm 10.9.3)

### 1. Clone the repository

`sh
git clone https://github.com/SARVESHBHARAT/MindWell.git
cd mindwell
`

### 2. Install dependencies

`sh
npm i
`

### 3. Environment variable setup

MindWell requires **no environment variables** to run as a frontend-only prototype. If you integrate a backend API, copy the example:

`sh
cp .env.example .env
`

Optionally fill in VITE_API_BASE_URL for future backend integration. Real .env files are excluded from Git via .gitignore.

### 4. Start the development server

`sh
npm run dev
`

The app runs on http://localhost:5173 by default (Vite). To use a different port, adjust ite.config.ts.

### 5. Production build

`sh
npm run build
`

Outputs to dist/ (approximately 396 KB JS + 68 KB CSS). Deploy the contents of dist/ to any static host (Vercel, Netlify, GitHub Pages).

### 6. Preview the production build

`sh
npm run preview
`

### 7. Run the test suite

`sh
npm test
`

All 4 tests across 3 test files pass. Test configuration includes Vitest, React Testing Library, and jsdom.

### 8. TypeScript type checking

`sh
npx tsc --noEmit
`

Passes cleanly with no errors.

### 9. Run ESLint

`sh
npm run lint
`

## Testing and Quality Assurance

- **TypeScript checking:** Passed — 
px tsc --noEmit clean.
- **Production build:** Passed — 
pm run build produces 396 KB JS + 68 KB CSS.
- **Automated tests:** 4 tests passing across 3 test files:
  - Dashboard.test.tsx — validates mood check-in to localStorage + toast confirmation
  - Assessments.test.tsx — validates Next-disabled-until-answered + full PHQ-9 completion with score interpretation
  - Chat.test.tsx — validates emergency keyword detection (suicide) + crisis resources render + AlertDialog open

## Security and Privacy

- **Frontend-only prototype:** All data resides in browser localStorage and resets when cleared. No data is transmitted to any server, stored in a database, or shared between users.
- **No real crisis response:** Crisis-keyword detection is client-side pattern matching. The crisis-resources dialog shows helpline information only. It is not a substitute for professional emergency services. If you or someone you know is in crisis, call emergency services (e.g. 911 in the US) or a suicide/crisis helpline immediately.
- **No authentication or backend:** There is no user authentication, no user accounts, and no persistent storage. Each browser session is independent.
- **Educational/demo purpose:** This application is a prototype demonstration tool, not a clinical mental health service. It does not provide medical diagnosis, treatment, or crisis intervention.

## Known Limitations

- **Frontend-only prototype:** no backend, database, or authentication. All data resets when browser storage is cleared; nothing is shared between users or devices.
- **No real crisis response:** crisis-keyword detection is client-side keyword matching and the crisis-resources dialog shows helpline information only. It is not a substitute for professional emergency services.
- **//admin is not role-protected:** anyone can access the admin dashboard in this demo.
- **External links/assets:** index.html references Open Graph imagery hosted on lovable.dev; replace with your own assets before public deployment.
- **No mobile optimisation beyond responsive layout:** the UI adjusts to screen size but has not been tested on actual mobile devices.

## Contribution and Licensing

No license file exists in the repository. This is a personal student project developed for Smart India Hackathon 2025. Licensing decisions should be made based on intended use and distribution.

Pull requests, bug reports, and suggestions are welcome. Please ensure contributions align with the project's educational prototype nature.

## Project Attribution

- **Project name:** MindWell
- **Developer:** Personal student project
- **Context:** Smart India Hackathon 2025, Problem Statement SIH25092
- **Target domain:** Higher education student mental wellness

---

## Development Commands Summary

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

---

**Repository:** https://github.com/SARVESHBHARAT/MindWell
