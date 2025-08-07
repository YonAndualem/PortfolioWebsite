"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    company: "TechStart Inc.",
    image: "/placeholder.svg?height=80&width=80&text=SJ",
    rating: 5,
    text: "Yonas delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach transformed our vision into reality. The 3D animations he implemented increased our user engagement by 300%.",
    project: "E-commerce Platform",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateCorp",
    image: "/placeholder.svg?height=80&width=80&text=MC",
    rating: 5,
    text: "Working with Yonas was a game-changer for our product. His technical expertise and design sensibility helped us create an award-winning application. The performance optimizations he implemented reduced our load times by 60%.",
    project: "Mobile App Development",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Creative Agency",
    image: "/placeholder.svg?height=80&width=80&text=ER",
    rating: 5,
    text: "Yonas is a true professional who understands both the technical and business aspects of web development. His innovative solutions and timely delivery made our collaboration seamless and successful.",
    project: "Brand Website Redesign",
  },
  {
    id: 4,
    name: "David Kim",
    position: "Founder",
    company: "StartupXYZ",
    image: "/placeholder.svg?height=80&width=80&text=DK",
    rating: 5,
    text: "The interactive 3D experience Yonas created for our product showcase was absolutely mind-blowing. Our conversion rate increased by 45% after launching the new site. Highly recommended!",
    project: "3D Product Showcase",
  },
]

export const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
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
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#16f28b]/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#0bb3d9]/5 rounded-full blur-3xl animate-pulse"
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
            <span className="text-white">Client</span>
            <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              Love
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don&apos;t just take my word for it - hear what my clients have to say
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 p-12 text-center hover:border-[#0bb3d9]/50 transition-all duration-500">
                <div className="flex justify-center mb-8">
                  <Quote className="w-16 h-16 text-[#0bb3d9] opacity-50" />
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#16f28b] fill-current" />
                  ))}
                </div>

                <p className="text-xl text-gray-300 leading-relaxed mb-8 italic">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>

                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-[#0bb3d9]"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-[#0bb3d9]">{testimonials[currentIndex].position}</p>
                    <p className="text-gray-400 text-sm">{testimonials[currentIndex].company}</p>
                    <p className="text-[#16f28b] text-sm font-semibold mt-1">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="border-gray-600 hover:border-[#0bb3d9] hover:bg-[#0bb3d9]/10 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#0bb3d9] scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  tabIndex={0}
                  style={{ position: "relative" }}
                >
                  <span className="sr-only">{`Go to testimonial ${index + 1}`}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="border-gray-600 hover:border-[#0bb3d9] hover:bg-[#0bb3d9]/10 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}