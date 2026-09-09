# Task Specification: Project Card Expansion Isolation & Visual Improvements

- **Task ID**: `project-card-expansion`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `src/pages/Projects.jsx`
  - `src/components/ProjectCard.jsx`

---

## 1. Problem Statement
In the Projects page (`/projects`), clicking "View Problem & Verified Impact" toggles the expansion of a card's case study details. However, because the CSS grid parent defaults to `align-items: stretch`, expanding one card causes all other cards in the same grid row to stretch in height simultaneously. This causes sibling cards to stretch awkwardly with huge empty spaces between the tagline and the bottom tags/buttons.

---

## 2. Technical Specifications

### A. Grid Alignment Isolation (`src/pages/Projects.jsx`)
- Apply `items-start` to the project grid:
  `className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"`
- When an individual card expands, only that card grows downward. Peer cards in the row remain compact at their natural height without stretching.

### B. Project Card UI & Animation (`src/components/ProjectCard.jsx`)
- **Card Baseline Sizing**: Maintain a clean, uniform baseline min-height structure across unexpanded cards so thumbnails, titles, buttons, and tags align neatly before expansion.
- **Framer Motion Accordion Slide**:
  - Use `AnimatePresence` and `motion.div` with height animation (`initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}`) and `transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}`.
  - Apply `overflow-hidden` to avoid clipping glitches during expansion/collapse.
- **Active Card Visual Accent**:
  - When `showDetails` is active, apply a subtle terracotta accent border/ring (`border-[var(--accent-primary)]/50 ring-1 ring-[var(--accent-primary)]/20 shadow-md`).
  - Animate the dropdown caret with `motion.span` (`rotate: showDetails ? 180 : 0`).
- **Enhanced Case Study Micro-Icons & Contrast**:
  - Challenge / Problem: Distinct pill with `WarningCircle` icon.
  - Engineered Solution: Distinct pill with `Lightbulb` icon.
  - Verified Impact: Highlight badge with `CheckCircle` icon.

---

## 3. Acceptance Criteria
- [x] Sibling cards in the same grid row do NOT stretch when an adjacent card is expanded.
- [x] Smooth height accordion animation via Framer Motion without layout snapping.
- [x] Unexpanded cards maintain clean alignment across rows.
- [x] Zero lint warnings/errors via `npm run lint`.
- [x] Production build passes with 0 errors via `npm run build`.
