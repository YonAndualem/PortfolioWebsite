"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Testimonials } from "@/components/testimonials";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">
      <Navbar />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,179,217,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(22,242,139,0.1),transparent_50%)]" />
      </motion.div>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero />
      </section>

      {/* About */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0bb3d9]/5 rounded-full blur-3xl pointer-events-none" />
        <About />
      </section>

      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 relative">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}