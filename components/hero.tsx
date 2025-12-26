"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from 'react'

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "#work" },
  ]

  // Optimized animation variants for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.6,
        ease: "easeOut",
        staggerChildren: reducedMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : isMobile ? 0.4 : 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24 overflow-hidden pt-20 bg-transparent">
      <div className="relative z-10">
        <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center w-[calc(100%-2rem)] md:w-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className="bg-black/20 backdrop-blur-md border border-white rounded-full px-4 md:px-8 py-3 flex gap-2 md:gap-8 mx-auto"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 text-xs md:text-sm font-medium hover:text-white transition-colors uppercase tracking-widest"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault()
                    const targetElement = document.querySelector(item.href)
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth" })
                    } else {
                      // If element doesn't exist yet (lazy loaded), scroll to bottom first then wait
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                      setTimeout(() => {
                        const element = document.querySelector(item.href)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }, 1000)
                    }
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        </nav>

        <motion.div 
          style={{ y: reducedMotion ? 0 : y1, opacity }} 
          className="max-w-5xl z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-[8px] md:text-sm uppercase tracking-[0.2em] mb-4 md:mb-8 font-medium"
          >
            Aspiring Data Scientist & Developer
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6 md:mb-12 tracking-tight"
          >
            Satyam <br />
            <span className="text-white/20 italic">Bhagat</span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="max-w-xl"
          >
            <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light">
              Aspiring data scientist and developer passionate about crafting intelligent solutions through data and code. 
              Specializing in machine learning and development.
            </p>
          </motion.div>
        </motion.div>

        {/* Background Decorative Element - simplified for mobile */}
        <div className="absolute right-0 bottom-0 w-1/3 md:w-1/2 h-full -z-10 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
