"use client";

import { useState, useEffect } from "react";
import { Send, Linkedin, Github, Instagram, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ContactContent = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    ...formData,
                    subject: `New Portfolio Contact: ${formData.name}`,
                    from_name: formData.name,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    message: "",
                });

                // Reset to idle after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                console.error("Web3Forms Error:", result);
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="h-full flex flex-col overflow-y-auto relative transition-colors duration-500 no-scrollbar bg-background/0">
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 md:px-8 pb-16 md:pb-8 relative z-10">
                <div className="w-full max-w-[90%] md:max-w-md">
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
                                required
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
                                required
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
                                required
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 md:py-2.5 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending" || status === "success"}
                            className={cn(
                                "w-full py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium",
                                status === "idle" && "bg-primary text-primary-foreground hover:opacity-90",
                                status === "sending" && "bg-primary/50 text-primary-foreground cursor-wait",
                                status === "success" && "bg-green-600 text-white",
                                status === "error" && "bg-red-600 text-white"
                            )}
                        >
                            {status === "idle" && (
                                <>
                                    <span>Send Message</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                            {status === "sending" && <span>Sending...</span>}
                            {status === "success" && <span>Message Sent!</span>}
                            {status === "error" && <span>Error! Please Try Again</span>}
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
                        <a
                            href="https://instagram.com/hafzism"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#E1306C] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>

                    {/* Email Display */}
                    <div className="flex flex-col items-center mt-6">
                        <a
                            href="mailto:thehafzism@gmail.com"
                            className="text-sm md:text-base font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            thehafzism@gmail.com
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactContent;
