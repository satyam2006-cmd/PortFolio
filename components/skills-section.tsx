const skillsList = [
  "Python",
  "Machine Learning",
  "Data Analysis",
  "JavaScript",
  "React",
  "Web Development",
  "SQL",
  "Flask",
  "Figma",
  "Git",
]

export default function SkillsSection() {
  return (
    <section className="px-6 lg:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="inline-block bg-yellow text-foreground font-black px-8 py-3 rounded-full mb-12 text-lg">
          SKILLS
        </div>

        <div className="flex flex-wrap gap-4">
          {skillsList.map((skill) => (
            <div
              key={skill}
              className="px-6 py-3 border-2 border-foreground rounded-full text-foreground font-semibold hover:bg-yellow hover:border-yellow transition-all duration-300"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
