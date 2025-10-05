"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EarthMap2D } from "@/components/earth-map-2d"
import { ImpactResults } from "@/components/impact-results"
import { ExplosionAnimation } from "@/components/explosion-animation"
import { Calculator, MapPin, Satellite } from "lucide-react"
import type { ProcessedAsteroid } from "@/lib/nasa-utils"

type TargetType = "water" | "sedimentary" | "crystalline"

interface SimulationParams {
  diameter: number
  density: number
  impactAngle: number
  impactVelocity: number
  targetType: TargetType
  distanceFromImpact: number
  latitude: number
  longitude: number
}

interface ImpactSimulatorProps {
  selectedAsteroid?: ProcessedAsteroid | null
}

export function ImpactSimulator({ selectedAsteroid }: ImpactSimulatorProps) {
  const [params, setParams] = useState<SimulationParams>({
    diameter: 30,
    density: 8000,
    impactAngle: 40,
    impactVelocity: 42,
    targetType: "sedimentary",
    distanceFromImpact: 2050,
    latitude: 35.0,
    longitude: -95.0,
  })

  const [showResults, setShowResults] = useState(false)
  const [showExplosion, setShowExplosion] = useState(false)
  const [currentAsteroid, setCurrentAsteroid] = useState<ProcessedAsteroid | null>(null)

  useEffect(() => {
    if (selectedAsteroid) {
      const diameter = Number.parseFloat(selectedAsteroid.size)
      const velocity = Number.parseFloat(selectedAsteroid.velocity)

      setParams({
        ...params,
        diameter: Number.parseFloat(diameter.toFixed(3)),
        impactVelocity: Number.parseFloat(velocity.toFixed(3)),
        density: 2600, // Typical rocky asteroid density
      })

      setCurrentAsteroid(selectedAsteroid)
      setShowResults(false)
    }
  }, [selectedAsteroid])

  const handleCalculate = () => {
    setShowExplosion(true)
    setTimeout(() => {
      setShowResults(true)
    }, 500)
  }

  const handleExplosionComplete = () => {
    setShowExplosion(false)
  }

  const handleLocationClick = (lat: number, lon: number) => {
    setParams({ ...params, latitude: lat, longitude: lon })
  }

  return (
    <>
      <ExplosionAnimation show={showExplosion} onComplete={handleExplosionComplete} />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left side - Earth Visualization */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Interactive Earth Map
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Click anywhere on the map to set impact location
              </p>
            </div>
            <EarthMap2D
              params={params}
              impactLocation={{ lat: params.latitude, lon: params.longitude }}
              onLocationClick={handleLocationClick}
            />
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Current Parameters</h3>

            {currentAsteroid && (
              <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Satellite className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">Simulating Real Asteroid:</span>
                </div>
                <p className="text-lg font-bold text-primary">{currentAsteroid.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Close approach: {currentAsteroid.date}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-base">
              <div>
                <p className="text-muted-foreground font-medium">Projectile Diameter:</p>
                <p className="text-foreground font-mono text-lg">{params.diameter.toFixed(3)} km</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Projectile Density:</p>
                <p className="text-foreground font-mono text-lg">{params.density.toFixed(3)} kg/m³</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Angle of Impact:</p>
                <p className="text-foreground font-mono text-lg">{params.impactAngle.toFixed(3)}°</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Velocity:</p>
                <p className="text-foreground font-mono text-lg">{params.impactVelocity.toFixed(3)} km/s</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Target Type:</p>
                <p className="text-foreground font-mono text-lg capitalize">{params.targetType} Rock</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Impact Location:</p>
                <p className="text-foreground font-mono text-lg">
                  {params.latitude.toFixed(3)}°, {params.longitude.toFixed(3)}°
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side - Controls */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Impact Location</h3>
              <MapPin className="h-5 w-5 text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude" className="text-foreground font-medium text-base">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  value={params.latitude}
                  onChange={(e) => setParams({ ...params, latitude: Number(e.target.value) })}
                  min={-90}
                  max={90}
                  step={0.001}
                  className="bg-secondary border-border text-foreground text-base mt-2"
                />
              </div>
              <div>
                <Label htmlFor="longitude" className="text-foreground font-medium text-base">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  type="number"
                  value={params.longitude}
                  onChange={(e) => setParams({ ...params, longitude: Number(e.target.value) })}
                  min={-180}
                  max={180}
                  step={0.001}
                  className="bg-secondary border-border text-foreground text-base mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Projectile Parameters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="diameter" className="text-foreground font-medium text-base">
                  Diameter (km)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="diameter"
                    type="number"
                    value={params.diameter}
                    onChange={(e) => setParams({ ...params, diameter: Number(e.target.value) })}
                    step={0.001}
                    className="bg-secondary border-border text-foreground text-base"
                  />
                  <span className="flex items-center text-muted-foreground text-base font-medium">km</span>
                </div>
              </div>

              <div>
                <Label htmlFor="density" className="text-foreground font-medium text-base">
                  Density (kg/m³)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="density"
                    type="number"
                    value={params.density}
                    onChange={(e) => setParams({ ...params, density: Number(e.target.value) })}
                    step={0.001}
                    className="bg-secondary border-border text-foreground text-base"
                  />
                  <span className="flex items-center text-muted-foreground text-base font-medium">kg/m³</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Impact Parameters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-foreground font-medium text-base">Impact Angle (degrees)</Label>
                  <span className="text-foreground font-mono text-base font-semibold">
                    {params.impactAngle.toFixed(3)}°
                  </span>
                </div>
                <Slider
                  value={[params.impactAngle]}
                  onValueChange={([value]) => setParams({ ...params, impactAngle: value })}
                  min={0}
                  max={90}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1 font-medium">
                  <span>0°</span>
                  <span>90°</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-foreground font-medium text-base">Impact Velocity (km/s)</Label>
                  <span className="text-foreground font-mono text-base font-semibold">
                    {params.impactVelocity.toFixed(3)} km/s
                  </span>
                </div>
                <Slider
                  value={[params.impactVelocity]}
                  onValueChange={([value]) => setParams({ ...params, impactVelocity: value })}
                  min={11}
                  max={72}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1 font-medium">
                  <span>11 km/s</span>
                  <span>72 km/s</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Target Parameters</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground mb-3 block font-medium text-base">Target Type:</Label>
                <RadioGroup
                  value={params.targetType}
                  onValueChange={(value) => setParams({ ...params, targetType: value as TargetType })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="water" id="water" />
                    <Label htmlFor="water" className="text-foreground cursor-pointer text-base font-medium">
                      Water of Depth
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="sedimentary" id="sedimentary" />
                    <Label htmlFor="sedimentary" className="text-foreground cursor-pointer text-base font-medium">
                      Sedimentary Rock
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="crystalline" id="crystalline" />
                    <Label htmlFor="crystalline" className="text-foreground cursor-pointer text-base font-medium">
                      Crystalline Rock
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <Label htmlFor="distance" className="text-foreground font-medium text-base">
              Your Distance from Impact
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="distance"
                type="number"
                value={params.distanceFromImpact}
                onChange={(e) => setParams({ ...params, distanceFromImpact: Number(e.target.value) })}
                className="bg-secondary border-border text-foreground text-base"
              />
              <span className="flex items-center text-muted-foreground text-base font-medium">km</span>
            </div>
          </Card>

          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-lg py-7 shadow-lg shadow-primary/20"
          >
            <Calculator className="mr-2 h-6 w-6" />
            CALCULATE IMPACT
          </Button>

          {/* Results */}
          {showResults && <ImpactResults params={params} />}
        </div>
      </div>
    </>
  )
}
