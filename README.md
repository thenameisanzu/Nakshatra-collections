# Next.js Starter with TypeScript & Tailwind CSS

A modern, production-ready Next.js starter template featuring TypeScript, Tailwind CSS v4, App Router, and responsive components.

## ✨ Features

- **Framework**: Next.js (App Router with React Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom theme variables & dark mode support
- **Icons**: Lucide React
- **Components**:
  - `Navbar`: Responsive navigation with glassmorphism backdrop, brand logo, and mobile menu toggle
  - `Hero`: Hero section with gradient typography, CTA buttons, and interactive terminal snippet
  - `Features`: Feature cards with hover effects
  - `Footer`: Clean footer with navigation links and metadata
- **Utilities**: Pre-configured `cn` helper for class merging (`clsx` + `tailwind-merge`)

---

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Navbar, Footer & Fonts
│   │   ├── page.tsx           # Modern Homepage
│   │   └── globals.css        # Tailwind styles & theme variables
│   ├── components/
│   │   ├── Navbar.tsx         # Responsive top navigation with mobile menu
│   │   ├── Hero.tsx           # Engaging hero section
│   │   ├── Features.tsx       # Feature showcase grid
│   │   └── Footer.tsx         # Site footer
│   ├── lib/
│   │   └── utils.ts           # Classnames / styling helper utilities
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

### 1. Set Workspace
Open or navigate to the project directory:
```bash
cd /Users/ansusmacbookair/.gemini/antigravity-ide/scratch/nextjs-app
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```
