"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const cards = [
  {
    num: "01",
    icon: "🎯",
    title: "Precision Entry Zones",
    description: "We use Fibonacci retracement, Support & Resistance, and EMA confluence to identify the exact zone. No guessing. No random levels.",
  },
  {
    num: "02",
    icon: "🛡️",
    title: "Risk-First Thinking",
    description: "Every signal comes with a Stop Loss. We protect your capital first. Profit follows discipline. Maximum 1-2% risk per trade.",
  },
  {
    num: "03",
    icon: "⚡",
    title: "Real-Time Delivery",
    description: "Signals hit your WhatsApp before the move. Not after. We track the setup hours in advance and alert you with time to react.",
  },
  {
    num: "04",
    icon: "📊",
    title: "Track Record You Can Verify",
    description: "Every signal result is posted publicly. Wins and losses. No cherry-picking. Our 78%+ win rate is transparent and documented.",
  },
  {
    num: "05",
    icon: "🧠",
    title: "Learn As You Earn",
    description: "We explain the 'why' behind every signal. After 30 days you won't just be following — you'll start reading the market yourself.",
  },
  {
    num: "06",
    icon: "🏆",
    title: "Prop Firm Ready",
    description: "Our strategies are designed to pass funded challenges. Low drawdown, consistent returns, strict daily loss rules. GFT, FTMO compatible.",
  },
]

export function WhyUs() {
  return (
    <section id="why" className="py-[100px] px-[5%] bg-[#0d0d0d]">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-[600px] mx-auto">
          <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
            {"// Why TP Hunters"}
          </span>
          <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-5 text-[clamp(2rem,4vw,3.5rem)]">
            EVERYTHING YOU NEED <span className="text-[#E50914]">IN ONE SIGNAL</span>
          </h2>
          <p className="text-base text-white/55 leading-relaxed">
            We don&apos;t just send entry prices. We send you a full plan — with the reasoning, the levels, and the management.
          </p>
        </RevealOnScroll>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[60px]">
          {cards.map((card, i) => (
            <RevealOnScroll key={i} delay={`${(i % 3 + 1) * 0.1}s`}>
              <div className="bg-black border border-white/[0.06] p-9 relative overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(229,9,20,0.4)] group h-full">
                {/* Number watermark */}
                <span className="absolute top-4 right-5 font-oswald text-[4rem] font-bold text-[rgba(229,9,20,0.12)] leading-none">
                  {card.num}
                </span>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E50914] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
                
                {/* Icon */}
                <div className="w-[54px] h-[54px] bg-[rgba(229,9,20,0.1)] border border-[rgba(229,9,20,0.25)] rounded-sm flex items-center justify-center text-2xl mb-5">
                  {card.icon}
                </div>
                
                <h3 className="font-rajdhani font-bold text-xl tracking-[1px] uppercase mb-3">{card.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{card.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll className="text-center mt-12">
          <Link
            href="/analysis"
            className="bg-[#E50914] text-white font-rajdhani font-bold text-lg tracking-[2px] uppercase px-12 py-[18px] inline-block hover:scale-[1.04] transition-transform"
            style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
          >
            GET MY FREE ANALYSIS →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
