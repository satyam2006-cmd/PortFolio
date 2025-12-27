"use client"

import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div>
            <h3 className="font-serif text-2xl mb-3 font-semibold">Satyam Bhagat</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Data Science student exploring ML, Data Analysis, and Full-Stack Development to build innovative
              solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  Home
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  Projects
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  Services
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  Contact
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2 group">
                  Blog
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2 group">
                  Case Studies
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2 group">
                  Services
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/satyam2006-cmd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  GitHub
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors flex items-center gap-2 group">
                  Projects
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                >
                  Services
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/satyam2006-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
                title="GitHub"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyam-bhagat2006/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
                title="LinkedIn"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/satyam2006_cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
                title="Twitter"
              >
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:satyambhagat200622@gmail.com"
                className="p-3 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
                title="Email"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-primary-foreground/70 text-sm gap-4">
          <p>&copy; 2025 Satyam Bhagat. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
