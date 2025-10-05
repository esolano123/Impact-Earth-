import { NextResponse } from "next/server"

const SENTRY_API_BASE = "https://ssd-api.jpl.nasa.gov/sentry.api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const designation = searchParams.get("des")
  const minProbability = searchParams.get("ip-min") || "1e-6"

  try {
    let url = SENTRY_API_BASE

    if (designation) {
      // Fetch specific asteroid details
      url += `?des=${encodeURIComponent(designation)}`
    } else {
      // Fetch summary of all objects with minimum impact probability
      url += `?ip-min=${minProbability}`
    }

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error(`Sentry API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching NASA Sentry data:", error)
    return NextResponse.json({ error: "Failed to fetch impact risk data" }, { status: 500 })
  }
}
