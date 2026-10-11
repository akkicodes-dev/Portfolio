# Akash Satao — Spatial UI Personal Portfolio

A spatial visionOS-inspired personal portfolio website engineered for **Akash Satao** (`akkicodes-dev`), Software Development Engineer (Android + Backend).

Built with React, Vite, TypeScript, Three.js, GSAP, and Tailwind CSS.

---

## 🌟 Key Highlights & Design Direction

- **Spatial UI (visionOS-style)**: Floating frosted glass canvas (`backdrop-filter: blur(24px)`, specular border highlights, radial glow) over a cosmic animated background (`#0b0f1a` → `#1a2340`) with soft glowing orbs and subtle film grain.
- **Interactive 3D WebGL Hero**: React Three Fiber scene featuring an icosahedron glass crystal with `MeshTransmissionMaterial`, 800 floating particles, responsive mouse tilt, and scroll-driven parallax.
- **Performance Optimized**: DPR clamped `[1, 1.75]`, lazy-loaded 3D canvas chunking, low-end device auto-fallback (for mobile and devices with `hardwareConcurrency <= 4`), and pause-on-hidden tab.
- **Fluid Motion System**: Lenis smooth scrolling synced with GSAP's central ticker and `ScrollTrigger`, visionOS preloader with animated progress, interactive 3D card tilt (max ~8°), custom magnetic buttons, and fluid trailing ring cursor.
- **Single Source of Truth**: All site content, social links, project descriptions, PRs, and metrics live strictly inside [`src/data/content.ts`](src/data/content.ts).

---

## 🛠 Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics**: [three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Animation & Motion**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger, [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment Target**: [Vercel](https://vercel.com/) (Static Single Page Application)

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   └── favicon.svg               # Custom spatial SVG brand favicon
├── src/
│   ├── assets/                   # Static media assets
│   ├── components/
│   │   ├── hero/
│   │   │   ├── Hero3DScene.tsx   # Three.js glass crystal + particles + Bloom
│   │   │   └── HeroSection.tsx   # Hero typography, CTAs, and 3D lazy wrapper
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx        # Bio, education (PDEA COE & GP Malvan)
│   │   │   ├── SkillsSection.tsx       # Grouped skill cards (Languages, Android, CS, Tools)
│   │   │   ├── ProjectsSection.tsx     # NoteFlow, Career Guru, Crowd3 cards
│   │   │   ├── OpenSourceSection.tsx   # Merged PRs for Scribe-Android
│   │   │   ├── ExperienceSection.tsx   # Vertical timeline (MountReach, CodeLite, Unstop)
│   │   │   ├── AchievementsSection.tsx # Animated numerical counters & certs
│   │   │   └── ContactSection.tsx      # Contact form with validation & magnetic button
│   │   ├── AnimatedBackground.tsx# Ambient glowing orbs & noise texture
│   │   ├── Card3D.tsx            # 3D interactive tilt & specular glare card
│   │   ├── CustomCursor.tsx      # Precision dot + trailing fluid ring cursor
│   │   ├── MagneticButton.tsx    # Spring-based magnetic attraction button wrapper
│   │   ├── PillNavbar.tsx        # Floating glass pill navigation with active tracker
│   │   ├── Preloader.tsx         # VisionOS initialization preloader
│   │   ├── Sidebar.tsx           # Slim left icon sidebar with tooltips
│   │   └── SpatialPanel.tsx      # VisionOS frosted-glass main window container
│   ├── data/
│   │   └── content.ts            # Central single source of truth for all content
│   ├── lib/
│   │   └── api.ts                # Contact form submission service
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx # Lenis + GSAP ticker synchronization
│   ├── App.tsx                   # Main application assembly
│   ├── index.css                 # Spatial glass design tokens & Tailwind base
│   └── main.tsx                  # Application root entry
├── index.html                    # SEO metadata, Open Graph, and Google Fonts
├── tailwind.config.js            # Spatial UI theme extension
├── vercel.json                   # Vercel deployment & immutable cache rules
└── vite.config.ts                # Vite config with manual chunk code-splitting
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v24)
- npm `v9+`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized, code-split production bundle inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📝 Customizing Site Content

All data is intentionally decoupled from component markup and housed inside:
👉 `src/data/content.ts`

To update your portfolio:
1. **Bio, Role, & Email**: Update `siteContent.personal`.
2. **Social Links**: Modify entries in `siteContent.socials`.
3. **Skills**: Add or update categories and items in `siteContent.skills`.
4. **Projects**: Add project entries in `siteContent.projects`.
5. **Open Source PRs**: Append merged PRs in `siteContent.openSource.prs`.
6. **Experience & Leadership**: Update timeline items in `siteContent.experience`.
7. **Achievements & Certifications**: Edit numerical counters in `siteContent.achievements` and `siteContent.certifications`.

---

## 🔌 Connecting Your Backend API

The contact form is pre-wired to [`src/lib/api.ts`](src/lib/api.ts). When your backend service is ready:
1. Open `src/lib/api.ts`.
2. Uncomment the `fetch` call to your API endpoint (e.g., `/api/contact` or your server URL).
3. The UI will automatically handle loading indicators, success confirmations, and error banners.

---

## ☁️ Deploying to Vercel

### Method A: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method B: Deploy via GitHub
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial spatial portfolio release"
   git branch -M main
   git remote add origin https://github.com/akkicodes-dev/portfolio.git
   git push -u origin main
   ```
2. Import the repository in [vercel.com/new](https://vercel.com/new).
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

The repository already includes `vercel.json` with optimized immutable caching headers for static assets.

---

## ⚖️ License & Attribution

- Built by **Akash Satao** ([@akkicodes-dev](https://github.com/akkicodes-dev)).
- Content and images (c) Akash Satao. Code is MIT licensed.
- NoteFlow is built upon EasyNotes (GPL-3.0) and acknowledged accordingly.
