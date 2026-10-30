'use client'

import { useEffect, useState } from 'react'

const SHOW_AFTER_PX = 400

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#E3E1DA] bg-white text-ink shadow-md transition-colors hover:bg-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-accent md:bottom-6 md:right-6"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}
