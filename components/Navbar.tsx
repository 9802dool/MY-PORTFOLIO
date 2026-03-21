'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset =
        typeof window !== 'undefined' && window.innerWidth < 768 ? 68 : 84
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(href)
      setIsMenuOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#f7f4ef]/95 dark:bg-stone-925/95 backdrop-blur-md shadow-sm border-stone-200/80 dark:border-white/[0.06]'
          : 'bg-[#f7f4ef]/80 dark:bg-stone-925/80 backdrop-blur-md border-transparent dark:border-white/[0.04]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.25rem]">
          <Link
            href="/"
            className="font-display text-2xl sm:text-[1.65rem] tracking-tight text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400/90 transition-colors"
            onClick={handleLogoClick}
          >
            Look Meh Dey
          </Link>

          <div className="flex items-center gap-0.5 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-stone-700 transition hover:bg-stone-200/50 hover:text-amber-800 dark:text-stone-300 dark:hover:bg-stone-800/60 dark:hover:text-amber-400"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-[11px] uppercase tracking-studio font-medium text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
            isMenuOpen ? 'max-h-[min(70vh,22rem)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex max-h-[min(70vh,22rem)] flex-col gap-1 overflow-y-auto overscroll-contain border-t border-stone-200/80 py-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] dark:border-stone-700/50">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="min-h-[44px] rounded-md px-1 py-2.5 text-sm font-medium uppercase tracking-studio text-stone-800 transition-colors hover:bg-stone-200/60 hover:text-amber-800 active:bg-stone-200/80 dark:text-stone-200 dark:hover:bg-stone-800/50 dark:hover:text-amber-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

