import Link from "next/link";
import { FolderOpen, User, Home, Briefcase, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavProps {
  currentPage?: string;
}

const SideNav = ({ currentPage }: SideNavProps) => {
  // Hide on home page
  if (currentPage === "/") return null;

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: FolderOpen, path: "/projects", label: "Projects" },
    { icon: User, path: "/about", label: "About" },
    { icon: Briefcase, path: "/#work", label: "Work" },
    { icon: Send, path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop: Left side */}
      <nav className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 bg-card/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.path ||
            (item.path === "/projects" && currentPage?.startsWith("/projects")) ||
            (item.path === "/about" && currentPage === "/about") ||
            (item.path === "/contact" && currentPage === "/contact");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                "hover:bg-secondary",
                isActive && "bg-secondary ring-2 ring-border"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
            </Link>
          );
        })}
      </nav>

      {/* Mobile/Tablet: Bottom fixed */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center gap-2 bg-card/90 backdrop-blur-sm p-2 shadow-lg border-t border-border">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.path ||
            (item.path === "/projects" && currentPage?.startsWith("/projects")) ||
            (item.path === "/about" && currentPage === "/about") ||
            (item.path === "/contact" && currentPage === "/contact");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                "hover:bg-secondary",
                isActive && "bg-secondary ring-2 ring-border"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SideNav;
