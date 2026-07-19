import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Star, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CandidatePage({
  params,
}: CandidatePageProps) {
  const { id } = await params;

  const candidate = await prisma.candidate.findUnique({
    where: {
      id,
    },
  });

  if (!candidate) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">

      <Card>

        <CardHeader>

        <div className="flex items-center justify-between">

            <CardTitle className="text-3xl">
            {candidate.name}
            </CardTitle>

            <Link href={`/candidates/${candidate.id}/edit`}>
            <Button>
                Edit Candidate
            </Button>
            </Link>

        </div>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex items-center gap-3">
            <Mail size={20} />
            <span>{candidate.email}</span>
          </div>

          {candidate.phone && (
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>{candidate.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Briefcase size={20} />
            <span>{candidate.experience} Years Experience</span>
          </div>

          <div className="flex items-center gap-3">
            <Star size={20} />
            <span>AI Score: {candidate.aiScore ?? 0}</span>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Status
            </h3>

            <Badge>
              {candidate.status}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.split(",").map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                >
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {candidate.resumeUrl && (
            <div>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                📄 Open Resume
              </a>
            </div>
          )}

        </CardContent>

      </Card>

    </div>
  );
}