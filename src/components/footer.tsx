"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
    { icon: Github, href: "https://github.com/YonAndualem", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yonandualem/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/yonandualem", label: "Twitter" },
    { icon: Mail, href: "mailto:yonasandualem1472@gmail.com", label: "Email" },
]

export function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="py-8 border-t border-gray-800 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
                <div className="flex gap-3 mb-2">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 bg-gray-800/50 border border-gray-700 hover:bg-[#0bb3d9]/20 hover:border-[#0bb3d9] transition-all"
                        >
                            <Icon className="w-5 h-5 text-[#0bb3d9] hover:text-white transition-colors" />
                        </a>
                    ))}
                </div>
                <p className="text-gray-500 text-sm">
                    © {year} Yonas Berhanu Andualem. All rights reserved.
                </p>
            </div>
        </footer>
    )
}