import { NextResponse } from "next/server"

const NASA_API_KEY = process.env.NASA_API_KEY
const NASA_NEO_LOOKUP_URL = "https://api.nasa.gov/neo/rest/v1/neo"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asteroidId = searchParams.get("id")

  if (!asteroidId) {
    return NextResponse.json({ error: "Asteroid ID is required" }, { status: 400 })
  }

  if (!NASA_API_KEY) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not configured. Please add it to your environment variables." },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(`${NASA_NEO_LOOKUP_URL}/${asteroidId}?api_key=${NASA_API_KEY}`)

    if (response.status === 429) {
      return NextResponse.json(
        { error: "NASA API rate limit exceeded. Please try again in a few minutes." },
        { status: 429 },
      )
    }

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching NASA NEO lookup data:", error)
    return NextResponse.json({ error: "Failed to fetch asteroid details" }, { status: 500 })
  }
}
