import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Hafeez (Hafzism). Whether you have a project idea, a job opportunity, or just want to say hi, I'm always open to connecting.",
};

export default function ContactPage() {
    return <ContactContent />;
}
