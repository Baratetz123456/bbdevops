# Task Specification: Zero-Cost CI/CD & Deployment Guide Fortification

- **Task ID**: `zero-cost-deployment`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `docs/CICD_DEPLOYMENT_GUIDE.md`
  - `docs/AWS_S3_CLOUDFRONT_GUIDE.md`
  - `README.md`

---

## 1. Objectives & Technical Specifications

### A. Cost Transparency & Monthly Cost Breakdown
Document the exact monthly cost calculation:
- **CloudFront**: 1 TB data transfer out/month (Always Free), 10M requests/month (Always Free), 1,000 invalidations/month (Always Free). Real cost: **$0.00/mo**.
- **S3 Storage**: ~1.5 MB build bundle. 5 GB free for 12 months. Afterwards: $0.023/GB = **$0.000035/mo** (literally less than 1 penny every two years).
- **GitHub Actions**: 2,000 runner minutes/month free. A typical run takes ~30 seconds (0.5 minutes), enabling 4,000 free deployments/month.
- **Estimated Ongoing Cost**: **$0.00/month** on Free Tier; **<$0.02/month** (pennies per year) after 12 months.

### B. The 4 Hidden AWS Cost Traps & Mitigations
1. **Route 53 Hosted Zone ($0.50/mo / $6.00/yr)**:
   - Do not create a Route 53 public hosted zone. Use free DNS providers (Cloudflare Free Tier, Namecheap, Porkbun, GoDaddy) with a simple CNAME pointing to the CloudFront distribution domain (`d123.cloudfront.net`). Cost: **$0.00**.
2. **AWS WAF ($5.00/mo + $1.00/rule)**:
   - Explicitly choose **"Do not enable security protections"** for AWS WAF during CloudFront setup. CloudFront OAC + S3 Block Public Access provides enterprise-level private origin security with $0 overhead.
3. **CloudFront Invalidation Sprawl ($0.005/path after 1,000)**:
   - Always use a single wildcard path `/*` (1 path per deployment) in the GitHub Actions pipeline.
4. **S3 Object Version Accumulation**:
   - Provide an S3 Lifecycle Rule to auto-expire non-current versions after 14 days and abort incomplete multipart uploads after 7 days.

### C. Zero-Spend Budget & Billing Alerts
- Provide step-by-step AWS Management Console instructions and AWS CLI commands to:
  - Create an **AWS Zero-Spend Budget** ($0.01 threshold).
  - Enable **Free Tier Usage Alerts** in AWS Billing Preferences.

---

## 2. Acceptance Criteria
- [x] Comprehensive Cost Analysis section added to `docs/CICD_DEPLOYMENT_GUIDE.md`.
- [x] S3 Lifecycle policy JSON and CLI commands provided.
- [x] AWS Zero-Spend Budget commands and console guide added.
- [x] `docs/AWS_S3_CLOUDFRONT_GUIDE.md` updated with free DNS guidance and WAF opt-out callouts.
- [x] `README.md` reflects the $0.00 Free Tier / Near-Zero cost guarantee.
- [x] `npm run lint` and `npm run build` pass with 0 errors.
