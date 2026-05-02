"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

export function FinalCTA() {
  return (
    <section id="cta-final" className="py-[120px] px-[5%] bg-black relative overflow-hidden text-center">
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,9,20,0.1) 0%, transparent 70%)",
        }}
      />

      <RevealOnScroll className="relative z-[1] max-w-[800px] mx-auto">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 border border-[rgba(229,9,20,0.4)] px-4 py-1.5 rounded-full text-[11px] tracking-[3px] uppercase text-[#E50914] mb-6 mx-auto">
          <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-[dotBlink_1s_infinite_alternate]" />
          LIMITED SPOTS AVAILABLE THIS MONTH
        </div>

        {/* Heading */}
        <h2 className="font-oswald font-bold leading-[0.95] uppercase mb-6 text-[clamp(3rem,6vw,6rem)]">
          <span className="block">YOUR NEXT TP</span>
          <span
            className="block text-transparent"
            style={{
              WebkitTextStroke: "2px #E50914",
              filter: "drop-shadow(0 0 30px rgba(229,9,20,0.4))",
            }}
          >
            IS WAITING.
          </span>
        </h2>

        {/* Text */}
        <p className="text-lg text-white/55 leading-relaxed mb-10">
          Stop wasting time watching YouTube videos and reading forums. We&apos;ve done the work. The setups are ready. All you need to do is take the first step.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/analysis"
            className="bg-[#E50914] text-white font-rajdhani font-bold text-lg tracking-[2px] uppercase px-12 py-[18px] hover:scale-[1.04] transition-transform inline-block"
            style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
          >
            START MY FREE ANALYSIS →
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/15 text-white font-rajdhani font-bold text-base tracking-[2px] uppercase px-8 py-4 hover:border-white/40 hover:bg-white/10 transition-all"
          >
            💬 WHATSAPP US NOW
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-9 flex justify-center gap-8 flex-wrap opacity-50 text-xs tracking-[2px] uppercase">
          <span>✓ No Setup Fee</span>
          <span>✓ Cancel Anytime</span>
          <span>✓ First Trade Covered</span>
          <span>✓ Real Signals</span>
        </div>
      </RevealOnScroll>
    </section>
  )
}
