import { Github, Mail, Linkedin } from "lucide-react"

export default function FooterNew() {
  return (
    <footer className="border-t border-white/10 mt-20 py-12 px-6 lg:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-foreground font-bold mb-2">Satyam Bhagat</p>
            <p className="text-gray-400 text-sm">Data Scientist & Developer</p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/satyam2006-cmd" target="_blank" rel="noopener noreferrer" title="GitHub">
              <Github size={20} className="text-gray-400 hover:text-accent transition-colors" />
            </a>
            <a href="mailto:satyambhagat200623@gmail.com" title="Email">
              <Mail size={20} className="text-gray-400 hover:text-accent transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/satyam-bhagat2006/" title="LinkedIn">
              <Linkedin size={20} className="text-gray-400 hover:text-accent transition-colors" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-white/40">
          <p>© 2025 Satyam Bhagat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
