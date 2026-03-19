'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

const galleryItems = [
  // Keep a few placeholders for other tabs (until you provide local photos)
  { src: '/profile.jpg', alt: 'Portrait placeholder 1', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Portrait placeholder 2', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Street placeholder 1', tag: 'Street' },
  { src: '/Landscape 1/L1.JPG', alt: 'Landscape photo 1', tag: 'Landscape' },
  { src: '/Landscape 1/L2.JPG', alt: 'Landscape photo 2', tag: 'Landscape' },
  { src: '/Landscape 1/L3.JPG', alt: 'Landscape photo 3', tag: 'Landscape' },
  { src: '/Landscape 1/L4.JPG', alt: 'Landscape photo 4', tag: 'Landscape' },
  { src: '/Landscape 1/L5.JPG', alt: 'Landscape photo 5', tag: 'Landscape' },
  { src: '/Landscape 1/L6.JPG', alt: 'Landscape photo 6', tag: 'Landscape' },
  { src: '/Landscape 1/L7.JPG', alt: 'Landscape photo 7', tag: 'Landscape' },
  { src: '/Landscape 1/L8.JPG', alt: 'Landscape photo 8', tag: 'Landscape' },
  { src: '/Landscape 1/L9.JPG', alt: 'Landscape photo 9', tag: 'Landscape' },
  { src: '/Landscape 1/L10.JPG', alt: 'Landscape photo 10', tag: 'Landscape' },
  { src: '/Landscape 1/L11.JPG', alt: 'Landscape photo 11', tag: 'Landscape' },
  { src: '/Landscape 1/L12.JPG', alt: 'Landscape photo 12', tag: 'Landscape' },
  { src: '/Landscape 1/L13.JPG', alt: 'Landscape photo 13', tag: 'Landscape' },
  { src: '/Landscape 1/L14.JPG', alt: 'Landscape photo 14', tag: 'Landscape' },
] as const

const galleryTabs = ['All', 'Portrait', 'Street', 'Event', 'Landscape'] as const

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
      className="py-20 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-700 via-white to-neutral-900 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated set of photography shots. Replace these placeholders with your real images in `public/`.
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab)
                setActiveIndex(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeTab === tab
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white/70 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <Reveal
              key={`${item.alt}-${index}`}
              delay={index * 60}
              className="w-full"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group w-full text-left"
                aria-label={`Open photo: ${item.tag}`}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-400/20 text-amber-100 text-sm font-semibold">
                      {item.tag}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
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
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl h-[70vh] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
              quality={100}
              priority
            />

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
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
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
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
              </>
            )}

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close"
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
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {activeItem.tag}
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

