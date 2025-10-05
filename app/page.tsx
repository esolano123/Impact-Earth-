"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ImpactSimulator } from "@/components/impact-simulator"
import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"
import { ThreatLevelIndicator } from "@/components/threat-level-indicator"
import { ThreatUpdates } from "@/components/threat-updates"
import { ImpactEffectsGuide } from "@/components/impact-effects-guide"
import { Footer } from "@/components/footer"
import type { ProcessedAsteroid } from "@/lib/nasa-utils"
import { processAsteroid } from "@/lib/asteroid-utils"

export default function HomePage() {
  const [selectedAsteroid, setSelectedAsteroid] = useState<ProcessedAsteroid | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const asteroidId = searchParams.get("asteroid")
    if (asteroidId) {
      fetch(`/api/nasa/neo-lookup?id=${asteroidId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch asteroid data")
          }
          return response.json()
        })
        .then((data) => {
          const processed = processAsteroid(data)
          setSelectedAsteroid(processed as unknown as ProcessedAsteroid)
          // Scroll to simulator
          setTimeout(() => {
            const simulatorSection = document.getElementById("simulator-section")
            if (simulatorSection) {
              simulatorSection.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }, 100)
        })
        .catch((error) => {
          console.error("[v0] Error loading asteroid from URL:", error)
        })
    }
  }, [searchParams])

  const handleSelectAsteroid = (asteroid: ProcessedAsteroid) => {
    setSelectedAsteroid(asteroid)
    // Scroll to simulator section
    const simulatorSection = document.getElementById("simulator-section")
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Starfield />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent">
              IMPACT EARTH!
            </span>
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto text-pretty font-medium">
            Explore the devastating power of meteor impacts with our interactive simulator
          </p>
        </div>

        <div className="mb-8">
          <ThreatLevelIndicator />
        </div>

        <div id="simulator-section" className="mb-12 scroll-mt-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">Impact Simulator</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
              Customize asteroid parameters and visualize the potential effects of an impact anywhere on Earth
            </p>
          </div>
          <ImpactSimulator selectedAsteroid={selectedAsteroid} />
        </div>

        <div className="mb-12 pt-12 border-t border-border">
          <ThreatUpdates onSelectAsteroid={handleSelectAsteroid} />
        </div>

        <div className="mb-12 pt-12 border-t border-border">
          <ImpactEffectsGuide />
        </div>
      </div>

      <Footer />
    </main>
  )
}
