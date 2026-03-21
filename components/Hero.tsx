"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

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
      {/* Background photo */}
      <motion.div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{ scale, y }}
      >
        <Image
          src="/me1.png"
          alt="Simeon portrait background"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-hero-zoom"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />
    </motion.section>
  )
}

