"use client"

import { useEffect, useState } from 'react'
import Plasma from "@/components/Plasma"
import Hero from "@/components/hero"
import EducationSkills from "@/components/education-skills"
import ExperienceSoftware from "@/components/experience-software"
import Projects from "@/components/projects-list"
import CodingProfiles from "@/components/coding-profiles"
import Footer from "@/components/footer-new"

// Lazy load heavy components
const LazyPlasma = () => {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsMobile(window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!isClient) return null
  
  return (
    <div className="fixed inset-0 z-0 pr-[5px]">
      <Plasma 
        color="#01f99a"
        speed={isMobile ? 0.4 : 1} // Slower on mobile
        direction="forward"
        scale={1}
        opacity={isMobile ? 0.6 : 1} // Reduced opacity on mobile
        mouseInteractive={!isMobile} // Disable mouse interaction on mobile
      />
    </div>
  )
}

// Lazy load components that are not immediately visible
const LazyExperienceSoftware = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('experience-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="experience-section">
      {isVisible && <ExperienceSoftware />}
    </div>
  )
}

const LazyProjects = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('projects-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="projects-section">
      {isVisible && <Projects />}
    </div>
  )
}

const LazyCodingProfiles = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('coding-profiles-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="coding-profiles-section">
      {isVisible && <CodingProfiles />}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Conditional Plasma background */}
      <LazyPlasma />
      
      <div className="relative z-10">
        <Hero />
        <EducationSkills />
        <LazyExperienceSoftware />
        <LazyProjects />
        <LazyCodingProfiles />
        <Footer />
      </div>
    </div>
  )
}
