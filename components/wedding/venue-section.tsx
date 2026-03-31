"use client"

import { useLanguage } from "@/context/language-context"
import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { FloralBottomStrip } from "@/components/wedding/floral-bottom-strip"
import { weddingImages } from "@/src/assets/wedding"

/** Grand Palace — same place as in the invitation (Google Maps). */
const GRAND_PALACE_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Grand+Palace/@42.2722775,42.6555532,18.62z/data=!4m6!3m5!1s0x405c8df4b27d7a6b:0xad7851cb62a6e309!8m2!3d42.2718572!4d42.6558217!16s%2Fg%2F11h714b2w4?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"

export function VenueSection() {
  const { language, t } = useLanguage()
  const isGeorgian = language === "ka"
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 }
    )

    const revealElements = sectionRef.current?.querySelectorAll(".reveal")
    revealElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-sage-light/20 relative overflow-hidden"
    >
      <FloralBottomStrip className="opacity-50" heightClass="h-24 md:h-32" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`reveal text-3xl md:text-4xl lg:text-5xl text-center mb-16 font-light ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("venue")}
        </h2>

        <div className="reveal max-w-2xl mx-auto text-center">
          <div className="bg-card p-8 md:p-12 rounded-lg shadow-sm border border-border">
            <div className="w-16 h-16 rounded-full bg-rose-light/50 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className={`text-2xl md:text-3xl font-medium mb-4 ${isGeorgian ? "font-georgian" : ""}`}>
              <a
                href={GRAND_PALACE_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit underline-offset-[6px] decoration-primary/35 hover:underline hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm transition-[text-decoration-color,box-shadow]"
                title={t("viewOnMap")}
              >
                {t("restaurantName")}
              </a>
            </h3>
            
            <p className={`text-lg text-muted-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}>
              {t("yourPresence")}
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border w-12" />
              <span className="text-primary text-lg">19.04.2026</span>
              <div className="h-px bg-border w-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
