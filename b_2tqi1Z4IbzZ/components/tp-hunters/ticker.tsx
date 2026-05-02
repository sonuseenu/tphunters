"use client"

export function Ticker() {
  const items = [
    "📈 XAUUSD +180 PIPS",
    "🎯 NASDAQ +340 PIPS",
    "✅ 0.01 LOT → ₹500+ FIRST TRADE",
    "📊 WIN RATE 78.4%",
    "🏆 1,200+ ACTIVE MEMBERS",
    "💰 PROP FIRM STRATEGIES INCLUDED",
    "⚡ REAL-TIME WHATSAPP SIGNALS",
  ]

  return (
    <div className="bg-[#E50914] py-3 overflow-hidden">
      <div
        className="flex w-max animate-[tickerRoll_20s_linear_infinite] hover:[animation-play-state:paused]"
      >
        {/* Double the items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-7 font-rajdhani font-bold text-[0.95rem] tracking-[1px] whitespace-nowrap">
              {item}
            </span>
            <span className="text-white/50">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
