import {
  Bell,
  Building2,
  CalendarCheck,
  Globe,
  KeyRound,
  Landmark,
  LineChart,
  Network,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ProductCapability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const farmstay = {
  name: "FarmStay",
  summary:
    "FarmStay is a multi-tenant SaaS platform designed to help farmhouse businesses manage their operations through a centralized digital platform.",
  capabilities: [
    {
      title: "FarmHouse & Tenant Management",
      description: "Each farmhouse business operates in its own managed workspace.",
      icon: Building2,
    },
    { title: "User & Staff Management", description: "Add team members and organise who does what.", icon: UserCog },
    { title: "Role-Based Access Control", description: "Give every user access only to the areas they need.", icon: KeyRound },
    { title: "Bookings", description: "Track reservations and availability in one place.", icon: CalendarCheck },
    { title: "Customers", description: "Keep guest records organised and easy to find.", icon: Users },
    { title: "Accounts & Finance", description: "Record payments and keep financial entries together.", icon: Landmark },
    { title: "Reporting", description: "Review operational and financial information when you need it.", icon: LineChart },
    { title: "Website Settings", description: "Control how a farmhouse's public presence is configured.", icon: Globe },
    { title: "Notifications", description: "Keep staff and guests informed about important events.", icon: Bell },
    { title: "Multi-Tenant Architecture", description: "One platform serving many farmhouse businesses, kept separate.", icon: Network },
  ] satisfies ProductCapability[],
  stack: [
    "ASP.NET Core",
    "Angular",
    "SQL Server",
    "Entity Framework Core",
    "JWT authentication",
    "Clean Architecture",
    "Cloud-ready infrastructure",
  ],
} as const;
