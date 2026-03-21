'use client'

import Image from 'next/image'
import fbIcon from '@/public/icon/fb.png'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-[4.5rem] border-t border-stone-200/80 bg-background py-16 sm:py-24 dark:border-stone-800/80 dark:bg-stone-925"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center" variant="zoom">
          <p className="mb-3 text-[11px] uppercase tracking-studio text-amber-800/90 dark:text-amber-500/90">
            Inquiries
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
            Get in touch
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-amber-700/80 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-stone-600 dark:text-stone-400">
            Have a project in mind or want to collaborate? Send a note—responses
            are usually quick during the week.
          </p>
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-14 md:grid-cols-2 md:gap-16">
            <Reveal className="space-y-10" delay={100} variant="left">
              <div>
                <h3 className="mb-8 text-[11px] font-semibold uppercase tracking-studio text-stone-500 dark:text-stone-500">
                  Contact
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-stone-200/90 bg-white dark:border-stone-600 dark:bg-stone-850">
                      <img
                        src="/icon/email.png"
                        alt="Email icon"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-500">
                        Email
                      </p>
                      <a
                        href="mailto:simeondoolarsingh@hotmail.com"
                        className="mt-0.5 block text-stone-900 transition hover:text-amber-800 dark:text-stone-100 dark:hover:text-amber-400"
                      >
                        simeondoolarsingh@hotmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-stone-200/90 bg-white dark:border-stone-600 dark:bg-stone-850">
                      <img
                        src="/icon/loc.png"
                        alt="Location icon"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-500">
                        Location
                      </p>
                      <p className="mt-0.5 text-stone-900 dark:text-stone-100">
                        Chaguanas, Trinidad and Tobago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-stone-200/90 bg-white dark:border-stone-600 dark:bg-stone-850">
                      <img
                        src="/icon/wa.png"
                        alt="whats app"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-500">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/18683224691"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 block text-stone-900 transition hover:text-amber-800 dark:text-stone-100 dark:hover:text-amber-400"
                      >
                        18683224691
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-studio text-stone-500 dark:text-stone-500">
                  Social
                </h3>
                <div className="flex gap-3">
                  {[
                    {
                      name: 'Facebook',
                      href: 'https://www.facebook.com/profile.php?id=100090911882183',
                      icon: (
                        <Image
                          src={fbIcon}
                          alt="Facebook icon"
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      ),
                    },
                    {
                      name: 'Instagram',
                      href: 'https://www.instagram.com/lookmehdey/',
                      icon: (
                        <img
                          src="/icon/ig.png"
                          alt="Instagram icon"
                          className="w-5 h-5 object-contain"
                        />
                      ),
                    },
                  ].map((social, index) => (
                    <Reveal key={social.name} delay={index * 80} variant="zoom">
                      <a
                        href={social.href}
                        className="flex h-12 w-12 items-center justify-center border border-stone-200/90 bg-white text-stone-800 transition hover:border-amber-800 hover:bg-amber-800 hover:text-white dark:border-stone-600 dark:bg-stone-850 dark:text-stone-100 dark:hover:border-amber-600 dark:hover:bg-amber-700"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} variant="right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

