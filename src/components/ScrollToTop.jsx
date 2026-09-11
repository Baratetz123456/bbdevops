import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * Ensures that on any route change, the viewport immediately resets
 * to the top-left (0, 0), and overrides browser scroll restoration
 * so Back and Forward navigations also start cleanly from the top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Disable native browser scroll restoration so Back/Forward history navigation starts at top
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Instantly jump to top on both window and document root elements
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })

    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }, [pathname])

  return null
}
