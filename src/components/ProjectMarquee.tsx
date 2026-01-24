import Link from "next/link";
import { projects } from "@/data/projects";

const ProjectMarquee = () => {
  const doubledProjects = [...projects, ...projects, ...projects, ...projects];

  return (
    <div className="marquee-container py-2">
      <div className="marquee-content">
        {doubledProjects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projects/${project.id}`}
            className={`project-icon ${project.gradient} text-white shrink-0 cursor-pointer hover:scale-110 transition-transform`}
            title={project.title}
          >
            <span className="text-4xl">{project.icon}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;
