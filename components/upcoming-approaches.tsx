import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Ruler, Gauge } from "lucide-react"

const approaches = [
  {
    name: "2024 XR14",
    date: "2025-10-15",
    distance: "0.032 AU",
    diameter: "340m",
    velocity: "18.2 km/s",
    threat: "low",
  },
  {
    name: "Apophis",
    date: "2029-04-13",
    distance: "0.0003 AU",
    diameter: "370m",
    velocity: "7.4 km/s",
    threat: "medium",
  },
  {
    name: "2023 DW",
    date: "2046-02-14",
    distance: "0.015 AU",
    diameter: "50m",
    velocity: "25.1 km/s",
    threat: "low",
  },
  {
    name: "Bennu",
    date: "2182-09-24",
    distance: "0.002 AU",
    diameter: "490m",
    velocity: "12.8 km/s",
    threat: "high",
  },
]

export function UpcomingApproaches() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Upcoming Close Approaches</h2>

      <div className="space-y-4">
        {approaches.map((approach) => (
          <div
            key={approach.name}
            className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{approach.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{approach.date}</p>
                </div>
              </div>
              <Badge
                variant={
                  approach.threat === "high" ? "destructive" : approach.threat === "medium" ? "default" : "secondary"
                }
              >
                {approach.threat.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-chart-2" />
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-mono text-foreground">{approach.distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-chart-3" />
                <div>
                  <p className="text-xs text-muted-foreground">Velocity</p>
                  <p className="font-mono text-foreground">{approach.velocity}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Diameter</p>
                <p className="font-mono text-foreground">{approach.diameter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
