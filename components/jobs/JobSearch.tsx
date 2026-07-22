"use client";

import { useState } from "react";

import JobCard from "./JobCard";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  requiredSkills: string;
}

interface Props {
  jobs: Job[];
}

export default function JobSearch({ jobs }: Props) {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const value = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(value) ||
      job.company.toLowerCase().includes(value) ||
      job.location.toLowerCase().includes(value) ||
      job.requiredSkills.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">
      <Input
        placeholder="🔍 Search by title, company, location or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <p className="text-sm text-slate-500">
        Showing {filteredJobs.length} job(s)
      </p>

      {filteredJobs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">
            No matching jobs
          </h2>

          <p className="mt-2 text-slate-500">
            Try another keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
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