"use client"

import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-6xl lg:text-7xl font-serif text-foreground mb-12 leading-tight">
          Let's Build Something Great Together
        </h2>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          I'm passionate about solving complex problems with data and code. Whether you need a machine learning model or
          a web application, let's collaborate.
        </p>

        <a
          href="https://github.com/satyam2006-cmd"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-10 py-4 rounded-full inline-flex items-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 group font-medium"
        >
          View My GitHub
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
