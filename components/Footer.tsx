const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.55v-2.02c-3.22.7-3.9-1.56-3.9-1.56-.53-1.35-1.3-1.71-1.3-1.71-1.07-.73.08-.72.08-.72 1.19.08 1.82 1.23 1.82 1.23 1.05 1.8 2.76 1.28 3.44.98.1-.77.41-1.28.75-1.57-2.57-.29-5.27-1.29-5.27-5.76 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.02 11.02 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.24 2.73.12 3.02.75.81 1.2 1.84 1.2 3.11 0 4.48-2.71 5.47-5.29 5.75.42.36.8 1.08.8 2.18v3.23c0 .3.2.66.8.55A11.5 11.5 0 0 0 12 .5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.75h3.96V21H3V8.75Zm6.25 0H13v1.68h.05c.55-1.05 1.9-2.16 3.92-2.16 4.19 0 4.96 2.76 4.96 6.36V21h-3.95v-5.45c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9.25V8.75Z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.96 4.46c-.77.34-1.6.57-2.47.67a4.28 4.28 0 0 0 1.88-2.37 8.55 8.55 0 0 1-2.72 1.04 4.24 4.24 0 0 0-7.4 2.9c0 .33.04.65.1.96a12.03 12.03 0 0 1-8.74-4.43 4.24 4.24 0 0 0 1.31 5.66 4.2 4.2 0 0 1-1.92-.53v.05a4.25 4.25 0 0 0 3.4 4.16 4.3 4.3 0 0 1-1.9.07 4.26 4.26 0 0 0 3.96 2.94A8.51 8.51 0 0 1 3 18.4a12.03 12.03 0 0 0 6.52 1.91c7.83 0 12.12-6.49 12.12-12.12 0-.18-.01-.36-.02-.54a8.65 8.65 0 0 0 2.12-2.19 8.47 8.47 0 0 1-2.43.66 4.22 4.22 0 0 0 1.86-2.38Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-red-500 transition-all duration-300"
                aria-label={link.name}
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

