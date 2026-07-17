import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, IndianRupee } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string | null;
  requiredSkills: string;
}

export default function JobCard({
  title,
  company,
  location,
  salary,
  requiredSkills,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
                key={skill}
                variant="secondary"
              >
                {skill.trim()}
              </Badge>
            ))}
        </div>

      </CardContent>
    </Card>
  );
}