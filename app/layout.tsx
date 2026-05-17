import type { Metadata } from "next";
import { Syne, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroFlow AI — Your Workflow, Amplified by AI",
  description:
    "NeuroFlow is the AI-native productivity platform that learns how your team works, automates the repetitive, and surfaces what matters most.",
  keywords: ["AI productivity", "workflow automation", "team collaboration", "AI platform"],
  openGraph: {
    title: "NeuroFlow AI — Your Workflow, Amplified by AI",
    description: "The AI productivity platform that thinks, plans, and creates alongside you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${manrope.variable} ${spaceMono.variable} noise-overlay antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
