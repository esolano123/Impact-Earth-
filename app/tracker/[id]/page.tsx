import { Suspense } from "react"
import { notFound } from "next/navigation"
import { AsteroidDetail } from "@/components/asteroid-detail"
import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAsteroidById } from "@/lib/nasa-api"
import { processAsteroid } from "@/lib/asteroid-utils"

interface PageProps {
  params: Promise<{ id: string }>
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-96" />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  try {
    const asteroid = await fetchAsteroidById(id)
    const processed = processAsteroid(asteroid)

    return {
      title: `${processed.name} - Asteroid Detail`,
      description: `Detailed information about asteroid ${processed.name} including orbital data, close approach details, and impact simulation.`,
    }
  } catch {
    return {
      title: "Asteroid Not Found",
    }
  }
}

export default async function AsteroidDetailPage({ params }: PageProps) {
  const { id } = await params

  let asteroid
  try {
    const data = await fetchAsteroidById(id)
    asteroid = processAsteroid(data)
  } catch {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Starfield />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Suspense fallback={<DetailSkeleton />}>
          <AsteroidDetail asteroid={asteroid} asteroidId={id} />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
