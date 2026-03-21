"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const HERO_BACKGROUND = '/me2.jpg'

function scrollToId(id: string) {
  const el = document.querySelector(id)
  if (!el) return
  const offset = window.innerWidth < 768 ? 68 : 84
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1])
  const y = useTransform(scrollYProgress, [0, 1], [0, 70])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.55])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, 28])

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] min-h-screen items-center justify-center overflow-hidden bg-stone-950"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden bg-black"
        aria-hidden="true"
        style={{ scale, y }}
      >
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          className="object-contain object-center animate-hero-zoom"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/65"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-20 flex w-full max-w-4xl flex-col items-center px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,env(safe-area-inset-top))] text-center sm:px-6 sm:pb-16 sm:pt-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.25rem,8.5vw,4.5rem)] font-medium tracking-tight text-balance text-white sm:text-6xl md:text-7xl"
        >
          Look Meh Dey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Portrait, event, and landscape work—crafted with clean composition and
          stories that feel honest and human.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToId('#gallery')}
            className="inline-flex min-h-[48px] items-center justify-center border border-white/35 bg-white/10 px-8 text-[11px] font-semibold uppercase tracking-studio text-white backdrop-blur-sm transition active:scale-[0.99] hover:border-amber-400/50 hover:bg-white/15"
          >
            View gallery
          </button>
          <button
            type="button"
            onClick={() => scrollToId('#contact')}
            className="inline-flex min-h-[48px] items-center justify-center bg-amber-700 px-8 text-[11px] font-semibold uppercase tracking-studio text-white shadow-lg shadow-black/25 transition active:scale-[0.99] hover:bg-amber-600"
          >
            Book &amp; inquire
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
