"use client"

import { useEffect, useRef } from "react"

interface EarthVisualizationProps {
  params: {
    diameter: number
    impactAngle: number
    impactVelocity: number
  }
}

export function EarthVisualization({ params }: EarthVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const earthRadius = 120

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw Earth
    const earthGradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 20, centerX, centerY, earthRadius)
    earthGradient.addColorStop(0, "#4a9eff")
    earthGradient.addColorStop(0.3, "#2d7dd2")
    earthGradient.addColorStop(0.7, "#1e5a99")
    earthGradient.addColorStop(1, "#0d2f4f")

    ctx.beginPath()
    ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
    ctx.fillStyle = earthGradient
    ctx.fill()

    // Draw continents (simplified)
    ctx.fillStyle = "#2d5a3d"
    ctx.globalAlpha = 0.6

    // North America
    ctx.beginPath()
    ctx.ellipse(centerX - 40, centerY - 30, 25, 35, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // Europe/Africa
    ctx.beginPath()
    ctx.ellipse(centerX + 20, centerY - 10, 20, 40, 0.2, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalAlpha = 1

    // Draw atmosphere glow
    ctx.beginPath()
    ctx.arc(centerX, centerY, earthRadius + 10, 0, Math.PI * 2)
    const glowGradient = ctx.createRadialGradient(centerX, centerY, earthRadius, centerX, centerY, earthRadius + 10)
    glowGradient.addColorStop(0, "rgba(100, 200, 255, 0.3)")
    glowGradient.addColorStop(1, "rgba(100, 200, 255, 0)")
    ctx.strokeStyle = glowGradient
    ctx.lineWidth = 20
    ctx.stroke()

    // Draw meteor trajectory
    const angleRad = (params.impactAngle * Math.PI) / 180
    const meteorStartX = centerX + Math.cos(angleRad + Math.PI / 4) * 200
    const meteorStartY = centerY - Math.sin(angleRad + Math.PI / 4) * 200
    const meteorEndX = centerX + Math.cos(angleRad + Math.PI / 4) * (earthRadius - 10)
    const meteorEndY = centerY - Math.sin(angleRad + Math.PI / 4) * (earthRadius - 10)

    // Meteor trail
    const trailGradient = ctx.createLinearGradient(meteorStartX, meteorStartY, meteorEndX, meteorEndY)
    trailGradient.addColorStop(0, "rgba(255, 150, 50, 0)")
    trailGradient.addColorStop(0.5, "rgba(255, 100, 30, 0.5)")
    trailGradient.addColorStop(1, "rgba(255, 50, 0, 0.8)")

    ctx.beginPath()
    ctx.moveTo(meteorStartX, meteorStartY)
    ctx.lineTo(meteorEndX, meteorEndY)
    ctx.strokeStyle = trailGradient
    ctx.lineWidth = 3
    ctx.stroke()

    // Meteor
    ctx.beginPath()
    ctx.arc(meteorEndX, meteorEndY, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#ff6600"
    ctx.fill()
    ctx.strokeStyle = "#ffaa00"
    ctx.lineWidth = 2
    ctx.stroke()

    // Impact point indicator
    ctx.beginPath()
    ctx.arc(meteorEndX, meteorEndY, 12, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255, 100, 0, 0.5)"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [params])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={500} height={400} className="w-full h-auto" />
      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-2 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">Trajectory Angle</p>
        <p className="text-lg font-mono text-foreground">{params.impactAngle}°</p>
      </div>
    </div>
  )
}
