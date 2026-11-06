# THE BUILD ARCHIVE 🌌
> **An Interactive Digital Universe Telling the Story of a Developer**  
> Built for **One Who Codes 2026** — A Portfolio Challenge by Acadable  
> **Developer:** M B Vishal | Computer Science & Engineering, SRMIST Ramapuram

---

## 🌟 Overview

**The Build Archive** is a creative developer portfolio engineered to break away from traditional resume-style portfolio grids. Designed as a futuristic digital workspace, it merges high-contrast space-black editorial design, hardware-accelerated micro-interactions, and genuine systems engineering simulations.

### 🏆 Key Competition Highlights
- **Creativity:** Immersive dark-universe theme (`#040508` space black with electric cyan and blue neon accents), reactive constellation canvas, futuristic audio telemetry, and custom cursor.
- **Craft:** Oversized typography (Syne & Space Grotesk), strict modular component architecture, and fluid Framer Motion animations.
- **Content:** Grounded in authentic CSE projects, real education credentials (SRMIST Ramapuram, Class XII CBSE distinction), and legitimate certifications.
- **Interactive Signature Showcase:** **Custom File Allocation System Simulator** embedded directly in the portfolio—allowing visitors and competition judges to interactively simulate Contiguous, Linked, and Indexed disk block allocation algorithms in real-time.

---

## 🚀 Interactive Modules

1. **Core Archive Initializer (Preloader):** Branded boot sequence calibrating 60 FPS graphics and telemetry pipelines.
2. **Interactive Hero:** Oversized typography, dynamic taglines, active availability indicator, and quick CTA routing.
3. **Module 01 — Archive Identity (About):** Editorial narrative exploring the developer's background, education at SRMIST Ramapuram, and terminal-styled profile card.
4. **Module 02 — Technical Laboratory (Skills):** Categorized skill pods (Core Programming, Creative Frontend, Systems Architecture, Engineering Workflow) with live real-time skill inspection telemetry.
5. **Module 03 — Project Exhibition:** Featured projects with deep-dive architectural blueprints, problem/solution breakdowns, and the signature **64-Block File Allocation Simulator**.
6. **Module 04 — Developer Journey:** Chronological timeline tracking education, coding breakthroughs, and milestones.
7. **Module 05 — Credentials & Achievements:** Verified certifications, honors, and competition entries.
8. **Module 06 — Connect & Telemetry:** Validated contact dispatcher with instant `mailto:` generation, one-click email copying, and interactive in-browser bash terminal CLI runner.

---

## 🛠️ Technology Stack

- **Framework:** React 18, Vite 5
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 3.4 with custom cosmic design tokens
- **Animations & Physics:** Framer Motion 11
- **Icons:** Lucide React
- **Audio Synthesis:** Web Audio API (zero external assets, user-toggleable)
- **Canvas:** Native HTML5 2D reactive particle field

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm or yarn

### 1. Clone or Open Project
```bash
cd the-build-archive
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:3000` (or the port indicated in your terminal) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized, tree-shaken static bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📦 Deployment Guide

### Option 1: Vercel (Recommended)
1. Push the code to a GitHub repository (`the-build-archive`).
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and choose **Vite** as the framework preset.
4. Click **Deploy**. Vercel will automatically build and assign a global CDN URL.

### Option 2: Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Deploy site.

### Option 3: GitHub Pages
1. In `vite.config.ts`, ensure `base: './'` or `base: '/<repo-name>/'` is set.
2. Run `npm run build`.
3. Deploy the `dist` folder via `gh-pages` or GitHub Actions.

---

## 📝 Customizing Your Content

All portfolio information is decoupled from UI components into type-safe data files in `src/data/`:

| File | Purpose |
|---|---|
| `src/data/profile.ts` | Name, bio, education, socials, and metrics |
| `src/data/projects.ts` | Project titles, problem statements, solutions, tech tags, and links |
| `src/data/skills.ts` | Categorized technical capabilities and real-world usage context |
| `src/data/journey.ts` | Chronological education & milestone timeline |
| `src/data/achievements.ts` | Certificates, competition entries, and honors |

---

## 📜 Submission Compliance

- **Competition:** One Who Codes 2026 — Acadable
- **Listing:** [Unstop Competition Listing](https://unstop.com/hackathons/one-who-codes-2026-a-portfolio-challenge-acadable-1784554?rstatus=1)
- **Official Guidelines:** Verified for responsive layout, accessibility (reduced-motion support, WCAG contrast), and authentic credentials.

