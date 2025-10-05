import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import { AlertTriangle, Ruler, Gauge, Target } from "lucide-react"

interface AsteroidStatsProps {
  asteroids: ProcessedAsteroid[]
}

export function AsteroidStats({ asteroids }: AsteroidStatsProps) {
  const hazardousCount = asteroids.filter((a) => a.isPotentiallyHazardous).length
  const highRiskCount = asteroids.filter((a) => a.risk === "HIGH" || a.risk === "EXTREME").length
  const closestAsteroid = asteroids.reduce(
    (closest, current) => (current.distanceKm < closest.distanceKm ? current : closest),
    asteroids[0],
  )
  const largestAsteroid = asteroids.reduce(
    (largest, current) => (current.sizeKm > largest.sizeKm ? current : largest),
    asteroids[0],
  )

  const stats = [
    {
      label: "Total Tracked",
      value: asteroids.length,
      icon: Target,
      color: "text-primary",
    },
    {
      label: "Potentially Hazardous",
      value: hazardousCount,
      icon: AlertTriangle,
      color: "text-orange-500",
      badge: `${((hazardousCount / asteroids.length) * 100).toFixed(0)}%`,
    },
    {
      label: "High Risk",
      value: highRiskCount,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      label: "Closest Approach",
      value: closestAsteroid?.distance || "N/A",
      subtitle: closestAsteroid?.name,
      icon: Target,
      color: "text-accent",
    },
    {
      label: "Largest Object",
      value: largestAsteroid?.size || "N/A",
      subtitle: largestAsteroid?.name,
      icon: Ruler,
      color: "text-chart-3",
    },
    {
      label: "Fastest Object",
      value:
        asteroids.reduce(
          (fastest, current) => (current.velocityKmS > fastest.velocityKmS ? current : fastest),
          asteroids[0],
        )?.velocity || "N/A",
      icon: Gauge,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  {stat.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {stat.badge}
                    </Badge>
                  )}
                </div>
                {stat.subtitle && <p className="text-xs text-muted-foreground truncate">{stat.subtitle}</p>}
              </div>
              <Icon className={`h-8 w-8 ${stat.color} opacity-50`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
