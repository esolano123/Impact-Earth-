export interface NASAAsteroid {
  id: string
  name: string
  nasa_jpl_url: string
  absolute_magnitude_h: number
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    close_approach_date: string
    relative_velocity: {
      kilometers_per_second: string
    }
    miss_distance: {
      kilometers: string
    }
  }>
}

export interface ProcessedAsteroid {
  id: string
  name: string
  date: string
  distance: string
  size: string
  velocity: string
  risk: "MINIMAL" | "LOW" | "MODERATE" | "HIGH"
  isPotentiallyHazardous: boolean
  url: string
}

export function processNASAAsteroidData(asteroids: NASAAsteroid[]): ProcessedAsteroid[] {
  return asteroids.map((asteroid) => {
    const closeApproach = asteroid.close_approach_data[0]
    const avgDiameter =
      (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
        asteroid.estimated_diameter.kilometers.estimated_diameter_max) /
      2

    // Calculate risk level based on distance and size
    const distanceKm = Number.parseFloat(closeApproach.miss_distance.kilometers)
    const moonDistance = 384400 // km to moon

    let risk: "MINIMAL" | "LOW" | "MODERATE" | "HIGH" = "MINIMAL"

    if (asteroid.is_potentially_hazardous_asteroid) {
      if (distanceKm < moonDistance * 2) {
        risk = "MODERATE"
      } else if (distanceKm < moonDistance * 5) {
        risk = "LOW"
      }
    }

    return {
      id: asteroid.id,
      name: asteroid.name.replace(/[()]/g, ""),
      date: closeApproach.close_approach_date,
      distance: formatDistance(distanceKm),
      size: `${avgDiameter.toFixed(2)}km`,
      velocity: `${Number.parseFloat(closeApproach.relative_velocity.kilometers_per_second).toFixed(1)} km/s`,
      risk,
      isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
      url: asteroid.nasa_jpl_url,
    }
  })
}

function formatDistance(km: number): string {
  const moonDistance = 384400
  const ratio = km / moonDistance

  if (ratio < 1) {
    return `${(km / 1000).toFixed(1)}k km`
  } else if (ratio < 10) {
    return `${ratio.toFixed(2)}x Moon distance`
  } else {
    return `${(km / 1000000).toFixed(2)}M km`
  }
}

export function getAsteroidParametersForSimulation(asteroid: ProcessedAsteroid) {
  // Extract diameter from size string
  const diameter = Number.parseFloat(asteroid.size)

  // Extract velocity from velocity string
  const velocity = Number.parseFloat(asteroid.velocity)

  // Estimate density based on asteroid type (assuming rocky composition)
  const density = 2600 // kg/m³ for typical rocky asteroid

  return {
    diameter,
    velocity,
    density,
    name: asteroid.name,
  }
}

export function calculateMLImpactPredictions(params: {
  diameter: number
  velocity: number
  density: number
  angle: number
  targetType: string
}) {
  // Calculate kinetic energy (in joules)
  const { diameter, velocity, density, angle, targetType } = params

  const mass = (4 / 3) * Math.PI * Math.pow(diameter / 2, 3) * density * 1e9 // kg
  const velocityMs = velocity * 1000 // convert km/s to m/s
  const kineticEnergy = 0.5 * mass * Math.pow(velocityMs, 2)

  // Convert to megatons of TNT (1 megaton = 4.184e15 joules)
  const energyMegatons = (kineticEnergy / 4.184e15).toFixed(3)

  // Crater diameter calculation (simplified Holsapple scaling)
  const impactAngleEffect = Math.sin((angle * Math.PI) / 180)
  const targetDensity = targetType === "water" ? 1000 : 2500 // kg/m³
  const craterScaling =
    1.161 * Math.pow(mass / targetDensity, 0.283) * Math.pow(velocityMs, 0.44) * Math.pow(impactAngleEffect, 0.33)
  const craterDiameter = (craterScaling / 1000).toFixed(3) // convert to km

  // Seismic magnitude (based on energy)
  const seismicMagnitude = (0.67 * Math.log10(kineticEnergy) - 5.87).toFixed(1)

  // Thermal radiation radius (simplified)
  const thermalRadius = (Math.pow(Number.parseFloat(energyMegatons), 0.41) * 2.5).toFixed(3)

  // Blast radius (overpressure > 20 psi)
  const blastRadius = (Math.pow(Number.parseFloat(energyMegatons), 0.33) * 3.2).toFixed(3)

  // Safe distance (minimal effects)
  const safeDistance = (Math.pow(Number.parseFloat(energyMegatons), 0.33) * 15).toFixed(3)

  return {
    energyMegatons,
    craterDiameter,
    seismicMagnitude,
    thermalRadius,
    blastRadius,
    safeDistance,
  }
}
