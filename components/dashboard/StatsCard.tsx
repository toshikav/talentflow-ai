import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            {change}
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}