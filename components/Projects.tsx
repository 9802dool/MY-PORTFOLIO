import Reveal from '@/components/Reveal'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Videography',
      description:
        'i am a videographer and video editor. I have a passion for creating videos that tell a story and inspire people.',
      technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'AI Development'],
      gradient: 'from-blue-500 to-purple-600',
      icon: '🚀',
    },
    {
      id: 2,
      title: 'Community Safety App',
      description:
        'A web application designed to improve community engagement and safety reporting. Built with modern web technologies, combining my experience in law enforcement with new development skills.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-indigo-500 to-blue-600',
      icon: '🛡️',
    },
    {
      id: 3,
      title: 'Learning Progress Tracker',
      description:
        'A personal project tracking my journey learning Next.js and AI development. Features progress visualization, skill tracking, and project management tools to document my growth as a developer.',
      technologies: ['Next.js', 'TypeScript', 'Chart.js', 'Local Storage'],
      gradient: 'from-purple-500 to-pink-600',
      icon: '📈',
    },
  ]

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 120}>
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="relative z-10 text-white text-6xl font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 group/link"
                    >
                      View Project
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 font-semibold hover:underline"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

