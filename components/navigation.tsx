"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Rocket, Newspaper, Menu, X, Target } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="relative z-20 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Rocket className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
              <div className="absolute inset-0 blur-lg bg-primary/20 group-hover:bg-primary/30 transition-all" />
            </div>
            <span className="text-xl font-bold text-foreground">Impact Earth</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/" ? "bg-primary text-primary-foreground" : ""}
              >
                Simulator
              </Button>
            </Link>
            <Link href="/tracker">
              <Button
                variant={pathname === "/tracker" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/tracker" ? "bg-primary text-primary-foreground" : ""}
              >
                <Target className="h-4 w-4 mr-2" />
                Tracker
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button
                variant={pathname === "/newsletter" ? "default" : "ghost"}
                size="sm"
                className={pathname === "/newsletter" ? "bg-primary text-primary-foreground" : ""}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Threat Updates
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-border/50 pt-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start ${pathname === "/" ? "bg-primary text-primary-foreground" : ""}`}
              >
                Simulator
              </Button>
            </Link>
            <Link href="/tracker" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === "/tracker" ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start ${pathname === "/tracker" ? "bg-primary text-primary-foreground" : ""}`}
              >
                <Target className="h-4 w-4 mr-2" />
                Tracker
              </Button>
            </Link>
            <Link href="/newsletter" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === "/newsletter" ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start ${pathname === "/newsletter" ? "bg-primary text-primary-foreground" : ""}`}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Threat Updates
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
