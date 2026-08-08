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

export const projects = [
  {
    image: "shopify",
    category: "E-commerce",
    name: "Shopify E-commerce Storefront",
    description:
      "Custom Shopify storefront development and theme customization, including feature integrations and checkout improvements for real-world e-commerce clients.",
    tech: ["Shopify", "Liquid", "JavaScript", "E-commerce integrations"],
  },
  {
    image: "chatbot",
    category: "AI / Chatbot",
    name: "AI Document Chatbot",
    description:
      "A RAG-powered chatbot that lets users query documents in natural language, combining vector embeddings with an LLM to return grounded, context-aware answers.",
    tech: ["Python", "RAG", "Vector Search", "LLM"],
  },
] as const;

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
