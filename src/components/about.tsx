"use client"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Code, Palette, Database, GitBranch, Sparkles } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "Modern, scalable user interfaces.",
    technologies: [
      "React", "Next.js", "Vite", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"
    ],
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "API design, databases, and server logic.",
    technologies: [
      "Node.js", "Express", "Drizzle ORM", "PostgreSQL", "REST APIs", "Firebase", "PHP", "Spring Boot"
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design systems and engaging user experiences.",
    technologies: [
      "Figma", "Wireframing", "Prototyping", "Adobe Illustrator", "UI/UX Principles", "User Research"
    ],
  },
  {
    icon: GitBranch,
    title: "Version Control & Testing",
    description: "Collaboration, code quality, and testing.",
    technologies: [
      "Git", "GitHub", "Postman", "Manual Testing", "API Testing", "Mobile Testing (Android)"
    ],
  },
]

// Collated tools and technologies (view all)
const allTools: string[] = [
  "React", "Next.js", "Vite", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS",
  "Node.js", "Express", "Drizzle ORM", "PostgreSQL", "REST APIs", "Firebase", "PHP", "Spring Boot",
  "Figma", "Wireframing", "Prototyping", "Adobe Illustrator", "UI/UX Principles", "User Research",
  "Git", "GitHub", "Postman", "Manual Testing", "API Testing", "Mobile Testing (Android)",
]

// More visually engaging soft skills
// const softSkills = [
//   { label: "Problem-solving", color: "#0bb3d9", icon: Sparkles },
//   { label: "Critical Thinking", color: "#16f28b", icon: Sparkles },
//   { label: "Communication", color: "#0bb3d9", icon: Sparkles },
//   { label: "Team Collaboration", color: "#16f28b", icon: Sparkles },
// ]

export const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="container max-w-6xl mx-auto px-8 relative z-10">
      <div className="text-center mb-16 space-y-6">
        <h2
          className={`
          text-5xl md:text-6xl font-bold transition-all duration-1000
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        >
          <span className="text-white">Professional Profile</span>
        </h2>
        <p
          className={`
          text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        >
          Software Engineering student with hands-on experience in full stack development, UI/UX design, and quality assurance. Skilled in building robust web applications, designing user-centered interfaces, and ensuring software reliability. Quick learner, proactive in adopting new technologies, and a collaborative team player dedicated to delivering impactful results.
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {skills.map((skill, index) => (
          <Card
            key={index}
            className={`
              bg-gray-900/50 backdrop-blur-lg border border-gray-700 p-6 group hover:shadow-2xl hover:shadow-[#0bb3d9]/10 hover:border-[#0bb3d9]/50
              transition-all duration-700 ease-out hover:scale-105
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
            `}
            style={{ transitionDelay: `${100 + index * 50}ms` }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0bb3d9]/20 to-[#16f28b]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <skill.icon className="w-6 h-6 text-[#0bb3d9]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#0bb3d9] transition-colors duration-300">
                  {skill.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{skill.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 rounded-full bg-gray-800/60 text-[#0bb3d9] border border-[#0bb3d9]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View all tools used */}
      <div
        className={`
          flex flex-wrap justify-center gap-2 mb-10 transition-all duration-1000 delay-400
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        {allTools.map((tool, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-[#0bb3d9]/10 text-[#0bb3d9] border border-[#0bb3d9]/20 text-xs">
            {tool}
          </span>
        ))}
      </div>

      {/* Cooler soft skills with icons and gradients */}
      <div
        className={`
          flex flex-wrap justify-center gap-4 mb-10 transition-all duration-1000 delay-600
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        {/* {softSkills.map((skill, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm shadow-sm"
            style={{
              background: `linear-gradient(90deg, ${skill.color} 0%, #222 100%)`,
              color: "#fff",
              border: `1px solid ${skill.color}55`,
            }}
          >
            <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
            {skill.label}
          </span>
        ))} */}
      </div>
    </div>
  )
}