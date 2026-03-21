'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

type GalleryItem = {
  src: string
  alt: string
  tag: 'Portrait' | 'Landscape' | 'Event'
  /** Shown on cards / lightbox title when set (e.g. event series name) */
  badge?: string
}

const galleryItems: GalleryItem[] = [
  { src: '/Portrait for web/p1.JPG', alt: 'Portrait photo 1', tag: 'Portrait' },
  { src: '/Portrait for web/p2.JPG', alt: 'Portrait photo 2', tag: 'Portrait' },
  { src: '/Portrait for web/p3.JPG', alt: 'Portrait photo 3', tag: 'Portrait' },
  { src: '/Portrait for web/p4.JPG', alt: 'Portrait photo 4', tag: 'Portrait' },
  { src: '/Portrait for web/p5.JPG', alt: 'Portrait photo 5', tag: 'Portrait' },
  { src: '/Portrait for web/p6.JPG', alt: 'Portrait photo 6', tag: 'Portrait' },
  { src: '/Portrait for web/p7.JPG', alt: 'Portrait photo 7', tag: 'Portrait' },
  { src: '/Portrait for web/p8.JPG', alt: 'Portrait photo 8', tag: 'Portrait' },
  { src: '/Portrait for web/p9.JPG', alt: 'Portrait photo 9', tag: 'Portrait' },
  { src: '/Portrait for web/p10.JPG', alt: 'Portrait photo 10', tag: 'Portrait' },
  {
    src: '/Zebapique Productions 2026/1.jpg',
    alt: 'Zebapique Productions 2026 – photo 1',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/2.jpg',
    alt: 'Zebapique Productions 2026 – photo 2',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/3.jpg',
    alt: 'Zebapique Productions 2026 – photo 3',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/4.jpg',
    alt: 'Zebapique Productions 2026 – photo 4',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/5.jpg',
    alt: 'Zebapique Productions 2026 – photo 5',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/6.jpg',
    alt: 'Zebapique Productions 2026 – photo 6',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/7.jpg',
    alt: 'Zebapique Productions 2026 – photo 7',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/8.jpg',
    alt: 'Zebapique Productions 2026 – photo 8',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/9.jpg',
    alt: 'Zebapique Productions 2026 – photo 9',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  {
    src: '/Zebapique Productions 2026/10.jpg',
    alt: 'Zebapique Productions 2026 – photo 10',
    tag: 'Event',
    badge: 'Zebapique Productions 2026',
  },
  { src: '/Landscape 1/L1.JPG', alt: 'Landscape photo 1', tag: 'Landscape' },
  { src: '/Landscape 1/L2.JPG', alt: 'Landscape photo 2', tag: 'Landscape' },
  { src: '/Landscape 1/L3.JPG', alt: 'Landscape photo 3', tag: 'Landscape' },
  { src: '/Landscape 1/L4.JPG', alt: 'Landscape photo 4', tag: 'Landscape' },
  { src: '/Landscape 1/L5.JPG', alt: 'Landscape photo 5', tag: 'Landscape' },
  { src: '/Landscape 1/L6.jpg', alt: 'Landscape photo 6', tag: 'Landscape' },
  { src: '/Landscape 1/L7.JPG', alt: 'Landscape photo 7', tag: 'Landscape' },
  { src: '/Landscape 1/L8.JPG', alt: 'Landscape photo 8', tag: 'Landscape' },
  { src: '/Landscape 1/L9.JPG', alt: 'Landscape photo 9', tag: 'Landscape' },
  { src: '/Landscape 1/L11.JPG', alt: 'Landscape photo 11', tag: 'Landscape' },
  { src: '/Landscape 1/L15.JPG', alt: 'Landscape photo 15', tag: 'Landscape' },
]

const galleryTabs = ['All', 'Portrait', 'Event', 'Landscape'] as const

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<(typeof galleryTabs)[number]>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredItems =
    activeTab === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.tag === activeTab)

  const activeItem =
    activeIndex === null ? null : (filteredItems[activeIndex] ?? null)

  const showPrevious = () => {
    if (!filteredItems.length) return
    setActiveIndex((prev) => {
      if (prev === null) return 0
      return (prev - 1 + filteredItems.length) % filteredItems.length
    })
  }

  const showNext = () => {
    if (!filteredItems.length) return
    setActiveIndex((prev) => {
      if (prev === null) return 0
      return (prev + 1) % filteredItems.length
    })
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (activeIndex !== null && e.key === 'ArrowLeft') showPrevious()
      if (activeIndex !== null && e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, filteredItems.length])

  return (
    <section
      id="gallery"
      className="scroll-mt-[4.5rem] border-t border-stone-200/80 bg-stone-100/40 py-16 sm:py-24 dark:border-stone-800/80 dark:bg-stone-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center" variant="zoom">
          <h2 className="font-display text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
            Gallery
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-amber-700/80 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-stone-600 dark:text-stone-400">
            Portraits, events, and landscapes—real emotion, vibrant moments, and
            places seen through a focused, storytelling lens.
          </p>
        </Reveal>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab)
                setActiveIndex(null)
              }}
              className={`min-h-[44px] border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-studio transition-colors sm:px-5 ${
                activeTab === tab
                  ? 'border-amber-800 bg-amber-800 text-white dark:border-amber-700 dark:bg-amber-700'
                  : 'border-stone-300/90 bg-white/90 text-stone-600 hover:border-amber-700/50 hover:text-amber-900 dark:border-stone-600 dark:bg-stone-850 dark:text-stone-300 dark:hover:border-amber-500/50 dark:hover:text-amber-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mb-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (!filteredItems.length) return
              if (activeIndex === null) {
                setActiveIndex(filteredItems.length - 1)
                return
              }
              showPrevious()
            }}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-stone-300/90 bg-white/90 text-stone-700 transition hover:border-amber-700/50 hover:text-amber-900 active:bg-stone-100 dark:border-stone-600 dark:bg-stone-850 dark:text-stone-200 dark:hover:border-amber-500/50 dark:hover:text-amber-200"
            aria-label="Previous photo"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              if (!filteredItems.length) return
              if (activeIndex === null) {
                setActiveIndex(0)
                return
              }
              showNext()
            }}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-stone-300/90 bg-white/90 text-stone-700 transition hover:border-amber-700/50 hover:text-amber-900 active:bg-stone-100 dark:border-stone-600 dark:bg-stone-850 dark:text-stone-200 dark:hover:border-amber-500/50 dark:hover:text-amber-200"
            aria-label="Next photo"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
          {filteredItems.map((item, index) => (
            <Reveal
              key={`${item.src}-${index}`}
              delay={index * 60}
              className="w-full"
              variant={index % 2 === 0 ? 'left' : 'right'}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group w-full text-left"
                aria-label={`Open photo: ${item.badge ?? item.tag}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-stone-200/90 bg-stone-50 shadow-sm transition hover:border-amber-800/25 hover:shadow-md dark:border-stone-700/80 dark:bg-stone-900/50 dark:hover:border-amber-500/30 md:aspect-video">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    quality={100}
                    priority={index < 3}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <span className="max-w-[min(100%,14rem)] truncate border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:text-[11px]">
                      {item.badge ?? item.tag}
                    </span>
                    <span className="text-xs font-medium text-white/90">
                      View
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative h-full w-full overflow-hidden bg-black touch-pan-y"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="100vw"
              className="object-contain"
              quality={100}
              priority
            />

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-3 sm:h-12 sm:w-12"
                  aria-label="Previous photo"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-3 sm:h-12 sm:w-12"
                  aria-label="Next photo"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-3 sm:top-3 sm:h-12 sm:w-12"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {activeItem.badge ?? activeItem.tag}
                  </p>
                  <p className="text-white/70 text-sm truncate">
                    {activeItem.alt}
                  </p>
                </div>
                <p className="text-white/60 text-sm">
                  {activeIndex + 1}/{filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

