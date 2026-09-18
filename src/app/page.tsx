import { NavBar } from "@/components/blocks/navbar"
import { Hero } from "@/components/blocks/hero"
import { HowItWorks } from "@/components/blocks/how-it-works"
import { Features } from "@/components/blocks/features"
import { Technology } from "@/components/blocks/technology"
import { Privacy } from "@/components/blocks/privacy"
import { Pricing } from "@/components/blocks/pricing"
import { CTA } from "@/components/blocks/cta"
import { Footer } from "@/components/blocks/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-veil-ink text-white selection:bg-signal-green selection:text-veil-ink">
      <NavBar />
      <main className="relative z-10 bg-veil-ink">
        <Hero />
        <HowItWorks />
        <Features />
        <Technology />
        <Privacy />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}