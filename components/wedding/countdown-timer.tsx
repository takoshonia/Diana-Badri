"use client"

import { useLanguage } from "@/context/language-context"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { weddingImages } from "@/src/assets/wedding"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const translations = {
  ka: {
    days: "დღე",
    hours: "საათი",
    minutes: "წუთი",
    seconds: "წამი",
    countdown: "დრო ქორწილამდე",
  },
  ru: {
    days: "Дни",
    hours: "Часы",
    minutes: "Минуты",
    seconds: "Секунды",
    countdown: "Обратный отсчет до нашей свадьбы",
  },
}

export function CountdownTimer() {
  const { language } = useLanguage()
  const isGeorgian = language === "ka"
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setIsMounted(true)
    
    const calculateTimeLeft = (): TimeLeft => {
      const weddingDate = new Date("2026-04-19T12:00:00")
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
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
  }, [isMounted])

  const timeBlocks = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Decorative florals */}
      <div className="absolute top-40 right-0 w-32 md:top-44 md:w-48 opacity-40">
        <Image
          src={weddingImages.floralRight}
          alt=""
          className="object-contain"
        />
      </div>
      <div className="absolute top-40 -left-2 md:top-44 md:-left-3 w-32 md:w-48 opacity-40">
        <Image
          src={weddingImages.floralLeft}
          alt=""
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`reveal text-2xl md:text-3xl text-center mb-10 font-light text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
          {t.countdown}
        </h2>

        <div className="reveal flex justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-card rounded-lg shadow-sm border border-border flex items-center justify-center mb-2">
                <span className="text-2xl md:text-4xl font-light text-primary" suppressHydrationWarning>
                  {isMounted ? String(block.value).padStart(2, "0") : "--"}
                </span>
              </div>
              <span className={`text-xs md:text-sm text-muted-foreground uppercase tracking-wider ${isGeorgian ? 'font-georgian' : ''}`}>
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

