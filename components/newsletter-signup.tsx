"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Bell } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In the future, this will connect to your API
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Stay Informed</h2>
          <p className="text-sm text-muted-foreground">Get threat alerts in real-time</p>
        </div>
      </div>

      <p className="text-muted-foreground mb-6">
        Subscribe to receive instant notifications about new asteroid discoveries, trajectory updates, and impact risk
        assessments.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-secondary border-border text-foreground"
                required
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe
            </Button>
          </div>
        </div>

        {subscribed && (
          <div className="p-3 bg-chart-4/20 border border-chart-4/50 rounded-lg">
            <p className="text-sm text-foreground">Successfully subscribed! Check your email for confirmation.</p>
          </div>
        )}

        <div className="flex items-start gap-2 pt-2">
          <input type="checkbox" id="alerts" className="mt-1" required />
          <Label htmlFor="alerts" className="text-xs text-muted-foreground cursor-pointer">
            I agree to receive email notifications about potentially hazardous near-Earth objects and impact threat
            assessments. You can unsubscribe at any time.
          </Label>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Data sources: NASA JPL, ESA SSA, Minor Planet Center. Updates every 6 hours.
        </p>
      </div>
    </Card>
  )
}
