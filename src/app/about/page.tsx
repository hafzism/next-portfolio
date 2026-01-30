"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const About = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    const specs = [
        { label: "Location", value: "Auckland, New Zealand" },
        { label: "Languages", value: "English (Fluent), French (Native), TypeScript" },
        { label: "Education", value: "Self-Taught" },
    ];

    const techStack = [
        { category: "Core Frontend", items: "React, Tailwind CSS, TypeScript" },
        { category: "Animation & UI", items: "Motion, Shadcn UI, Mantine, Three.js" },
        { category: "Backend & Runtimes", items: "Node.js, NestJS, Deno, Bun" },
        { category: "Data & BaaS", items: "PostgreSQL, MongoDB, Supabase, Convex" },
        { category: "Infrastructure & Cloud", items: "Docker, GCP, Cloudflare Workers, Vercel" },
        { category: "Currently Exploring", items: "React Native, Go, Effect.ts" },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden relative transition-colors duration-500 bg-background/0">

            {/* Fixed Header */}

            {/* Main Content - Scrollable on mobile if needed */}
            <main className="flex-1 overflow-y-auto px-4 pb-16 md:pb-8 relative z-10 no-scrollbar">
                <div className="w-full max-w-2xl mx-auto">
                    {/* About Me Section */}
                    <section className="mb-4 md:mb-6">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-serif text-foreground mb-2 md:mb-3">
                            About Me
                        </h2>
                        <div className="text-xs md:text-sm lg:text-base text-muted-foreground space-y-2 md:space-y-3 leading-relaxed">
                            <p>
                                I am a Software Engineer based in Auckland, New Zealand with a passion for building{" "}
                                <span className="text-foreground underline decoration-primary underline-offset-2">
                                    UX-heavy web applications
                                </span>{" "}
                                that drive real business results.
                            </p>
                            <p>
                                My journey into engineering was non-traditional. I started self-teaching during the
                                pandemic and haven't stopped since. That drive led me to build{" "}
                                <Link href="/projects/scraaatch" className="text-foreground border-b border-primary">
                                    Scraaatch
                                </Link>
                                , a platform I scaled to 1,200+ active users. I don't just write code, I ship
                                products that people use.
                            </p>
                            <p className="hidden md:block">
                                When I'm not shipping features or mentoring junior devs, I'm an avid traveller,
                                ex-homebrewer, and football fan.
                            </p>
                        </div>
                    </section>

                    {/* The Specs Section */}
                    <section className="mb-4 md:mb-6">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-serif text-foreground mb-2 md:mb-3">
                            The Specs
                        </h2>
                        <ul className="space-y-1 md:space-y-1.5">
                            {specs.map((spec) => (
                                <li key={spec.label} className="flex items-start gap-2 text-xs md:text-sm lg:text-base">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                    <span>
                                        <span className="text-foreground font-medium">{spec.label}:</span>{" "}
                                        <span className="text-muted-foreground">{spec.value}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Tech Stack Section */}
                    <section>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-serif text-foreground mb-2 md:mb-3">
                            Tech Stack
                        </h2>
                        <ul className="space-y-1 md:space-y-1.5">
                            {techStack.map((tech) => (
                                <li key={tech.category} className="flex items-start gap-2 text-xs md:text-sm lg:text-base">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                    <span>
                                        <span className="text-foreground font-medium">{tech.category}:</span>{" "}
                                        <span className="text-muted-foreground">{tech.items}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default About;
