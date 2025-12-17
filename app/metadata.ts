import type { Metadata } from "next";
import { SKILLS, PROJECTS, DOMAIN, PERSONAL_INFO } from "@/constants";

// Extract all skills from SKILLS array
const allSkills = SKILLS.flatMap((skill) => skill.items);

// Extract unique roles from PROJECTS
const uniqueRoles = Array.from(
  new Set(PROJECTS.map((project) => project.role))
);

// Extract all technologies/tags from PROJECTS
const allTechnologies = Array.from(
  new Set(PROJECTS.flatMap((project) => project.tags))
);

// Combine all keywords
const keywords = [
  PERSONAL_INFO.name,
  ...PERSONAL_INFO.jobTitles,
  ...uniqueRoles,
  ...allSkills,
  ...allTechnologies,
  "Portfolio",
  "Software Engineer",
  "Software Developer",
  "Blockchain Developer",
  "E-commerce",
  "Microservices",
];

// Build description from available data
const description = `${PERSONAL_INFO.jobTitles.join(
  ", "
)} specializing in ${allSkills
  .slice(0, 8)
  .join(
    ", "
  )}, and cloud infrastructure. Experienced in building scalable e-commerce platforms, DeFi protocols, and modern web applications.`;

// Build structured data occupations from PROJECTS
const structuredOccupations = PROJECTS.slice(0, 3).map((project) => ({
  "@type": "Occupation" as const,
  name: project.role,
  occupationLocation: {
    "@type": "Place" as const,
    name: project.name.split(" - ")[0], // Extract company name before " - "
  },
}));

const baseUrl = `https://${DOMAIN}`;

export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.jobTitles[0]} & ${PERSONAL_INFO.jobTitles[2]} | Portfolio`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description,
  keywords,
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: `${PERSONAL_INFO.name} - Portfolio`,
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.jobTitles[0]} & ${PERSONAL_INFO.jobTitles[2]} | Portfolio`,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.jobTitles[0]} & ${PERSONAL_INFO.jobTitles[2]} | Portfolio`,
    description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Technology",
  classification: "Portfolio",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL(baseUrl),
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.jobTitles,
  description,
  url: baseUrl,
  sameAs: [],
  knowsAbout: [
    ...allSkills,
    ...allTechnologies,
    "E-commerce",
    "Microservices",
    "Blockchain Development",
  ],
  hasOccupation: structuredOccupations,
};
