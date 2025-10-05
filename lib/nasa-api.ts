// NASA NeoWs API integration utilities

export interface NASAAsteroidResponse {
  near_earth_objects: {
    [date: string]: NASAAsteroid[]
  }
  element_count: number
}

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
    meters: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    close_approach_date: string
    close_approach_date_full: string
    epoch_date_close_approach: number
    relative_velocity: {
      kilometers_per_second: string
      kilometers_per_hour: string
      miles_per_hour: string
    }
    miss_distance: {
      astronomical: string
      lunar: string
      kilometers: string
      miles: string
    }
    orbiting_body: string
  }>
  is_sentry_object: boolean
}

const NASA_API_KEY = process.env.NASA_API_KEY
const NASA_API_BASE = "https://api.nasa.gov/neo/rest/v1"

/**
 * Fetch asteroids approaching Earth within a date range
 * NOTE: This function should only be called from server-side code (API routes, server components)
 * to avoid CORS issues. Client components should use /api/nasa/neo-feed instead.
 */
export async function fetchNearEarthAsteroids(startDate: string, endDate: string): Promise<NASAAsteroid[]> {
  if (!NASA_API_KEY) {
    throw new Error("NASA_API_KEY environment variable is not set")
  }

  const url = `${NASA_API_BASE}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (response.status === 429) {
      throw new Error("NASA API rate limit exceeded. Please try again later.")
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`NASA API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    const data: NASAAsteroidResponse = await response.json()

    // Flatten all asteroids from all dates
    const allAsteroids: NASAAsteroid[] = []
    for (const date in data.near_earth_objects) {
      allAsteroids.push(...data.near_earth_objects[date])
    }

    return allAsteroids
  } catch (error) {
    console.error("[v0] Error fetching NASA asteroid data:", error)
    throw error
  }
}

/**
 * Fetch a single asteroid by ID
 * NOTE: This function should only be called from server-side code (API routes, server components)
 * to avoid CORS issues. Client components should use /api/nasa/neo-lookup?id={id} instead.
 */
export async function fetchAsteroidById(id: string): Promise<NASAAsteroid> {
  if (!NASA_API_KEY) {
    throw new Error("NASA_API_KEY environment variable is not set")
  }

  const url = `${NASA_API_BASE}/neo/${id}?api_key=${NASA_API_KEY}`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (response.status === 429) {
      throw new Error("NASA API rate limit exceeded. Please try again later.")
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`NASA API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching asteroid by ID:", error)
    throw error
  }
}

/**
 * Get date range for API queries
 */
export function getDateRange(daysAhead = 7): { startDate: string; endDate: string } {
  const today = new Date()
  const endDate = new Date(today)
  endDate.setDate(today.getDate() + daysAhead)

  return {
    startDate: today.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  }
}

export interface SentryObject {
  des: string // designation
  fullname: string
  h: number // absolute magnitude
  ps_cum: number // cumulative Palermo Scale
  ps_max: number // maximum Palermo Scale
  ts_max: number // maximum Torino Scale
  ip: number // impact probability
  n_imp: number // number of potential impacts
  last_obs: string // last observation date
  last_obs_jd: number
}

export interface SentrySummaryResponse {
  count: number
  data: SentryObject[]
}

/**
 * Fetch NASA Sentry impact risk data
 * Returns list of asteroids with non-zero impact probability
 * NOTE: This function should only be called from server-side code (API routes, server components)
 * to avoid CORS issues. Client components should use /api/nasa/sentry instead.
 */
export async function fetchSentryData(): Promise<SentryObject[]> {
  const SENTRY_API_BASE = "https://ssd-api.jpl.nasa.gov/sentry.api"

  try {
    // Fetch summary of all Sentry objects with impact probability > 1e-6
    const response = await fetch(`${SENTRY_API_BASE}?ip-min=1e-6`, {
      next: { revalidate: 86400 }, // Cache for 24 hours (Sentry data updates less frequently)
    })

    if (!response.ok) {
      throw new Error(`Sentry API error: ${response.status}`)
    }

    const data: SentrySummaryResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error("[v0] Error fetching Sentry data:", error)
    throw error
  }
}

/**
 * Fetch detailed Sentry data for a specific asteroid
 * NOTE: This function should only be called from server-side code (API routes, server components)
 * to avoid CORS issues. Client components should use /api/nasa/sentry?des={designation} instead.
 */
export async function fetchSentryObjectDetails(designation: string): Promise<any> {
  const SENTRY_API_BASE = "https://ssd-api.jpl.nasa.gov/sentry.api"

  try {
    const response = await fetch(`${SENTRY_API_BASE}?des=${encodeURIComponent(designation)}`, {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      throw new Error(`Sentry API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching Sentry object details:", error)
    throw error
  }
}
