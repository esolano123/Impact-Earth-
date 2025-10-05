"use client"

import { Card } from "@/components/ui/card"
import { Shield, AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TooltipInfo } from "@/components/tooltip-info"

export function ThreatLevelIndicator() {
  // Simulated real-time threat level
  const currentThreatLevel = "LOW"
  const activeThreats = 3
  const monitoredObjects = 28547

  const getThreatColor = () => {
    switch (currentThreatLevel) {
      case "MINIMAL":
        return "text-chart-3 bg-chart-3/20 border-chart-3"
      case "LOW":
        return "text-chart-4 bg-chart-4/20 border-chart-4"
      case "MODERATE":
        return "text-chart-5 bg-chart-5/20 border-chart-5"
      case "HIGH":
        return "text-destructive bg-destructive/20 border-destructive"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getThreatIcon = () => {
    switch (currentThreatLevel) {
      case "MINIMAL":
        return <Shield className="h-8 w-8" />
      case "LOW":
        return <Shield className="h-8 w-8" />
      case "MODERATE":
        return <AlertTriangle className="h-8 w-8" />
      case "HIGH":
        return <AlertCircle className="h-8 w-8" />
      default:
        return <Shield className="h-8 w-8" />
    }
  }

  const getThreatDescription = () => {
    switch (currentThreatLevel) {
      case "MINIMAL":
        return "No known objects pose a credible threat to Earth in the foreseeable future. Continue normal activities."
      case "LOW":
        return "A few objects are being monitored, but none currently pose a significant risk. Routine tracking continues."
      case "MODERATE":
        return "One or more objects warrant closer observation. Potential impact scenarios are being analyzed, but no immediate danger."
      case "HIGH":
        return "An object has been identified with a credible impact probability. Emergency response planning is underway."
      default:
        return "Threat assessment in progress."
    }
  }

  return (
    <Card className={`p-6 bg-card/80 backdrop-blur border-2 ${getThreatColor()}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">
            Global Impact Threat Assessment
            <TooltipInfo content="This indicator shows the current risk level of asteroid impacts based on known Near-Earth Objects (NEOs) tracked by NASA and international space agencies" />
          </h3>
        </div>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
          Real-time monitoring of potential asteroid threats to Earth. This assessment is updated continuously based on
          observations from ground-based telescopes and space-based detection systems worldwide.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${getThreatColor()}`}>{getThreatIcon()}</div>
          <div>
            <p className="text-sm text-muted-foreground font-semibold">Current Threat Level</p>
            <p className="text-3xl font-bold text-foreground">{currentThreatLevel}</p>
          </div>
        </div>
        <Badge className={`${getThreatColor()} text-base px-4 py-2 border`}>LIVE</Badge>
      </div>

      <div className="mb-4 p-4 bg-background/50 rounded-lg border border-border">
        <p className="text-sm text-foreground font-medium leading-relaxed">{getThreatDescription()}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-background/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground font-medium mb-1">
            Active Threats
            <TooltipInfo content="Number of Near-Earth Objects currently being tracked that have a non-zero probability of Earth impact" />
          </p>
          <p className="text-2xl font-bold text-foreground font-mono">{activeThreats}</p>
        </div>
        <div className="p-3 bg-background/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground font-medium mb-1">
            Monitored Objects
            <TooltipInfo content="Total number of Near-Earth Objects (NEOs) being tracked by global observation networks" />
          </p>
          <p className="text-2xl font-bold text-foreground font-mono">{monitoredObjects.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  )
}
