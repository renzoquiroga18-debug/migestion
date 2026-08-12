import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import FeaturesGrid from '../components/landing/FeaturesGrid'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <Footer />
    </div>
  )
}
