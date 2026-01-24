"use client";

import ProjectDetail from "../../[id]/page";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function InterceptedProjectDetail() {
    const router = useRouter();
    return (
        <div className="fixed inset-0 z-50 flex flex-col">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/95 backdrop-blur-md"
            />
            {/* Content Container - z-index higher than backdrop */}
            <div className="relative z-10 w-full h-full overflow-hidden flex flex-col">
                <Header />
                <ProjectDetail onBack={() => router.back()} />
            </div>
        </div>
    );
}
