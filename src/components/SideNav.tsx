"use client";

import Link from "next/link";
import { FolderOpen, User, Home, Briefcase, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SideNav = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (pathname === "/") return null;

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: FolderOpen, path: "/projects", label: "Projects" },
    { icon: User, path: "/about", label: "About" },
    { icon: Briefcase, path: "/experience", label: "Work" },
    { icon: Send, path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop: Left side floating dock */}
      <nav className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path ||
            (item.path === "/projects" && pathname?.startsWith("/projects")) ||
            (item.path === "/experience" && pathname?.startsWith("/experience")) ||
            (item.path === "/about" && pathname === "/about") ||
            (item.path === "/contact" && pathname === "/contact");

          return (
            <div key={item.path} className="relative group">
              <Link href={item.path}>
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center relative z-20 transition-colors duration-300",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary rounded-xl z-10 shadow-lg shadow-primary/25"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <Icon className={cn(
                    "w-5 h-5 relative z-20",
                    isActive && "text-primary-foreground" // Ensure icon is readable on active bg
                  )} />
                </motion.div>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Mobile/Tablet: Bottom floating dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-1 p-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path ||
            (item.path === "/projects" && pathname?.startsWith("/projects")) ||
            (item.path === "/about" && pathname === "/about") ||
            (item.path === "/contact" && pathname === "/contact");

          return (
            <Link
              key={item.path}
              href={item.path}
            >
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center relative",
                  isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "text-muted-foreground hover:bg-white/10"
                )}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SideNav;
