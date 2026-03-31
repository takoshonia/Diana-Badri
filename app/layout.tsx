import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Sans_Georgian } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
})

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "500", "600"],
  variable: "--font-georgian"
})

export const metadata: Metadata = {
  title: 'დიანა & ბადრი | Diana & Badri - Wedding Invitation',
  description: 'We joyfully invite you to celebrate our wedding on April 19, 2026 at Restaurant Grand Palace',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ka">
      <body className={`${cormorant.variable} ${notoGeorgian.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
