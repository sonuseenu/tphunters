"use client"

import { RevealOnScroll } from "./reveal-on-scroll"

const items = [
  { icon: "🏦", label: "Works With MT4 / MT5" },
  { icon: "🔒", label: "100% Transparent Results" },
  { icon: "⚡", label: "Real-Time WhatsApp Alerts" },
  { icon: "🌐", label: "Trade From Anywhere In India" },
  { icon: "🏆", label: "Prop Firm Compatible" },
]

export function TrustStrip() {
  return (
    <section id="trust" className="py-[60px] px-[5%] bg-black border-y border-[rgba(229,9,20,0.1)]">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-6">
        {items.map((item, i) => (
          <RevealOnScroll key={i} delay={`${i * 0.1}s`}>
            <div className="flex items-center gap-3 font-rajdhani font-semibold text-sm tracking-[1px] uppercase text-white/55">
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
