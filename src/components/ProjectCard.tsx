import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProjectTransition } from "@/context/ProjectTransitionContext";
import { useRef } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  index: number;
}

const ProjectCard = ({ id, title, description, icon, gradient, index }: ProjectCardProps) => {
  const router = useRouter();
  const { startTransition, transitionState } = useProjectTransition();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      startTransition(id, rect);

      // Small delay to allow the animation to start
      setTimeout(() => {
        router.push(`/projects/${id}`);
      }, 50);
    }
  };

  const isSelected = transitionState.selectedProjectId === id;
  const isOtherTransitioning = transitionState.isTransitioning && !isSelected;

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${id}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isOtherTransitioning ? 0 : 1,
        y: 0,
        transition: {
          opacity: { duration: 0.3 },
          y: { duration: 0.4, delay: index * 0.1 }
        }
      }}
      className={cn(
        "group cursor-pointer sticky rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 transition-shadow duration-300",
        "hover:shadow-2xl shadow-lg",
        gradient
      )}
      style={{
        top: `${60 + index * 30}px`,
        zIndex: index + 1,
      }}
    >
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        {/* Icon */}
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg md:rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center text-xl md:text-2xl lg:text-3xl shrink-0 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base lg:text-xl font-semibold text-white mb-0.5 font-serif">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-white/80 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
