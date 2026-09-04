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
  title: "Keshav Dixit | Full-Stack Developer & Software Engineer",
  description: "Portfolio of Keshav Dixit, a highly motivated Full-Stack Developer specializing in scalable web applications, React, Node.js, and AI-powered experiences.",
  keywords: ["Keshav Dixit", "Full-Stack Developer", "Software Engineer", "React Developer", "Next.js", "Node.js", "Portfolio", "Web Developer", "India", "JSS Academy"],
  authors: [{ name: "Keshav Dixit", url: "https://github.com/keshav-8864" }],
  creator: "Keshav Dixit",
  metadataBase: new URL("https://github.com/keshav-8864"), // Replace with actual domain when deployed
  openGraph: {
    title: "Keshav Dixit | Full-Stack Developer",
    description: "Portfolio of Keshav Dixit, specializing in scalable web applications and AI-powered experiences.",
    url: "https://github.com/keshav-8864", // Replace with actual deployed URL
    siteName: "Keshav Dixit Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Dixit | Full-Stack Developer",
    description: "Portfolio of Keshav Dixit, specializing in scalable web applications and AI-powered experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
