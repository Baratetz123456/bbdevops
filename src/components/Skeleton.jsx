import React from 'react'

/**
 * Base Skeleton component with warm shimmer styling.
 * Supports text, circular, rectangular, or pill shapes.
 */
export default function Skeleton({
  className = '',
  variant = 'rectangular',
  style = {},
  ...props
}) {
  const variantStyles = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    pill: 'rounded-full',
  }

  return (
    <div
      aria-hidden="true"
      className={`skeleton-warm ${variantStyles[variant] || 'rounded-xl'} ${className}`}
      style={{
        ...style,
      }}
      {...props}
    />
  )
}
