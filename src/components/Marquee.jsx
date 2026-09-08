import React from 'react'
import {
  Code,
  Sparkle,
  Cpu,
  Robot,
  ShareNetwork,
  GitBranch,
} from '@phosphor-icons/react'

const tools = [
  { name: 'Python', icon: Code, color: '#E07A5F' },
  { name: 'Antigravity', icon: Sparkle, color: '#D4A373' },
  { name: 'Claude Code', icon: Robot, color: '#E07A5F' },
  { name: 'GitHub Copilot', icon: Cpu, color: '#D4A373' },
  { name: 'Network Automation', icon: ShareNetwork, color: '#E07A5F' },
  { name: 'N8N', icon: GitBranch, color: '#D4A373' },
]

export default function Marquee() {
  // Duplicate array for seamless infinite scroll
  const duplicated = [...tools, ...tools, ...tools]

  return (
    <div className="w-full overflow-hidden py-3 relative select-none group">
      {/* Left and Right subtle gradient fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{
          background: 'linear-gradient(to right, var(--bg-page), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{
          background: 'linear-gradient(to left, var(--bg-page), transparent)',
        }}
      />

      <div className="animate-marquee flex items-center gap-4">
        {duplicated.map((tool, idx) => {
          const Icon = tool.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-warm)',
                color: 'var(--text-main)',
                boxShadow: 'var(--shadow-warm)',
              }}
            >
              <Icon size={16} weight="fill" style={{ color: tool.color }} />
              <span className="whitespace-nowrap">{tool.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
