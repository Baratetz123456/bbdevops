# AWS Serverless Contact API & SES Email Setup Guide

This guide details how to deploy and connect the dedicated **AWS Serverless Contact API** (API Gateway HTTP API + Python 3.12 Lambda + Amazon SES) that delivers inquiries directly to **`baratetajayson01@gmail.com`**.

---

## 🏗️ Architecture

```text
[Visitor on bbdevops.dev]
           │
           ▼ (HTTPS POST /contact with JSON payload)
[Amazon API Gateway (HTTP API v2)]
           │ (Validates CORS & invokes function)
           ▼
[AWS Lambda (Python 3.12)]
           │ - Honeypot anti-spam check (_gotcha)
           │ - Field sanitization & HTML email building
           ▼
[Amazon Simple Email Service (SES)]
           │ (Delivers email with ReplyTo=client_email)
           ▼
[Jayson's Inbox: baratetajayson01@gmail.com]
```

---

## 📋 Prerequisites & AWS SES Verification (Step 1)

In all new AWS accounts, Amazon SES is initially in the **SES Sandbox**. In the sandbox:
- You must verify the destination email (`baratetajayson01@gmail.com`) so SES is permitted to deliver emails to it.

### Verifying your Gmail in AWS SES (2 Minutes):
1. Log in to the **AWS Management Console**: [console.aws.amazon.com](https://console.aws.amazon.com/).
2. Select your deployment region in the top right (e.g., **Singapore `ap-southeast-1`** or **N. Virginia `us-east-1`**).
3. Search for **Amazon SES** (Simple Email Service).
4. In the left navigation sidebar under *Configuration*, click **Identities**.
5. Click the orange **Create identity** button:
   - **Identity type**: Select **Email address**.
   - **Email address**: Enter `baratetajayson01@gmail.com`.
   - Click **Create identity**.
6. Open your Gmail inbox (`baratetajayson01@gmail.com`). You will receive an email from Amazon Web Services with the subject: *"Amazon SES Address Verification Request"*.
7. Click the verification link in the email.
8. Back in the AWS SES Console, refresh the page: your identity status will now show **Verified `✓`**!

---

## 🚀 Deploying the Serverless Backend (Step 2)

All infrastructure is defined as code in [`infrastructure/contact-service.yaml`](../infrastructure/contact-service.yaml).

### Option A: Using PowerShell (Windows)
In your terminal, run:
```powershell
.\infrastructure\deploy.ps1
```

### Option B: Using Bash (Linux / macOS)
```bash
chmod +x infrastructure/deploy.sh
./infrastructure/deploy.sh
```

### Option C: Using Standard AWS CLI
```bash
aws cloudformation deploy \
  --template-file infrastructure/contact-service.yaml \
  --stack-name bbdevops-contact-api \
  --region ap-southeast-1 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
      RecipientEmail=baratetajayson01@gmail.com \
      SenderEmail=baratetajayson01@gmail.com
```

Once deployment completes (~45 seconds), retrieve your live API URL:
```bash
aws cloudformation describe-stacks \
  --stack-name bbdevops-contact-api \
  --region ap-southeast-1 \
  --query "Stacks[0].Outputs[?OutputKey=='ContactApiUrl'].OutputValue" \
  --output text
```
*Example Output:*
`https://a1b2c3d4e5.execute-api.ap-southeast-1.amazonaws.com/contact`

---

## 🔌 Connecting Frontend to API (Step 3)

### 1. Local Development
Create or edit `.env.local` in the project root:
```env
VITE_CONTACT_API_URL=https://YOUR_API_ID.execute-api.ap-southeast-1.amazonaws.com/contact
```

### 2. Production GitHub Actions CI/CD
Add the secret to your GitHub repository:
1. Go to **Settings → Secrets and variables → Actions**.
2. Click **New repository secret**:
   - **Name**: `VITE_CONTACT_API_URL`
   - **Value**: `https://YOUR_API_ID.execute-api.ap-southeast-1.amazonaws.com/contact`
3. Trigger a deployment or push to `main`!

---

## 🧪 Testing the API Endpoint

You can test the endpoint directly using PowerShell or cURL:

```powershell
Invoke-RestMethod -Uri "https://YOUR_API_ID.execute-api.ap-southeast-1.amazonaws.com/contact" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Alex Rivera","email":"test@example.com","message":"Hello from API test!"}'
```

Check your Gmail inbox: you will receive a styled HTML email with sender details and a direct "Reply" button that addresses `test@example.com`!

---

## 🌐 Optional: Sending from `noreply@bbdevops.dev` (Cloudflare DKIM)

If you have purchased `bbdevops.dev` on Cloudflare, you can verify the entire domain in Amazon SES to send from `contact@bbdevops.dev` instead of a personal Gmail:

1. In the **AWS SES Console** → **Identities** → **Create identity**.
2. Select **Domain** → enter `bbdevops.dev`.
3. Check **Easy DKIM** → **RSA 2048-bit**.
4. Click **Create identity**.
5. SES will generate **3 CNAME records** for DKIM authentication.
6. Open your **Cloudflare Dashboard** → `bbdevops.dev` → **DNS** → **Records**.
7. Add the 3 CNAME records with **DNS only (Grey Cloud)** mode.
8. Within 5 minutes, your domain status will turn **Verified** in SES!
9. Update the `SenderEmail` parameter in CloudFormation:
   ```bash
   aws cloudformation deploy --template-file infrastructure/contact-service.yaml \
     --stack-name bbdevops-contact-api --parameter-overrides SenderEmail=contact@bbdevops.dev
   ```
