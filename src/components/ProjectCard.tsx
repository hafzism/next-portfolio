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
  className?: string;
}

const ProjectCard = ({ id, title, description, icon, gradient, index, className }: ProjectCardProps) => {
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
          opacity: { duration: 0.5 },
          y: { duration: 0.6, delay: index * 0.1 }
        }
      }}
      className={cn(
        "group cursor-pointer rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 transition-shadow duration-300",
        "hover:shadow-2xl shadow-lg",
        gradient,
        className
      )}
    >
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        {/* Icon */}
        <motion.div
          layoutId={`project-icon-${id}`}
          className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shrink-0 transition-transform duration-300 group-hover:scale-110"
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 relative z-10">
          <motion.h3
            layoutId={`project-title-${id}`}
            className="text-base md:text-xl lg:text-2xl font-semibold text-white mb-1 font-serif"
          >
            {title}
          </motion.h3>
          <motion.p
            layoutId={`project-desc-${id}`}
            className="text-sm md:text-base text-white/80 line-clamp-2"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
