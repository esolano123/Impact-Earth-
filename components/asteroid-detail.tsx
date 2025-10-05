"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import { getRiskBgColor } from "@/lib/asteroid-utils"
import { AlertTriangle, Calendar, Ruler, Gauge, Target, ExternalLink, ArrowLeft, Orbit, Zap, Info } from "lucide-react"
import Link from "next/link"
import { AsteroidOrbitInfo } from "@/components/asteroid-orbit-info"
import { AsteroidApproachHistory } from "@/components/asteroid-approach-history"
import { AsteroidImpactSimulator } from "@/components/asteroid-impact-simulator"

interface AsteroidDetailProps {
  asteroid: ProcessedAsteroid
  asteroidId: string
}

export function AsteroidDetail({ asteroid, asteroidId }: AsteroidDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/tracker">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tracker
        </Button>
      </Link>

      {/* Header */}
      <Card className="p-8 border-2">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-4xl font-bold text-foreground">{asteroid.name}</h1>
                {asteroid.isPotentiallyHazardous && (
                  <Badge variant="destructive" className="gap-1 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    Potentially Hazardous
                  </Badge>
                )}
                {asteroid.isSentryObject && (
                  <Badge variant="destructive" className="gap-1 text-sm">
                    SENTRY OBJECT
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Asteroid ID: <span className="font-mono">{asteroidId}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Risk Level:</span>
              <Badge className={`${getRiskBgColor(asteroid.risk)} border text-base px-4 py-1`}>{asteroid.risk}</Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              This near-Earth asteroid is being tracked by NASA's Center for Near-Earth Object Studies (CNEOS). The data
              below represents the most recent orbital calculations and close approach predictions.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a href={asteroid.url} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="w-full gap-2">
                View on NASA JPL
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Close Approach Date</p>
              <p className="text-2xl font-bold text-foreground">{asteroid.dateFormatted}</p>
              <p className="text-xs text-muted-foreground">{asteroid.date}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Miss Distance</p>
              <p className="text-2xl font-bold text-accent">{asteroid.distance}</p>
              <p className="text-xs text-muted-foreground">{asteroid.distanceLunar.toFixed(2)} Lunar Distance</p>
            </div>
            <Target className="h-8 w-8 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Estimated Diameter</p>
              <p className="text-2xl font-bold text-chart-3">{asteroid.size}</p>
              <p className="text-xs text-muted-foreground">{(asteroid.sizeKm * 1000).toFixed(0)} meters</p>
            </div>
            <Ruler className="h-8 w-8 text-chart-3 opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Relative Velocity</p>
              <p className="text-2xl font-bold text-chart-4">{asteroid.velocity}</p>
              <p className="text-xs text-muted-foreground">{(asteroid.velocityKmS * 3600).toFixed(0)} km/h</p>
            </div>
            <Gauge className="h-8 w-8 text-chart-4 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <Info className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="orbit" className="gap-2">
            <Orbit className="h-4 w-4" />
            Orbital Data
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Calendar className="h-4 w-4" />
            Approaches
          </TabsTrigger>
          <TabsTrigger value="simulator" className="gap-2">
            <Zap className="h-4 w-4" />
            Simulate Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Asteroid Overview</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Classification</h3>
                  <p className="text-lg">
                    {asteroid.isPotentiallyHazardous
                      ? "Potentially Hazardous Asteroid (PHA)"
                      : "Near-Earth Asteroid (NEA)"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Absolute Magnitude (H)</h3>
                  <p className="text-lg">{asteroid.magnitude.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Brightness measure at standard distance from Sun and Earth
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Orbiting Body</h3>
                  <p className="text-lg">{asteroid.orbitingBody}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Hazard Assessment</h3>
                  <div className="space-y-2">
                    {asteroid.isPotentiallyHazardous ? (
                      <div className="flex items-start gap-2 text-orange-500">
                        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Potentially Hazardous</p>
                          <p className="text-sm text-muted-foreground">
                            Meets NASA criteria for size and close approach distance
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-green-500">
                        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Not Hazardous</p>
                          <p className="text-sm text-muted-foreground">
                            Does not meet PHA criteria for immediate concern
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Size Comparison</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {asteroid.sizeKm < 0.025
                      ? "Smaller than a house"
                      : asteroid.sizeKm < 0.1
                        ? "About the size of a large building"
                        : asteroid.sizeKm < 0.5
                          ? "Comparable to a city block"
                          : asteroid.sizeKm < 1
                            ? "Similar to a small mountain"
                            : "Larger than a mountain"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orbit">
          <AsteroidOrbitInfo asteroid={asteroid} />
        </TabsContent>

        <TabsContent value="history">
          <AsteroidApproachHistory asteroidId={asteroidId} />
        </TabsContent>

        <TabsContent value="simulator">
          <AsteroidImpactSimulator asteroid={asteroid} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
