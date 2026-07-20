import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="rounded-full bg-blue-100 p-4 text-blue-600">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}