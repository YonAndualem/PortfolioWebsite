"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Experience & Education data
const experiences = [
  {
    id: 1,
    company: "Kasha Coffee",
    position: "Web Developer",
    duration: "Apr 2025 – May 2025",
    location: "Addis Ababa, Ethiopia / Hybrid",
    description:
      "Built and deployed a mobile-first website for Kasha Coffee, a local café in Addis Ababa. Utilized React.js, TypeScript, Vite, and Netlify, featuring full menu display, SEO optimization, and game night gallery.",
    achievements: [
      "Built and launched new company website",
      "Implemented SEO optimization and discoverability",
      "Created interactive gallery for game nights",
      "Optimized performance for mobile devices"
    ],
    color: "#0bb3d9",
    type: "work"
  },
  {
    id: 2,
    company: "GDG on Campus, HiLCoE",
    position: "Design Team Lead (Full Time)",
    duration: "Oct 2024 – Dec 2025",
    location: "Addis Ababa, Ethiopia / Onsite",
    description:
      "Led the design team and coordinated creation of social media content and marketing materials. Designed visuals and promotional assets using Adobe Illustrator and Figma. Managed team workflows and content calendars.",
    achievements: [
      "Led team for major campus events",
      "Created engaging marketing visuals",
      "Streamlined design workflows for team"
    ],
    color: "#16f28b",
    type: "work"
  },
  {
    id: 3,
    company: "On My Way",
    position: "Quality Assurance Specialist (Full Time)",
    duration: "May 2024 – Present",
    location: "Addis Ababa, Ethiopia / Onsite",
    description:
      "Conduct manual and mobile application testing to ensure product quality and usability. Performed API testing and collaborated with developers to identify and resolve bugs.",
    achievements: [
      "Ensured quality and usability for mobile apps",
      "Worked closely with devs to resolve bugs",
      "Improved release process and team efficiency"
    ],
    color: "#0bb3d9",
    type: "work"
  },
  {
    id: 4,
    company: "Ethioware - EdTech Initiative",
    position: "Frontend Web Developer",
    duration: "July 2025 – Oct 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Contributed as a Frontend Web Developer building responsive interfaces and interactive educational modules for the Ethioware EdTech Initiative.",
    achievements: [
      "Built clean, responsive components",
      "Collaborated on UI integration"
    ],
    color: "#16f28b",
    type: "work"
  },
  {
    id: 5,
    company: "Astemari",
    position: "UI Designer (Freelance)",
    duration: "Sept 2024 – May 2025",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Designed engaging web interfaces and user experiences for client projects. Created interactive prototypes and responsive designs using Figma.",
    achievements: [
      "Delivered high-quality freelance UI projects",
      "Created interactive prototypes for clients"
    ],
    color: "#0bb3d9",
    type: "work"
  },
  {
    id: 6,
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
    color: "#16f28b",
    type: "work"
  },
  {
    id: 7,
    company: "HiLCoE School of Computer Science and Technology",
    position: "BSc. Software Engineering (Student)",
    duration: "Oct 2022 – Aug 2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Undergraduate student specializing in Software Engineering foundations, full-stack systems architecture, and design patterns.",
    achievements: [
      "Consistent academic excellence",
      "Active member of tech communities"
    ],
    color: "#0bb3d9",
    type: "education"
  },
  {
    id: 8,
    company: "ALX Africa | ALX Ethiopia",
    position: "Computer Software Engineering",
    duration: "May 2022 – Jun 2023",
    location: "Remote",
    description:
      "Specialized in software engineering foundations, frontend development, and UI/UX design. Learned React.js, Figma, and design thinking basics.",
    achievements: [
      "Completed specialization track",
      "Built multiple frontend and UI/UX projects"
    ],
    color: "#16f28b",
    type: "education"
  },
  {
    id: 9,
    company: "Evangadi Tech",
    position: "Full Stack Development (MERN) Student",
    duration: "Apr 2024 – Oct 2024",
    location: "Remote",
    description:
      "Completed intensive full stack bootcamp covering MERN stack, Git, API integration, and project deployment.",
    achievements: [
      "Graduated with distinction",
      "Built and deployed full stack projects"
    ],
    color: "#0bb3d9",
    type: "education"
  },
  {
    id: 10,
    company: "Don Bosco Catholic High School",
    position: "High School Diploma",
    duration: "Sept 2016 – Aug 2020",
    location: "Addis Ababa, Ethiopia",
    description:
      "Acquired high school education focusing on scientific and mathematical foundations.",
    achievements: [
      "Graduated with honors",
      "Active participation in campus clubs"
    ],
    color: "#16f28b",
    type: "education"
  }
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

// Card component
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
      layout
    >
      {/* Timeline dot (hide on mobile) */}
      {!isMobile && (
        <div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-4 border-gray-900 transition-all duration-300 z-10"
          style={{
            backgroundColor: inView ? exp.color : "#374151",
            boxShadow: inView ? `0 0 20px ${exp.color}` : "none",
          }}
          aria-label={`Timeline milestone: ${exp.company}`}
          tabIndex={0}
        />
      )}
      <div
        className={`bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-[#0bb3d9]/50 transition-all duration-500 group hover:scale-105 ${!isMobile && (index % 2 === 0 ? "md:mr-8" : "md:ml-8")}`}
        style={{
          borderColor: inView ? exp.color : undefined,
          boxShadow: inView ? `0 0 20px ${exp.color}22` : undefined,
        }}
      >
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs md:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0bb3d9]" />
            {exp.duration}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#16f28b]" />
            {exp.location}
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${exp.type === "work" ? "border-[#0bb3d9]/40 text-[#0bb3d9]" : "border-[#16f28b]/40 text-[#16f28b]"}`}>
            {exp.type}
          </span>
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
            <div key={i} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16f28b] mt-1.5 flex-shrink-0" />
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
  const [filter, setFilter] = useState<"all" | "work" | "education">("all")

  const filteredExperiences = experiences.filter(
    (exp) => filter === "all" || exp.type === filter
  )

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
          className="text-center mb-16"
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A timeline of my professional growth and education milestones.
          </p>

          {/* Interactive filter toggle */}
          <div className="flex justify-center items-center gap-2 p-1.5 bg-gray-900/80 border border-gray-800 rounded-full max-w-md mx-auto mb-10">
            {(["all", "work", "education"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 uppercase tracking-wider ${
                  filter === type
                    ? "bg-[#0bb3d9] text-white shadow-lg shadow-[#0bb3d9]/35"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {type === "work" ? "Work" : type === "education" ? "Education" : "All"}
              </button>
            ))}
          </div>

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
          {!isMobile && filteredExperiences.length > 0 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] opacity-30" />
          )}
          <motion.div layout className="w-full">
            {filteredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} isMobile={isMobile} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}