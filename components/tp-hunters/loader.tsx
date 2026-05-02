"use client"

import { useEffect, useState } from "react"

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsHiding(true)
            setTimeout(onComplete, 400)
          }, 400)
          return 100
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center transition-all duration-800 ${
        isHiding ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      {/* Crosshair */}
      <div className="w-[100px] h-[100px] relative mb-8 animate-[crosshairSpin_1.5s_ease-in-out_forwards]">
        {/* Vertical line */}
        <div className="absolute w-[2px] h-full left-1/2 -translate-x-1/2 bg-[#E50914]" />
        {/* Horizontal line */}
        <div className="absolute h-[2px] w-full top-1/2 -translate-y-1/2 bg-[#E50914]" />
        {/* Outer ring */}
        <div className="absolute inset-[10px] rounded-full border-2 border-[#E50914] animate-[ringPulse_1.5s_ease-in-out_infinite]" />
        {/* Inner ring */}
        <div className="absolute inset-[25px] rounded-full border border-[rgba(229,9,20,0.4)]" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#E50914] rounded-full animate-[dotBlink_0.5s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Brand */}
      <div className="font-oswald text-2xl font-bold tracking-[6px] uppercase opacity-0 animate-[fadeIn_0.6s_0.8s_ease_forwards]">
        <span className="text-[#E50914]">TP</span> HUNTERS
      </div>

      {/* Progress bar */}
      <div className="w-[200px] h-[2px] bg-white/10 mt-5 rounded-sm overflow-hidden opacity-0 animate-[fadeIn_0.6s_1s_ease_forwards]">
        <div
          className="h-full bg-[#E50914] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="text-xs tracking-[3px] text-[#E50914] mt-2.5 font-rajdhani font-semibold opacity-0 animate-[fadeIn_0.6s_1s_ease_forwards]">
        {Math.floor(progress)}%
      </div>
    </div>
  )
}
