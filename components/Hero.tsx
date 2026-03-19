import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background photo (Laventille) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/laventille.jpg"
          alt="Laventille background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

