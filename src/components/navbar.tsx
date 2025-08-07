"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

const SOCIALS = [
    { icon: Github, label: "GitHub", href: "https://github.com/YonAndualem" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yonandualem/" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/yonandualem" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/yonandualem" },
    { icon: Mail, label: "Email", href: "mailto:yonasandualem1472@gmail.com" },
];

function useLockBodyScroll(lock: boolean) {
    useEffect(() => {
        if (lock) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [lock]);
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    useLockBodyScroll(isOpen);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => { document.documentElement.style.scrollBehavior = ""; };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            let current = "";
            for (const nav of NAV_ITEMS) {
                const id = nav.href.replace("#", "");
                const section = document.getElementById(id);
                if (section) {
                    const offset = section.offsetTop - 80;
                    if (window.scrollY >= offset) {
                        current = nav.href;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        function onHashChange() {
            setIsOpen(false);
        }
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, [isOpen]);

    // --- Add this helper ---
    const scrollToSection = (href: string) => {
        setIsOpen(false);
        const id = href.replace("#", "");
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // Wait for menu to close
    };

    const Logo = (
        <a href="#" aria-label="Home" className="flex items-center">
            <Image
                src="/favicon.ico"
                alt="Logo"
                width={30}
                height={30}
                className="rounded"
                priority
            />
        </a>
    );

    const SocialIcons = (
        <div className="flex items-center gap-2 ml-4">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="rounded-full hover:bg-[#0bb3d9]/20 p-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0bb3d9]"
                >
                    <Icon className="w-5 h-5 text-[#0bb3d9]" aria-hidden="true" />
                </a>
            ))}
        </div>
    );

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            role="navigation"
            aria-label="Site Navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center py-4">
                    {/* Logo - Left */}
                    <div className="flex-1 flex items-center">
                        {Logo}
                    </div>

                    {/* Desktop Nav - Center */}
                    <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`text-muted-foreground hover:text-[#16f28b] transition-colors duration-300 relative px-2 py-1 outline-none ${activeSection === item.href ? "text-[#0bb3d9] font-bold" : ""
                                    }`}
                                tabIndex={0}
                                aria-current={activeSection === item.href ? "page" : undefined}
                            >
                                {item.label}
                                {activeSection === item.href && (
                                    <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded bg-[#0bb3d9] w-full transition-all" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Socials - Right */}
                    <div className="flex-1 flex items-center justify-end">
                        {/* Divider between nav tabs and socials */}
                        <div className="hidden md:block border-l h-6 mx-3 border-gray-600" />
                        <div className="hidden md:block">{SocialIcons}</div>

                        {/* Hamburger button - Mobile only */}
                        <button
                            type="button"
                            className="md:hidden text-foreground p-2 rounded transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="main-menu"
                            ref={menuButtonRef}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="main-menu"
                        className="md:hidden glass border-t border-border"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="menu"
                        aria-label="Mobile Navigation"
                    >
                        <div className="px-4 py-4 space-y-2 flex flex-col">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.label}
                                    className={`block text-muted-foreground hover:text-[#16f28b] transition-colors duration-300 text-lg font-medium py-2 px-1 rounded outline-none text-left ${activeSection === item.href ? "text-[#0bb3d9] font-bold" : ""
                                        }`}
                                    tabIndex={0}
                                    role="menuitem"
                                    aria-current={activeSection === item.href ? "page" : undefined}
                                    onClick={() => scrollToSection(item.href)}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="border-t border-gray-700 my-2" />
                            <div className="flex items-center gap-2 mt-3">
                                {SOCIALS.map(({ icon: Icon, label, href }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                        className="rounded-full hover:bg-[#0bb3d9]/20 p-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0bb3d9]"
                                    >
                                        <Icon className="w-5 h-5 text-[#0bb3d9]" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}