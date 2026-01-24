"use client";

import Link from "next/link";
import { ArrowLeft, Briefcase, GraduationCap, Laptop, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Mock Data - "Random" things for user to edit later
const experienceData = [
    {
        id: 1,
        role: "Freelance Creative Developer",
        company: "Self-Employed",
        period: "2024 - Present",
        description: "Crafting bespoke digital experiences for diverse clients. Specializing in high-performance Next.js applications, 3D interactions, and accessible UI design.",
        icon: Laptop,
        tags: ["Next.js", "React", "WebGL", "Design Systems"],
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        id: 2,
        role: "Software Engineering Intern",
        company: "TechNova Solutions",
        period: "2023 - 2024",
        description: "Collaborated with senior engineers to build scalable REST APIs. Optimized database queries reducing load times by 40%. Contributed to the internal design system.",
        icon: Briefcase,
        tags: ["TypeScript", "Node.js", "PostgreSQL", "CI/CD"],
        color: "bg-purple-500/10 text-purple-500"
    },
    {
        id: 3,
        role: "Bachelor's in Computer Science",
        company: "Future University",
        period: "2019 - 2023",
        description: "Graduated with Honors. Focused on Algorithms, Data Structures, and Human-Computer Interaction. Led the university coding club.",
        icon: GraduationCap,
        tags: ["Algorithms", "OS", "System Design"],
        color: "bg-orange-500/10 text-orange-500"
    }
];

const Experience = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <div className="h-full relative flex flex-col font-sans">
            {/* Simple Back Navigation */}
            <div className="fixed top-6 left-6 z-50 md:hidden">
                <Link href="/" className="p-3 bg-background/50 backdrop-blur-md rounded-full shadow-lg border border-border/50 block">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-10 px-4 md:px-6 pb-20 pt-8">
                <div className="max-w-3xl mx-auto">



                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-border/50 -translate-x-1/2 hidden md:block" />
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border/50 md:hidden" />

                        {experienceData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={cn(
                                        "relative flex flex-col md:flex-row gap-8 mb-12 md:mb-16 group",
                                        isEven ? "md:flex-row-reverse" : ""
                                    )}
                                >
                                    {/* Timeline Node/Dot */}
                                    <div className="absolute left-6 md:left-1/2 top-0 w-4 h-4 rounded-full border-4 border-background bg-foreground shadow-lg -translate-x-1/2 z-10 mt-1.5" />

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 hidden md:block" />

                                    {/* Card Content */}
                                    <div className="flex-1 pl-12 md:pl-0">
                                        <div className={cn(
                                            "relative p-6 rounded-2xl border backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1",
                                            isDark
                                                ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                                : "bg-white border-black/5 hover:border-black/10"
                                        )}>
                                            {/* Period Pill */}
                                            <div className="absolute -top-3 left-6 inline-block px-3 py-1 rounded-full text-xs font-medium bg-background border shadow-sm text-muted-foreground">
                                                {item.period}
                                            </div>

                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4 mt-2">
                                                <div>
                                                    <h3 className="text-xl font-medium mb-1">{item.role}</h3>
                                                    <p className="text-muted-foreground text-sm font-medium">{item.company}</p>
                                                </div>
                                                <div className={cn("p-2.5 rounded-xl", item.color)}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-muted-foreground/80 leading-relaxed mb-4 text-sm">
                                                {item.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-medium border border-border/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Utility Styles */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Experience;
