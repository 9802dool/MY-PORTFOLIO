'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background photo (Laventille) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/laventille.jpg"
          alt="Laventille background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Animated gradient orbs for depth */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute -top-32 -right-32 w-72 h-72 sm:w-80 sm:h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stone-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
      
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:py-32">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white bg-white/15 backdrop-blur-md rounded-full border border-amber-400/20">
            Let's Go
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight md:leading-[1.05] drop-shadow-lg">
            My Name Is{' '}
            <span className="block sm:inline bg-gradient-to-r from-amber-200 via-white to-neutral-900 bg-clip-text text-transparent">
              Simeon Doolarsingh
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-6 max-w-3xl mx-auto drop-shadow-md">
            I am a police officer stepping confidently into the world of tech and AI development.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto drop-shadow-md">
            I'm learning to build with AI and Next.js—combining discipline from the field with the excitement of modern development. LET'S GO!
          </p>
        </div>
        <div className="mt-16 sm:mt-20 flex justify-center">
          <div className="hidden sm:flex animate-bounce">
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

