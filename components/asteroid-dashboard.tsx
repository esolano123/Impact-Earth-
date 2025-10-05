"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AsteroidList } from "@/components/asteroid-list"
import { AsteroidStats } from "@/components/asteroid-stats"
import { AsteroidChart } from "@/components/asteroid-chart"
import { processAsteroids, type ProcessedAsteroid } from "@/lib/asteroid-utils"
import { Search, RefreshCw, AlertTriangle, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AsteroidDashboard() {
  const [asteroids, setAsteroids] = useState<ProcessedAsteroid[]>([])
  const [filteredAsteroids, setFilteredAsteroids] = useState<ProcessedAsteroid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [daysAhead, setDaysAhead] = useState(7)

  const loadAsteroids = async () => {
    setLoading(true)
    setError(null)

    try {
      const today = new Date()
      const endDate = new Date(today)
      endDate.setDate(today.getDate() + daysAhead)

      const startDate = today.toISOString().split("T")[0]
      const endDateStr = endDate.toISOString().split("T")[0]

      const response = await fetch(`/api/nasa/neo-feed?start_date=${startDate}&end_date=${endDateStr}`)

      if (response.status === 429) {
        throw new Error("NASA API rate limit exceeded. Please try again in a few minutes.")
      }

      if (!response.ok) {
        throw new Error("Failed to fetch asteroid data")
      }

      const data = await response.json()

      // Flatten all asteroids from all dates
      const allAsteroids: any[] = []
      for (const date in data.near_earth_objects) {
        allAsteroids.push(...data.near_earth_objects[date])
      }

      const processed = processAsteroids(allAsteroids)
      setAsteroids(processed)
      setFilteredAsteroids(processed)
    } catch (err: any) {
      setError(err.message || "Failed to load asteroid data. Please try again.")
      console.error("[v0] Dashboard error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAsteroids()
  }, [daysAhead])

  useEffect(() => {
    let filtered = asteroids

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (asteroid) =>
          asteroid.name.toLowerCase().includes(searchQuery.toLowerCase()) || asteroid.id.includes(searchQuery),
      )
    }

    // Apply risk filter
    if (riskFilter !== "all") {
      if (riskFilter === "hazardous") {
        filtered = filtered.filter((a) => a.isPotentiallyHazardous)
      } else {
        filtered = filtered.filter((a) => a.risk === riskFilter.toUpperCase())
      }
    }

    setFilteredAsteroids(filtered)
  }, [searchQuery, riskFilter, asteroids])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">Loading asteroid data from NASA...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={loadAsteroids}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-balance">
          <span className="bg-gradient-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent">
            Asteroid Tracker
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Real-time tracking of near-Earth asteroids using NASA NeoWs data
        </p>
      </div>

      {/* Stats Overview */}
      <AsteroidStats asteroids={asteroids} />

      {/* Controls */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={riskFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskFilter("all")}
            >
              All
            </Button>
            <Button
              variant={riskFilter === "hazardous" ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskFilter("hazardous")}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Hazardous
            </Button>
            <Button
              variant={riskFilter === "extreme" ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskFilter("extreme")}
            >
              Extreme
            </Button>
            <Button
              variant={riskFilter === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskFilter("high")}
            >
              High
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={daysAhead}
              onChange={(e) => setDaysAhead(Number(e.target.value))}
              className="bg-background border border-input rounded-md px-3 py-2 text-sm"
            >
              <option value={7}>Next 7 days</option>
              <option value={14}>Next 14 days</option>
              <option value={30}>Next 30 days</option>
            </select>
          </div>

          <Button variant="outline" size="sm" onClick={loadAsteroids}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAsteroids.length} of {asteroids.length} asteroids
            </p>
          </div>
          <AsteroidList asteroids={filteredAsteroids} />
        </TabsContent>

        <TabsContent value="chart">
          <AsteroidChart asteroids={filteredAsteroids} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
