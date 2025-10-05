"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, TrendingDown, Clock, ExternalLink, RefreshCw, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProcessedAsteroid } from "@/lib/nasa-utils"

interface ThreatUpdatesProps {
  onSelectAsteroid?: (asteroid: ProcessedAsteroid) => void
}

export function ThreatUpdates({ onSelectAsteroid }: ThreatUpdatesProps) {
  const [asteroids, setAsteroids] = useState<ProcessedAsteroid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAsteroids = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/nasa/neo-feed")

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("NASA API rate limit exceeded. Please wait a few minutes and try again.")
        }
        throw new Error("Failed to fetch asteroid data")
      }

      const data = await response.json()

      if (!data.near_earth_objects) {
        throw new Error("Invalid data received from NASA API")
      }

      // Process the NASA data
      const allAsteroids: any[] = []
      Object.values(data.near_earth_objects).forEach((dateAsteroids: any) => {
        allAsteroids.push(...dateAsteroids)
      })

      // Sort by closest approach and take top 6
      const sortedAsteroids = allAsteroids
        .sort((a, b) => {
          const distA = Number.parseFloat(a.close_approach_data[0].miss_distance.kilometers)
          const distB = Number.parseFloat(b.close_approach_data[0].miss_distance.kilometers)
          return distA - distB
        })
        .slice(0, 6)

      // Process asteroids using utility function
      const { processNASAAsteroidData } = await import("@/lib/nasa-utils")
      const processed = processNASAAsteroidData(sortedAsteroids)

      setAsteroids(processed)
    } catch (err: any) {
      console.error("Error fetching asteroids:", err)
      setError(err.message || "Unable to load real-time asteroid data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAsteroids()
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "MINIMAL":
        return "bg-chart-3/20 text-chart-3 border-chart-3"
      case "LOW":
        return "bg-chart-4/20 text-chart-4 border-chart-4"
      case "MODERATE":
        return "bg-chart-5/20 text-chart-5 border-chart-5"
      case "HIGH":
        return "bg-destructive/20 text-destructive border-destructive"
      default:
        return "bg-muted/20 text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Near-Earth Object Tracking</h2>
          <Button variant="outline" size="icon" onClick={fetchAsteroids} disabled={loading} className="bg-transparent">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
          Real-time monitoring of asteroids approaching Earth's orbit. Live data from NASA's Near-Earth Object Web
          Service (NeoWs).
        </p>
      </div>

      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive/50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive text-center font-medium">{error}</p>
          </div>
        </Card>
      )}

      {loading && asteroids.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg text-muted-foreground font-medium">Loading real-time asteroid data...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((asteroid) => (
            <Card
              key={asteroid.id}
              className="p-6 bg-card/80 backdrop-blur border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">{asteroid.name}</h3>
                </div>
                <Badge className={`${getRiskColor(asteroid.risk)} border`}>{asteroid.risk}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">Close Approach: {asteroid.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">Miss Distance: {asteroid.distance}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground font-medium">Estimated Diameter</p>
                  <p className="text-2xl font-bold text-foreground font-mono">{asteroid.size}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground font-medium">Velocity: {asteroid.velocity}</p>
                </div>
                {asteroid.isPotentiallyHazardous && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/50">
                    Potentially Hazardous
                  </Badge>
                )}

                {onSelectAsteroid && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-transparent"
                    onClick={() => onSelectAsteroid(asteroid)}
                  >
                    Simulate This Impact
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 bg-card/80 backdrop-blur border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Want More Detailed Tracking Data?</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Visit NASA's official Near-Earth Object database for comprehensive tracking information
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 whitespace-nowrap bg-transparent"
            onClick={() => window.open("https://cneos.jpl.nasa.gov/", "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            NASA CNEOS
          </Button>
        </div>
      </Card>
    </div>
  )
}
