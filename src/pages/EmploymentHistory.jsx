import React from 'react'
import { ClockCounterClockwise, Trophy, GraduationCap } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition'
import TimelineItem from '../components/TimelineItem'
import { historyData, educationData } from '../data/historyData'

export default function EmploymentHistory() {
  return (
    <PageTransition className="p-5 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <ClockCounterClockwise size={16} weight="fill" />
          <span>Experience Timeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Employment History
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Continuous 8-year progression (2018–present) — delivering enterprise network automation, low-code orchestration, and AI-driven tooling for clients across Japan and Singapore.
        </p>
      </div>

      {/* Summary Stat Card */}
      <div
        className="p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-warm)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E07A5F]/15 text-[#E07A5F]">
            <Trophy size={20} weight="fill" />
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>
              8+ Years of Engineering Growth
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              August 2018 — Present (Enterprise Network & Automation Engineering)
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-lg text-[#E07A5F]">Enterprise Verified</div>
          <div className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>From Trainee to Consultant</div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="pt-2">
        {historyData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === historyData.length - 1}
          />
        ))}
      </div>

      {/* Education Section */}
      <div className="space-y-4 pt-4 border-t" style={{ borderColor: 'var(--border-warm)' }}>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <GraduationCap size={18} weight="fill" />
          <span>Education & Academic Background</span>
        </div>

        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="card-warm p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--text-main)' }}>
                {edu.degree}
              </h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent-secondary)' }}>
                {edu.institution}
              </p>
              <p className="text-xs max-w-xl mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
    </PageTransition>
  )
}
