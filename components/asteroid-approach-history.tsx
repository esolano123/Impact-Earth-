"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { NASAAsteroid } from "@/lib/nasa-api"
import { Calendar, Target, Gauge, Loader2 } from "lucide-react"

interface AsteroidApproachHistoryProps {
  asteroidId: string
}

export function AsteroidApproachHistory({ asteroidId }: AsteroidApproachHistoryProps) {
  const [approaches, setApproaches] = useState<NASAAsteroid["close_approach_data"]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadApproaches = async () => {
      try {
        const response = await fetch(`/api/nasa/neo-lookup?id=${asteroidId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch asteroid data")
        }

        const data: NASAAsteroid = await response.json()

        // Sort by date
        const sorted = [...data.close_approach_data].sort(
          (a, b) => new Date(a.close_approach_date).getTime() - new Date(b.close_approach_date).getTime(),
        )
        setApproaches(sorted)
      } catch (error) {
        console.error("[v0] Error loading approach history:", error)
      } finally {
        setLoading(false)
      }
    }

    loadApproaches()
  }, [asteroidId])

  if (loading) {
    return (
      <Card className="p-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading approach history...</p>
      </Card>
    )
  }

  const now = new Date()
  const pastApproaches = approaches.filter((a) => new Date(a.close_approach_date) < now)
  const futureApproaches = approaches.filter((a) => new Date(a.close_approach_date) >= now)

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">Close Approach History</h2>
        <p className="text-muted-foreground mb-6">
          All recorded and predicted close approaches of this asteroid to Earth.
        </p>

        <div className="space-y-8">
          {/* Future Approaches */}
          {futureApproaches.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Approaches ({futureApproaches.length})
              </h3>
              <div className="space-y-3">
                {futureApproaches.map((approach, index) => (
                  <ApproachCard key={index} approach={approach} isFuture={true} />
                ))}
              </div>
            </div>
          )}

          {/* Past Approaches */}
          {pastApproaches.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Past Approaches ({pastApproaches.length})
              </h3>
              <div className="space-y-3">
                {pastApproaches.reverse().map((approach, index) => (
                  <ApproachCard key={index} approach={approach} isFuture={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ApproachCard({
  approach,
  isFuture,
}: {
  approach: NASAAsteroid["close_approach_data"][0]
  isFuture: boolean
}) {
  const date = new Date(approach.close_approach_date)
  const distanceKm = Number.parseFloat(approach.miss_distance.kilometers)
  const distanceLunar = Number.parseFloat(approach.miss_distance.lunar)
  const velocityKmS = Number.parseFloat(approach.relative_velocity.kilometers_per_second)

  return (
    <Card className={`p-4 ${isFuture ? "border-primary/50" : "border-border/50 opacity-75"}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-lg">
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {isFuture && <Badge variant="default">Upcoming</Badge>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Distance</p>
                <p className="font-medium">{distanceLunar.toFixed(2)} LD</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Velocity</p>
                <p className="font-medium">{velocityKmS.toFixed(1)} km/s</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Orbiting</p>
                <p className="font-medium">{approach.orbiting_body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
