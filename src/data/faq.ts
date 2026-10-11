export interface FaqItem {
  question: string;
  answer: string;
}

/** Answers only state what the website already says about ACCREVIA. */
export const faqs: FaqItem[] = [
  {
    question: "What services does ACCREVIA Technologies provide?",
    answer:
      "ACCREVIA provides custom software development, web application development, SaaS product development, AI and automation, API and backend development, cloud and DevOps, business process automation, and software modernization and maintenance.",
  },
  {
    question: "Do you build custom software?",
    answer:
      "Yes. We design and build custom business applications and internal tools around your workflows, starting with requirement analysis and technical planning.",
  },
  {
    question: "Do you build SaaS products?",
    answer: "Yes. SaaS product development is one of our core services, and FarmStay is our own SaaS platform for farmhouse management.",
  },
  {
    question: "Can ACCREVIA build multi-tenant SaaS platforms?",
    answer:
      "Yes. FarmStay is a multi-tenant platform, and we design tenant separation, role-based access and tenant configuration into new SaaS products from the start.",
  },
  {
    question: "What technologies does ACCREVIA work with?",
    answer:
      "Angular, React, TypeScript, ASP.NET Core, .NET, Node.js, SQL Server, MongoDB, AWS, Azure, Docker, Kubernetes, Terraform and CI/CD, plus AI/LLM integration. These are tools we work with, not vendor certifications.",
  },
  {
    question: "What is FarmStay?",
    answer:
      "FarmStay is a multi-tenant SaaS platform designed to help farmhouse businesses manage bookings, customers, staff, accounts, reporting and notifications through one centralized platform.",
  },
  {
    question: "Do you provide AI and automation solutions?",
    answer:
      "Yes. We integrate AI and large language models into existing software and build intelligent workflow and messaging automation for repetitive tasks.",
  },
  {
    question: "How can I start a project with ACCREVIA?",
    answer:
      "Use the Start Your Project page to describe what you want to build, your timeline and budget range, and how you prefer to be contacted. You can also email, call or message us on WhatsApp.",
  },
];
