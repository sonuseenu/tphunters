"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface RevealOnScrollProps {
  children: ReactNode
  direction?: "up" | "left" | "right"
  delay?: string
  className?: string
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = "0s",
  className = "",
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.12 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)"
    switch (direction) {
      case "left":
        return "translateX(-40px)"
      case "right":
        return "translateX(40px)"
      default:
        return "translateY(40px)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease, transform 0.8s ease`,
        transitionDelay: delay,
      }}
    >
      {children}
    </div>
  )
}
