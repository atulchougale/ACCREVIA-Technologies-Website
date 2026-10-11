import { Bot, Cloud, Code, Globe, Layers, RefreshCw, Webhook, Workflow, type LucideIcon } from "lucide-react";
import { serviceCatalog, type ServiceContent } from "./serviceCatalog";

export type Service = ServiceContent & { icon: LucideIcon };

const icons: Record<string, LucideIcon> = {
  "custom-software-development": Code,
  "web-application-development": Globe,
  "saas-product-development": Layers,
  "ai-and-automation": Bot,
  "api-and-backend-development": Webhook,
  "cloud-and-devops": Cloud,
  "business-process-automation": Workflow,
  "software-modernization-and-maintenance": RefreshCw,
};

export const services: Service[] = serviceCatalog.map((service) => ({ ...service, icon: icons[service.slug] }));

export const getService = (slug: string) => services.find((service) => service.slug === slug);
