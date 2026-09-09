# CI/CD Deployment Guide: Automated Pipeline to AWS S3 & CloudFront

This document serves as the dedicated guide for the automated Continuous Integration and Continuous Deployment (CI/CD) pipelines powering the **BBDevOps Portfolio**.

---

## 🏗️ Pipeline Architecture

```text
[Developer Working on Feature Branch]
               │
               ▼ (git push / Pull Request)
    ┌──────────────────────────────────────────────┐
    │  GitHub Actions: CI Validation (ci.yml)      │
    │  ├─ npm ci                                   │
    │  ├─ npm run lint (oxlint)                    │
    │  └─ npm run build (vite build)               │
    └──────────────────────────────────────────────┘
               │
               ▼ (PR Approved & Merged to main)
    ┌──────────────────────────────────────────────┐
    │  GitHub Actions: Production CD (deploy-aws)  │
    │  ├─ Concurrency Lock (single-runner safety)  │
    │  ├─ Lint & Production Build Validation       │
    │  ├─ AWS IAM Authentication                   │
    │  ├─ 2-Tier S3 Sync (Hashed vs Root Assets)   │
    │  └─ CloudFront Edge Cache Invalidation (/*)  │
    └──────────────────────────────────────────────┘
               │
       ┌───────┴──────────────────────┐
       ▼                              ▼
[Amazon S3 Private Bucket]   [CloudFront CDN Edge (600+ PoPs)]
  - assets/ (1-yr immutable)    - Instant global propagation
  - index.html (no-cache)       - <20ms latency worldwide
```

---

## 📁 Workflow Manifest

| Workflow | File | Trigger | Purpose |
| :--- | :--- | :--- | :--- |
| **CI - PR & Branch Validation** | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Pull Requests targeting `main`, pushes to non-main branches | Blocks broken code and lint regressions from entering `main`. |
| **CD - Production Deployment** | [`.github/workflows/deploy-aws.yml`](../.github/workflows/deploy-aws.yml) | Push to `main`, manual `workflow_dispatch` | Automatically builds, syncs to S3 with cache optimization, and invalidates CloudFront. |

---

## 🔐 Required GitHub Repository Secrets

To enable automated deployments, configure the following secrets in your GitHub repository under **Settings → Secrets and variables → Actions → Repository secrets**:

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | AWS IAM User Access Key with least-privilege deployment permissions | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM User Secret Access Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Target AWS Region of your S3 Bucket | `ap-southeast-1` or `us-east-1` |
| `S3_BUCKET_NAME` | The exact name of your private S3 bucket | `jayson-barateta-portfolio-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID`| The ID of your CloudFront distribution | `E1A2B3C4D5E6F7` |

---

## 🛡️ Least-Privilege IAM Deployment Policy

Never use full administrator credentials for CI/CD runners. Create a dedicated IAM user (e.g., `github-actions-portfolio-deployer`) and attach the following minimal policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketSyncAndList",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME"
    },
    {
      "Sid": "S3ObjectManagement",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_CLOUDFRONT_DISTRIBUTION_ID"
    }
  ]
}
```

> [!NOTE]
> Replace `YOUR_BUCKET_NAME`, `YOUR_AWS_ACCOUNT_ID`, and `YOUR_CLOUDFRONT_DISTRIBUTION_ID` with your actual AWS values.

---

## ⚡ Two-Tier Cache Strategy Explained

The deployment workflow uses a dual-tier caching strategy that guarantees high performance and instant updates:

### Tier 1: Content-Hashed Bundles (`dist/assets/`)
- **Vite Output**: JS, CSS, and chunk assets are named with content hashes (e.g. `index-D2jGspZC.css`, `Projects-Bxye4W1y.js`).
- **Header**: `--cache-control "max-age=31536000,public,immutable"`
- **Why**: Browsers and CloudFront edge servers cache these files for **1 full year**. If code changes, Vite produces a brand-new filename hash, preventing stale asset collisions.

### Tier 2: Entry Points & Metadata (`dist/` root)
- **Files**: `index.html`, `favicon.svg`, `robots.txt`, `site.webmanifest`.
- **Header**: `--cache-control "no-cache,no-store,must-revalidate"`
- **Why**: Browsers always revalidate `index.html` on each page visit to immediately detect new bundle hash references.

### Tier 3: Edge Cache Invalidation
- The workflow invalidates `/*` in CloudFront after S3 sync completes.
- Edge caches immediately drop old `index.html` copies, ensuring visitors receive the latest release within seconds worldwide.

---

## 🕹️ Manual Deployments & Rollbacks

### Triggering a Manual Deployment
1. Go to **Actions** in your GitHub repository.
2. Select **CD - Deploy to AWS S3 & CloudFront**.
3. Click **Run workflow**, select the `main` branch, and click **Run workflow**.

### Rolling Back a Release
If an unexpected regression reaches production:
1. Identify the previous stable commit SHA on `main`.
2. Run locally or revert via git:
   ```bash
   git revert HEAD
   git push origin main
   ```
3. The CD pipeline will trigger automatically and restore the previous production state within ~1 minute.

---

## 💰 Cost Analysis & Zero-Cost Operating Guide

This portfolio architecture is specifically engineered to run at **$0.00 / month (Free Tier)** and **less than $0.02 / month thereafter** with zero maintenance fees.

### 1. Monthly Cost Breakdown

| Component | AWS / GitHub Free Tier Allowance | Portfolio Usage | Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Amazon CloudFront** | **1 TB** data transfer out/mo (Always Free)<br>**10,000,000** HTTP/HTTPS requests/mo (Always Free)<br>**1,000** free invalidations/mo (Always Free) | ~500 MB data transfer<br>~5,000 requests<br>~20-50 invalidations | **$0.00** |
| **Amazon S3 Storage** | **5 GB** Standard Storage (Free for 12 mos)<br>After 12 mos: $0.023 / GB | ~1.5 MB total bundle size<br>(0.0015 GB) | **$0.00** (Free Tier)<br>**$0.000035 / mo** (Post-Free Tier) |
| **Amazon S3 API Requests** | **20,000** GET requests / mo (Free Tier)<br>**2,000** PUT requests / mo (Free Tier) | ~25 PUT requests per deploy<br>(CloudFront absorbs 99%+ of GETs) | **$0.00** |
| **GitHub Actions** | **2,000** free Linux runner minutes/mo (Free for personal repos) | ~30s (0.5 min) per workflow run<br>(Capacity: 4,000 deploys/mo) | **$0.00** |
| **Total Estimated Cost** | — | — | **$0.00 / month** (Year 1)<br>**<$0.01 / month** (Year 2+) |

---

### 2. The 4 Hidden Cost Traps & How to Avoid Them

Even on static sites, developers sometimes get surprised by unexpected AWS charges. Follow these rules to keep your bill at $0:

#### ❌ Trap 1: Creating a Route 53 Hosted Zone ($0.50 / month = $6.00 / year)
- **The Trap**: Route 53 charges $0.50 per month for each hosted zone domain, regardless of traffic.
- **The Zero-Cost Fix**: Do **NOT** use Route 53 for DNS. Keep your domain on a free DNS provider (such as **Cloudflare Free Tier**, **Namecheap**, or **Porkbun**). In your DNS settings, simply create a standard `CNAME` record pointing your domain (e.g. `portfolio.yourdomain.com` or `@`) to your CloudFront distribution domain (`d111111abcdef8.cloudfront.net`). **Cost: $0.00**.

#### ❌ Trap 2: Enabling AWS WAF on CloudFront ($5.00 / month + $1.00 per rule)
- **The Trap**: When creating a CloudFront distribution, AWS prompts you to enable AWS WAF (Web Application Firewall). WAF has a $5.00/month flat fee plus per-request fees.
- **The Zero-Cost Fix**: Select **"Do not enable security protections"** during distribution creation. Because your S3 bucket is 100% private with Origin Access Control (OAC) and all public access is blocked, your static portfolio is already immune to server-side attacks. **Cost: $0.00**.

#### ❌ Trap 3: CloudFront Invalidation Path Sprawl ($0.005 per path after 1,000)
- **The Trap**: If your CI/CD script invalidates 30 individual file paths per deploy (`/index.html`, `/assets/index.js`, `/assets/style.css`, etc.), you will exhaust the 1,000 monthly free path quota in just 33 deploys.
- **The Zero-Cost Fix**: Our pipeline uses a single wildcard path:
  ```bash
  aws cloudfront create-invalidation --distribution-id $ID --paths "/*"
  ```
  `/*` counts as **exactly 1 path**. You can deploy 1,000 times every month completely free.

#### ❌ Trap 4: S3 Object Version Accumulation
- **The Trap**: If S3 bucket versioning is enabled without an expiration policy, previous builds remain stored indefinitely.
- **The Zero-Cost Fix**: Apply the S3 Lifecycle Configuration rule below to automatically purge old versions after 14 days.

---

### 3. S3 Bucket Lifecycle Configuration (Auto-Purge Old Versions)

Save this configuration to `s3-lifecycle.json` and run the command below:

```json
{
  "Rules": [
    {
      "ID": "PruneOldAssetsAndAbortIncompleteUploads",
      "Status": "Enabled",
      "Filter": {},
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 14
      },
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    }
  ]
}
```

Apply via AWS CLI:
```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket YOUR_BUCKET_NAME \
  --lifecycle-configuration file://s3-lifecycle.json
```

---

### 4. Zero-Spend Budget & Billing Alerts

Set up automated guardrails so AWS sends you an immediate email alert if your projected charges exceed even **$0.01**.

#### Method A: AWS Console
1. Open **AWS Billing and Cost Management** → **Budgets**: [console.aws.amazon.com/billing/home#/budgets](https://console.aws.amazon.com/billing/home#/budgets).
2. Click **Create budget** → Select **Zero spend budget** (simplest template).
3. Set your notification email address.
4. Click **Create budget**.

#### Method B: Enable Free Tier Usage Alerts
1. Open **Billing Preferences**: [console.aws.amazon.com/billing/home#/preferences](https://console.aws.amazon.com/billing/home#/preferences).
2. Check **Receive Free Tier Usage Alerts** and input your email address.
3. Check **Receive Billing Alerts**.
4. Click **Save preferences**.

---

## 🔍 Troubleshooting & Diagnostics

### 1. `AccessDenied` on S3 Sync
- **Cause**: IAM user missing `s3:ListBucket` or `s3:PutObject` on the target bucket.
- **Fix**: Verify bucket ARN in the IAM policy matches `arn:aws:s3:::YOUR_BUCKET_NAME` and `arn:aws:s3:::YOUR_BUCKET_NAME/*`.

### 2. `AccessDenied` on CloudFront Invalidation
- **Cause**: IAM policy resource constraint does not match distribution ARN.
- **Fix**: Verify the distribution ARN format: `arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID`.

### 3. Route Refresh Returns 403 / 404 (SPA Routing)
- **Cause**: CloudFront origin request tried to find `/history` or `/projects` as a literal S3 object key.
- **Fix**: Configure CloudFront Custom Error Responses:
  - Error Code: `403` -> Response Page: `/index.html` -> HTTP Response: `200`
  - Error Code: `404` -> Response Page: `/index.html` -> HTTP Response: `200`
  - Refer to [AWS_S3_CLOUDFRONT_GUIDE.md](AWS_S3_CLOUDFRONT_GUIDE.md) for step-by-step console instructions.

---

## 🔗 Related Documentation
- [AWS S3 + CloudFront Infrastructure Setup Guide](AWS_S3_CLOUDFRONT_GUIDE.md)
- [Project Documentation](../README.md)
