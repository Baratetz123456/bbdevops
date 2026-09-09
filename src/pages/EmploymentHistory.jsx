import React from 'react'
import { ClockCounterClockwise, Trophy, GraduationCap } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition'
import TimelineItem from '../components/TimelineItem'
import { historyData, educationData } from '../data/historyData'

export default function EmploymentHistory() {
  return (
    <PageTransition className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <ClockCounterClockwise size={16} weight="fill" />
          <span>Experience Timeline</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Employment History
        </h1>
        <p className="text-xs sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Continuous 8-year progression (2018–present) — delivering enterprise network automation, low-code orchestration, and AI-driven tooling for clients across Japan and Singapore.
        </p>
      </div>

      {/* Main Content: Desktop Split Layout (Sticky Sidebar + Timeline Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary Stat Card & Education (Sticky on Desktop) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          {/* Summary Stat Card */}
          <div
            className="p-5 rounded-2xl border flex flex-col justify-between gap-4 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-warm)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E07A5F]/15 text-[#E07A5F] shrink-0">
                <Trophy size={20} weight="fill" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>
                  8+ Years of Growth
                </div>
                <div className="text-[11px] sm:text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>
                  Aug 2018 — Present
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-warm)' }}>
              <div>
                <div className="font-bold text-sm sm:text-base text-[#E07A5F]">Enterprise Verified</div>
                <div className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>Trainee to Consultant</div>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                style={{
                  backgroundColor: 'rgba(224, 122, 95, 0.12)',
                  borderColor: 'rgba(224, 122, 95, 0.35)',
                  color: 'var(--accent-primary)',
                }}
              >
                Active
              </span>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
              <GraduationCap size={18} weight="fill" />
              <span>Academic Background</span>
            </div>

            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="card-warm p-5 rounded-2xl space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--accent-secondary)' }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0"
                    style={{
                      backgroundColor: 'rgba(224, 122, 95, 0.12)',
                      borderColor: 'rgba(224, 122, 95, 0.35)',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    {edu.period}
                  </span>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience Timeline Stream */}
        <div className="lg:col-span-8">
          <div className="pt-1">
            {historyData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                isLast={index === historyData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
