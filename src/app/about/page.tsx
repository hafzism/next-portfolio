import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Hafeez (Hafzism), a software developer based in Kerala, India. Explore my journey, tech stack, and passion for building real-world applications.",
};

export default function AboutPage() {
    return <AboutContent />;
}
