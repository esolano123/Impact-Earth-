"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Wind, Flame, Mountain, Home, AlertTriangle, Shield, BookOpen } from "lucide-react"
import { TooltipInfo } from "@/components/tooltip-info"

export function ImpactEffectsGuide() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">Understanding Impact Effects</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
          Learn about the various consequences of asteroid impacts and how to prepare for potential events in your
          region
        </p>
      </div>

      <Tabs defaultValue="effects" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card/80 backdrop-blur">
          <TabsTrigger value="effects" className="text-base font-semibold">
            Impact Phenomena
          </TabsTrigger>
          <TabsTrigger value="preparedness" className="text-base font-semibold">
            Preparedness Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="effects" className="space-y-6 mt-6">
          {/* Tsunami Effects */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-1/20 rounded-lg">
                <Waves className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground flex items-center">
                  Tsunami Generation
                  <TooltipInfo content="Large waves caused by the displacement of water from an oceanic impact, capable of traveling thousands of kilometers" />
                </h3>
                <p className="text-sm text-muted-foreground font-medium">Oceanic and coastal impacts</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mechanism</h4>
                <p className="text-foreground font-medium leading-relaxed">
                  When an asteroid impacts an ocean, it displaces massive volumes of water, creating a{" "}
                  <span className="font-bold">cavity collapse</span>
                  <TooltipInfo content="The rapid inward rush of water after the initial impact crater forms, generating powerful wave systems" />{" "}
                  that generates tsunami waves. These waves can reach heights of 100+ meters near the impact site and
                  maintain destructive power across entire ocean basins.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Affected Regions</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Coastal areas within 1,000 km: Catastrophic inundation within 1-3 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-5 mt-1">•</span>
                    <span>Trans-oceanic regions: Significant waves arriving 6-24 hours post-impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span>Low-lying islands and atolls: Complete submersion risk</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Seismic Effects */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-5/20 rounded-lg">
                <Mountain className="h-6 w-6 text-chart-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground flex items-center">
                  Seismic Activity
                  <TooltipInfo content="Ground shaking and earthquake-like effects caused by the transfer of impact energy through Earth's crust" />
                </h3>
                <p className="text-sm text-muted-foreground font-medium">Ground shaking and structural damage</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mechanism</h4>
                <p className="text-foreground font-medium leading-relaxed">
                  Impact energy propagates through Earth's crust as <span className="font-bold">seismic waves</span>
                  <TooltipInfo content="Vibrations that travel through the Earth, similar to earthquake waves but originating from surface impact rather than tectonic movement" />
                  , creating ground motion equivalent to magnitude 7-10+ earthquakes depending on impactor size. Unlike
                  tectonic earthquakes, impact-generated seismic events radiate uniformly from the impact point.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Distance-Based Effects</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>0-500 km: Extreme shaking, total structural collapse of most buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-5 mt-1">•</span>
                    <span>500-2,000 km: Severe shaking, major damage to unreinforced structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span>2,000-5,000 km: Moderate shaking, potential damage to vulnerable buildings</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Thermal Radiation */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-destructive/20 rounded-lg">
                <Flame className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground flex items-center">
                  Thermal Radiation
                  <TooltipInfo content="Intense heat and light emitted from the fireball, capable of igniting fires and causing severe burns at great distances" />
                </h3>
                <p className="text-sm text-muted-foreground font-medium">Heat flash and fire ignition</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mechanism</h4>
                <p className="text-foreground font-medium leading-relaxed">
                  The impact creates a superheated <span className="font-bold">fireball</span>
                  <TooltipInfo content="A sphere of incandescent gas reaching temperatures of 5,000-10,000°C, similar to the surface of the sun" />{" "}
                  that emits intense thermal radiation. This heat pulse travels at the speed of light, arriving before
                  any blast wave, and can ignite combustible materials across vast areas.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Thermal Effects by Distance</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Direct line of sight: Third-degree burns, spontaneous ignition of materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-5 mt-1">•</span>
                    <span>Extended radius: Second-degree burns, widespread fire ignition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span>Outer zones: First-degree burns, potential for fire spread in dry conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Blast Wave */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-2/20 rounded-lg">
                <Wind className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground flex items-center">
                  Atmospheric Blast Wave
                  <TooltipInfo content="A powerful shockwave of compressed air radiating outward from the impact, similar to a nuclear explosion but potentially much larger" />
                </h3>
                <p className="text-sm text-muted-foreground font-medium">Shockwave and wind damage</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mechanism</h4>
                <p className="text-foreground font-medium leading-relaxed">
                  The impact generates a powerful <span className="font-bold">overpressure wave</span>
                  <TooltipInfo content="A region of compressed air with pressure significantly higher than normal atmospheric pressure, measured in PSI (pounds per square inch)" />{" "}
                  that propagates through the atmosphere at supersonic speeds initially, followed by hurricane-force
                  winds as air rushes back toward the impact site.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Overpressure Effects</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>20+ PSI: Complete destruction of all structures, severe terrain modification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-5 mt-1">•</span>
                    <span>5-20 PSI: Collapse of most buildings, severe injury to exposed individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span>1-5 PSI: Moderate structural damage, broken windows, potential injuries</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preparedness" className="space-y-6 mt-6">
          {/* Coastal Preparedness */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-1/20 rounded-lg">
                <Shield className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Coastal Region Preparedness</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground font-medium leading-relaxed">
                If you live within 50 km of a coastline, tsunami preparedness is critical for asteroid impact scenarios.
              </p>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-chart-5" />
                  Immediate Actions (Upon Warning)
                </h4>
                <ol className="space-y-3 text-foreground font-medium">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">1.</span>
                    <span>
                      <strong>Evacuate to high ground immediately</strong> - Move to elevations above 30 meters (100
                      feet) or at least 3 km inland
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">2.</span>
                    <span>
                      <strong>Follow designated tsunami evacuation routes</strong> - Do not attempt shortcuts through
                      unfamiliar terrain
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">3.</span>
                    <span>
                      <strong>Abandon vehicles if traffic stalls</strong> - Continue on foot to higher ground; time is
                      critical
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">4.</span>
                    <span>
                      <strong>Stay elevated for 24+ hours</strong> - Multiple wave trains may arrive over extended
                      periods
                    </span>
                  </li>
                </ol>
              </div>
              <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/30">
                <p className="text-sm text-foreground font-medium">
                  <strong>Source:</strong> Based on NOAA Tsunami Preparedness guidelines and International Tsunami
                  Information Center recommendations
                </p>
              </div>
            </div>
          </Card>

          {/* Inland Preparedness */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-3/20 rounded-lg">
                <Home className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Inland Region Preparedness</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground font-medium leading-relaxed">
                Inland areas face primary threats from seismic activity, blast waves, and thermal radiation.
              </p>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-chart-5" />
                  Protection Strategies
                </h4>
                <ol className="space-y-3 text-foreground font-medium">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">1.</span>
                    <span>
                      <strong>Seek underground shelter</strong> - Basements, subway systems, or underground parking
                      structures provide best protection from blast and thermal effects
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">2.</span>
                    <span>
                      <strong>Stay away from windows and exterior walls</strong> - Glass and debris become deadly
                      projectiles in blast waves
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">3.</span>
                    <span>
                      <strong>Drop, cover, and hold during seismic shaking</strong> - Protect head and neck, take cover
                      under sturdy furniture
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">4.</span>
                    <span>
                      <strong>Prepare for extended power and communication outages</strong> - Infrastructure damage may
                      be widespread
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Emergency Kit */}
          <Card className="p-6 bg-card/80 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-chart-4/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Essential Emergency Supplies</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">72-Hour Emergency Kit</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Water: 1 gallon per person per day (3-day minimum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Non-perishable food: 3-day supply, no cooking required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Battery or hand-crank radio for emergency broadcasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Flashlight with extra batteries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>First aid kit with essential medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Dust masks or N95 respirators for airborne debris</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Additional Recommended Items</h4>
                <ul className="space-y-2 text-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Whistle for signaling rescue personnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Local maps (electronic devices may not function)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Cell phone with backup power bank and solar charger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Emergency blankets and warm clothing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Cash (ATMs and card systems may be offline)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3 mt-1">✓</span>
                    <span>Important documents in waterproof container</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-chart-4/10 rounded-lg border border-chart-4/30">
              <p className="text-sm text-foreground font-medium">
                <strong>Source:</strong> Recommendations based on FEMA Emergency Preparedness guidelines and Red Cross
                disaster readiness protocols
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
