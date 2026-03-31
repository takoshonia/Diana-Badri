"use client"

import { useEffect, useState, useRef } from "react"

interface Petal {
  id: number
  left: number
  size: number
  color: string
  startY: number
}

const petalColors = [
  "bg-pink-200",
  "bg-rose-200",
  "bg-amber-100",
  "bg-pink-100",
  "bg-rose-100",
]

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [windowHeight, setWindowHeight] = useState(1000)
  const [isMounted, setIsMounted] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
    setWindowHeight(window.innerHeight)
    
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 12,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      startY: Math.random() * 100,
    }))
    setPetals(newPetals)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isMounted])

  // Don't render anything on server
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => {
        const yOffset = (scrollY * 0.3 + petal.startY * 20) % windowHeight
        const xOffset = Math.sin((scrollY * 0.01) + petal.id) * 20
        
        return (
          <div
            key={petal.id}
            className={`absolute ${petal.color} transition-all duration-300 ease-out`}
            style={{
              left: `calc(${petal.left}% + ${xOffset}px)`,
              top: `${yOffset}px`,
              width: `${petal.size}px`,
              height: `${petal.size * 0.6}px`,
              borderRadius: "50% 0 50% 0",
              opacity: isScrolling ? 0.7 : 0,
              transform: `rotate(${(scrollY * 0.5 + petal.id * 30) % 360}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}
