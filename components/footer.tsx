import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm bg-background/80 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-3">Impact Earth</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              An interactive platform for understanding meteor impact threats and tracking near-Earth objects. Built to
              make planetary defense data accessible and engaging.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Github className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="mailto:contact@impactearth.com"
                className="h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Mail className="h-4 w-4 text-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Impact Simulator
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-foreground transition-colors">
                  Threat Updates
                </Link>
              </li>
              <li>
                <a
                  href="https://cneos.jpl.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  NASA JPL Data
                </a>
              </li>
              <li>
                <a
                  href="https://www.esa.int/Safety_Security/Hera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  ESA Planetary Defense
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Data Sources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>NASA JPL CNEOS</li>
              <li>ESA SSA</li>
              <li>Minor Planet Center</li>
              <li>International Observatories</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Built with v0 by Vercel. Data for educational and research purposes. Not affiliated with NASA or ESA.
          </p>
        </div>
      </div>
    </footer>
  )
}
