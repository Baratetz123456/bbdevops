import React from 'react'
import Skeleton from './Skeleton'

export default function TimelineSkeleton() {
  return (
    <div
      className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn"
      aria-busy="true"
      aria-label="Loading employment history"
    >
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton variant="pill" className="w-36 h-5" />
        <Skeleton variant="rectangular" className="w-64 sm:w-80 h-9 sm:h-10 rounded-lg" />
        <Skeleton variant="text" className="w-full max-w-2xl h-4" />
        <Skeleton variant="text" className="w-4/5 max-w-xl h-4" />
      </div>

      {/* Main Split Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stat Card & Education (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Stat Card Skeleton */}
          <div
            className="p-5 rounded-2xl border space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-warm)',
            }}
          >
            <div className="flex items-center gap-3">
              <Skeleton variant="rectangular" className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="w-36 h-4.5" />
                <Skeleton variant="text" className="w-28 h-3.5" />
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border-warm)] flex items-center justify-between">
              <Skeleton variant="text" className="w-32 h-5" />
              <Skeleton variant="pill" className="w-16 h-5" />
            </div>
          </div>

          {/* Education Card Skeleton */}
          <div className="space-y-3">
            <Skeleton variant="pill" className="w-48 h-5" />
            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-warm)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2 flex-1">
                  <Skeleton variant="text" className="w-48 h-4.5" />
                  <Skeleton variant="text" className="w-36 h-3.5" />
                </div>
                <Skeleton variant="pill" className="w-20 h-5 shrink-0" />
              </div>
              <Skeleton variant="text" className="w-full h-3.5 mt-2" />
              <Skeleton variant="text" className="w-4/5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Right Column: Timeline Cards Skeleton (lg:col-span-8) */}
        <div className="lg:col-span-8">
          <div className="space-y-2">
            {[1, 2, 3].map((index, idx) => (
              <div key={index} className="relative flex gap-2.5 sm:gap-6">
                {/* Track & Node */}
                <div className="flex flex-col items-center">
                  <Skeleton
                    variant="circular"
                    className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-2 border-[var(--border-warm)]"
                  />
                  {idx < 2 && (
                    <div
                      className="w-0.5 flex-1 my-2"
                      style={{ backgroundColor: 'var(--border-warm)' }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className={`flex-1 ${idx < 2 ? 'pb-8' : 'pb-2'}`}>
                  <div
                    className="p-4 sm:p-6 rounded-2xl border space-y-4"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-warm)',
                    }}
                  >
                    {/* Role & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Skeleton variant="text" className="w-48 sm:w-64 h-5" />
                      {idx === 0 && <Skeleton variant="pill" className="w-20 h-5" />}
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton variant="pill" className="w-32 h-6" />
                      <Skeleton variant="pill" className="w-28 h-6" />
                      <Skeleton variant="pill" className="w-24 h-6" />
                    </div>

                    {/* Bullets */}
                    <div className="space-y-2.5 pt-1">
                      <Skeleton variant="text" className="w-full h-4" />
                      <Skeleton variant="text" className="w-11/12 h-4" />
                      <Skeleton variant="text" className="w-4/5 h-4" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-warm)]">
                      <Skeleton variant="rectangular" className="w-16 h-5 rounded-md" />
                      <Skeleton variant="rectangular" className="w-24 h-5 rounded-md" />
                      <Skeleton variant="rectangular" className="w-20 h-5 rounded-md" />
                      <Skeleton variant="rectangular" className="w-14 h-5 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
