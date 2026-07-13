import {
  LayoutDashboard,
  Briefcase,
  Users,
  Brain,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "AI Insights",
    href: "/ai",
    icon: Brain,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];