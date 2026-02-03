import Link from "next/link";
import { projects } from "@/data/projects";
import Image, { StaticImageData } from "next/image";

const ProjectMarquee = () => {
  const doubledProjects = [...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects];

  return (
    <div className="marquee-container py-2">
      <div className="marquee-content">
        {doubledProjects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projects/${project.id}`}
            className={`project-icon ${(project.id === 'hayon' || project.id === 'NearBuy') ? 'bg-white' :
              (project.id === 'scrybe') ? 'bg-[#1e3876]' :
                (project.id === 'LitBay') ? 'bg-[#be9971]' : project.gradient
              } text-white shrink-0 cursor-pointer hover:scale-110 transition-transform overflow-hidden flex items-center justify-center`}
            title={project.title}
          >
            {typeof project.icon === 'string' ? (
              <span className="text-4xl">{project.icon}</span>
            ) : (
              <Image
                src={project.icon as StaticImageData}
                alt={project.title}
                className="w-full h-full object-contain p-2 md:p-3"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;
