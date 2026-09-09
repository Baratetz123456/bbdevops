import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowsLeftRight,
  Motorcycle,
  Robot,
  Lightning,
  Cpu,
  ShieldCheck,
  ArrowUpRight,
  CaretDown,
  Sparkle,
  WarningCircle,
  Lightbulb,
  CheckCircle,
} from '@phosphor-icons/react'

const iconMap = {
  ArrowsLeftRight: ArrowsLeftRight,
  Motorcycle: Motorcycle,
  Robot: Robot,
  Lightning: Lightning,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
}

export default function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false)
  const Icon = iconMap[project.icon] || Robot

  return (
    <div
      className={`card-warm group flex flex-col overflow-hidden relative transition-all duration-300 ${
        showDetails
          ? 'border-[#E07A5F]/50 ring-1 ring-[#E07A5F]/25 shadow-md'
          : 'hover:shadow-lg'
      }`}
    >
      {/* Card Thumbnail with subtle zoom effect */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/5 dark:bg-white/5">
        <img
          src={project.image}
          alt={`${project.title} Preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border border-white/20 bg-black/40 text-white shadow-sm">
          {project.category}
        </div>

        {/* Optional Badge */}
        {project.badge && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E07A5F] text-white shadow-md">
            <Sparkle size={13} weight="bold" />
            <span>{project.badge}</span>
          </div>
        )}

        {/* Project Icon Badge */}
        <div
          className="absolute bottom-3 left-3 p-2 rounded-xl backdrop-blur-md border flex items-center justify-center text-white shadow-md"
          style={{
            backgroundColor: 'rgba(224, 122, 95, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Icon size={18} weight="bold" />
        </div>
      </div>

      {/* Content Section (uniform baseline structure so unexpanded cards align) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold text-base sm:text-lg leading-snug transition-colors group-hover:text-[#E07A5F]"
              style={{ color: 'var(--text-main)' }}
            >
              {project.title}
            </h3>
            <a
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} details`}
              className="p-1.5 rounded-lg border transition-all duration-200 hover:bg-[#E07A5F] hover:text-white hover:border-[#E07A5F] shrink-0"
              style={{
                borderColor: 'var(--border-warm)',
                color: 'var(--text-muted)',
              }}
            >
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>

          <p
            className="text-xs sm:text-sm line-clamp-2 leading-relaxed min-h-[36px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Expandable Case Study Details */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer select-none"
            style={{
              backgroundColor: showDetails ? 'rgba(224, 122, 95, 0.12)' : 'var(--bg-badge)',
              borderColor: showDetails ? 'rgba(224, 122, 95, 0.45)' : 'var(--border-warm)',
              color: showDetails ? 'var(--accent-primary)' : 'var(--text-main)',
            }}
          >
            <span>{showDetails ? 'Hide Case Study Details' : 'View Problem & Verified Impact'}</span>
            <motion.span
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="inline-flex items-center"
            >
              <CaretDown size={14} weight="bold" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="p-3.5 rounded-xl border text-xs space-y-3 mt-2"
                  style={{
                    backgroundColor: 'var(--bg-badge)',
                    borderColor: 'var(--border-warm)',
                  }}
                >
                  {/* Challenge / Problem */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E07A5F]">
                      <WarningCircle size={14} weight="bold" />
                      <span>Challenge / Problem:</span>
                    </div>
                    <p className="leading-relaxed pl-5 text-[12.5px]" style={{ color: 'var(--text-main)' }}>
                      {project.problem}
                    </p>
                  </div>

                  {/* Engineered Solution */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D4A373]">
                      <Lightbulb size={14} weight="bold" />
                      <span>Engineered Solution:</span>
                    </div>
                    <p className="leading-relaxed pl-5 text-[12.5px]" style={{ color: 'var(--text-muted)' }}>
                      {project.solution}
                    </p>
                  </div>

                  {/* Verified Impact */}
                  <div
                    className="p-2.5 rounded-lg border flex items-start gap-2.5"
                    style={{
                      backgroundColor: 'rgba(224, 122, 95, 0.09)',
                      borderColor: 'rgba(224, 122, 95, 0.25)',
                    }}
                  >
                    <CheckCircle size={16} weight="fill" className="text-[#E07A5F] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[11px] uppercase tracking-wider text-[#E07A5F] block">
                        Verified Impact:
                      </span>
                      <span className="font-medium text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t" style={{ borderColor: 'var(--border-warm)' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium border transition-colors"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
