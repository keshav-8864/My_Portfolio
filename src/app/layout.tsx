import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keshav Dixit | Full-Stack Developer",
  description: "Portfolio of Keshav Dixit, a Full-Stack Developer specializing in scalable web applications and AI-powered experiences.",
  openGraph: {
    title: "Keshav Dixit | Full-Stack Developer",
    description: "Portfolio of Keshav Dixit, a Full-Stack Developer specializing in scalable web applications and AI-powered experiences.",
    url: "https://keshavdixit.dev",
    siteName: "Keshav Dixit Portfolio",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased flex flex-col transition-colors duration-300">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
