'use client'

import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-700 via-white to-neutral-900 mx-auto mb-4"></div>
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
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                      <img
                        src="/email icon.png"
                        alt="Email icon"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">simeondoolarsingh@hotmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                      <img
                        src="/location icon.png"
                        alt="Location icon"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white">Chaguanas, Trinidad and Tobago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                      <img
                        src="/whats app.png"
                        alt="whats app"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">whats app</p>
                      <a
                        href="https://wa.me/18683224691"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-900 dark:text-white hover:text-amber-700 transition-colors"
                      >
                        18683224691
                      </a>
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
                    {
                      name: 'Facebook',
                      href: 'https://www.facebook.com/profile.php?id=100090911882183',
                      icon: (
                        <img
                          src="/icons/fb icon.png"
                          alt="Facebook icon"
                          className="w-5 h-5 object-contain"
                        />
                      ),
                    },
                    {
                      name: 'Instagram',
                      href: 'https://www.instagram.com/lookmehdey/',
                      icon: (
                        <img
                          src="/ig icon.png"
                          alt="Instagram icon"
                          className="w-5 h-5 object-contain"
                        />
                      ),
                    },
                  ].map((social, index) => (
                    <Reveal key={social.name} delay={index * 80}>
                      <a
                        href={social.href}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors text-xl"
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

