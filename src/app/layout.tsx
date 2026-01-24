import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import GlobalBackground from "@/components/GlobalBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
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
