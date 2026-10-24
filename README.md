# MindWell — Digital Mental Wellness Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-blue?style=for-the-badge&logo=render)](https://mindwelll.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/SARVESHBHARAT/MindWell)
[![Hosting](https://img.shields.io/badge/Hosting-Render%20Free%20Tier-2ea44f?style=for-the-badge)](https://mindwelll.onrender.com)
[![License](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)]()

MindWell is a student-centered digital mental health and wellness platform designed to provide accessible, stigma-free psychological support tools, validated clinical screenings, daily mood check-ins, and institutional analytics for higher education campuses.

> **Important Architecture Notice:**  
> MindWell is currently a **client-side Single Page Application (SPA)** and a **frontend prototype**. It does **not** have a backend server, database, user authentication system, or external AI API connection. All data is managed locally in the user's browser or supplied as mock demonstration data.

---

## Live Demo

The production build of MindWell is deployed and publicly accessible on Render:

- **Live Deployment:** [https://mindwelll.onrender.com](https://mindwelll.onrender.com/)
- **Hosting Platform:** Render (Static Site)
- **Hosting Tier:** Free ($0/month)
- **Production Branch:** `master`

---

## Project Overview

College students face unprecedented academic, social, and personal stressors. MindWell was created to demonstrate a unified, approachable digital platform addressing student mental health needs in educational institutions.

The platform provides:
- A welcoming, stigma-reducing landing experience with rapid access to wellness tools.
- Daily mood tracking and emotional self-reflection.
- Clinically validated screening questionnaires (PHQ-9 for depression and GAD-7 for anxiety).
- An empathetic conversational support interface with integrated crisis-resource detection.
- A gamified "Wellness Tree" to encourage consistent self-care habits.
- An institutional administrator dashboard showcasing how campus wellbeing trends and aggregate risk flags could be visualized.

MindWell was developed as an educational prototype inspired by **Smart India Hackathon 2025 Problem Statement SIH25092** ("Development of a Digital Mental Health and Psychological Support System for Students in Higher Education" for the Government of Jammu and Kashmir).

---

## Current Architecture

Understanding the architecture is critical when evaluating or extending MindWell:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MindWell Architecture (Prototype)                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                 ┌────────────────────────────────────────┐
                 │       Browser / Client Runtime         │
                 │   (React 18 + TypeScript + Vite SPA)   │
                 └──────────────────┬─────────────────────┘
                                    │
    ┌───────────────────────────────┼──────────────────────────────┐
    │                               │                              │
    ▼                               ▼                              ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌─────────────────────┐
│  Browser localStorage  │  │  Client Component      │  │  Mock Analytics &   │
│  • Daily mood check-in │  │  State (React Hooks)   │  │  Demonstration Data │
│    records             │  │  • PHQ-9 & GAD-7 flow  │  │  • Campus stats     │
│    ("mindwell_checkins"│  │  • Heuristic chat flow │  │  • Risk alert table │
│     key)               │  │  • Crisis modal dialog │  │  • Department stats │
└────────────────────────┘  └────────────────────────┘  └─────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │   Static Site Hosting on Render (Built from /dist)      │
       │   • NO backend server (Node.js/Express/FastAPI)         │
       │   • NO database (PostgreSQL/MongoDB/MySQL)              │
       │   • NO external AI / LLM API integration                │
       │   • NO user authentication or server-side sessions      │
       └─────────────────────────────────────────────────────────┘
```

- **Client-Side Single Page Application (SPA):** The entire application is compiled into static HTML, JavaScript, and CSS via Vite and served as static files from Render.
- **No Backend Server:** There is no server-side application running in the current repository. All application logic runs entirely in the user's web browser.
- **No Database:** No persistent database is attached. Data does not sync across devices or users.
- **Local Storage for Mood Check-Ins:** The daily mood check-in tool persists entries directly to the browser's `localStorage` under the key `mindwell_checkins`. Clearing browser storage resets this history.
- **Client-Side Conversational Logic:** The support chat uses deterministic, client-side keyword heuristic matching. It does **not** make calls to an external AI service (such as OpenAI, Anthropic, or Gemini).
- **Client-Side Crisis Detection:** Emergency keyword filtering ("suicide", "kill myself", "self-harm", etc.) runs purely in the client's browser, triggering a modal with standard crisis hotline telephone numbers.
- **Mock Institutional Data:** The administrator dashboard displays hardcoded mock metrics, charts, and risk alerts designed for demonstration purposes only.
- **No Role-Based Access Control (RBAC):** Because authentication is not yet implemented, the `/admin` view is open for demonstration review.

---

## Features

The features documented below represent verified functionality implemented in the codebase:

### 1. Landing Page (`/`)
- Hero section introducing MindWell's mission and core pillars.
- Interactive feature highlights linking directly to individual tools.
- Statistics preview and call-to-action sections.
- Navigation header with responsive mobile drawer navigation.

### 2. Wellness Dashboard (`/dashboard`)
- **Daily Mood Check-in:** Interactive 1–10 mood rating selector with dynamic icons (Frown, Meh, Smile).
- **LocalStorage Persistence:** Submitting a check-in appends `{ mood, date }` to `localStorage` (`mindwell_checkins`) and triggers a toast notification.
- **Mood Trend Chart:** Recharts visualizer depicting a 7-day mood history trend.
- **Gamified Stats:** Visual indicators for current wellness score (75%), weekly check-in goal progress (4/5), and active streak (12 days).

### 3. Conversational Support Chat (`/chat`)
- **Conversational Interface:** Responsive messaging UI with typing indicators and auto-scrolling message history.
- **Client-Side Heuristic Guidance:** Predefined, empathetic response patterns for topics including anxiety, stress, sadness/depression, and sleep issues.
- **Crisis Keyword Detection:** Client-side scanner detecting terms related to self-harm or suicide.
- **Crisis Resources Modal:** When an emergency keyword is detected, an `AlertDialog` provides immediate helpline contact info:
  - **988 Suicide & Crisis Lifeline:** Call or text 988 (Available 24/7)
  - **Crisis Text Line:** Text HOME to 741741
  - **Campus Counseling Services:** Direct contact guidance

### 4. Clinical Assessments (`/assessments`)
- **Standardized Screeners:**
  - **PHQ-9 (Patient Health Questionnaire-9):** 9-item depression screener.
  - **GAD-7 (Generalized Anxiety Disorder-7):** 7-item anxiety screener.
- **Validated Flow:** Four-point Likert scale (0–3: *Not at all*, *Several days*, *More than half the days*, *Nearly every day*). The "Next" button is disabled until an answer is selected.
- **Scoring & Interpretation:** Automated score calculation with clinical severity bands (*Minimal*, *Mild*, *Moderate*, *Moderately Severe*, *Severe*) and recommended next steps.
- **Assessment History:** Mock screening timeline showcasing historical scores and completion dates.

### 5. Gamified Wellness Tree (`/wellness`)
- **Visual Growth Indicator:** Visual tree representation with leaf density tied to user wellness level (Level 5, 2,450 / 3,000 XP).
- **Achievements System:** Unlocked badges (*First Steps*, *Week Warrior*, *Self Aware*) and in-progress goals (*Consistency King*, *AI Buddy*).
- **Activity Breakdown:** Breakdown of wellness tasks contributing to streak and XP progression.

### 6. Institutional Administrative Dashboard (`/admin`)
- **Campus Analytics (Mock):** Total student users (2,547), active users (1,823), engagement rate (78%), and open risk alerts (12).
- **Risk Alert Table:** Triage table highlighting simulated student risk levels (High, Medium, Low) and flagged triggers.
- **Weekly Wellbeing Trends:** Multi-line trend chart comparing depression, anxiety, and wellness scores over four weeks.
- **Departmental Breakdown:** Wellbeing index and active users across academic departments (Computer Science, Engineering, Psychology, Business, Arts & Sciences).
- **Export UI Placeholders:** Interface buttons demonstrating report export capabilities.

---

## Technology Stack

The project is built on the following technologies, confirmed by `package.json`:

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Core Framework** | React | `^18.3.1` | Declarative component UI library |
| **Language** | TypeScript | `^5.8.3` | Static typing and type safety |
| **Build Tool** | Vite | `^5.4.19` | Fast HMR dev server and production bundler |
| **Styling** | Tailwind CSS | `^3.4.17` | Utility-first responsive CSS styling |
| **UI Components** | shadcn/ui & Radix UI | Various `^1.x` - `^2.x` | Accessible, unstyled UI primitives |
| **Routing** | React Router | `^6.30.1` | Client-side declarative routing (`BrowserRouter`) |
| **State / Fetching** | TanStack React Query | `^5.83.0` | Async state management |
| **Forms & Validation** | React Hook Form + Zod | `^7.61.1` / `^3.25.76` | Form management and schema validation |
| **Data Visualization**| Recharts | `^2.15.4` | Responsive SVG charts and trends |
| **Notifications** | Sonner | `^1.7.4` | Toast notification system |
| **Icons** | Lucide React | `^0.462.0` | Modern SVG icons |
| **Date Utilities** | date-fns | `^3.6.0` | Lightweight date manipulation |
| **Testing** | Vitest + React Testing Library | `^2.1.9` / `^16.3.3` | Unit and component testing suite |

---

## Directory Structure

```
mindwell/
├── public/                 # Static assets (favicon, SVG placeholders, robots.txt)
├── src/
│   ├── main.tsx            # Application entry point (mounts React DOM)
│   ├── App.tsx             # Root component with routing and providers
│   ├── index.css           # Global Tailwind directives and design tokens
│   ├── App.css             # Supplementary component styles
│   ├── components/
│   │   ├── Navigation.tsx   # Top navigation bar and mobile drawer
│   │   └── ui/             # shadcn/ui components (button, card, dialog, etc.)
│   ├── hooks/              # Custom React hooks (use-mobile, use-toast)
│   ├── lib/
│   │   └── utils.ts        # Helper functions (cn class merger)
│   ├── pages/              # Page-level components
│   │   ├── Index.tsx       # Landing page
│   │   ├── Dashboard.tsx   # Mood check-in and wellness metrics
│   │   ├── Chat.tsx        # Conversational support and crisis detection
│   │   ├── Assessments.tsx # PHQ-9 & GAD-7 screeners
│   │   ├── WellnessTree.tsx# Gamified wellness journey
│   │   ├── AdminDashboard.tsx # Institutional analytics (mock data)
│   │   └── NotFound.tsx    # 404 fallback page
│   └── test/               # Vitest environment setup
│       └── setup.ts        # jsdom stubs and DOM matchers
├── index.html              # HTML template
├── tailwind.config.ts      # Tailwind CSS configuration and theme tokens
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.app.json       # Application TypeScript configuration
├── tsconfig.node.json      # Vite Node configuration
├── vite.config.ts          # Vite build and plugin configuration
├── vitest.config.ts        # Vitest test runner configuration
├── package.json            # Project dependencies and npm scripts
├── package-lock.json       # Exact npm dependency lockfile
├── .env.example            # Environment variable documentation (optional)
└── .gitignore              # Files excluded from git
```

---

## Local Development

Follow these steps to set up and run MindWell locally:

### Prerequisites
- **Node.js:** v18.0.0 or higher (tested on Node v22.x)
- **npm:** v10.0.0 or higher (tested on npm 10.9.x)

### 1. Clone the Repository
```bash
git clone https://github.com/SARVESHBHARAT/MindWell.git
cd MindWell
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional)
MindWell runs as a frontend prototype and requires **no environment variables** to run locally. If you integrate a backend API in the future, you can copy `.env.example`:
```bash
cp .env.example .env
```

### 4. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Run the Automated Tests
```bash
npm test
```
Runs the Vitest suite covering mood check-in persistence, assessment navigation and scoring, and crisis keyword detection.

### 6. Run TypeScript Type Checking
```bash
npx tsc --noEmit
```

### 7. Run Code Linting
```bash
npm run lint
```

---

## Production Build

To generate the optimized production bundle:

```bash
npm run build
```

Vite compiles the application and outputs static assets into the `dist/` directory.

To test the compiled production build locally before deployment:
```bash
npm run preview
```

---

## Render Deployment

MindWell is deployed as a **Static Site** on [Render](https://render.com).

### Deployment Configuration

| Setting | Value |
|---|---|
| **Hosting Platform** | Render |
| **Service Type** | Static Site |
| **Plan** | Free ($0/month) |
| **Repository** | `https://github.com/SARVESHBHARAT/MindWell` |
| **Production Branch** | `master` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Live URL** | [https://mindwelll.onrender.com](https://mindwelll.onrender.com/) |

### Client-Side SPA Routing Note (Render Rewrites)
MindWell uses `react-router-dom` with `BrowserRouter` for client-side routing. On static hosts like Render, navigating directly to subroutes (such as `https://mindwelll.onrender.com/dashboard` or `https://mindwelll.onrender.com/assessments`) or reloading the page on a subroute may cause Render to look for a physical file at that path and return a 404 error unless a rewrite rule is in place.

To prevent 404 errors on direct subroute navigation, ensure a rewrite rule is configured in the **Render Dashboard > Static Site > Settings > Redirects/Rewrites**:

```
Source:      /*
Destination: /index.html
Action:      Rewrite
```

*(Note: Verify this rule in your Render service dashboard if subroute reloads return a 404).*

---

## Limitations and Future Improvements

MindWell currently serves as a high-fidelity frontend proof of concept. The table below outlines current prototype boundaries and the roadmap for full-stack production evolution:

| Area | Current Prototype Implementation | Planned Production Improvement |
|---|---|---|
| **Backend** | No backend server; client-side execution only | Dedicated REST / GraphQL backend (Node.js, Express, FastAPI, or NestJS) |
| **Database** | Browser `localStorage` (mood check-ins only) | Persistent relational/document database (PostgreSQL or MongoDB) |
| **Authentication** | Open access; `/admin` is publicly accessible | Secure Campus SSO (OAuth 2.0 / SAML / JWT) with Role-Based Access Control (RBAC) |
| **Conversational Support** | Client-side keyword-based heuristics | Secure, HIPAA/FERPA-aligned LLM API with clinical safety guardrails |
| **Crisis Intervention** | Static crisis hotline modal on keyword detection | Real-time counselor escalation, crisis protocol triage, and live chat routing |
| **Institutional Analytics** | Hardcoded mock data and static graphs | Real-time aggregated and anonymized telemetry from verified student profiles |
| **Clinical Assessments** | Results calculated and displayed in component state | Encrypted assessment histories, clinical trend tracking, and counselor sharing |

---

## Smart India Hackathon (SIH 2025) Details

- **Problem Statement ID:** SIH25092
- **Problem Statement:** Development of a Digital Mental Health and Psychological Support System for Students in Higher Education
- **Organization:** Government of Jammu and Kashmir
- **Event:** Smart India Hackathon 2025
- **Role:** Independent student prototype exploring modern UI/UX design, accessible mental wellness tools, and campus analytics workflows.

---

## Disclaimer

> [!WARNING]
> **Not a Substitute for Professional Medical Advice or Emergency Care**  
> MindWell is a software prototype created for educational and demonstration purposes. It is **not** a licensed medical device, clinical diagnostic tool, or crisis response system. The assessments (PHQ-9 and GAD-7) and automated conversational replies are provided solely for informational and demonstration purposes and should not be used as clinical diagnoses or treatment plans.
>
> If you or someone you know is in immediate danger, having thoughts of self-harm, or experiencing a mental health emergency:
> - **In the US / Canada:** Call or text **988** to reach the Suicide & Crisis Lifeline, or text **HOME to 741741** to connect with the Crisis Text Line.
> - **In India:** Call **112** (Emergency Services), **14416** (Tele-MANAS National Mental Health Helpline), or **1800-599-0019** (KIRAN Helpline).
> - **International:** Contact your local emergency services or campus psychological center immediately.

---

## License & Attribution

- **Project:** MindWell
- **Repository:** [https://github.com/SARVESHBHARAT/MindWell](https://github.com/SARVESHBHARAT/MindWell)
- **Live Deployment:** [https://mindwelll.onrender.com](https://mindwelll.onrender.com/)
