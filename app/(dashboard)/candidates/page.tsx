import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CandidateCard from "@/components/candidates/CandidateCard";
import { Button } from "@/components/ui/button";

export default async function CandidatesPage() {
  const candidates = await prisma.candidate.findMany({
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

          <p className="text-slate-600 mt-1">
            Manage all job applicants.
          </p>
        </div>

        <Link href="/candidates/new">
          <Button>
            + Add Candidate
          </Button>
        </Link>

      </div>

      {candidates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">

          <h2 className="text-xl font-semibold">
            No Candidates Found
          </h2>

          <p className="text-slate-500 mt-2">
            Click "Add Candidate" to create your first candidate.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              email={candidate.email}
              phone={candidate.phone}
              skills={candidate.skills}
              aiScore={candidate.aiScore}
              status={candidate.status}
            />
          ))}

        </div>
      )}

    </div>
  );
}