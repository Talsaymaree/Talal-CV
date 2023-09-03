import "./globals.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";

const syne = Syne({
    subsets: ["latin"],
    display: "block",
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://portfolio.tee215.com/"),
    title: "Talal Al-Saymaree Portfolio",
    description:
    "Talal Al-Saymaree's Portfolio - A Showcase of Creative Web Design & Development. With expertise in React and an eye for design, I blend technology and artistry to deliver user-centric digital experiences.",
    generator: "Next.js",
    applicationName: "Talal Al-Saymaree Portfolio",
    keywords: [
        "Talal Al-Saymaree Portfolio",
        "freelance",
        "developer",
        "freelance developer",
        "frontend",
        "nextjs",
        "astro",
        "react",
        "frontend developer",
        "frontend engineer",
        "creative",
        "creative developer",
        "creative engineer",
        "tech",
        "canada",
        "software",
        "software developer",
        "portfolio",
        "frontend developer portfolio",
        "creative developer portfolio",
        "creative engineer portfolio",
        "software developer portfolio",
        "frontend engineer portfolio",
    ],
    colorScheme: "dark",
    openGraph: {
        title: "Talal Al-Saymaree - Designer and Developer",
        description:
      "Designer and Software Engineer, Focused on immersive experiences.",
        url: "https://portfolio.tee215.com/",
        siteName: "portfolio.tee215.com",
        images: [
            {
                url: "./public/metadata.jpg",
                width: 1200,
                height: 630,
                alt: "Talal Al-Saymaree - Designer and Developer",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Talal Al-Saymaree - Designer and Developer",
        description:
      "Designer and Software Engineer, Focused on immersive experiences.",
        creator: "Talal Al-Saymaree",
        creatorId: "0000000000",
        images: ["./public/metadata.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${syne.className} scroll-smooth scrollbar-none scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
            >
                {children}
            </body>
        </html>
    );
}
