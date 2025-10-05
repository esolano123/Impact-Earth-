"use client"

import { Card } from "@/components/ui/card"
import type { ProcessedAsteroid } from "@/lib/asteroid-utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

interface AsteroidChartProps {
  asteroids: ProcessedAsteroid[]
}

export function AsteroidChart({ asteroids }: AsteroidChartProps) {
  // Prepare data for risk distribution chart
  const riskData = [
    { risk: "MINIMAL", count: asteroids.filter((a) => a.risk === "MINIMAL").length, fill: "hsl(var(--chart-3))" },
    { risk: "LOW", count: asteroids.filter((a) => a.risk === "LOW").length, fill: "hsl(var(--chart-2))" },
    { risk: "MODERATE", count: asteroids.filter((a) => a.risk === "MODERATE").length, fill: "hsl(var(--chart-4))" },
    { risk: "HIGH", count: asteroids.filter((a) => a.risk === "HIGH").length, fill: "hsl(var(--chart-5))" },
    { risk: "EXTREME", count: asteroids.filter((a) => a.risk === "EXTREME").length, fill: "hsl(var(--destructive))" },
  ].filter((d) => d.count > 0)

  // Prepare data for size vs distance scatter plot
  const scatterData = asteroids.map((a) => ({
    name: a.name,
    size: a.sizeKm * 1000, // Convert to meters for better scale
    distance: a.distanceLunar,
    risk: a.risk,
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="risk" stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Size vs Distance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              dataKey="distance"
              name="Distance (LD)"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
              label={{
                value: "Distance (Lunar Distance)",
                position: "insideBottom",
                offset: -5,
                fill: "hsl(var(--muted-foreground))",
              }}
            />
            <YAxis
              type="number"
              dataKey="size"
              name="Size (m)"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
              label={{
                value: "Size (meters)",
                angle: -90,
                position: "insideLeft",
                fill: "hsl(var(--muted-foreground))",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => {
                if (name === "Size (m)") return `${value.toFixed(0)}m`
                if (name === "Distance (LD)") return `${value.toFixed(2)} LD`
                return value
              }}
            />
            <Scatter name="Asteroids" data={scatterData} fill="hsl(var(--primary))" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
