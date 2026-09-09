# AWS Serverless Contact API & SES Email Setup Guide

This guide details how to deploy and connect the dedicated **AWS Serverless Contact API** (API Gateway HTTP API + Python 3.12 Lambda + Amazon SES) that delivers inquiries directly to **`baratetajayson.work@gmail.com`**.

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
[Jayson's Inbox: baratetajayson.work@gmail.com]
```

---

## 📋 Prerequisites & AWS SES Verification (Step 1)

In all new AWS accounts, Amazon SES is initially in the **SES Sandbox**. In the sandbox:
- You must verify the destination email (`baratetajayson.work@gmail.com`) so SES is permitted to deliver emails to it.

### Verifying your Gmail in AWS SES (2 Minutes):
1. Log in to the **AWS Management Console**: [console.aws.amazon.com](https://console.aws.amazon.com/).
2. Select your deployment region in the top right (e.g., **Singapore `ap-southeast-1`** or **N. Virginia `us-east-1`**).
3. Search for **Amazon SES** (Simple Email Service).
4. In the left navigation sidebar under *Configuration*, click **Identities**.
5. Click the orange **Create identity** button:
   - **Identity type**: Select **Email address**.
   - **Email address**: Enter `baratetajayson.work@gmail.com`.
   - Click **Create identity**.
6. Open your Gmail inbox (`baratetajayson.work@gmail.com`). You will receive an email from Amazon Web Services with the subject: *"Amazon SES Address Verification Request"*.
7. Click the verification link in the email.
8. Back in the AWS SES Console, refresh the page: your identity status will now show **Verified `✓`**!

---

## 🚀 Deploying the Serverless Backend (Step 2)

All backend resources (Amazon API Gateway HTTP API v2, Python 3.12 Lambda function, and IAM execution role) are defined as code in [`infrastructure/contact-service.yaml`](../infrastructure/contact-service.yaml).

You can deploy using either the **AWS CloudFormation Web Console** (100% visual GUI) or **AWS CloudShell** (in-browser terminal). Choose the method you prefer:

---

### 🖥️ Method 1: AWS CloudFormation Web Console (100% Visual GUI)

This method requires **no command line tools installed locally**. You upload the template file directly through your browser.

#### Step 1: Open CloudFormation
1. In your browser, open the [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation/).
2. Verify that your **Region** in the top navigation bar matches where you verified your email in Step 1 (e.g., **Singapore `ap-southeast-1`** or **N. Virginia `us-east-1`**).
3. Click the orange **Create stack** button in the top right $\rightarrow$ choose **With new resources (standard)**.

#### Step 2: Upload the Template
1. Under **Prerequisite - Prepare template**, select **Template is ready**.
2. Under **Specify template**:
   - Choose **Upload a template file**.
   - Click **Choose file**.
   - Navigate to your project folder and select:
     ```text
     infrastructure/contact-service.yaml
     ```
3. Click **Next** at the bottom right.

#### Step 3: Specify Stack Details
1. **Stack name**: Enter `bbdevops-contact-api`.
2. **Parameters**:
   - **`RecipientEmail`**: `baratetajayson.work@gmail.com`
   - **`SenderEmail`**: `baratetajayson.work@gmail.com`
3. Click **Next**.

#### Step 4: Configure Stack Options
- Leave all default settings unchanged (Tags, Permissions, Rollback configuration).
- Click **Next** at the bottom right.

#### Step 5: Acknowledge & Submit
1. Scroll to the very bottom of the **Review and create** page.
2. Under the **Capabilities** box, check the required acknowledgment:
   - `[✓] I acknowledge that AWS CloudFormation might create IAM resources.`
   *(This gives CloudFormation permission to create the minimal least-privilege IAM execution role for the Lambda function).*
3. Click the orange **Submit** button.

#### Step 6: Retrieve Your Live Endpoint URL
1. CloudFormation will begin provisioning the stack with status `CREATE_IN_PROGRESS`.
2. Wait approximately **40–60 seconds**, then click the circular **Refresh icon** on the top right of the stack events table.
3. Once the status turns green: **`CREATE_COMPLETE`**:
4. Click on the **Outputs** tab (located next to *Stack info*, *Events*, and *Resources*).
5. Look for the key **`ContactApiUrl`**:
   - Copy the value in the **Value** column!
   - *Example:* `https://a1b2c3d4e5.execute-api.ap-southeast-1.amazonaws.com/contact`

---

### 🐚 Method 2: AWS CloudShell (In-Browser Terminal, Zero Local Setup)

**AWS CloudShell** is a free, browser-based Linux shell built directly into the AWS Console. It comes pre-authenticated with your AWS credentials.

#### Step 1: Open CloudShell
1. In the AWS Management Console, click the **CloudShell icon** `[ >_ ]` in the top global navigation bar (next to the search bar and notification bell).
2. Wait a few seconds for the terminal session to initialize.
3. Confirm your region prompt displays your target region (e.g. `ap-southeast-1`).

#### Step 2: Upload the Template to CloudShell
1. In the top-right corner of the CloudShell terminal window, click **Actions** $\rightarrow$ select **Upload file**.
2. Select `infrastructure/contact-service.yaml` from your computer and click **Upload**.

*(Alternative: You can also paste the template into CloudShell directly without uploading):*
```bash
# If uploading directly from GitHub or pasting:
curl -s -o contact-service.yaml https://raw.githubusercontent.com/Baratetz123456/bbdevops/main/infrastructure/contact-service.yaml
```

#### Step 3: Run the CloudFormation Deployment Command
In the CloudShell terminal, copy and paste this command:

```bash
aws cloudformation deploy \
  --template-file contact-service.yaml \
  --stack-name bbdevops-contact-api \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
      RecipientEmail=baratetajayson.work@gmail.com \
      SenderEmail=baratetajayson.work@gmail.com
```

*Press `Enter` to run. Output will show:*
```text
Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - bbdevops-contact-api
```

#### Step 4: Retrieve Your Live API URL
Run this one-line command to print your live HTTP endpoint:

```bash
aws cloudformation describe-stacks \
  --stack-name bbdevops-contact-api \
  --query "Stacks[0].Outputs[?OutputKey=='ContactApiUrl'].OutputValue" \
  --output text
```

*Example Output:*
```text
https://a1b2c3d4e5.execute-api.ap-southeast-1.amazonaws.com/contact
```
Copy this URL for Step 3!

---

### 💻 Method 3: Local Machine Scripts (Optional Alternative)

If you already have the AWS CLI configured on your local machine:

- **PowerShell (Windows)**:
  ```powershell
  .\infrastructure\deploy.ps1
  ```
- **Bash (Linux / macOS)**:
  ```bash
  chmod +x infrastructure/deploy.sh
  ./infrastructure/deploy.sh
  ```

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
