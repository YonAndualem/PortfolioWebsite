import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://your-portfolio-domain.com'), // <-- Change this to your deployed domain!
  title: 'Yonas Berhanu Andualem | Full Stack Developer & UI/UX Designer',
  description: 'Portfolio of Yonas Berhanu Andualem – Software Engineering student at HiLCoE, ALX alumni, and Full Stack Developer. MERN Stack Specialist (React, Node.js, Express, MySQL) passionate about building user-centered applications with engaging interfaces.',
  generator: 'Next.js',
  openGraph: {
    title: 'Yonas Berhanu Andualem | Full Stack Developer & UI/UX Designer',
    description: 'A Software Engineering student at HiLCoE and ALX alumni, specializing in MERN stack (React, Node.js, Express, MySQL) and UI/UX design. Explore my portfolio, skills, and projects.',
    url: 'https://your-portfolio-domain.com', // <-- Replace with your deployed domain
    siteName: 'Yonas Berhanu Andualem Portfolio',
    images: [
      {
        url: '/opengraph-image.webp', // Place the image in /public
        width: 1200,
        height: 630,
        alt: 'Yonas Berhanu Andualem Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yonas Berhanu Andualem | Full Stack Developer & UI/UX Designer',
    description: 'A Software Engineering student at HiLCoE and ALX alumni, specializing in MERN stack (React, Node.js, Express, MySQL) and UI/UX design.',
    images: ['/opengraph-image.webp'],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
