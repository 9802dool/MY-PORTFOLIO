'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

const galleryItems = [
  // Keep a few placeholders for other tabs (until you provide local photos)
  { src: '/profile.jpg', alt: 'Portrait placeholder 1', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Portrait placeholder 2', tag: 'Portrait' },
  { src: '/profile.jpg', alt: 'Street placeholder 1', tag: 'Street' },
  { src: '/profile.jpg', alt: 'Landscape placeholder 1', tag: 'Landscape' },

  // Event photos from the provided Facebook album link
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472311674_539424545764604_6631314977338453137_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=U_gvy2Vigl4Q7kNvwGPhsjq&_nc_oc=AdrZ1FOHCBwdhv_6Fhk_3Nh20h2bsbXoUgoPq9dJGzTLTiB9f3Pto_wn1jt_r85g7AQ&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfygjLypzVIzVNOqoUFmiOYIQB_Au7Bg9-xuH-4UwrFZkA&oe=69C20964',
    alt: 'Event photo 1',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472277211_539418389098553_3015945418653063661_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=_vXb6owDU24Q7kNvwEIAYeu&_nc_oc=AdomeWRGDQ-anctLUnb2cvopBcAOJfoY_CfVRHhzLCX1PbLfb0Y_iwPlCKXughUxwr4&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfzmjcWIhxnp9HLXrXDbm-q76j2OZXIHY7yCw743s1tXXw&oe=69C1FD93',
    alt: 'Event photo 2',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472313168_539418162431909_1552450500731897031_n.jpg?stp=dst-jpg_p320x320_tt6&_nc_cat=103&ccb=1-7&_nc_sid=dd6889&_nc_ohc=l5VUkX-Z_gkQ7kNvwEdDs_J&_nc_oc=AdocLCMkYDBNyLnWDoBhd0z1CUKDMil2CYQW9DW6FUYWuefXCG-8_oCa4FbY5WNASm4&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_Afzr5WpqW2223FU9BsbCB5-MyV532viCthfODNd0OPAn1A&oe=69C21B0A',
    alt: 'Event photo 3',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472408775_539418119098580_7913124891961010498_n.jpg?stp=dst-jpg_s417x417_tt6&_nc_cat=103&ccb=1-7&_nc_sid=dd6889&_nc_ohc=pdiBFTF94XcQ7kNvwGbPP0E&_nc_oc=AdoHfkPHGLC7VHlG8qqIBzrFcWugl79GVBCwiRNSc-qewx43by1Mmb8RqDpebAnA0Sg&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfyY20M5E-JVODxHfiZMYoPZBHeSky74PD9M7E4pn4B2WA&oe=69C22030',
    alt: 'Event photo 4',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472309071_539418275765231_7388765126112239868_n.jpg?stp=dst-jpg_p320x320_tt6&_nc_cat=108&ccb=1-7&_nc_sid=dd6889&_nc_ohc=O0VZlLviQAAQ7kNvwHtCXzG&_nc_oc=AdqZoFxekBpreKG8iyzQ40KQvpI-7mxYHVKl5uMlrVDeRp9iyM8q8K3rpmjrOzEHCP8&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfxpWKaNO4SGTKUCkHWkRS74P2HYIvjyv4txwH7HFvJ70Q&oe=69C224C9',
    alt: 'Event photo 5',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472301011_539418412431884_723204715532122703_n.jpg?stp=dst-jpg_p320x320_tt6&_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_ohc=44iaHb22W7UQ7kNvwEEnYL5&_nc_oc=AdqKN5o6Vkh6tOoIIQbD7P0j0W5fGDzUHSYcmZgWVgKhlgYDN7EOgFtsewy-6SpVU_I&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfwMha9UPzBUNZMRoO5UWozbo34nHk4PleE8dNdLFH5DtA&oe=69C205F1',
    alt: 'Event photo 6',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472393402_539418455765213_3211684536699568926_n.jpg?stp=dst-jpg_p320x320_tt6&_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=_8DDRBp_QeoQ7kNvwET3QVT&_nc_oc=Adq8WtRa-G5upSHHL5RsFkFi4FzZxDmahNA_R9xLxfGaD9g69nZ-Xo4huVVNXRlMTD0&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_AfzdO5Gfwz7o9XIUC8FqEjQuLpkY-va8PWXEgi_4JSq0mw&oe=69C2239F',
    alt: 'Event photo 7',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472281157_539418405765218_2059498446580071846_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=dd6889&_nc_ohc=IKJpVlFRGmIQ7kNvwFiQh7r&_nc_oc=AdoPHZf3ltSlW2JNRq5k4OThsPbLwU2yG-I5cnJwO1seK-bjCede8JPvQ_-dDFkFIm0&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_Afw9W7ktbjpLHQ-cDq7OVQkajTKmU4Yv0tN1nxkrUVywKQ&oe=69C223B9',
    alt: 'Event photo 8',
    tag: 'Event',
  },
  {
    src: 'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472264956_539418329098559_2371840461727908694_n.jpg?stp=dst-jpg_p320x320_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=z_RsOvEcqt8Q7kNvwEsV3Fe&_nc_oc=AdpymGSNX6XJM36dik8BTV5bOVXC38YJhk8nWYuXEt-XMv6_xZBiasIFH-qxPhUcBEA&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=yEAOUtjFJho722dHPxAv8A&_nc_ss=8&oh=00_Afwu47dhH4l_KjanZ7V2-3r70xX_XExIM4EmqfhtyjePxw&oe=69C22CF1',
    alt: 'Event photo 9',
    tag: 'Event',
  },
] as const

const galleryTabs = ['All', 'Portrait', 'Street', 'Event', 'Landscape'] as const

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<(typeof galleryTabs)[number]>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredItems =
    activeTab === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.tag === activeTab)

  const activeItem =
    activeIndex === null ? null : (filteredItems[activeIndex] ?? null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section
      id="gallery"
      className="py-20 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-700 via-white to-neutral-900 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated set of photography shots. Replace these placeholders with your real images in `public/`.
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab)
                setActiveIndex(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeTab === tab
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white/70 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <Reveal
              key={`${item.alt}-${index}`}
              delay={index * 60}
              className="w-full"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group w-full text-left"
                aria-label={`Open photo: ${item.tag}`}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-400/20 text-amber-100 text-sm font-semibold">
                      {item.tag}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      View
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl h-[70vh] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {activeItem.tag}
                  </p>
                  <p className="text-white/70 text-sm truncate">
                    {activeItem.alt}
                  </p>
                </div>
                <p className="text-white/60 text-sm">
                  {activeIndex + 1}/{filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

