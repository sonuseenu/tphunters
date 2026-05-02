"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#why", label: "Why Us" },
    { href: "#markets", label: "Markets" },
    { href: "#results", label: "Results" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] px-[5%] h-[72px] flex items-center justify-between transition-all duration-400 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-[20px] border-b border-[rgba(229,9,20,0.15)]"
            : "bg-transparent"
        }`}
      >
        <Link href="#" className="font-oswald text-2xl font-bold tracking-[3px] uppercase">
          <span className="text-[#E50914]">TP</span> HUNTERS
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-rajdhani font-semibold text-sm tracking-[2px] uppercase text-white/70 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E50914] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <Link
          href="/analysis"
          className="hidden lg:inline-block bg-[#E50914] text-white font-rajdhani font-bold text-sm tracking-[2px] uppercase px-6 py-2.5 hover:bg-[#ff2020] hover:scale-[1.03] transition-all"
          style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
        >
          START NOW →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/97 z-[990] flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-oswald text-3xl tracking-[4px] uppercase hover:text-[#E50914] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/analysis"
          onClick={() => setMobileMenuOpen(false)}
          className="bg-[#E50914] text-white font-rajdhani font-bold text-lg tracking-[2px] uppercase px-12 py-4 mt-3 hover:bg-[#ff2020] transition-all"
        >
          START NOW →
        </Link>
      </div>
    </>
  )
}
