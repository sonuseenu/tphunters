"use client"

import { useEffect } from "react"
import Link from "next/link"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  tradeIndex: number
}

const tradeData = [
  { title: "XAUUSD", pips: "+185", lot: "0.01", profit: "₹555", method: "Inside Bar Breakout", rr: "1:3.2", time: "H1 — London Session" },
  { title: "NAS100", pips: "+340", lot: "0.01", profit: "₹1,020", method: "EMA 200 Bounce", rr: "1:4.1", time: "H4 — NY Session" },
  { title: "XAUUSD", pips: "+220", lot: "0.05", profit: "₹3,300", method: "Fib 61.8 + S/R Zone", rr: "1:3.7", time: "M15 — London Open" },
  { title: "XAUUSD", pips: "+155", lot: "0.02", profit: "₹930", method: "Inside Bar + EMA50", rr: "1:2.8", time: "H1 — Asian Session" },
  { title: "NAS100", pips: "+420", lot: "0.01", profit: "₹1,260", method: "Fib 61.8% Retracement", rr: "1:5.2", time: "H1 — NY Open" },
  { title: "XAUUSD", pips: "+198", lot: "0.03", profit: "₹1,782", method: "EMA + RSI Confluence", rr: "1:3.5", time: "M30 — London Session" },
]

const heights = [30, 50, 20, 70, 45, 85, 60, 90, 55, 75, 40, 65, 80, 50, 95]
const types = ["bull", "bear", "bull", "bull", "bear", "bull", "bull", "bull", "bear", "bull", "bear", "bull", "bull", "bear", "bull"]

export function Lightbox({ isOpen, onClose, tradeIndex }: LightboxProps) {
  const trade = tradeData[tradeIndex] || tradeData[0]

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[9000] flex items-center justify-center p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-[#141414] border border-[rgba(229,9,20,0.3)] max-w-[700px] w-full p-8 relative animate-[lbIn_0.3s_ease]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-transparent text-white/55 text-2xl font-rajdhani font-bold hover:text-[#E50914] transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <div className="font-oswald text-2xl font-bold uppercase mb-5">
          {trade.title} — <span className="text-[#E50914]">{trade.pips} PIPS</span>
        </div>

        {/* Chart */}
        <div className="bg-black border border-white/[0.06] p-5 h-[250px] flex items-end gap-1.5 mb-5 relative">
          {heights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0">
              <div className="w-[2px] bg-white/20" style={{ height: h * 0.2 }} />
              <div
                className="w-full rounded-[1px]"
                style={{
                  height: `${h}%`,
                  background: types[i] === "bull"
                    ? "linear-gradient(180deg, #fff, #aaa)"
                    : "linear-gradient(180deg, #f00, #800)",
                }}
              />
              <div className="w-[2px] bg-white/20" style={{ height: h * 0.1 }} />
            </div>
          ))}

          {/* TP Line */}
          <div className="absolute top-5 left-5 right-5 border-t border-dashed border-[rgba(229,9,20,0.8)] flex items-center justify-end">
            <span className="bg-[#E50914] text-white font-rajdhani font-bold text-[10px] tracking-[1px] px-2 py-0.5">
              TP HIT ✓
            </span>
          </div>

          {/* Info */}
          <div className="absolute bottom-3 left-3 font-rajdhani text-xs tracking-[1px] text-white/50">
            {trade.method} • {trade.time}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/[0.03] p-3.5 text-center border border-white/[0.06]">
            <div className="font-oswald text-2xl font-bold text-[#2ecc71]">{trade.pips}</div>
            <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Pips</div>
          </div>
          <div className="bg-white/[0.03] p-3.5 text-center border border-white/[0.06]">
            <div className="font-oswald text-2xl font-bold">{trade.lot}</div>
            <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Lot Size</div>
          </div>
          <div className="bg-white/[0.03] p-3.5 text-center border border-white/[0.06]">
            <div className="font-oswald text-2xl font-bold text-[#2ecc71]">{trade.profit}</div>
            <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Profit</div>
          </div>
          <div className="bg-white/[0.03] p-3.5 text-center border border-white/[0.06]">
            <div className="font-oswald text-lg font-bold">{trade.rr}</div>
            <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Risk/Reward</div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#how"
          onClick={onClose}
          className="bg-[#E50914] text-white font-rajdhani font-bold tracking-[2px] uppercase py-3.5 block text-center mt-5 hover:scale-[1.02] transition-transform"
          style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
        >
          JOIN TO GET THESE SIGNALS →
        </Link>
      </div>
    </div>
  )
}
