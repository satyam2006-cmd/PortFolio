"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "#work" },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24 overflow-hidden pt-20 bg-transparent">
      <div className="relative z-10">
        <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center w-[calc(100%-2rem)] md:w-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/20 backdrop-blur-md border border-white rounded-full px-6 md:px-8 py-3 flex gap-4 md:gap-8 mx-auto"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 text-sm font-medium hover:text-white transition-colors uppercase tracking-widest"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault()
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        </nav>

        <motion.div style={{ y: y1, opacity }} className="max-w-5xl z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-gray-300 text-[10px] md:text-sm uppercase tracking-[0.3em] mb-6 md:mb-8 font-medium"
          >
            Aspiring Data Scientist & Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif leading-tight mb-8 md:mb-12 tracking-tight"
          >
            Satyam <br />
            <span className="text-white/20 italic">Bhagat</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed font-light">
              Aspiring data scientist and developer passionate about crafting intelligent solutions through data and code. 
              Specializing in machine learning and development.
            </p>
          </motion.div>
        </motion.div>

        {/* Background Decorative Element */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full -z-10 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
