"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/constants/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-6">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          TalentFlow AI
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Recruiter Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-10 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}