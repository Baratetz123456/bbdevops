# BBDevOps Local Testing & Quality Assurance Guide

This comprehensive guide walks you through testing every aspect of the **BBDevOps** portfolio application locally on your machine—including frontend UI responsiveness, theme switching, contact form fallback behavior, live AWS Serverless integration, automated Python Lambda unit tests, and production build checks.

---

## 🚀 Quick Command Reference

| Command | Description | What to Verify |
| :--- | :--- | :--- |
| `npm run dev` | Starts Vite local development server | Serves web app on `http://localhost:5173` |
| `npm run test:api` | Runs automated Python Lambda test suite | Validates validation, honeypot, and SES logic offline |
| `npm run lint` | Runs ultra-fast Oxlint linter | 0 warnings, 0 errors across all JS/JSX files |
| `npm run build` | Compiles production assets into `/dist` | Verifies bundle sizes, chunks, and zero build regressions |
| `npm run preview` | Spins up local server for `/dist` bundle | Tests production build locally on `http://localhost:4173` |

---

## 1. Testing the Web Frontend

### A. Launching the Dev Server
Run the standard development server in your terminal:
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)**.

### B. UI & Interactive Feature Checklist
- [ ] **Dual-Theme Engine**: Click the sun/moon icon on the top right of the sidebar banner. Verify smooth transitions between the warm light theme (`#FAF3EA`) and dark mode.
- [ ] **Responsive Breakpoints**:
  - **Mobile (< 768px)**: Inspect element in Chrome DevTools (press `F12` $\rightarrow$ Toggle Device Toolbar $\rightarrow$ choose iPhone 14 or 375px width). Verify the mobile top bar, floating mobile bottom tab bar, and hamburger modal.
  - **Desktop (≥ 768px)**: Verify fixed left sidebar, smooth scroll, and bento card grid.
- [ ] **Projects Showcase**: Click **Projects** in the navigation. Verify category filter tabs ("All", "AI & Automation", "Cloud & DevOps", "Network & Systems") and expand project impact dropdowns.
- [ ] **Privacy Policy Page**:
  - Visit **[http://localhost:5173/privacy](http://localhost:5173/privacy)** or click the **Privacy Policy** link at the bottom of the sidebar.
  - Verify all 6 compliance sections render with icons, and click **"Back to Contact"** to confirm breadcrumb navigation works.

---

## 2. Testing the Contact Form

The contact form is architected to be resilient in two distinct operational modes:

### Mode 1: Fallback Email Client Mode (Default / No AWS Backend Deployed)
If `VITE_CONTACT_API_URL` is **not set** in your `.env.local`:
1. Navigate to **[http://localhost:5173/contact](http://localhost:5173/contact)**.
2. Fill out the fields:
   - **Name**: `Alex Rivera`
   - **Email**: `alex@example.com`
   - **Project Details**: `Inquiring about CI/CD pipeline automation.`
3. Click **Send Message**.
4. **Expected Result**:
   - A friendly notification toast appears: *"Opening your email client to message baratetajayson.work@gmail.com directly."*
   - Your system's default email client (Outlook, Apple Mail, etc.) launches automatically with the recipient, subject, and message pre-populated.

---

### Mode 2: Live Serverless Mode (With AWS Backend Deployed)
When you have deployed the AWS CloudFormation stack (see [docs/AWS_CONTACT_API_GUIDE.md](AWS_CONTACT_API_GUIDE.md)):
1. Create a `.env.local` file in the root directory:
   ```env
   VITE_CONTACT_API_URL=https://<api-id>.execute-api.ap-southeast-1.amazonaws.com/contact
   ```
2. Restart the dev server (`Ctrl+C` $\rightarrow$ `npm run dev`) or refresh your browser.
3. Submit a message in the contact form.
4. **Expected Result**:
   - Button shows `Sending message...` state.
   - On success: Multi-colored confetti bursts on screen! 🎉
   - Success toast appears: *"Thank you! Your message has been sent directly to Jayson's inbox."*
   - An email arrives in your `baratetajayson.work@gmail.com` Gmail inbox within seconds, with `Reply-To` set directly to the visitor's email address.

---

## 3. Testing the Serverless Python Backend Offline

You can test the AWS Lambda handler logic completely offline on your local machine without needing an AWS account or active cloud credentials.

### Run the Automated Test Suite:
```bash
npm run test:api
```
*(Alternatively: `python infrastructure/test_local.py`)*

### What the Test Suite Validates:
1. **CORS Preflight (OPTIONS request)**: Ensures HTTP API Gateway headers allow cross-origin browser requests (`*`).
2. **Anti-Spam Honeypot Trap**: Simulates a bot submitting the hidden `_gotcha` field; verifies the Lambda immediately returns HTTP 200 to waste bot resources without dispatching SES emails or consuming quota.
3. **Missing Fields Validation**: Verifies empty name, email, or message fields are rejected with HTTP 400.
4. **Malformed Email Syntax**: Tests invalid email strings against regex patterns and confirms HTTP 400 rejection.
5. **Oversized Message Limitation**: Verifies messages exceeding 5,000 characters are blocked.
6. **SES Dispatch Mock**: Verifies that valid submissions formulate the HTML email structure and correctly set `ReplyToAddresses`.

**Expected Output:**
```text
======================================================
   BBDevOps - AWS Lambda Contact API Local Test Suite  
======================================================

  [PASS] CORS Preflight (OPTIONS request)
         Status: 200
  [PASS] Anti-Spam Honeypot Trap (_gotcha populated)
         Silently returns 200 without invoking SES or consuming quota
  [PASS] Validation: Missing Email Address
         Correctly rejected with HTTP 400: {"error": "A valid email address is required."}
  [PASS] Validation: Malformed Email Address
         Correctly caught by regex with HTTP 400
  [PASS] Validation: Oversized Message (> 5,000 chars)
         Correctly rejected buffer overload attempt with HTTP 400
  [PASS] Successful Submission & SES Dispatch
         Dispatched with Reply-To=[sarah@skynet-defense.org], Status: 200

------------------------------------------------------
Result: All 6/6 Tests Passed Successfully!
------------------------------------------------------
```

---

## 4. Production Build & Static Validation

Before committing changes or pushing to GitHub, always run the full quality check:

```bash
# 1. Linting (fast Oxlint check)
npm run lint

# 2. Production build verification
npm run build

# 3. Test production bundle locally
npm run preview
```

- Oxlint should complete in milliseconds with **0 warnings and 0 errors**.
- `vite build` should compile cleanly and generate optimized code-split chunks in `/dist`.
- `npm run preview` lets you test the exact minified production bundle on `http://localhost:4173`.

---

## 5. Troubleshooting Local Issues

### Issue 1: `EBUSY: resource busy or locked` on Windows
- **Cause**: Node.js file watchers attempting to watch temporary files or files locked by Python processes.
- **Solution**: Handled automatically! In `vite.config.js`, the watcher is explicitly configured to ignore `**/infrastructure/**`, `**/*.py`, `**/__pycache__/**`, and `**/*.zip`. Never create ad-hoc scripts named `test.py` in the root folder; always use `infrastructure/test_local.py`.

### Issue 2: `ERR_BLOCKED_BY_CLIENT` on Privacy Page
- **Cause**: Browser ad blockers (uBlock Origin, Brave Shields) blocking scripts containing the keyword `PrivacyPolicy`.
- **Solution**: Handled automatically! The physical component file is named [src/pages/LegalNotice.jsx](file:///d:/Portfolio/BBDevOps/bbdevops/src/pages/LegalNotice.jsx), which bypasses all adblocker filters while retaining the user-facing `/privacy` route.

### Issue 3: Port 5173 is already in use
- **Cause**: Another dev server is already running in a background terminal.
- **Solution**: Vite will automatically offer the next available port (e.g. `http://localhost:5174`), or you can terminate existing node processes via Task Manager / PowerShell:
  ```powershell
  Get-Process node | Stop-Process
  ```
