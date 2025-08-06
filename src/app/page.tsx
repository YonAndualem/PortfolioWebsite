"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Testimonials } from "@/components/testimonials";
import { Navbar } from "@/components/navbar"; 
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

// Project data (move to a separate file if desired)
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with advanced filtering, real-time inventory, and seamless checkout experience.",
    images: [
      "/placeholder.svg?height=400&width=600&text=E-commerce+Dashboard",
      "/placeholder.svg?height=400&width=600&text=Product+Catalog",
      "/placeholder.svg?height=400&width=600&text=Checkout+Flow",
    ],
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "Comprehensive analytics dashboard with AI-powered insights and real-time data visualization.",
    images: [
      "/placeholder.svg?height=400&width=600&text=AI+Analytics",
      "/placeholder.svg?height=400&width=600&text=Data+Visualization",
      "/placeholder.svg?height=400&width=600&text=Machine+Learning",
    ],
    tech: ["Next.js", "Python", "TensorFlow", "D3.js"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and advanced transaction features.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Banking+Interface",
      "/placeholder.svg?height=400&width=600&text=Transaction+History",
      "/placeholder.svg?height=400&width=600&text=Security+Features",
    ],
    tech: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "Modern social networking platform with real-time messaging and content sharing capabilities.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Social+Feed",
      "/placeholder.svg?height=400&width=600&text=Messaging+System",
      "/placeholder.svg?height=400&width=600&text=User+Profiles",
    ],
    tech: ["Vue.js", "Express", "Socket.io", "Redis"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Creative portfolio website with 3D animations and interactive elements for showcasing work.",
    images: [
      "/placeholder.svg?height=400&width=600&text=3D+Portfolio",
      "/placeholder.svg?height=400&width=600&text=Interactive+Gallery",
      "/placeholder.svg?height=400&width=600&text=Animation+Showcase",
    ],
    tech: ["Three.js", "React", "Framer Motion", "GSAP"],
    link: "#",
    github: "#",
  },
];

// Image Carousel Component
function ImageCarousel({ images, accentColor }: { images: string[]; accentColor: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-xl border border-gray-700 group-hover:border-[#0bb3d9]/50 transition-all duration-300">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Project image ${currentIndex + 1}`}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, #16f28b)`,
        }}
      />
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handlePrev}
          className="bg-gray-900/50 backdrop-blur-sm border-gray-600 hover:bg-gray-800/80 text-white"
        >
          {"<"}
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleNext}
          className="bg-gray-900/50 backdrop-blur-sm border-gray-600 hover:bg-gray-800/80 text-white"
        >
          {">"}
        </Button>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-[#0bb3d9] p-1" : "bg-gray-500"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// Stacking Cards Component
function StackingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.05;
        return (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
            parentProgress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

// Individual Project Card Component
function ProjectCard({
  index,
  project,
  parentProgress,
  targetScale,
  range,
}: {
  index: number;
  project: (typeof projects)[0];
  parentProgress: MotionValue<number>;
  targetScale: number;
  range: [number, number];
}) {
  const scale = useTransform(parentProgress, range, [1, targetScale]);
  const accentColor = index % 2 === 0 ? "#0bb3d9" : "#16f28b";
  return (
    <div className="h-screen flex flex-col justify-center items-center sticky top-0">
      <motion.div
        className="w-full max-w-5xl mx-auto px-4 relative"
        style={{
          top: `calc(-10% + ${index * 25}px)`,
          scale,
        }}
      >
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-1 group transition-all duration-500 ease-out hover:border-[#0bb3d9]/50 hover:shadow-2xl hover:shadow-[#0bb3d9]/10">
          <div className="bg-gray-900/80 rounded-[14px] p-8 transition-all duration-500 ease-out group-hover:bg-gray-900/90">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <motion.h3
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    textShadow: `0 0 20px ${accentColor}40`,
                    background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.description}
                </motion.p>
              </div>
              <motion.div
                className="relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ImageCarousel images={project.images} accentColor={accentColor} />
              </motion.div>
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  className="flex flex-wrap gap-3 justify-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 rounded-full text-sm border transition-colors duration-300"
                      style={{
                        backgroundColor: `${accentColor}1A`,
                        color: accentColor,
                        borderColor: `${accentColor}33`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                <motion.div className="flex gap-4" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Button
                    className="text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: accentColor }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">
      {/* Modern, animated Navbar */}
      <Navbar />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,179,217,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(22,242,139,0.1),transparent_50%)]" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0bb3d9]/5 rounded-full blur-3xl pointer-events-none" />
        <About />
      </section>

      {/* Experience Section */}
      <Experience />


      {/* Projects Section */}
      <Projects />

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}