"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a short delay
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      alpha: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.4 + 0.1
        this.color = Math.random() > 0.85 ? "#E50914" : "rgba(255,255,255,0.6)"
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.4 + 0.1
        this.color = Math.random() > 0.85 ? "#E50914" : "rgba(255,255,255,0.6)"
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset()
        }
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle())
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const candleData = [
    { type: "bull", bodyHeight: 44, wickTop: 18, wickBottom: 10, delay: "0s" },
    { type: "bull", bodyHeight: 60, wickTop: 12, wickBottom: 14, delay: "0.3s" },
    { type: "bear", bodyHeight: 50, wickTop: 20, wickBottom: 18, delay: "0.6s" },
    { type: "bull", bodyHeight: 80, wickTop: 14, wickBottom: 8, delay: "0.9s" },
    { type: "bear", bodyHeight: 40, wickTop: 16, wickBottom: 20, delay: "1.2s" },
    { type: "bull", bodyHeight: 100, wickTop: 22, wickBottom: 10, delay: "1.5s" },
    { type: "bull", bodyHeight: 72, wickTop: 18, wickBottom: 12, delay: "1.8s" },
  ]

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center pt-[120px] pb-20 px-[5%]">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Glow effect */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[glowPulse_4s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(229,9,20,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center max-w-[1300px] w-full mx-auto">
        {/* Left content */}
        <div
          className={`transition-all duration-1000 ${
            showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 border border-[rgba(229,9,20,0.4)] px-4 py-1.5 rounded-full text-[11px] tracking-[3px] uppercase text-[#E50914] mb-6">
            <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-[dotBlink_1s_infinite_alternate]" />
            Live Signals • XAUUSD & NASDAQ 100
          </div>

          {/* Heading */}
          <h1 className="font-oswald font-bold leading-[0.95] uppercase mb-6 text-[clamp(3rem,5.5vw,6.5rem)]">
            <span className="block">STOP LOSING.</span>
            <span
              className="block text-transparent"
              style={{
                WebkitTextStroke: "2px #E50914",
                filter: "drop-shadow(0 0 24px rgba(229,9,20,0.5))",
              }}
            >
              START HUNTING.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-[clamp(0.95rem,1.3vw,1.15rem)] text-white/55 leading-relaxed max-w-[520px] mb-9">
            Every trade we call, we give you the <strong className="text-white">Entry. Stop Loss. Take Profit.</strong>{" "}
            One clean signal. 50 pips minimum. Whether you&apos;re down ₹50,000 or scaling to your first lakh —{" "}
            <strong className="text-white">your first trade with us is covered.</strong>
          </p>

          {/* Buttons */}
          <div className="flex gap-3.5 flex-wrap">
            <Link
              href="/analysis"
              className="bg-[#E50914] text-white font-rajdhani font-bold text-base tracking-[2px] uppercase px-9 py-4 relative overflow-hidden hover:scale-[1.04] transition-transform group inline-block"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative">START MY FREE ANALYSIS →</span>
            </Link>
            <Link
              href="#results"
              className="bg-transparent text-white font-rajdhani font-bold text-base tracking-[2px] uppercase px-9 py-[15px] border border-white/25 hover:border-white transition-colors inline-block"
            >
              SEE OUR RESULTS
            </Link>
          </div>
        </div>

        {/* Right content - Chart Card */}
        <div
          className={`relative hidden lg:block transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          {/* Crosshair badge */}
          <div className="absolute -top-5 -right-5 w-20 h-20 border-2 border-[#E50914] rounded-full flex items-center justify-center bg-[rgba(229,9,20,0.1)]">
            <div className="absolute w-[1px] h-full bg-[#E50914]" />
            <div className="absolute h-[1px] w-full bg-[#E50914]" />
            <div className="w-2 h-2 bg-[#E50914] rounded-full animate-[dotBlink_0.8s_infinite_alternate]" />
          </div>

          {/* Chart card */}
          <div className="bg-[rgba(15,15,15,0.9)] border border-[rgba(229,9,20,0.25)] rounded p-6 backdrop-blur-[10px] relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E50914] to-transparent" />

            {/* TP line */}
            <div className="absolute top-[42px] left-6 right-6 border-t border-dashed border-[rgba(229,9,20,0.6)] flex items-center justify-end">
              <span className="bg-[#E50914] text-white font-rajdhani text-[10px] font-bold tracking-[1px] px-2 py-0.5">
                TP HIT ✓
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-rajdhani font-bold text-lg tracking-[2px]">XAUUSD</div>
                <div className="text-[11px] text-white/55 tracking-[1px]">GOLD / US DOLLAR</div>
              </div>
              <div className="text-right">
                <div className="bg-[#E50914] text-white font-rajdhani font-bold text-lg tracking-[2px] px-3 py-1 inline-block">
                  TP HIT
                </div>
                <div className="text-sm text-[#2ecc71] bg-[rgba(46,204,113,0.1)] px-2.5 py-0.5 rounded-sm inline-block mt-1">
                  +180 pips ↑
                </div>
                <div className="text-[11px] text-white/55 tracking-[1px] mt-1">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' })}
                </div>
              </div>
            </div>

            {/* Candle chart */}
            <div className="flex items-end gap-2 h-[140px] py-2.5">
              {candleData.map((candle, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-[candleFloat_3s_ease-in-out_infinite]"
                  style={{ animationDelay: candle.delay }}
                >
                  <div className="w-[2px] bg-white/30" style={{ height: candle.wickTop }} />
                  <div
                    className={`w-5 rounded-[1px] relative ${
                      candle.type === "bull"
                        ? "bg-gradient-to-b from-white to-[#ccc]"
                        : "bg-gradient-to-b from-[#ff3333] to-[#a00]"
                    }`}
                    style={{ height: candle.bodyHeight }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent" />
                  </div>
                  <div className="w-[2px] bg-white/30" style={{ height: candle.wickBottom }} />
                </div>
              ))}
            </div>

            {/* Footer stats */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.07]">
              {[
                { val: "+180", label: "Pips Today" },
                { val: "0.01", label: "Min Lot" },
                { val: "78%", label: "Win Rate" },
                { val: "2", label: "Trades/Day" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-oswald text-xl text-[#E50914]">{stat.val}</div>
                  <div className="text-[10px] tracking-[2px] uppercase text-white/55 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live indicator */}
          <div className="mt-3 bg-[rgba(46,204,113,0.08)] border border-[rgba(46,204,113,0.2)] py-3 px-4 flex items-center gap-2.5">
            <span className="text-[#2ecc71] text-sm">●</span>
            <span className="font-rajdhani font-semibold text-sm tracking-[1px] text-[#2ecc71]">
              LIVE — SIGNAL CHANNEL ACTIVE RIGHT NOW
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-[bounceDown_2s_infinite] z-[2]">
        <span className="text-[10px] tracking-[3px] uppercase">SCROLL</span>
        <div className="w-[18px] h-[18px] border-r-2 border-b-2 border-white rotate-45" />
      </div>
    </section>
  )
}
