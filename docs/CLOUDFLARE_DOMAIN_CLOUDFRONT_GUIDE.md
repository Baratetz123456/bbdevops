# Step-by-Step Guide: Buying bbdevops.dev on Cloudflare & Connecting to AWS CloudFront

This guide provides an exhaustive, beginner-friendly, click-by-click walkthrough for purchasing **`bbdevops.dev`** on **Cloudflare Registrar** at zero-markup wholesale cost, and connecting it to your **Amazon CloudFront** distribution with a free wildcard SSL certificate.

---

## 🏗️ Architecture Overview

```text
[User Browser]
       │
       ▼ (Queries DNS: "Where is bbdevops.dev?")
[Cloudflare Global Anycast DNS] (DNS-Only / Grey Cloud)
       │  - CNAME Flattening: bbdevops.dev ──► d12345abcdef.cloudfront.net
       │  - CNAME Record:     www.bbdevops.dev ──► d12345abcdef.cloudfront.net
       ▼
[Amazon CloudFront Global Edge CDN]
       │  - SSL Termination: AWS ACM Certificate (*.bbdevops.dev in us-east-1)
       │  - Error Responses: 403/404 ──► /index.html (200 OK)
       ▼ (Origin Access Control - OAC)
[Amazon S3 Private Origin Bucket]
```

### Why this combination is the developer gold standard:
1. **At-Cost Domain Pricing**: Cloudflare Registrar charges wholesale registry fees ($0 markup, ~$10–$12/year for `.dev` with free WHOIS privacy forever).
2. **Zero DNS Hosting Fees**: Bypasses AWS Route 53 ($0.50/month = $6.00/year), keeping your AWS DNS bill at **$0.00**.
3. **Automatic Apex CNAME Flattening**: Allows root domain `bbdevops.dev` (not just subdomains) to point directly to CloudFront without complex IP management.
4. **Google Registry `.dev` Security**: `.dev` domains are preloaded on the global browser HSTS list, guaranteeing all visitors use encrypted HTTPS.

---

## 📋 Prerequisites

Before starting, make sure you have:
- An active **AWS Account** ([aws.amazon.com](https://aws.amazon.com)) with your CloudFront distribution deployed.
- Your **CloudFront Distribution Domain Name** (e.g., `d123456abcdef7.cloudfront.net`).
- A valid credit card or PayPal account for the domain purchase on Cloudflare (~$10–$12/year).

---

## 🚀 Step-by-Step Walkthrough

### Phase 1: Purchase `bbdevops.dev` on Cloudflare Registrar

1. **Log in or Sign Up**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and create a free account (or log in).
2. **Navigate to Domain Registration**:
   - In the left sidebar of the Cloudflare dashboard, click **Domain Registration** → **Register Domains**.
3. **Search for Your Domain**:
   - In the search bar, type `bbdevops.dev` and press **Enter**.
   - You will see `bbdevops.dev` listed as **Available** (typical wholesale price: ~$10.45 to $12.00 / year).
4. **Complete the Purchase**:
   - Click the green **Purchase** button next to `bbdevops.dev`.
   - Select your registration period (1 year is standard; auto-renew is recommended).
   - Enter your contact information for the ICANN registry.
     > [!NOTE]
     > Cloudflare provides **Free WHOIS Privacy protection** automatically. Your personal name, address, and phone number are completely masked from the public.
   - Enter your payment details and click **Confirm Purchase**.
5. Once payment succeeds, Cloudflare automatically adds `bbdevops.dev` as an active zone in your account!

---

### Phase 2: Request Free Wildcard SSL in AWS Certificate Manager (ACM)

Because `.dev` domains strictly require HTTPS, and CloudFront is a global AWS service, your SSL certificate **MUST** be created in the **`us-east-1` (N. Virginia)** region.

1. Open the **AWS Management Console**: [console.aws.amazon.com](https://console.aws.amazon.com/).
2. In the top right header, click the **Region selector** and switch to **US East (N. Virginia) `us-east-1`**.
   > [!IMPORTANT]
   > CloudFront will **only** detect ACM certificates created in `us-east-1`. Even if your S3 bucket is in Singapore (`ap-southeast-1`) or Tokyo (`ap-northeast-1`), this certificate must be in `us-east-1`!
3. In the top AWS search bar, type **Certificate Manager** and select **AWS Certificate Manager**.
4. Click the orange **Request a certificate** button:
   - Select **Request a public certificate** → click **Next**.
5. On the **Request public certificate** screen:
   - **Fully qualified domain name**: Enter `bbdevops.dev`.
   - Click **Add another name to this certificate**:
     - Enter `*.bbdevops.dev` *(This wildcard allows `www.bbdevops.dev` and any future subdomains to share the same certificate)*.
   - **Validation method**: Select **DNS validation (recommended)**.
   - **Key algorithm**: Keep **RSA 2048**.
6. Click the orange **Request** button at the bottom.
7. Click on the newly requested certificate in the list (its status will show as **Pending validation**).
8. Scroll down to the **Domains** section. You will see a table with:
   - **CNAME name**: (e.g. `_a1b2c3d4e5f6.bbdevops.dev.`)
   - **CNAME value**: (e.g. `_x9y8z7w6v5u4.acm-validations.aws.`)
   - Keep this browser tab open. You will copy these two values in Phase 3.

---

### Phase 3: Validate Certificate in Cloudflare DNS

Now, prove to AWS that you own `bbdevops.dev` by adding the validation record to Cloudflare:

1. Return to the **Cloudflare Dashboard**: [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Click on your newly purchased domain: **`bbdevops.dev`**.
3. In the left navigation sidebar, click **DNS** → **Records**.
4. Click the blue **Add record** button:
   - **Type**: Select **`CNAME`**.
   - **Name**: Copy the **CNAME name** from AWS ACM.
     > [!TIP]
     > Cloudflare automatically appends your domain name. If ACM gives you `_a1b2c3.bbdevops.dev.`, you only need to paste `_a1b2c3` into the Name field (or paste the whole string and Cloudflare will auto-trim it).
   - **Target**: Paste the full **CNAME value** from AWS ACM (e.g. `_x9y8z7.acm-validations.aws.`).
   - **Proxy status**: Click the toggle to switch from *Proxied (Orange Cloud)* to **DNS only (Grey Cloud)**.
     > [!IMPORTANT]
     > The ACM validation record **must** be set to **DNS only (Grey Cloud)** so AWS can verify it directly.
   - **TTL**: Keep **Auto**.
5. Click **Save**.
6. Return to your **AWS Certificate Manager** tab in AWS:
   - Refresh the page after 2 to 5 minutes.
   - The status of your certificate will change from **Pending validation** to **Issued (Success)** with a green badge!

---

### Phase 4: Attach `bbdevops.dev` to Your CloudFront Distribution

Once the ACM certificate is **Issued**, attach your domain to CloudFront:

1. Open the **Amazon CloudFront Console**: [console.aws.amazon.com/cloudfront](https://console.aws.amazon.com/cloudfront/).
2. Click on your portfolio distribution in the list.
3. Stay on the **General** tab and scroll down to the **Settings** section.
4. Click **Edit**:
   - **Alternate domain names (CNAME)**:
     - Click **Add item** → enter **`bbdevops.dev`**.
     - Click **Add item** again → enter **`www.bbdevops.dev`**.
   - **Custom SSL certificate**:
     - Click the dropdown field.
     - Select your newly issued ACM certificate: **`bbdevops.dev (xxxxxxxx-xxxx-xxxx)`**.
   - **Security policy**: Keep **TLSv1.2_2021 (recommended)**.
   - **Supported HTTP versions**: Keep **HTTP/2, HTTP/3**.
5. Scroll to the bottom and click **Save changes**.
6. Wait 1 to 2 minutes while CloudFront status updates from *Deploying* to *Enabled*.

---

### Phase 5: Point Cloudflare DNS to CloudFront

Finally, tell Cloudflare to route visitors of `bbdevops.dev` and `www.bbdevops.dev` directly to CloudFront:

1. Copy your **CloudFront Distribution domain name** (e.g., `d123456abcdef7.cloudfront.net`) from the CloudFront General tab.
2. Go back to the **Cloudflare Dashboard** → click **`bbdevops.dev`** → **DNS** → **Records**.
3. Add the **Apex (Root) Domain Record**:
   - Click **Add record**:
     - **Type**: Select **`CNAME`**.
     - **Name**: Enter **`@`** (this represents the root domain `bbdevops.dev`).
     - **Target**: Paste your CloudFront domain (e.g. `d123456abcdef7.cloudfront.net`).
     - **Proxy status**: Click the toggle to set **DNS only (Grey Cloud)**.
       > [!NOTE]
       > Setting **DNS only (Grey Cloud)** avoids CloudFront-to-Cloudflare SSL handshake conflicts (Error 525) and allows CloudFront to handle global edge caching directly. Cloudflare's CNAME Flattening handles the apex root automatically!
     - **TTL**: Auto.
   - Click **Save**.
4. Add the **WWW Subdomain Record**:
   - Click **Add record**:
     - **Type**: Select **`CNAME`**.
     - **Name**: Enter **`www`**.
     - **Target**: Paste your CloudFront domain (e.g. `d123456abcdef7.cloudfront.net`).
     - **Proxy status**: Select **DNS only (Grey Cloud)**.
     - **TTL**: Auto.
   - Click **Save**.

Your completed Cloudflare DNS records table should look like this:

| Type | Name | Content / Target | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| `CNAME` | `_a1b2c3...` | `_x9y8z7...acm-validations.aws.` | **DNS only** (Grey) | Auto |
| `CNAME` | `bbdevops.dev` (`@`) | `d123456abcdef7.cloudfront.net` | **DNS only** (Grey) | Auto |
| `CNAME` | `www` | `d123456abcdef7.cloudfront.net` | **DNS only** (Grey) | Auto |

---

## 🧪 Phase 6: Verification & Testing Checklist

DNS propagation on Cloudflare typically takes **under 60 seconds**.

### 1. Test Root Domain
Open your browser and navigate to:
```text
https://bbdevops.dev
```
- Verify the green lock icon / secure HTTPS connection in the browser address bar.
- Check that your warm-themed portfolio loads smoothly.

### 2. Test WWW Subdomain
Navigate to:
```text
https://www.bbdevops.dev
```
- Verify that `www` loads your portfolio with the exact same valid SSL certificate.

### 3. Test React SPA Deep-Linking
In a new tab, navigate directly to an internal route:
```text
https://bbdevops.dev/history
https://bbdevops.dev/projects
https://bbdevops.dev/about
```
- Press **Ctrl + F5** (hard refresh).
- Ensure that the page loads directly without returning a `403 Forbidden` or `404 Not Found` error. *(If it returns 403, verify that your CloudFront Custom Error Responses for 403 and 404 point to `/index.html` with HTTP 200)*.

---

## 🔍 Troubleshooting & FAQs

### Error: `CNAMEAlreadyExists` in CloudFront
- **Cause**: The domain `bbdevops.dev` is already attached to another AWS account or another active distribution.
- **Fix**: Verify that no older test distribution in your AWS account still has `bbdevops.dev` listed under Alternate domain names.

### Error: `525 SSL Handshake Failed`
- **Cause**: Cloudflare proxy was set to *Orange Cloud* (Proxied) while Cloudflare SSL/TLS mode was not set to "Full (Strict)".
- **Fix**: Switch the Cloudflare CNAME records for `@` and `www` to **DNS only (Grey Cloud)** as instructed in Phase 5. This eliminates all handshake proxy friction.

### Why does `.dev` require HTTPS?
- **Explanation**: All `.dev` domains are owned by Google Registry and are included in the global **HSTS Preload List** compiled into Chrome, Firefox, Edge, and Safari. Browsers will strictly refuse to connect over plain HTTP (`http://`). Because your CloudFront distribution redirects HTTP to HTTPS with an ACM certificate, this works automatically!

---

## 🔗 Related Documentation
- [AWS S3 + CloudFront Infrastructure Setup Guide](AWS_S3_CLOUDFRONT_GUIDE.md)
- [Automated CI/CD Deployment Guide](CICD_DEPLOYMENT_GUIDE.md)
- [Project Documentation](../README.md)
