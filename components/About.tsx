import Reveal from '@/components/Reveal'
import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-[4.5rem] border-t border-stone-200/80 bg-background py-16 sm:py-24 dark:border-stone-800/80 dark:bg-stone-925"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center" variant="zoom">
          <p className="mb-3 text-[11px] uppercase tracking-studio text-amber-800/90 dark:text-amber-500/90">
            The studio
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
            About
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-amber-700/80 to-transparent" />
        </Reveal>
        
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-6" variant="left">
            <p className="text-[17px] leading-[1.75] text-stone-600 dark:text-stone-400">
              I&apos;m Simeon Doolarsingh, a photographer driven by a passion for
              capturing authentic moments and transforming them into powerful visual
              stories. With a sharp eye for detail and a commitment to clean,
              intentional composition, I create images that feel genuine, expressive,
              and deeply connected to the people and places they represent.
            </p>
            <p className="text-[17px] leading-[1.75] text-stone-600 dark:text-stone-400">
              My journey in photography began with curiosity-an urge to document the
              world as I saw it. Over time, that curiosity evolved into a craft and a
              career focused on storytelling through imagery. I enjoy taking on
              creative challenges, exploring new techniques, and continuously refining
              my approach to produce work that resonates.
            </p>
            <p className="text-[17px] leading-[1.75] text-stone-600 dark:text-stone-400">
              Whether I&apos;m documenting community initiatives, highlighting human
              stories, or capturing the energy of an event, my goal is always the
              same: to create visuals that leave a lasting impression.
            </p>
          </Reveal>
          
          <Reveal className="relative" delay={150} variant="right">
            <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-amber-800/90 via-stone-200 to-stone-900 p-[3px] shadow-2xl shadow-stone-900/25 dark:shadow-black/40">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2px] bg-stone-100 dark:bg-stone-850 ring-1 ring-stone-900/10 dark:ring-white/10">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-300/15 via-transparent to-black/10" />
                <Image
                  src="/me.PNG"
                  alt="Simeon Doolarsingh"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="h-full w-full object-cover object-[center_15%]"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

