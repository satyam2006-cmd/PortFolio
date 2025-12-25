"use client"

import { ArrowUpRight, Github, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { type GitHubRepo, fetchGitHubProjects } from "@/lib/github"

export default function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      const repos = await fetchGitHubProjects()
      console.log("[v0] Projects loaded:", repos)
      setProjects(repos)
      setError(repos.length === 0)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const getProjectTags = (repo: GitHubRepo) => {
    const tags = []
    if (repo.language) tags.push(repo.language)
    if (repo.topics && repo.topics.length > 0) {
      tags.push(...repo.topics.slice(0, 2))
    }
    return tags.length > 0 ? tags : ["Project"]
  }

  if (loading) {
    return (
      <section id="projects" className="py-32 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            My Projects
          </p>
          <h2 className="text-6xl lg:text-7xl font-serif text-foreground leading-tight max-w-3xl">
            Featured work and contributions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl border border-border hover:border-foreground/50 bg-card hover:bg-secondary transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <Github size={24} className="text-primary group-hover:scale-110 transition-transform" />
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              <h3 className="text-lg font-serif text-foreground group-hover:text-foreground/80 transition-colors mb-2 line-clamp-2">
                {project.name
                  .replace(/-/g, " ")
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </h3>

              {project.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{project.description}</p>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {project.language && <span className="bg-secondary px-2 py-1 rounded-full">{project.language}</span>}
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  {project.stargazers_count}
                </div>
              </div>
            </a>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {error
                ? "Unable to load projects. Please check GitHub API connection."
                : "No projects found. Check back soon!"}
            </p>
          </div>
        )}

        <div className="text-center">
          <a
            href="https://github.com/satyam2006-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-foreground/60 border-b-2 border-foreground pb-2 transition-all inline-flex items-center gap-2 font-medium text-sm group"
          >
            View all on GitHub
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
