import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import { getRiskBgColor } from "@/lib/asteroid-utils"
import { ExternalLink, AlertTriangle, Calendar, Ruler, Gauge, Target } from "lucide-react"
import Link from "next/link"

interface AsteroidListProps {
  asteroids: ProcessedAsteroid[]
}

export function AsteroidList({ asteroids }: AsteroidListProps) {
  if (asteroids.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No asteroids found matching your criteria.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {asteroids.map((asteroid) => (
        <Card
          key={asteroid.id}
          className={`p-6 hover:border-primary/50 transition-all ${
            asteroid.isPotentiallyHazardous ? "border-l-4 border-l-orange-500" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-xl font-bold text-foreground">{asteroid.name}</h3>
                    {asteroid.isPotentiallyHazardous && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        PHA
                      </Badge>
                    )}
                    {asteroid.isSentryObject && (
                      <Badge variant="destructive" className="gap-1">
                        SENTRY
                      </Badge>
                    )}
                    <Badge className={`${getRiskBgColor(asteroid.risk)} border`}>{asteroid.risk}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">ID: {asteroid.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Close Approach</p>
                    <p className="text-sm font-medium">{asteroid.dateFormatted}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Miss Distance</p>
                    <p className="text-sm font-medium">{asteroid.distance}</p>
                    <p className="text-xs text-muted-foreground">{asteroid.distanceLunar.toFixed(2)} LD</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Diameter</p>
                    <p className="text-sm font-medium">{asteroid.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Velocity</p>
                    <p className="text-sm font-medium">{asteroid.velocity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={`/tracker/${asteroid.id}`}>
                <Button variant="default" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
              <a href={asteroid.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                  NASA JPL
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
