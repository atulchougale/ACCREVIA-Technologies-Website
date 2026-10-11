/**
 * Service catalogue: pure data (no React / icon imports) so the build-time SEO plugin can read it too.
 * Icons are attached in services.ts. Only describe capabilities ACCREVIA actually offers.
 */
export interface ServiceContent {
  slug: string;
  title: string;
  /** Short card summary. */
  summary: string;
  /** Meta description for the detail page (150-160 chars). */
  metaDescription: string;
  /** Bullet list used on cards and the Services page. */
  details: string[];
  ctaLabel: string;
  /** Matching value in the Start Project "project type" list. */
  projectType: string;
  /** Detail page: what the service is. */
  overview: string[];
  audience: string;
  /** Detail page: capability cards. */
  capabilities: Array<{ title: string; description: string }>;
  /** Detail page: technologies (only ones listed on the Technologies page). */
  technologies: string[];
  /** Detail page: business outcomes. */
  benefits: Array<{ title: string; description: string }>;
}

export const serviceCatalog: ServiceContent[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    summary: "Software built around the way your business actually works, not the other way around.",
    metaDescription:
      "Custom software development by ACCREVIA Technologies: business applications and internal tools designed around your workflows, built with ASP.NET Core, Angular and React.",
    details: ["Requirement analysis and technical planning", "Line-of-business and internal tools", "Maintainable, documented code"],
    ctaLabel: "Discuss custom software",
    projectType: "Custom Software Development",
    overview: [
      "Custom software is designed around your workflows, users and data instead of forcing your business into a generic tool. ACCREVIA designs and builds business applications, internal tools and customer-facing systems that match how your team really works.",
      "We start by understanding the problem and the people who will use the system, then plan the architecture, build in small reviewable steps and hand over code that other developers can maintain.",
    ],
    audience: "Businesses whose processes have outgrown spreadsheets, manual hand-offs or off-the-shelf software.",
    capabilities: [
      { title: "Requirement analysis", description: "Goals, users and constraints are written down before design or development starts." },
      {
        title: "Business and internal applications",
        description: "Line-of-business tools, dashboards and back-office systems for day-to-day operations.",
      },
      { title: "Secure access control", description: "Authentication and role-based access so each person sees only what they need." },
      { title: "Reporting and data views", description: "Clear screens and reports built on a well-structured database." },
      { title: "System integration", description: "Connections to the APIs and tools you already use." },
      { title: "Documentation and handover", description: "Readable code and notes so the system can be extended later." },
    ],
    technologies: ["ASP.NET Core", ".NET", "Angular", "React", "TypeScript", "SQL Server", "Node.js", "Git", "GitHub"],
    benefits: [
      { title: "Fits your process", description: "The software follows your workflow instead of changing it to fit a product." },
      { title: "Easier to maintain", description: "Clean structure and documentation keep future changes predictable." },
      { title: "Room to grow", description: "A foundation designed so new features and users can be added over time." },
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    summary: "Fast, responsive web applications with clear interfaces and reliable back ends.",
    metaDescription:
      "Web application development by ACCREVIA: responsive Angular and React front ends, ASP.NET Core or Node.js back ends and secure authentication.",
    details: ["Angular and React front ends", "ASP.NET Core and Node.js back ends", "Responsive and accessible interfaces"],
    ctaLabel: "Plan a web application",
    projectType: "Web Application",
    overview: [
      "A web application lets your team or customers work in a browser on any device, with no installation. ACCREVIA builds web applications with modern front-end frameworks and dependable back-end services.",
      "We care about the details users notice: responsive layouts, clear forms and navigation, sensible validation and fast loading, backed by secure APIs and a well-designed database.",
    ],
    audience: "Organisations that need a customer portal, an internal system or a web-based product.",
    capabilities: [
      { title: "Modern front ends", description: "Single-page applications in Angular or React with TypeScript." },
      {
        title: "Responsive and accessible UI",
        description: "Interfaces that work on phones, tablets and desktops and support keyboard use.",
      },
      { title: "Back-end and APIs", description: "ASP.NET Core or Node.js services exposing clean REST APIs." },
      { title: "Authentication", description: "Login, sessions and permissions designed in from the start." },
      { title: "Database design", description: "SQL Server or MongoDB storage matched to the data." },
      { title: "Deployment", description: "Repeatable builds and cloud-ready hosting." },
    ],
    technologies: [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "ASP.NET Core",
      "Node.js",
      "REST APIs",
      "SQL Server",
      "MongoDB",
    ],
    benefits: [
      { title: "Works everywhere", description: "One responsive application for desktop and mobile browsers." },
      { title: "Quicker updates", description: "Improvements reach every user as soon as they are released." },
      { title: "Built to be extended", description: "Component-based code and clear APIs make new features easier to add." },
    ],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    summary: "Multi-tenant platforms with role-based access, billing-ready design and room to grow.",
    metaDescription:
      "SaaS product development by ACCREVIA: multi-tenant architecture, role-based access, reporting and notifications. We also build our own SaaS, FarmStay.",
    details: ["Multi-tenant architecture", "Authentication and role-based access control", "Reporting and configuration modules"],
    ctaLabel: "Build a SaaS product",
    projectType: "SaaS Product",
    overview: [
      "A SaaS product serves many customers from one platform, with each customer's data kept separate. ACCREVIA designs and builds multi-tenant SaaS platforms, and FarmStay, our own farmhouse management product, is built this way.",
      "We plan the tenant model, access control and configuration early, because these choices are hard to change later. The result is a platform that can onboard new customers without rebuilding the product.",
    ],
    audience: "Founders and businesses turning a repeatable service or process into a software product.",
    capabilities: [
      { title: "Multi-tenant architecture", description: "One platform serving many businesses, with data kept separate per tenant." },
      { title: "Users, staff and roles", description: "Role-based access control for owners, staff and other user types." },
      { title: "Tenant configuration", description: "Settings that let each customer adapt the product to their business." },
      { title: "Reporting", description: "Operational and financial views for each tenant." },
      { title: "Notifications", description: "Messages that keep users informed about important events." },
      { title: "Growth-ready structure", description: "Designed so billing and subscription plans can be added." },
    ],
    technologies: ["ASP.NET Core", "Angular", "SQL Server", "JWT authentication", "Clean Architecture", "AWS", "Azure", "Docker"],
    benefits: [
      { title: "One codebase, many customers", description: "Improvements and fixes are delivered to every tenant together." },
      { title: "Safer data separation", description: "Tenant isolation is part of the design, not an afterthought." },
      { title: "Lower cost to scale", description: "Adding a new customer is configuration, not a new project." },
    ],
  },
  {
    slug: "ai-and-automation",
    title: "AI & Automation",
    summary: "Practical AI and LLM integration that removes repetitive work from your processes.",
    metaDescription:
      "AI and automation from ACCREVIA: LLM integration into existing software, intelligent workflows and messaging automation for repetitive business tasks.",
    details: ["AI/LLM integration into existing software", "Intelligent workflow automation", "Messaging and notification automation"],
    ctaLabel: "Explore AI automation",
    projectType: "AI / Automation",
    overview: [
      "AI and automation are most useful when they remove a specific, repetitive task. ACCREVIA integrates large language models and automation into the software and workflows you already run.",
      "We begin with the task and the people doing it, decide where automation helps and where a person should still review the result, and then build it into your existing systems.",
    ],
    audience: "Teams spending time on repetitive communication, data handling or routine decisions.",
    capabilities: [
      { title: "AI/LLM integration", description: "Language-model features added to your applications through their APIs." },
      { title: "Intelligent automation", description: "Workflows that route, prepare or summarise information for your team." },
      { title: "Messaging automation", description: "Automated notifications and messages connected to your systems." },
      { title: "System connections", description: "Automations wired into your existing databases and APIs." },
      { title: "Human review points", description: "Clear places where a person checks results that matter." },
    ],
    technologies: ["AI/LLM integration", "Intelligent automation", "Node.js", "ASP.NET Core", "REST APIs", "API integration"],
    benefits: [
      { title: "Less repetitive work", description: "Routine tasks run automatically so people can focus on higher-value work." },
      { title: "More consistent processes", description: "The same steps happen the same way every time." },
      { title: "Built into what you use", description: "Automation lives inside your existing software instead of a separate tool." },
    ],
  },
  {
    slug: "api-and-backend-development",
    title: "API & Backend Development",
    summary: "Well-structured REST APIs and back-end services that other systems can depend on.",
    metaDescription:
      "API and backend development by ACCREVIA: REST APIs and services with ASP.NET Core and Node.js, SQL Server and MongoDB data layers, and integrations.",
    details: ["REST API design and implementation", "SQL Server and MongoDB data layers", "Third-party API integration"],
    ctaLabel: "Discuss API development",
    projectType: "API / Backend Development",
    overview: [
      "The back end is where business rules, security and data live. ACCREVIA designs and builds REST APIs and services that web, mobile and partner systems can rely on.",
      "We focus on clear API contracts, sensible data models, consistent error handling and authentication, so the system stays understandable as it grows.",
    ],
    audience: "Products and businesses that need a dependable core for their front ends, integrations or partners.",
    capabilities: [
      { title: "REST API design", description: "Consistent, documented endpoints with predictable behaviour." },
      { title: "Data layers", description: "SQL Server with Entity Framework Core, or MongoDB where it fits better." },
      { title: "Authentication and authorisation", description: "JWT-based authentication with role and permission checks." },
      { title: "Third-party integration", description: "Connections to payment, messaging and business APIs." },
      { title: "Clean architecture", description: "Layered code that separates business logic from infrastructure." },
    ],
    technologies: [
      "ASP.NET Core",
      ".NET",
      "Node.js",
      "REST APIs",
      "SQL Server",
      "MongoDB",
      "JWT authentication",
      "Clean Architecture",
      "API integration",
    ],
    benefits: [
      { title: "A dependable core", description: "Front ends and partners build on stable, well-defined APIs." },
      { title: "Secure by design", description: "Authentication and access rules are part of the architecture." },
      { title: "Easier to change", description: "Layered structure makes later changes safer and faster." },
    ],
  },
  {
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    summary: "Repeatable deployments and cloud-ready infrastructure for the software we build.",
    metaDescription:
      "Cloud and DevOps services from ACCREVIA Technologies: AWS and Azure deployment, Docker, CI/CD pipelines, Linux hosting and Terraform infrastructure as code.",
    details: ["AWS and Azure deployment", "Docker, CI/CD pipelines and Linux hosting", "Infrastructure as code with Terraform"],
    ctaLabel: "Talk about cloud & DevOps",
    projectType: "Cloud / DevOps",
    overview: [
      "Good software also needs a reliable way to be built, released and run. ACCREVIA sets up deployment pipelines and cloud infrastructure so releases are repeatable instead of manual.",
      "We work with AWS and Azure, containerise applications with Docker and automate builds and releases with CI/CD, so deployments become routine.",
    ],
    audience: "Teams that deploy by hand, want cloud hosting or need a more reliable release process.",
    capabilities: [
      { title: "Cloud deployment", description: "Applications deployed to AWS or Azure." },
      { title: "Containers", description: "Docker images for consistent environments, with Kubernetes where it is needed." },
      { title: "CI/CD pipelines", description: "Automated build, test and release steps." },
      { title: "Infrastructure as code", description: "Environments described in Terraform so they can be recreated." },
      { title: "Linux hosting", description: "Configured and maintained Linux servers." },
    ],
    technologies: ["AWS", "Azure", "AWS DevOps", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD", "Git", "GitHub"],
    benefits: [
      { title: "Repeatable releases", description: "The same automated steps ship every release." },
      { title: "Fewer manual errors", description: "Automation replaces error-prone manual deployment." },
      { title: "Environments you can rebuild", description: "Infrastructure described as code can be recreated when needed." },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    summary: "Replace spreadsheets, manual hand-offs and follow-ups with dependable digital workflows.",
    metaDescription:
      "Business process automation from ACCREVIA Technologies: digital workflows, approvals, reporting and system integration that replace spreadsheets and manual hand-offs.",
    details: ["Workflow and approval automation", "Reporting and data consolidation", "System-to-system integration"],
    ctaLabel: "Automate a process",
    projectType: "Custom Software Development",
    overview: [
      "Many businesses run on spreadsheets, email threads and manual follow-ups. ACCREVIA turns these into digital workflows with clear steps, owners and records.",
      "We map how the process works today, simplify it, and then build the workflow, approvals, notifications and reports that keep it running.",
    ],
    audience: "Operations and administrative teams working with repetitive, multi-step processes.",
    capabilities: [
      { title: "Workflow design", description: "Processes mapped into clear steps with responsible people." },
      { title: "Approvals", description: "Requests routed to the right person and recorded." },
      { title: "Reporting", description: "Data from different sources brought together in one place." },
      { title: "Notifications", description: "Automatic reminders and status updates." },
      { title: "System integration", description: "Data moved between your tools without re-typing." },
    ],
    technologies: ["ASP.NET Core", "Angular", "React", "Node.js", "SQL Server", "REST APIs", "API integration", "Intelligent automation"],
    benefits: [
      { title: "Less manual effort", description: "Routine hand-offs and follow-ups happen automatically." },
      { title: "Clearer visibility", description: "Everyone can see where a request stands." },
      { title: "A reliable record", description: "Actions and decisions are stored instead of lost in email." },
    ],
  },
  {
    slug: "software-modernization-and-maintenance",
    title: "Software Modernization & Maintenance",
    summary: "Keep existing systems secure, understandable and ready for the next set of requirements.",
    metaDescription:
      "Software modernization and maintenance from ACCREVIA Technologies: legacy application upgrades, refactoring, performance tuning and ongoing support for existing systems.",
    details: ["Legacy application upgrades", "Refactoring and performance tuning", "Ongoing maintenance and support"],
    ctaLabel: "Modernize a system",
    projectType: "Existing System Modernization",
    overview: [
      "Older systems often still do important work but are hard to change. ACCREVIA reviews existing applications, upgrades them and improves their structure so they can keep serving the business.",
      "We prefer steady, low-risk improvement over rewriting everything: understand the system, fix the highest-value problems first and keep it running throughout.",
    ],
    audience: "Businesses relying on older applications that are slow, fragile or difficult to extend.",
    capabilities: [
      { title: "Code and system review", description: "An honest assessment of structure, risks and priorities." },
      { title: "Platform upgrades", description: "Moving applications to current, supported frameworks." },
      { title: "Refactoring", description: "Cleaner code that is easier to understand and change." },
      { title: "Performance tuning", description: "Finding and fixing slow queries and screens." },
      { title: "Ongoing maintenance", description: "Bug fixes, updates and small improvements over time." },
    ],
    technologies: ["ASP.NET Core", ".NET", "Angular", "React", "TypeScript", "SQL Server", "Git", "CI/CD"],
    benefits: [
      { title: "Lower risk", description: "Incremental changes keep the system working while it improves." },
      { title: "Longer useful life", description: "Current frameworks and cleaner code extend what you already own." },
      { title: "Easier future changes", description: "Better structure reduces the cost of every later change." },
    ],
  },
];

export const getServiceBySlug = (slug: string) => serviceCatalog.find((service) => service.slug === slug);

/** Shared delivery phases shown on every service detail page. */
export const servicePhases = [
  { title: "Discovery", description: "We learn your goals, users, constraints and what a good outcome looks like." },
  { title: "Planning", description: "Scope, architecture and priorities are agreed before building starts." },
  { title: "Design", description: "Data model, workflows and interface are designed and reviewed." },
  { title: "Development", description: "Features are built in small, reviewable increments." },
  { title: "Testing", description: "Functionality, security basics and real-device behaviour are verified." },
  { title: "Launch", description: "Repeatable deployment puts the software into use." },
  { title: "Support", description: "We stay available for fixes, updates and the next iteration." },
] as const;
