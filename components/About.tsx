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
              I'm a passionate developer with a love for creating innovative solutions
              and beautiful user experiences. With expertise in modern web technologies,
              I bring ideas to life through clean, efficient code.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My journey in tech started with curiosity and has evolved into a career
              focused on building applications that make a difference. I enjoy working
              on challenging projects and continuously learning new technologies.
            </p>
          </Reveal>
          
          <Reveal className="relative" delay={150}>
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-amber-700 via-white to-neutral-900 p-2 shadow-2xl shadow-amber-900/20">
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-neutral-50/70 dark:bg-neutral-800/70 flex items-center justify-center ring-1 ring-amber-400/20">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-300/15 via-transparent to-black/10" />
                <Image
                  src="/profile.jpg"
                  alt="Simeon Doolarsingh"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="w-full h-full object-contain rounded-[1.75rem]"
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

