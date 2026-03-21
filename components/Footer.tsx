import Image from 'next/image'
import fbIcon from '@/public/icon/fb.png'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100090911882183',
    icon: (
      <Image
        src={fbIcon}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/lookmehdey/',
    icon: (
      <img
        src="/icon/ig.png"
        alt=""
        className="h-5 w-5 object-contain"
      />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/80 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl tracking-tight text-stone-100">
              Look Meh Dey
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
              Photography & visual storytelling—Trinidad & Tobago.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8 md:items-end">
            <p className="text-center text-xs uppercase tracking-studio text-stone-600 md:text-right">
              © {new Date().getFullYear()} Simeon Doolarsingh
              <br />
              <span className="font-normal normal-case tracking-normal text-stone-500">
                All rights reserved.
              </span>
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-stone-700/80 text-stone-400 transition hover:border-amber-700/60 hover:text-amber-400"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
