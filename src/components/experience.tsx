"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Experience data
const experiences = [
  {
    id: 1,
    company: "Kasha Coffee",
    position: "Web Developer (Full Time)",
    duration: "Apr 2025 – Jun 2025",
    location: "Addis Ababa, Ethiopia / Hybrid",
    description:
      "Developed and deployed a responsive, mobile-first website for Kasha Coffee. Implemented features including full menu display, SEO optimization, and game night gallery. Utilized React.js, TypeScript, Vite, Node.js, Netlify, and Figma.",
    achievements: [
      "Built and launched new company website",
      "Implemented SEO optimization and improved discoverability",
      "Created interactive gallery for game nights",
      "Optimized performance for mobile devices"
    ],
    color: "#0bb3d9",
  },
  {
    id: 2,
    company: "Google Developer Group (GDG) on Campus, HiLCoE",
    position: "Design Team Lead (Full Time)",
    duration: "Oct 2024 – Present",
    location: "Addis Ababa, Ethiopia / Onsite",
    description:
      "Led the design team and coordinated creation of social media content and marketing materials. Designed visuals and promotional assets using Adobe Illustrator and Figma. Managed team workflows and content calendars to ensure timely delivery.",
    achievements: [
      "Led team for major campus events",
      "Created engaging marketing visuals",
      "Streamlined design workflows for team"
    ],
    color: "#16f28b",
  },
  {
    id: 3,
    company: "On My Way",
    position: "Quality Assurance Specialist (Full Time)",
    duration: "May 2024 – Present",
    location: "Addis Ababa, Ethiopia / Onsite",
    description:
      "Conduct manual and mobile application testing to ensure product quality and usability. Performed API testing and collaborated with developers to identify and resolve bugs. Provided administrative support to enhance team operations and product delivery.",
    achievements: [
      "Ensured quality and usability for mobile apps",
      "Worked closely with devs to resolve bugs",
      "Improved release process and team efficiency"
    ],
    color: "#0bb3d9",
  },
  {
    id: 4,
    company: "Astemari",
    position: "UI Designer (Freelance)",
    duration: "Sep 2024 – May 2024",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Designed engaging web interfaces and user experiences for client projects. Created interactive prototypes and responsive designs using Figma.",
    achievements: [
      "Delivered high-quality freelance UI projects",
      "Created interactive prototypes for clients"
    ],
    color: "#16f28b",
  },
  {
    id: 5,
    company: "Gebeta Maps",
    position: "UI Designer (Internship)",
    duration: "Sep 2023 – Nov 2023",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Designed user interfaces and improved user experience for the company website. Developed wireframes and prototypes in Figma and collaborated with developers on implementation.",
    achievements: [
      "Improved UX for Gebeta Maps website",
      "Collaborated on UI implementation"
    ],
    color: "#0bb3d9",
  },
  // Education milestones (as part of journey)
  {
    id: 6,
    company: "HiLCoE College of Computer Science & Technology",
    position: "BSc. Software Engineering (Student)",
    duration: "Oct 2022 – Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Current Software Engineering student specializing in Full Stack Development (React, Node.js, PostgreSQL), UI/UX Design (Figma), and Quality Assurance (Manual and API Testing).",
    achievements: [
      "Consistent academic excellence",
      "Active member of tech communities"
    ],
    color: "#16f28b",
  },
  {
    id: 7,
    company: "Evangadi Tech",
    position: "Full Stack Software Engineering (Remote Bootcamp)",
    duration: "Apr 2024 – Oct 2024",
    location: "Remote",
    description:
      "Completed intensive full stack bootcamp covering MERN stack, Git, API integration, and project deployment.",
    achievements: [
      "Graduated with distinction",
      "Built and deployed full stack projects"
    ],
    color: "#0bb3d9",
  },
  {
    id: 8,
    company: "ALX Africa, Ethiopia",
    position: "Software Engineering with Specialization in Frontend Development",
    duration: "May 2022 – Jun 2023",
    location: "Remote",
    description:
      "Specialized in software engineering foundations, frontend development, and UI/UX design. Learned React.js, Figma, and design thinking basics.",
    achievements: [
      "Completed specialization track",
      "Built multiple frontend and UI/UX projects"
    ],
    color: "#16f28b",
  },
]

// Responsive mobile hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return isMobile
}

// Card component: fixes hooks-in-map error
function ExperienceCard({ exp, index, isMobile }: { exp: typeof experiences[0]; index: number; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { amount: 0.5, once: false })

  return (
    <motion.div
      key={exp.id}
      ref={cardRef}
      className={`relative mb-16 ${!isMobile && (index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto")}`}
      initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -100 : 100) }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -100 : 100) }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {/* Timeline dot (hide on mobile) */}
      {!isMobile && (
        <div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 transition-all duration-300 z-10"
          style={{
            backgroundColor: inView ? exp.color : "#374151",
            boxShadow: inView ? `0 0 20px ${exp.color}` : "none",
          }}
        />
      )}
      <div
        className={`bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-[#0bb3d9]/50 transition-all duration-500 group hover:scale-105 ${!isMobile && (index % 2 === 0 ? "md:mr-8" : "md:ml-8")}`}
        style={{
          borderColor: inView ? exp.color : undefined,
          boxShadow: inView ? `0 0 20px ${exp.color}22` : undefined,
        }}
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
  )
}

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">My</span>
            <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            A timeline of my professional growth and education milestones.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] hover:shadow-lg hover:shadow-[#0bb3d9]/25 text-white px-6 py-4 font-medium transition-all duration-300 group hover:scale-105"
          >
            <a
              href="/Resume.pdf"
              download="Yonas_Berhanu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </Button>
        </motion.div>
        <div className="relative">
          {/* Timeline line (hide on mobile) */}
          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] opacity-30" />
          )}
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}