# Jayson Barateta — Python Developer & AI Automation Portfolio

A modern, high-performance, single-page responsive portfolio web application architected with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **DotLottie animations**.

Designed with a warm Bento-grid layout, fluid desktop and mobile transitions, and a dual-theme engine defaulting to a signature warm light aesthetic (`#FAF3EA`).

---

## 🌟 Key Features

- **Single-Source Configuration**: All content (projects, personal info, location, employment history, education, services, skills, social links, and live stats) is managed in a single file: [`src/data/portfolio.json`](src/data/portfolio.json).
- **Default Warm Light Theme**: Inspired by warm editorial aesthetics (`#FAF3EA` background, terracotta `#E07A5F`, and sand `#D4A373`), with persistent Dark Mode support.
- **Enterprise Case Studies**: Deep-dive modals and showcase cards for 6 verified enterprise automation and AI projects.
- **Serverless Contact Engine**: Event-driven AWS Lambda (Python 3.12) + SES with spam honeypot defense and zero-maintenance architecture (< $0.05/mo).
- **Privacy Policy & Legal Compliance**: Dedicated GDPR and Philippine Data Privacy Act (RA 10173) transparency documentation at `/privacy`.
- **Interactive Micro-Animations**: Smooth page transitions via Framer Motion, confetti on contact form submission, and offline-resilient local Lottie animations.
- **Responsive Architecture**: Pixel-perfect support across mobile (375px+), tablet (768px+), and desktop (1440px+).
- **Comprehensive SEO & Schema.org**: Fully integrated OpenGraph, Twitter Cards, geo-meta tags, and JSON-LD structured data.

---

## 📁 Quick Start & Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm (or pnpm / yarn)
- Python 3.10+ (optional, for running local Lambda unit tests)

### Installation
```bash
# Clone the repository
git clone https://github.com/Baratetz123456/bbdevops.git
cd bbdevops

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The local server will start at `http://localhost:5173`.

### Build & Quality Commands
```bash
# Typecheck / Lint with Oxlint
npm run lint

# Run offline Python Lambda test suite (6/6 tests)
npm run test:api

# Compile production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ How to Configure Content (`portfolio.json`)

You do **not** need to touch React components or JSX files to update your personal data, work experience, projects, or links. Simply edit [`src/data/portfolio.json`](src/data/portfolio.json):

```json
{
  "personal": {
    "name": "Jayson Barateta",
    "role": "Python Developer & AI Automation",
    "status": "Available for New Projects & Contracts",
    "availabilityBadge": "Available for Hire",
    "location": "Daraga, Albay, Philippines",
    "timeZone": "GMT+8",
    "remotePreference": "Remote Worldwide",
    "email": "baratetajayson.work@gmail.com",
    "bioShort": "Delivering scalable network automation...",
    "bioParagraphs": [
      "With 8+ years of hands-on professional development...",
      "My technical expertise spans concurrent network verification..."
    ]
  },
  "socials": {
    "github": "https://github.com/Baratetz123456",
    "linkedin": "https://www.linkedin.com/in/jayson-barateta-15a919164"
  },
  "stats": {
    "yearsExperience": "8+",
    "concurrentDevices": "100+",
    "workloadReduction": "90%",
    "teamTurnaround": "1 Week",
    "internationalMarkets": "Japan & SG"
  }
}
```

### Content Configuration Sections

| Section | Key | What It Controls |
| :--- | :--- | :--- |
| **Personal Info** | `personal` | Name, professional role, location, timezone, email, and story paragraphs. |
| **Social Links** | `socials` | GitHub URL, LinkedIn profile URL, and any connected profiles. |
| **Hero & Metric Stats**| `stats` | Highlighting years of experience, device concurrency, and reduction metrics. |
| **Projects Showcase** | `projects` | Array of projects with problem/solution breakdowns, technical tags, and preview links. |
| **Services Offered** | `services` | Core capability cards (e.g. Agentic Workflows, Network Automation, low-code APIs). |
| **Skills & Domains** | `skills` | Grouped technical competencies (AI, Networks, Orchestration, Python). |
| **Employment History** | `history` | Work experience timeline cards with verified achievements and tags. |
| **Education** | `education` | Degree, academic institution, graduation year, and focus areas. |

---

## 🖼️ Managing Images and Animations

### Profile & Avatar Images
- Place your main profile photo in:
  - [`public/images/profile.jpg`](public/images/profile.jpg) (Used in the sidebar banner)
  - [`public/images/avatar.jpg`](public/images/avatar.jpg) (Used in SEO meta tags and icons)
- Images in `public/` are served statically by Vite at root paths (`/images/profile.jpg`).

### Project Case Study Thumbnails
- Add project images to `public/images/` (e.g. `netlogdiff.jpg`, `agentic_team_workflow.jpg`).
- In `portfolio.json`, reference them in the `image` property: `"image": "/images/your_project.jpg"`.

### Lottie Vector Animations
- Animation JSON files are stored under [`src/assets/lottie/`](src/assets/lottie/).
- Rendered via `@lottiefiles/dotlottie-react` using inline `data={animationData}` for offline resilience and zero network abort errors.

---

## 🎨 Design System & Theme Engine

The application features a CSS Custom Property design token architecture configured in [`src/index.css`](src/index.css):

### Color Tokens

| Variable | Light Theme (Default) | Dark Theme | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-body` | `#FAF3EA` (Warm Alabaster) | `#1F1A17` (Deep Charcoal) | Application base canvas |
| `--bg-card` | `#FFFFFF` | `#2A2420` | Bento cards & panels |
| `--bg-badge` | `#F4ECE1` | `#352E28` | Pills, tags, and inputs |
| `--text-main` | `#3E2C23` (Deep Earth) | `#F5EBE1` (Soft Pearl) | Headings & primary text |
| `--text-muted` | `#6C584C` (Warm Stone) | `#BFAAA0` | Body text & subtitles |
| `--accent-primary` | `#E07A5F` (Terracotta) | `#E07A5F` | Primary CTAs & active states |
| `--accent-secondary`| `#D4A373` (Warm Ochre) | `#D4A373` | Highlights & category badges |
| `--border-warm` | `rgba(224, 122, 95, 0.20)` | `rgba(224, 122, 95, 0.25)` | Card & border outlines |

Theme preference is persisted across browser sessions in both `localStorage.getItem('theme')` and `localStorage.getItem('bb-theme')`.

---

## 📂 Project Structure

```text
bbdevops/
├── .agents/                    # Multi-agent orchestrator policies & role specifications
├── .github/workflows/          # Automated CI & CD GitHub Actions pipelines
├── docs/                       # Architecture, testing, and deployment guides
│   ├── LOCAL_TESTING_GUIDE.md  # 🧪 Local testing, offline Python tests & troubleshooting
│   ├── AWS_CONTACT_API_GUIDE.md # ✉️ AWS Serverless contact API setup & deployment
│   ├── CICD_DEPLOYMENT_GUIDE.md # 🚀 GitHub Actions to S3 + CloudFront pipeline guide
│   ├── CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md # 🌐 Cloudflare wholesale domain setup
│   └── AWS_S3_CLOUDFRONT_GUIDE.md # ☁️ AWS S3 + CloudFront infrastructure guide
├── infrastructure/             # AWS Serverless IaC and Lambda Backend
│   ├── contact-service.yaml    # AWS CloudFormation template (API Gateway + Lambda + IAM)
│   ├── deploy.ps1              # 1-click deployment script (PowerShell)
│   ├── deploy.sh               # 1-click deployment script (Bash)
│   ├── test_local.py           # Offline Lambda test runner suite (6/6 tests)
│   └── lambda/
│       └── send_email.py       # Python 3.12 Lambda handler (boto3 SES, honeypot)
├── public/
│   ├── favicon.svg             # Application favicon
│   └── images/                 # Static media assets (profile, SEO avatar)
├── src/
│   ├── assets/
│   │   └── lottie/             # Vector Lottie animations (ai_workflow, ai_developer)
│   ├── components/             # Reusable UI components & navigation bars
│   │   ├── Sidebar.jsx         # Persistent desktop navigation & profile banner
│   │   ├── MobileTopBar.jsx    # Responsive mobile header
│   │   ├── MobileTabBar.jsx    # Floating mobile bottom tab bar
│   │   ├── ThemeToggle.jsx     # Smooth Light/Dark mode toggle
│   │   ├── Toast.jsx           # Submission notification toast (success & error)
│   │   └── ...                 # Skeletons, Modals, PageTransition, Marquee
│   ├── data/
│   │   └── portfolio.json      # ⭐ Single-file source of truth for all content
│   ├── pages/
│   │   ├── Home.jsx            # Hero split section & core verified metrics
│   │   ├── About.jsx           # Bento profile, AI animation, skills, education
│   │   ├── Projects.jsx        # Searchable and filterable case study grid
│   │   ├── Services.jsx        # Interactive capability cards
│   │   ├── EmploymentHistory.jsx # Professional career timeline
│   │   ├── Contact.jsx         # Contact form with live API + mailto fallback
│   │   └── LegalNotice.jsx     # GDPR & RA 10173 compliant Privacy Policy (/privacy)
│   ├── App.jsx                 # Route definitions and layout shell
│   ├── index.css               # Design tokens, custom scrollbars, utility styles
│   └── main.jsx                # Application root entry point
├── .env.example                # Template for environment variables
├── index.html                  # HTML5 shell, SEO tags, JSON-LD Schema
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration (with watcher ignores)
└── README.md                   # Complete application documentation
```

---

## 🚀 CI/CD & Zero-Cost Deployment

This application features an automated, enterprise-grade Continuous Integration and Deployment pipeline powered by **GitHub Actions**, **Amazon S3** (private origin with OAC), and **Amazon CloudFront** (global CDN with SPA client-side routing).

### 💰 Little-to-No-Cost Guarantee
- **AWS Free Tier (Year 1)**: **$0.00 / month** (1 TB CloudFront data transfer, 10M requests, 1,000 invalidations, 5 GB S3).
- **Post-Free Tier (Year 2+)**: **< $0.02 / month** (bundle storage is ~1.5 MB; CloudFront transfer & requests remain Always Free).
- **Serverless Contact API**: **$0.00 – < $0.05 / month** (pay only per submission; 1,000,000 free Lambda requests/month forever).
- **Free Custom DNS**: Uses free external DNS (Cloudflare / Namecheap CNAME) to avoid Route 53's $0.50/mo fee.

| Pipeline | Trigger | Purpose |
| :--- | :--- | :--- |
| **[CI Validation](.github/workflows/ci.yml)** | Pull Requests & Feature Branches | Automated Oxlint and Vite production build validation before merging. |
| **[CD Production Deploy](.github/workflows/deploy-aws.yml)** | Push to `main` or Manual Dispatch | Automated build, dual-tier S3 cache sync, and CloudFront edge cache invalidation. |

### Dedicated Documentation

- 🧪 **[Local Testing & QA Guide](docs/LOCAL_TESTING_GUIDE.md)**: Complete guide to local frontend testing, responsive validation, offline Python Lambda test suite (`npm run test:api`), and troubleshooting.
- ✉️ **[AWS Serverless Contact API Guide](docs/AWS_CONTACT_API_GUIDE.md)**: 1-click deployment for API Gateway + Python Lambda + Amazon SES, email identity verification, and anti-spam protection.
- 📖 **[CI/CD Deployment & Cost Guide](docs/CICD_DEPLOYMENT_GUIDE.md)**: Step-by-step documentation for GitHub Secrets configuration, least-privilege AWS IAM policies, two-tier cache headers, zero-spend budget alerts, S3 lifecycle auto-purge, and rollback runbooks.
- 🌐 **[Cloudflare Domain + CloudFront Setup Guide](docs/CLOUDFLARE_DOMAIN_CLOUDFRONT_GUIDE.md)**: Complete click-by-click guide to purchasing `bbdevops.dev` on Cloudflare at wholesale pricing and connecting it to CloudFront with free ACM SSL certificates and zero-cost DNS.
- ☁️ **[AWS S3 + CloudFront Infrastructure Guide](docs/AWS_S3_CLOUDFRONT_GUIDE.md)**: Step-by-step console guide for private S3 bucket provisioning, Origin Access Control (OAC), free custom domain setup, and CloudFront Custom Error Responses.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
