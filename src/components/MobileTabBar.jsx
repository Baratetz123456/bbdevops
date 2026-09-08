import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  House,
  FolderOpen,
  Briefcase,
  ClockCounterClockwise,
  User,
  Envelope,
} from '@phosphor-icons/react'

const navList = [
  { label: 'Home', path: '/', icon: House },
  { label: 'Projects', path: '/projects', icon: FolderOpen },
  { label: 'Services', path: '/services', icon: Briefcase },
  { label: 'History', path: '/history', icon: ClockCounterClockwise },
  { label: 'About', path: '/about', icon: User },
  { label: 'Contact', path: '/contact', icon: Envelope },
]

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-md transition-colors duration-300 px-2 py-1.5 safe-area-pb"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-warm)',
      }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navList.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-1 py-1 rounded-xl transition-all duration-200 text-center ${
                  isActive ? 'scale-105 font-semibold' : 'opacity-70 hover:opacity-100'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
              })}
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isActive ? 'bg-[#E07A5F]/15' : ''
                    }`}
                  >
                    <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                  </div>
                  <span className="text-[10px] leading-none mt-0.5 tracking-tight">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
