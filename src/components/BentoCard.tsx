import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const BentoCard = ({ icon: Icon, title, description, children, className = "", onClick }: BentoCardProps) => {
  return (
    <div 
      className={`bento-card cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative z-10">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground mb-2 md:mb-3" strokeWidth={1.5} />
        <h3 className="bento-card-title text-base md:text-lg">{title}</h3>
        <p className="bento-card-description text-xs md:text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default BentoCard;
