import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"
import { ThreatFeed } from "@/components/threat-feed"
import { UpcomingApproaches } from "@/components/upcoming-approaches"
import { ThreatStatistics } from "@/components/threat-statistics"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { MLPredictions } from "@/components/ml-predictions"
import { Footer } from "@/components/footer"

export default function NewsletterPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Starfield />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-destructive via-chart-5 to-primary bg-clip-text text-transparent">
              Threat Updates
            </span>
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto text-pretty font-medium">
            Real-time tracking of near-Earth objects and ML-powered impact threat assessments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <ThreatStatistics />
        </div>

        <div className="mb-8">
          <MLPredictions />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <UpcomingApproaches />
          <NewsletterSignup />
        </div>

        <ThreatFeed />
      </div>

      <Footer />
    </main>
  )
}
