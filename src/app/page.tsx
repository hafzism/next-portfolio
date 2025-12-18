"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Briefcase, FolderOpen, Send } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import ProjectMarquee from "@/components/ProjectMarquee";
import ChatSection from "@/components/ChatSection";
import PullChainSwitch from "@/components/PullChainSwitch";
import NightSky from "@/components/NightSky";
import ChatBubbles from "@/components/ChatBubbles";
import CharacterWithEyes from "@/components/CharacterWithEyes";
import SideNav from "@/components/SideNav";
import { useTheme } from "next-themes";

const Index = () => {
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

  return (
    <div className="h-screen bg-background relative overflow-hidden transition-colors duration-500 flex flex-col">
      <NightSky isVisible={isDark} />
      <PullChainSwitch isDark={isDark} onToggle={toggleTheme} />
      <SideNav currentPage="/" /> {/* Hidden on home page */}

      <main className="flex-1 container max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-8 lg:py-12 relative z-10 flex flex-col">
        {/* Header */}
        <header className="text-center mb-4 md:mb-8 lg:mb-12 opacity-0 animate-fade-in-up flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-1 md:mb-2">
            Franck Poingt
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground tracking-wide">
            Software Engineer
          </p>
        </header>

        {/* Bento Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
          {/* First Column: About + Work Experience stacked */}
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 sm:col-span-1">
            {/* About Card */}
            <Link href="/about" className="opacity-0 animate-fade-in-up animation-delay-100 block">
              <BentoCard
                icon={User}
                title="About"
                description="A bit about myself."
                className="h-full min-h-[80px] md:min-h-[100px] lg:min-h-[140px]"
              >
                <div className="absolute bottom-0 right-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 pointer-events-none">
                  <CharacterWithEyes variant="face" className="w-full h-full" />
                </div>
              </BentoCard>
            </Link>

            {/* Work Experience Card */}
            <div className="opacity-0 animate-fade-in-up animation-delay-200">
              <BentoCard
                icon={Briefcase}
                title="Work Experience"
                description="My career as a Software Engineer."
                className="h-full min-h-[80px] md:min-h-[100px] lg:min-h-[140px]"
              >
                <div className="absolute bottom-0 right-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 pointer-events-none">
                  <CharacterWithEyes variant="laptop" className="w-full h-full" />
                </div>
              </BentoCard>
            </div>
          </div>

          {/* Projects Card */}
          <div className="opacity-0 animate-fade-in-up animation-delay-300 sm:col-span-1">
            <Link href="/projects" className="block h-full">
              <BentoCard
                icon={FolderOpen}
                title="Projects"
                description="Personal projects I've been working on."
                className="h-full min-h-[120px] sm:min-h-[180px] lg:min-h-[296px]"
              >
                <div className="absolute top-2 md:top-3 lg:top-4 right-2 md:right-3 lg:right-4 flex items-center gap-1">
                  <div className="w-1 md:w-1.5 lg:w-2 h-1 md:h-1.5 lg:h-2 rounded-full bg-green-500" />
                  <div className="w-1 md:w-1.5 lg:w-2 h-1 md:h-1.5 lg:h-2 rounded-full bg-green-500" />
                  <div className="w-1 md:w-1.5 lg:w-2 h-1 md:h-1.5 lg:h-2 rounded-full bg-green-500" />
                </div>
                <div className="mt-2 md:mt-4 lg:mt-6 -mx-3 md:-mx-4 lg:-mx-6 -mb-3 md:-mb-4 lg:-mb-6">
                  <ProjectMarquee />
                </div>
              </BentoCard>
            </Link>
          </div>

          {/* Contact Card */}
          <Link href="/contact" className="opacity-0 animate-fade-in-up animation-delay-400 sm:col-span-2 lg:col-span-1 block">
            <BentoCard
              icon={Send}
              title="Contact"
              description="Email, LinkedIn, carrier pigeon..."
              className="h-full min-h-[120px] sm:min-h-[140px] lg:min-h-[296px]"
            >
              <ChatBubbles />
            </BentoCard>
          </Link>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex items-end pb-2 md:pb-4">
          <ChatSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
