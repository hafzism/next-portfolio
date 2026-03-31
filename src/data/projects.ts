import { StaticImageData } from "next/image";
import hayonLogo from "@/assets/hayonlogo.png";
import LitBayLogo from "@/assets/LitBay_logo.png";
import NearBuyLogo from "@/assets/nearlogo.png";
import scrybeLogo from "@/assets/scrybe_logo.png";
import tabtrailsLogo from "@/assets/tabtrails_logo.png";
import perfectPromptLogo from "@/assets/perfectPrompt_logo.png";


export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string | StaticImageData;
  gradient: string;
  about: string;
  features: string[];
  link?: string;
  github?: string;
  year: string;
  users?: string;
  tech: { name: string; icon: string }[];
}

export const projects: Project[] = [
  {
    id: "hayon",
    title: "Hayon",
    description: "Create, schedule, and publish posts across multiple social platforms from one place.",
    icon: hayonLogo,
    gradient: "bg-[#0b8d51]",
    about: "A social media management application that enables users to create posts, generate AI-powered captions, schedule publishing, and track performance from a single dashboard.",
    features: [
      "AI Caption Generation",
      "Post Scheduling",
      "Multi-Platform Publishing",
      "Performance Analytics"
    ],
    link: "https://www.hayon.site",
    github: "https://github.com/devxtra-community/hayon",
    year: "2025",
    tech: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
      { name: "Shadcn", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
      { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Redis", icon: "https://skillicons.dev/icons?i=redis" },
      { name: "RabbitMQ", icon: "https://skillicons.dev/icons?i=rabbitmq" },
      { name: "Gemini API", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" }
    ]
  },
  {
    id: "LitBay",
    title: "LitBay",
    description: "Browse, search, and purchase books online with secure authentication and admin management.",
    icon: LitBayLogo,
    gradient: "bg-[#6d3410]",
    about: "A mini e-commerce application for books that allows users to explore products, place orders, and track purchases, while admins manage inventory, categories, and orders through a dedicated dashboard.",
    features: [
      "Product Search & Filter",
      "Secure Authentication",
      "Order Management",
      "Admin Dashboard"
    ],
    link: "https://litbay.hafzism.com",
    github: "https://github.com/hafzism/litbay",
    year: "2025",
    tech: [
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
      { name: "Nginx", icon: "https://skillicons.dev/icons?i=nginx" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" }
    ]
  },
  {
    id: "NearBuy",
    title: "NearBuy",
    description: "Discover products from nearby stores with support for users, shops, delivery partners, and admins.",
    icon: NearBuyLogo,
    gradient: "bg-[#3ca4d5]",
    about: "A product discovery platform that connects users with local shops, allowing them to browse nearby products, locate stores, and request deliveries, while shop owners, delivery partners, and admins manage their respective workflows through dedicated views.",
    features: [
      "Local Product Discovery",
      "Store Location Mapping",
      "Multi-Role Access",
      "Delivery Requests"
    ],
    link: "https://nearbuy.hafzism.com",
    github: "https://github.com/hafzism/nearbuy",
    year: "2024",
    tech: [
      { name: "Django", icon: "https://skillicons.dev/icons?i=django" },
      { name: "Python", icon: "https://skillicons.dev/icons?i=py" },
      { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
      { name: "Flutter", icon: "https://skillicons.dev/icons?i=flutter" },
      { name: "Render", icon: "https://avatars.githubusercontent.com/u/42682871?s=200&v=4" }
    ]
  },
  {
    id: "scrybe",
    title: "Scrybe",
    description: "Write, publish, and explore posts with text and images in a public blogging platform.",
    icon: scrybeLogo,
    gradient: "bg-[#0f172b]",
    about: "A lightweight blogging application that allows users to authenticate, create posts with text and images, explore content from other users, and view individual author profiles along with their published posts.",
    features: [
      "User Authentication",
      "Post Creation",
      "Public Feed",
      "Author Profiles"
    ],
    link: "https://scrybe.hafzism.com",
    github: "https://github.com/hafzism/scrybe",
    year: "2025",
    tech: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
      { name: "JWT", icon: "https://user-images.githubusercontent.com/5418178/177059352-fe91dcd5-e17b-4103-88ae-70d6d396cf85.png" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" }
    ]
  },{
  id: "tabtrails",
  title: "TabTrails",
  description: "A semantic memory layer for your browser — powered by Google Gemini AI and Supabase.",
  icon: tabtrailsLogo,
  gradient: "bg-[#5d4b9b]",
  about: "A browser extension and backend service that captures your web history, summarizes it using AI, and enables semantic search. It uses Google Gemini for summarization and embeddings, and Supabase pgvector for high-performance vector search.",
  features: [
    "AI-Powered Summarization",
    "Semantic Vector Search",
    "Natural Language Time Queries",
    "Offline Local-Only Mode",
    "Automated Background Capture",
  ],
  link: "https://tabtrails.hafzism.in", // Replace with your actual live site if different
  github: "https://github.com/hafzism/tabtrail",
  year: "2026",
  tech: [
    { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
    { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
    { name: "Google Gemini", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
    { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
    { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
    { name: "Chrome Extension", icon: "https://skillicons.dev/icons?i=chrome" }
  ]
},
  {
    id: "perfectPrompt",
    title: "Perfect Prompt",
    description: "Supercharge your AI prompts — right where you type them.",
    icon: perfectPromptLogo,
    gradient: "bg-[#f18749]",
    about: "A Chrome Extension (Manifest V3) that injects a floating toolbar into the world's top AI chat platforms — ChatGPT, Gemini, Claude, DeepSeek, and Perplexity — giving you instant tools to refine, review, save, and reuse your prompts, all powered by the Gemini API.",
    features: [
      "AI Prompt Perfecting",
      "Prompt Feedback & Review",
      "Save & Reuse Prompts",
      "Expert Prompt Templates",
      "Multi-Platform Support"
    ],
    github: "https://github.com/hafzism/perfectPrompt",
    year: "2026",
    tech: [
      { name: "Chrome Extension", icon: "https://skillicons.dev/icons?i=chrome" },
      { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
      { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
      { name: "Gemini API", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" }
    ]
  }
];
