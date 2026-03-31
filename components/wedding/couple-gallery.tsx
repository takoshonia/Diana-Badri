"use client"

import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { weddingImages } from "@/src/assets/wedding"

export function CoupleGallery() {
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
      className="py-20 md:py-32 bg-cream/30 relative overflow-hidden"
    >
      {/* Decorative floral elements */}
      <div className="absolute top-10 -left-2 md:-left-3 w-32 md:w-48 opacity-60">
        <Image
          src={weddingImages.floralLeft}
          alt=""
          className="object-contain"
        />
      </div>
      <div className="absolute top-10 right-0 w-32 md:w-48 opacity-60">
        <Image
          src={weddingImages.floralRight}
          alt=""
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4">
        <h2 className={`reveal text-3xl md:text-4xl lg:text-5xl text-center mb-16 font-light ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("ourStory")}
        </h2>

        <div className="flex justify-center max-w-2xl mx-auto">
          {/* Single image */}
          <div className="reveal relative group w-full">
            <div className="absolute inset-0 bg-rose-light/20 rounded-lg transform rotate-2 transition-transform group-hover:rotate-4" />
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={weddingImages.couple1}
                alt="Diana and Badri"
                className="object-cover w-full h-[450px] md:h-[600px] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

