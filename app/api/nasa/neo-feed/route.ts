import { NextResponse } from "next/server"

const NASA_API_KEY = process.env.NASA_API_KEY
const NASA_NEO_FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("start_date") || new Date().toISOString().split("T")[0]
  const endDate =
    searchParams.get("end_date") || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  if (!NASA_API_KEY) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not configured. Please add it to your environment variables." },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(
      `${NASA_NEO_FEED_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`,
    )

    if (response.status === 429) {
      const errorBody = await response.text()
      console.error("NASA API rate limit exceeded:", errorBody)
      return NextResponse.json(
        { error: "NASA API rate limit exceeded. Please try again in a few minutes." },
        { status: 429 },
      )
    }

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`NASA API error ${response.status}:`, errorBody)
      throw new Error(`NASA API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching NASA NEO data:", error)
    return NextResponse.json({ error: "Failed to fetch asteroid data" }, { status: 500 })
  }
}
