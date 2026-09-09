# Task Specification: Skeleton Loading UI & Mobile Employment History Overhaul

- **Task ID**: `skeleton-mobile-history`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `src/index.css`
  - `src/components/Skeleton.jsx` (New)
  - `src/components/TimelineSkeleton.jsx` (New)
  - `src/components/ProjectSkeleton.jsx` (New)
  - `src/components/PageSkeleton.jsx` (New)
  - `src/components/TimelineItem.jsx` (Modified)
  - `src/pages/EmploymentHistory.jsx` (Modified)
  - `src/App.jsx` (Modified)

---

## 1. Objectives & Technical Specifications

### A. Warm Shimmer Skeleton Loading UI
1. **CSS Shimmer Effect**:
   - Define `@keyframes shimmer-sweep` in `src/index.css`.
   - Implement `.skeleton-warm` class with background gradient animation tailored for both light (`--bg-badge`, `#FAF3EA`, `#FFF8F0`) and dark modes (`--bg-badge`, `#231B17`, `#2F241F`).
2. **Skeleton Primitives**:
   - `<Skeleton />`: Generic customizable placeholder with rounded corners and warm shimmer.
   - `<TimelineSkeleton />`: Page layout replica for Employment History featuring header lines, stat card placeholder, 3 staggered timeline item placeholders with node and track spine, and education block placeholder.
   - `<ProjectSkeleton />`: Grid skeleton matching project cards.
   - `<PageSkeleton />`: General fallback skeleton.
3. **Route Lazy Loading**:
   - Convert `Home`, `Projects`, `Services`, `EmploymentHistory`, `About`, and `Contact` to `React.lazy()` imports in `src/App.jsx`.
   - Wrap routes in `<React.Suspense fallback={<RouteAwareSkeleton />}>` for seamless, non-jarring navigation.

### B. Employment History Mobile Readability Overhaul
1. **Layout & Timeline Spine on Mobile (< 640px)**:
   - Outer container padding reduced from `p-5` to `p-3.5 sm:p-8 lg:p-10`.
   - Timeline track and node scaled down on mobile: `w-8 h-8` node (icon size 15px) vs `w-10 h-10` desktop (icon size 18px).
   - Horizontal gap between spine and card tightened from `gap-4 sm:gap-6` to `gap-2.5 sm:gap-6`, restoring over 30px of horizontal text width to cards.
   - Card internal padding adjusted to `p-4 sm:p-6` with refined border styling.
2. **Content & Metadata Presentation**:
   - Add `location` icon + tag badge (`BGC, Taguig, Philippines` / `Ortigas, Pasig, Philippines`) from `portfolio.json`.
   - Display company, location, dates, and duration in neat, non-colliding responsive pills.
   - Format bullet points: automatically extract bold title prefixes (e.g., `Concurrent network automation:`, `User-centric tool design:`) and render them with accented semi-bold styling so mobile readers can easily scan key achievements without reading dense paragraphs.
   - Increase text readability: font-size 13.5px on mobile, line-height 1.6, comfortable spacing between bullets.
3. **Summary Stat Card & Education Card**:
   - Convert summary stat card from rigid single-row flex to responsive `flex-col sm:flex-row items-start sm:items-center` so stats and badges do not clip or squish on 375px viewports.
   - Adjust education cards for clean stacking on mobile.

---

## 2. Acceptance Criteria
- [x] Zero build errors via `npm run build`.
- [x] Tested down to 375px mobile viewport without horizontal overflow.
- [x] Warm shimmer animation active and seamless during route transitions.
- [x] Employment history bullet points cleanly scannable with bold achievement highlights.
- [x] Education & stat cards fully responsive across 375px, 768px, and 1440px.
