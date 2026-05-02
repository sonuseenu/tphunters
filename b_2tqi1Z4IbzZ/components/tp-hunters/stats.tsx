"use client"

import { useEffect, useRef, useState } from "react"

interface StatBoxProps {
  target: number
  prefix?: string
  suffix?: string
  label: string
  delay?: string
}

function StatBox({ target, prefix = "", suffix = "", label, delay = "0s" }: StatBoxProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let current = 0
    const step = target / 60
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setCount(Math.floor(current))
    }, 25)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <div
      ref={ref}
      className="bg-black p-10 text-center relative overflow-hidden border border-white/[0.04] transition-[border-color] duration-300 hover:border-[rgba(229,9,20,0.4)] group"
      style={{ transitionDelay: delay }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
      <span className="font-oswald text-5xl font-bold text-[#E50914] block leading-none">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-xs tracking-[3px] uppercase text-white/55 mt-2 block">{label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section id="stats" className="py-[70px] px-[5%] bg-[#0d0d0d]">
      <div className="max-w-[1300px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[2px]">
        <StatBox target={1200} label="Active Members" />
        <StatBox target={78} suffix="%" label="Win Rate" delay="0.1s" />
        <StatBox target={50} suffix=" Pips" label="Avg Per Signal" delay="0.2s" />
        <StatBox target={500} prefix="₹" label="Entry Package" delay="0.3s" />
      </div>
    </section>
  )
}
