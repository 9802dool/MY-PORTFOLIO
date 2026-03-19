'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

const galleryItems = [
  { src: '/profile.jpg', alt: 'Photography sample 1', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Photography sample 2', tag: 'Street' },
  { src: '/profile.jpg', alt: 'Photography sample 3', tag: 'Event' },
  { src: '/profile.jpg', alt: 'Photography sample 4', tag: 'Landscape' },
  { src: '/profile.jpg', alt: 'Photography sample 5', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Photography sample 6', tag: 'Street' },
  { src: '/profile.jpg', alt: 'Photography sample 7', tag: 'Event' },
  { src: '/profile.jpg', alt: 'Photography sample 8', tag: 'Landscape' },
  { src: '/profile.jpg', alt: 'Photography sample 9', tag: 'Portrait' },
] as const

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activeItem =
    activeIndex === null ? null : (galleryItems[activeIndex] ?? null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
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
              className="object-cover"
              priority
            />

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
                  {activeIndex + 1}/{galleryItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

