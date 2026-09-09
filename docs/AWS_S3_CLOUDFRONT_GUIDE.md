# Complete AWS S3 + CloudFront Deployment Guide

This guide provides a comprehensive, step-by-step walkthrough for deploying this **React 19 / Vite Single Page Application (SPA)** to **Amazon S3** and **Amazon CloudFront** using **Origin Access Control (OAC)** and **Custom Error Responses** for client-side routing.

---

## 🏗️ Architecture & Security Model

```text
[User Browser]
       │
       ▼ (HTTPS)
[Amazon CloudFront CDN (Global Edge)]
       │
       ├─► Cache Hit? ──► Returns cached static assets instantly (<20ms)
       │
       └─► Cache Miss? ──► Authenticated Request via OAC (Origin Access Control)
                                    │
                                    ▼
                          [Amazon S3 Private Bucket]
                          - Block All Public Access: ON
                          - Bucket Policy: Only CloudFront Distribution ARN allowed
                          - Default Root Object: index.html
```

### Why this setup is enterprise-grade:
1. **Private S3 Bucket**: S3 bucket is **not public**. Direct HTTP access to the S3 bucket is blocked.
2. **Origin Access Control (OAC)**: Modern AWS authentication mechanism replacing legacy OAI.
3. **Global CDN**: Assets are cached in 600+ CloudFront Points of Presence worldwide with HTTP/2 and HTTP/3 support.
4. **React SPA Routing**: Direct visits to routes like `/about` or `/projects` are routed via CloudFront Custom Error Responses to `/index.html` with HTTP 200, preventing S3 `403 Forbidden` or `404 Not Found` errors.

---

## 📋 Prerequisites

- An active **AWS Account** ([aws.amazon.com](https://aws.amazon.com)).
- **AWS CLI** installed and configured locally (`aws configure`), OR access to the **AWS Management Console**.
- **Node.js 18+** and **npm** installed.

---

## 🚀 Step-by-Step Deployment Walkthrough

### Step 1: Create a Private S3 Bucket

1. Open the **Amazon S3 Console**: [console.aws.amazon.com/s3](https://console.aws.amazon.com/s3/).
2. Click **Create bucket**.
3. Configure the following settings:
   - **Bucket name**: e.g., `jayson-barateta-portfolio-prod` (must be globally unique, lowercase, no underscores).
   - **AWS Region**: Select the region closest to you (e.g., `ap-southeast-1` Singapore or `us-east-1` N. Virginia).
   - **Object Ownership**: Select **ACLs disabled (recommended)**.
   - **Block Public Access settings for this bucket**: Keep **Block *all* public access** checked (**ON**).
   - **Bucket Versioning**: Optional (keep Disabled or Enable for rollback capabilities).
   - **Default encryption**: Select **Server-side encryption with Amazon S3 managed keys (SSE-S3)**.
4. Click **Create bucket**.

> [!NOTE]
> Do **NOT** enable "Static website hosting" on the S3 bucket. CloudFront with OAC connects to S3's standard REST API endpoint, keeping the bucket entirely private.

---

### Step 2: Create a CloudFront Distribution with Origin Access Control (OAC)

1. Open the **CloudFront Console**: [console.aws.amazon.com/cloudfront](https://console.aws.amazon.com/cloudfront/).
2. Click **Create distribution**.
3. Configure **Origin**:
   - **Origin domain**: Click the field and choose your S3 bucket from the dropdown (e.g., `jayson-barateta-portfolio-prod.s3.ap-southeast-1.amazonaws.com`).
   - **Origin access**: Select **Origin access control settings (recommended)**.
   - Click **Create control setting**:
     - Name: Default is fine (e.g., `jayson-barateta-portfolio-prod.s3.ap-southeast-1.amazonaws.com`).
     - Signing behavior: **Sign requests (recommended)**.
     - Origin type: **S3**.
     - Click **Create**.
4. Configure **Default cache behavior**:
   - **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**.
   - **Allowed HTTP methods**: Select **GET, HEAD**.
   - **Cache key and origin requests**: Select **Cache policy: CachingOptimized**.
7. Configure **Settings**:
   - **Price class**: Choose **Use all edge locations (best performance)** (covered under CloudFront's 1 TB Always Free Tier).
   - **Web Application Firewall (WAF)**: Select **"Do not enable security protections"**.
     > [!IMPORTANT]
     > Enabling AWS WAF incurs a mandatory **$5.00/month** fee plus per-request charges. Since your S3 bucket is 100% private via Origin Access Control (OAC) with all public access blocked, your static portfolio does not need WAF. Keep this disabled for a $0.00 bill!
   - **Default root object**: Enter **`index.html`**.
8. Click **Create distribution**.

---

### Step 3: Attach the S3 Bucket Policy (Allow CloudFront OAC)

Once created, CloudFront displays a yellow notification banner:
> *"The S3 bucket policy must allow access to CloudFront."*

1. Click **Copy policy** from the CloudFront banner.
2. Go back to your **S3 Bucket** in the AWS Console.
3. Click the **Permissions** tab.
4. Under **Bucket policy**, click **Edit**.
5. Paste the policy. It should look like this (replace with your bucket name and CloudFront distribution ARN):

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Sid": "AllowCloudFrontServicePrincipalReadOnly",
    "Effect": "Allow",
    "Principal": {
      "Service": "cloudfront.amazonaws.com"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
      }
    }
  }
}
```
6. Click **Save changes**.

---

### Step 4: Configure React SPA Custom Error Responses

Because this is a Single Page Application using `react-router-dom`, direct visits or page refreshes to paths like `/about`, `/projects`, or `/contact` do not correspond to physical folders in S3. Without custom error responses, CloudFront would return `403 Forbidden` or `404 Not Found`.

1. In the **CloudFront Console**, click on your distribution.
2. Go to the **Error pages** tab.
3. Click **Create custom error response**:
   - **HTTP error code**: Select **403: Forbidden**.
   - **Customize error response**: Select **Yes**.
   - **Response page path**: Enter **`/index.html`**.
   - **HTTP response code**: Select **200: OK**.
   - **Error caching minimum TTL (seconds)**: Enter **10**.
   - Click **Create custom error response**.
4. Click **Create custom error response** a second time:
   - **HTTP error code**: Select **404: Not Found**.
   - **Customize error response**: Select **Yes**.
   - **Response page path**: Enter **`/index.html`**.
   - **HTTP response code**: Select **200: OK**.
   - **Error caching minimum TTL (seconds)**: Enter **10**.
   - Click **Create custom error response**.

Now, whenever a user refreshes `/about`, CloudFront returns `/index.html` with HTTP 200, allowing React Router to render the correct view seamlessly!

---

### Step 5: Build and Upload Assets

#### Option A: Deploy via AWS CLI (Fastest)

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Sync static assets to S3 with cache optimization:
   ```bash
   # Sync hashed assets in /assets with 1-year immutable caching
   aws s3 sync dist/assets s3://YOUR_BUCKET_NAME/assets \
     --cache-control "max-age=31536000,public,immutable" \
     --delete

   # Sync root HTML/SVG/images with no-cache so updates propagate immediately
   aws s3 sync dist/ s3://YOUR_BUCKET_NAME \
     --exclude "assets/*" \
     --cache-control "no-cache,no-store,must-revalidate" \
     --delete
   ```

3. Create a CloudFront cache invalidation to instantly refresh all edge locations:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

#### Option B: Deploy via AWS S3 Console

1. Run `npm run build` locally.
2. In S3 Console, open your bucket.
3. Click **Upload**, drag and drop all files and folders from inside the local `dist/` directory, and click **Upload**.
4. In CloudFront Console, navigate to **Invalidations** tab -> **Create invalidation** -> enter `/*` -> click **Create invalidation**.

---

## 🤖 Automated CI/CD Deployment with GitHub Actions

This repository includes an automated workflow at [`.github/workflows/deploy-aws.yml`](../.github/workflows/deploy-aws.yml) that builds and deploys your site whenever you push to `main`.

### Setting up GitHub Secrets

1. Create an AWS IAM user with programmatic access and attach the following minimal policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3SyncPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

2. In your GitHub repository:
   - Go to **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret** and add:
     - `AWS_ACCESS_KEY_ID`: IAM user access key ID.
     - `AWS_SECRET_ACCESS_KEY`: IAM user secret access key.
     - `AWS_REGION`: e.g., `ap-southeast-1` or `us-east-1`.
     - `S3_BUCKET_NAME`: Your bucket name (e.g., `jayson-barateta-portfolio-prod`).
     - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (e.g., `E1234567890ABC`).

Every git push to `main` will now automatically test, build, deploy, and invalidate your CloudFront edge cache!

---

### Step 7: Zero-Cost Custom Domain Setup (Avoid Route 53 $0.50/mo Fee)

If you own a custom domain (such as **`bbdevops.dev`**), you can attach it to CloudFront with **$0.00 DNS fees** without paying AWS Route 53's $0.50/month hosted zone fee.

> 📖 **Complete Walkthrough for `bbdevops.dev`**: For an exhaustive, click-by-click manual covering how to buy `bbdevops.dev` on Cloudflare at wholesale cost and link it to CloudFront, read the dedicated guide: [**docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md**](CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md).

Quick summary of steps:
1. **Keep DNS at your Registrar or Cloudflare Free Tier**:
   - Use Cloudflare (Free), Namecheap, Porkbun, or Google Domains/Squarespace.
2. **Request a Free SSL Certificate in AWS Certificate Manager (ACM)**:
   - Go to **ACM Console** in **`us-east-1` (N. Virginia)** *(CloudFront requires ACM certificates to be in `us-east-1`)*.
   - Click **Request a public certificate** for your domain (e.g., `bbdevops.dev` and `*.bbdevops.dev`).
   - Validate via DNS by adding the provided `CNAME` record to your free DNS provider.
3. **Attach Custom Domain to CloudFront**:
   - In your CloudFront Distribution settings, click **Edit**.
   - Under **Alternate domain names (CNAME)**, add `bbdevops.dev` and `www.bbdevops.dev`.
   - Under **Custom SSL certificate**, select your validated ACM certificate.
4. **Point Free DNS to CloudFront**:
   - In your free DNS provider, create a `CNAME` record:
     - **Host**: `@` (Cloudflare CNAME flattening) or `www`
     - **Value / Target**: `YOUR_DISTRIBUTION_ID.cloudfront.net`
     - **TTL**: Auto / 1 Hour
     - **Proxy Status**: DNS Only (Grey Cloud)

---

## 🧪 Verification & Testing Checklist

After your CloudFront distribution status changes to **Enabled** and the deployment finishes:

1. **Root URL**: Open `https://YOUR_DISTRIBUTION_ID.cloudfront.net/`.
   - Verify that the homepage loads with the light theme and animated components.
2. **SPA Deep-Linking**:
   - Navigate to `https://YOUR_DISTRIBUTION_ID.cloudfront.net/about` directly in a new tab.
   - Press **F5** (hard refresh).
   - Ensure the About page renders without any 403 or 404 error.
3. **HTTPS & Security Headers**:
   - Verify that visiting `http://...` automatically redirects to `https://...`.
4. **Theme Persistence**:
   - Toggle theme using the moon/sun button, refresh the page, and ensure the preference is remembered.
