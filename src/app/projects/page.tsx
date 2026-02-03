import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
    title: "Projects",
    description: "A showcase of personal projects by Hafeez (Hafzism). From mobile apps like NearBuy to platforms like hayon and scrybe.",
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}