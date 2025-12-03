import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
})

export const metadata: Metadata = {
  title: "Graduation Memories",
  description: "A shared photo bank for our graduating class",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} ${instrumentSerif.variable} antialiased font-mono`}>{children}</body>
    </html>
  )
}
