import React from 'react'
import {
  User,
  GithubLogo,
  LinkedinLogo,
  Envelope,
  MapPin,
  Sparkle,
  GraduationCap,
  Trophy,
  ShareNetwork,
  Lightning,
  GlobeHemisphereWest,
  Robot,
  Gear,
  Code,
  ArrowUpRight,
} from '@phosphor-icons/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import PageTransition from '../components/PageTransition'
import { educationData } from '../data/historyData'
import aiDeveloperAnimation from '../assets/lottie/ai_developer.json'
import portfolio from '../data/portfolio.json'

const ICON_MAP = {
  Robot,
  ShareNetwork,
  Gear,
  Code,
}

export default function About() {
  const firstName = portfolio.personal.name.split(' ')[0]

  return (
    <PageTransition className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Page Header (No redundant full name) */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <User size={16} weight="fill" />
          <span>Profile & Background</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          About & Engineering Background
        </h1>
        <p className="text-sm sm:text-base max-w-3xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {portfolio.personal.role} with {portfolio.stats.yearsExperience} of experience delivering scalable enterprise network automation, low-code orchestration, and AI-driven tooling.
        </p>
      </div>

      {/* Bento Card 1: Overview & Engineering Philosophy */}
      <div className="card-warm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Animated Lottie AI Engineer Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            className="relative w-full max-w-[320px] aspect-square rounded-3xl p-3 border shadow-xl flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-102"
            style={{
              backgroundColor: 'var(--bg-badge)',
              borderColor: 'var(--border-warm)',
              boxShadow: 'var(--shadow-warm-hover)',
            }}
          >
            {/* Ambient background glow behind animation */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(224,122,95,0.8), transparent 70%)',
              }}
            />
            <DotLottieReact
              data={aiDeveloperAnimation}
              loop
              autoplay
              className="w-full h-full relative z-10"
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 text-white border border-white/20 shadow-sm z-20 flex items-center gap-1">
              <Sparkle size={11} weight="fill" className="text-[#E07A5F]" />
              <span>AI Engineering</span>
            </div>
          </div>
        </div>

        {/* Right Side: Introduction & Story */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: 'var(--bg-badge)',
              borderColor: 'var(--border-warm)',
              color: 'var(--accent-secondary)',
            }}
          >
            <MapPin size={13} weight="fill" />
            <span>{portfolio.personal.location} · {portfolio.personal.remotePreference} ({portfolio.personal.timeZone})</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              Hi, I'm <span className="text-[#E07A5F]">{firstName}</span> — building scalable automations and intelligent systems since 2018.
            </h2>
            {portfolio.personal.bioParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-xs sm:text-sm leading-relaxed ${
                  index === 0 ? '' : 'text-muted'
                }`}
                style={{
                  color: index === 0 ? 'var(--text-main)' : 'var(--text-muted)',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Social Channels Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-warm)' }}>
            <a
              href={portfolio.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              <GithubLogo size={16} weight="fill" className="text-[#E07A5F]" />
              <span>GitHub</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>

            <a
              href={portfolio.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              <LinkedinLogo size={16} weight="fill" className="text-[#E07A5F]" />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>

            <a
              href={`mailto:${portfolio.personal.email}`}
              aria-label="Email Jayson"
              className="px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              <Envelope size={16} weight="fill" className="text-[#E07A5F]" />
              <span>Email Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bento Card 2: Enterprise Impact Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-warm p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#E07A5F]/15 text-[#E07A5F]">
            <Trophy size={18} weight="fill" />
          </div>
          <div className="font-bold text-2xl" style={{ color: 'var(--text-main)' }}>
            {portfolio.stats.yearsExperience} Years
          </div>
          <div className="font-semibold text-xs" style={{ color: 'var(--text-main)' }}>
            Software Engineering
          </div>
          <p className="text-[11px] leading-tight" style={{ color: 'var(--text-muted)' }}>
            Continuous enterprise production delivery (2018–Present).
          </p>
        </div>

        <div className="card-warm p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#D4A373]/15 text-[#D4A373]">
            <ShareNetwork size={18} weight="fill" />
          </div>
          <div className="font-bold text-2xl text-[#E07A5F]">
            {portfolio.stats.concurrentDevices} Devices
          </div>
          <div className="font-semibold text-xs" style={{ color: 'var(--text-main)' }}>
            Concurrent Automation
          </div>
          <p className="text-[11px] leading-tight" style={{ color: 'var(--text-muted)' }}>
            Reduced manual network post-verification workload by {portfolio.stats.workloadReduction}.
          </p>
        </div>

        <div className="card-warm p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#E07A5F]/15 text-[#E07A5F]">
            <Lightning size={18} weight="fill" />
          </div>
          <div className="font-bold text-2xl" style={{ color: 'var(--text-main)' }}>
            {portfolio.stats.teamTurnaround}
          </div>
          <div className="font-semibold text-xs" style={{ color: 'var(--text-main)' }}>
            Team Turnaround
          </div>
          <p className="text-[11px] leading-tight" style={{ color: 'var(--text-muted)' }}>
            Stalled 6-dev team shipped 1st feature in 7 days via agentic workflows.
          </p>
        </div>

        <div className="card-warm p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#D4A373]/15 text-[#D4A373]">
            <GlobeHemisphereWest size={18} weight="fill" />
          </div>
          <div className="font-bold text-2xl text-[#D4A373]">
            {portfolio.stats.internationalMarkets}
          </div>
          <div className="font-semibold text-xs" style={{ color: 'var(--text-main)' }}>
            International Clients
          </div>
          <p className="text-[11px] leading-tight" style={{ color: 'var(--text-muted)' }}>
            Enterprise partnerships under Agile Scrum and Waterfall frameworks.
          </p>
        </div>
      </div>

      {/* Bento Card 3: Technical Domains Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg" style={{ color: 'var(--text-main)' }}>
              Core Technical Domains
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              Verified competencies across systems engineering, automation, and AI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {portfolio.skills.map((domain) => {
            const Icon = ICON_MAP[domain.icon] || Code
            return (
              <div key={domain.title} className="card-warm p-5 sm:p-6 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${domain.color}15`,
                      color: domain.color,
                    }}
                  >
                    <Icon size={18} weight="fill" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>
                    {domain.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {domain.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                      style={{
                        backgroundColor: 'var(--bg-badge)',
                        borderColor: 'var(--border-warm)',
                        color: 'var(--text-main)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bento Card 4: Academic Background & Education */}
      <div className="card-warm p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <GraduationCap size={18} weight="fill" />
          <span>Education & Academic Background</span>
        </div>

        <div className="space-y-4">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
              }}
            >
              <div>
                <h4 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                  {edu.degree}
                </h4>
                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent-secondary)' }}>
                  {edu.institution}
                </p>
                <p className="text-xs max-w-2xl mt-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {edu.details}
                </p>
              </div>
              <div className="shrink-0">
                <span
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: 'rgba(224, 122, 95, 0.12)',
                    borderColor: 'rgba(224, 122, 95, 0.35)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  {edu.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
