import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import JobSearch from "@/components/jobs/JobSearch";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-slate-600 mt-1">
            Manage all available job openings.
          </p>
        </div>

        <Link href="/jobs/new">
          <Button>
            + Add New Job
          </Button>
        </Link>

      </div>

      {/* Jobs List */}
      <JobSearch jobs={jobs} />

    </div>
  );
}