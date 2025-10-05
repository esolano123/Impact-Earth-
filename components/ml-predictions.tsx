"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Brain, TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SentryPrediction {
  id: string
  asteroid: string
  probability: number
  date: string
  confidence: number
  riskLevel: "minimal" | "low" | "moderate" | "high"
  torinoScale: number
  palermoScale: number
  impactCount: number
}

export function MLPredictions() {
  const [predictions, setPredictions] = useState<SentryPrediction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSentryData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/nasa/sentry?ip-min=1e-8")

      if (!response.ok) {
        throw new Error("Failed to fetch impact risk data")
      }

      const data = await response.json()

      // Process Sentry data into predictions
      const sentryObjects = data.data || []

      // Sort by impact probability and take top 5
      const topRisks = sentryObjects
        .sort((a: any, b: any) => b.ip - a.ip)
        .slice(0, 5)
        .map((obj: any, index: number) => {
          // NASA Sentry API sometimes returns "-" for missing values
          const parseNumeric = (value: any): number => {
            if (value === null || value === undefined || value === "-") return 0
            const num = typeof value === "string" ? Number.parseFloat(value) : Number(value)
            return isNaN(num) ? 0 : num
          }

          const torinoScale = parseNumeric(obj.ts_max)
          const palermoScale = parseNumeric(obj.ps_max)
          const impactProbability = parseNumeric(obj.ip)

          // Determine risk level based on Torino Scale
          let riskLevel: "minimal" | "low" | "moderate" | "high" = "minimal"
          if (torinoScale >= 5) riskLevel = "high"
          else if (torinoScale >= 3) riskLevel = "moderate"
          else if (torinoScale >= 1) riskLevel = "low"

          // Calculate confidence based on number of observations and data quality
          const confidence = Math.min(95, 70 + (obj.n_imp || 0) * 2)

          return {
            id: obj.des,
            asteroid: obj.fullname || obj.des,
            probability: impactProbability,
            date: obj.last_obs || "TBD",
            confidence,
            riskLevel,
            torinoScale,
            palermoScale,
            impactCount: obj.n_imp || 0,
          }
        })

      setPredictions(topRisks)
    } catch (err) {
      console.error("Error fetching Sentry data:", err)
      setError("Unable to load real-time impact risk data from NASA Sentry system.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSentryData()
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "minimal":
        return "text-chart-3 bg-chart-3/20"
      case "low":
        return "text-chart-4 bg-chart-4/20"
      case "moderate":
        return "text-chart-5 bg-chart-5/20"
      case "high":
        return "text-destructive bg-destructive/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Impact Risk Analysis</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Real-time data from NASA's Sentry Impact Monitoring System
            </p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={fetchSentryData} disabled={loading} className="bg-transparent">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        </div>
      )}

      {loading && predictions.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground font-medium">Loading NASA Sentry data...</span>
        </div>
      ) : predictions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-muted-foreground font-medium">
            No asteroids with significant impact probability detected at this time.
          </p>
          <p className="text-sm text-muted-foreground mt-2">This is good news! Earth is safe for now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-foreground">{pred.asteroid}</h4>
                  <p className="text-sm text-muted-foreground font-medium">Last observed: {pred.date}</p>
                </div>
                <Badge className={getRiskColor(pred.riskLevel)}>{pred.riskLevel.toUpperCase()}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Impact Probability</p>
                  <p className="text-xl font-bold text-foreground font-mono">
                    {pred.probability < 0.0001
                      ? pred.probability.toExponential(2)
                      : `${(pred.probability * 100).toFixed(4)}%`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Torino Scale</p>
                  <p className="text-xl font-bold text-chart-1 font-mono">{pred.torinoScale}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                <span className="text-muted-foreground font-medium">
                  Potential Impacts: <span className="text-foreground font-semibold">{pred.impactCount}</span>
                </span>
                <span className="text-muted-foreground font-medium">
                  Palermo Scale:{" "}
                  <span className="text-foreground font-semibold">
                    {typeof pred.palermoScale === "number" ? pred.palermoScale.toFixed(2) : "N/A"}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground mb-1">About NASA Sentry</p>
            <p className="text-sm text-muted-foreground font-medium">
              NASA's Sentry system is a highly automated collision monitoring system that continually scans the most
              current asteroid catalog for possibilities of future impact with Earth over the next 100 years. The Torino
              Scale (0-10) communicates impact hazard to the public, while the Palermo Scale is used by specialists for
              technical assessment.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
