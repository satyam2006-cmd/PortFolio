"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Mail, Linkedin } from "lucide-react"
import Plasma from "@/components/Plasma"

// This includes a split layout, sophisticated typography, and smooth reveal animations.

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] } as const },
  } as const

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Plasma background */}
      <div className="fixed inset-0 z-0 pr-[5px]">
        <Plasma 
          color="#01f99a"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={true}
        />
      </div>
      
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-2 text-sm font-medium tracking-tight hover:text-gray-400 transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Sidebar - Details */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12 lg:sticky lg:top-32 h-fit"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                The Profile
              </span>
              <h1 className="text-4xl font-serif leading-tight">Satyam Bhagat</h1>
              <p className="text-gray-400">Aspiring Data Scientist & Developer</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                  Location
                </span>
                <p className="text-sm font-medium">India</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                  Expertise
                </span>
                <ul className="text-sm font-medium space-y-1">
                  <li>Machine Learning</li>
                  <li>Development</li>
                  <li>Data Visualization</li>
                </ul>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                  Learning
                </span>
                <ul className="text-sm font-medium space-y-1">
                  <li>Deep Learning</li>
                </ul>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                  Connect
                </span>
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://github.com/satyam2006-cmd"
                    target="_blank"
                    className="hover:text-gray-400 transition-colors"
                    rel="noreferrer"
                  >
                    <Github size={20} strokeWidth={1.5} />
                  </a>
                  <a
                    href="mailto:satyambhagat200623@gmail.com"
                    className="hover:text-gray-400 transition-colors"
                  >
                    <Mail size={20} strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/satyam-bhagat2006/"
                    target="_blank"
                    className="hover:text-gray-400 transition-colors"
                    rel="noreferrer"
                  >
                    <Linkedin size={20} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.aside>

          {/* Main Story Content */}
          <motion.section initial="hidden" animate="visible" variants={containerVariants} className="space-y-20">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">The Story</span>
              <h2 className="text-3xl lg:text-5xl font-serif leading-[1.15]">
                Bridging the gap between complex algorithms and human-centric design.
              </h2>
              <div className="space-y-6 text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
                <p>
                  I'm an aspiring Data Scientist and Developer based in India, dedicated to uncovering the stories hidden within
                  data. My journey began with a curiosity for how systems work, which quickly evolved into a passion for
                  the mathematical elegance of machine learning.
                </p>
                <p>
                  Today, I focus on building intelligent applications that don't just process information, but provide
                  clarity. Whether it's predicting market trends or optimizing user experiences, I believe that data is
                  most powerful when it's accessible and actionable.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                The Approach
              </span>
              <div className="grid gap-12 sm:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-serif">Curiosity Driven</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Every project starts with a question. I dive deep into problem statements to understand the
                    underlying mechanics before writing a single line of code.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-serif">Design Minded</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Code is only half the battle. I ensure that every solution is accompanied by an intuitive interface,
                    making complex data easy to digest.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                The Philosophy
              </span>
              <blockquote className="text-2xl lg:text-4xl font-serif leading-tight italic border-l-4 border-[#c8a8e1] pl-8 py-2">
                "Data is the new oil, but intelligence is the refinement that makes it fuel for progress."
              </blockquote>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-border">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-4 text-xl font-serif hover:text-gray-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "/#work"
                  setTimeout(() => {
                    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
              >
                View Selected Projects
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </main>
      </div>
    </div>
  )
}
