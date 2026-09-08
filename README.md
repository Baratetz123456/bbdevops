# Jayson Barateta — Python Developer & AI Automation Portfolio

A modern, high-performance, single-page responsive portfolio web application architected with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **DotLottie animations**.

Designed with a warm Bento-grid layout, fluid desktop and mobile transitions, and a dual-theme engine defaulting to a signature warm light aesthetic (`#FAF3EA`).

---

## 🌟 Key Features

- **Single-Source Configuration**: All content (projects, personal info, location, employment history, education, services, skills, social links, and live stats) is managed in a single file: [`src/data/portfolio.json`](src/data/portfolio.json).
- **Default Warm Light Theme**: Inspired by warm editorial aesthetics (`#FAF3EA` background, terracotta `#E07A5F`, and sand `#D4A373`), with persistent Dark Mode support.
- **Enterprise Case Studies**: Deep-dive modals and showcase cards for 6 verified enterprise automation and AI projects.
- **Interactive Micro-Animations**: Smooth page transitions via Framer Motion, confetti on contact form submission, and offline-resilient local Lottie animations.
- **Responsive Architecture**: Pixel-perfect support across mobile (375px+), tablet (768px+), and desktop (1440px+).
- **Comprehensive SEO & Schema.org**: Fully integrated OpenGraph, Twitter Cards, geo-meta tags, and JSON-LD structured data.

---

## 📁 Quick Start & Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm (or pnpm / yarn)

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
    "email": "baratetajayson01@gmail.com",
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
├── public/
│   ├── favicon.svg             # Application favicon
│   ├── images/                 # Static media assets (profile, project previews)
│   │   ├── profile.jpg         # Sidebar banner photo
│   │   └── avatar.jpg          # SEO avatar
├── src/
│   ├── assets/
│   │   └── lottie/             # Vector Lottie animations (ai_workflow, ai_developer)
│   ├── components/
│   │   ├── Marquee.jsx         # Infinite skill marquee strip
│   │   ├── MobileTopBar.jsx    # Responsive mobile header
│   │   ├── PageTransition.jsx  # Framer Motion animated route wrapper
│   │   ├── ProjectModal.jsx    # Detailed project case study modal
│   │   ├── Sidebar.jsx         # Persistent desktop navigation & profile banner
│   │   ├── ThemeToggle.jsx     # Smooth Light/Dark mode toggle
│   │   └── Toast.jsx           # Submission notification toast
│   ├── context/
│   │   └── ThemeContext.jsx    # Dual-theme provider (default: 'light')
│   ├── data/
│   │   ├── portfolio.json      # ⭐ Single-file source of truth for all content
│   │   ├── historyData.js      # Bridge exporting portfolio.history & education
│   │   ├── projectsData.js     # Bridge exporting portfolio.projects
│   │   └── servicesData.js     # Bridge exporting portfolio.services
│   ├── pages/
│   │   ├── Home.jsx            # Hero split section & core verified metrics
│   │   ├── About.jsx           # Bento profile, AI animation, skills, education
│   │   ├── Projects.jsx        # Searchable and filterable case study grid
│   │   ├── Services.jsx        # Interactive capability cards
│   │   ├── History.jsx         # Professional career timeline
│   │   └── Contact.jsx         # Direct contact form and social channels
│   ├── App.jsx                 # Route definitions and layout shell
│   ├── index.css               # Design tokens, custom scrollbars, utility styles
│   └── main.jsx                # Application root entry point
├── index.html                  # HTML5 shell, SEO tags, JSON-LD Schema
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Complete application documentation
```

---

## 🚀 Deployment

The compiled output is a completely static, single-page bundle that can be hosted anywhere:

### Deploy to AWS S3 & CloudFront (Recommended for Enterprise)

Deploy as a globally accelerated, secure Single Page Application using a **Private S3 Bucket**, **Origin Access Control (OAC)**, and **CloudFront Custom Error Responses**:

```bash
# 1. Compile production bundle
npm run build

# 2. Sync hashed assets with 1-year immutable cache
aws s3 sync dist/assets s3://YOUR_BUCKET_NAME/assets \
  --cache-control "max-age=31536000,public,immutable" --delete

# 3. Sync HTML and meta files with no-cache
aws s3 sync dist/ s3://YOUR_BUCKET_NAME \
  --exclude "assets/*" \
  --cache-control "no-cache,no-store,must-revalidate" --delete

# 4. Invalidate edge cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

> 📖 **Full Guide & CI/CD**: Read the complete, step-by-step walkthrough with AWS Console steps, OAC security policy, and automated GitHub Actions workflow in [**docs/AWS_S3_CLOUDFRONT_GUIDE.md**](docs/AWS_S3_CLOUDFRONT_GUIDE.md).
>
> 🤖 **Automated CI/CD Workflow**: Included out of the box in [`.github/workflows/deploy-aws.yml`](.github/workflows/deploy-aws.yml).

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Publish directory: dist
```
Add a `public/_redirects` file with `/*  /index.html  200` to support client-side routing on hard refresh.

### Deploy to GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'` if deploying to a subpath.
2. Build via `npm run build` and publish the `dist` folder via `gh-pages`.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
