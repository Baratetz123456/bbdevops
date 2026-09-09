# Task Specification: Functional AWS Serverless Contact Backend & Privacy Policy

- **Task ID**: `contact-api-privacy`
- **Lead Orchestrator**: BBDevOps Lead
- **Target Components**:
  - `infrastructure/lambda/send_email.py` (New)
  - `infrastructure/contact-service.yaml` (New)
  - `infrastructure/deploy.ps1` & `infrastructure/deploy.sh` (New)
  - `docs/AWS_CONTACT_API_GUIDE.md` (New)
  - `src/pages/PrivacyPolicy.jsx` (New)
  - `src/pages/Contact.jsx` (Updated)
  - `src/App.jsx` (Updated)
  - `src/components/Sidebar.jsx` (Updated)

---

## 1. Objectives & Technical Specifications

### A. AWS Serverless Backend (`infrastructure/`)
1. **Python 3.12 Lambda Handler (`send_email.py`)**:
   - Parse JSON payload (`name`, `email`, `message`, `_gotcha`).
   - Anti-spam honeypot check: If `_gotcha` is filled, return 200 immediately without emailing.
   - Sanitize fields and build styled HTML email + text email.
   - Send via `boto3.client('ses', region_name=...)` with `ReplyToAddresses=[email]`.
   - Return standard CORS headers (`Access-Control-Allow-Origin: *`, `POST, OPTIONS`).
2. **CloudFormation Template (`contact-service.yaml`)**:
   - `AWS::ApiGatewayV2::Api` (HTTP API) with global CORS enabled.
   - `AWS::Lambda::Function` (Python 3.12, 128 MB memory, 10s timeout).
   - `AWS::IAM::Role` granting `ses:SendEmail` and CloudWatch logging.
   - `AWS::ApiGatewayV2::Integration` & `AWS::ApiGatewayV2::Route` (`POST /contact`).
   - Stack Outputs: `ContactApiEndpoint` (e.g. `https://xxx.execute-api.region.amazonaws.com/contact`).
3. **Deployment Scripts**:
   - `deploy.ps1` (PowerShell) and `deploy.sh` (Bash) for 1-command deployment.
4. **Documentation**:
   - `docs/AWS_CONTACT_API_GUIDE.md`: SES sandbox email verification guide, deployment instructions, and env var configuration.

### B. Frontend Form & Privacy Policy
1. **Contact Form (`Contact.jsx`)**:
   - Wire `handleSubmit` to POST JSON to `import.meta.env.VITE_CONTACT_API_URL`.
   - Hidden honeypot field (`_gotcha`) with `tabIndex="-1"` and `autoComplete="off"`.
   - Loading state with spinning icon and disabled button while `isSubmitting` is true.
   - Error handling toast with fallback direct `mailto:` link if API fails or is offline.
   - Consent text below submit button: *"By submitting, you agree to our [Privacy Policy](/privacy)."*
2. **Privacy Policy Page (`PrivacyPolicy.jsx`)**:
   - Complete, professional privacy policy (GDPR & Data Privacy Act compliant).
   - Styled with `p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8`.
   - Sections: Data Collected, Purpose, Security & Storage, No Third-Party Selling, User Rights, Contact.
3. **Routing & Navigation**:
   - Register `/privacy` in `src/App.jsx` with `React.lazy()` and Suspense.
   - Add Privacy Policy link in `src/components/Sidebar.jsx` footer.

---

## 2. Acceptance Criteria
- [x] Python Lambda handler handles input sanitization, honeypot spam filter, and sends formatted SES email with reply-to.
- [x] CloudFormation template defines valid HTTP API, Lambda, and IAM roles.
- [x] Frontend `Contact.jsx` submits via fetch with loading/success/error states.
- [x] Privacy Policy page rendered at `/privacy` in `max-w-6xl` layout.
- [x] `npm run lint` and `npm run build` pass with 0 errors.
