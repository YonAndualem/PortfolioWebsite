"use client"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Code, Palette, Zap, Globe } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, Vue, Angular, TypeScript, and modern web frameworks",
    technologies: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user experiences",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer"],
  },
  {
    icon: Zap,
    title: "3D & Animation",
    description: "Three.js, WebGL, and immersive web experiences",
    technologies: ["Three.js", "WebGL", "Blender", "After Effects", "Lottie"],
  },
  {
    icon: Globe,
    title: "Full Stack",
    description: "End-to-end application development and deployment",
    technologies: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
  },
]

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
      <div className="text-center mb-20 space-y-6">
        <h2
          className={`
          text-5xl md:text-6xl font-bold transition-all duration-1000
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        >
          <span className="text-white">About</span>
          <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
            Yonas
          </span>
        </h2>

        <p
          className={`
          text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        >
          I&apos;m a passionate creative developer who bridges the gap between design and technology. With over 5 years
          of experience, I specialize in creating immersive digital experiences that push the boundaries of what&apos;s
          possible on the web.
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                {skill.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 rounded-full bg-[#0bb3d9]/10 text-[#0bb3d9] border border-[#0bb3d9]/20"
                  >
                    {tech}
                  </span>
                ))}
                {skill.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-400">
                    +{skill.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats section */}
      <div
        className={`
        grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transition-all duration-1000 delay-1000
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
      >
        {[
          { number: "50+", label: "Projects Completed" },
          { number: "5+", label: "Years Experience" },
          { number: "20+", label: "Happy Clients" },
          { number: "100%", label: "Passion Driven" },
        ].map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
