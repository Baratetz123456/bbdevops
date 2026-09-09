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

## 🚀 Step-by-Step Guide: Setting Up CI/CD in GitHub & AWS

Follow this click-by-click walkthrough in your web browser. No special terminal tools or complex command lines are required.

---

### Step 1: Create the AWS IAM Deployment Credentials

First, create a secure, dedicated IAM user in AWS with permissions limited *strictly* to your portfolio's S3 bucket and CloudFront distribution.

1. Log in to the **AWS Management Console**: [console.aws.amazon.com](https://console.aws.amazon.com/).
2. In the top search bar, type **IAM** and select **IAM (Identity and Access Management)**.
3. In the left navigation sidebar, click **Users** under *Access management*.
4. Click the blue **Create user** button:
   - **User name**: Enter `github-actions-portfolio-deployer`.
   - Leave "Provide user access to the AWS Management Console" **unchecked** (this user only needs programmatic API access).
   - Click **Next**.
5. On the **Set permissions** screen:
   - Select **Attach policies directly**.
   - Click the **Create policy** button on the right (opens in a new browser tab).
   - In the Policy editor, click the **JSON** tab.
   - Delete any default text and paste the [Least-Privilege IAM Deployment Policy](#%EF%B8%8F-least-privilege-iam-deployment-policy) provided below (make sure to replace `YOUR_BUCKET_NAME`, `YOUR_AWS_ACCOUNT_ID`, and `YOUR_CLOUDFRONT_DISTRIBUTION_ID` with your actual values).
   - Click **Next**.
   - **Policy name**: Enter `PortfolioCICDDeploymentPolicy`.
   - Click **Create policy**.
6. Return to your original browser tab with the **Create user** flow:
   - Click the small **refresh button** next to "Create policy".
   - Search for `PortfolioCICDDeploymentPolicy`, check the checkbox next to it, and click **Next**.
7. Click **Create user**.
8. Click on your newly created user (`github-actions-portfolio-deployer`):
   - Go to the **Security credentials** tab.
   - Scroll down to the **Access keys** section and click **Create access key**.
   - Select the use case: **Application running outside AWS** (or "Other").
   - Click **Next**, then click **Create access key**.
   - **Important**: Click **Download .csv file** or copy both:
     - **Access key ID** (starts with `AKIA...`)
     - **Secret access key** (long string of characters)
     > [!WARNING]
     > This is the only time your Secret Access Key will ever be displayed. Keep this tab open until you add it to GitHub!

---

### Step 2: Add the Secrets to Your GitHub Repository

Now, securely save your AWS credentials and resource IDs into your GitHub repository so the automated Actions runner can deploy your code.

1. In a new browser tab, go to your GitHub repository (e.g., `https://github.com/YourUsername/bbdevops`).
2. Click the **Settings** tab in the top repository navigation bar (next to *Insights*).
3. In the left sidebar, scroll down to the **Security** section and click **Secrets and variables**, then click **Actions**.
4. On the **Actions secrets and variables** page, click the green **New repository secret** button.
5. Add the following **5 secrets** one by one:

   #### Secret 1: `AWS_ACCESS_KEY_ID`
   - **Name**: `AWS_ACCESS_KEY_ID`
   - **Secret**: Paste the Access Key ID copied from AWS (starts with `AKIA...`).
   - Click **Add secret**.

   #### Secret 2: `AWS_SECRET_ACCESS_KEY`
   - Click **New repository secret**.
   - **Name**: `AWS_SECRET_ACCESS_KEY`
   - **Secret**: Paste the Secret Access Key copied from AWS.
   - Click **Add secret**.

   #### Secret 3: `AWS_REGION`
   - Click **New repository secret**.
   - **Name**: `AWS_REGION`
   - **Secret**: Enter your S3 bucket's AWS region code (e.g. `ap-southeast-1` for Singapore, or `us-east-1` for N. Virginia).
   - Click **Add secret**.

   #### Secret 4: `S3_BUCKET_NAME`
   - Click **New repository secret**.
   - **Name**: `S3_BUCKET_NAME`
   - **Secret**: Enter the exact name of your private S3 bucket (e.g. `jayson-barateta-portfolio-prod`).
   - Click **Add secret**.

   #### Secret 5: `CLOUDFRONT_DISTRIBUTION_ID`
   - Click **New repository secret**.
   - **Name**: `CLOUDFRONT_DISTRIBUTION_ID`
   - **Secret**: Enter the 14-character alphanumeric ID of your CloudFront distribution (e.g. `E1A2B3C4D5E6F7`).
   - Click **Add secret**.

When finished, your **Repository secrets** list in GitHub should display all 5 secrets:
```text
AWS_ACCESS_KEY_ID           Updated now
AWS_SECRET_ACCESS_KEY       Updated now
AWS_REGION                  Updated now
S3_BUCKET_NAME              Updated now
CLOUDFRONT_DISTRIBUTION_ID  Updated now
```

---

### Step 3: Verify GitHub Actions Workflow Permissions

To ensure your GitHub Actions runner has permission to read repository code and run builds:

1. In your GitHub repository, stay in the **Settings** tab.
2. In the left sidebar under *Code and automation*, click **Actions** → click **General**.
3. Scroll down to the **Workflow permissions** section:
   - Ensure **Read and write permissions** is selected.
   - Check **Allow GitHub Actions to create and approve pull requests**.
4. Click **Save** if prompted.

---

### Step 4: Run & Verify Your First Deployment (Zero-Risk Manual Test)

You do not need to make any code changes to test your pipeline. You can trigger an immediate test deployment directly from the GitHub UI:

1. Click on the **Actions** tab in the top navigation bar of your GitHub repository.
2. In the left sidebar under *All workflows*, click on **CD - Deploy to AWS S3 & CloudFront**.
3. On the right side of the screen, you will see a blue banner with a **Run workflow** dropdown button:
   - Click **Run workflow**.
   - Leave the branch set to **Branch: main**.
   - Click the green **Run workflow** button.
4. Refresh the page after 5 seconds:
   - You will see a new workflow run appear with a yellow spinning circle: `CD - Deploy to AWS S3 & CloudFront`.
5. Click on the run name to watch the real-time progress:
   - Click on the **Build & Deploy to Production** job box.
   - You can watch each step execute live:
     - `Checkout Repository` (5s)
     - `Install Dependencies` (~10s)
     - `Run Linter (Oxlint)` (0.1s)
     - `Build Production Bundle` (~1s)
     - `Configure AWS Credentials` (1s)
     - `Sync Static Assets to S3` (2s)
     - `Sync Root Files to S3` (1s)
     - `Invalidate CloudFront Cache` (1s)
6. Once complete, a bright green checkmark `✓` will appear!
7. Scroll down to the bottom of the page or click **Summary** in the left sidebar to view the **Deployment Summary** step receipt confirming the target S3 bucket, CloudFront distribution ID, and git commit SHA.
8. Open your CloudFront domain (e.g. `https://d12345abcdef.cloudfront.net`) in your browser to admire your live portfolio!

---

### Step 5: Verify Automated Pull Request Quality Gate

To test how GitHub protects your codebase on every future code contribution:

1. On your local machine or in GitHub, create a new branch:
   ```bash
   git checkout -b test-ci-pipeline
   ```
2. Make any small cosmetic edit (e.g. adding a comment in a file).
3. Commit and push your branch:
   ```bash
   git commit -am "test: verify automated CI pipeline"
   git push origin test-ci-pipeline
   ```
4. On GitHub, open a **Pull Request** from `test-ci-pipeline` into `main`.
5. GitHub will automatically trigger the **CI - PR & Branch Validation** workflow (`ci.yml`):
   - You will see the check running at the bottom of the Pull Request.
   - It will run Oxlint and Vite build automatically.
   - Only when it turns **Green `✓`** will GitHub indicate that the branch is safe to merge!
6. Once merged into `main`, the CD pipeline will immediately trigger and deploy your update to AWS in ~30 seconds!

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
