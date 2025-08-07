"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";

// Typewriter effect hook
function useTypewriter(words: string[], loop = true, delay = 120, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < words[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[index].slice(0, displayed.length + 1));
        }, delay);
      } else {
        setTyping(false);
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (loop) {
        timeout = setTimeout(() => {
          setDisplayed("");
          setTyping(true);
          setIndex((prev) => (prev + 1) % words.length);
        }, pause);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, words, delay, pause, loop]);

  return displayed + (typing ? "|" : "");
}

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/YonAndualem" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yonandualem/" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/yonandualem" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/yonandualem" },
  { icon: Mail, label: "Email", href: "mailto:yonasandualem1472@gmail.com" },
];

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Typewriter effect for creative roles
  const typewriter = useTypewriter([
    "Next.js, Node.js, MERN.",
    "UI/UX Designer.",
    "Android | iOS Developer.",
    "Web Developer.",
    "Full Stack Alchemist.",
    "Software Engineer.",
    "Tech Enthusiast."
  ]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax background (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * 30;
      heroRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Scroll to section helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Image sizing for mobile/desktop
  const imageSize = isMobile ? 96 : 176; // 24 or 44 in tailwind (6rem/11rem)

  return (
    <section className="relative z-10 w-full mx-auto px-4 flex items-center justify-center min-h-dvh">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#0bb3d9]/30 rounded-full animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#16f28b]/20 blur-xl rounded-full animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 border border-[#16f28b]/40 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-[#0bb3d9]/10 rounded-lg animate-bounce"
          style={{ animationDuration: "6s" }}
          aria-hidden="true"
        />
      </div>

      {/* Main content */}
      <div
        ref={heroRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-2 sm:px-8 transition-transform duration-300 ease-out"
      >
        {/* Desktop: image left, text right. Mobile: name, then image, then content. */}
        <div
          className={`
            flex flex-col ${isMobile ? "items-center" : "md:flex-row md:items-center"}
            w-full gap-8 md:gap-14
          `}
        >
          {/* Image on left (desktop), below name on mobile */}
          {!isMobile && (
            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
              <div
                className={`
                  overflow-hidden rounded-full border-4 border-[#0bb3d9]/60 shadow-xl bg-gray-800/60
                  ${isMobile ? "w-28 h-28" : "w-44 h-44"}
                `}
              >
                <Image
                  src="/profile.png"
                  alt="Yonas Berhanu"
                  width={imageSize}
                  height={imageSize}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Main headline and info */}
          <div className={
            isMobile
              ? "flex flex-col items-center w-full pt-3" // reduce top space on mobile
              : "flex-1 flex flex-col items-center md:items-center w-full"
          }>
            {/* Name and typewriter headline */}
            <h1 className={`
              font-extrabold tracking-tight text-balance
              ${isMobile ? "text-4xl" : "text-5xl md:text-6xl"}
              text-center font-geist-sans
            `}>
              <span className="bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
                Yonas Berhanu
              </span>
              <br />
              <span className="text-white bg-none">Andualem</span>
            </h1>
            {/* On mobile, show image under name (with less top margin) */}
            {isMobile && (
              <div className="flex flex-col items-center w-full mt-10">
                <div
                  className="overflow-hidden rounded-full border-4 border-[#0bb3d9]/60 shadow-xl bg-gray-800/60 w-24 h-24 flex-shrink-0 mb-3"
                >
                  <Image
                    src="/profile.png"
                    alt="Yonas Berhanu"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Typewriter */}
            <div className="mt-3 mb-2 min-h-[2.5rem] flex items-center justify-center w-full">
              <span
                className={`
                  font-mono text-lg md:text-2xl font-semibold text-white/90
                  px-4 py-1 rounded
                  bg-black/40 border border-[#0bb3d9]/10 shadow
                  mx-auto
                `}
                aria-label="Typewriter headline"
              >
                {typewriter}
              </span>
            </div>

            {/* Socials always centered under name (desktop and mobile) */}
            <div className="flex justify-center items-center gap-3 w-full mt-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full hover:bg-[#0bb3d9]/20 p-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0bb3d9]"
                >
                  <Icon className="w-6 h-6 text-[#0bb3d9]" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div>
              <span className="ml-2 text-[#0bb3d9]">@YonAndualem</span>
            </div>
            {/* Description */}
            <div className="flex flex-col items-center w-full">
              <p className={`
                text-base md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed text-center mt-4
              `}>
                Full Stack Developer & UI/UX Designer crafting immersive experiences at the intersection of
                <br />
                <span className="text-[#16f28b] text-lg md:text-xl font-semibold block mt-2">
                  Design and Technology
                </span>
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className={`
                flex w-full justify-center gap-3 mt-6
                ${isMobile ? "flex-row" : "flex-row"}
              `}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] hover:shadow-lg hover:shadow-[#0bb3d9]/25 text-white px-6 py-6 text-lg font-medium transition-all duration-300 group hover:scale-105"
                onClick={() => scrollToSection("projects")}
                aria-label="View My Work"
              >
                View My Work
                <div className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-6 text-lg font-medium border-[#0bb3d9]/90 hover:border-[#0bb3d9] hover:bg-[#0bb3d9]/10 hover:text-[#0bb3d9] transition-all duration-300 hover:scale-105 bg-transparent"
                onClick={() => scrollToSection("contact")}
                aria-label="Get In Touch"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <ChevronDown className="w-10 h-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};