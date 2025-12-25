"use client"

import { CheckCircle2 } from "lucide-react"

const skills = [
  "Python",
  "C",
  "C++",
  "Java",
  "Machine Learning",
  "Data Analysis",
  "Flask",
  "Web Development",
  "Figma",
  "Framer",
  "Wix",
]

const experience = [
  {
    role: "Data Science Student",
    company: "Currently Learning ML & Deep Learning",
    period: "2025 - Present",
  },
  {
    role: "Data Science Enthusiast",
    company: "Building ML Projects",
    period: "2024 - 2025",
  },
  {
    role: "Full-Stack Developer",
    company: "Web & Design Projects",
    period: "2023 - 2024",
  },
  {
    role: "CS Student",
    company: "Learning Fundamentals",
    period: "2021 - 2023",
  },
]

export default function Skills() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            Skills & Expertise
          </p>
          <h2 className="text-6xl lg:text-7xl font-serif text-foreground leading-tight mb-12 max-w-3xl">
            Technical skills across Data Science and Web Development
          </h2>

          <div className="flex flex-wrap gap-3 mb-12">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-5 py-2.5 bg-background border border-border rounded-full text-sm text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-pointer flex items-center gap-2 group"
              >
                <CheckCircle2 size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="group p-6 lg:p-8 border-l-3 border-foreground/20 pl-6 lg:pl-8 hover:border-foreground/60 transition-all duration-300 relative"
            >
              <div className="absolute left-0 top-6 lg:top-8 w-3 h-3 bg-foreground rounded-full transform -translate-x-[6px] group-hover:scale-150 transition-transform duration-300"></div>

              <p className="text-xs text-muted-foreground mb-2 font-medium tracking-wide uppercase">{exp.period}</p>
              <h3 className="text-lg lg:text-xl font-serif text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                {exp.role}
              </h3>
              <p className="text-sm text-muted-foreground">{exp.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
