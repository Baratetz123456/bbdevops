import React from 'react'
import { Robot, Gear, Code, ShareNetwork, Check } from '@phosphor-icons/react'

const iconMap = {
  Robot: Robot,
  Gear: Gear,
  Code: Code,
  ShareNetwork: ShareNetwork,
}

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Robot

  return (
    <div className="card-warm p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: service.color }}
          >
            <Icon size={24} weight="bold" />
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{
              borderColor: 'var(--border-warm)',
              backgroundColor: 'var(--bg-badge)',
              color: 'var(--text-subtle)',
            }}
          >
            Specialization
          </span>
        </div>

        <h3
          className="font-semibold text-lg sm:text-xl mb-2 group-hover:text-[#E07A5F] transition-colors"
          style={{ color: 'var(--text-main)' }}
        >
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
          {service.tagline}
        </p>
      </div>

      <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--border-warm)' }}>
        {service.features.map((feat) => (
          <div key={feat} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-main)' }}>
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${service.color}25`, color: service.color }}
            >
              <Check size={10} weight="bold" />
            </div>
            <span>{feat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
