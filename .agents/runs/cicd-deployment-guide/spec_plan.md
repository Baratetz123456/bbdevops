# Task Specification: Dedicated CI/CD Pipeline & Deployment Documentation

- **Task ID**: `cicd-deployment-guide`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `.github/workflows/ci.yml` (New)
  - `.github/workflows/deploy-aws.yml` (Enhanced)
  - `docs/CICD_DEPLOYMENT_GUIDE.md` (New)
  - `README.md` (Refactored)

---

## 1. Objectives & Technical Specifications

### A. CI/CD Workflows (`.github/workflows/`)
1. **Pull Request Validation (`ci.yml`)**:
   - Triggers: `pull_request` targeting `main`, `push` to non-main branches.
   - Environment: `ubuntu-latest`, Node.js 20 with `npm` caching.
   - Jobs: Checkout, `npm ci`, `npm run lint` (oxlint), `npm run build` (vite build).
2. **Production Deployment (`deploy-aws.yml`)**:
   - Triggers: `push` to `main`, `workflow_dispatch`.
   - Concurrency: `group: "production-deploy"`, `cancel-in-progress: false`.
   - Steps: Checkout, Node 20, `npm ci`, `npm run lint`, `npm run build`.
   - AWS Credentials: `aws-actions/configure-aws-credentials@v4` with `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`.
   - S3 Dual-Tier Sync:
     - `dist/assets` -> 1-year immutable cache (`max-age=31536000,public,immutable`).
     - Root HTML / JSON / Manifest -> No-cache (`no-cache,no-store,must-revalidate`).
   - CloudFront Edge Invalidation: Invalidate `/*` on `CLOUDFRONT_DISTRIBUTION_ID`.

### B. Dedicated CI/CD Guide (`docs/CICD_DEPLOYMENT_GUIDE.md`)
- Complete reference containing:
  - Architecture diagram (GitHub Actions -> S3 Origin -> CloudFront Global Edge).
  - GitHub Secrets inventory table (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`).
  - Copy-paste ready **Least-Privilege AWS IAM Policy JSON**.
  - Cache optimization strategy explanation.
  - Manual deployment and rollback procedures.
  - Common troubleshooting and diagnostics (403 AccessDenied, invalidation paths, stale browser assets).

### C. Clean README.md Refactoring
- Remove the 50-line manual deployment bash snippets.
- Replace with a concise, professional **"🚀 CI/CD & Deployment"** section with a workflow summary table and direct markdown links to `docs/CICD_DEPLOYMENT_GUIDE.md` and `docs/AWS_S3_CLOUDFRONT_GUIDE.md`.

---

## 2. Acceptance Criteria
- [x] `.github/workflows/ci.yml` authored and syntax validated.
- [x] `.github/workflows/deploy-aws.yml` updated with concurrency and caching guarantees.
- [x] `docs/CICD_DEPLOYMENT_GUIDE.md` created with complete IAM policy and secrets guide.
- [x] `README.md` streamlined with manual deployment code removed.
- [x] `npm run lint` passes with 0 warnings/errors.
- [x] `npm run build` passes with 0 errors.
