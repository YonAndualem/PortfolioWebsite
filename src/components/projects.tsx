"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

// Image Carousel Component
function ImageCarousel({ images, accentColor }: { images: string[]; accentColor: string }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

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
                                    {project.link && (
                                        <Button
                                            className="text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                                            style={{ backgroundColor: accentColor }}
                                            asChild
                                        >
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    {project.github && (
                                        <Button
                                            variant="outline"
                                            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent transition-all duration-300 hover:scale-105"
                                            asChild
                                        >
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-4 h-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export const Projects = () => (
    <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 mb-16">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl font-bold text-white mb-6">Featured Projects</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] mx-auto mb-8"></div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    A collection of projects that showcase my skills in modern web development, 3D graphics, and user experience design.
                </p>
            </motion.div>
        </div>
        <StackingCards />
    </section>
);