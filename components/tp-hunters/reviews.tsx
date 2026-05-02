"use client"

import Link from "next/link"
import { RevealOnScroll } from "./reveal-on-scroll"

const reviews = [
  {
    stars: 5,
    profit: "+₹4,200 THIS MONTH",
    text: "I was down ₹28,000 before joining TP Hunters. Within 3 weeks I recovered <strong>₹18,000</strong> just by following the XAUUSD signals. The best part is they explain every trade — I'm actually learning.",
    initials: "RK",
    name: "Rahul K.",
    meta: "Mumbai • Starter Hunter • 2 months",
  },
  {
    stars: 5,
    profit: "+₹11,500 THIS MONTH",
    text: "The NASDAQ signals are 🔥. Hit <strong>+420 pips</strong> last week alone. The signal comes with full reasoning so I know what I'm doing, not just copy-trading blindly.",
    initials: "AS",
    name: "Ankit S.",
    meta: "Delhi • Pro Hunter • 4 months",
  },
  {
    stars: 5,
    profit: "PROP CHALLENGE PASSED ✓",
    text: "Used the Elite Hunter plan to prepare for my GFT prop challenge. Their strategies are literally designed for this. <strong>Passed ₹1,00,000 funded account</strong> in 18 days. Insane.",
    initials: "PV",
    name: "Priya V.",
    meta: "Bengaluru • Elite Hunter • 6 months",
  },
  {
    stars: 5,
    profit: "+₹6,800 THIS MONTH",
    text: "Started with just ₹500 plan, 0.01 lot. Made back the subscription cost in the <strong>first single trade</strong>. Now I'm on Pro plan. Best investment I made for my trading.",
    initials: "MK",
    name: "Mohammed K.",
    meta: "Hyderabad • Pro Hunter • 3 months",
  },
  {
    stars: 4,
    profit: "+₹3,100 THIS MONTH",
    text: "I had tried 3 other signal providers before. All were scams. TP Hunters is the real deal — they post their losses too, not just wins. <strong>Transparency is 10/10.</strong>",
    initials: "SR",
    name: "Sanjay R.",
    meta: "Pune • Starter Hunter • 1 month",
  },
  {
    stars: 5,
    profit: "+₹9,400 THIS MONTH",
    text: "The WhatsApp signal quality is top-notch. Entry, SL, TP, timeframe, reasoning — everything. I barely spend 20 mins a day trading now. <strong>My account is up 34% in 2 months.</strong>",
    initials: "DT",
    name: "Deepak T.",
    meta: "Chennai • Pro Hunter • 2 months",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-[100px] px-[5%] bg-[#0d0d0d]">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center max-w-[600px] mx-auto">
          <span className="text-[11px] tracking-[4px] uppercase text-[#E50914] mb-4 block">
            {"// Member Reviews"}
          </span>
          <h2 className="font-oswald font-bold uppercase leading-[1.05] mb-5 text-[clamp(2rem,4vw,3.5rem)]">
            WHAT OUR <span className="text-[#E50914]">HUNTERS SAY</span>
          </h2>
          <p className="text-base text-white/55 leading-relaxed">
            Real members. Real results. No fake testimonials.
          </p>
        </RevealOnScroll>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[50px]">
          {reviews.map((review, i) => (
            <RevealOnScroll key={i} delay={`${(i % 3 + 1) * 0.1}s`}>
              <div className="bg-black border border-white/[0.06] p-7 relative overflow-hidden transition-all duration-300 hover:border-[rgba(229,9,20,0.35)] hover:-translate-y-1">
                {/* Quote mark */}
                <span className="absolute -top-2.5 right-4 font-oswald text-[6rem] leading-none font-bold text-[rgba(229,9,20,0.08)]">
                  &quot;
                </span>

                {/* Stars */}
                <div className="text-[#E50914] text-base tracking-[2px] mb-3.5">
                  {"★".repeat(review.stars)}
                  {"☆".repeat(5 - review.stars)}
                </div>

                {/* Profit badge */}
                <div className="inline-block bg-[rgba(46,204,113,0.1)] text-[#2ecc71] font-rajdhani font-bold text-sm tracking-[2px] uppercase px-3 py-1 border border-[rgba(46,204,113,0.2)] mb-4">
                  {review.profit}
                </div>

                {/* Text */}
                <div
                  className="text-sm text-white/75 leading-relaxed mb-5 pb-5 border-b border-white/[0.06]"
                  dangerouslySetInnerHTML={{ __html: review.text }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(229,9,20,0.2)] border-2 border-[rgba(229,9,20,0.4)] flex items-center justify-center font-oswald font-bold text-[#E50914] flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-rajdhani font-bold text-[0.95rem] tracking-[1px]">{review.name}</div>
                    <div className="text-xs text-white/55">{review.meta}</div>
                  </div>
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
            I WANT RESULTS LIKE THESE →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
