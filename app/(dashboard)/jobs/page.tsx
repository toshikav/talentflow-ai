import Link from "next/link";
import { prisma } from "@/lib/prisma";
import JobCard from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";

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
      {jobs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">

          <h2 className="text-xl font-semibold">
            No Jobs Found
          </h2>

          <p className="text-slate-500 mt-2">
            Click "Add New Job" to create your first job.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              requiredSkills={job.requiredSkills}
            />
          ))}

        </div>
      )}

    </div>
  );
}