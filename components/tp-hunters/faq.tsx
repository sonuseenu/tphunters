"use client"

import { useState } from "react"
import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const faqs = [
  {
    question: "Do I need prior trading experience?",
    answer: "No experience needed for the Starter plan. We provide entry, SL and TP — you just execute. For Elite plan, basic knowledge helps but isn't required.",
  },
  {
    question: "How much capital do I need to start?",
    answer: "You can start with as little as ₹5,000–₹10,000. At 0.01 lot size, our typical 50+ pip signals translate to ₹150–₹600 per trade. The ₹500 subscription pays for itself in one trade.",
  },
  {
    question: 'What does "first trade covered" mean?',
    answer: "We guarantee your first signal after joining will hit TP. If for any reason it doesn't hit TP and hits SL instead, we refund your subscription fee. Simple.",
  },
  {
    question: "Which broker should I use?",
    answer: "Any broker that offers MT4/MT5 and supports XAUUSD and NAS100. We recommend brokers with tight spreads on gold — we can guide you during onboarding.",
  },
  {
    question: "How many signals per day/week?",
    answer: "We follow a strict 1–2 trades per day maximum philosophy. Quality over quantity. We wait for A+ setups — not random signals. Some days there may be no signal if the market isn't clean.",
  },
  {
    question: "Can I use this for prop firm challenges?",
    answer: "Absolutely. Our Pro and Elite plans are specifically optimised for GFT, FTMO, and similar prop firm challenges. Low daily drawdown, consistent win rate — exactly what evaluators look for.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-[100px] px-[5%] bg-[#0d0d0d]">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          {/* Left - FAQ List */}
          <div>
            <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
              {"// FAQ"}
            </span>
            <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-9 text-[clamp(2rem,4vw,3.5rem)]">
              COMMON <span className="text-[#E50914]">QUESTIONS</span>
            </h2>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-black border border-white/[0.06] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center px-5 py-[18px] font-rajdhani font-semibold text-base tracking-[0.5px] hover:text-[#E50914] transition-colors text-left"
                  >
                    {faq.question}
                    <span
                      className={`w-6 h-6 flex-shrink-0 border border-[rgba(229,9,20,0.4)] rounded-full flex items-center justify-center text-sm text-[#E50914] transition-transform duration-300 ${
                        openIndex === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      openIndex === i ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <div
                      className={`text-sm text-white/55 leading-relaxed px-5 ${
                        openIndex === i ? "pb-[18px] pt-3.5 border-t border-[rgba(229,9,20,0.15)]" : ""
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - CTA Block */}
          <div>
            <RevealOnScroll direction="right">
              <div className="bg-black border border-[rgba(229,9,20,0.25)] p-10 text-center">
                <h3 className="font-oswald text-2xl font-bold uppercase mb-4">
                  STILL HAVE <span className="text-[#E50914]">QUESTIONS?</span>
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-7">
                  Our team is available 9 AM – 11 PM IST on WhatsApp. Message us directly — we respond within 2 hours. Or start your free analysis and we&apos;ll reach out to you.
                </p>
                <Link
                  href="#how"
                  className="bg-[#E50914] text-white font-rajdhani font-bold tracking-[2px] uppercase px-6 py-4 block text-center mb-3 hover:scale-[1.02] transition-transform"
                  style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
                >
                  START FREE ANALYSIS →
                </Link>
                <Link
                  href="#"
                  className="bg-transparent text-white font-rajdhani font-bold tracking-[2px] uppercase px-6 py-[15px] block text-center border border-white/25 hover:border-white transition-colors"
                >
                  WHATSAPP US →
                </Link>
              </div>
            </RevealOnScroll>

            {/* Stats box */}
            <RevealOnScroll direction="right" delay="0.2s">
              <div className="mt-5 bg-black border border-[rgba(229,9,20,0.2)] p-6">
                <div className="font-rajdhani font-bold text-sm tracking-[2px] text-[#E50914] uppercase mb-4">
                  THIS MONTH&apos;S STATS
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center bg-[rgba(229,9,20,0.05)] p-4">
                    <div className="font-oswald text-3xl font-bold text-[#E50914]">14/18</div>
                    <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Trades Won</div>
                  </div>
                  <div className="text-center bg-[rgba(229,9,20,0.05)] p-4">
                    <div className="font-oswald text-3xl font-bold text-[#E50914]">+2,840</div>
                    <div className="text-[9px] tracking-[2px] uppercase text-white/55 mt-1">Total Pips</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
