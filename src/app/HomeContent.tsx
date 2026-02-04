"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { User, Briefcase, FolderOpen, Send, ArrowRight } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import ProjectMarquee from "@/components/ProjectMarquee";
import ChatSection from "@/components/ChatSection";
import WorkLottie from "@/components/WorkLottie";
import ChatBubbles from "@/components/ChatBubbles";
import { useTheme } from "next-themes";
import { projects } from "@/data/projects";
import VerticalProjectMarquee from "@/components/VerticalProjectMarquee";

const HomeContent = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="h-full overflow-y-auto relative transition-colors duration-500 flex flex-col no-scrollbar">
            <main className="flex-1 container max-w-7xl mx-auto px-6 md:px-10 pt-4 md:pt-8 lg:pt-12 pb-0 relative z-10 flex flex-col">
                {/* Bento Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
                    {/* First Column: About + Work Experience stacked */}
                    <div className="contents sm:flex flex-col gap-2 md:gap-3 lg:gap-4 sm:col-span-1">
                        {/* About Card */}
                        <Link href="/about" className="opacity-0 animate-fade-in-up animation-delay-100 block order-1 sm:order-none">
                            <BentoCard
                                icon={User}
                                title="About"
                                description="A bit about myself."
                                className="h-full min-h-[80px] md:min-h-[100px] lg:min-h-[120px] group"
                            >
                                <WorkLottie />
                            </BentoCard>
                        </Link>

                        {/* Work Experience / Journey Card */}
                        <Link href="/experience" className="block opacity-0 animate-fade-in-up animation-delay-200 order-3 sm:order-none">
                            <BentoCard
                                icon={Briefcase}
                                title="My Journey"
                                description="Freelance, Internship & Education."
                                className="h-full min-h-[80px] md:min-h-[100px] lg:min-h-[120px] group"
                            >
                            </BentoCard>
                        </Link>
                    </div>

                    {/* Projects Card */}
                    <div className="opacity-0 animate-fade-in-up animation-delay-300 sm:col-span-1 order-2 sm:order-none">
                        <div
                            onClick={() => window.location.href = '/projects'}
                            className="block h-full cursor-pointer"
                        >
                            <BentoCard
                                icon={FolderOpen}
                                title="Projects"
                                description="Personal projects I've been working on."
                                className="h-full min-h-[90px] sm:min-h-[150px] lg:min-h-[190px]"
                                verticalAlign="bottom"
                                hideHeader={mounted && window.innerWidth < 640}
                            >
                                {/* Mobile Horizontal Layout */}
                                <div className="sm:hidden w-full h-full flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <FolderOpen className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                                            <h3 className="bento-card-title text-base">Projects</h3>
                                        </div>
                                        <p className="bento-card-description text-xs">Personal projects I've been working on.</p>
                                    </div>
                                    <div className="flex items-center gap-3 h-16 w-16 overflow-hidden relative">
                                        <VerticalProjectMarquee />
                                    </div>
                                </div>

                                {/* Desktop Marquee Layout */}
                                <div className="hidden sm:flex w-full h-full items-center justify-center -mt-2">
                                    <div className="w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                        <ProjectMarquee />
                                    </div>
                                </div>
                            </BentoCard>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <Link href="/contact" className="opacity-0 animate-fade-in-up animation-delay-400 sm:col-span-2 lg:col-span-1 block order-4 sm:order-none">
                        <BentoCard
                            icon={Send}
                            title="Contact"
                            description="Email, LinkedIn, carrier pigeon..."
                            className="h-full min-h-[110px] sm:min-h-[160px] lg:min-h-[190px]"
                            verticalAlign="bottom"
                        >
                            <div className="w-full h-full flex items-center justify-center -mt-2 mb-4">
                                <ChatBubbles />
                            </div>
                        </BentoCard>
                    </Link>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex items-end pb-0">
                    <ChatSection />
                </div>
            </main>
        </div>
    );
};

export default HomeContent;
