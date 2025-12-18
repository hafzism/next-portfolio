export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  about: string;
  features: string[];
  link?: string;
  year: string;
  users?: string;
  tech: { name: string; icon: string }[];
}

export const projects: Project[] = [
  {
    id: "scraaatch",
    title: "Scraaatch",
    description: "Create and send custom scratch cards to your family and friends.",
    icon: "🎫",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
    about: "An innovative web application that allows users to design personalized scratch cards for various occasions. Users can customize the design, add messages, and send digital scratch cards to their loved ones.",
    features: [
      "Customisable designs",
      "Personalised messages",
      "Digital delivery",
      "WYSIWYG editor"
    ],
    link: "https://scraaatch.com",
    year: "2022",
    users: "1.2k+",
    tech: [
      { name: "Next.js", icon: "⚡" },
      { name: "TypeScript", icon: "📘" },
      { name: "Supabase", icon: "🗄️" },
      { name: "Resend", icon: "📧" },
      { name: "PWA", icon: "📱" }
    ]
  },
  {
    id: "anass",
    title: "AnAss",
    description: "Trackers, wishlists, todos, calendar, shopping lists and more.",
    icon: "🦊",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    about: "A comprehensive personal organization tool that helps users manage various aspects of their daily life through trackers, wishlists, todos, calendars, and shopping lists.",
    features: [
      "Multiple list types",
      "Calendar integration",
      "Cross-device sync",
      "Offline support"
    ],
    year: "2023",
    tech: [
      { name: "React", icon: "⚛️" },
      { name: "TypeScript", icon: "📘" },
      { name: "Firebase", icon: "🔥" }
    ]
  },
  {
    id: "daily-story",
    title: "Daily Story",
    description: "A platform where the world collaborates on a new short story, from scratch, every 24 hours.",
    icon: "📖",
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    about: "A collaborative writing platform that brings together writers from around the world to create unique short stories. Each day, a new story begins, and contributors add their paragraphs.",
    features: [
      "Daily story reset",
      "Community voting",
      "Story archives",
      "Writer profiles"
    ],
    year: "2023",
    tech: [
      { name: "Next.js", icon: "⚡" },
      { name: "Prisma", icon: "🔷" },
      { name: "PostgreSQL", icon: "🐘" }
    ]
  },
  {
    id: "zod-json-schema-builder",
    title: "Zod & JSON Schema Builder",
    description: "Build your schema visually and get both JSON Schema and Zod validation code.",
    icon: "🔧",
    gradient: "bg-gradient-to-br from-rose-500 to-rose-700",
    about: "A visual schema builder that helps developers create both JSON Schema and Zod validation code. Perfect for API design and form validation.",
    features: [
      "Visual builder",
      "Dual output",
      "Type inference",
      "Export options"
    ],
    year: "2024",
    tech: [
      { name: "React", icon: "⚛️" },
      { name: "Zod", icon: "✓" },
      { name: "TypeScript", icon: "📘" }
    ]
  }
];
