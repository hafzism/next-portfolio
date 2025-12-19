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
        endTransition();
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";
    const toggleTheme = () => setTheme(isDark ? "light" : "dark");
    const isTransitioning = transitionState.isTransitioning;

    return (
        <div className="h-screen bg-background relative overflow-hidden flex flex-col font-sans selection:bg-primary/20">
            
            {/* Background & Nav Elements */}
            <NightSky isVisible={isDark} />
            <PullChainSwitch isDark={isDark} onToggle={toggleTheme} />
            <SideNav currentPage="/projects" />

            {/* Fixed Header - Stays put while cards scroll under it */}
            <motion.header
                className="relative z-30 text-center py-6 md:py-8 flex-shrink-0 bg-gradient-to-b from-background via-background/90 to-transparent backdrop-blur-[2px]"
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/">
                    <h1 className="text-3xl md:text-5xl font-medium text-foreground mb-2 tracking-tight hover:opacity-70 transition-opacity">
                        Hafzism
                    </h1>
                </Link>
                <p className="text-sm md:text-base text-muted-foreground tracking-wide font-light">
                    Selected Works & Experiments
                </p>
            </motion.header>

            {/* SCROLL CONTAINER 
               1. no-scrollbar: Hides the bar visually
               2. scroll-smooth: Better feeling
               3. pb-20: Space at bottom
            */}
            <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-10 px-4 md:px-6 pb-20">
                <div className="max-w-3xl mx-auto pt-4 pb-40">
                    <AnimatePresence mode="sync">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100 
                                }}
                                // --- THE MAGIC SAUCE: STICKY STACKING ---
                                className="sticky mb-8 md:mb-12"
                                style={{
                                    // 1. Calculate top offset so they stack like a deck of cards
                                    //    Header is roughly 120px. We start a bit lower.
                                    //    We add index * 10px so each card peeks out slightly below the previous one.
                                    top: `calc(120px + ${index * 15}px)`,
                                    // 2. zIndex ensures newer cards slide OVER older ones
                                    zIndex: index + 1, 
                                }}
                            >
                                {/* Visual Wrapper for the Card
                                    Adds the "Physical Card" look (Shadows, Borders) 
                                */}
                                <div className={`
                                    rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300
                                    ${isDark 
                                        ? 'bg-card/40 border-white/10 shadow-black/40' 
                                        : 'bg-white/80 border-black/5 shadow-slate-200/50'
                                    }
                                `}>
                                    <ProjectCard
                                        id={project.id}
                                        title={project.title}
                                        description={project.description}
                                        icon={project.icon}
                                        gradient={project.gradient}
                                        index={index}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* "New Project" Card - The last one in the stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="sticky"
                        style={{
                            top: `calc(120px + ${projects.length * 15}px)`,
                            zIndex: projects.length + 1,
                        }}
                    >
                        <Link
                            href="/#contact"
                            className={`
                                group relative block w-full rounded-2xl p-8 text-center transition-all duration-300
                                border-2 border-dashed
                                hover:scale-[1.01] hover:shadow-xl
                                ${isDark 
                                    ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20' 
                                    : 'border-black/10 bg-black/5 hover:bg-black/10 hover:border-black/20'
                                }
                            `}
                        >
                            <div className="flex flex-col items-center gap-4 py-8">
                                <div className="p-4 rounded-full bg-background shadow-sm transition-transform duration-500 group-hover:rotate-90">
                                    <Plus className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Coming Soon</h3>
                                    <p className="text-muted-foreground">Lets build something together</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </main>

            {/* Utility Styles for Hiding Scrollbar */}
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

export default Projects;