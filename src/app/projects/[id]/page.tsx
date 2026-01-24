"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProjectTransition } from "@/context/ProjectTransitionContext";
import { useTheme } from "next-themes";

interface ProjectDetailProps {
    onBack?: () => void;
}

const ProjectDetail = ({ onBack }: ProjectDetailProps) => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { endTransition } = useProjectTransition();
    const [mounted, setMounted] = useState(false);

    console.log("ProjectDetail ID:", id);
    const project = projects.find((p) => p.id === id);
    console.log("Found project:", project);

    const otherProjects = projects.filter((p) => p.id !== id).slice(0, 3);

    useEffect(() => {
        setMounted(true);

        // End transition after component mounts
        const timer = setTimeout(() => {
            endTransition();
        }, 100);

        return () => clearTimeout(timer);
    }, [id]);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-foreground mb-4">Project not found</h1>
                    <Link href="/projects" className="text-primary hover:underline">
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full relative overflow-hidden transition-colors duration-500 flex flex-col bg-background/0">

            {/* Fixed Header */}

            <main className="flex-1 container max-w-3xl mx-auto px-4 md:px-6 relative z-10 overflow-y-auto pb-16 md:pb-4">
                {/* Back Link */}
                <motion.button
                    onClick={() => {
                        if (onBack) {
                            onBack();
                        } else {
                            router.push("/projects");
                        }
                    }}
                    className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 md:mb-4 relative z-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Back to Projects</span>
                </motion.button>

                {/* Project Header Card - Shared Element */}
                <motion.div
                    layoutId={`project-card-${id}`}
                    className={cn(
                        "rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 mb-4 md:mb-6",
                        "border shadow-2xl",
                        // Remove the glass backgrounds, rely on the gradient for the main fill
                        // Keep subtle borders for definition if needed, but gradient is sufficient for bg
                        isDark ? 'border-white/10 shadow-black/40' : 'border-black/5 shadow-slate-200/50',
                        project.gradient
                    )}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                        <motion.div
                            layoutId={`project-icon-${id}`}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shrink-0"
                        >
                            {project.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                            <motion.h3
                                layoutId={`project-title-${id}`}
                                className="text-base md:text-xl lg:text-2xl font-semibold text-white mb-1 font-serif"
                            >
                                {project.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`project-desc-${id}`}
                                className="text-sm md:text-base text-white/80 line-clamp-2"
                            >
                                {project.description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* Content Grid - Fades in after card arrives */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    {/* Left Column - About & Features */}
                    <div className="md:col-span-2 space-y-3 md:space-y-4">
                        {/* About */}
                        <section>
                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-1 md:mb-2 font-serif">
                                About
                            </h3>
                            <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
                                {project.about}
                            </p>
                        </section>

                        {/* Key Features - Hidden on mobile for space */}
                        <section className="hidden md:block">
                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-1 md:mb-2 font-serif">
                                Key Features
                            </h3>
                            <ul className="space-y-1 md:space-y-1.5">
                                {project.features.slice(0, 4).map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.05 }}
                                    >
                                        <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right Column - Info & Tech */}
                    <div className="space-y-3 md:space-y-4">
                        {/* Info */}
                        <section>
                            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2 font-serif">
                                Info
                            </h3>
                            <div className="space-y-1 md:space-y-2">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs md:text-sm text-primary hover:underline"
                                    >
                                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                                        <span className="truncate">{project.link}</span>
                                    </a>
                                )}
                                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                    {project.year}
                                </div>
                                {project.users && (
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                                        <Users className="w-3 h-3 md:w-4 md:h-4" />
                                        {project.users}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Tech */}
                        <section>
                            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2 font-serif">
                                Tech
                            </h3>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                                {project.tech.slice(0, 6).map((tech, index) => (
                                    <motion.span
                                        key={tech.name}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-[10px] md:text-xs font-medium"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.05 }}
                                    >
                                        <span>{tech.icon}</span>
                                        {tech.name}
                                    </motion.span>
                                ))}
                            </div>
                        </section>
                    </div>
                </motion.div>

                {/* More Projects - Compact on mobile */}
                <motion.section
                    className="mt-4 md:mt-8 pt-3 md:pt-6 border-t border-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-foreground mb-3 md:mb-4 font-serif">
                        More Projects
                    </h3>
                    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                        {otherProjects.map((otherProject, index) => (
                            <motion.div
                                key={otherProject.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                            >
                                <Link
                                    href={`/projects/${otherProject.id}`}
                                    className={cn(
                                        "shrink-0 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl lg:text-4xl transition-transform hover:scale-110",
                                        otherProject.gradient
                                    )}
                                >
                                    {otherProject.icon}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </main>
        </div>
    );
};

export default ProjectDetail;
