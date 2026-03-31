"use client"

import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { weddingImages } from "@/src/assets/wedding"

export function HeroSection() {
  const { language, t } = useLanguage()
  const isGeorgian = language === "ka"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Top center floral */}
      <div className="absolute top-0 left-1/2 h-32 w-72 -translate-x-1/2 overflow-hidden opacity-90 sm:h-36 sm:w-80 md:h-40 md:w-[26rem]">
        <Image
          src={weddingImages.floralTop}
          alt=""
          className="h-full w-full object-cover object-center"
          priority
          loading="eager"
        />
      </div>
      <div className="absolute bottom-0 -left-2 md:-left-3 w-48 md:w-64 lg:w-80 opacity-80">
        <Image
          src={weddingImages.floralLeft}
          alt=""
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-48 md:w-64 lg:w-80 opacity-80">
        <Image
          src={weddingImages.floralRight}
          alt=""
          className="object-contain"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-wide ${isGeorgian ? 'font-georgian' : ''}`}>
            {t("bride")}
          </h1>
          <p className="text-3xl md:text-4xl text-primary my-4 italic">
            {t("and")}
          </p>
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-wide ${isGeorgian ? 'font-georgian' : ''}`}>
            {t("groom")}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8 my-10">
          <div className="h-px bg-border w-16 md:w-24" />
          <div className="text-center">
            <p className={`text-lg uppercase tracking-wider ${isGeorgian ? 'font-georgian' : ''}`}>
              {t("april")}
            </p>
            <p className="text-6xl md:text-7xl font-light my-2">19</p>
            <p className="text-lg uppercase tracking-wider">{t("year")}</p>
          </div>
          <div className="h-px bg-border w-16 md:w-24" />
        </div>

        <p className={`text-lg md:text-xl text-muted-foreground max-w-md mx-auto ${isGeorgian ? 'font-georgian' : ''}`}>
          {t("joyfullyInvite")}
          <br />
          {t("toOurWedding")}
        </p>

      </div>
    </section>
  )
}

