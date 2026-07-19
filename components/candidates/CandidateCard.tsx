import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Star } from "lucide-react";

interface CandidateCardProps {
  name: string;
  email: string;
  phone?: string | null;
  skills: string;
  aiScore?: number | null;
  status: string;
}

export default function CandidateCard({
  name,
  email,
  phone,
  skills,
  aiScore,
  status,
}: CandidateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">

        <h2 className="text-xl font-semibold">
          {name}
        </h2>

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
            <Star size={18} />
            <span>AI Score: {aiScore ?? 0}</span>
          </div>

        </div>

        <div className="mt-4">
          <Badge>{status}</Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {skills.split(",").map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill.trim()}
            </Badge>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}