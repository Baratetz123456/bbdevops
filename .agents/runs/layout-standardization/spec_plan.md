# Task Specification: Universal Page Layout Standardization & Desktop Split Timeline

- **Task ID**: `layout-standardization`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `src/pages/Projects.jsx`
  - `src/pages/Services.jsx`
  - `src/pages/About.jsx`
  - `src/pages/Contact.jsx`
  - `src/pages/EmploymentHistory.jsx`
  - `src/components/TimelineSkeleton.jsx`
  - `src/components/ProjectSkeleton.jsx`
  - `src/components/PageSkeleton.jsx`

---

## 1. Objectives & Technical Specifications

### A. Universal Container Architecture
All 5 inner pages and 3 skeleton components must share the exact same outer container bounding box and padding:
- Container: `className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8"`
- Eliminates horizontal shifting, bouncing left margins, or narrow 896px strips during page transitions.

### B. Employment History Desktop Split Layout (`EmploymentHistory.jsx`)
- Re-architect content into a modern, responsive layout:
  - Header spans the full width of the container.
  - Main section uses `lg:grid lg:grid-cols-12 lg:gap-8 items-start`:
    - **Left Column (`lg:col-span-4 space-y-6 lg:sticky lg:top-8`)**:
      - Summary Stat Card (8+ Years Engineering Growth & Enterprise Verified badge).
      - Education & Academic Background Card.
    - **Right Column (`lg:col-span-8 space-y-6`)**:
      - Vertical timeline track and nodes with `TimelineItem` cards.
  - On mobile/tablet (`< 1024px`), cleanly stack into a single column with no horizontal overflow.

### C. Contact Page Expansion (`Contact.jsx`)
- Migrate from `max-w-4xl` to `max-w-6xl`.
- The 12-column grid (`col-span-7` form + `col-span-5` contact channels) expands comfortably to 1152px without squishing.

### D. Skeleton Synchronization
- `TimelineSkeleton.jsx`: Mirror the `lg:grid-cols-12` split layout (col-span-4 sticky sidebar + col-span-8 timeline cards).
- `ProjectSkeleton.jsx` & `PageSkeleton.jsx`: Update to `max-w-6xl` and `p-4 sm:p-8 lg:p-10`.

---

## 2. Acceptance Criteria
- [x] All 5 inner pages (`Projects`, `Services`, `History`, `About`, `Contact`) have `max-w-6xl mx-auto p-4 sm:p-8 lg:p-10 space-y-8`.
- [x] All 3 skeleton loaders (`TimelineSkeleton`, `ProjectSkeleton`, `PageSkeleton`) match `max-w-6xl` and `p-4 sm:p-8 lg:p-10`.
- [x] Employment History features the responsive desktop split layout (col-span-4 sidebar + col-span-8 timeline).
- [x] Zero lint warnings/errors via `npm run lint`.
- [x] Zero build errors via `npm run build`.
