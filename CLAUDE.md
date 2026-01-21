# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Glid landing page - a beta waitlist signup for the Glid sports matching app. Built with Astro's island architecture combining Apple's material precision with developer/tech aesthetics.

## Brand Guidelines

**Core Identity**: Apple precision + Nike urgency + Developer aesthetic

**Colors**:
- Vapor White: #F5F5F7 (primary background)
- Obsidian Black: #000000 (text, dark elements)
- Cobalt: #0071e3 (action color - buttons, accents, data highlights)
- Success: #34C759
- Destructive: #FF3B30

**Typography**:
- Headlines: Inter (Weight 900), tracking -0.04em (`.tracking-tightest`)
- Data/Code: Space Mono for metrics, IDs, comments (`.font-mono`)
- Code-style copy: `// CURRENT_WAIT: 14 DAYS`, `V1.0.4 BUILD 892`

**UI Components**:
- Glass Pill Nav: Floating centered, `backdrop-filter: blur(20px)`, white/65% opacity
- Bento Cards: `border-radius: 32px`, soft shadow `0 24px 48px rgba(0,0,0,0.08)`
- Pill Input: Rounded full form with black submit button

**Voice**: Developer-focused, urgent, no fluff
- "Stop texting. Start sweating."
- "Flakes get banned. You get a game."
- "Reliability is the new currency."
- Code-style comments for status messages

## Tech Stack

- **Framework**: Astro 5.x
- **Interactive**: React 19 with `client:load`
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase Firestore (waitlist collection)
- **Hosting**: Firebase Hosting

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Preview production build
npm run deploy    # Build + firebase deploy
```

## Architecture

**Key Files:**
- `src/pages/index.astro` - Main page with phone mockup animation
- `src/layouts/Layout.astro` - HTML shell, global styles, noise texture
- `src/components/WaitlistForm.jsx` - Pill-style email signup → Firestore
- `src/styles/global.css` - Tailwind theme colors

**Key Styles** (Layout.astro):
- `.glass-pill` - Floating navigation
- `.bento-card` - 32px rounded cards with lift effect
- `.app-card` - Phone mockup cards
- `.tracking-tightest` - -0.04em letter spacing
- `.shadow-lift` / `.shadow-glass` - Soft shadows

**Phone Mockup Animation:**
- Auto-plays swipe demo on loop
- 3 profile cards with reliability scores
- Match overlay animation
- Uses vanilla JS with CSS animations

## Firebase

**Project**: `glid-app`

**Collection**: `waitlist`
- Fields: email, createdAt, source
