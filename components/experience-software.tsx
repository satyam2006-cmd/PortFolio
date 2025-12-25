"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const experienceList = [
  {
    period: "2025",
    title: "Data Science",
    organization: "Pursuing Data, ML & AI",
  },
  {
    period: "2024",
    title: "Development",
    organization: "Personal Projects",
  },
  {
    period: "2024",
    title: "CS Student",
    organization: "Learning Fundamentals",
  },
]

const softwareTools = [
  {
    name: "Framer",
    logo: "/framer.png",
  },
  {
    name: "VS Code",
    logo: "/vs.jpeg",
  },
  {
    name: "MySQL",
    logo: "/mysql.png",
  },
  {
    name: "Python",
    logo: "/python.png",
  },
  {
    name: "PBI",
    logo: "/pbi.png",
  },
  {
    name: "Wix",
    logo: "/wix.png",
  },
  {
    name: "Git",
    logo: "/git.png",
  },
  {
    name: "Hugging Face",
    logo: "/hugging face.png",
  },
]

export default function ExperienceSoftware() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="px-4 md:px-12 lg:px-24 py-16 md:py-24 border-t border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32">
          {/* EXPERIENCE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-10 md:mb-16 font-bold"
            >
              Experience
            </motion.h2>

            <div className="space-y-10 md:space-y-12">
              {experienceList.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-medium">{exp.period}</p>
                  <h3 className="text-xl font-serif mb-1 group-hover:text-gray-500 transition-colors">{exp.title}</h3>
                  <p className="text-sm text-gray-500">{exp.organization}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SOFTWARE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-10 md:mb-16 font-bold"
            >
              Software
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {softwareTools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-center p-4 md:p-6 transition-all group aspect-square lg:aspect-auto border-0 rounded-none text-transparent bg-transparent flex-col md:py-0 md:px-0 border-transparent opacity-0"
                >
                  <div className="mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
