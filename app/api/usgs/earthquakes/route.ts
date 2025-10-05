export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const radius = searchParams.get("radius") || "500" // Default 500km radius

  try {
    // USGS Earthquake API - Get recent earthquakes near the impact location
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30) // Last 30 days

    const usgsUrl = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query")
    usgsUrl.searchParams.set("format", "geojson")
    usgsUrl.searchParams.set("starttime", startDate.toISOString().split("T")[0])
    usgsUrl.searchParams.set("endtime", endDate.toISOString().split("T")[0])

    if (lat && lon) {
      usgsUrl.searchParams.set("latitude", lat)
      usgsUrl.searchParams.set("longitude", lon)
      usgsUrl.searchParams.set("maxradiuskm", radius)
    }

    usgsUrl.searchParams.set("minmagnitude", "4.0")
    usgsUrl.searchParams.set("orderby", "magnitude")
    usgsUrl.searchParams.set("limit", "10")

    const response = await fetch(usgsUrl.toString())

    if (!response.ok) {
      throw new Error("Failed to fetch USGS earthquake data")
    }

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching USGS data:", error)
    return Response.json({ error: "Failed to fetch earthquake data" }, { status: 500 })
  }
}
