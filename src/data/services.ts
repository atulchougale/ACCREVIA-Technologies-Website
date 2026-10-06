import { Bot, Cloud, Code, Globe, Layers, RefreshCw, Webhook, Workflow, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  summary: string;
  details: string[];
  icon: LucideIcon;
  ctaLabel: string;
}

export const services: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    summary: "Software built around the way your business actually works, not the other way around.",
    details: ["Requirement analysis and technical planning", "Line-of-business and internal tools", "Maintainable, documented code"],
    icon: Code,
    ctaLabel: "Discuss custom software",
  },
  {
    id: "web-applications",
    title: "Web Application Development",
    summary: "Fast, responsive web applications with clear interfaces and reliable back ends.",
    details: ["Angular and React front ends", "ASP.NET Core and Node.js back ends", "Responsive and accessible interfaces"],
    icon: Globe,
    ctaLabel: "Plan a web application",
  },
  {
    id: "saas-development",
    title: "SaaS Product Development",
    summary: "Multi-tenant platforms with role-based access, subscriptions-ready design and room to grow.",
    details: ["Multi-tenant architecture", "Authentication and role-based access control", "Reporting and configuration modules"],
    icon: Layers,
    ctaLabel: "Build a SaaS product",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    summary: "Practical AI and LLM integration that removes repetitive work from your processes.",
    details: ["AI/LLM integration into existing software", "Intelligent workflow automation", "Messaging and notification automation"],
    icon: Bot,
    ctaLabel: "Explore AI automation",
  },
  {
    id: "api-backend",
    title: "API & Backend Development",
    summary: "Well-structured REST APIs and back-end services that other systems can depend on.",
    details: ["REST API design and implementation", "SQL Server and MongoDB data layers", "Third-party API integration"],
    icon: Webhook,
    ctaLabel: "Discuss API development",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    summary: "Repeatable deployments and cloud-ready infrastructure for the software we build.",
    details: ["AWS and Azure deployment", "Docker, CI/CD pipelines and Linux hosting", "Infrastructure as code with Terraform"],
    icon: Cloud,
    ctaLabel: "Talk about cloud & DevOps",
  },
  {
    id: "process-automation",
    title: "Business Process Automation",
    summary: "Replace spreadsheets, manual hand-offs and follow-ups with dependable digital workflows.",
    details: ["Workflow and approval automation", "Reporting and data consolidation", "System-to-system integration"],
    icon: Workflow,
    ctaLabel: "Automate a process",
  },
  {
    id: "modernization",
    title: "Software Modernization & Maintenance",
    summary: "Keep existing systems secure, understandable and ready for the next set of requirements.",
    details: ["Legacy application upgrades", "Refactoring and performance tuning", "Ongoing maintenance and support"],
    icon: RefreshCw,
    ctaLabel: "Modernize a system",
  },
];
