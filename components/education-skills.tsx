"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function EducationSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillsList = [
    "Python",
    "Machine Learning",
    "Data Analysis",
    "PowerBI",
    "JavaScript",
    "Web Development",
    "SQL",
    "Flask",
    "Figma",
    "Git",
  ]

  const softwareTools = [
    { name: "Figma", icon: "🎨" },
    { name: "VS Code", icon: "💻" },
    { name: "Streamlit", icon: "📊" },
    { name: "PowerBI", icon: "📈" },
    { name: "Wix", icon: "🌐" },
    { name: "Framer", icon: "✨" },
    { name: "MySQL", icon: "🗄️" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] as const,
      },
    },
  } as const

  return (
    <section ref={ref} className="px-4 md:px-12 lg:px-24 py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Education and Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 mb-16 md:mb-24"
        >
          {/* EDUCATION - LEFT */}
          <motion.div variants={itemVariants}>
            <h2 className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-gray-500 mb-10 md:mb-16 font-medium">
              Education
            </h2>

            <div className="space-y-10 md:space-y-12">
              <div className="group">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-3 font-medium">
                  2024-Present
                </p>
                <h3 className="text-xl md:text-3xl font-serif mb-2 leading-tight group-hover:text-gray-500 transition-colors">
                  Bachelor of Technology
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  Computer Science (Data Science)
                  <br />
                  St. John College of Engineering and Management
                </p>
              </div>

              <div className="group">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-3 font-medium">
                  2020-2022
                </p>
                <h3 className="text-xl md:text-3xl font-serif mb-2 leading-tight group-hover:text-gray-500 transition-colors">
                  Pre-University
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  Sau Sitabai Ramkrishna Karandikar College
                </p>
              </div>
            </div>
          </motion.div>

          {/* SKILLS - RIGHT */}
          <motion.div variants={itemVariants}>
            <h2 className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-gray-500 mb-10 md:mb-16 font-medium">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {skillsList.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="px-4 py-2 border border-border rounded-full text-sm md:text-base font-medium hover:bg-secondary transition-colors cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
