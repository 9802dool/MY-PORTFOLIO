"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const HOME_PAGE_MEDIA = '/home%20page.mp4'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1])
  const y = useTransform(scrollYProgress, [0, 1], [0, 70])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.35])

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background: home page media from public (full frame, no crop) */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center bg-black"
        aria-hidden="true"
        style={{ scale, y }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-contain animate-hero-zoom"
        >
          <source src={HOME_PAGE_MEDIA} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />
    </motion.section>
  )
}

