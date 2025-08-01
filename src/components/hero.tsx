"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section className="relative z-10 text-center w-full mx-auto px-4 flex items-center justify-center h-dvh">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#0bb3d9]/30 rounded-full animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-[#16f28b]/20 blur-xl rounded-full animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 border border-[#16f28b]/40 rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-[#0bb3d9]/10 rounded-lg animate-bounce"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Main content */}
      <div
        ref={heroRef}
        className="relative z-10 text-center max-w-4xl mx-auto px-8 transition-transform duration-300 ease-out"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold">
              <div className="grid place-items-center">
                <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent blur-xl">
                  Yonas
                </span>

                <span className="col-start-1 row-start-1 bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent animate-pulse">
                  Yonas
                </span>
              </div>
              <span className="block text-white mt-2">Berhanu</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Creative Developer & Digital Artist crafting immersive experiences
              at the intersection of{" "}
              <span className="text-[#16f28b]">design and technology</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] hover:shadow-lg hover:shadow-[#0bb3d9]/25 text-white px-8 py-6 text-lg font-medium transition-all duration-300 group hover:scale-105"
            >
              View My Work
              <div className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-[#0bb3d9]/50 hover:border-[#0bb3d9] hover:bg-[#0bb3d9]/10 hover:text-[#0bb3d9] transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
