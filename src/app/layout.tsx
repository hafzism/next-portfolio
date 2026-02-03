import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import GlobalBackground from "@/components/GlobalBackground";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson"
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces"
});

export const metadata: Metadata = {
  title: {
    default: "Hafzism | Software Developer",
    template: "%s | Hafzism"
  },
  description: "I'm Hafeez (Hafzism), a software developer based in Kerala, India. Specializing in building modern, high-performance web applications and production-ready systems.",
  keywords: [
    "hafzism",
    "Hafeez",
    "DevXtra",
    "Software Developer Kerala",
    "Web Developer India",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Kerala Developer"
  ],
  authors: [{ name: "Hafeez", url: "https://github.com/hafzism" }],
  creator: "Hafeez",
  publisher: "Hafzism",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hafzism.com", // Adjust if you have a different domain
    siteName: "Hafzism",
    title: "Hafzism | Software Developer",
    description: "Software developer from Kerala, India. Building modern web experiences and robust applications.",
    images: [
      {
        url: "/hafzismlogo.png",
        width: 1200,
        height: 630,
        alt: "Hafzism Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafzism | Software Developer",
    description: "Software developer from Kerala, India. Building modern web experiences.",
    creator: "@hafzism",
    images: ["/hafzismlogo.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${atkinson.variable} ${fraunces.variable} antialiased`}>
        <Providers>
          <GlobalBackground />
          <SideNav />

          {/* App Shell Container */}
          <div className="flex flex-col h-full w-full relative z-10 text-foreground">
            <Header />
            {/* Main content area - Pages must handle their own scrolling if needed via h-full overflow-y-auto */}
            <main className="flex-1 relative overflow-hidden">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
