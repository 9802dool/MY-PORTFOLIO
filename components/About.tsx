import Reveal from '@/components/Reveal'
import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-black mx-auto"></div>
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
            <div className="pt-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Node.js',
                  'Tailwind CSS',
                  'Python',
                  'MongoDB',
                  'PostgreSQL',
                ].map((skill, index) => (
                  <Reveal
                    key={skill}
                    className="inline-flex"
                    delay={index * 60}
                  >
                    <span
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          
          <Reveal className="relative" delay={150}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-600 via-white to-black p-1">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Image
                  src="/profile.jpg"
                  alt="Simeon Doolarsingh"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl"
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

