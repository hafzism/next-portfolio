"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useState, useEffect, useRef } from "react";
import { useProjectTransition } from "@/context/ProjectTransitionContext";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface StickyProjectCardProps {
    project: any;
    index: number;
    total: number;
    isDark: boolean;
}

const StickyProjectCard = ({ project, index, total, isDark }: StickyProjectCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { transitionState } = useProjectTransition();

    // We target the CONTAINER for scroll progress to drive the scale of the inner card
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Scale down to 0.95 as the card sits at the top and the next one comes up
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    // Check if THIS specific card is currently transitioning
    const isTransitioning = transitionState.selectedProjectId === project.id;

    // Calculate top offset: 120px is a safe header height approximation + slight graduation
    const topOffset = 120 + (index * 10);

    return (
        // STICKY WRAPPER: Pure CSS, no Framer Motion interference on the position
        <div
            ref={containerRef}
            className="sticky top-0 mb-[25vh] last:mb-0"
            style={{
                top: `${topOffset}px`,
                zIndex: index + 1, // Ascending z-index so newer cards sit on top
            }}
        >
            {/* ANIMATED CONTENT: Handles the depth effect */}
            <motion.div
                style={{ scale: isTransitioning ? 1 : scale }}
                className="relative origin-top"
            >
                {/* Shadow for depth when stacking - theme aware */}
                <div className={cn(
                    "absolute inset-0 -z-10 blur-xl translate-y-8 rounded-[2rem]",
                    isDark ? "bg-black/40" : "bg-black/5"
                )} />

                {project.isComingSoon ? (
                    <ProjectCard
                        id="coming-soon"
                        title="Coming Soon"
                        description="Let's build something together"
                        icon={(
                            <div className="transition-transform duration-500 group-hover:rotate-90">
                                <Plus className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-muted-foreground" />
                            </div>
                        )}
                        gradient={isDark ? 'bg-[#3d2b1f] shadow-2xl shadow-black/40' : 'bg-[#3d2b1f] shadow-2xl shadow-slate-200/50'}
                        index={index}
                        className="border-2 border-dashed border-white/10"
                    />
                ) : (
                    <ProjectCard
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        icon={project.icon}
                        gradient={project.gradient}
                        index={index}
                        className={cn(
                            "shadow-2xl",
                            isDark ? 'shadow-black/40' : 'shadow-slate-200/50'
                        )}
                    />
                )}
            </motion.div>
        </div>
    );
};

const ProjectsContent = () => {
    const { resolvedTheme } = useTheme();
    const { endTransition } = useProjectTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        endTransition();
    }, []);

    if (!mounted) return null;
    const isDark = resolvedTheme === "dark";
    const allProjects = [...projects, { id: 'coming-soon', isComingSoon: true }];

    return (
        <div className="h-full relative overflow-hidden flex flex-col font-sans selection:bg-primary/20 bg-background/0">
            {/* SCROLL CONTAINER */}
            <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-10 px-6 md:px-10 pb-20">
                <div className="max-w-2xl mx-auto pt-8 pb-32">
                    {allProjects.map((project: any, index: number) => (
                        <StickyProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            total={allProjects.length}
                            isDark={isDark}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProjectsContent;
