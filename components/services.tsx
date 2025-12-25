"use client"

import { ArrowUpRight } from "lucide-react"

const services = [
  { title: "Machine Learning", description: "Build predictive models and AI solutions" },
  { title: "Data Analysis", description: "Extract insights from complex datasets" },
  { title: "Web Development", description: "Create responsive and scalable web applications" },
  { title: "Python Programming", description: "Write clean, efficient Python code" },
  { title: "Data Visualization", description: "Transform data into meaningful visual stories" },
  { title: "Full-Stack Solutions", description: "End-to-end project implementation" },
]

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            Services
          </p>
          <h2 className="text-6xl lg:text-7xl font-serif text-foreground leading-tight max-w-3xl">
            Solutions powered by data and code
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-8 border border-border rounded-2xl hover:border-foreground/30 hover:shadow-lg hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif text-foreground group-hover:text-foreground transition-colors">
                  {service.title}
                </h3>
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
