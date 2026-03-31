"use client"

import { useLanguage } from "@/context/language-context"
import { FloralBottomStrip } from "@/components/wedding/floral-bottom-strip"

export function FooterSection() {
  const { language, t } = useLanguage()
  const isGeorgian = language === "ka"

  return (
    <footer className="py-16 md:py-24 relative overflow-hidden bg-cream/50">
      <FloralBottomStrip className="opacity-70" heightClass="h-28 md:h-40" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className={`text-2xl md:text-3xl font-light mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("seeYou")}
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-border w-16" />
          <svg
            className="w-6 h-6 text-rose"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px bg-border w-16" />
        </div>

        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("bride")} <span className="text-primary italic mx-2">&</span> {t("groom")}
        </h2>
        
        <p className={`mt-8 text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("withLove")} ❤️
        </p>
        
        <p className="mt-4 text-sm text-muted-foreground">
          19 • 04 • 2026
        </p>
      </div>
    </footer>
  )
}
