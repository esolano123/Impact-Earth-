"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import { Zap, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AsteroidImpactSimulatorProps {
  asteroid: ProcessedAsteroid
}

export function AsteroidImpactSimulator({ asteroid }: AsteroidImpactSimulatorProps) {
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">Impact Simulation</h2>

        <div className="space-y-6">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Asteroid Parameters
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Diameter</p>
                <p className="text-xl font-bold text-foreground">{asteroid.size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Velocity</p>
                <p className="text-xl font-bold text-foreground">{asteroid.velocity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Density</p>
                <p className="text-xl font-bold text-foreground">2,600 kg/m³</p>
                <p className="text-xs text-muted-foreground">Typical rocky composition</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Use our interactive impact simulator to visualize what would happen if this asteroid were to impact Earth.
              The simulator uses real asteroid data to calculate crater size, energy release, and affected areas.
            </p>

            <Link href={`/?asteroid=${asteroid.id}`}>
              <Button size="lg" className="w-full md:w-auto gap-2">
                <Zap className="h-5 w-5" />
                Launch Impact Simulator
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
            <h3 className="font-bold mb-2 text-destructive">Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is a hypothetical simulation for educational purposes only. The asteroid's current trajectory does
              not pose a threat to Earth. NASA continuously monitors all near-Earth objects and would provide advance
              warning of any potential impacts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
