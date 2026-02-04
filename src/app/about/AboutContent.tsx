"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const AboutContent = () => {
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

    const techStack = [
        { category: "Languages", items: "JavaScript, TypeScript, Python, Bash" },
        { category: "Frontend & UI", items: "React.js, Next.js, Redux, Tailwind, Shadcn, Figma" },
        { category: "Backend & Dev", items: "Node.js, Express.js, RabbitMQ, Redis, JWT, Zod" },
        { category: "Database & Cloud", items: "MongoDB, PostgreSQL, AWS, Azure, Nginx" },
        { category: "Tools & Other", items: "Git, GitHub, CI/CD, Docker, PM2, postman" },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden relative transition-colors duration-500 bg-background/0">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 md:pb-32 relative z-10 no-scrollbar">
                <div className="w-full max-w-2xl mx-auto pt-4">
                    {/* About Me Section */}
                    <section className="mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-serif text-foreground mb-4 md:mb-6 tracking-tight">
                            About Me
                        </h2>
                        <div className="text-sm md:text-lg lg:text-lg text-muted-foreground space-y-4 md:space-y-6 leading-relaxed font-normal">
                            <p>
                                I’m a software developer from Kerala, India, with a passion for building{" "}
                                <span className="text-foreground underline decoration-primary underline-offset-4 font-medium">
                                    real-world applications
                                </span>{" "}
                                that create actual business value.
                            </p>
                            <p>
                                My journey into computer science started during my school days, while exploring different fields and gradually realizing that technology and problem-solving were what interested me the most. That led me to pursue a{" "}
                                <span className="text-foreground underline decoration-primary underline-offset-4 font-medium">
                                    Bachelor’s degree
                                </span>{" "}
                                in Computer Applications, and later work with{" "}
                                <a
                                    href="https://devxtra.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground underline decoration-primary underline-offset-4 font-medium hover:text-primary transition-colors"
                                >
                                    DevXtra
                                </a>
                                , where I built{" "}
                                <Link
                                    href="/projects/hayon"
                                    className="text-foreground underline decoration-primary underline-offset-4 font-medium hover:text-primary transition-colors"
                                >
                                    hayon
                                </Link>
                                , a platform that introduced me to real production systems and real users.
                            </p>
                            <p>
                                When I’m not writing code or thinking through problems, I enjoy travelling, watching movies, and reading.
                            </p>
                        </div>
                    </section>

                    {/* Tech Stack Section */}
                    <section className="pb-12 border-t border-border/10 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-serif text-foreground mb-4 md:mb-6 tracking-tight">
                            Tech Stack
                        </h2>
                        <div className="space-y-2 md:space-y-3 lg:space-y-2">
                            {techStack.map((tech) => (
                                <div key={tech.category} className="text-xs md:text-sm lg:text-base leading-relaxed flex flex-row gap-2">
                                    <span className="font-bold text-foreground shrink-0">{tech.category}:</span>
                                    <span className="text-muted-foreground">{tech.items}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AboutContent;
