"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, Linkedin, Github } from "lucide-react";
import SideNav from "@/components/SideNav";
import PullChainSwitch from "@/components/PullChainSwitch";
import NightSky from "@/components/NightSky";
import { useTheme } from "next-themes";

const Contact = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden relative transition-colors duration-500">
            <NightSky isVisible={isDark} />
            <PullChainSwitch isDark={isDark} onToggle={toggleTheme} />
            <SideNav currentPage="/contact" />

            {/* Fixed Header */}
            <header className="text-center py-4 md:py-6 lg:py-8 flex-shrink-0 relative z-10">
                <Link href="/">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-1 md:mb-2 hover:opacity-70 transition-opacity">
                        Hafzism
                    </h1>
                </Link>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground tracking-wide">
                    Software Engineer
                </p>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 pb-16 md:pb-8 relative z-10">
                <div className="w-full max-w-md">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground mb-4 md:mb-6">
                        Get in Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                        <div>
                            <label className="block text-xs md:text-sm text-muted-foreground mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Jon Snow"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 md:py-2.5 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm text-muted-foreground mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="jon.snow@stark.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 md:py-2.5 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm text-muted-foreground mb-1">
                                Company
                            </label>
                            <input
                                type="text"
                                placeholder="Night's Watch Inc."
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-3 py-2 md:py-2.5 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm text-muted-foreground mb-1">
                                Message
                            </label>
                            <textarea
                                placeholder="Winter is coming..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 md:py-2.5 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 md:py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-4 md:mt-6">
                        <a
                            href="https://www.linkedin.com/in/hafzism/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a
                            href="https://github.com/hafzism"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Github className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
