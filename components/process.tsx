"use client"

import { ArrowDown } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Understand Your Challenge",
    description:
      "Reach out and share your problem or goal. I'll analyze the requirements, understand the dataset scope, and discuss potential approaches.",
  },
  {
    number: "02",
    title: "Explore & Prepare Data",
    description:
      "I conduct exploratory data analysis, clean the data, and prepare it for modeling. This ensures high-quality insights and predictions.",
  },
  {
    number: "03",
    title: "Build & Train Models",
    description:
      "I develop machine learning models tailored to your needs, train them on your data, and optimize for performance and accuracy.",
  },
  {
    number: "04",
    title: "Deploy & Support",
    description:
      "Deliver the final solution with documentation and support. Whether it's a web app or ML pipeline, you'll get a production-ready product.",
  },
]

export default function Process() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            Process
          </p>
          <h2 className="text-6xl lg:text-7xl font-serif text-foreground leading-tight max-w-3xl">
            The path from problem to solution
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="mb-6">
                <p className="text-7xl lg:text-8xl font-serif text-foreground/10 group-hover:text-foreground/20 transition-colors duration-300 leading-none">
                  {step.number}
                </p>
              </div>

              <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-4 group-hover:text-foreground/80 transition-colors">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-6 text-base">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -bottom-12 -right-6 h-24 w-12">
                  <ArrowDown size={24} className="text-muted-foreground/20 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
