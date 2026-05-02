"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const markets = [
  {
    name: "XAU/USD",
    subtitle: "Gold vs US Dollar",
    badge: "MOST ACTIVE",
    stats: [
      { value: "180+", label: "Avg Pips" },
      { value: "82%", label: "Win Rate" },
      { value: "Daily", label: "Signals" },
    ],
    footer: "Best time: London + NY Session",
    bars: [30, 50, 45, 65, 40, 80, 70, 90],
    types: ["bull", "bear", "bull", "bull", "bear", "bull", "bull", "bull"],
    direction: "left" as const,
  },
  {
    name: "NASDAQ 100",
    subtitle: "US100 / NDX Index",
    badge: "HIGH VOLUME",
    stats: [
      { value: "340+", label: "Avg Pips" },
      { value: "74%", label: "Win Rate" },
      { value: "Weekly", label: "Signals" },
    ],
    footer: "Best time: NY Session open",
    bars: [40, 55, 35, 70, 60, 45, 85, 95],
    types: ["bull", "bull", "bear", "bull", "bull", "bear", "bull", "bull"],
    direction: "right" as const,
  },
]

export function Markets() {
  return (
    <section id="markets" className="py-[100px] px-[5%] bg-[#0d0d0d]">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
            {"// Markets We Cover"}
          </span>
          <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-5 text-[clamp(2rem,4vw,3.5rem)]">
            TWO MARKETS. <span className="text-[#E50914]">MAXIMUM OPPORTUNITY.</span>
          </h2>
          <p className="text-base text-white/55 leading-relaxed max-w-[600px] mb-12">
            We focus exclusively on XAUUSD and NASDAQ 100 — the two highest-volume, highest-opportunity markets for retail traders in 2025.
          </p>
        </RevealOnScroll>

        {/* Market cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {markets.map((market, i) => (
            <RevealOnScroll key={i} direction={market.direction}>
              <div className="bg-black border border-[rgba(229,9,20,0.2)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(229,9,20,0.5)]">
                {/* Header */}
                <div
                  className="p-7 pb-5 flex items-center justify-between border-b border-[rgba(229,9,20,0.12)]"
                  style={{ background: "linear-gradient(135deg, rgba(229,9,20,0.08) 0%, transparent 60%)" }}
                >
                  <div>
                    <div className="font-oswald text-3xl font-bold">{market.name}</div>
                    <div className="text-xs text-white/55 tracking-[2px] uppercase mt-1">{market.subtitle}</div>
                  </div>
                  <div className="bg-[rgba(229,9,20,0.15)] text-[#E50914] font-rajdhani font-bold text-xs tracking-[2px] uppercase px-3.5 py-1.5 border border-[rgba(229,9,20,0.3)]">
                    {market.badge}
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  {/* Mini chart */}
                  <div className="flex items-end gap-[5px] h-20 mb-5">
                    {market.bars.map((height, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-[1px] transition-[height] duration-300"
                        style={{
                          height: `${height}%`,
                          background:
                            market.types[j] === "bull"
                              ? "linear-gradient(180deg, #fff, #aaa)"
                              : "linear-gradient(180deg, #f00, #800)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {market.stats.map((stat, j) => (
                      <div key={j} className="bg-white/[0.03] p-3 border border-white/[0.05]">
                        <div className="font-oswald text-xl text-[#E50914]">{stat.value}</div>
                        <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-7 py-5 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="text-sm text-white/55">{market.footer}</span>
                  <Link
                    href="/analysis"
                    className="bg-[#E50914] text-white font-rajdhani font-bold text-sm tracking-[2px] uppercase px-5 py-2.5 hover:scale-[1.04] transition-transform"
                    style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
                  >
                    JOIN →
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
