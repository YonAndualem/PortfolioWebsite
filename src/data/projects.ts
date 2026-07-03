export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tech: string[];
  link: string;
  github: string;
  categories: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Exit Exam Platform",
    description: "A comprehensive practice platform for the Ethiopian University Exit Exam. Features student practice dashboards, mock exams, progress metrics, and an admin content management panel.",
    images: [
      "/projects/exit-1.png",
      "/projects/exit-2.png"
    ],
    tech: ["Next.js", "Go (GoFiber)", "Node.js (Express)", "PostgreSQL", "Docker", "Nginx", "Zustand", "TypeScript"],
    link: "",
    github: "https://github.com/YonAndualem/exit-web",
    categories: ["development", "systems-ai"]
  },
  {
    id: 2,
    title: "Social Media Time Warden",
    description: "MCP-powered application designed to monitor social media usage and dynamically throttle access during focus hours. Built for the Postman Web Dev Challenge.",
    images: [
      "/projects/warden-1.png"
    ],
    tech: ["JavaScript", "Node.js", "Model Context Protocol", "APIs", "Postman"],
    link: "",
    github: "https://github.com/YonAndualem/social-media-time-warden",
    categories: ["development", "systems-ai"]
  },
  {
    id: 3,
    title: "DailyDose",
    description: "A full-stack content delivery web application. Separates client presentation from content operations through structured RESTful backend endpoints.",
    images: [
      "/projects/dailydose-1.png"
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "TypeScript", "REST APIs"],
    link: "",
    github: "https://github.com/YonAndualem/DailyDose",
    categories: ["development"]
  },
  {
    id: 4,
    title: "WheelDeal",
    description: "An interactive, client-side web application for managing vehicle inventories, featuring dynamic listing filters, price calculators, and smooth UI animations.",
    images: [
      "/projects/wheeldeal-1.png"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    link: "",
    github: "https://github.com/YonAndualem/WheelDeal",
    categories: ["development", "design-qa"]
  }
];