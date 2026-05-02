"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@/components/tp-hunters/loader"
import { Navbar } from "@/components/tp-hunters/navbar"
import { Hero } from "@/components/tp-hunters/hero"
import { Ticker } from "@/components/tp-hunters/ticker"
import { Stats } from "@/components/tp-hunters/stats"
import { Problem } from "@/components/tp-hunters/problem"
import { WhyUs } from "@/components/tp-hunters/why-us"
import { HowItWorks } from "@/components/tp-hunters/how-it-works"
import { Markets } from "@/components/tp-hunters/markets"
import { Results } from "@/components/tp-hunters/results"
import { Reviews } from "@/components/tp-hunters/reviews"
import { TrustStrip } from "@/components/tp-hunters/trust-strip"
import { FAQ } from "@/components/tp-hunters/faq"
import { FinalCTA } from "@/components/tp-hunters/final-cta"
import { Footer } from "@/components/tp-hunters/footer"
import { WhatsAppFloat } from "@/components/tp-hunters/whatsapp-float"
import { Lightbox } from "@/components/tp-hunters/lightbox"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <Hero />
        <Ticker />
        <Stats />
        <Problem />
        <WhyUs />
        <HowItWorks />
        <Markets />
        <Results onOpenLightbox={openLightbox} />
        <Reviews />
        <TrustStrip />
        <FAQ />
        <FinalCTA />
        <Footer />
        <WhatsAppFloat />
      </div>

      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        tradeIndex={lightboxIndex}
      />
    </>
  )
}
