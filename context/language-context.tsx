"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "ka" | "ru"

const STORAGE_KEY = "wedding-invite-lang"

function readStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === "ka" || raw === "ru") return raw
  } catch {
    /* ignore */
  }
  return null
}

interface Translations {
  ka: Record<string, string>
  ru: Record<string, string>
}

const translations: Translations = {
  ka: {
    // Hero
    wedding: "ქორწილი",
    weddingInvitation: "საქორწილო მოსაწვევი",
    saveTheDate: "დაიმახსოვრეთ თარიღი",
    april: "აპრილი",
    year: "2026",
    and: "&",
    
    // Names
    bride: "დიანა",
    groom: "ბადრი",
    
    // Invitation text
    joyfullyInvite: "სიხარულით გიწვევთ",
    toOurWedding: "ჩვენს ქორწილში",
    yourPresence: "თქვენი სტუმრობა დიდი პატივი იქნება ჩვენთვის",
    
    // Schedule
    schedule: "დღის წესრიგი",
    photoshootMorning: "ფოტოსესია",
    photoshootMorningVenue: "N.P. Gallery",
    churchCeremony: "ჯვრისწერა",
    churchCeremonyVenue: "დედაღვთისას მონასტერი",
    photoshootEvening: "ფოტოსესია",
    photoshootEveningVenue: "Legends Tskaltubo Spa Resort",
    signingCeremony: "ხელის მოწერის ცერემონია",
    signingCeremonyVenue: "გრანდ პალასი",
    celebration: "საქორწილო სუფრა",
    celebrationVenue: "გრანდ პალასი",
    
    // Venue
    venue: "ადგილმდებარეობა",
    restaurantName: "რესტორანი გრანდ პალასი",
    viewOnMap: "გახსენით Google Maps-ში",
    
    // Gallery
    ourStory: " ",
    
    // RSVP
    rsvp: "დადასტურება",
    confirmAttendance: "გთხოვთ დაადასტუროთ თქვენი დასწრება",
    rsvpTitle: "დაადასტურეთ დასწრება",
    rsvpMessage: "გთხოვთ შეავსოთ ფორმა და დაადასტუროთ თქვენი დასწრება ჩვენს ქორწილში.",
    rsvpButton: "დასწრების დადასტურება",
    
    // Footer
    seeYou: "მოუთმენლად გელოდებით!",
    withLove: "სიყვარულით",
  },
  ru: {
    // Hero
    wedding: "Свадьба",
    weddingInvitation: "Свадебное приглашение",
    saveTheDate: "Сохраните дату",
    april: "Апрель",
    year: "2026",
    and: "&",
    
    // Names
    bride: "Diana",
    groom: "Badri",
    
    // Invitation text
    joyfullyInvite: "С радостью приглашаем вас",
    toOurWedding: "на наше свадебное торжество",
    yourPresence: "Ваше присутствие будет для нас большой честью",
    
    // Schedule
    schedule: "План дня",
    photoshootMorning: "Фотосессия",
    photoshootMorningVenue: "N.P. Gallery",
    churchCeremony: "Венчание",
    churchCeremonyVenue: "Монастырь Дедагвтисас",
    photoshootEvening: "Фотосессия",
    photoshootEveningVenue: "Legends Tskaltubo Spa Resort",
    signingCeremony: "Церемония подписи",
    signingCeremonyVenue: "Grand Palace",
    celebration: "Свадебный ужин",
    celebrationVenue: "Grand Palace",
    
    // Venue
    venue: "Локация",
    restaurantName: "Ресторан Grand Palace",
    viewOnMap: "Открыть в Google Maps",
    
    // Gallery
    ourStory: " ",
    
    // RSVP
    rsvp: "RSVP",
    confirmAttendance: "Пожалуйста, подтвердите присутствие",
    rsvpTitle: "Подтвердите присутствие",
    rsvpMessage: "Пожалуйста, заполните форму, чтобы подтвердить участие в нашем особенном дне.",
    rsvpButton: "Подтвердить присутствие",
    
    // Footer
    seeYou: "С нетерпением ждем встречи!",
    withLove: "С любовью",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ka")

  useEffect(() => {
    const stored = readStoredLanguage()
    if (stored) setLanguageState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "ka" ? "ka" : "ru"
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
