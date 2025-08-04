"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    id: 1,
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Leading a team of 5 developers in creating cutting-edge web applications using React, Next.js, and Three.js. Implemented 3D visualizations that increased user engagement by 40%.",
    achievements: ["Reduced load times by 60%", "Led 3 major product launches", "Mentored 8 junior developers"],
    color: "#0bb3d9",
  },
  {
    id: 2,
    company: "Digital Innovations",
    position: "Full Stack Developer",
    duration: "2020 - 2022",
    location: "New York, NY",
    description:
      "Developed and maintained multiple client projects using modern web technologies. Specialized in creating interactive user experiences and optimizing performance.",
    achievements: ["Built 15+ client projects", "Improved SEO rankings by 200%", "Implemented CI/CD pipelines"],
    color: "#16f28b",
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Frontend Developer",
    duration: "2019 - 2020",
    location: "Austin, TX",
    description:
      "Joined as the first frontend developer and helped scale the product from MVP to 10k+ users. Built responsive web applications and mobile-first designs.",
    achievements: ["Scaled to 10k+ users", "Built design system", "Reduced bounce rate by 35%"],
    color: "#0bb3d9",
  },
  {
    id: 4,
    company: "Freelance",
    position: "Web Developer",
    duration: "2018 - 2019",
    location: "Remote",
    description:
      "Worked with various clients to create custom websites and web applications. Focused on modern design principles and performance optimization.",
    achievements: ["20+ client projects", "5-star average rating", "Built personal brand"],
    color: "#16f28b",
  },
]

export const Experience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0bb3d9]/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#16f28b]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">My</span>
            <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A timeline of my professional growth and the amazing companies I&apos;ve worked with
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] opacity-30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative mb-16 ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Timeline dot */}
              <div
                className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 transition-all duration-300 z-10"
                style={{
                  backgroundColor: activeIndex === index ? exp.color : "#374151",
                  boxShadow: activeIndex === index ? `0 0 20px ${exp.color}` : "none",
                }}
              />

              <div
                className={`bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-[#0bb3d9]/50 transition-all duration-500 hover:scale-105 group ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#0bb3d9] transition-colors">
                  {exp.position}
                </h3>
                <h4 className="text-lg font-semibold mb-4" style={{ color: exp.color }}>
                  {exp.company}
                </h4>

                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-[#16f28b] mb-3">Key Achievements:</h5>
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#16f28b]" />
                      <span className="text-sm text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
