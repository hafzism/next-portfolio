import Link from "next/link";
import { projects } from "@/data/projects";
import Image, { StaticImageData } from "next/image";

const VerticalProjectMarquee = () => {
    const doubledProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <div className="marquee-container-vertical">
            <div className="marquee-content-vertical gap-2">
                {doubledProjects.map((project, index) => (
                    <Link
                        key={`${project.id}-${index}`}
                        href={`/projects/${project.id}`}
                        className={`w-12 h-12 rounded-lg ${(project.id === 'hayon' || project.id === 'NearBuy') ? 'bg-white' :
                            (project.id === 'scrybe') ? 'bg-[#1e3876]' :
                                (project.id === 'LitBay') ? 'bg-[#be9971]' : project.gradient
                            } text-white shrink-0 cursor-pointer hover:scale-110 transition-transform overflow-hidden flex items-center justify-center border border-border/50`}
                        title={project.title}
                    >
                        {typeof project.icon === 'string' ? (
                            <span className="text-2xl">{project.icon}</span>
                        ) : (
                            <Image
                                src={project.icon as StaticImageData}
                                alt={project.title}
                                className="w-full h-full object-contain p-1"
                                width={48}
                                height={48}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VerticalProjectMarquee;
