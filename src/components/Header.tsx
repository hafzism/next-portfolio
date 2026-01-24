"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isProjects = pathname === "/projects";

    return (
        <header className={cn(
            "text-center flex-shrink-0 relative z-50 transition-all duration-300",
            // Home page has slightly different margins/spacing in original, but standardizing helps stability
            // About/Contact/ProjectDetail use py-4 md:py-6 lg:py-8
            "py-4 md:py-6 lg:py-8"
        )}>
            <Link href="/" className="inline-block mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-1 font-serif leading-tight">
                    Mohammed Hafeez
                </h1>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground font-sans font-bold -mt-1">
                Software Engineer
            </p>
        </header>
    );
};

export default Header;
