"use client"

import { useEffect, useState } from "react"

interface ExplosionAnimationProps {
  show: boolean
  onComplete?: () => void
}

export function ExplosionAnimation({ show, onComplete }: ExplosionAnimationProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!show) {
      setStage(0)
      return
    }

    // Animation sequence
    const timers: NodeJS.Timeout[] = []

    // Stage 1: Flash
    timers.push(setTimeout(() => setStage(1), 50))

    // Stage 2: Explosion expand
    timers.push(setTimeout(() => setStage(2), 200))

    // Stage 3: Shockwave
    timers.push(setTimeout(() => setStage(3), 500))

    // Stage 4: Fade out
    timers.push(setTimeout(() => setStage(4), 1200))

    // Complete
    timers.push(
      setTimeout(() => {
        setStage(0)
        onComplete?.()
      }, 2000),
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [show, onComplete])

  if (!show || stage === 0) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* White flash */}
      {stage === 1 && <div className="absolute inset-0 bg-white animate-[flash_0.2s_ease-out]" />}

      {/* Explosion center */}
      {stage >= 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full bg-gradient-to-r from-yellow-200 via-orange-500 to-red-600 ${
              stage === 2
                ? "animate-[explode_0.8s_ease-out]"
                : stage === 3
                  ? "animate-[pulse_0.5s_ease-in-out]"
                  : "animate-[fadeOut_0.8s_ease-out]"
            }`}
            style={{
              width: stage === 2 ? "200vmax" : stage === 3 ? "250vmax" : "300vmax",
              height: stage === 2 ? "200vmax" : stage === 3 ? "250vmax" : "300vmax",
              opacity: stage === 4 ? 0 : stage === 3 ? 0.6 : 0.9,
              filter: "blur(20px)",
              transition: "all 0.8s ease-out",
            }}
          />
        </div>
      )}

      {/* Shockwave rings */}
      {stage >= 3 && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full border-8 border-orange-400 animate-[shockwave_1s_ease-out]"
              style={{
                width: "150vmax",
                height: "150vmax",
                opacity: stage === 4 ? 0 : 0.7,
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full border-4 border-red-500 animate-[shockwave_1.2s_ease-out_0.2s]"
              style={{
                width: "200vmax",
                height: "200vmax",
                opacity: stage === 4 ? 0 : 0.5,
              }}
            />
          </div>
        </>
      )}

      {/* Particle effects */}
      {stage >= 2 && stage < 4 && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full animate-[particle_1.5s_ease-out]"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${i * 12}deg) translateY(-50vh)`,
                animationDelay: `${i * 0.02}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Impact text */}
      {stage >= 2 && stage < 4 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-white font-bold text-6xl md:text-9xl tracking-wider ${
              stage === 2 ? "animate-[impactText_0.5s_ease-out]" : "animate-[fadeOut_0.8s_ease-out]"
            }`}
            style={{
              textShadow: "0 0 20px rgba(255,100,0,0.8), 0 0 40px rgba(255,50,0,0.6)",
              opacity: stage === 4 ? 0 : 1,
            }}
          >
            IMPACT!
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes flash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes explode {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes shockwave {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes particle {
          0% {
            transform: rotate(var(--rotation, 0deg)) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation, 0deg)) translateY(-100vh);
            opacity: 0;
          }
        }

        @keyframes impactText {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
