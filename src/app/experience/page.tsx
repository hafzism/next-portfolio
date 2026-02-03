import type { Metadata } from "next";
import ExperienceContent from "./ExperienceContent";

export const metadata: Metadata = {
    title: "Experience",
    description: "Explore the professional journey of Hafeez (Hafzism). From software engineering internships and freelance development to specialized certifications in cybersecurity.",
};

export default function ExperiencePage() {
    return <ExperienceContent />;
}
