"use client"

import Plasma from "@/components/Plasma"
import Hero from "@/components/hero"
import EducationSkills from "@/components/education-skills"
import ExperienceSoftware from "@/components/experience-software"
import Projects from "@/components/projects-list"
import CodingProfiles from "@/components/coding-profiles"
import Footer from "@/components/footer-new"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Plasma background */}
      <div className="fixed inset-0 z-0 pr-[5px]">
        <Plasma 
          color="#01f99a"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={true}
        />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <EducationSkills />
        <ExperienceSoftware />
        <Projects />
        <CodingProfiles />
        <Footer />
      </div>
    </div>
  )
}
