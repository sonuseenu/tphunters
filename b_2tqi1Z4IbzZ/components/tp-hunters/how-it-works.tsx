"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const steps = [
  {
    num: "01",
    icon: "📋",
    title: "Complete Your Analysis",
    description: "Answer 8 quick questions about your trading experience, capital, and goals. Takes 2 minutes. This personalises your entire plan.",
    cta: { label: "START ANALYSIS →", href: "/analysis", primary: true },
  },
  {
    num: "02",
    icon: "📱",
    title: "Join Signal Channel",
    description: "Get added to your plan's private WhatsApp group. Signals arrive with full details — pair, entry, SL, TP, and reasoning.",
    cta: { label: "CONTACT US →", href: "#", primary: false },
  },
  {
    num: "03",
    icon: "💰",
    title: "Execute & Hit Your TPs",
    description: "Place the trade with your lot size, set SL & TP, and let the market do the work. Your first trade is covered — we hit TP first.",
    cta: { label: "SEE RESULTS →", href: "#results", primary: false },
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-[100px] px-[5%] bg-black relative">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-[600px] mx-auto mb-0">
          <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
            {"// How It Works"}
          </span>
          <h2 className="font-oswald font-bold uppercase leading-[1.05] text-[clamp(2rem,4vw,3.5rem)]">
            FROM <span className="text-[#E50914]">ZERO</span> TO FIRST TP IN 3 STEPS
          </h2>
        </RevealOnScroll>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mt-[60px] relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent" />

          {steps.map((step, i) => (
            <RevealOnScroll key={i} delay={`${(i + 1) * 0.1}s`}>
              <div className="p-10 text-center border border-white/[0.04] hover:bg-[rgba(229,9,20,0.04)] transition-colors">
                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>
                
                {/* Number circle */}
                <div className="w-[50px] h-[50px] rounded-full border-2 border-[#E50914] bg-[rgba(229,9,20,0.1)] flex items-center justify-center font-oswald text-xl font-bold text-[#E50914] mx-auto mb-6 relative z-[1]">
                  {step.num}
                </div>

                <h3 className="font-rajdhani font-bold text-xl tracking-[1px] uppercase mb-3">{step.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{step.description}</p>

                {/* CTA button */}
                <Link
                  href={step.cta.href}
                  className={`mt-5 inline-block font-rajdhani font-bold text-sm tracking-[2px] uppercase px-6 ${
                    step.cta.primary
                      ? "bg-[#E50914] text-white py-3 hover:scale-[1.04]"
                      : "bg-transparent text-white py-[11px] border border-white/25 hover:border-white"
                  } transition-all`}
                  style={step.cta.primary ? { clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" } : {}}
                >
                  {step.cta.label}
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
