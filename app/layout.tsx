import './globals.css'
import type { Metadata } from 'next'
import CustomCursor from '@/components/CustomCursor'

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
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
