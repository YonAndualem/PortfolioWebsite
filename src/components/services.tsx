"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Palette, Zap, Globe, Smartphone, Database, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    features: ["React/Next.js", "TypeScript", "Performance Optimization", "SEO"],
    price: "From $2,500",
    color: "#0bb3d9",
    gradient: "from-[#0bb3d9] to-[#16f28b]",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
    price: "From $5,000",
    color: "#16f28b",
    gradient: "from-[#16f28b] to-[#0bb3d9]",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that convert visitors into customers",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    price: "From $1,500",
    color: "#0bb3d9",
    gradient: "from-[#0bb3d9] to-[#16f28b]",
  },
  {
    icon: Zap,
    title: "3D & Animation",
    description: "Immersive 3D experiences and smooth animations for web",
    features: ["Three.js", "WebGL", "GSAP", "Interactive Experiences"],
    price: "From $3,000",
    color: "#16f28b",
    gradient: "from-[#16f28b] to-[#0bb3d9]",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Scalable server-side solutions and API development",
    features: ["Node.js", "Python", "Database Design", "Cloud Deployment"],
    price: "From $2,000",
    color: "#0bb3d9",
    gradient: "from-[#0bb3d9] to-[#16f28b]",
  },
  {
    icon: Globe,
    title: "Consulting",
    description: "Technical consulting and architecture planning for your projects",
    features: ["Tech Stack Selection", "Performance Audit", "Code Review", "Strategy"],
    price: "From $150/hr",
    color: "#16f28b",
    gradient: "from-[#16f28b] to-[#0bb3d9]",
  },
]

export const Services = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#0bb3d9] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">What I</span>
            <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 p-8 h-full hover:border-[#0bb3d9]/50 transition-all duration-500 group hover:scale-105 relative overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <service.icon className="w-8 h-8" style={{ color: service.color }} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{service.price}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0bb3d9] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full group/btn transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: service.color }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
