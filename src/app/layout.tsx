import { AuthButtons } from "@/components/auth-buttons";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OrbitPrep AI – Government Exam Preparation Platform",
    template: "%s | OrbitPrep AI",
  },
  description:
    "Prepare for UPSC, APSC, SSC, Railway, Banking and all government exams with AI mentor, mock tests, previous year papers and daily current affairs PDFs.",
  keywords: [
    "UPSC preparation",
    "APSC preparation",
    "SSC exam preparation",
    "government exam preparation India",
    "current affairs PDF",
    "previous year question paper",
    "mock test online",
    "AI exam preparation",
    "Assam government job exam",
  ],
  authors: [{ name: "Partha Dutta" }],
  creator: "Partha Dutta",
  metadataBase: new URL("https://orbitprep-ai.vercel.app"),
  openGraph: {
    title: "OrbitPrep AI – Crack Government Exams with AI",
    description:
      "AI-powered platform for UPSC, APSC, SSC, Railway exams with mock tests, PDFs, and smart preparation.",
    url: "https://orbitprep-ai.vercel.app",
    siteName: "OrbitPrep AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OrbitPrep AI",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrbitPrep AI – Government Exam Prep",
    description:
      "Prepare smarter with AI mentor, mock tests and current affairs.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050816] text-white antialiased">
        {children}
      </body>
    </html>
  );
}