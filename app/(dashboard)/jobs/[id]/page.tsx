import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteJobButton from "@/components/jobs/DeleteJobButton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Building2,
  MapPin,
  IndianRupee,
  FileText,
} from "lucide-react";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({
  params,
}: JobPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">

      <Card className="shadow-lg">

        <CardHeader>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  <CardTitle className="text-4xl font-bold">
    {job.title}
  </CardTitle>

  <div className="flex gap-3">

    <Link href={`/jobs/${job.id}/edit`}>
      <Button>
        Edit Job
      </Button>
    </Link>

    <DeleteJobButton id={job.id} />

  </div>

</div>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex items-center gap-3">
            <Building2 className="text-blue-500" size={20} />
            <span>{job.company}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-green-500" size={20} />
            <span>{job.location}</span>
          </div>

          {job.salary && (
            <div className="flex items-center gap-3">
              <IndianRupee
                className="text-yellow-500"
                size={20}
              />
              <span>{job.salary}</span>
            </div>
          )}

          <hr />

          <div>

            <h3 className="mb-3 font-semibold">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {job.requiredSkills
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

          </div>

          <hr />

          <div>

            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <FileText size={18} />
              Job Description
            </h3>

            <p className="leading-7 text-slate-600 whitespace-pre-line">
              {job.description}
            </p>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}