import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Building2,
  IndianRupee,
} from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string | null;
  requiredSkills: string;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  requiredSkills,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="p-6">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <div className="mt-3 space-y-2 text-slate-600">

            <div className="flex items-center gap-2">
              <Building2 size={18} />
              <span>{company}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{location}</span>
            </div>

            {salary && (
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                <span>{salary}</span>
              </div>
            )}

          </div>

          <div className="mt-5 flex flex-wrap gap-2">

            {requiredSkills
              .split(",")
              .map((skill) => (
                <Badge
                  key={skill.trim()}
                  variant="secondary"
                >
                  {skill.trim()}
                </Badge>
              ))}

          </div>

        </CardContent>
      </Card>
    </Link>
  );
}