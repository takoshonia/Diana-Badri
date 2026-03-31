"use client"

import { useLanguage } from "@/context/language-context"
import { useEffect, useRef } from "react"
import { Church, Camera, PartyPopper, FileSignature } from "lucide-react"
import { FloralBottomStrip } from "@/components/wedding/floral-bottom-strip"

const CHURCH_MAPS_URL =
  "https://www.google.com/maps/place/%E1%83%93%E1%83%94%E1%83%93%E1%83%90%E1%83%A6%E1%83%95%E1%83%97%E1%83%98%E1%83%A1%E1%83%90%E1%83%A1+%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%90%E1%83%A1%E1%83%A2%E1%83%94%E1%83%A0%E1%83%98/@42.302058,42.7848229,17z/data=!3m1!4b1!4m6!3m5!1s0x405c8e8a7f6dd0e5:0x3afe03733bc33ecb!8m2!3d42.302058!4d42.7848229!16s%2Fg%2F11dyzh0qhs!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"
const PHOTOSHOOT_MORNING_MAPS_URL =
  "https://www.google.com/maps?q=6+Jacob+Gogebashvili+Street,+Kutaisi+4600&ftid=0x405c8cfa5ee3f223:0x10a07a0bedbbed94&entry=gps&shh=CAE&lucs=,94297699,94284490,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjEyLjIuODg0NjExMjE2MBgAIIgnKkgsOTQyOTc2OTksOTQyODQ0OTAsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkdF&skid=051e29bf-8ea2-4a58-8557-04157db92a05&g_st=ifm"
const PHOTOSHOOT_EVENING_MAPS_URL =
  "https://www.google.com/maps?q=Legends+Tskaltubo+Spa+Resort,+23+Rustaveli+Street,+Tskaltubo+5400&ftid=0x405c8a8be564408d:0x9f382ece4fdc14ec&entry=gps&shh=CAE&lucs=,94297699,94284490,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjEyLjIuODg0NjExMjE2MBgAIIgnKkgsOTQyOTc2OTksOTQyODQ0OTAsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkdF&skid=7a914fc9-0043-4f36-8155-777be67ea4a2&g_st=ifm"
const GRAND_PALACE_MAPS_URL =
  "https://www.google.com/maps/place/Grand+Palace/@42.2722775,42.6555532,18.62z/data=!4m6!3m5!1s0x405c8df4b27d7a6b:0xad7851cb62a6e309!8m2!3d42.2718572!4d42.6558217!16s%2Fg%2F11h714b2w4?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"

const scheduleItems = [
  {
    time: "11:00",
    titleKey: "photoshootMorning",
    venueKey: "photoshootMorningVenue",
    icon: Camera,
    mapUrl: PHOTOSHOOT_MORNING_MAPS_URL,
  },
  {
    time: "14:00",
    titleKey: "churchCeremony",
    venueKey: "churchCeremonyVenue",
    icon: Church,
    mapUrl: CHURCH_MAPS_URL,
  },
  {
    time: "16:00",
    titleKey: "photoshootEvening",
    venueKey: "photoshootEveningVenue",
    icon: Camera,
    mapUrl: PHOTOSHOOT_EVENING_MAPS_URL,
  },
  {
    time: "18:30",
    titleKey: "signingCeremony",
    venueKey: "signingCeremonyVenue",
    icon: FileSignature,
    mapUrl: GRAND_PALACE_MAPS_URL,
  },
  {
    time: "19:00",
    titleKey: "celebration",
    venueKey: "celebrationVenue",
    icon: PartyPopper,
    mapUrl: GRAND_PALACE_MAPS_URL,
  },
]

export function ScheduleSection() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    const revealElements = sectionRef.current?.querySelectorAll(".reveal")
    revealElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <FloralBottomStrip className="opacity-50" heightClass="h-24 md:h-32" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`reveal text-3xl md:text-4xl lg:text-5xl text-center mb-16 font-light ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("schedule")}
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

            {scheduleItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`reveal relative flex items-center mb-12 last:mb-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 shadow-sm" />

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <a
                      href={item.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}>
                        <div className="w-10 h-10 rounded-full bg-rose-light/50 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-2xl font-light text-primary">
                          {item.time}
                        </span>
                      </div>
                      <h3 className={`text-xl font-medium mb-1 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {t(item.titleKey)}
                      </h3>
                      <p className={`text-muted-foreground ${isGeorgian ? "font-georgian" : ""}`}>
                        {t(item.venueKey)}
                      </p>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
