# Task Specification: Cloudflare Domain Purchase & AWS CloudFront Setup Guide

- **Task ID**: `cloudflare-domain-guide`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md` (New)
  - `docs/AWS_S3_CLOUDFRONT_GUIDE.md` (Updated)
  - `README.md` (Updated)

---

## 1. Objectives & Technical Specifications

### A. Dedicated Guide: `docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md`
Author a comprehensive, click-by-click manual covering:
1. **Phase 1: Purchasing `bbdevops.dev` on Cloudflare Registrar**:
   - Account setup and navigation to Domain Registration.
   - Searching for `bbdevops.dev` (~$10–$12/year at wholesale at-cost pricing with zero markup).
   - Completing checkout with free WHOIS privacy and free DNS hosting.
2. **Phase 2: Request Free SSL Certificate in AWS Certificate Manager (ACM)**:
   - Hard requirement: Selecting the **`us-east-1` (N. Virginia)** region in AWS Console.
   - Domains requested: `bbdevops.dev` and `*.bbdevops.dev` (wildcard covering `www`).
   - Validation method: DNS Validation.
3. **Phase 3: Validate Certificate in Cloudflare DNS**:
   - Copying ACM CNAME Name and Value.
   - Adding CNAME record in Cloudflare with **DNS-Only (Grey Cloud)** mode.
   - Verifying that ACM status changes to `Issued (Success)`.
4. **Phase 4: Attach Custom Domain to CloudFront Distribution**:
   - Adding Alternate Domain Names (CNAMEs): `bbdevops.dev` and `www.bbdevops.dev`.
   - Selecting the validated ACM certificate.
   - Enforcing TLSv1.2_2021 security policy.
5. **Phase 5: Point Cloudflare DNS to CloudFront**:
   - Apex `@` CNAME record pointing to `YOUR_DISTRIBUTION_ID.cloudfront.net` (utilizing Cloudflare CNAME flattening, **Grey Cloud / DNS-Only**).
   - `www` CNAME record pointing to `YOUR_DISTRIBUTION_ID.cloudfront.net` (**Grey Cloud / DNS-Only**).
6. **Phase 6: Verification & .dev HSTS Preload Details**:
   - Testing `https://bbdevops.dev` and `https://www.bbdevops.dev`.
   - Testing direct SPA routing links (e.g. `https://bbdevops.dev/about`).
   - Explaining `.dev` Google Registry HSTS requirements (automated HTTPS enforcement).

### B. Cross-Linking in Existing Documentation
- Update Step 7 in `docs/AWS_S3_CLOUDFRONT_GUIDE.md` with a direct link to `docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md`.
- Update `README.md` Dedicated Documentation list with a link to `docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md`.

---

## 2. Acceptance Criteria
- [x] Complete, clear, sequential guide authored at `docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md`.
- [x] Explains DNS-Only Grey Cloud mode to prevent Error 525 SSL handshake conflicts.
- [x] References `us-east-1` ACM requirement for CloudFront.
- [x] `README.md` and `docs/AWS_S3_CLOUDFRONT_GUIDE.md` updated with direct links.
- [x] `npm run lint` and `npm run build` pass with 0 errors.
