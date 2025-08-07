"use client"

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com/YonAndualem", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yonandualem/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yonandualem", label: "Twitter" },
  { icon: Mail, href: "mailto:yonasandualem1472@gmail.com", label: "Email" },
];

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // EmailJS expects a plain object with keys: name, email, message
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_USER_ID
      );
      toast("Your message was sent! Thank you.");
      setFormData({ name: "", email: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    } catch (error) {
      toast("Failed to send message.", { description: "Try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div
              className={`
              space-y-6 transition-all duration-1000
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
            `}
            >
              <h2 className="text-5xl md:text-6xl font-bold">
                <span className="text-white">Let&apos;s</span>
                <span className="block bg-gradient-to-r from-[#0bb3d9] via-[#16f28b] to-[#0bb3d9] bg-clip-text text-transparent">
                  Collaborate
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to bring your vision to life? I&apos;m always excited to work on innovative projects that challenge the status quo and create meaningful impact.
              </p>
            </div>
            {/* Social links */}
            <div
              className={`
              flex gap-4 transition-all duration-1000 delay-200
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
            `}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-lg border border-gray-700 flex items-center justify-center hover:bg-[#0bb3d9]/20 hover:border-[#0bb3d9] hover:scale-110 transition-all duration-300 group"
                  tabIndex={0}
                >
                  <social.icon className="w-5 h-5 text-[#0bb3d9] group-hover:text-white transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>
            {/* Contact info */}
            <div
              className={`
              space-y-4 transition-all duration-1000 delay-400
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
            `}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0bb3d9]" aria-hidden="true" />
                <span className="text-gray-300">yonasandualem1472@gmail.com</span>
              </div>
              <div className="text-sm text-gray-400">
                Currently available for freelance projects and full-time opportunities
              </div>
            </div>
          </div>
          {/* Right side - Contact form */}
          <Card
            className={`
            bg-gray-900/50 backdrop-blur-lg border border-gray-700 p-8 transition-all duration-1000 delay-600
            ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}
          `}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800/50 border-gray-600 focus:border-[#0bb3d9] text-white placeholder:text-gray-400"
                  aria-label="Your Name"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800/50 border-gray-600 focus:border-[#0bb3d9] text-white placeholder:text-gray-400"
                  aria-label="Your Email"
                />
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800/50 border-gray-600 focus:border-[#0bb3d9] text-white placeholder:text-gray-400 resize-none"
                  aria-label="Message"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || sent}
                className="w-full bg-gradient-to-r from-[#0bb3d9] to-[#16f28b] text-white hover:scale-105 transition-all duration-300"
                size="lg"
                aria-label={sent ? "Sent!" : isLoading ? "Sending..." : "Send Message"}
              >
                {sent ? "Sent!" : isLoading ? "Sending..." : "Send Message"}
                {!sent && <div className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</div>}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};