'use client'

import { useState, useEffect } from 'react'

interface ResponsiveState {
  isMobile: boolean   // ≤ 768px
  isTablet: boolean   // ≤ 1024px
  isSmall: boolean    // ≤ 480px
}

export default function useIsMobile(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isSmall: false,
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setState({
        isMobile: w <= 768,
        isTablet: w <= 1024,
        isSmall: w <= 480,
      })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return state
}
