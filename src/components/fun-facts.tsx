"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Coffee, Code, Music, Gamepad2, Camera, Plane, Book, Heart } from "lucide-react"

const facts = [
  {
    icon: Coffee,
    number: "2,847",
    label: "Cups of Coffee",
    description: "Fuel for late-night coding sessions",
    color: "#0bb3d9",
  },
  {
    icon: Code,
    number: "500K+",
    label: "Lines of Code",
    description: "Written across various projects",
    color: "#16f28b",
  },
  {
    icon: Music,
    number: "1,200+",
    label: "Hours of Music",
    description: "Listened while coding",
    color: "#0bb3d9",
  },
  {
    icon: Gamepad2,
    number: "15",
    label: "Games Completed",
    description: "For inspiration and relaxation",
    color: "#16f28b",
  },
  {
    icon: Camera,
    number: "3,500+",
    label: "Photos Taken",
    description: "Capturing moments and inspiration",
    color: "#0bb3d9",
  },
  {
    icon: Plane,
    number: "12",
    label: "Countries Visited",
    description: "Seeking inspiration worldwide",
    color: "#16f28b",
  },
  {
    icon: Book,
    number: "48",
    label: "Books Read",
    description: "Continuous learning and growth",
    color: "#0bb3d9",
  },
  {
    icon: Heart,
    number: "∞",
    label: "Passion Level",
    description: "For creating amazing experiences",
    color: "#16f28b",
  },
]

export const FunFacts = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState<{ [key: number]: number }>({})
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

  useEffect(() => {
    if (!isVisible) return

    facts.forEach((fact, index) => {
      if (fact.number === "∞") return

      const target = Number.parseInt(fact.number.replace(/[^\d]/g, ""))
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters((prev) => ({ ...prev, [index]: Math.floor(current) }))
      }, 20)
    })
  }, [isVisible])

  const formatNumber = (num: number, original: string) => {
    if (original.includes("K")) {
      return `${(num / 1000).toFixed(0)}K+`
    }
    return num.toLocaleString()
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#0bb3d9] rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
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
            <span className="text-white">Fun</span>
            <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              Facts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Some interesting numbers and quirky facts about my journey as a developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 p-6 text-center hover:border-[#0bb3d9]/50 transition-all duration-500 group hover:scale-105 relative overflow-hidden">
                {/* Animated background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${fact.color}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${fact.color}20` }}
                  >
                    <fact.icon className="w-8 h-8" style={{ color: fact.color }} />
                  </div>

                  <div className="text-4xl font-bold mb-2" style={{ color: fact.color }}>
                    {fact.number === "∞" ? "∞" : formatNumber(counters[index] || 0, fact.number)}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0bb3d9] transition-colors">
                    {fact.label}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">{fact.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
