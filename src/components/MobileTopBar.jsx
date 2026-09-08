import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkle } from '@phosphor-icons/react'
import ThemeToggle from './ThemeToggle'
import portfolio from '../data/portfolio.json'

export default function MobileTopBar() {
  return (
    <header
      className="md:hidden sticky top-0 z-40 w-full px-4 py-3 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-warm)',
      }}
    >
      <Link to="/about" className="flex items-center gap-2.5 group">
        <div
          className="w-9 h-9 rounded-full overflow-hidden border-2 shadow-sm transition-transform group-hover:scale-105 shrink-0"
          style={{ borderColor: 'var(--accent-primary)' }}
        >
          <img
            src="/images/avatar.jpg"
            alt={portfolio.personal.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-sm leading-tight block group-hover:text-[#E07A5F] transition-colors" style={{ color: 'var(--text-main)' }}>
            {portfolio.personal.name}
          </span>
          <span className="text-[11px] flex items-center gap-1 font-medium" style={{ color: 'var(--accent-secondary)' }}>
            <Sparkle size={10} weight="fill" />
            {portfolio.personal.role}
          </span>
        </div>
      </Link>
      <ThemeToggle />
    </header>
  )
}
