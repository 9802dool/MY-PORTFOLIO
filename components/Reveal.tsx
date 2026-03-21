"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'zoom' | 'left' | 'right'
}

const variantAnimations: Record<
  NonNullable<RevealProps['variant']>,
  { hidden: { opacity: number; y?: number; x?: number; scale?: number }; visible: { opacity: number; y?: number; x?: number; scale?: number } }
> = {
  up: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: RevealProps) {
  const selected = variantAnimations[variant]

  return (
    <motion.div
      className={`will-change-transform ${className}`}
      initial={selected.hidden}
      whileInView={selected.visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
