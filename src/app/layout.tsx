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
  title: "Portfolio",
  description: "Personal Portfolio",
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
