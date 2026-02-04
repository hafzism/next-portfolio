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
  hideHeader?: boolean;
}

const BentoCard = ({
  icon: Icon,
  title,
  description,
  children,
  className = "",
  onClick,
  verticalAlign = "top",
  hideHeader = false
}: BentoCardProps) => {
  return (
    <div
      className={`bento-card cursor-pointer flex flex-col ${verticalAlign === "bottom" ? "justify-between" : ""} ${className}`}
      onClick={onClick}
    >
      {verticalAlign === "bottom" && <div className="flex-1 w-full">{children}</div>}

      {!hideHeader && (
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 sm:block sm:mb-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground sm:mb-2 md:mb-3" strokeWidth={1.5} />
            <h3 className="bento-card-title text-base md:text-lg">{title}</h3>
          </div>
          <p className="bento-card-description text-xs md:text-sm">{description}</p>
        </div>
      )}

      {verticalAlign === "top" && children}
    </div>
  );
};

export default BentoCard;
