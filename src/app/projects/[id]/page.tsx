import { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);
    
    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found."
        };
    }
    
    return {
        title: project.title,
        description: project.about || project.description,
        openGraph: {
            title: `${project.title} | Hafzism Project`,
            description: project.about || project.description,
            type: "website",
            url: `https://hafzism.in/projects/${project.id}`,
            images: [
                {
                    url: "/hafzismlogo.png",
                    width: 1200,
                    height: 630,
                    alt: `${project.title} project screenshot/logo`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Hafzism Project`,
            description: project.about || project.description,
            images: ["/hafzismlogo.png"],
        },
    };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage() {
    return <ProjectDetailClient />;
}
