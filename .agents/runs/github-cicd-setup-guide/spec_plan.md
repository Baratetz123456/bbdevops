# Task Specification: Complete Step-by-Step GitHub CI/CD Setup Guide

- **Task ID**: `github-cicd-setup-guide`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `docs/CICD_DEPLOYMENT_GUIDE.md`
  - `README.md`

---

## 1. Objectives & Technical Specifications

### A. Step-by-Step Setup Walkthrough in `docs/CICD_DEPLOYMENT_GUIDE.md`
Provide an exhaustive, sequential browser click-by-click guide:
- **Phase 1: Generate AWS IAM Deployment Credentials (AWS Console)**
  - Open AWS IAM Console → Users → Create user (name: `github-actions-portfolio-deployer`).
  - Attach Least-Privilege Inline Policy JSON (allowing only S3 and CloudFront actions on the specific bucket and distribution).
  - Go to Security credentials → Create access key → Choose "Third-party service" → Copy Access Key ID and Secret Access Key.
- **Phase 2: Add Secrets to GitHub Repository (GitHub Web UI)**
  - Navigate to GitHub repo → Click **Settings** (top navigation tab).
  - In left sidebar under *Security*, click **Secrets and variables** → click **Actions**.
  - Click the green **New repository secret** button.
  - Step-by-step instruction for adding each of the 5 required secrets:
    1. `AWS_ACCESS_KEY_ID`
    2. `AWS_SECRET_ACCESS_KEY`
    3. `AWS_REGION`
    4. `S3_BUCKET_NAME`
    5. `CLOUDFRONT_DISTRIBUTION_ID`
  - Visual representation of the completed secrets list.
- **Phase 3: Configure GitHub Actions Workflow Permissions**
  - In GitHub repo Settings → Actions → General.
  - Ensure *Workflow permissions* has **Read and write permissions** (or Read repository contents).
- **Phase 4: Run & Verify Your First Deployment (Zero-Risk Manual Test)**
  - Go to the **Actions** tab in GitHub.
  - Select **CD - Deploy to AWS S3 & CloudFront** from the left workflow list.
  - Click **Run workflow** dropdown → Select `main` branch → Click green **Run workflow** button.
  - Watch live progress: click the running workflow, view build and deployment steps.
  - Inspect the **Deployment Summary** step receipt with bucket, distribution, and commit SHA.
  - Open the live CloudFront domain URL to verify the site.
- **Phase 5: Automated Pull Request Protection Gate**
  - Explains how opening a PR automatically triggers `CI - Pull Request & Branch Validation` (`ci.yml`) to enforce code quality before merge.

### B. README.md Refinement
- Update `README.md` CI/CD section to prominently point to this new step-by-step guide.

---

## 2. Acceptance Criteria
- [x] Clear, numbered browser click-by-click instructions in `docs/CICD_DEPLOYMENT_GUIDE.md`.
- [x] Zero terminal requirements for the setup process.
- [x] Real-time verification and manual run steps documented.
- [x] `npm run lint` and `npm run build` pass with 0 errors.
