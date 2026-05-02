"use client"

import Link from "next/link"

const footerLinks = {
  quickLinks: [
    { href: "#why", label: "Why Us" },
    { href: "#markets", label: "Markets" },
    { href: "#results", label: "Results" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ],
  services: [
    { href: "#how", label: "Get Started" },
    { href: "#", label: "XAUUSD Signals" },
    { href: "#", label: "NASDAQ Signals" },
    { href: "#", label: "Mentorship" },
    { href: "#", label: "Prop Firm Prep" },
  ],
  contact: [
    { href: "#", label: "WhatsApp Us" },
    { href: "#", label: "Telegram Channel" },
    { href: "#", label: "Instagram" },
    { href: "#", label: "YouTube" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d] pt-[60px] pb-[30px] px-[5%] border-t border-[rgba(229,9,20,0.15)]">
      <div className="max-w-[1300px] mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px] lg:gap-[40px] mb-[50px]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-oswald text-2xl font-bold mb-4">
              <span className="text-[#E50914]">TP</span> HUNTERS
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-[280px]">
              Professional trading signals and mentorship for XAUUSD & NASDAQ 100. Real-time WhatsApp delivery. Transparent results. First trade covered.
            </p>
            <div className="flex gap-3 mt-5">
              {["📱", "💬", "📊", "▶️"].map((icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/[0.05] border border-white/10 flex items-center justify-center text-sm text-white/55 hover:border-[#E50914] hover:bg-[rgba(229,9,20,0.1)] hover:text-[#E50914] transition-all"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-rajdhani font-bold text-sm tracking-[2px] uppercase mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#E50914] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-rajdhani font-bold text-sm tracking-[2px] uppercase mb-5">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#E50914] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-rajdhani font-bold text-sm tracking-[2px] uppercase mb-5">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.contact.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#E50914] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-3">
          <div className="text-xs text-white/25">
            © 2025 TP Hunters. Trading involves risk. Past performance does not guarantee future results. Trade responsibly.
          </div>
          <div className="text-xs text-white/25">
            Privacy Policy • Terms of Service
          </div>
        </div>
      </div>
    </footer>
  )
}
