import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  EnvelopeSimple,
  Sparkle,
  Briefcase,
  CheckCircle,
  Lightning,
} from '@phosphor-icons/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import PageTransition from '../components/PageTransition'
import Marquee from '../components/Marquee'
import aiWorkflowAnimation from '../assets/lottie/ai_workflow.json'
import portfolio from '../data/portfolio.json'

export default function Home() {
  return (
    <PageTransition className="w-full h-full md:h-screen md:max-h-screen flex flex-col justify-between overflow-y-auto md:overflow-hidden p-5 sm:p-8 lg:p-10">
      {/* Top Banner / Available Status */}
      <div className="flex items-center justify-between pt-1">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-sm"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-warm)',
            color: 'var(--text-main)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{portfolio.personal.status}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>
          <span>{portfolio.personal.location}</span>
          <span>•</span>
          <span>{portfolio.personal.timeZone}</span>
        </div>
      </div>

      {/* Main Hero Section: Split 2-Column on lg */}
      <div className="my-auto py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium text-xs sm:text-sm tracking-wide uppercase" style={{ color: 'var(--accent-primary)' }}>
              <Sparkle size={16} weight="fill" />
              <span>{portfolio.personal.title}</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]"
              style={{ color: 'var(--text-main)' }}
            >
              Hi, I'm{' '}
              <span className="relative inline-block text-[#E07A5F]">
                {portfolio.personal.name}
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#D4A373]/50"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            <p
              className="text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl pt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {portfolio.personal.bioShort}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 8px 24px -4px rgba(224, 122, 95, 0.4)',
              }}
            >
              <span>View Projects</span>
              <ArrowRight size={16} weight="bold" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              <EnvelopeSimple size={16} weight="bold" style={{ color: 'var(--accent-primary)' }} />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Animated Lottie Art */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-3xl p-3 border shadow-xl flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-102"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-warm)',
              boxShadow: 'var(--shadow-warm-hover)',
            }}
          >
            {/* Ambient background glow behind animation */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(224,122,95,0.7), transparent 70%)',
              }}
            />
            <DotLottieReact
              data={aiWorkflowAnimation}
              loop
              autoplay
              className="w-full h-full relative z-10"
            />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 text-white border border-white/20 shadow-sm z-20 flex items-center gap-1">
              <Sparkle size={11} weight="fill" className="text-[#E07A5F]" />
              <span>AI Automation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Infinite Strip */}
      <div className="py-2 border-y my-2" style={{ borderColor: 'var(--border-warm)' }}>
        <Marquee />
      </div>

      {/* Small Stat Row (3 verified stats) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pb-2">
        <div
          className="card-warm p-3 sm:p-4 rounded-xl flex items-center gap-3 transition-transform hover:scale-102"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#E07A5F]"
            style={{ backgroundColor: 'rgba(224, 122, 95, 0.12)' }}
          >
            <Briefcase size={20} weight="fill" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base sm:text-xl lg:text-2xl leading-none" style={{ color: 'var(--text-main)' }}>
              {portfolio.stats.yearsExperience}
            </div>
            <div className="text-[11px] sm:text-xs truncate font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
              Years Experience
            </div>
          </div>
        </div>

        <div
          className="card-warm p-3 sm:p-4 rounded-xl flex items-center gap-3 transition-transform hover:scale-102"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#D4A373]"
            style={{ backgroundColor: 'rgba(212, 163, 115, 0.15)' }}
          >
            <Lightning size={20} weight="fill" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base sm:text-xl lg:text-2xl leading-none" style={{ color: 'var(--text-main)' }}>
              {portfolio.stats.concurrentDevices}
            </div>
            <div className="text-[11px] sm:text-xs truncate font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
              Concurrent Devices
            </div>
          </div>
        </div>

        <div
          className="card-warm p-3 sm:p-4 rounded-xl flex items-center gap-3 transition-transform hover:scale-102"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#E07A5F]"
            style={{ backgroundColor: 'rgba(224, 122, 95, 0.12)' }}
          >
            <CheckCircle size={20} weight="fill" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base sm:text-xl lg:text-2xl leading-none" style={{ color: 'var(--text-main)' }}>
              {portfolio.stats.workloadReduction}
            </div>
            <div className="text-[11px] sm:text-xs truncate font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
              Manual Workload Cut
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
