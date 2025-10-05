import { Card } from "@/components/ui/card"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import { Info } from "lucide-react"

interface AsteroidOrbitInfoProps {
  asteroid: ProcessedAsteroid
}

export function AsteroidOrbitInfo({ asteroid }: AsteroidOrbitInfoProps) {
  const moonDistance = 384400 // km
  const earthRadius = 6371 // km

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6">Orbital Information</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Close Approach Distance</h3>
              <div className="space-y-1">
                <p className="text-lg font-medium">{asteroid.distanceKm.toLocaleString()} km</p>
                <p className="text-sm text-muted-foreground">{asteroid.distanceLunar.toFixed(4)} Lunar Distance</p>
                <p className="text-sm text-muted-foreground">
                  {(asteroid.distanceKm / earthRadius).toFixed(2)} Earth Radii
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Relative Velocity</h3>
              <div className="space-y-1">
                <p className="text-lg font-medium">{asteroid.velocityKmS.toFixed(2)} km/s</p>
                <p className="text-sm text-muted-foreground">{(asteroid.velocityKmS * 3600).toFixed(0)} km/h</p>
                <p className="text-sm text-muted-foreground">{(asteroid.velocityKmS * 2236.94).toFixed(0)} mph</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Estimated Diameter</h3>
              <div className="space-y-1">
                <p className="text-lg font-medium">{asteroid.sizeKm.toFixed(3)} km</p>
                <p className="text-sm text-muted-foreground">{(asteroid.sizeKm * 1000).toFixed(1)} meters</p>
                <p className="text-sm text-muted-foreground">{(asteroid.sizeKm * 3280.84).toFixed(0)} feet</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Absolute Magnitude</h3>
              <p className="text-lg font-medium">{asteroid.magnitude.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Intrinsic brightness measure</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/30">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-medium">Understanding the Data</h3>
            <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>
                <strong>Lunar Distance (LD):</strong> The average distance from Earth to the Moon (384,400 km). This is
                a common unit for measuring close approaches.
              </p>
              <p>
                <strong>Absolute Magnitude (H):</strong> A measure of the asteroid's intrinsic brightness. Lower values
                indicate larger or more reflective objects.
              </p>
              <p>
                <strong>Relative Velocity:</strong> The speed at which the asteroid passes Earth, relative to our
                planet's motion.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
