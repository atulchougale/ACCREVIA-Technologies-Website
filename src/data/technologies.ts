export interface TechnologyGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

/** Technologies and capabilities. These are working tools, not certifications or partnerships. */
export const technologyGroups: TechnologyGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that are fast, accessible and easy to maintain.",
    items: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Structured services and APIs built for long-term maintainability.",
    items: ["ASP.NET Core", ".NET", "Node.js", "REST APIs"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational and document storage matched to the problem.",
    items: ["SQL Server", "MongoDB"],
  },
  {
    id: "cloud",
    title: "Cloud",
    description: "Cloud-ready deployments on major platforms.",
    items: ["AWS", "Azure"],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    description: "Repeatable builds, releases and environments.",
    items: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "AWS DevOps"],
  },
  {
    id: "development",
    title: "Development Practices",
    description: "The everyday engineering toolkit behind every project.",
    items: ["Git", "GitHub", "API integration", "Authentication", "Cloud deployment"],
  },
  {
    id: "ai",
    title: "AI",
    description: "Applied AI that fits into real products and workflows.",
    items: ["AI/LLM integration", "Intelligent automation"],
  },
];

/** Short list used for the home-page capability strip. */
export const featuredTechnologies = [
  "Angular",
  "React",
  "TypeScript",
  "ASP.NET Core",
  "Node.js",
  "SQL Server",
  "MongoDB",
  "AWS",
  "Azure",
  "Docker",
  "Terraform",
  "AI/LLM integration",
];
