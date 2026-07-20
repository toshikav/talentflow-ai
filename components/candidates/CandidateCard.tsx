import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/candidates/StatusBadge";
import { Mail, Phone, Star } from "lucide-react";
import Link from "next/link";

interface CandidateCardProps {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  skills: string;
  aiScore?: number | null;
  status: string;
}

export default function CandidateCard({
  id,
  name,
  email,
  phone,
  skills,
  aiScore,
  status,
}: CandidateCardProps) {
  return (
    <Link href={`/candidates/${id}`}>
      <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">{name}</h2>

          <div className="mt-3 space-y-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>{email}</span>
            </div>

            {phone && (
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>{phone}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={18} />
              <span className="font-medium">
                AI Score: {aiScore ?? 0}/100
              </span>
            </div>
          </div>

          <div className="mt-4">
            <StatusBadge status={status} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.split(",").map((skill) => (
              <Badge key={skill.trim()} variant="secondary">
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}