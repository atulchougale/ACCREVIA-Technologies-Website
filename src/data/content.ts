import { BrainCircuit, Gauge, GitBranch, HeartHandshake, Layers3, Sparkles, Target, Workflow, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
}

/** The delivery lifecycle. This content really is a sequence. */
export const processSteps: ProcessStep[] = [
  { title: "Understand", description: "We start with your goals, users and constraints, and write down what success looks like." },
  { title: "Design", description: "Architecture, data model and interface are planned before the first feature is built." },
  { title: "Build", description: "Features are developed in small, reviewable increments in clean, maintainable code." },
  { title: "Integrate", description: "Systems, APIs and third-party services are connected and checked end to end." },
  { title: "Test", description: "Functionality, security basics and real-device behaviour are verified before release." },
  { title: "Deploy", description: "Repeatable builds and cloud-ready deployment put the software into use." },
  { title: "Evolve", description: "Feedback and new requirements shape the next iteration, so the product keeps improving." },
];

export interface Differentiator {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const differentiators: Differentiator[] = [
  {
    title: "Product-minded engineering",
    description: "We think about users and long-term product value, not just a list of tickets.",
    icon: Sparkles,
  },
  {
    title: "Scalable architecture",
    description: "Structure that can grow from the first customer to many, including multi-tenant designs.",
    icon: Layers3,
  },
  {
    title: "Modern technology stack",
    description: "Current, well-supported frameworks and tools chosen for the problem at hand.",
    icon: GitBranch,
  },
  { title: "Clean, maintainable code", description: "Readable, consistent code that other developers can pick up later.", icon: Gauge },
  {
    title: "Automation-first thinking",
    description: "If a task repeats, we ask whether software should be doing it for you.",
    icon: Workflow,
  },
  {
    title: "Cloud-ready solutions",
    description: "Built so deployment to cloud platforms is straightforward, not an afterthought.",
    icon: BrainCircuit,
  },
  {
    title: "Long-term maintainability",
    description: "Documentation, structure and upgrade paths are part of the work, not extras.",
    icon: HeartHandshake,
  },
  {
    title: "Practical business outcomes",
    description: "We measure software by the problems it removes for the people using it.",
    icon: Target,
  },
];

export interface BuildArea {
  title: string;
  description: string;
}

export const buildAreas: BuildArea[] = [
  { title: "Software products", description: "Complete applications with a clear purpose, designed for real users." },
  { title: "SaaS platforms", description: "Multi-tenant systems with authentication, roles and reporting." },
  { title: "Intelligent automation", description: "AI-enabled workflows that take over repetitive operational tasks." },
  { title: "Digital systems", description: "APIs, integrations and back-end services that connect your tools." },
];
