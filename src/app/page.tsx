"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Text3D,
  Environment,
} from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Github, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type * as THREE from "three";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FunFacts } from "@/components/fun-facts";

// 3D Animated Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#0bb3d9"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
}

// Floating 3D Text
function FloatingText() {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={textRef}>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-1.5, 0, 0]}
      >
        YB
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </group>
  );
}

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with advanced filtering, real-time inventory, and seamless checkout experience.",
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
    description:
      "Comprehensive analytics dashboard with AI-powered insights and real-time data visualization.",
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
    description:
      "Secure mobile banking application with biometric authentication and advanced transaction features.",
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
    description:
      "Modern social networking platform with real-time messaging and content sharing capabilities.",
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
    description:
      "Creative portfolio website with 3D animations and interactive elements for showcasing work.",
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
function ImageCarousel({
  images,
  accentColor,
}: {
  images: string[];
  accentColor: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-[#0bb3d9] p-1" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Stacking Cards Component - Fixed with proper implementation
function StackingCards() {
  const ref = useRef<HTMLDivElement>(null);

  // To get the Y scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
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
  // The scale for the cards when they reach their sticky position
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
                <ImageCarousel
                  images={project.images}
                  accentColor={accentColor}
                />
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
                <motion.div
                  className="flex gap-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
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

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.a
            href="#"
            className="text-2xl font-bold grid place-items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <span className="bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              YB
            </span> */}
            <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent blur-xl">
              YB
            </span>

            <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
              YB
            </span>
          </motion.a>

          <div className="hidden md:flex space-x-8">
            {["About", "Experience", "Skills", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-[#16f28b] transition-colors duration-300 relative"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
                <motion.div
                  className="absolute bottom-[-4px] left-0 h-[2px] bg-[#16f28b] w-0"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-4">
              {["About", "Experience", "Skills", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-[#16f28b] transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">
      <Navigation />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,179,217,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(22,242,139,0.1),transparent_50%)]" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <FloatingText />
            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0bb3d9]/5 rounded-full blur-3xl" />
        <About />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <Experience />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A collection of projects that showcase my skills in modern web
              development, 3D graphics, and user experience design.
            </p>
          </motion.div>
        </div>

        <StackingCards />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Fun Facts Section */}
      <section id="facts">
        <FunFacts />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2024 Yonas Berhanu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
