"use client"

import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    name: "Prof. Rajesh Kumar",
    company: "Data Science Community",
    quote:
      "Satyam's ML models are incredibly accurate and well-documented. The attention to detail and methodology in his data analysis projects is exceptional.",
    initials: "RK",
  },
  {
    name: "Priya Singh",
    company: "TechStartup India",
    quote:
      "Fantastic work on the predictive modeling project. The insights provided by Satyam's analysis directly improved our business decisions.",
    initials: "PS",
  },
  {
    name: "Amit Patel",
    company: "Analytics Solutions",
    quote:
      "Professional and thorough approach to every project. The code quality and explanations made it easy to understand and implement.",
    initials: "AP",
  },
  {
    name: "Neha Desai",
    company: "AI Research Lab",
    quote:
      "Excellent problem-solving skills and deep understanding of machine learning concepts. Highly recommended for data science projects.",
    initials: "ND",
  },
  {
    name: "Vikram Chopra",
    company: "Web Development Agency",
    quote:
      "Great full-stack developer. The combination of web development and data science knowledge makes Satyam a valuable team member.",
    initials: "VC",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-32 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            Feedback
          </p>
          <h2 className="text-6xl lg:text-7xl font-serif text-foreground leading-tight max-w-3xl">
            What people say about working with me
          </h2>
        </div>

        <div className="bg-background border border-border rounded-3xl p-10 lg:p-12 shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <Quote size={32} className="text-primary opacity-30" />
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-3 hover:bg-secondary border border-border rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <ChevronLeft size={20} className="text-foreground group-hover:text-primary" />
              </button>
              <button
                onClick={next}
                className="p-3 hover:bg-secondary border border-border rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <ChevronRight size={20} className="text-foreground group-hover:text-primary" />
              </button>
            </div>
          </div>

          {/* Star rating */}
          <div className="flex gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Testimonial quote */}
          <p className="text-xl lg:text-2xl font-serif text-foreground mb-10 leading-relaxed">
            "{testimonials[current].quote}"
          </p>

          {/* Client info */}
          <div className="border-t border-border pt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-foreground">{testimonials[current].initials}</span>
            </div>
            <div>
              <p className="font-serif text-lg text-foreground font-semibold">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].company}</p>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "bg-foreground w-8" : "bg-border w-2 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
