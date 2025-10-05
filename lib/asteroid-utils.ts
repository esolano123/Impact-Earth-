// Utility functions for processing and analyzing asteroid data

import type { NASAAsteroid } from "./nasa-api"

export interface ProcessedAsteroid {
  id: string
  name: string
  date: string
  dateFormatted: string
  distance: string
  distanceKm: number
  distanceLunar: number
  size: string
  sizeKm: number
  velocity: string
  velocityKmS: number
  risk: "MINIMAL" | "LOW" | "MODERATE" | "HIGH" | "EXTREME"
  isPotentiallyHazardous: boolean
  isSentryObject: boolean
  url: string
  magnitude: number
  orbitingBody: string
}

export function processAsteroid(asteroid: NASAAsteroid): ProcessedAsteroid {
  const closeApproach = asteroid.close_approach_data[0]
  const avgDiameterKm =
    (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
      asteroid.estimated_diameter.kilometers.estimated_diameter_max) /
    2

  const distanceKm = Number.parseFloat(closeApproach.miss_distance.kilometers)
  const distanceLunar = Number.parseFloat(closeApproach.miss_distance.lunar)
  const velocityKmS = Number.parseFloat(closeApproach.relative_velocity.kilometers_per_second)

  const risk = calculateRiskLevel(
    distanceKm,
    avgDiameterKm,
    asteroid.is_potentially_hazardous_asteroid,
    asteroid.is_sentry_object,
  )

  return {
    id: asteroid.id,
    name: asteroid.name.replace(/[()]/g, ""),
    date: closeApproach.close_approach_date,
    dateFormatted: formatDate(closeApproach.close_approach_date),
    distance: formatDistance(distanceKm),
    distanceKm,
    distanceLunar,
    size: formatSize(avgDiameterKm),
    sizeKm: avgDiameterKm,
    velocity: `${velocityKmS.toFixed(1)} km/s`,
    velocityKmS,
    risk,
    isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
    isSentryObject: asteroid.is_sentry_object,
    url: asteroid.nasa_jpl_url,
    magnitude: asteroid.absolute_magnitude_h,
    orbitingBody: closeApproach.orbiting_body,
  }
}

export function processAsteroids(asteroids: NASAAsteroid[]): ProcessedAsteroid[] {
  return asteroids.map(processAsteroid).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function calculateRiskLevel(
  distanceKm: number,
  sizeKm: number,
  isPHA: boolean,
  isSentry: boolean,
): "MINIMAL" | "LOW" | "MODERATE" | "HIGH" | "EXTREME" {
  const moonDistance = 384400 // km

  // Sentry objects are highest priority
  if (isSentry) return "EXTREME"

  // Not a PHA = minimal risk
  if (!isPHA) return "MINIMAL"

  // PHA risk assessment based on distance and size
  if (distanceKm < moonDistance) {
    if (sizeKm > 1) return "EXTREME"
    if (sizeKm > 0.5) return "HIGH"
    return "MODERATE"
  } else if (distanceKm < moonDistance * 2) {
    if (sizeKm > 1) return "HIGH"
    if (sizeKm > 0.5) return "MODERATE"
    return "LOW"
  } else if (distanceKm < moonDistance * 5) {
    if (sizeKm > 1) return "MODERATE"
    return "LOW"
  }

  return "LOW"
}

function formatDistance(km: number): string {
  const moonDistance = 384400
  const ratio = km / moonDistance

  if (ratio < 1) {
    return `${(km / 1000).toFixed(0)}k km`
  } else if (ratio < 10) {
    return `${ratio.toFixed(2)} LD` // Lunar Distance
  } else {
    return `${(km / 1000000).toFixed(2)}M km`
  }
}

function formatSize(km: number): string {
  if (km < 0.001) {
    return `${(km * 1000).toFixed(0)}m`
  } else if (km < 1) {
    return `${(km * 1000).toFixed(0)}m`
  } else {
    return `${km.toFixed(2)}km`
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function getRiskColor(risk: ProcessedAsteroid["risk"]): string {
  switch (risk) {
    case "EXTREME":
      return "text-red-500"
    case "HIGH":
      return "text-orange-500"
    case "MODERATE":
      return "text-yellow-500"
    case "LOW":
      return "text-blue-500"
    case "MINIMAL":
      return "text-green-500"
  }
}

export function getRiskBgColor(risk: ProcessedAsteroid["risk"]): string {
  switch (risk) {
    case "EXTREME":
      return "bg-red-500/10 border-red-500/20"
    case "HIGH":
      return "bg-orange-500/10 border-orange-500/20"
    case "MODERATE":
      return "bg-yellow-500/10 border-yellow-500/20"
    case "LOW":
      return "bg-blue-500/10 border-blue-500/20"
    case "MINIMAL":
      return "bg-green-500/10 border-green-500/20"
  }
}
