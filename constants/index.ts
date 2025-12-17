import {
  Terminal,
  Folder,
  Mail,
  FileText,
  Gamepad2,
  MessageCircle,
} from "lucide-react";
import { WindowData, AppData } from "@/types";

export const APPS: AppData[] = [
  {
    id: "about",
    title: "About Me.txt",
    icon: FileText,
    type: "notepad",
    color: "text-blue-400",
  },
  {
    id: "projects",
    title: "My Projects",
    icon: Folder,
    type: "explorer",
    color: "text-yellow-400",
  },
  {
    id: "skills",
    title: "Terminal",
    icon: Terminal,
    type: "terminal",
    color: "text-emerald-400",
  },
  {
    id: "contact",
    title: "Contact Me",
    icon: Mail,
    type: "mail",
    color: "text-purple-400",
  },
  {
    id: "game",
    title: "Rock Paper Scissors",
    icon: Gamepad2,
    type: "game",
    color: "text-red-400",
  },
  {
    id: "credits",
    title: "credits.txt",
    icon: FileText,
    type: "notepad",
    color: "text-blue-400",
  },
  {
    id: "chat",
    title: "Chat (WIP)",
    icon: MessageCircle,
    type: "chat",
    color: "text-cyan-400",
  },
];
export const INITIAL_WINDOWS: WindowData[] = [
  {
    id: APPS[0].id,
    title: APPS[0].title,
    type: APPS[0].type,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 50, y: 50 },
    size: { width: 640, height: 480 },
    content: "intro",
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "Supabase", "Go"],
  },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git", "Linux"] },
];

export const PROJECTS = [
  {
    id: 1,
    name: "Spectra Tech Corp - E-Commerce Platform",
    role: "CTO",
    desc: "Architected and launched a high-performance B2B-B2C e-commerce platform using Next.js and React Native (Expo), ensuring seamless cross-platform experience.",
    tags: [
      "Next.js",
      "React Native",
      "Expo",
      "GCP",
      "Docker",
      "Microservices",
      "Prometheus",
      "Grafana",
    ],
    color: "bg-blue-500/20 text-blue-200",
    icon: "/spectra.png",
  },
  {
    id: 2,
    name: "Pearl Labs (Now Alto Foundation) - Crypto banking protocol (Crypto technology)",
    role: "CTO | Senior Solidity Engineer",
    desc: "Designed and secured a multi-million dollar DeFi protocol featuring lending markets, yield optimization, and inter-chain interoperability.",
    tags: ["Solidity", "DeFi", "Foundry", "Hardhat", "Smart Contracts", "Web3"],
    color: "bg-blue-500/40 text-green-200",
    icon: "/alto_logo_light.svg",
  },
  {
    id: 3,
    name: "KogeFarm - Crypto yield farming (Crypto technology)",
    role: "Technical Lead",
    desc: "Developed complex yield-optimizing smart contracts in Solidity, automating asset compounding across liquidity pools to maximize APY.",
    tags: [
      "Solidity",
      "DeFi",
      "Yield Farming",
      "Smart Contracts",
      "Frontend Integration",
    ],
    color: "bg-purple-500/40 text-purple-200",
    icon: "/kogefarm.svg",
  },
  {
    id: 4,
    name: "Pivohub - B2B commercial solution",
    role: "Software Developer",
    desc: "Developed full-stack features for a supply chain management platform connecting craft producers to retailers, optimizing inventory tracking and order processing.",
    tags: ["Full Stack", "Supply Chain", "Inventory Management"],
    color: "bg-yellow-500/50 text-yellow-200",
    icon: "/pivohub.svg",
  },
  {
    id: 5,
    name: "Multicim - Medical solution",
    role: "Full Stack Developer",
    desc: "Spearheaded complete refactor of legacy application to modern, scalable tools, engineering downtime-resilient systems for critical medical care providers.",
    tags: ["Legacy Refactor", "Docker", "SysAdmin", "Infrastructure", "DevOps"],
    color: "bg-blue-500/40 text-red-200",
    icon: "/carechain.png",
  },
  {
    id: 6,
    name: "Freelance Projects",
    role: "Full Stack Developer",
    desc: "Delivered diverse software solutions including mobile apps built with Flutter/Dart and web applications using React, Python (Django/Flask), and PHP.",
    tags: ["Flutter", "Dart", "React", "Python", "Django", "Flask", "PHP"],
    color: "bg-cyan-500/20 text-cyan-200",
  },
];

export const CODENAME = "SynthOS v0.5";

// Generate HTML content for project notepad windows
export const getProjectContent = (projectId: number): string => {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return "";

  // Date ranges and additional achievements not in PROJECTS
  const additionalDetails: Record<
    number,
    { dateRange: string; achievements: string[] }
  > = {
    1: {
      dateRange: "December 2024 – October 2025",
      achievements: [
        "Engineered a scalable DevOps pipeline on Google Cloud Platform, deploying Dockerized microservices and establishing 99.9% system observability using Prometheus, Loki, and Grafana.",
        "Optimized backend performance and database load by implementing a tiered caching and message queuing strategy to handle high-concurrency requests.",
        "Directed the full product lifecycle, managing the roadmap from technical design to production deployment while overseeing data security.",
      ],
    },
    2: {
      dateRange: "February 2022 – October 2024",
      achievements: [
        "Created internal tooling to improve Developer Experience (DX) and streamlined coordination between frontend and backend engineering teams, resulting in faster feature delivery.",
        "Spearheaded smart contract development and security auditing using Foundry and Hardhat, implementing rigorous fuzzing and testing standards to protect user assets.",
        "Orchestrated crisis management protocols, mitigating critical on-chain incidents and leading the technical response to safeguard protocol integrity.",
      ],
    },
    3: {
      dateRange: "October 2021 – February 2022",
      achievements: [
        "Transitioned from active user to Core Contributor and Technical Lead, leveraged deep product knowledge to enhance the user experience and significantly extend product features.",
        "Led frontend integration, ensuring precise real-time data visualization for user positions and protocol metrics.",
      ],
    },
    4: {
      dateRange: "February 2021 – October 2021",
      achievements: [
        "Optimized application logic to streamline inventory tracking and order processing workflows.",
      ],
    },
    5: {
      dateRange: "February 2020 – February 2021",
      achievements: [
        "Spearheaded a complete refactor of the legacy application to use modern, scalable, and developer-friendly tools, which directly increased engineering productivity.",
        "Engineered downtime-resilient systems, significantly improving platform reliability and uptime for critical medical care providers.",
        "Managed on-premise infrastructure as a SysAdmin, self-hosting the backend environment via Docker to ensure strict data privacy and compliance.",
      ],
    },
    6: {
      dateRange: "August 2019 – February 2021",
      achievements: [
        "Delivered diverse software solutions for multiple clients across various industries.",
        "Built mobile applications using Flutter/Dart.",
        "Developed web applications using React, Python (Django/Flask), and PHP.",
      ],
    },
  };

  const details = additionalDetails[projectId];
  if (!details) return "";

  const achievementsHtml = details.achievements
    .map((achievement) => `<li>${achievement}</li>`)
    .join("\n");

  return `<h2><strong>${project.name}</strong></h2>
<p><em>Role: ${project.role} | ${details.dateRange}</em></p>

<p>${project.desc}</p>

<h3><strong>Key Achievements:</strong></h3>
<ul>
${achievementsHtml}
</ul>

<h3><strong>Technologies:</strong></h3>
<p>${project.tags.join(", ")}</p>`;
};
