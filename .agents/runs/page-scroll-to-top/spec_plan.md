# Task Specification: Universal Page Navigation Scroll-To-Top

- **Task ID**: `page-scroll-to-top`
- **Lead Orchestrator**: BBDevOps Lead
- **Design & Plan Agent**: System Architect
- **Target Components**:
  - `src/components/ScrollToTop.jsx` (New dedicated utility component)
  - `src/App.jsx` (Mount `ScrollToTop` inside `BrowserRouter`)
  - `src/layouts/MainLayout.jsx` (Support secondary reset for main container if applicable)

---

## 1. Objectives & Technical Specifications

### A. Scroll-To-Top Mechanism
1. **Dedicated `ScrollToTop` Component**:
   - Create `src/components/ScrollToTop.jsx` listening to `pathname` and `search` from `useLocation()`.
   - On every route change, invoke:
     ```javascript
     window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
     document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
     document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' })
     ```
   - Disable automatic browser scroll restoration so Back/Forward navigations also predictably reset to top:
     ```javascript
     if ('scrollRestoration' in window.history) {
       window.history.scrollRestoration = 'manual'
     }
     ```

### B. Timing & Animation Integration
1. Execute the scroll reset synchronously/immediately upon route changes (`useEffect` or `useLayoutEffect` on `location.pathname`).
2. This ensures that as the new page renders and Framer Motion's entry animation kicks off, the viewport is already locked at `(0, 0)`.
3. In `MainLayout.jsx`, also ensure any internal scroll containers (such as mobile Home overflow) reset scrollTop to 0 on pathname change.

---

## 2. Acceptance Criteria
- [ ] Navigating between any routes (e.g. scrolled-down Projects -> Services, About, History, Contact, Home) immediately displays the new view starting from top (0, 0).
- [ ] Browser Back and Forward buttons consistently start at the top of the page (`history.scrollRestoration = 'manual'`).
- [ ] Instant jump behavior without visual scrolling lag or oscillation.
- [ ] Zero build errors via `npm run build`.
- [ ] Zero lint warnings/errors via `npm run lint`.
