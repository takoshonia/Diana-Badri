"use client"

import { LanguageProvider } from "@/context/language-context"
import { LanguageToggle } from "@/components/wedding/language-toggle"
import { FloatingPetals } from "@/components/wedding/floating-petals"
import { HeroSection } from "@/components/wedding/hero-section"
import { CountdownTimer } from "@/components/wedding/countdown-timer"
import { CoupleGallery } from "@/components/wedding/couple-gallery"
import { ScheduleSection } from "@/components/wedding/schedule-section"
import { VenueSection } from "@/components/wedding/venue-section"
import { RSVPSection } from "@/components/wedding/rsvp-section"
import { FooterSection } from "@/components/wedding/footer-section"

export default function WeddingInvitation() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-background">
        {/* Low z-index so corner florals & section art stay visible above this layer */}
        <FloatingPetals />
        <div className="relative z-10">
          <LanguageToggle />
          <HeroSection />
          <CountdownTimer />
          <CoupleGallery />
          <ScheduleSection />
          <VenueSection />
          <RSVPSection />
          <FooterSection />
        </div>
      </main>
    </LanguageProvider>
  )
}
