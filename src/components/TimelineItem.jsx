import React from 'react'
import { Briefcase, CalendarBlank, Buildings, Sparkle, MapPin } from '@phosphor-icons/react'

export default function TimelineItem({ item, isLast }) {
  /**
   * Helper to format bullets: parses "Highlight Prefix: Full Description"
   * to provide clean visual hierarchy for rapid scanning on mobile and desktop.
   */
  const renderBullet = (bullet, idx) => {
    const colonIndex = bullet.indexOf(': ')
    if (colonIndex !== -1) {
      const title = bullet.slice(0, colonIndex)
      const content = bullet.slice(colonIndex + 2)
      return (
        <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-[13px] sm:text-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E07A5F] mt-2 shrink-0 ring-2 ring-[#E07A5F]/25" />
          <span style={{ color: 'var(--text-muted)' }}>
            <strong className="font-semibold text-xs sm:text-[13.5px] block sm:inline" style={{ color: 'var(--text-main)' }}>
              {title}:
            </strong>{' '}
            {content}
          </span>
        </li>
      )
    }

    return (
      <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-[13px] sm:text-sm">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E07A5F] mt-2 shrink-0 ring-2 ring-[#E07A5F]/25" />
        <span style={{ color: 'var(--text-muted)' }}>{bullet}</span>
      </li>
    )
  }

  return (
    <div className="relative flex gap-2.5 sm:gap-6 group">
      {/* Timeline track and node (scaled down on mobile to preserve horizontal content width) */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 shrink-0 shadow-sm ${
            item.isCurrent
              ? 'bg-[#E07A5F] border-[#FAF3EA] text-white shadow-[#E07A5F]/20'
              : 'border-[#E07A5F]/40 text-[#E07A5F]'
          }`}
          style={{
            backgroundColor: item.isCurrent ? 'var(--accent-primary)' : 'var(--bg-card)',
          }}
        >
          {item.isCurrent ? (
            <Sparkle size={15} weight="fill" className="sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Briefcase size={15} weight="bold" className="sm:w-[18px] sm:h-[18px]" />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 my-1.5 sm:my-2 transition-colors group-hover:bg-[#E07A5F]"
            style={{ backgroundColor: 'var(--border-warm)' }}
          />
        )}
      </div>

      {/* Timeline Content Card */}
      <div className={`flex-1 pb-6 sm:pb-8 ${isLast ? 'pb-2' : ''}`}>
        <div className="card-warm p-4 sm:p-6 transition-all duration-300">
          {/* Role and Most Recent Badge */}
          <div className="flex flex-wrap items-start sm:items-center justify-between gap-2 mb-2">
            <h3
              className="text-[15px] sm:text-lg font-bold group-hover:text-[#E07A5F] transition-colors leading-snug"
              style={{ color: 'var(--text-main)' }}
            >
              {item.role}
            </h3>
            {item.isCurrent && (
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 shrink-0">
                Most Recent
              </span>
            )}
          </div>

          {/* Metadata Badges: Company, Location, Period & Duration */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
              }}
            >
              <Buildings size={13} weight="bold" className="text-[#E07A5F] shrink-0" />
              <span>{item.company}</span>
            </span>

            {item.location && (
              <span
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-medium border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-muted)',
                }}
              >
                <MapPin size={13} weight="bold" className="text-[#E07A5F] shrink-0" />
                <span>{item.location}</span>
              </span>
            )}

            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-medium border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-muted)',
              }}
            >
              <CalendarBlank size={13} weight="bold" className="text-[#D4A373] shrink-0" />
              <span>{item.period}</span>
              <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-semibold text-[#E07A5F] bg-[#E07A5F]/10">
                {item.duration}
              </span>
            </span>
          </div>

          {/* Key Achievements & Bullet Points */}
          <ul className="space-y-2.5 sm:space-y-2 mb-4">
            {item.description.map((bullet, idx) => renderBullet(bullet, idx))}
          </ul>

          {/* Tech & Domain Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2.5 border-t" style={{ borderColor: 'var(--border-warm)' }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium border"
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
