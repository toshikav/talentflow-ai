import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import DeleteCandidateButton from "@/components/candidates/DeleteCandidateButton";
import StatusBadge from "@/components/candidates/StatusBadge";

import {
  Mail,
  Phone,
  Star,
  Briefcase,
  FileText,
} from "lucide-react";

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
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-4xl font-bold">
              {candidate.name}
            </CardTitle>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/candidates/${candidate.id}/edit`}>
                <Button>Edit Candidate</Button>
              </Link>

              <DeleteCandidateButton id={candidate.id} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" size={20} />
            <span>{candidate.email}</span>
          </div>

          {candidate.phone && (
            <div className="flex items-center gap-3">
              <Phone className="text-green-500" size={20} />
              <span>{candidate.phone}</span>
            </div>
          )}

          <hr />

          <div className="flex items-center gap-3">
            <Briefcase className="text-purple-500" size={20} />
            <span>{candidate.experience} Years Experience</span>
          </div>

          <div className="flex items-center gap-3">
            <Star className="text-yellow-500" size={20} />
            <span className="font-medium">
              AI Score: {candidate.aiScore ?? 0}/100
            </span>
          </div>

          <hr />

          <div>
            <h3 className="mb-3 font-semibold">
              Status
            </h3>

            <StatusBadge status={candidate.status} />
          </div>

          <div>
            <h3 className="mb-3 font-semibold">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.split(",").map((skill) => (
                <Badge
                  key={skill.trim()}
                  variant="secondary"
                >
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {candidate.resumeUrl && (
            <>
              <hr />

              <div>
                <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                </Button>
                </a>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}