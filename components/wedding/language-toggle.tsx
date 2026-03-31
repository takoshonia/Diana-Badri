"use client"

import { useLanguage } from "@/context/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-border">
      <button
        onClick={() => setLanguage("ka")}
        className={`px-3 py-1 rounded-full text-sm transition-all font-georgian ${
          language === "ka"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ქართ
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => setLanguage("ru")}
        className={`px-3 py-1 rounded-full text-sm transition-all ${
          language === "ru"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        РУС
      </button>
    </div>
  )
}
