import React from 'react'
import { Briefcase, CalendarBlank, Buildings, Sparkle } from '@phosphor-icons/react'

export default function TimelineItem({ item, isLast }) {
  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Timeline track and node */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 shrink-0 shadow-md ${
            item.isCurrent
              ? 'bg-[#E07A5F] border-[#FAF3EA] text-white'
              : 'border-[#E07A5F]/40 text-[#E07A5F]'
          }`}
          style={{
            backgroundColor: item.isCurrent ? 'var(--accent-primary)' : 'var(--bg-card)',
          }}
        >
          {item.isCurrent ? (
            <Sparkle size={18} weight="fill" />
          ) : (
            <Briefcase size={18} weight="bold" />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 my-2 transition-colors group-hover:bg-[#E07A5F]"
            style={{ backgroundColor: 'var(--border-warm)' }}
          />
        )}
      </div>

      {/* Timeline Content Card */}
      <div className={`flex-1 pb-8 ${isLast ? 'pb-2' : ''}`}>
        <div className="card-warm p-5 sm:p-6 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3
              className="text-base sm:text-lg font-semibold group-hover:text-[#E07A5F] transition-colors"
              style={{ color: 'var(--text-main)' }}
            >
              {item.role}
            </h3>
            {item.isCurrent && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30">
                Most Recent
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium mb-3" style={{ color: 'var(--accent-secondary)' }}>
            <span className="flex items-center gap-1.5">
              <Buildings size={14} weight="bold" />
              {item.company}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarBlank size={14} weight="bold" />
              {item.period} ({item.duration})
            </span>
          </div>

          <ul className="space-y-1.5 mb-4 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {item.description.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: 'var(--border-warm)' }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium border"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-subtle)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
