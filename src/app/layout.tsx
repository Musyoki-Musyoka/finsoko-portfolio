import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FinSoko AI Safari Portfolio | Pride Leader Capstone",
  description: "Strategic AI Blueprint for FinSoko - An ethical, Africa-rooted agent ecosystem for SACCO lending",
  keywords: ["FinSoko", "AI Safari", "SACCO", "fintech", "ethical AI", "East Africa", "agent ecosystem"],
  authors: [{ name: "Anthony Musyoka" }, { name: "Jonah Terry" }],
  icons: {
    icon: "/favicon.png?v=4",
    shortcut: "/favicon.png?v=4",
    apple: "/logo.jpeg?v=4",
  },
  openGraph: {
    title: "FinSoko AI Safari Portfolio | Pride Leader Capstone",
    description: "Strategic AI Blueprint for FinSoko - An ethical, Africa-rooted agent ecosystem for SACCO lending",
    url: "https://finsoko-portfolio-mw69.vercel.app",
    siteName: "FinSoko AI Safari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinSoko AI Safari Portfolio | Pride Leader Capstone",
    description: "Strategic AI Blueprint for FinSoko - An ethical, Africa-rooted agent ecosystem for SACCO lending",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
