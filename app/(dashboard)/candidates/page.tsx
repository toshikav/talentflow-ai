import Link from "next/link";
import { prisma } from "@/lib/prisma";

import CandidateSearch from "@/components/candidates/CandidateSearch";
import { Button } from "@/components/ui/button";

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { search = "" } = await searchParams;

  const candidates = await prisma.candidate.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          skills: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Candidates
          </h1>

          <p className="mt-1 text-slate-600">
            Manage all job applicants.
          </p>
        </div>

        <Link href="/candidates/new">
          <Button>
            + Add Candidate
          </Button>
        </Link>

      </div>

      <CandidateSearch candidates={candidates} />

    </div>
  );
}