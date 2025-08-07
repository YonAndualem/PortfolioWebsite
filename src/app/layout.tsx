import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://yonandualem.netlify.app/'),
  title: 'Yonas Berhanu Andualem | Full Stack Developer & UI/UX Designer',
  description: 'Portfolio of Yonas Berhanu Andualem – Software Engineering student at HiLCoE, ALX alumni, and Full Stack Developer. MERN Stack Specialist (React, Node.js, Express, MySQL) passionate about building user-centered applications with engaging interfaces.',
  generator: 'Next.js',
  openGraph: {
    title: 'Yonas Berhanu Andualem | Full Stack Developer & UI/UX Designer',
    description: 'A Software Engineering student at HiLCoE and ALX alumni, specializing in MERN stack (React, Node.js, Express, MySQL) and UI/UX design. Explore my portfolio, skills, and projects.',
    url: 'https://yonandualem.netlify.app/',
    siteName: "Yonas Berhanu Andualem's Portfolio",
    images: [
      {
        url: '/opengraph-image.png',
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
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
:root {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}