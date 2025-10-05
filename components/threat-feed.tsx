import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, AlertCircle } from "lucide-react"

const updates = [
  {
    id: 1,
    timestamp: "2 hours ago",
    title: "New Potentially Hazardous Asteroid Discovered",
    description:
      "Asteroid 2025 KL7 has been classified as potentially hazardous. Estimated diameter of 280 meters with a close approach predicted for 2047.",
    category: "Discovery",
    severity: "medium",
  },
  {
    id: 2,
    timestamp: "5 hours ago",
    title: "Trajectory Update: Apophis Refined Calculations",
    description:
      "New radar observations have refined the trajectory of asteroid Apophis. The 2029 close approach distance has been updated to 31,860 km from Earth's surface.",
    category: "Update",
    severity: "low",
  },
  {
    id: 3,
    timestamp: "1 day ago",
    title: "Impact Risk Assessment Revised for 2023 DW",
    description:
      "The impact probability for asteroid 2023 DW has been reduced from 1 in 560 to 1 in 1,200 following additional observations and orbital refinement.",
    category: "Assessment",
    severity: "low",
  },
  {
    id: 4,
    timestamp: "2 days ago",
    title: "Bennu Sample Analysis Reveals Impact Insights",
    description:
      "Analysis of samples from asteroid Bennu provides new data on carbonaceous asteroid composition, improving impact effect models for similar objects.",
    category: "Research",
    severity: "info",
  },
  {
    id: 5,
    timestamp: "3 days ago",
    title: "Close Approach Alert: 2024 XR14",
    description:
      "Asteroid 2024 XR14 will make a close approach on October 15, 2025, passing within 0.032 AU of Earth. No impact risk detected.",
    category: "Alert",
    severity: "medium",
  },
  {
    id: 6,
    timestamp: "5 days ago",
    title: "Planetary Defense Exercise Completed",
    description:
      "International space agencies completed a tabletop exercise simulating response to a hypothetical asteroid impact scenario. Results will inform future protocols.",
    category: "Defense",
    severity: "info",
  },
]

export function ThreatFeed() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Latest Updates & Projections</h2>
        <Badge variant="outline" className="text-xs">
          <TrendingUp className="h-3 w-3 mr-1" />
          Live Feed
        </Badge>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="p-5 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    update.severity === "medium" ? "default" : update.severity === "low" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {update.category}
                </Badge>
                {update.severity === "medium" && <AlertCircle className="h-4 w-4 text-chart-5" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {update.timestamp}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">{update.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{update.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Updates are aggregated from NASA JPL, ESA SSA, and international observatories. Future versions will include
          live API integration.
        </p>
      </div>
    </Card>
  )
}
