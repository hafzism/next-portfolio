import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProjectTransition } from "@/context/ProjectTransitionContext";
import { useRef, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: string | ReactNode | StaticImageData;
  gradient: string;
  index: number;
  className?: string;
}

const ProjectCard = ({ id, title, description, icon, gradient, index, className }: ProjectCardProps) => {
  const router = useRouter();
  const { startTransition, transitionState } = useProjectTransition();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (id === 'coming-soon') {
      router.push('/contact');
      return;
    }

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      startTransition(id, rect);

      // Small delay to allow the animation to start
      setTimeout(() => {
        router.push(`/projects/${id}`);
      }, 10); // Minimal delay to let react state update, but fast enough to feel instant
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
        "group cursor-pointer rounded-[2rem] p-6 md:p-8 transition-shadow duration-300",
        "min-h-[160px] md:min-h-[200px] flex flex-col justify-center relative overflow-hidden",
        "hover:shadow-2xl shadow-lg",
        gradient,
        className
      )}
    >
      {/* Texture Overlay */}
      <div className="grain-overlay opacity-[0.08]" />

      <div className="flex flex-row items-center gap-6 md:gap-8 relative z-10">
        {/* Icon */}
        <motion.div
          layoutId={`project-icon-${id}`}
          className={cn(
            "w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden",
            (id === 'hayon' || id === 'NearBuy') ? 'bg-white' :
              (id === 'scrybe') ? 'bg-[#1e3876]' :
                (id === 'LitBay') ? 'bg-[#be9971]' : 'bg-black/10'
          )}
        >
          {typeof icon === 'string' || (!icon || (typeof icon === 'object' && !('src' in icon))) ? (
            icon
          ) : (
            <Image
              src={icon as StaticImageData}
              alt={title}
              className="w-full h-full object-contain p-4 md:p-6"
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <motion.h3
            layoutId={`project-title-${id}`}
            className="text-base md:text-2xl font-bold text-white mb-3 md:mb-4 font-serif tracking-tight"
          >
            {title}
          </motion.h3>
          <motion.p
            layoutId={`project-desc-${id}`}
            className="text-xs md:text-base text-white/90 line-clamp-2 max-w-xl font-medium leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
