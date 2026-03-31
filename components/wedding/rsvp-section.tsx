"use client"

import { useLanguage } from "@/context/language-context"
import { useEffect, useRef, useState } from "react"
import { weddingImages } from "@/src/assets/wedding"

export function RSVPSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Decorative floral elements */}
      <div className="absolute top-0 -left-2 md:-left-3 w-32 h-32 opacity-30">
        <img
          src={weddingImages.floralLeft.src}
          alt=""
          width={weddingImages.floralLeft.width}
          height={weddingImages.floralLeft.height}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
        <img
          src={weddingImages.floralRight.src}
          alt=""
          width={weddingImages.floralRight.width}
          height={weddingImages.floralRight.height}
          className="h-full w-full object-contain"
        />
      </div>

      <div
        className={`max-w-xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-primary/30" />
          <svg
            className="w-6 h-6 text-primary/50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          {t("rsvpTitle")}
        </h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          {t("rsvpMessage")}
        </p>

        <a
          href="https://forms.gle/YBvgK7Gsu7KwsTTQ9"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-full text-foreground font-medium transition-all duration-300 hover:scale-105"
        >
          <span className="font-serif text-lg">{t("rsvpButton")}</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>

        {/* Additional decorative element */}
        <div className="mt-12 flex justify-center">
          <svg
            className="w-24 h-8 text-primary/20"
            viewBox="0 0 100 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M0 10 Q25 0 50 10 Q75 20 100 10" />
          </svg>
        </div>
      </div>
    </section>
  )
}

