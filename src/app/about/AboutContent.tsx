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
        { category: "Frontend & UI", items: "React.js, Next.js, Redux, Tailwind CSS, Shadcn/UI, Figma" },
        { category: "Backend & Dev", items: "Node.js, Express.js, RabbitMQ, Redis, RESTful APIs, JWT, Zod" },
        { category: "Database & Cloud", items: "MongoDB, PostgreSQL, AWS, Azure, Nginx" },
        { category: "Tools & Other", items: "Git, GitHub, GitHub Actions (CI/CD), Docker, PM2, Postman, Agile" },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden relative transition-colors duration-500 bg-background/0">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-4 pb-16 md:pb-8 relative z-10 no-scrollbar">
                <div className="w-full max-w-2xl mx-auto">
                    {/* About Me Section */}
                    <section className="mb-6 md:mb-8">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground mb-4 md:mb-6">
                            About Me
                        </h2>
                        <div className="text-sm md:text-base lg:text-lg text-muted-foreground space-y-4 md:space-y-6 leading-relaxed">
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
                    <section>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground mb-4 md:mb-6">
                            Tech Stack
                        </h2>
                        <div className="space-y-0.5 md:space-y-1">
                            {techStack.map((tech) => (
                                <div key={tech.category} className="text-xs md:text-sm lg:text-base leading-relaxed">
                                    <span className="font-bold text-foreground">{tech.category}: </span>
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
