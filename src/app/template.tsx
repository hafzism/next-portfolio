"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isProjectsPath = pathname?.startsWith("/projects");
    const animationKey = isProjectsPath ? "projects-shared" : pathname;

    // If we are navigating within projects, we want to let layoutId handle the transition
    // so we disable the standard page fade/slide.
    // However, we still use AnimatePresence so the old page doesn't vanish instantly if we needed it to wait,
    // but for layoutId to work, both components need to exist.
    // Actually, for layoutId to work best between pages, the old page usually needs to persist or the new one needs to mount immediately.
    // Using `mode="popLayout"` helps.

    // We will simply disable the motion effects for project routes to let layoutId take center stage.
    const isProjectRoute = pathname?.startsWith("/projects");

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={animationKey}
                initial={isProjectRoute ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={isProjectRoute ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={isProjectRoute ? { opacity: 1 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
