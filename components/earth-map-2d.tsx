"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface EarthMap2DProps {
  impactLocation: { lat: number; lon: number }
  onLocationClick?: (lat: number, lon: number) => void
  params: {
    diameter: number
  }
}

export function EarthMap2D({ impactLocation, onLocationClick, params }: EarthMap2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCoords, setHoveredCoords] = useState<{ lat: number; lon: number } | null>(null)

  // Calculate affected radius in pixels based on meteor diameter
  const calculateRadiusPixels = (diameter: number, canvasWidth: number) => {
    // Approximate: 1 km diameter = ~20 km crater = ~100 km affected area
    const affectedAreaKm = diameter * 100
    // Map width represents 360 degrees longitude, ~40,000 km at equator
    const kmPerPixel = 40000 / canvasWidth
    return affectedAreaKm / kmPerPixel
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height

    // Load and draw the satellite map image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-04%20at%202.05.19%E2%80%AFPM-e2fTE22qtuHEN4fnMjzcgKAKfLKZ1A.png"

    img.onload = () => {
      // Calculate crop dimensions to remove bottom-right corner (approximately 80x30 pixels)
      const cropWidth = img.width - 80
      const cropHeight = img.height - 30

      // Draw the cropped satellite map, centered
      ctx.drawImage(img, 0, 0, cropWidth, cropHeight, 0, 0, width, height)

      // Convert lat/lon to x/y coordinates
      const x = ((impactLocation.lon + 180) / 360) * width
      const y = ((90 - impactLocation.lat) / 180) * height

      // Calculate affected radius
      const radiusPixels = calculateRadiusPixels(params.diameter, width)

      // Draw affected area (outer radius - light red)
      ctx.beginPath()
      ctx.arc(x, y, radiusPixels, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 68, 0, 0.15)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 68, 0, 0.4)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw danger zone (middle radius - medium red)
      ctx.beginPath()
      ctx.arc(x, y, radiusPixels * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 68, 0, 0.25)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 68, 0, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw impact zone (inner radius - bright red)
      ctx.beginPath()
      ctx.arc(x, y, radiusPixels * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 51, 0, 0.4)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 51, 0, 0.9)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw impact point marker
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "#ff3300"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw crosshair
      ctx.strokeStyle = "#ff3300"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x - 15, y)
      ctx.lineTo(x + 15, y)
      ctx.moveTo(x, y - 15)
      ctx.lineTo(x, y + 15)
      ctx.stroke()
    }

    img.onerror = () => {
      // Fallback: draw a simple blue/green map
      // Ocean background
      ctx.fillStyle = "#1e4d7b"
      ctx.fillRect(0, 0, width, height)

      // Simple continents (very simplified)
      ctx.fillStyle = "#2d5a3d"

      // North America
      ctx.beginPath()
      ctx.ellipse(width * 0.2, height * 0.35, width * 0.12, height * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      // South America
      ctx.beginPath()
      ctx.ellipse(width * 0.25, height * 0.65, width * 0.08, height * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      // Europe/Africa
      ctx.beginPath()
      ctx.ellipse(width * 0.5, height * 0.45, width * 0.1, height * 0.2, 0, 0, Math.PI * 2)
      ctx.fill()

      // Asia
      ctx.beginPath()
      ctx.ellipse(width * 0.7, height * 0.35, width * 0.15, height * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      // Australia
      ctx.beginPath()
      ctx.ellipse(width * 0.8, height * 0.7, width * 0.08, height * 0.08, 0, 0, Math.PI * 2)
      ctx.fill()

      // Draw impact visualization
      const x = ((impactLocation.lon + 180) / 360) * width
      const y = ((90 - impactLocation.lat) / 180) * height
      const radiusPixels = calculateRadiusPixels(params.diameter, width)

      // Draw affected area
      ctx.beginPath()
      ctx.arc(x, y, radiusPixels, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 68, 0, 0.15)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 68, 0, 0.4)"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y, radiusPixels * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 68, 0, 0.25)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 68, 0, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y, radiusPixels * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 51, 0, 0.4)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 51, 0, 0.9)"
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "#ff3300"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.strokeStyle = "#ff3300"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x - 15, y)
      ctx.lineTo(x + 15, y)
      ctx.moveTo(x, y - 15)
      ctx.lineTo(x, y + 15)
      ctx.stroke()
    }
  }, [impactLocation, params.diameter])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onLocationClick || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert x/y to lat/lon
    const lon = (x / rect.width) * 360 - 180
    const lat = 90 - (y / rect.height) * 180

    onLocationClick(lat, lon)
  }

  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const lon = (x / rect.width) * 360 - 180
    const lat = 90 - (y / rect.height) * 180

    setHoveredCoords({ lat, lon })
  }

  const handleCanvasLeave = () => {
    setHoveredCoords(null)
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-background/50 border-2 border-primary/30">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMove}
        onMouseLeave={handleCanvasLeave}
        className="w-full h-full cursor-crosshair"
        style={{ display: "block" }}
      />

      {/* Coordinates display */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border text-sm font-mono">
        <div className="text-muted-foreground font-semibold">Impact Location:</div>
        <div className="text-foreground font-bold">
          {impactLocation.lat.toFixed(3)}°, {impactLocation.lon.toFixed(3)}°
        </div>
      </div>

      {hoveredCoords && (
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary text-sm font-mono text-white">
          <div className="font-semibold">Hover:</div>
          <div className="font-bold">
            {hoveredCoords.lat.toFixed(3)}°, {hoveredCoords.lon.toFixed(3)}°
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border text-xs space-y-1">
        <div className="font-semibold text-foreground mb-2">Affected Zones:</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[rgba(255,51,0,0.4)] border-2 border-[rgba(255,51,0,0.9)]"></div>
          <span className="text-muted-foreground font-medium">Impact Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[rgba(255,68,0,0.25)] border-2 border-[rgba(255,68,0,0.6)]"></div>
          <span className="text-muted-foreground font-medium">Danger Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[rgba(255,68,0,0.15)] border-2 border-[rgba(255,68,0,0.4)]"></div>
          <span className="text-muted-foreground font-medium">Affected Area</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary text-white text-sm font-semibold">
        Click anywhere to set impact location
      </div>
    </div>
  )
}
