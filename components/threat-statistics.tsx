import { Card } from "@/components/ui/card"
import { AlertTriangle, Eye, Shield } from "lucide-react"

export function ThreatStatistics() {
  return (
    <>
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-chart-1/20 flex items-center justify-center">
            <Eye className="h-5 w-5 text-chart-1" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Objects Tracked</p>
            <p className="text-3xl font-bold text-foreground font-mono">34,127</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Near-Earth asteroids monitored</p>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Threats</p>
            <p className="text-3xl font-bold text-foreground font-mono">12</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Potentially hazardous objects</p>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-chart-4/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-chart-4" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Days Protected</p>
            <p className="text-3xl font-bold text-foreground font-mono">9,847</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Since last major impact</p>
      </Card>
    </>
  )
}
