import React from 'react'
import Skeleton from './Skeleton'

export default function PageSkeleton() {
  return (
    <div
      className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn"
      aria-busy="true"
      aria-label="Loading page content"
    >
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton variant="pill" className="w-32 h-5" />
        <Skeleton variant="rectangular" className="w-64 sm:w-80 h-9 sm:h-10 rounded-lg" />
        <Skeleton variant="text" className="w-full max-w-2xl h-4" />
        <Skeleton variant="text" className="w-4/5 max-w-xl h-4" />
      </div>

      {/* Primary Card Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="p-6 rounded-2xl border space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-warm)',
            }}
          >
            <div className="flex items-center gap-3">
              <Skeleton variant="rectangular" className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton variant="text" className="w-2/3 h-4.5" />
                <Skeleton variant="text" className="w-1/2 h-3" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton variant="text" className="w-full h-3.5" />
              <Skeleton variant="text" className="w-11/12 h-3.5" />
              <Skeleton variant="text" className="w-4/5 h-3.5" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton variant="rectangular" className="w-20 h-6 rounded-md" />
              <Skeleton variant="rectangular" className="w-24 h-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
