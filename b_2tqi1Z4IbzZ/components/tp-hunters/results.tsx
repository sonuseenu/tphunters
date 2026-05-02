"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

interface ResultsProps {
  onOpenLightbox: (index: number) => void
}

const trades = [
  {
    pair: "XAUUSD — H1",
    status: "CLOSED +TP",
    pips: "+185 pips",
    lot: "0.01 Lot = ₹555",
    symbol: "XAU/USD",
    candles: [
      { wickTop: 14, body: 22, wickBottom: 8, type: "bull" },
      { wickTop: 10, body: 30, wickBottom: 14, type: "bear" },
      { wickTop: 18, body: 45, wickBottom: 6, type: "bull" },
      { wickTop: 8, body: 58, wickBottom: 10, type: "bull" },
      { wickTop: 12, body: 40, wickBottom: 16, type: "bear" },
      { wickTop: 20, body: 70, wickBottom: 8, type: "bull" },
    ],
  },
  {
    pair: "NAS100 — H4",
    status: "CLOSED +TP",
    pips: "+340 pips",
    lot: "0.01 Lot = ₹1,020",
    symbol: "NAS100",
    candles: [
      { wickTop: 10, body: 35, wickBottom: 12, type: "bull" },
      { wickTop: 14, body: 50, wickBottom: 8, type: "bull" },
      { wickTop: 20, body: 28, wickBottom: 18, type: "bear" },
      { wickTop: 8, body: 65, wickBottom: 6, type: "bull" },
      { wickTop: 16, body: 72, wickBottom: 10, type: "bull" },
      { wickTop: 12, body: 55, wickBottom: 14, type: "bear" },
    ],
  },
  {
    pair: "XAUUSD — M15",
    status: "CLOSED +TP1+TP2",
    pips: "+220 pips",
    lot: "0.05 Lot = ₹3,300",
    symbol: "XAU/USD",
    candles: [
      { wickTop: 8, body: 40, wickBottom: 10, type: "bull" },
      { wickTop: 16, body: 22, wickBottom: 20, type: "bear" },
      { wickTop: 10, body: 60, wickBottom: 8, type: "bull" },
      { wickTop: 18, body: 75, wickBottom: 6, type: "bull" },
      { wickTop: 14, body: 65, wickBottom: 12, type: "bull" },
      { wickTop: 10, body: 80, wickBottom: 8, type: "bull" },
    ],
  },
  {
    pair: "XAUUSD — H1",
    status: "INSIDE BAR BUY",
    pips: "+155 pips",
    lot: "0.02 Lot = ₹930",
    symbol: "XAU/USD",
    candles: [
      { wickTop: 12, body: 50, wickBottom: 8, type: "bull" },
      { wickTop: 8, body: 25, wickBottom: 6, type: "bear" },
      { wickTop: 14, body: 68, wickBottom: 10, type: "bull" },
      { wickTop: 18, body: 80, wickBottom: 8, type: "bull" },
      { wickTop: 10, body: 60, wickBottom: 12, type: "bull" },
      { wickTop: 16, body: 45, wickBottom: 14, type: "bear" },
    ],
  },
  {
    pair: "NAS100 — H1",
    status: "FIB 61.8 BOUNCE",
    pips: "+420 pips",
    lot: "0.01 Lot = ₹1,260",
    symbol: "NAS100",
    candles: [
      { wickTop: 20, body: 35, wickBottom: 16, type: "bear" },
      { wickTop: 14, body: 55, wickBottom: 22, type: "bear" },
      { wickTop: 24, body: 20, wickBottom: 8, type: "bull" },
      { wickTop: 10, body: 62, wickBottom: 8, type: "bull" },
      { wickTop: 12, body: 78, wickBottom: 6, type: "bull" },
      { wickTop: 8, body: 85, wickBottom: 10, type: "bull" },
    ],
  },
  {
    pair: "XAUUSD — M30",
    status: "EMA+RSI SIGNAL",
    pips: "+198 pips",
    lot: "0.03 Lot = ₹1,782",
    symbol: "XAU/USD",
    candles: [
      { wickTop: 16, body: 42, wickBottom: 10, type: "bull" },
      { wickTop: 10, body: 58, wickBottom: 8, type: "bull" },
      { wickTop: 18, body: 32, wickBottom: 16, type: "bear" },
      { wickTop: 8, body: 70, wickBottom: 10, type: "bull" },
      { wickTop: 14, body: 76, wickBottom: 8, type: "bull" },
      { wickTop: 12, body: 88, wickBottom: 6, type: "bull" },
    ],
  },
]

export function Results({ onOpenLightbox }: ResultsProps) {
  return (
    <section id="results" className="py-[100px] px-[5%] bg-black">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-5 mb-12">
          <div>
            <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
              {"// Verified Results"}
            </span>
            <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-5 text-[clamp(2rem,4vw,3.5rem)]">
              REAL TRADES. <span className="text-[#E50914]">REAL PIPS.</span>
            </h2>
            <p className="text-base text-white/55 leading-relaxed max-w-[600px]">
              Click any screenshot to view full details. Every trade result is posted live in our channel.
            </p>
          </div>
          <Link
            href="/analysis"
            className="bg-[#E50914] text-white font-rajdhani font-bold tracking-[2px] uppercase px-8 py-3.5 flex-shrink-0 hover:scale-[1.04] transition-transform"
            style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
          >
            JOIN TO SEE ALL →
          </Link>
        </RevealOnScroll>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trades.map((trade, i) => (
            <RevealOnScroll key={i} delay={`${(i % 3 + 1) * 0.1}s`}>
              <div
                onClick={() => onOpenLightbox(i)}
                className="relative border border-[rgba(229,9,20,0.15)] aspect-[4/3] bg-[#141414] cursor-pointer hover:border-[#E50914] transition-colors group overflow-hidden"
              >
                {/* Trade screen */}
                <div className="absolute inset-0 flex flex-col p-3 overflow-hidden">
                  {/* Header */}
                  <div className="flex justify-between items-center text-[10px] tracking-[1px] text-white/55 mb-2">
                    <span>{trade.pair}</span>
                    <span className="text-[#2ecc71]">● {trade.status}</span>
                  </div>

                  {/* Chart */}
                  <div className="flex-1 flex items-end gap-[3px] py-1 relative">
                    {trade.candles.map((candle, j) => (
                      <div key={j} className="flex flex-col items-center gap-0 flex-1">
                        <div className="w-[1px] bg-white/20" style={{ height: candle.wickTop }} />
                        <div
                          className="w-full rounded-[1px]"
                          style={{
                            height: candle.body,
                            background:
                              candle.type === "bull"
                                ? "linear-gradient(180deg, #fff, #aaa)"
                                : "linear-gradient(180deg, #f00, #800)",
                          }}
                        />
                        <div className="w-[1px] bg-white/20" style={{ height: candle.wickBottom }} />
                      </div>
                    ))}
                    <div className="absolute top-2 right-0 bg-[rgba(229,9,20,0.8)] text-white text-[8px] font-rajdhani font-bold tracking-[1px] px-1.5 py-0.5">
                      TP ✓
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t border-white/[0.06] pt-2 mt-1">
                    <div>
                      <div className="font-oswald text-xl font-bold text-[#2ecc71]">{trade.pips}</div>
                      <div className="text-[9px] tracking-[1px] uppercase text-white/55">{trade.lot}</div>
                    </div>
                    <div className="font-rajdhani font-bold text-sm tracking-[1px]">{trade.symbol}</div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[rgba(229,9,20,0.85)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-9 h-9 fill-white" viewBox="0 0 24 24">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll className="text-center mt-10">
          <Link
            href="/analysis"
            className="bg-[#E50914] text-white font-rajdhani font-bold text-lg tracking-[2px] uppercase px-12 py-4 inline-block hover:scale-[1.04] transition-transform"
            style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
          >
            I WANT THESE SIGNALS →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
