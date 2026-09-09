import React from 'react'
import Skeleton from './Skeleton'

export default function ProjectSkeleton() {
  return (
    <div
      className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton variant="pill" className="w-32 h-5" />
        <Skeleton variant="rectangular" className="w-72 sm:w-96 h-9 sm:h-10 rounded-lg" />
        <Skeleton variant="text" className="w-full max-w-2xl h-4" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[80, 110, 140, 130, 120].map((width, idx) => (
          <Skeleton
            key={idx}
            variant="pill"
            className="h-8"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>

      {/* Grid Skeleton: 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border p-5 sm:p-6 space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-warm)',
            }}
          >
            {/* Card header with icon & badge */}
            <div className="flex items-center justify-between">
              <Skeleton variant="rectangular" className="w-10 h-10 rounded-xl" />
              <Skeleton variant="pill" className="w-24 h-5" />
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <Skeleton variant="text" className="w-3/4 h-5" />
              <Skeleton variant="text" className="w-full h-3.5" />
              <Skeleton variant="text" className="w-4/5 h-3.5" />
            </div>

            {/* Problem / Solution preview block */}
            <div
              className="p-3 rounded-xl space-y-2 border border-dashed"
              style={{ borderColor: 'var(--border-warm)' }}
            >
              <Skeleton variant="text" className="w-1/3 h-3" />
              <Skeleton variant="text" className="w-full h-3" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <Skeleton variant="rectangular" className="w-16 h-5 rounded-md" />
              <Skeleton variant="rectangular" className="w-20 h-5 rounded-md" />
              <Skeleton variant="rectangular" className="w-14 h-5 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
