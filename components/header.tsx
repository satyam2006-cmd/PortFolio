"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="text-lg font-serif font-medium text-foreground italic">Emile Jones</div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex gap-12 items-center">
            <a href="#home" className="text-sm text-foreground hover:opacity-70 transition-opacity duration-300">
              Home
            </a>
            <a href="#projects" className="text-sm text-foreground hover:opacity-70 transition-opacity duration-300">
              Projects
            </a>
            <a href="#services" className="text-sm text-foreground hover:opacity-70 transition-opacity duration-300">
              Services
            </a>
            <a href="#contact" className="text-sm text-foreground hover:opacity-70 transition-opacity duration-300">
              Contact
            </a>
          </nav>

          <div className="hidden lg:block">
            <span className="text-xs text-foreground/60 bg-secondary px-4 py-2 rounded-full font-medium">
              available for work
            </span>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="lg:hidden pb-6 flex flex-col gap-4 border-t border-border pt-6">
            <a href="#home" className="text-sm text-foreground hover:opacity-70 transition-opacity">
              Home
            </a>
            <a href="#projects" className="text-sm text-foreground hover:opacity-70 transition-opacity">
              Projects
            </a>
            <a href="#services" className="text-sm text-foreground hover:opacity-70 transition-opacity">
              Services
            </a>
            <a href="#contact" className="text-sm text-foreground hover:opacity-70 transition-opacity">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
