import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Gallery />
      <Contact />
    </main>
  )
}

