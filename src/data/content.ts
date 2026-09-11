import dekentoImg from "../assets/project-dekento.webp";
import runrinseImg from "../assets/project-runrinse.webp";
import hikekickImg from "../assets/project-hikekick.webp";

export const profile = {
  name: "Adarsh Santhosh",
  logoLabel: "Adarsh.Dev",
  title: "Full Stack Developer | AI & Shopify",
  tagline: "Building digital experiences that scale.",
  subheading:
    "I'm a full stack developer who turns complex problems into fast, reliable, and polished web products. Specializing in .NET, React, AI-powered chatbots, and Shopify e-commerce.",
  location: "Nagoya, Japan",
  email: "adarshh.santhosh@gmail.com",
  socials: {
    github: "https://github.com/AdarshhSanthosh",
    linkedin: "https://www.linkedin.com/in/adarsh--santhosh/",
  },
};

export const about = {
  title: "A developer obsessed with craft.",
  paragraphs: [
    "I'm a full stack developer with hands-on experience across .NET, React, AI-driven applications, and Shopify e-commerce. I enjoy turning ambiguous requirements into reliable, well-tested products — from backend APIs to customer-facing storefronts.",
    "Currently based in Nagoya, Japan, I work across the stack: building AI chatbot experiences, developing software features end-to-end, and customizing Shopify storefronts for real-world commerce.",
  ],
};

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Mahatma Gandhi University",
    location: "Kerala, India",
    period: "2021 — 2023",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Mahatma Gandhi University",
    location: "Kerala, India",
    period: "2019 — 2021",
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Fundasta Corp",
    location: "Nagoya City, Japan",
    period: "November 2024 — Present",
    description:
      "Working across AI chatbot development, general software engineering, and Shopify e-commerce customization for client storefronts.",
    highlights: [
      "Building and maintaining AI-powered chatbot features",
      "Full-stack software development for internal and client-facing tools",
      "Custom Shopify storefront development and e-commerce integrations",
    ],
  },
  {
    role: "Junior Software Developer (.NET Developer)",
    company: "Emsyne Technologies Pvt Ltd",
    location: "Infopark, Kochi, Kerala, India",
    period: "April 2024 — October 2024",
    description:
      "Worked as a .NET developer contributing to backend development and feature delivery.",
    highlights: [
      ".NET application development and maintenance",
      "Collaborated with the team on backend feature delivery",
    ],
  },
];

export const skillCategories = [
  {
    title: "Web Development",
    items: [
      "Frontend Development",
      "Responsive Web Design",
      "Modern UI/UX Implementation",
      "Website Deployment & Hosting",
      "Git/GitHub",
    ],
  },
  {
    title: "Shopify Development",
    items: [
      "Shopify Store Development",
      "Shopify Theme Customization",
      "Custom Shopify Sections",
      "Shopify App/Third-party App Integration",
      "eCommerce Development",
      "Store Performance Optimization",
    ],
  },
  {
    title: "AI & Chatbot Development",
    items: [
      "AI Chatbot Development",
      "LLM-powered Applications",
      "Conversational AI",
      "AI API Integration",
      "Customer Support Automation",
      "Chatbot UI/UX",
      "AI-powered Business Solutions",
    ],
  },
  {
    title: "Technologies & Tools",
    items: [
      "React / Next.js",
      "JavaScript / TypeScript",
      "HTML / CSS / Tailwind CSS",
      "Node.js",
      "Python",
      "OpenAI API",
      "LangChain",
      "Vector Databases / RAG",
      "REST APIs",
      "Vercel / Cloudflare",
    ],
  },
];

export type Project = {
  /** Image URL - an imported local asset (resolves to a URL at build time)
   * or a plain https:// URL both work here. */
  image: string;
  name: string;
  description: string;
  /** Where the "View" button links to. */
  url: string;
};

// Your own projects, built outside of client work.
export const personalProjects: Project[] = [];

// Client/freelance engagements.
export const freelanceProjects: Project[] = [
  {
    image: dekentoImg,
    name: "DeKento",
    description:
      "A concierge web app for travelers arriving in Lagos: enter your trip details, get recommended arrival services (airport pickup, apartment prep, welcome food), book and pay, while the concierge team coordinates fulfillment and tracks status in an admin dashboard.",
    url: "https://dekento.netlify.app/",
  },
  {
    image: runrinseImg,
    name: "RunRinse",
    description:
      "A Shopify e-commerce storefront for a face wash brand built for athletes, with product storytelling, a starter-kit checkout flow, and theme customization tailored to the brand.",
    url: "https://runrinse.com/",
  },
  {
    image: hikekickImg,
    name: "HikeKick",
    description:
      "A Shopify e-commerce store for an outdoor apparel brand, where I contributed finishing and refinement work through custom Liquid theme coding.",
    url: "https://hikekick.com/",
  },
];

export const contact = {
  headline: "Let's build something great.",
  copy: "Open to full-time roles, freelance projects, and creative collaborations. Drop me a line and I'll get back to you soon.",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
