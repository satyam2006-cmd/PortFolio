"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { type GitHubRepo, fetchGitHubProjects, demoUrls } from "@/lib/github"
import { ArrowUpRight } from "lucide-react"

export default function ProjectsList() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      const repos = await fetchGitHubProjects()
      setProjects(repos)
      setLoading(false)
    }
    loadProjects()
  }, [])

  return (
    <section id="work" className="px-6 lg:px-24 py-32 bg-transparent border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 p-8 md:p-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Selected <span className="text-white/30 italic">Work</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xs font-light uppercase tracking-widest leading-relaxed">
            A collection of repositories spanning machine learning, analysis, and web.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-black/20 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid gap-px bg-transparent border border-white/10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 bg-black hover:bg-transparent transition-all duration-500 ease-out overflow-hidden"
              >
                <div className="relative z-10 flex-1">
                  <span className="text-gray-500 text-xs font-mono mb-4 block uppercase tracking-widest">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-light tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.name.replace(/^satyam-cmd-?/, '').replace(/-/g, " ")}
                  </h3>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6 relative z-10">
                  {project.language && (
                    <span className="text-gray-400 text-xs uppercase tracking-widest font-medium border border-gray-600 px-3 py-1 rounded-full">
                      {project.language}
                    </span>
                  )}
                  {(demoUrls[project.name.toLowerCase()] || project.homepage) && (
                    <motion.a
                      href={demoUrls[project.name.toLowerCase()] || project.homepage || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Now
                    </motion.a>
                  )}
                  <motion.a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowUpRight size={24} />
                  </motion.a>
                </div>

                {/* Hover Background Reveal Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
