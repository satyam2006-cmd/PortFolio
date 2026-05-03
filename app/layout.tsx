import './globals.css'
import type { Metadata } from 'next'
import CustomCursor from '@/components/CustomCursor'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'Portfolio | Satyam Bhagat',
  description: 'Futuristic Cinematic Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
