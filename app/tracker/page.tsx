import { Suspense } from "react"
import { AsteroidDashboard } from "@/components/asteroid-dashboard"
import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Asteroid Tracker - Impact Earth",
  description: "Track near-Earth asteroids in real-time using NASA data",
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-96" />
    </div>
  )
}

export default function TrackerPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Starfield />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <AsteroidDashboard />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
