import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  verticalAlign?: "top" | "bottom";
}

const BentoCard = ({
  icon: Icon,
  title,
  description,
  children,
  className = "",
  onClick,
  verticalAlign = "top"
}: BentoCardProps) => {
  return (
    <div
      className={`bento-card cursor-pointer flex flex-col ${verticalAlign === "bottom" ? "justify-between" : ""} ${className}`}
      onClick={onClick}
    >
      {verticalAlign === "bottom" && <div className="flex-1 w-full">{children}</div>}

      <div className="relative z-10">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground mb-2 md:mb-3" strokeWidth={1.5} />
        <h3 className="bento-card-title text-base md:text-lg">{title}</h3>
        <p className="bento-card-description text-xs md:text-sm">{description}</p>
      </div>

      {verticalAlign === "top" && children}
    </div>
  );
};

export default BentoCard;
