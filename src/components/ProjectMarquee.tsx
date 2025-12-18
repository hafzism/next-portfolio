import { Brush, Rabbit, Leaf, Code2, Sparkles, Gamepad2, Music, Camera } from "lucide-react";

const projects = [
  { icon: Brush, bg: "bg-purple-500", name: "Scraaatch" },
  { icon: Rabbit, bg: "bg-green-500", name: "AnAss" },
  { icon: Leaf, bg: "bg-emerald-500", name: "Daily Story" },
  { icon: Code2, bg: "bg-red-500", name: "Zod Builder" },
  { icon: Sparkles, bg: "bg-amber-500", name: "Magic" },
  { icon: Gamepad2, bg: "bg-blue-500", name: "Games" },
  { icon: Music, bg: "bg-pink-500", name: "Beats" },
  { icon: Camera, bg: "bg-cyan-500", name: "Photos" },
];

const ProjectMarquee = () => {
  const doubledProjects = [...projects, ...projects];

  return (
    <div className="marquee-container py-2">
      <div className="marquee-content">
        {doubledProjects.map((project, index) => (
          <div
            key={index}
            className={`project-icon ${project.bg} text-white shrink-0`}
            title={project.name}
          >
            <project.icon className="w-7 h-7" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;
