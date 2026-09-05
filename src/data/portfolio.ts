import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/icons";

export const personalInfo = {
  name: "Keshav Dixit",
  role: "Full-Stack Developer | Software Engineer | AI/RAG Developer",
  shortDescription: "I build scalable, production-ready web applications and AI-powered experiences.",
  location: "Noida, Uttar Pradesh, India",
  about: "I am a highly motivated Full-Stack Developer and Software Engineer passionate about building scalable, production-ready applications and solving complex problems through Data Structures and Algorithms. My expertise includes React, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, and MongoDB, with a strong focus on clean architecture, backend performance, and responsive user experiences.\n\nI am also exploring Artificial Intelligence by building RAG applications using FastAPI, LangChain, FAISS, and Google Gemini to connect LLMs with real-world data. Alongside development, I regularly practice on LeetCode to strengthen my problem-solving and algorithmic skills. I enjoy learning new technologies, debugging challenging problems, designing efficient systems, and contributing to impactful, innovative software projects.",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "JSS Academy of Technical Education, Noida",
    cgpa: "7.87"
  }
};

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label?: string;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/keshav-8864", icon: GithubIcon },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dixit-keshav8864", icon: LinkedinIcon },
  { name: "LeetCode", url: "https://leetcode.com/u/Keshav_31_12/", icon: LeetCodeIcon },
  { name: "Email", url: "#contact", icon: Mail, label: "keshavdixit8864@gmail.com" },
];


export const featuredProjects = [
  {
    title: "PrimeNext — Full Stack E-Commerce Platform",
    description: "A production-grade full-stack e-commerce platform with product management, cart, checkout, authentication, admin dashboard, payments, real-time support, and error monitoring. I diagnosed and fixed real production issues involving payment webhook signature verification, authentication clock skew configuration, and checkout payload/currency mismatches.",
    technologies: ["React", "Express.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk", "Polar", "Sentry"],
    features: [
      "Product catalog",
      "Cart and checkout",
      "Admin dashboard",
      "Order management",
      "Clerk authentication",
      "Polar payments",
      "Stream real-time support chat",
      "Sentry monitoring",
      "PostgreSQL + Drizzle ORM"
    ],
    githubUrl: "https://github.com/keshav-8864/PrimeNext-store",
    liveDemoUrl: "https://primenext-store.onrender.com/"
  },
  {
    title: "AnyQuery AI — RAG-Based Video & Document Assistant",
    description: "A Retrieval-Augmented Generation application that allows users to semantically query and chat with YouTube videos and PDF documents.",
    technologies: ["Next.js", "FastAPI", "LangChain", "Google Gemini", "FAISS", "Tailwind CSS"],
    features: [
      "YouTube transcript processing",
      "PDF document processing",
      "Semantic search",
      "FAISS vector database",
      "LangChain",
      "FastAPI backend",
      "Google Gemini",
      "Local HuggingFace embeddings",
      "Markdown AI response rendering"
    ],
    githubUrl: "https://github.com/keshav-8864/AnyQuery_AI_RAG",
    liveDemoUrl: "https://queryai-eight.vercel.app/"
  },
  {
    title: "Car Rental Platform",
    description: "A full-stack MERN application that allows users to browse available cars, check availability, book vehicles, and manage their bookings. Users can also switch to an 'owner' role to list their vehicles, upload images, toggle availability, and view dashboard statistics.",
    technologies: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "ImageKit"],
    features: [
      "JWT Authentication & Role-based Access",
      "Date-based availability checking",
      "Car listing and image uploading",
      "User and Owner booking management",
      "Owner dashboard statistics",
      "Responsive UI with Framer Motion"
    ],
    githubUrl: "https://github.com/keshav-8864/CarRental-fullStack",
    liveDemoUrl: "https://car-rental-client2.vercel.app/"
  }
];

