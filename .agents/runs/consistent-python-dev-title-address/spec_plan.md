# Specification Plan: Consistent Python Developer Title & Albay Address

**Task ID**: `consistent-python-dev-title-address`  
**Status**: DRAFT -> APPROVED  
**Author**: Design & Plan Agent  
**Loop Count**: Inner Code Loop: 0 | Outer Design Loop: 0  

---

## 1. Executive Summary & User Alignment
The user requested standardizing all developer title references to **"Python Developer & AI Automation"** (replacing lingering "DevOps Engineer & AI Automation Specialist" references and dropping "Specialist" for strict cross-site consistency) and updating the geographic location/address strictly to **"Albay, Philippines"** (removing "Daraga" from the personal location).

The "BBDevOps" portfolio brand name, repository name, and `bbdevops.dev` domain are confirmed to remain unchanged.

---

## 2. Inventory of Target Modifications

### A. Data Layer: `src/data/portfolio.json`
1. Line 4: Change `"title": "Python Developer & AI Automation Specialist"` -> `"title": "Python Developer & AI Automation"`
2. Line 8: Change `"location": "Daraga, Albay, Philippines"` -> `"location": "Albay, Philippines"`

### B. Component Layer: `src/pages/LegalNotice.jsx`
1. Line 147: Replace hardcoded string `DevOps Engineer & AI Automation Specialist • {portfolio.personal.location}` with `{portfolio.personal.title} • {portfolio.personal.location}`.
   - This dynamically references `portfolio.json`, ensuring the legal notice never drifts from the central source of truth.

### C. SEO & Schema Layer: `index.html`
1. Line 19: Change `<meta name="geo.placename" content="Daraga, Albay, Philippines" />` -> `<meta name="geo.placename" content="Albay, Philippines" />`
2. Line 53: Change Schema.org `jobTitle` from `"Python Developer & AI Automation Specialist"` -> `"Python Developer & AI Automation"`
3. Lines 56-59: Update Schema.org `PostalAddress`:
   - Set `"addressLocality": "Albay"`
   - Set `"addressRegion": "Albay"`

### D. Documentation Layer: `README.md`
1. Line 71: Update `"location": "Daraga, Albay, Philippines"` -> `"location": "Albay, Philippines"`

---

## 3. Verification Criteria
1. `npm run build` exits 0 with zero errors and warnings.
2. Zero leftover instances of `DevOps Engineer` or `Daraga` across the codebase.
3. UI integrity verified on `/`, `/about`, `/contact`, and `/legal`.
