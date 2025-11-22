'use client'

import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-black mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Send me a message and I'll respond as soon as possible.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal className="space-y-8" delay={100}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">simeondoolarsingh@hotmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white">Your City, Country</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Social Links
                </h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'GitHub', icon: '💻' },
                    { name: 'LinkedIn', icon: '💼' },
                    { name: 'Twitter', icon: '🐦' },
                  ].map((social, index) => (
                    <Reveal key={social.name} delay={index * 80}>
                      <a
                        href="#"
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-xl"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

