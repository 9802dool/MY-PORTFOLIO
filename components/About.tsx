import Reveal from '@/components/Reveal'
import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-700 via-white to-neutral-900 mx-auto"></div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m Simeon Doolarsingh, a photographer driven by a passion for
              capturing authentic moments and transforming them into powerful visual
              stories. With a sharp eye for detail and a commitment to clean,
              intentional composition, I create images that feel genuine, expressive,
              and deeply connected to the people and places they represent.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My journey in photography began with curiosity-an urge to document the
              world as I saw it. Over time, that curiosity evolved into a craft and a
              career focused on storytelling through imagery. I enjoy taking on
              creative challenges, exploring new techniques, and continuously refining
              my approach to produce work that resonates.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether I&apos;m documenting community initiatives, highlighting human
              stories, or capturing the energy of an event, my goal is always the
              same: to create visuals that leave a lasting impression.
            </p>
          </Reveal>
          
          <Reveal className="relative" delay={150}>
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-amber-700 via-white to-neutral-900 p-2 shadow-2xl shadow-amber-900/20">
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-neutral-50/70 dark:bg-neutral-800/70 flex items-center justify-center ring-1 ring-amber-400/20">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-300/15 via-transparent to-black/10" />
                <Image
                  src="/me.PNG"
                  alt="Simeon Doolarsingh"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="w-full h-full object-cover object-[center_15%] rounded-[1.75rem]"
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

