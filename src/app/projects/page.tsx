"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNav from "@/components/SideNav";
import PullChainSwitch from "@/components/PullChainSwitch";
import NightSky from "@/components/NightSky";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import { useProjectTransition } from "@/context/ProjectTransitionContext";
import { useTheme } from "next-themes";

const Projects = () => {
    const { theme, setTheme } = useTheme();
    const { transitionState, endTransition } = useProjectTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Reset transition state when coming back to projects
        endTransition();
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    const isTransitioning = transitionState.isTransitioning;

    return (
        <div className="h-screen bg-background relative overflow-hidden transition-colors duration-500 flex flex-col">
            <NightSky isVisible={isDark} />
            <PullChainSwitch isDark={isDark} onToggle={toggleTheme} />
            <SideNav currentPage="/projects" />

            {/* Fixed Header */}
            <motion.header
                className="text-center py-4 md:py-6 lg:py-8 flex-shrink-0"
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-1 md:mb-2 hover:opacity-70 transition-opacity">
                        Franck Poingt
                    </h1>
                </Link>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground tracking-wide">
                    Software Engineer
                </p>
            </motion.header>

            <main className="flex-1 container max-w-3xl mx-auto px-4 md:px-6 relative z-10 overflow-y-auto pb-16 md:pb-4">
                {/* Project Cards - CSS Sticky Stacking */}
                <div className="pb-[30vh]">
                    <AnimatePresence mode="sync">
                        {projects.map((project, index) => (
                            <div key={project.id} className="mb-3 md:mb-4">
                                <ProjectCard
                                    id={project.id}
                                    title={project.title}
                                    description={project.description}
                                    icon={project.icon}
                                    gradient={project.gradient}
                                    index={index}
                                />
                            </div>
                        ))}
                    </AnimatePresence>

                    {/* New Project Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isTransitioning ? 0 : 1, y: 0 }}
                        transition={{ delay: projects.length * 0.1 + 0.2 }}
                    >
                        <Link
                            href="/#contact"
                            className="group block sticky rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-muted to-secondary border-2 border-dashed border-border shadow-lg"
                            style={{
                                top: `${60 + projects.length * 30}px`,
                                zIndex: projects.length + 1,
                            }}
                        >
                            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg md:rounded-xl bg-card/50 backdrop-blur-sm flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <Plus className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm md:text-base lg:text-xl font-semibold text-foreground mb-0.5 font-serif">
                                        New Project
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                        I'm always exploring new ideas. Let's connect
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Projects;
