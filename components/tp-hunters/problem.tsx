"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const problems = [
  {
    icon: "📉",
    title: "No Real Entry System",
    description: "Entering based on gut, YouTube, or random indicators. Every trade feels like a gamble because it is.",
  },
  {
    icon: "😰",
    title: "Emotions Destroy Discipline",
    description: "You cut profits early and hold losses longer than you should. Fear and greed run your account — not logic.",
  },
  {
    icon: "💸",
    title: "No Risk Management",
    description: "One bad trade wipes out weeks of work. Proper lot sizing and SL placement can change everything overnight.",
  },
]

const differences = [
  "Clear Entry, SL and TP on every signal",
  "Real-time WhatsApp delivery",
  "First trade covered — hit TP or refund",
  "0.01 lot friendly — start with any capital",
  "Prop firm challenge strategies",
]

export function Problem() {
  return (
    <section id="problem" className="py-[100px] px-[5%] bg-black relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute -right-[200px] -top-[200px] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(229,9,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <RevealOnScroll direction="left">
            <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
              {"// The Hard Truth"}
            </span>
            <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-5 text-[clamp(2rem,3.5vw,3rem)]">
              WHY 90% OF TRADERS <span className="text-[#E50914]">NEVER MAKE MONEY</span>
            </h2>
            <p className="text-base text-white/55 leading-relaxed max-w-[600px] mb-12">
              It&apos;s not your broker. It&apos;s not bad luck. It&apos;s the missing pieces nobody tells you about when you start.
            </p>

            <div className="flex flex-col gap-5 mb-10">
              {problems.map((problem, i) => (
                <RevealOnScroll key={i} delay={`${(i + 1) * 0.1}s`}>
                  <div className="flex gap-4 items-start p-5 bg-[rgba(229,9,20,0.04)] border border-[rgba(229,9,20,0.12)] border-l-[3px] border-l-[#E50914] hover:bg-[rgba(229,9,20,0.08)] transition-colors">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{problem.icon}</span>
                    <div>
                      <h4 className="font-rajdhani font-bold text-lg tracking-[1px] uppercase mb-1">{problem.title}</h4>
                      <p className="text-sm text-white/55 leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <Link
              href="/analysis"
              className="bg-[#E50914] text-white font-rajdhani font-bold text-base tracking-[2px] uppercase px-9 py-4 inline-block hover:scale-[1.04] transition-transform"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              FIX MY TRADING NOW →
            </Link>
          </RevealOnScroll>

          {/* Right */}
          <RevealOnScroll direction="right">
            {/* Quote block */}
            <div className="bg-[#141414] border border-[rgba(229,9,20,0.2)] p-10 relative">
              <span
                className="absolute -top-5 left-5 font-oswald text-[8rem] leading-none font-bold text-[rgba(229,9,20,0.15)]"
              >
                &quot;
              </span>
              <p className="font-oswald text-[1.8rem] font-semibold leading-[1.3] uppercase relative z-[1]">
                &quot;Most traders don&apos;t need more indicators. They need{" "}
                <em className="text-[#E50914] not-italic">someone who actually hits TPs</em> to show them how it&apos;s done.&quot;
              </p>
              <div className="mt-5 text-sm text-white/55 pt-4 border-t border-white/[0.08]">
                — TP Hunters Analyst Team &nbsp;|&nbsp; 3+ Years Live Trading
              </div>
            </div>

            {/* Difference block */}
            <div className="mt-5 bg-[#141414] border border-[rgba(229,9,20,0.15)] p-7">
              <div className="font-rajdhani font-bold text-base tracking-[2px] uppercase text-[#E50914] mb-4">
                THE TP HUNTERS DIFFERENCE
              </div>
              <div className="flex flex-col gap-3">
                {differences.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="text-[#E50914] text-lg">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
