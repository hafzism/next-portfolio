"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const experienceData = [
    {
        id: 1,
        role: "Freelance Developer",
        company: "Independent",
        period: "2024 – Present",
        description: "Worked on real-world applications by handling requirements, building solutions, and delivering usable outcomes independently.",
        tags: ["real requirements", "problem solving", "independent delivery", "client communication"],
        color: "blue"
    },
    {
        id: 2,
        role: "Software Developer Intern",
        company: "DevXtra",
        period: "Jun 2025 – Present",
        description: "Worked on JavaScript-based applications and shipped multiple production-ready systems. Collaborated closely with teams, participated in knowledge-sharing sessions, and contributed to real-world products used by actual users.",
        tags: ["production applications", "JavaScript ecosystem", "team collaboration", "system workflows", "application logic", "knowledge sharing"],
        color: "purple"
    },
    {
        id: 3,
        role: "Bachelor of Computer Applications",
        company: "University of Calicut",
        period: "2022 – 2025",
        description: "Built a strong foundation in computer applications and software systems, and actively participated in workshops, technical sessions, exhibitions, and different team projects.",
        tags: ["software engineering", "operating systems", "computer science", "system thinking", "programming concepts"],
        color: "orange"
    },
    {
        id: 4,
        role: "CS50P",
        company: "Harvard University",
        period: "2025",
        description: "An introduction to programming with Python course by Harvard University focused on writing clean programs, building logic step by step, and completing a final project using Python.",
        tags: ["programming foundations", "problem solving", "logical thinking", "computational concepts"],
        color: "blue"
    },
    {
        id: 5,
        role: "CS50x",
        company: "Harvard University",
        period: "2024",
        description: "An introduction to computer science course by Harvard University that helped me understand how computers work at a fundamental level and apply those concepts by building a final project.",
        tags: ["CS fundamentals", "algorithms", "abstraction", "problem solving"],
        color: "purple"
    },
    {
        id: 6,
        role: "Project Intern",
        company: "RISS Technologies",
        period: "Aug 2024 – Feb 2025",
        description: "Worked as part of a team on an e-commerce platform, building the end-to-end project flow with a Python-based backend and Flutter frontend.",
        tags: ["team-based development", "application workflows", "backend fundamentals", "frontend integration"],
        color: "blue"
    },
    {
        id: 7,
        role: "Certified Penetration Testing",
        company: "RedTeam Hacker Academy",
        period: "Mar 2024 – May 2024",
        description: "Learned the fundamentals of cybersecurity and practical security analysis techniques.",
        tags: ["security fundamentals", "networking concepts", "penetration testing", "traffic analysis"],
        color: "orange"
    }
];

const ExperienceCard = ({ item, index }: { item: typeof experienceData[0], index: number }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const dotRef = useRef(null);

    // Activate dot when it reaches the upper part of the viewport (where the line is growing)
    const isReached = useInView(dotRef, {
        once: false,
        margin: "0px 0px -90% 0px" // Adjust this to time it with the line growth
    });

    const hoverBgColors = {
        blue: "group-hover:bg-blue-500/10",
        purple: "group-hover:bg-purple-500/10",
        orange: "group-hover:bg-orange-500/10",
    };

    const activeDotColors = {
        blue: "bg-blue-500 border-blue-500/50 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
        purple: "bg-purple-500 border-purple-500/50 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
        orange: "bg-orange-500 border-orange-500/50 scale-125 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    };

    const dotColors = {
        blue: "group-hover:bg-blue-500",
        purple: "group-hover:bg-purple-500",
        orange: "group-hover:bg-orange-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative pl-12 pb-8 group last:pb-0"
        >
            {/* Dot on the timeline */}
            <div
                ref={dotRef}
                className={cn(
                    "absolute left-0 top-0 w-3 h-3 rounded-full bg-border border-2 border-background z-20 transition-all duration-500 group-hover:scale-150 group-hover:border-primary/50",
                    isReached ? activeDotColors[item.color as keyof typeof activeDotColors] : dotColors[item.color as keyof typeof dotColors]
                )}
            />

            {/* Content Card - Using bento-card class to match landing page */}
            <div className={cn(
                "bento-card p-4 md:p-5 transition-all duration-500 hover:-translate-y-0.5 relative overflow-hidden bg-card max-w-xl",
                hoverBgColors[item.color as keyof typeof hoverBgColors]
            )}>
                <div className="flex flex-col gap-1 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg md:text-xl font-medium tracking-tight transition-colors group-hover:text-primary leading-tight">
                            {item.role}
                        </h3>
                        <div className="grid grid-cols-2 gap-1.5 shrink-0">
                            {item.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md bg-secondary/60 text-[9px] uppercase tracking-wider font-bold text-muted-foreground border border-border/40 group-hover:border-primary/20 transition-all duration-300 whitespace-nowrap text-center"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground font-medium text-[11px] md:text-xs">
                        <span className="text-foreground/70">{item.company}</span>
                        <span className="hidden md:inline w-1 h-1 rounded-full bg-muted-foreground/20" />
                        <span className="opacity-70">{item.period}</span>
                    </div>
                </div>

                <p className="text-muted-foreground/90 leading-relaxed mt-1.5 relative z-10 text-sm md:text-base">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
};

const ExperienceContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="h-full relative flex flex-col font-sans overflow-y-auto no-scrollbar scroll-smooth">
            <main className="flex-1 px-4 md:px-8 pb-32 pt-10 md:pt-14">
                <div className="max-w-3xl mx-auto pl-4 md:pl-12">
                    {/* Timeline Container */}
                    <div className="relative">
                        {/* Static Vertical Line */}
                        <div className="absolute left-[5.5px] top-2 bottom-0 w-[1px] bg-border/40 z-0" />

                        {/* Animated Vertical Line */}
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="absolute left-[5.5px] top-2 bottom-0 w-[1px] bg-foreground z-10"
                        />

                        {/* Experience Items */}
                        <div className="flex flex-col">
                            {experienceData.map((item, index) => (
                                <ExperienceCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Footer Call to Action */}
                    <div className="pl-12 mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 rounded-2xl border border-border/50 bg-secondary/5 backdrop-blur-sm text-center max-w-xl"
                        >
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Want to work together?</h2>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm md:text-base">
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm transition-transform hover:scale-105 active:scale-95"
                            >
                                Get in touch
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ExperienceContent;
