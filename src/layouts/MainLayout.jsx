import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import MobileTabBar from '../components/MobileTabBar'
import MobileTopBar from '../components/MobileTopBar'

export default function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Desktop Sidebar (≥ 768px) */}
      <Sidebar />

      {/* Mobile Top Bar (< 768px) */}
      <MobileTopBar />

      {/* Main Content Area */}
      <main
        className={`flex-1 md:ml-64 flex flex-col transition-all duration-300 ${
          isHome
            ? 'h-[calc(100vh-60px)] md:h-screen md:overflow-hidden pb-16 md:pb-0'
            : 'min-h-screen pb-20 md:pb-8'
        }`}
      >
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Tab Bar (< 768px) */}
      <MobileTabBar />
    </div>
  )
}
