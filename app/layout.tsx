import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Satyam Bhagat",
  description: "Portfolio of Satyam Bhagat - Aspiring Data Scientist, ML enthusiast, and developer based in India."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body 
        className={`font-sans antialiased bg-transparent text-white selection:bg-white selection:text-black relative`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
