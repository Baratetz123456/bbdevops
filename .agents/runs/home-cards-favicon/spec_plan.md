# Specification Plan: Specialized Favicon & Mobile Home Stat Cards

## 1. Objective
1. **Specialized Favicon**: Replace the generic rounded-square "BB" text favicon with a custom-engineered **Hexagon Cloud Engine** SVG vector badge combining an isometric hexagon chassis, central bold "BB" monogram, gear tooth accents, and network node dots in the BBDevOps palette (`#E07A5F`, `#D4A373`, `#FAF3EA`, `#2D2825`).
2. **Home Page 3 Cards Mobile Legibility**: Redesign the 3 stat cards on the Home page (`src/pages/Home.jsx`) so they are 100% legible, beautifully spaced, and un-truncated on mobile devices (375px+), while maintaining seamless responsive scaling on tablet (768px) and desktop (1440px). Add contextual micro-subtitles to enrich the executive portfolio appeal.

---

## 2. Component Specifications

### 2.1 Favicon (`public/favicon.svg`)
- **Dimensions**: Vector `viewBox="0 0 64 64"`.
- **Aesthetic**: Hexagon Cloud Engine.
  - Base: Soft rounded hex background with dark clay depth `#25201D` and subtle terracotta perimeter `#E07A5F`.
  - Isometric Hexagon facets: Multi-tone terracotta (`#E07A5F`, `#D4A373`, `#B2533E`) creating depth.
  - Core Symbol: Geometric "BB" monogram with integrated pipeline nodes and cloud gear cog accents.
  - Scaling: Optimized for clarity at 16x16 (browser tab), 32x32, 64x64, and mobile home screen bookmark icons.

### 2.2 Home Stat Cards (`src/pages/Home.jsx`)
- **Layout**:
  - Mobile (`< 640px`): `grid-cols-1` (full-width stacked cards).
  - Tablet & Desktop (`>= 640px`): `sm:grid-cols-3` (balanced 3-column row).
- **Typography & Content**:
  - Stat 1: `8+` | `Years Experience` | `Network & AI Systems`
  - Stat 2: `2,000+` | `Concurrent Devices` | `Cisco & Fujitsu Fleet`
  - Stat 3: `90%` | `Manual Workload Cut` | `Pipeline & Task Gains`
- **Styling**:
  - Remove `truncate` class to allow full text readability on all screen widths.
  - Keep `card-warm` class for consistency with dark/light themes.
  - Hover micro-interaction: `transition-transform duration-200 hover:scale-[1.02]`.

---

## 3. Verification Criteria
1. `npm run lint` passes with 0 warnings and 0 errors.
2. `npm run build` generates production bundle without issues.
3. Mobile viewport (375px) shows all 3 cards with zero text truncation, proper padding, and high contrast.
4. Favicon renders sharp and distinct in the browser tab.
