import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  House,
  FolderOpen,
  Briefcase,
  ClockCounterClockwise,
  User,
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import ThemeToggle from './ThemeToggle'
import portfolio from '../data/portfolio.json'

const iconMap = {
  House: House,
  FolderOpen: FolderOpen,
  Briefcase: Briefcase,
  ClockCounterClockwise: ClockCounterClockwise,
  User: User,
  Envelope: Envelope,
}

const navList = [
  { label: 'Home', path: '/', icon: 'House' },
  { label: 'Projects', path: '/projects', icon: 'FolderOpen' },
  { label: 'Services', path: '/services', icon: 'Briefcase' },
  { label: 'Employment History', path: '/history', icon: 'ClockCounterClockwise' },
  { label: 'About', path: '/about', icon: 'User' },
  { label: 'Contact', path: '/contact', icon: 'Envelope' },
]

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 z-40 border-r transition-colors duration-300 select-none"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-warm)',
      }}
    >
      {/* Top Header: Prominent Blended Profile Hero Banner */}
      <div className="relative border-b overflow-hidden select-none" style={{ borderColor: 'var(--border-warm)' }}>
        {/* Banner Image Container with Gradient Dissolve Mask */}
        <div className="relative w-full h-52 overflow-hidden bg-black/10 group">
          <img
            src="/images/profile.jpg"
            alt="Jayson Barateta"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Multi-layered gradient overlay to seamlessly blend the portrait into var(--bg-sidebar) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 35%, var(--bg-sidebar) 98%)',
            }}
          />
          {/* Radial amber glow enhancement */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(224,122,95,0.4), transparent 70%)',
            }}
          />

          {/* Floating Top Controls: Theme Toggle */}
          <div className="absolute top-3 right-3 z-10">
            <div className="backdrop-blur-md bg-black/35 rounded-xl p-0.5 border border-white/15 shadow-sm">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Profile Details (Anchored at the base of the blended banner) */}
        <div className="px-5 pb-4 -mt-7 relative z-10">
          <Link
            to="/about"
            className="block group cursor-pointer"
            title={`View About ${portfolio.personal.name}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {portfolio.personal.availabilityBadge || 'Available for Hire'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#E07A5F] flex items-center gap-0.5 opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                <span>About</span>
                <span>→</span>
              </span>
            </div>

            <div className="mt-1">
              <h2
                className="font-bold text-base leading-snug group-hover:text-[#E07A5F] transition-colors"
                style={{ color: 'var(--text-main)' }}
              >
                {portfolio.personal.name}
              </h2>
              <p
                className="text-xs font-medium leading-tight mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                {portfolio.personal.role}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {navList.map((item) => {
          const IconComponent = iconMap[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                  isActive
                    ? 'text-white shadow-md font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: 'var(--accent-primary)',
                      color: '#FFF8F0',
                    }
                  : {
                      color: 'var(--text-muted)',
                    }
              }
            >
              {({ isActive }) => (
                <>
                  <IconComponent
                    size={20}
                    weight={isActive ? 'fill' : 'regular'}
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-[#E07A5F]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Footer: Social Links & Status */}
      <div className="p-5 border-t space-y-4" style={{ borderColor: 'var(--border-warm)' }}>
        <div
          className="px-3 py-2 rounded-xl text-xs flex items-center gap-2 border"
          style={{
            backgroundColor: 'var(--bg-badge)',
            borderColor: 'var(--border-warm)',
            color: 'var(--text-muted)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="truncate">Available for Projects & Contracts</span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href={portfolio.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:text-[#E07A5F]"
            style={{ color: 'var(--text-muted)' }}
          >
            <GithubLogo size={20} weight="fill" />
          </a>
          <a
            href={portfolio.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:text-[#E07A5F]"
            style={{ color: 'var(--text-muted)' }}
          >
            <LinkedinLogo size={20} weight="fill" />
          </a>
          <NavLink
            to="/contact"
            aria-label="Send Email"
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:text-[#E07A5F]"
            style={{ color: 'var(--text-muted)' }}
          >
            <Envelope size={20} weight="fill" />
          </NavLink>
        </div>

        <div className="text-center pt-1">
          <Link
            to="/privacy"
            className="text-[11px] hover:underline hover:text-[#E07A5F] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </aside>
  )
}
